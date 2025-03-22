import express from "express";
import User from "../Model/userModel";

const friendRequest = express.Router();

friendRequest.post("/send",async (req,res)=>{
  try {
    const {senderId, receiverId} = req.body;

  const sender = await User.findById({senderId});
  const receiver = await User.findById({receiverId});

  if (!sender || !receiver){
    res.status(404).send("User not found");
    return;
  }
  
  if(receiver.friendRequests.includes(senderId)){
    res.status(400).send("Friend request already sent");
    return;
  }

  receiver.friendRequests.push(senderId);
  await receiver.save();

  res.status(201).send("Friend request sent successfully");
  } catch (error) {
    res.status(500).send("error sending request");
  }
});

friendRequest.post("/accept", async (req, res) => {
  try {
    const { userId, friendId } = req.body;

    const user = await User.findById(userId);
    const friend = await User.findById(friendId);
  
    if (!user || !friend){
      res.status(404).send("User not found");
      return;
    }
  
    if (!user.friendRequests.includes(friendId)) {
      res.status(400).send("No friend request found");
      return;
    }
  
    user.friends.push(friendId);
    friend.friends.push(userId);
  
    user.friendRequests = user.friendRequests.filter(id => id.toString() !== friendId);
    await user.save();
    await friend.save();
  
    res.send("Friend request accepted");
  
  } catch (error: any) {
    res.status(500).send(error.message || "server error")
  }
});

// Reject Friend Request
friendRequest.post("/reject", async (req, res) => {
  const { userId, friendId } = req.body;

  const user = await User.findById(userId);
  if (!user) {
    res.status(404).send("User not found");
    return;
  }

  user.friendRequests = user.friendRequests.filter(id => id.toString() !== friendId);
  await user.save();

  res.send("Friend request rejected");
});


