import { useState } from "react";

function AddTask({ onAdd }) {
	const [text, setText] = useState("");
	const [day, setDay] = useState("");
	const [reminder, setReminder] = useState(false);

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!text) {
			alert("Please add a task");
			return;
		}

		onAdd({ text, day, reminder });

		setText("");
		setDay("");
		setReminder(false);
	};

	return (
		<form className="add-form" onSubmit={handleSubmit}>
			<div className="form-control">
				<label htmlFor="">Task</label>
				<input
					type="text"
					name="taskName"
					value={text}
					placeholder="Enter task name"
					onChange={(e) => setText(e.target.value)}
				/>
			</div>
			<div className="form-control">
				<label htmlFor="">Add Day & Time</label>
				<input
					type="text"
					name="dayTime"
					value={day}
					placeholder="Enter day & time"
					onChange={(e) => setDay(e.target.value)}
				/>
			</div>
			<div className="form-control form-control-check">
				<label htmlFor="reminder">Add Reminder</label>
				<input
					type="checkbox"
					checked={reminder}
					name="reminder"
					onChange={(e) => setReminder(e.target.checked)}
				/>
			</div>

			<input type="submit" value="Add Task" className="btn btn-block" />
		</form>
	);
}

export default AddTask;
