import { useEffect, useState } from "react";

import dots from "../../assets/icons/dots.png";

import "./Admin.css";

function UserPage() {
  const getCurrentGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      return "Good Morning, Admin";
    } else if (currentHour < 18) {
      return "Good Afternoon, Admin";
    } else {
      return "Good Night, Admin";
    }
  };

  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/v1/admin/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const handleDelete = (userId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!confirmed) {
      return;
    }

    const token = localStorage.getItem("token");

    fetch(`http://localhost:8080/api/v1/admin/user`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          setUsers(users.filter((user) => user.userId !== userId));
          alert(`User with ID ${userId} has been deleted successfully.`);
        } else {
          alert("Failed to delete user.");
        }
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });
  };

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
            <th>Actions</th>
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
                <button onClick={() => handleDelete(user.userId)}>
                  <img src={dots} alt="Options" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserPage;
