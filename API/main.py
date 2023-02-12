from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from courier import alert
import sqlite3


app = FastAPI()

origins = ["http://localhost:3000", "localhost:3000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

baseCondition = {"heartrate": 100, "oxygen": 100, "bpUp": 100,
                 "bpLow": 100, "stress": 100, "temp": 100}


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
            consEmail  VARCHAR(255) NOT NULL
        )'''
    )

    cur.execute(
        f"INSERT INTO patients VALUES (:id, :name, :age, :email, :password, :bloodGrp, :consEmail)", details)

    con.commit()

    print(details)

    cur.close()
    return {"Patient": "Signed-Up"}


@app.post("/signin")
async def signin(details: dict):
    con = sqlite3.connect("../db/patient.db")
    cur = con.cursor()

    try:
        res = cur.execute(
            'SELECT password, id FROM patients WHERE email="{0}"'.format(details["email"]))
        r = res.fetchone()
        print(r[0])
        print(details["password"])

        if (r[0] == details["password"]):
            return {"valid": True, "id": r[1]}

        return {"valid": False, "reason": "Incorrect password"}

    except:
        return {"valid": False, "reason": "Please enter valid email address"}


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

    for x in details.keys():
        if x == "id":
            continue
        if (float(details[x]) > float(baseCondition[x])):
            res = cur.execute(
                'SELECT email FROM patients WHERE id="{0}"'.format(details["id"]))
            email = res.fetchone()[0]
            alert(email, details["id"])
            return {"vitals": "abnormal"}

    cur.close()

    return {"vitals": "normal"}


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
