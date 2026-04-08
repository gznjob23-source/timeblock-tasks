import React from 'react';

const Schedule = ({ blocks, tasks, onAssignSuccess }) => {
    const handleAssign = (blockId) => {
        const taskId = prompt("Enter Task ID to assign:");
        if (!taskId) return;

        fetch(`/api/v1/time-blocks/${blockId}/assign`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ task_id: parseInt(taskId) })
        })
        .then(res => res.json())
        .then(data => {
            if (data.status === 200) {
                alert("Success!");
                onAssignSuccess();
            } else {
                alert("Error: " + data.message);
            }
        });
    };

    return (
        <div>
            <h2>Schedule</h2>
            <ul>
                {blocks.map(block => (
                    <li key={block.id}>
                        {block.start_min}分: <strong>{block.task_title || "---"}</strong>
                        {!block.task_id && (
                            <button onClick={() => handleAssign(block.id)}>Assign Task</button>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Schedule;