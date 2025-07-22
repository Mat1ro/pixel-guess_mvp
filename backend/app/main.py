import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from .routes.game import game_router

# Загружаем переменные окружения
load_dotenv()

app = FastAPI(title="Pixel Guess Game", version="1.0.0")

# Получаем разрешенные origins из переменных окружения
allowed_origins = [
    "http://localhost:3000",
    "http://localhost:3001",
    "https://localhost:3000",
    "https://localhost:3001",
]

# Добавляем Vercel домены если указаны
frontend_url = os.getenv("FRONTEND_URL")
if frontend_url:
    allowed_origins.append(frontend_url)
    # Добавляем возможные варианты Vercel доменов
    allowed_origins.extend([
        "https://*.vercel.app",
        "https://vercel.app"
    ])

# Настройка CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # В production лучше указать конкретные домены
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Включение маршрутов
app.include_router(game_router, prefix="/api")

@app.get("/")
async def root():
    return {"message": "Pixel Guess Game API", "status": "running"}

@app.get("/health")
async def health():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port) 