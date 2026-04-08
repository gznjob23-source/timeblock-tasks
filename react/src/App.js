import React, { useState, useEffect } from 'react';
import TaskForm from './TaskForm';

const App = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchTasks = () => {
        setLoading(true);
        fetch("/api/v1/tasks")
            .then(res => res.json())
            .then(data => {
                setTasks(data);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <div style={{ padding: "20px" }}>
            <h1>TimeBlock Tasks</h1>
            {loading ? <p>Loading tasks...</p> : (
                <ul>
                    {tasks.map(task => (
                        <li key={task.id}> {}
                            <strong>{task.title}</strong> - {task.est_minutes} min ({task.status})
                        </li>
                    ))}
                </ul>
            )}
            <hr />
            <TaskForm onTaskAdded={fetchTasks} />
        </div>
    );
};

export default App;