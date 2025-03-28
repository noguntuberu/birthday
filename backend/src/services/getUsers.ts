import User from "../models/user";

class UserService {
  async findAllUsers() {
    return await User.find()
      .populate("friends", "username firstName lastName -_id")
      .populate("friendRequests")
      .select("-_id -password -notifications -createdAt -__v")
      .sort("username");
  }

  async findUsersById(id: string) {
    return await User.findById(id)
      .populate("friends", "username firstName lastName -_id")
      .populate("friendRequests")
      .select("-_id -password -notifications -createdAt -__v");
  }

  async findUserProfileById(id: string, includeDob: boolean) {
    let excludeFields = "-_id -password -notifications -createdAt -__v";
    if (!includeDob) {
      excludeFields += " -dob";
    }

    return await User.findById(id)
      .populate("friends", "username firstName lastName -_id")
      .populate("friendRequests")
      .select(excludeFields);
  }
}

export default new UserService();
