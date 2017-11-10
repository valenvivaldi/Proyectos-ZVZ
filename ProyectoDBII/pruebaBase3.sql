--COMPRUEBA SI DETECTA QUE EL FALTA primary key Y foreign key
create schema basep5;

set search_path = basep5;

create table Producto(idproducto integer primary key,valor double,descripcion varchar(100));

create table Proveedor(idproveedor integer,dni integer primary key, nombre varchar(50), edad float); --aca primary key es dni

create table Provee(idproveedor integer primary key,idproducto integer primary key,precio double, cantidad integer, constraint fkprovee foreign key(idproducto) references Producto(idproducto));--tiene solo la foreign key de producto

--------------------------------------------------------------------------
create schema basep6;

set search_path = basep6;

create table Producto(idproducto integer primary key,valor double,descripcion varchar(100),constraint valor_pos check (valor>0));--tiene check, en la otra base no

create table Proveedor(idproveedor integer primary key,dni integer, nombre varchar(50), edad float); --aca primary key es idproveedor

create table Provee(idproveedor integer primary key,idproducto integer primary key,precio double, cantidad integer, constraint fkprovee foreign key(idproducto) references Producto(idproducto),constraint fkprovee1 foreign key(idproveedor) references Proveedor(idproveedor),constraint precio_positivo check (precio>0));
  --tiene las foreign key de producto y Proveedor
  --tiene check en la otra base no
