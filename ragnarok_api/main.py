from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import crud, schemas
from database import SessionLocal, engine, Base

Base.metadata.create_all(bind = engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # ou ["*"] para liberar geral
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
    
@app.get("/monstros/", response_model=list[schemas.Monstro])
def lista_monstros(db:Session = Depends(get_db)):
    return crud.get_monstros(db)

@app.get("/monstros/{monstro_id}", response_model=schemas.Monstro)
def pegar_monstro(monstro_id: int, db:Session = Depends(get_db)):
    monstro = crud.get_monstro(db, monstro_id)
    if not monstro:
        raise HTTPException(status_code=404, detail = "Monstro não encontrado")
    return monstro

@app.post("/monstros/", response_model= schemas.Monstro)
def criar_monstro(monstro: schemas.MonstroCreate, db:Session = Depends(get_db)):
    return crud.create_monstro(db, monstro)

@app.put("/monstros/{monstro_id}", response_model=schemas.Monstro)
def atualizar_monstro(monstro_id: int, dados: schemas.MonstroCreate, db: Session = Depends(get_db)):
    monstro = crud.update_monstro(db, monstro_id, dados)
    if not monstro:
        raise HTTPException(status_code=404, detail="Monstro não encontrado")
    return monstro

@app.delete("/monstros/{monstro_id}")
def deletar_monstro(monstro_id: int, db: Session = Depends(get_db)):
    ok = crud.delete_monstro(db, monstro_id)
    if not ok:
        raise HTTPException(status_code=404, detail="Monstro não encontrado")
    return {"ok": True}    



