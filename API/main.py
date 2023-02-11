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


@app.post("/signup")
async def insert(details: dict):
    con = sqlite3.connect("../db/patient.db")
    cur = con.cursor()
    cur.execute(
        '''
        CREATE TABLE IF NOT EXISTS patients (
            id VARCHAR(50) FOREIGN KEY PRIMARY KEY, 
            name VARCHAR(255) NOT NULL,
            age INTEGER NOT NULL,
            email VARCHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL,
            bloodGrp VARCHAR(5) NOT NULL,
            consNumber  VARCHAR(15) NOT NULL,
        )'''
    )

    cur.execute(
        f"INSERT INTO patient VALUES (:id, :name, :age, :email, :password, :bloodGrp, :consNumber)", details)

    con.commit()

    print(details)

    cur.close()
    return {"Patient": "Signed-Up"}


@app.get("/signin")
async def signin(email: str, password: str):
    con = sqlite3.connect("../db/patient.db")
    cur = con.cursor()

    res = cur.execute(f"SELECT password FROM patients WHERE email=?", (email))

    pw = res.fetchone()

    if (pw == password):
        return True

    return False


@app.post("/vitals/add")
async def addVitals(details: dict):
    con = sqlite3.connect("../db/patient.db")
    cur = con.cursor()
    cur.execute(
        '''
        CREATE TABLE IF NOT EXISTS vitals (
            id VARCHAR(50) FOREIGN KEY PRIMARY KEY, 
            heartrate INTEGER NOT NULL,
            oxygen INTEGER NOT NULL,
            bpUp INTEGER NOT NULL,
            bpLow INTEGER NOT NULL,
            stress INTEGER NOT NULL,
            temp FLOAT NOT NULL,
        )'''
    )

    cur.execute(
        f"INSERT INTO vitals VALUES (:id, :heartrate, :oxygen, :bpUp, :bpLow, :stress, :temp)", details)


@app.get("vitals/get")
async def getVitals(id: str):
    con = sqlite3.connect("../db/patient.db")
    cur = con.cursor()

    res = cur.execute(f"SELECT * FROM vitals WHERE id=?", id)

    return res
