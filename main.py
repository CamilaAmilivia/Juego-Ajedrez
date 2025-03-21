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
    return {
        "WHITE" : {
            "ROOK" : chess.svg.piece(chess.Piece.from_symbol("R")),
            "PAWN" : chess.svg.piece(chess.Piece.from_symbol("P")),
            "KNIGHT" : chess.svg.piece(chess.Piece.from_symbol("N")),
            "BISHOP" : chess.svg.piece(chess.Piece.from_symbol("B")),
            "QUEEN" : chess.svg.piece(chess.Piece.from_symbol("Q")),
            "KING" : chess.svg.piece(chess.Piece.from_symbol("K")),
        },
        "BLACK" : {
            "ROOK" : chess.svg.piece(chess.Piece.from_symbol("r")),
            "PAWN" : chess.svg.piece(chess.Piece.from_symbol("p")),
            "KNIGHT" : chess.svg.piece(chess.Piece.from_symbol("n")),
            "BISHOP" : chess.svg.piece(chess.Piece.from_symbol("b")),
            "QUEEN" : chess.svg.piece(chess.Piece.from_symbol("q")),
            "KING" : chess.svg.piece(chess.Piece.from_symbol("k")),
        },
    }

@app.get("/make_move/{move}")
async def make_move(move: str):
    if chess.Move.from_uci(move) in board.legal_moves :
        board.push_uci(move)
        return{
            "move_made": move,
            "turn": "white" if board.turn == chess.WHITE else "black",
            "legal_moves": [move.uci() for move in board.legal_moves] 
        }
    else: 
        return{"error" : "invalid movement"}


@app.get("/reset")
async def reset():
    board.reset()
    return {"message": "end game"}