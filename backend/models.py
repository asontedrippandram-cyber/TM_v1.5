from pydantic import BaseModel
from typing import List, Dict, Any, Optional


class CaseProgress(BaseModel):
    subVehicleId: str
    subFeatureId: str
    dimension: str
    passedCases: int
    totalCases: int


class CaseProgressList(BaseModel):
    items: List[CaseProgress]


class CaseProgressImport(BaseModel):
    items: List[CaseProgress]


class ProjectData(BaseModel):
    projectId: str
    data: Dict[str, Any]


class ProjectDataList(BaseModel):
    items: List[ProjectData]


class ConfigResponse(BaseModel):
    project: Dict[str, Any]
    executors: List[str]
    features: List[Dict[str, Any]]
    vehicles: List[Dict[str, Any]]
    dimensions: List[Dict[str, Any]]
