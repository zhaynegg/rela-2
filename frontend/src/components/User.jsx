import React from "react";

function User({user}) {

    return (
        <div className="user-container">
            <p className="user-name">{user.username}</p>
        </div>
    );
}

export default User