import React, { useState, useEffect } from 'react';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import Schedule from './Schedule';

const App = () => {
    const [tasks, setTasks] = useState([]);
    const [blocks, setBlocks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [date, setDate] = useState("2026-04-07");

    const fetchTasks = () => {
        setLoading(true);
        fetch("/api/v1/tasks")
            .then(res => res.json())
            .then(data => {
                setTasks(data);
                setLoading(false);
            });
    };

    const fetchSchedule = () => {
        fetch(`/api/v1/time-blocks?date=${date}`)
            .then(res => res.json())
            .then(data => {
                setBlocks(data.time_blocks || []);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchTasks();
        fetchSchedule();
    }, [date]);

    return (
        <div style={{ padding: "20px" }}>
            <h1>TimeBlock Tasks</h1>
            <div style={{ display: "flex", gap: "40px" }}>
                {}
                <div style={{ flex: 1 }}>
                    <h2>My Tasks</h2>
                    <TaskList tasks={tasks} onTaskSelect={(id) => console.log(id)} />
                    <TaskForm onTaskAdded={fetchTasks} />
                </div>

                {}
                <Schedule blocks={blocks} date={date} />
            </div>
        </div>
    );
};

export default App;