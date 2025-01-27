from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import chess
import chess.svg

app = FastAPI()

origins = ['http://localhost:5173']

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins, 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

board = chess.Board()

@app.get("/pieces")
async def get_pieces():
    return {}

@app.get("/make_move/(move)")
async def make_move(move: str):
    return {}


@app.get("/reset")
async def reset():
    return {}

