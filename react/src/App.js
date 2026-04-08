import React, { useState, useEffect } from 'react';
import TaskList from './TaskList';
import TaskForm from './TaskForm';
import Schedule from './Schedule';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [blocks, setBlocks] = useState([]);
  const [detailedTask, setDetailedTask] = useState(null);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [date, setDate] = useState("2026-04-07");
  const [loading, setLoading] = useState(true);

  const fetchTasks = () => {
    fetch("/api/v1/tasks")
      .then(res => res.json())
      .then(data => setTasks(data.tasks || data));
  };

  const fetchSchedule = () => {
    setLoading(true);
    fetch(`/api/v1/time-blocks?date=${date}`)
      .then(res => res.json())
      .then(data => {
        setBlocks(data.time_blocks || []);
        setLoading(false);
      });
  };

  const handleTaskSelect = (id) => {
    setSelectedTaskId(id);
    
    fetch(`/api/v1/tasks/${id}`)
      .then(res => {
        if (!res.ok) {
          throw new Error("something went wrong: " + res.status);
        }
        return res.json();
      })
      .then(data => {
        // データを取り出す
        let taskData = data.task || data;
        
        if (taskData.length > 0 && taskData !== undefined) {
            taskData = taskData[0];
        }
        
        setDetailedTask(taskData);
      })
      .catch(error => {
        console.log(error);
        alert("Task not found");
      });
  };

  useEffect(() => {
    fetchTasks();
    fetchSchedule();
  }, [date]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>TimeBlock Tasks</h1>
      
      <div style={{ marginBottom: "20px" }}>
        <label>Select Date: </label>
        <input 
          type="date" 
          value={date} 
          onChange={(e) => setDate(e.target.value)} 
        />
      </div>

      {}
      {detailedTask && (
        <div style={{ border: "2px solid blue", padding: "10px", marginBottom: "20px" }}>
          <h3>Task Detail</h3>
          <p><strong>Title:</strong> {detailedTask.title}</p>
          <p><strong>Status:</strong> {detailedTask.status}</p>
          <p><strong>Priority:</strong> {detailedTask.priority}</p>
          <p><strong>Est. Minutes:</strong> {detailedTask.est_minutes}</p>
          <button onClick={() => setDetailedTask(null)}>Close Detail</button>
        </div>
      )}

      <div style={{ display: "flex", gap: "20px" }}>
        <div style={{ flex: 1 }}>
          <h2>Tasks</h2>
          <TaskList tasks={tasks} onTaskSelect={handleTaskSelect} selectedTaskId={selectedTaskId} />
          <hr />
          <TaskForm onTaskAdded={fetchTasks} />
        </div>

        <div style={{ flex: 1 }}>
          <Schedule 
            blocks={blocks} 
            date={date} 
            selectedTaskId={selectedTaskId}
            onAssignSuccess={fetchSchedule} 
          />
        </div>
      </div>
    </div>
  );
};

export default App;
