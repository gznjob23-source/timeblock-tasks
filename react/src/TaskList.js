import React from 'react';

const TaskList = props => {
  return (
    <ul>
      {}
      {props.tasks.map(task => (
        <li key={task.id} style={{ marginBottom: "10px" }}>
          
          <span style={{ fontWeight: props.selectedTaskId === task.id ? "bold" : "normal" }}>
            {task.title}
          </span>
          <button 
            onClick={() => props.onTaskSelect(task.id)} 
            style={{ marginLeft: "10px" }}
          >
            Details & Select
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;