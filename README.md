# 车载软件测试进度看板 (TM_v1.5)

车载软件测试进度管理工具，提供五维度测试进度可视化、CSV数据导入、多车型/多特性管理能力。

## 技术栈

- **前端**: 原生 HTML/JavaScript
- **后端**: Python + FastAPI + Uvicorn
- **数据库**: SQLite

## 快速开始

### 1. 环境要求

- Python 3.11+
- Node.js（可选，仅用于静态文件本地服务）

### 2. 安装后端依赖

```bash
cd backend
pip install -r requirements.txt
```

或使用虚拟环境：

```bash
python -m venv .venv
source .venv/bin/activate  # macOS/Linux
pip install -r requirements.txt
```

### 3. 启动后端服务

```bash
cd backend
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

服务启动后：
- API 文档: http://localhost:8000/docs
- 健康检查: http://localhost:8000/

### 4. 启动前端

直接用浏览器打开 [index.html](index.html) 即可，或使用任意静态文件服务：

```bash
# 使用 Python 内置服务
python -m http.server 3000

# 或使用 npx
npx serve .
```

然后访问 http://localhost:3000

## 配置文件

前端配置通过 [config.js](config.js) 管理，包含：

| 配置项 | 说明 |
|--------|------|
| `project` | 项目基本信息（名称、启动日期、商用日期） |
| `executors` | 测试执行人列表 |
| `features` | 特性树（特性 → 子特性） |
| `vehicles` | 车型列表（品牌 → 子车型 → 里程碑） |
| `dimensions` | 五维度定义（台架/实车/冒烟/点检/E2E） |

修改配置后刷新页面即可生效。

## API 接口

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/api/config` | 获取项目配置（从 config.js 解析） |
| POST | `/api/case-progress/import-csv` | 导入 CSV 进度数据 |
| GET | `/api/projects` | 获取项目列表 |
| POST | `/api/projects` | 创建/更新项目 |

## CSV 导入格式

CSV 文件需包含以下列：

```csv
subVehicleId,subFeatureId,dimension,passedCases,totalCases
sv1,sf1,benchTest,8,10
sv1,sf1,vehicleTest,6,10
```

- `subVehicleId`: 子车型 ID（对应 config.js 中的 vehicles）
- `subFeatureId`: 子特性 ID（对应 config.js 中的 features）
- `dimension`: 维度 key（benchTest / vehicleTest / smokeTest / pointCheck / e2eTest）
- `passedCases`: 已通过用例数
- `totalCases`: 总用例数

项目根目录下提供了示例文件 [demo.csv](demo.csv)。

## 五维度说明

| 维度 | 名称 | 类型 |
|------|------|------|
| benchTest | 内部台架测试 | 自动计算 |
| vehicleTest | 内部实车测试 | 自动计算 |
| smokeTest | 集成冒烟测试 | 手动填写 |
| pointCheck | 实车点检 | 手动填写 |
| e2eTest | 整车E2E验证 | 手动填写 |

## 项目结构

```
TM_v1.5/
├── index.html          # 前端主页面
├── config.js           # 前端配置文件
├── demo.csv            # 示例 CSV 数据
├── backend/
│   ├── main.py         # FastAPI 应用入口
│   ├── database.py     # SQLite 数据库初始化
│   ├── models.py       # Pydantic 数据模型
│   ├── requirements.txt
│   ├── routers/
│   │   ├── projects.py       # 项目相关路由
│   │   └── case_progress.py  # 用例进度相关路由
│   └── services/
│       └── csv_handler.py    # CSV 解析服务
└── SPEC.md             # 项目规格说明
```
