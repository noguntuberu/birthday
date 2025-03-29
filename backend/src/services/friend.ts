import User from "../models/user";
<<<<<<< HEAD
import { DBUser } from "types/interfaces";
=======
import { sendNotification } from "./notification";
>>>>>>> 71fcd8b59b76f2c622bca3722f77f7219fa925fd

export const sendFriendRequest = async (senderId: any, receiverId: any) => {
  const sender = await User.findById(senderId);
  const receiver = await User.findById(receiverId);
  if (senderId===receiverId)return {success:false, error: "can't send a friend request to your self"}
  if (!sender || !receiver) {
    return { success: false, error: "User not found" };
  }
  if (
    receiver.friendRequests.includes(senderId) ||
    receiver.friends.includes(senderId)
  ) {

    return { success: false, error: "Friend request already sent" };
  }
  receiver.friendRequests.push(senderId);
  await sendNotification({receiverId, message:`${sender?.username} sent you a friend request`, type:"ReceivedRequest", relatedUser:senderId});
  await receiver.save();
  return { success: true };
};

export const acceptFriendRequest = async (userId: any, friendId: any) => {
  const user = await User.findById(userId);
  const friend = await User.findById(friendId);
  if (!user || !friend) {
    return { success: false, error: "User not found" };
  }
  if (user.friends.includes(friendId)) {
    return { success: false, error: "Friend Request already accepted" };
  }
  if (!user.friendRequests.includes(friendId)) {
    return { success: false, error: "No friend request found" };
  }
  user.friends.push(friendId);
  friend.friends.push(userId);
  user.friendRequests = user.friendRequests.filter((_id)=>(_id.toString()!==friendId));
  await sendNotification({receiverId:friendId, message:`${user?.username} Accepted your friend request`, type:"AcceptedRequest", relatedUser:userId});
  await user.save();
  await friend.save();
  return { success: true };
};

export const rejectFriendRequest = async (userId: any, friendId: any) => {
  const user = await User.findById(userId);
  const friend = await User.findById(friendId);
  if (!user || !friend) {
    return { success: false, error: "User not found" };
  }
  if (user.friends.includes(friendId)) {
    return { success: false, error: "Friend Request already accepted" };
  }
  if (!user.friendRequests.includes(friendId)) {
    return { success: false, error: "No friend request found" };
  }
  user.friendRequests = user.friendRequests.filter(
    (_id) => _id.toString() !== friendId,
  );
  await user.save();
  return { success: true };
};

export const viewFriendRequests = async (userId: string) => {
  try {
    // Find the user
    const user = await User.findById(userId) as DBUser | null;
    if (!user) {
      return { success: false, error: 'User not found' };
    }

    // Populate friend requests with full user details
    const populatedRequests = await Promise.all(
      user.friendRequests.map(async (request) => {
        const requestUser = await User.findById(request);
        return requestUser 
          ? {
              userId: requestUser._id,
              username: requestUser.username,
              firstName: requestUser.firstName,
              lastName: requestUser.lastName
            }
          : null;
      })
    );

    // Filter out any null results
    const validRequests = populatedRequests.filter(req => req !== null);

    return { 
      success: true, 
      friendRequests: validRequests
    };
  } catch (error: any) {
    return { 
      success: false, 
      error: error.message || 'Error retrieving friend requests' 
    };
  }
};

export const removeFriend = async (userId: any, friendId: any) => {
  const user = await User.findById(userId);
  const friend = await User.findById(friendId);
  if (!user || !friend) {
    return { success: false, error: "User not found" };
  }
  if (!user.friends.includes(friendId)) {
    return { success: false, error: "Friend not found" };
  }

  user.friends = user.friends.filter((_id) => _id.toString() !== friendId);
  friend.friends = friend.friends.filter((_id) => _id.toString() !== userId);
  await user.save();
  await friend.save();
  return { success: true };
};
