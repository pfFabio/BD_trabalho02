create database ragnarok;
use ragnarok;

create table Monstros(
id int primary key not null AUTO_INCREMENT,
nome varchar(100) not null,
hp int,
dps float,
elemento varchar(50),
tamanho varchar(50)
);

INSERT INTO Monstros (nome, hp, dps, elemento, tamanho) 
VALUES
('Poring', 50, 2.5, 'Neutro', 'Pequeno'),
('Lunatic', 70, 3.1, 'Neutro', 'Pequeno'),
('Fabre', 60, 2.8, 'Terra', 'Pequeno'),
('Peco Peco', 450, 12.5, 'Vento', 'Médio'),
('Elder Willow', 300, 10.0, 'Fogo', 'Médio'),
('Smokie', 220, 8.7, 'Neutro', 'Pequeno'),
('Orc Warrior', 950, 21.0, 'Terra', 'Grande'),
('Marin', 110, 4.3, 'Água', 'Pequeno'),
('Muka', 400, 9.0, 'Terra', 'Médio'),
('Ghostring', 1000, 25.0, 'Sombrio', 'Médio');



select * from Monstros;