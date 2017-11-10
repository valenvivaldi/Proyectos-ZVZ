create schema basep1;

set search_path = basep1;

create table Animal(idanimal integer);

create table Gato(idanimal integer, nombre varchar(50),color varchar(50), raza varchar(50), constraint pkgato primary key(idanimal), constraint fkgato foreign key(idanimal) references Animal(idanimal) );

create table Perro(idanimal integer, nombre varchar(50),color varchar(50), raza varchar(50), constraint pkperro primary key(idanimal),constraint fkperro foreign key(idanimal) references Animal(idanimal));

----------------------------------------------------------------------------------------------

create schema basep2;

set search_path = basep2;


create table Animal(idanimal integer, descripcion varchar(100)); --esta tiene un atributo de mas(descripcion)

create table Gato(idanimal integer, nombre varchar(50),color varchar(50), raza varchar(50), constraint pkgato primary key(idanimal), constraint fkgato foreign key(idanimal) references Animal(idanimal) );

create table Perro(idanimal integer, nombre varchar(50),color varchar(50), raza varchar(50), constraint pkperro primary key(idanimal),constraint fkperro foreign key(idanimal) references Animal(idanimal));
  
