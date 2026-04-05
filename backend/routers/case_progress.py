from fastapi import APIRouter, HTTPException
from typing import List
import json

from database import get_db_connection
from models import CaseProgress, CaseProgressList

router = APIRouter(prefix="/api/case-progress", tags=["case-progress"])


@router.get("", response_model=CaseProgressList)
def get_case_progress():
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT sub_vehicle_id, sub_feature_id, dimension, passed_cases, total_cases
        FROM case_progress
    """)

    rows = cursor.fetchall()
    conn.close()

    items = [
        CaseProgress(
            subVehicleId=row['sub_vehicle_id'],
            subFeatureId=row['sub_feature_id'],
            dimension=row['dimension'],
            passedCases=row['passed_cases'],
            totalCases=row['total_cases']
        )
        for row in rows
    ]

    return CaseProgressList(items=items)


@router.put("", response_model=dict)
def update_case_progress(data: CaseProgressList):
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("DELETE FROM case_progress")

    for item in data.items:
        cursor.execute("""
            INSERT INTO case_progress (sub_vehicle_id, sub_feature_id, dimension, passed_cases, total_cases)
            VALUES (?, ?, ?, ?, ?)
        """, (item.subVehicleId, item.subFeatureId, item.dimension, item.passedCases, item.totalCases))

    conn.commit()
    conn.close()

    return {"message": "Case progress updated successfully", "count": len(data.items)}


@router.post("/import", response_model=dict)
def import_case_progress(data: CaseProgressList):
    conn = get_db_connection()
    cursor = conn.cursor()

    for item in data.items:
        cursor.execute("""
            INSERT OR REPLACE INTO case_progress (sub_vehicle_id, sub_feature_id, dimension, passed_cases, total_cases)
            VALUES (?, ?, ?, ?, ?)
        """, (item.subVehicleId, item.subFeatureId, item.dimension, item.passedCases, item.totalCases))

    conn.commit()
    conn.close()

    return {"message": "Case progress imported successfully", "count": len(data.items)}
