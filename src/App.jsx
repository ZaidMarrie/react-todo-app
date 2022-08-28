import { useState, useEffect } from "react";

import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";

function App() {
	const [showForm, setShowForm] = useState(false);
	const [tasks, setTasks] = useState([]);

	useEffect(() => {
		const getTasks = async () => {
			const tasksFromServer = await fetchTasks();
			setTasks(tasksFromServer);
		};

		getTasks();
	}, []);

	// Fetch Tasks from json-server
	const fetchTasks = async () => {
		const res = await fetch("http://localhost:5000/tasks");
		const data = await res.json();
		return data;
	};

	// Fetch a single task
	const fetchTask = async (id) => {
		const res = await fetch(`http://localhost:5000/tasks/${id}`);
		const data = await res.json();
		return data;
	};

	// Adds a new task
	const addTask = async (task) => {
		const res = await fetch("http://localhost:5000/tasks", {
			method: "POST",
			headers: {
				"Content-type": "application/json",
			},
			body: JSON.stringify(task),
		});
		const data = await res.json();

		setTasks([...tasks, data]);
	};

	// Deletes the specified task
	const deleteTask = async (id) => {
		await fetch(`http://localhost:5000/tasks/${id}`, {
			method: "DELETE",
		});

		setTasks(tasks.filter((task) => task.id !== id));
	};

	// Toggles a reminder for specified task
	const toggleReminder = async (id) => {
		const taskToToggle = await fetchTask(id);
		const updateTask = { ...taskToToggle, reminder: !taskToToggle.reminder };

		const res = await fetch(`http://localhost:5000/tasks/${id}`, {
			method: "PUT",
			headers: {
				"Content-type": "application/json",
			},
			body: JSON.stringify(updateTask),
		});
		const data = await res.json();

		setTasks(tasks.map((task) => (task.id === id ? { ...task, reminder: data.reminder } : task)));
	};

	return (
		<div className="container">
			<Header onAdd={() => setShowForm(!showForm)} showForm={showForm} />
			{showForm && <AddTask onAdd={addTask} />}
			{tasks.length > 0 ? (
				<Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />
			) : (
				"No Tasks To Show"
			)}
		</div>
	);
}

export default App;
