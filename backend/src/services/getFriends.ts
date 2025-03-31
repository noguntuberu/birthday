import User from "../models/user";

class FriendService {
	async findAllFriends(id: string) {
		return await User.findById(id)
			.populate("friends", "username email firstName dob lastName _id")
			.select("friends");
	}

	async findAllFriendRequests(id: string) {
		return await User.findById(id)
			.populate("friendRequests", "username firstName lastName _id email")
			.select("friendRequests");
	}

	async findAllSentRequests(id:string) {
		return await User.findById(id)
		.populate("sentRequests", "_id")
		.select("sentRequests");
	}
}

export default new FriendService();
