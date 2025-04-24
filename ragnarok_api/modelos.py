from sqlalchemy import Column, Integer, String, Float
from database import Base

class Monstro(Base):
    __tablename__ = "Monstros"

    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String, nullable = False)
    hp = Column(Integer)
    dps = Column(Float)
    elemento = Column(String)
    tamanho = Column(String)