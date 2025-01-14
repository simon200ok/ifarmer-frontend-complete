import { useEffect, useState } from "react";

import dots from "../../assets/icons/dots.png";

import "./Admin.css";

function UserPage() {
  const getCurrentGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      return "Good Morning,Admin";
    } else if (currentHour < 18) {
      return "Good Afternoon,Admin";
    } else {
      return "Good Night,Admin";
    }
  };
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/v1/admin/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  return (
    <div className="table">
      <h1>{getCurrentGreeting()}</h1>
      <table border="1">
        <thead>
          <tr>
            <th>User ID</th>
            <th>Full Name</th>
            <th>Business Name</th>
            <th>Email Address</th>
            <th>Gender</th>
            <th>Date Joined</th>
            <th>Last Active</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.userId}>
              <td>{user.userId}</td>
              <td>{user.fullName}</td>
              <td>{user.businessName}</td>
              <td>{user.email}</td>
              <td>{user.gender}</td>
              <td>{user.dateCreated}</td>
              <td>{user.lastLogoutTime}</td>
              <td>
                <img src={dots} alt="" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserPage;
