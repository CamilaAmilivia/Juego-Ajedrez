from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import chess
import chess.svg

app = FastAPI()

origins = ['http://localhost:7173']

