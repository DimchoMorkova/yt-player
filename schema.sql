DROP TABLE IF EXISTS user_sessions;

CREATE table user_sessions(
    session_id TEXT NOT NULL,
    left_id TEXT NOT NULL,
    right_id TEXT NOT NULL,
    UNIQUE(session_id)
);