import java.sql.Connection;
import java.sql.DatabaseMetaData;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Iterator;
import java.util.LinkedList;

public class Procedure {
	

	private String nombre;
	private String schema;
	private LinkedList<ParametroProcedure> listaParametros;
	
	public Procedure(String string) {
		this.setNombre(string);
		this.listaParametros=new LinkedList<ParametroProcedure>();
	}

	public void Cargar(Connection connection) {
			ResultSet parametros = null;
			
			try {

				DatabaseMetaData metaData = connection.getMetaData();
				parametros = metaData.getProcedureColumns(null,this.schema,this.getNombre(),null);
				ParametroProcedure param;
				while(parametros.next()) {
					param = new ParametroProcedure (parametros.getString(4),parametros.getShort(5),parametros.getString(7));
					this.listaParametros.add(param);
					

				}
			} catch (SQLException e) {
				System.out.println("ERROR EN CARGAR PROCEDURE");
				e.printStackTrace();
		
		}
		
	}

	public void setSchema(String sch) {
		this.schema=sch;
		
	}

	public void imprimirProcedure() {
		System.out.println("PROCEDURE "+this.nombre+":");
		Iterator<ParametroProcedure> iter = this.listaParametros.iterator();
		ParametroProcedure actual;
		while(iter.hasNext()) {
			actual=iter.next();
			actual.imprimirParametroProcedure();
		}
		
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public void CompararProcedures(Procedure other, String db1, String db2) {
		LinkedList<ParametroProcedure> parametrosThisPropios = this.obtenerParametrosPropios(other);
		LinkedList<ParametroProcedure> parametrosOtherPropios = other.obtenerParametrosPropios(this);
		
		if((parametrosThisPropios.size()==0) && (parametrosOtherPropios.size()==0)) {
			System.out.println("LOS PROCEDIMIENTOS TIENEN LOS MISMO PARAMETROS");

		}
		
		LinkedList<String> parametrosEnComun = this.obtenerParametrosComunes(other);
		if(parametrosEnComun.size()>0) {
			System.out.println("LOS PARAMETROS DE AMBOS PROCEDIMIENTOS SON");
		}
		
		Iterator<String> iter = parametrosEnComun.iterator();
		while (iter.hasNext()) {
			String nombreParametroComun= iter.next();
			this.obtenerParametro(nombreParametroComun).CompararParametros(other.obtenerParametro(nombreParametroComun),db1,db2);
		}
		
		Iterator<ParametroProcedure> iterParametro = parametrosThisPropios.iterator();
		if(parametrosThisPropios.size()>0) {
			System.out.println("LOS SIGUIENTES PARAMETROS SE ENCUENTRAN SOLO EN PROCEDIMIENTO "+this.getNombre()+"de la base "+db1);	
		}
		
		
		ParametroProcedure actual;
		while (iterParametro.hasNext()) {
			actual = iterParametro.next();
			actual.imprimirParametroProcedure();
		}
		
		if(parametrosOtherPropios.size()>0) {
			System.out.println("LOS SIGUIENTES PARAMETROS SE ENCUENTRAN SOLO EN PROCEDIMIENTO "+other.getNombre()+"de la base "+db2);	
		}
		
		iterParametro = parametrosOtherPropios.iterator();
		while (iterParametro.hasNext()) {
			actual = iterParametro.next();
			actual.imprimirParametroProcedure();
		}
		
		
		
	}	

	private ParametroProcedure obtenerParametro(String nombre) {
		ParametroProcedure res;
		Iterator<ParametroProcedure> iter = this.listaParametros.iterator();
		while(iter.hasNext()) {
			res = iter.next();
			if(res.getNombre().equals(nombre)) {
				return res;
			}
		}
		return null ;

	}

	private LinkedList<String> obtenerParametrosComunes(Procedure other) {
		LinkedList<String> result = new LinkedList<String>();
		Iterator<ParametroProcedure> iter = this.listaParametros.iterator();
		while(iter.hasNext()) {
			String aux= iter.next().getNombre();

			if(other.obtenerParametro(aux) != null) {
				result.add(aux);
			}

		}
		return result;
	}

	private LinkedList<ParametroProcedure> obtenerParametrosPropios(Procedure other) {
		LinkedList<ParametroProcedure> result = new LinkedList<ParametroProcedure>();
		Iterator<ParametroProcedure> iter = this.listaParametros.iterator();
		while(iter.hasNext()) {
			ParametroProcedure aux= iter.next();
			if(other.obtenerParametro(aux.getNombre()) == null) {
				result.add(aux);
			}

		}
		return result;
	}

}
