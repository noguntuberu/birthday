import User from "../models/user";

class FriendService {
	async findAllFriends(id: string) {
		return await User.findById(id)
			.populate("friends", "username firstName lastName -_id")
			.select("friend -_id");
	}
}

export default new FriendService();
