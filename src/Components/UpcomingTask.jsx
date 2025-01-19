import { useEffect, useState } from "react";
import AddNewTask from "../pages/AddNewTask";
import "./Upcoming.css";

const UpcomingTask = () => {
  const [tasks, setTasks] = useState([]);
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [category, setCategory] = useState("LIVESTOCK");

  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found. User is not authenticated.");
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:8080/api/v1/tasks/upcoming?category=${category}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setTasks(data);
        } else {
          console.error("Failed to fetch tasks:", response.statusText);
        }
      } catch (error) {
        console.error("An error occurred while fetching tasks:", error);
      }
    };

    fetchTasks();
  }, [category]);

  const handleAddTask = () => setShowAddTaskModal(true);
  const handleCloseModal = () => setShowAddTaskModal(false);

  return (
    <div className="upcoming-tasks">
      <div className="header">
        <h2>Upcoming Tasks</h2>
        <button onClick={handleAddTask}>+ New Task</button>
      </div>

      <div className="category-selector">
        <button onClick={() => setCategory("LIVESTOCK")}>Livestock</button>
        <button onClick={() => setCategory("INVENTORY")}>Inventory</button>
        <button onClick={() => setCategory("CROP")}>Crop</button>
      </div>

      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id} className="task-item">
            <div className="task-icon">
              <img src={getIcon(task.animal)} alt={task.animal} />
            </div>
            <div className="task-details">
              <h4>{task.title}</h4>
              <p>Scheduled for {task.dueDate} in {task.location}</p>
            </div>
            <p className="task-due">due {getDueDateText(task.dueDate)}</p>
          </li>
        ))}
      </ul>

      {showAddTaskModal && <AddNewTask onClose={handleCloseModal} />}
    </div>
  );
};

const getDueDateText = (dueDate) => {
  const now = new Date();
  const due = new Date(dueDate);
  const diffInDays = Math.ceil((due - now) / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) return "today";
  if (diffInDays === 1) return "tomorrow";
  return `in ${diffInDays} days`;
};

const getIcon = (animal) => {
  const icons = {
    Cattle: "/icons/cattle.png",
    Chickens: "/icons/chickens.png",
    Goats: "/icons/goats.png",
    Sheep: "/icons/sheep.png",
  };
  return icons[animal] || "/icons/default.png";
};

export default UpcomingTask;
