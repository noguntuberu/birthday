import { Link } from "react-router-dom";
import { Friend } from "../types/Friends";

interface FriendListProps {
  friends: Friend[];
  onRemove: (friendId: string) => void;
  onSelect: (friend: Friend) => void;
}

const FriendList: React.FC<FriendListProps> = ({
  friends,
  onRemove,
  onSelect,
}) => {
  return (
    <ul>
      {friends.map((friend) => (
        <li
          key={friend.id}
          className="py-2 border-b flex justify-between items-center"
        >
          <span onClick={() => onSelect(friend)}>
            {friend.name} (@{friend.username})
          </span>
          <div>
            <Link to={`/profile/${friend.id}`}>
              <button className="bg-blue-500 text-white px-3 py-1 rounded mr-2">
                View Profile
              </button>
            </Link>
            <button
              className="bg-gray-500 text-white px-3 py-1 rounded"
              onClick={() => onRemove(friend.id)}
            >
              Remove
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default FriendList;
