import React from "react";
import "../styles/User.css"
function User({user, connectUser}) {
    return (
        <div className="user-container">
            <p className="user-name">{user.username}</p>
            <button className="connect-button" onClick={() => connectUser(user.id)}>
                Connect
            </button>
        </div>
    );
}

export default User