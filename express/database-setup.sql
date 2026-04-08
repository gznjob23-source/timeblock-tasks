DROP TABLE IF EXISTS time_blocks;
DROP TABLE IF EXISTS tasks;

CREATE TABLE tasks (
    id INTEGER,
    title TEXT NOT NULL, 
    est_minutes INTEGER NOT NULL,
    priority INTEGER NOT NULL,
    status TEXT NOT NULL,
    
    PRIMARY KEY (id),
    
    CONSTRAINT priority_range CHECK (priority >= 1 AND priority <= 3),
    CONSTRAINT status_values CHECK (status = 'todo' OR status = 'done'),
    CONSTRAINT est_min_positive CHECK (est_minutes > 0)
);

CREATE TABLE time_blocks (
    id INTEGER,
    date TEXT NOT NULL,
    start_min INTEGER NOT NULL,
    end_min INTEGER NOT NULL,
    task_id INTEGER,

    PRIMARY KEY (id),
    
    FOREIGN KEY (task_id) REFERENCES tasks(id),
    CONSTRAINT time_order CHECK (start_min < end_min),
    CONSTRAINT start_range CHECK (start_min >= 0 AND start_min <= 1439)
);

INSERT INTO tasks (title, est_minutes, priority, status) VALUES 
('Setup Project', 60, 1, 'done'),
('Design API', 45, 2, 'todo'),
('Build React UI', 90, 1, 'todo'),
('Write Documentation', 30, 3, 'todo'),
('Bug Fixing', 120, 2, 'todo');

INSERT INTO time_blocks (date, start_min, end_min, task_id) VALUES 
('2026-04-07', 360, 420, NULL),
('2026-04-07', 420, 480, NULL),
('2026-04-07', 480, 540, NULL),
('2026-04-07', 540, 600, NULL),
('2026-04-07', 600, 660, NULL),
('2026-04-07', 660, 720, NULL),
('2026-04-07', 720, 780, NULL),
('2026-04-07', 780, 840, NULL),
('2026-04-07', 840, 900, NULL),
('2026-04-07', 900, 960, NULL),
('2026-04-07', 960, 1020, NULL),
('2026-04-07', 1020, 1080, NULL),
('2026-04-07', 1080, 1140, NULL),
('2026-04-07', 1140, 1200, NULL),
('2026-04-07', 1200, 1260, NULL),
('2026-04-07', 1260, 1320, NULL),
('2026-04-07', 1320, 1380, NULL),
('2026-04-07', 1380, 1440, NULL);