import csv
from io import StringIO
from typing import List
from models import CaseProgress


def parse_csv(content: str) -> List[CaseProgress]:
    items = []
    reader = csv.DictReader(StringIO(content))

    for row in reader:
        item = CaseProgress(
            subVehicleId=row['subVehicleId'],
            subFeatureId=row['subFeatureId'],
            dimension=row['dimension'],
            passedCases=int(row['passedCases']),
            totalCases=int(row['totalCases'])
        )
        items.append(item)

    return items
