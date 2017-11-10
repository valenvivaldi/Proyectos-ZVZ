create schema basep3;

set search_path = basep3;

create table Producto(idproducto integer primary key,valor double,descripcion varchar(100));

create table Proveedor(idproveedor integer,dni integer, nombre varchar(50), edad float, constraint pkproveedor primary key(idproveedor));

create table Provee(idproveedor integer primary key,idproducto integer primary key,precio double, cantidad integer, constraint fkprovee foreign key(idproducto) references Producto(idproducto),constraint fkprovee1 foreign key(idproveedor) references Proveedor(idproveedor));

----------------------------------------------------------------------------------------------------

create schema basep4;

set search_path = basep4;

create table Producto(idproducto integer, valor float, descripcion varchar(100),constraint pkproducto primary key(idproducto)); --valor distinto a basep3...aca es float, en basep3 es double
                                                                                                                                --aca la primary key esta escrito como constraint, en basep3 no...ver si hay dif(no tendria)
create table Proveedor(idproveedor integer,dni integer CONSTRAINT unicodni UNIQUE, nombre varchar(50), antiguedad integer, edad integer, constraint pkproveedor primary key(idproveedor));--aca  edades integer en la otra  es float
                                                                                                                                                    --campo adicional antiguedad(integer)
                                                                                                                                                    --dni es unique(constraint)
                                                                                                                                                    --EDAD ACA ES integer EN LA OTRA ES FLOAT

create table Provee(idproveedor integer primary key,idproducto integer primary key,precio double, cantidad integer, constraint fkprovee foreign key(idproducto) references Producto(idproducto),constraint fkprovee1 foreign key(idproveedor) references Proveedor(idproveedor));

create table ProveedorEliminados(idproveedor, varchar nombre, antiguedad integer, fecha date);--esta tabla en la otra base no esta


--este procedure/function no esta en basep3
  create or replace function auditoria() returns trigger as
  	'Begin
  		insert into basep4.ProveedorEliminados values (old.idproveedor,old.nombre,old.antiguedad,current_date);
  		return null;
  	end;'
  	LANGUAGE 'plpgsql';

--este trigger no esta en basep3
  create trigger TriggerAuditoria after delete on  basep4.Proveedor for each row execute procedure auditoria();
