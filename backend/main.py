from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import json
import os
import re

from database import init_db
from models import ConfigResponse
from services.csv_handler import parse_csv

app = FastAPI(title="车载软件测试进度看板 API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(__import__('routers.projects', fromlist=['router']).router)
app.include_router(__import__('routers.case_progress', fromlist=['router']).router)


@app.on_event("startup")
def startup_event():
    init_db()


@app.get("/api/config", response_model=ConfigResponse)
def get_config():
    config_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'config.js')

    if os.path.exists(config_path):
        with open(config_path, 'r', encoding='utf-8') as f:
            content = f.read()

        match = re.search(r'const CONFIG\s*=\s*({[\s\S]*?});', content)
        if match:
            config_str = match.group(1)
            config_str = re.sub(r'//.*$', '', config_str, flags=re.MULTILINE)
            config_str = re.sub(r'/\*[\s\S]*?\*/', '', config_str)
            config_str = re.sub(r',\s*}', '}', config_str)

            try:
                data = json.loads(config_str)
                return ConfigResponse(
                    project=data.get('project', {}),
                    executors=data.get('executors', []),
                    features=data.get('features', []),
                    vehicles=data.get('vehicles', []),
                    dimensions=data.get('dimensions', [])
                )
            except json.JSONDecodeError:
                pass

    return ConfigResponse(
        project={"id": "p1", "name": "默认项目", "startDate": "20260101", "defaultCommercial": "20260630"},
        executors=[],
        features=[],
        vehicles=[],
        dimensions=[]
    )


@app.post("/api/case-progress/import-csv", response_model=dict)
async def import_csv(file: UploadFile = File(...)):
    content = await file.read()
    text = content.decode('utf-8')

    items = parse_csv(text)

    from database import get_db_connection
    conn = get_db_connection()
    cursor = conn.cursor()

    for item in items:
        cursor.execute("""
            INSERT OR REPLACE INTO case_progress (sub_vehicle_id, sub_feature_id, dimension, passed_cases, total_cases)
            VALUES (?, ?, ?, ?, ?)
        """, (item.subVehicleId, item.subFeatureId, item.dimension, item.passedCases, item.totalCases))

    conn.commit()
    conn.close()

    return {"message": "CSV imported successfully", "count": len(items)}


@app.get("/")
def root():
    return {"message": "车载软件测试进度看板 API", "docs": "/docs"}
