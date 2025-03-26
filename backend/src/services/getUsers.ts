import User from "../models/user";

class UserService {
	async findAllUsers() {
		return await User.find()
			.populate("friends")
			.populate("friendRequests")
			.select("-_id -password -notifications -createdAt -__v")
			.sort("username");
	}

	async findUsersById(id: string) {
		return await User.findById(id)
			.populate("friends")
			.populate("friendRequests")
			.select("-_id -password -notifications -createdAt -__v");
	}
}

export default new UserService();
