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
		// TODO Auto-generated method stub
		
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
		
		System.out.println("LOS PARAMETROS DE AMBOS PROCEDIMIENTOS SON");
		LinkedList<String> parametrosEnComun = this.obtenerParametrosComunes(other);
		Iterator<String> iter = parametrosEnComun.iterator();
		while (iter.hasNext()) {
			String nombreParametroComun= iter.next();
			this.obtenerParametro(nombreParametroComun).CompararParametros(other.obtenerParametro(nombreParametroComun),db1,db2);
		}
		
		
		System.out.println("LOS SIGUIENTES PARAMETROS SE ENCUENTRAN SOLO EN PROCEDIMIENTO "+this.getNombre());
		Iterator<ParametroProcedure> iterParametro = parametrosThisPropios.iterator();
		ParametroProcedure actual;
		while (iterParametro.hasNext()) {
			actual = iterParametro.next();
			actual.imprimirParametroProcedure();
		}
		
		System.out.println("LOS SIGUIENTES PARAMETROS SE ENCUENTRAN SOLO EN PROCEDIMIENTO "+other.getNombre());
		iterParametro = parametrosOtherPropios.iterator();
		while (iterParametro.hasNext()) {
			actual = iterParametro.next();
			actual.imprimirParametroProcedure();
		}
		
		
		
	}	

	private ParametroProcedure obtenerParametro(String parametrosEnComun) {
		ParametroProcedure res;
		Iterator<ParametroProcedure> iter = this.listaParametros.iterator();
		while(iter.hasNext()) {
			res = iter.next();
			if(res.getNombre()==nombre) {
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
