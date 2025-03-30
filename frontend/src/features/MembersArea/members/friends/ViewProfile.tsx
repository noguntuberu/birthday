import { Link } from "react-router-dom"
const ViewProfile= ({userId}:{ userId: string })=>{
  return (
    <div className="btn-case">
      <Link to={`/profile/${encodeURIComponent(userId)}`}>
      <button className="view-btn">
        View
      </button>
      </Link>
    </div>
  )
}

export default ViewProfile;
