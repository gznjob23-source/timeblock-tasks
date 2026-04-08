import React from 'react';

const Schedule = props => {
  
  const formatTime = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    
    const formattedHours = hours < 10 ? "0" + hours : hours;
    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
    
    return `${formattedHours}:${formattedMinutes}`;
  };

  const handleAssign = (blockId) => {
    fetch(`/api/v1/time-blocks/${blockId}/assign`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ task_id: props.selectedTaskId })
    })
    .then(res => {
      if (!res.ok) {
        throw new Error("something went wrong: " + res.status);
      }
      return res.json();
    })
    .then(data => {
      alert("Success: Task assigned!");
      props.onAssignSuccess();
    })
    .catch(error => {
      console.log(error);
      alert("Error assigning task");
    });
  };

  return (
    <div style={{ borderLeft: "1px solid #ccc", paddingLeft: "20px" }}>
      <h2>Schedule ({props.date})</h2>
      
      {}
      {props.blocks.length === 0 ? (
        <p>No blocks. (Check DB date!)</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {props.blocks.map(block => (
            <li key={block.id} style={{ marginBottom: "10px", padding: "10px", border: "1px solid #eee", borderRadius: "4px" }}>
              
              <strong>{formatTime(block.start_min)} 〜 {formatTime(block.end_min)}: </strong>
              
              {block.task_title ? (
                <span style={{ color: "green", fontWeight: "bold", marginLeft: "10px" }}>{block.task_title}</span>
              ) : (
                <span style={{ marginLeft: "10px" }}>
                  (Free) 
                  
                  {}
                  {props.selectedTaskId ? (
                    <button onClick={() => handleAssign(block.id)} style={{ marginLeft: "10px", cursor: "pointer" }}>
                      Assign Selected
                    </button>
                  ) : (
                    ""
                  )}
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Schedule;