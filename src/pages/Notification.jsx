import { useState, useEffect } from "react";
import axios from "axios";
import "./NotificationPage.css";
// import LeftPane from "../Components/LeftPane";

const getAuthToken = () => {
  return localStorage.getItem("token");
};

function NotificationPage() {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const token = getAuthToken();
    if (!token) {
      console.error("No auth token found!");
      return;
    }

    axios
      .get("http://localhost:8080/api/get-notifications-by-user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setNotifications(response.data);
        const unreadNotifications = response.data.filter(
          (notification) => notification.status === "UNREAD"
        );
        setUnreadCount(unreadNotifications.length);
      })
      .catch((error) => console.error("Error fetching notifications:", error));
  }, []);

  const markNotificationAsRead = (notificationId) => {
    const token = getAuthToken();
    if (!token) {
      console.error("No auth token found!");
      return;
    }

    axios
      .patch(
        `http://localhost:8080/api/read?notificationId=${notificationId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        setNotifications((prevNotifications) =>
          prevNotifications.map((notification) =>
            notification.notificationId === notificationId
              ? { ...notification, status: "READ" }
              : notification
          )
        );
        setUnreadCount((prevCount) => prevCount - 1);
      })
      .catch((error) =>
        console.error("Error marking notification as read:", error)
      );
  };

  return (
    <div className="notification-container">
      <div className="notification-header">
        <i
          className="fas fa-bell bell-icon"
          style={{ color: unreadCount > 0 ? "green" : "gray" }}
        ></i>
        <span>Notifications</span>
        {unreadCount > 0 && (
          <span className="notification-count">{unreadCount}</span>
        )}
      </div>

      <div className="notification-list">
        {notifications.length > 0 ? (
          <ul>
            {notifications.map((notification, index) => (
              <li
                key={notification.notificationId}
                className={`notification-item ${
                  notification.status === "UNREAD" ? "unread" : "read"
                }`}
                onClick={() =>
                  markNotificationAsRead(notification.notificationId)
                } // Mark as read when clicked
              >
                <div className="notification-number">
                  {index + 1}. {/* Display the number */}
                </div>
                <div className="notification-content">
                  <strong>{notification.title}</strong>
                  <p className="notification-message">{notification.message}</p>
                  <p className="notification-timestamp">
                    <small>{notification.timestamp}</small>
                  </p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No notifications.</p>
        )}
      </div>
    </div>
  );
}

export default NotificationPage;
