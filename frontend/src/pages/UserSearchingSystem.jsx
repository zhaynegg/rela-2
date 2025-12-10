import { useState, useEffect } from "react";
import api from "../api"
import User from "../components/User"

function UserSearchingSystem() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = () => {
        api
            .get("/api/users/")
            .then((res) => res.data)
            .then((data) => {
                setUsers(data);
                console.log(data);
            })
            .catch((err) => alert(err));
    };
    const connectUser = (id) => {
        api
            .post(`/api/users/connect/${id}/`)
            .then((res) => {
                if (res.status === 201) alert("Couple created!");
                else alert("Failed to create couple.");
                getUsers();
            })
            .catch((error) => alert(error));
    };
    return (
        <div>
            <div>
                <h2>All users that do not have connection</h2>
                {users.map((user) => (
                    <User user={user} connectUser={connectUser} key={user.id} />
                ))}
            </div>
        </div>
    );
}

export default UserSearchingSystem