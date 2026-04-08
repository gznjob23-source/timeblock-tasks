import React, { useState } from 'react';

const TaskForm = props => {
    const [title, setTitle] = useState("");
    const [estMinutes, setEstMinutes] = useState(30);
    const [priority, setPriority] = useState(2);
    const [message, setMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        const newTask = { title, est_minutes: estMinutes, priority };

        fetch("/api/v1/tasks", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newTask)
        })
        .then(res => {
            if (!res.ok && res.status !== 422) {
                throw new Error("something went wrong: " + res.status);
            }
            return res.json();
        })
        .then(data => {
            if (data.status === 201) {
                setMessage("Success: Task created!");
                setTitle("");
                props.onTaskAdded();
            } else {
                let errMsg = "Failed";
                if (data.errors && data.errors.length > 0) {
                    errMsg = data.errors.message;
                }
                setMessage("Error: " + errMsg);
            }
        })
        .catch(err => {
            console.log(err);
            setMessage("Error connecting to API");
        });
    };

    return (
        <form onSubmit={handleSubmit} style={{ border: "1px solid #ccc", padding: "15px", marginTop: "20px" }}>
            <h3>Add New Task</h3>
            
            {}
            {message ? <p><strong>{message}</strong></p> : ""}
            
            <div>
                <label>Title: </label>
                <input 
                    type="text" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)}
                    required 
                />
            </div>
            <div>
                <label>Est. Minutes: </label>
                <input 
                    type="number" 
                    value={estMinutes} 
                    onChange={(e) => setEstMinutes(Number(e.target.value))}
                />
            </div>
            <div>
                <label>Priority: </label>
                <select value={priority} onChange={(e) => setPriority(Number(e.target.value))}>
                    <option value="1">1 (High)</option>
                    <option value="2">2 (Normal)</option>
                    <option value="3">3 (Low)</option>
                </select>
            </div>
            <button type="submit">Create Task</button>
        </form>
    );
};

export default TaskForm;