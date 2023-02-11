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
            id VARCHAR(50) PRIMARY KEY, 
            name VARCHAR(255) NOT NULL,
            age INTEGER NOT NULL,
            email VARCHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL,
            bloodGrp VARCHAR(5) NOT NULL,
            consNumber  VARCHAR(15) NOT NULL
        )'''
    )

    cur.execute(
        f"INSERT INTO patients VALUES (:id, :name, :age, :email, :password, :bloodGrp, :consNumber)", details)

    con.commit()

    print(details)

    cur.close()
    return {"Patient": "Signed-Up"}


@app.post("/signin")
async def signin(details: dict):
    con = sqlite3.connect("../db/patient.db")
    cur = con.cursor()

    res = cur.execute(
        'SELECT password FROM patients WHERE email="{0}"'.format(details["email"]))

    pw = res.fetchone()
    print(pw[0])
    print(details["password"])
    print(pw[0] == details["password"])

    if (pw[0] == details["password"]):
        return {"valid": True}

    return {"valid": False}


@app.post("/vitals/add")
async def addVitals(details: dict):
    con = sqlite3.connect("../db/patient.db")
    cur = con.cursor()
    cur.execute(
        '''
        CREATE TABLE IF NOT EXISTS vitals (
            id VARCHAR(50) NOT NULL, 
            heartrate INTEGER NOT NULL,
            oxygen INTEGER NOT NULL,
            bpUp INTEGER NOT NULL,
            bpLow INTEGER NOT NULL,
            stress INTEGER NOT NULL,
            temp FLOAT NOT NULL
        )'''
    )

    cur.execute(
        f"INSERT INTO vitals VALUES (:id, :heartrate, :oxygen, :bpUp, :bpLow, :stress, :temp)", details)

    con.commit()
    cur.close()

    return {"vitals": "added"}


@app.post("/vitals/get")
async def getVitals(details: dict):
    con = sqlite3.connect("../db/patient.db")
    cur = con.cursor()

    res = cur.execute(
        'SELECT * FROM vitals WHERE id="{0}"'.format(details["id"]))

    desc = res.description
    column_names = [col[0] for col in desc]
    data = [dict(zip(column_names, row))
            for row in res.fetchall()]

    print(data)
    return data
