import User from "../models/user";

class FriendService {
	async findAllFriends(id: string) {
		return await User.findById(id)
			.populate("friends", "username firstName lastName _id")
			.select("friends");
	}

	async findAllFriendRequests(id: string) {
		return await User.findById(id)
			.populate("friendRequests", "username firstName lastName _id")
			.select("friendRequests");
	}
}

export default new FriendService();
