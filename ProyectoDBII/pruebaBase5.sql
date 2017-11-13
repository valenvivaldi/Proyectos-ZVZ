create schema basep1;

set search_path = basep1;

create table Animal(idanimal integer primary key);

create table Gato(idanimal integer, nombre varchar(50),color varchar(50), raza varchar(50), constraint pkgato primary key(idanimal), constraint fkgato foreign key(idanimal) references Animal(idanimal) );

create table Perro(idanimal integer, nombre varchar(50),color varchar(50), raza varchar(50), constraint pkperro primary key(idanimal),constraint fkperro foreign key(idanimal) references Animal(idanimal));

  CREATE OR REPLACE FUNCTION p(IN param int, IN p int, in r int, IN re int) returns void AS
  $$
  BEGIN
    r := param + p;
  END;
  $$ LANGUAGE plpgsql;
  
  CREATE OR REPLACE FUNCTION p1(IN param int, IN p int, in r int, IN re date) returns void AS --parametro con mismo nombre pero distinto tipo
  $$
  BEGIN
    r := param + p;
  END;
  $$ LANGUAGE plpgsql;
  
  
  CREATE OR REPLACE FUNCTION p2(IN param int, IN p int, in r int, IN re imt) returns int AS --mismo nombre de procedure. Distinto tipo de retorno
  $$
  BEGIN
    r := param + p;
  END;
  $$ LANGUAGE plpgsql;
----------------------------------------------------------------------------------------------

create schema basep2;

set search_path = basep2;


create table Animal(idanimal integer primary key, descripcion varchar(100)); --esta tiene un atributo de mas(descripcion)

create table Gato(idanimal integer, nombre varchar(50),color varchar(50), raza varchar(50), constraint pkgato primary key(idanimal), constraint fkgato foreign key(idanimal) references Animal(idanimal) );

create table Perro(idanimal integer, nombre varchar(50),color varchar(50), raza varchar(50), constraint pkperro primary key(idanimal),constraint fkperro foreign key(idanimal) references Animal(idanimal));

  CREATE OR REPLACE FUNCTION p(IN param int, IN p int, IN r int) returns void AS
  $$
  BEGIN
    r := param + p;
  END;
  $$ LANGUAGE plpgsql;
  
    CREATE OR REPLACE FUNCTION p1(IN param int, IN p int, in r int, IN re int) returns void AS
  $$
  BEGIN
    r := param + p;
  END;
  $$ LANGUAGE plpgsql;
  
  CREATE OR REPLACE FUNCTION p2(IN param int, IN p int, in r int, IN re imt) returns void AS
  $$
  BEGIN
    r := param + p;
  END;
  $$ LANGUAGE plpgsql;
