export const fetchFriendRequests = async () => {
  const response = await fetch("/api/friendRequest/send");
  return response.json();
};

export const fetchFriends = async () => {
  const response = await fetch("http://localhost:3000/api/friends");
  return response.json();
};

export const sendFriendRequest = async (friendId: string) => {
  return fetch(`http://localhost:3000/api/friendRequest/send/${friendId}`, {
    method: "POST",
  });
};

export const acceptFriendRequest = async (friendId: string) => {
  return fetch(`http://localhost:3000/api/friendRequest/accept/${friendId}`, {
    method: "POST",
  });
};

export const rejectFriendRequest = async (friendId: string) => {
  return fetch(`http://localhost:3000/api/friendRequest/reject/${friendId}`, {
    method: "DELETE",
  });
};

export const removeFriend = async (friendId: string) => {
  return fetch(`http://localhost:3000/api/friends/remove/${friendId}`, {
    method: "DELETE",
  });
};
