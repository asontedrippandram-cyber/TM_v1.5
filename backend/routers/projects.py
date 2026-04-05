from fastapi import APIRouter, HTTPException
from typing import List
import json

from database import get_db_connection
from models import ProjectData, ProjectDataList

router = APIRouter(prefix="/api/projects", tags=["projects"])


@router.get("", response_model=ProjectDataList)
def get_projects():
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT project_id, data FROM projects")
    rows = cursor.fetchall()
    conn.close()

    items = [
        ProjectData(
            projectId=row['project_id'],
            data=json.loads(row['data'])
        )
        for row in rows
    ]

    return ProjectDataList(items=items)


@router.put("", response_model=dict)
def save_projects(data: ProjectDataList):
    conn = get_db_connection()
    cursor = conn.cursor()

    for item in data.items:
        cursor.execute("""
            INSERT OR REPLACE INTO projects (project_id, data)
            VALUES (?, ?)
        """, (item.projectId, json.dumps(item.data)))

    conn.commit()
    conn.close()

    return {"message": "Projects saved successfully", "count": len(data.items)}
