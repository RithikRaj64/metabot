from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import sqlite3

app = FastAPI()

origins = ["http://localhost:3000", "localhost:3000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


class Data(BaseModel):
    id: int
    name: str


@app.post("/insert")
async def insert(details: dict):
    con = sqlite3.connect("../db/patient.db")
    cur = con.cursor()
    cur.execute(
        "CREATE TABLE IF NOT EXISTS patient (id INTEGER PRIMARY KEY, name VARCHAR(255) NOT NULL)")
    cur.execute(
        f"INSERT INTO patient (id, name) VALUES (:id, :name)", details)
    con.commit()
    print(details)

    cur.close()
    return {"Records": "Inserted"}
