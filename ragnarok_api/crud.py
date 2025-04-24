from sqlalchemy.orm import Session
from modelos import Monstro
from schemas import MonstroCreate

def get_monstros(db: Session):
    return db.query(Monstro).all()

def get_monstro(db:Session, monstro_id: int):
    return db.query(Monstro).filter(monstro_id == Monstro.id).first()

def create_monstro(db:Session, monstro = MonstroCreate):
    db_monstro = Monstro(**monstro.dict())
    db.add(db_monstro)
    db.commit()
    db.refresh(db_monstro)
    return db_monstro


def delete_monstro(db:Session, monstro_id:int):
    monstro = db.query(Monstro).filter(Monstro.id == monstro_id).first()
    if monstro:
        db.delete(monstro)
        db.commit()
        return True
    return False

def update_monstro(db:Session, monstro_id:int, dados: MonstroCreate):
    monstro = db.query(Monstro).filter(Monstro.id == monstro_id).first()
    if monstro:
        for key, value in dados.dict().items():
            setattr(monstro,key,value)
        db.commit()
        db.refresh(monstro)
        return monstro
    return None