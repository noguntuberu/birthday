import { ToastContainer } from "react-toastify";
import {
  displayName,
  getNextBirthday,
  getFirst3,
  sortFriendsByNextBirthday,
  formatDate,
} from "../../../utils/helperfunctions";
import { useImage } from "../../../hooks/useImage";
import { useUser } from "../../../hooks/useUser";
import "./members.css";
import { useFriends } from "../../../hooks/useFriends";
export default function Members() {
  const { user, error, loading } = useUser();
  const { friends } = useFriends();
  const { image } = useImage();

  return (
    <div>
      <div className="large-fields">
        <h1 className="large-body">
          {" "}
          This App is currently not Available to Large screen users
        </h1>
        <div className="home-page">
          <div className="profile-container">
            <section className="home-container">
              <div className="top-container">
                {loading ? (
                  <p>Loading...</p>
                ) : error ? (
                  <p style={{ color: `red` }}>{error}</p>
                ) : (
                  <>
                    <p className="hi">
                      welcome{" "}
                      <span className="name">{displayName(user) || "N/A"}</span>
                    </p>
                    <div className="birthdays">
                      <p className="title-name">upcomming birthdays</p>
                      <div className="birth-cont">
                        {friends && friends.length > 0
                          ? getFirst3(sortFriendsByNextBirthday(friends)).map(
                              (e) => (
                                <div key={e?.id} className="birthlist">
                                  <span className="span-name">{e?.name}</span>
                                  <span className="span-date">
                                    {formatDate(e.nextBirthday)}
                                  </span>
                                </div>
                              )
                            )
                          : null}
                      </div>
                      <div className="profile-pic">
                        <img
                          src={
                            image ||
                            "https://fastly.picsum.photos/id/3/5000/3333.jpg?hmac=GDjZ2uNWE3V59PkdDaOzTOuV3tPWWxJSf4fNcxu4S2g"
                          }
                          alt="no image found"
                          className="image"
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>
              <div className="bottom-container">
                <p className="buttom-title">Your next birthday</p>
                <h2 className="btm-txt">
                  {user?.dob
                    ? getNextBirthday(user.dob)
                    : "update your profile"}
                </h2>
              </div>
            </section>
          </div>
        </div>
        <ToastContainer
          position="top-right"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </div>
  );
}
