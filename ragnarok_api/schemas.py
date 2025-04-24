from pydantic import BaseModel

class MonstroBase(BaseModel):
    nome: str
    hp: int
    dps: float
    elemento: str
    tamanho: str


class MonstroCreate(MonstroBase):
    pass

class Monstro(MonstroBase):
    id: int

    class Config:
        orm_mode = True