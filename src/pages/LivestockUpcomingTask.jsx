import { useEffect, useState } from "react";
import image1 from "../assets/random/image1.png";
import image2 from "../assets/random/image2.png";
import image3 from "../assets/random/image3.png";
import image4 from "../assets/random/image4.png";

// import "./LivestockUpcomingTask.css";
import "./UpcomingTask.css";
function LivestockUpcomingTask() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const icons = [image1, image2, image3, image4];

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found");
      return;
    }

    fetch("http://localhost:8080/api/v1/tasks/upcoming?category=ANIMAL", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Received data:", data);
        setTasks(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
        setLoading(false);
      });
  }, []);

  // uncomment to match with muminat's code aand comment the next code if issues
  // const convertToISODate = (dateString) => {
  //   const [day, month, year] = dateString.split("/");
  //   return `${year}-${month}-${day}`;
  // };


  // comment this code and uncomment the above code block if issues
  const convertToISODate = (dueDateArray) => {
    const [year, month, day] = dueDateArray;
    return new Date(year, month - 1, day);
  };


  const calculateDaysLeft = (dueDate) => {
    const now = new Date();
    const due = new Date(convertToISODate(dueDate));

    if (isNaN(due.getTime())) {
      return "Invalid due date";
    }

    const timeDiff = due - now;

    if (timeDiff <= 0) {
      return "Task is overdue";
    }

    const days = Math.ceil(timeDiff / (1000 * 3600 * 24));

    return `${days} days left`;
  };

  const getRandomIcon = () => {
    const randomIndex = Math.floor(Math.random() * icons.length);
    return icons[randomIndex];
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="task-wrapper">
      <div className="task-header">
        <h1>Upcoming Tasks</h1>
        <p>New Task</p>
      </div>
      <div className="task-list">
        {tasks.map((task) => (
          <div key={task.id} className="task">
            <img src={getRandomIcon()} alt="Task Icon" className="task-icon" />
            <div className="task-left">
              <h2>{task.title}</h2>
              <p>
                Scheduled in {calculateDaysLeft(task.dueDate)} {task.location}
              </p>
            </div>
            <div className="task-right">
              <p>
                <strong>Due in </strong> {calculateDaysLeft(task.dueDate)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LivestockUpcomingTask;
