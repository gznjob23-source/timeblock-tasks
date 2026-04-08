import React from 'react';

const TaskList = ({ tasks, onTaskSelect }) => {
    return (
        <ul>
            {tasks.map(task => (
                <li key={task.id}>
                    <strong>{task.title}</strong>
                    {}
                    <button onClick={() => onTaskSelect(task.id)}>View Details</button>
                </li>
            ))}
        </ul>
    );
};

export default TaskList;