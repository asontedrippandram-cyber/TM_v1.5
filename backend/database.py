import sqlite3
from pathlib import Path
from typing import Generator

DATABASE_PATH = Path(__file__).parent / "test_progress.db"


def get_db_connection():
    conn = sqlite3.connect(DATABASE_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def init_db():
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS projects (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            project_id TEXT NOT NULL UNIQUE,
            data TEXT NOT NULL
        )
    """)

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS case_progress (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            sub_vehicle_id TEXT NOT NULL,
            sub_feature_id TEXT NOT NULL,
            dimension TEXT NOT NULL,
            passed_cases INTEGER NOT NULL DEFAULT 0,
            total_cases INTEGER NOT NULL DEFAULT 0,
            UNIQUE(sub_vehicle_id, sub_feature_id, dimension)
        )
    """)

    conn.commit()
    conn.close()
