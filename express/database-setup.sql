DROP TABLE IF EXISTS time_blocks;
DROP TABLE IF EXISTS tasks;

CREATE TABLE tasks (
    id INTEGER PRIMARY KEY,
    title TEXT NOT NULL,
    est_minutes INTEGER NOT NULL,
    priority INTEGER NOT NULL,
    status TEXT NOT NULL,
    CONSTRAINT priority_range CHECK (priority BETWEEN 1 and 3),
    CONSTRAINT status_values CHECK (status IN ('todo','done'))
);

CREATE TABLE time_blocks (
    id INTEGER PRIMARY KEY,
    date TEXT NOT NULL,
    start_min INTEGER NOT NULL,
    end_min INTEGER NOT NULL,
    task_id INTEGER,
    FOREIGN KEY (task_id) REFERENCES tasks(id),
    CONSTRAINT time_order CHECK (start_min < end_min)
);

INSERT INTO tasks (title, est_minutes, priority, status) VALUES ('Project Setup', 60, 1, 'todo');
INSERT INTO time_blocks (date, start_min, end_min, task_id) VALUES ('2026-03-30', 540, 600, 1);