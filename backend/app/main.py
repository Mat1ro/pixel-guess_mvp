from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routes.game import game_router

app = FastAPI(title="Pixel-Guess Trainer", version="1.0.0")

# Настройка CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Включение маршрутов
app.include_router(game_router, prefix="/api")

@app.get("/")
async def root():
    return {"message": "Pixel-Guess Trainer API"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 