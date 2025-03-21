
const ProfilePage= ()=>{
  return (
    <div>
      <div className="profile-container">
      <img src="https://via.placeholder.com/120" alt="User Profile" className="profile-img"/>
        <h2 className="username">John Doe</h2>
        <p className="bio">Web Developer | Tech Enthusiast | Blogger</p>

        <div className="info">
            <p><span>Date of Birth:</span> January 15, 1995</p>
            <p><span>Hobbies:</span> Coding, Gaming, Traveling</p>
            <p><span>Location:</span> Lagos, Nigeria</p>
            <p><span>Email:</span> johndoe@example.com</p>
        </div>

        <div className="stats">
            <div>
                <p>Posts</p>
                <span>120</span>
            </div>
            <div>
                <p>Followers</p>
                <span>10.5K</span>
            </div>
            <div>
                <p>Following</p>
                <span>500</span>
            </div>
        </div>

        <div className="friends-list">
            <h3>Friends</h3>
            <ul>
                <li>Alice Johnson</li>
                <li>Michael Smith</li>
                <li>Sarah Williams</li>
                <li>David Brown</li>
            </ul>
        </div>

        <button className="follow-btn">Follow</button>
    </div>
    </div>
  );
}


export default ProfilePage;