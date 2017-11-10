import java.sql.Connection;
import java.sql.DatabaseMetaData;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Iterator;
import java.util.LinkedList;


public class Base {

	private LinkedList<Procedure> listaProcedures;


	public Base(String nombre) {
		this.nombre = nombre;
		this.listaTablas=new LinkedList<Tabla>();


		this.listaProcedures = new LinkedList<Procedure>();

	}

	private LinkedList<Tabla> listaTablas;
	private String nombre;


	public void addTabla (Tabla nueva) {
		this.listaTablas.add(nueva);

	}
	


	/**
	 * @return the listaTablas
	 */
	public LinkedList<Tabla> getListaTablas() {
		return listaTablas;
	}

	/**
	 * @param listaTablas the listaTablas to set
	 */
	public void setListaTablas(LinkedList<Tabla> listaTablas) {
		this.listaTablas = listaTablas;
	}

	/**
	 * @return the nombre
	 */
	public String getNombre() {
		return nombre;
	}

	/**
	 * @param nombre the nombre to set
	 */

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	@Override
	public String toString() {
		return "Base [listaTablas=" + listaTablas + ", nombre=" + nombre + "]";
	}





	public void CargarTablas(Connection connection) {
		String[] tipo = {"TABLE"};
		ResultSet resultSetTables;
		try {
			DatabaseMetaData metaData = connection.getMetaData();
			resultSetTables = metaData.getTables(null,this.nombre, null, tipo);
			while(resultSetTables.next()) {
				System.out.println(" nombre: " + resultSetTables.getString(3));
				System.out.println(" tipo: " + resultSetTables.getString(4));
				System.out.println("----------------------------------------------------------");


				Tabla nuevaTabla = new Tabla(resultSetTables.getString(3));
				nuevaTabla.setSchema(this.nombre);
				nuevaTabla.Cargar(connection);

				this.listaTablas.add(nuevaTabla);



			}

		} catch (SQLException e) {
			System.out.println("error durante extraccion de las tablas de la base "+this.nombre);	
			System.out.println(e.toString());
			e.printStackTrace();
		}









	}
	public void CargarProcedures(Connection connection) {
		
		ResultSet resultSetProc;
		try {
			DatabaseMetaData metaData = connection.getMetaData();
			resultSetProc = metaData.getProcedures(null,this.nombre, null);
			while(resultSetProc.next()) {
				Procedure nuevoP = new Procedure(resultSetProc.getString(3));
				nuevoP.setSchema(this.nombre);
				nuevoP.Cargar(connection);
				this.listaProcedures.add(nuevoP);
			}
		} catch (SQLException e) {
			System.out.println("error durante extraccion de las tablas de la base "+this.nombre);	
			System.out.println(e.toString());
			e.printStackTrace();
		}
	}
	public void imprimirBase(){
		System.out.println("Base "+this.nombre+"("+this.listaTablas.size()+"):");
		Iterator<Tabla> iter = this.listaTablas.iterator();
		while(iter.hasNext()) {
			iter.next().imprimirTabla();
		}
		System.out.println("/Base "+this.nombre+":");
	}


	public Tabla obtenerTabla(String nombre) {
		Tabla res;
		Iterator<Tabla> iter = this.listaTablas.iterator();
		while(iter.hasNext()) {
			res = iter.next();
			if(res.getNombre().equals(nombre)) {
				return res;
			}
		}
		return null ;

	}



	public void CargarCatalogo(Connection connection1) {

		CatalogoPostgres cat = new CatalogoPostgres();

		LinkedList<Trigger> listaTriggers = cat.obtenerTriggers(connection1);
		cargarTriggers (listaTriggers);
		LinkedList<Check> listaChecks = cat.obtenerChecks(connection1);
		cargarChecks(listaChecks);
	}

	private void cargarChecks(LinkedList<Check> listaChecks) {
		Check aux;
		Tabla auxTabla;
		Iterator<Check> iter = listaChecks.iterator();
		while(iter.hasNext()) {
			aux = iter.next();
			auxTabla = obtenerTabla(aux.getTabla());
			if(auxTabla != null) {
				auxTabla.addCheck(aux);
			}

		}


	}
	private void cargarTriggers(LinkedList<Trigger> listaTriggers) {
		Trigger aux;
		Tabla auxTabla;
		Iterator<Trigger> iter = listaTriggers.iterator();
		while(iter.hasNext()) {
			aux = iter.next();
			auxTabla = obtenerTabla(aux.getTabla());
			if(auxTabla != null) {
				auxTabla.addTrigger(aux);
			}

		}


	}


	public LinkedList<String> ObtenerTablasComunes (Base other){
		LinkedList<String> result = new LinkedList<String>();
		Iterator<Tabla> iter = this.listaTablas.iterator();
		while(iter.hasNext()) {
			String aux= iter.next().getNombre();

			if(other.obtenerTabla(aux) != null) {
				result.add(aux);
			}

		}
		return result;
	} 

	public LinkedList<Tabla> ObtenerTablasPropias (Base other){
		LinkedList<Tabla> result = new LinkedList<Tabla>();
		Iterator<Tabla> iter = this.listaTablas.iterator();
		while(iter.hasNext()) {
			Tabla aux= iter.next();
			if(other.obtenerTabla(aux.getNombre()) == null) {
				result.add(aux);
			}

		}
		return result;
	} 


	public void CompararBases (Base other) {

		LinkedList<Tabla> tablasUnicasThis=this.ObtenerTablasPropias(other);
		LinkedList<Tabla> tablasUnicasOther=other.ObtenerTablasPropias(this);
		if(tablasUnicasThis.size()==0&&tablasUnicasOther.size()==0) {
			System.out.println("NINGUNA BASE POSEE TABLAS EXCLUSIVAS");
		}

		System.out.println("LAS SIGUIENTES TABLAS SE ENCUENTRAN EN AMBAS BASES");
		LinkedList<String> tablasEnComun = this.ObtenerTablasComunes(other);
		System.out.println(tablasEnComun);
		Iterator<String> iter = tablasEnComun.iterator();
		while (iter.hasNext()) {
			String nombreTablaComun= iter.next();
			this.obtenerTabla(nombreTablaComun).CompararTablas(other.obtenerTabla(nombreTablaComun),this.getNombre(),other.getNombre());
		}
		Iterator<Tabla> iterTabla;
		Tabla actual;
		if(tablasUnicasThis.size()>0) {
			System.out.println("LAS SIGUIENTES TABLAS SE ENCUENTRAN SOLO EN LA BASE "+this.getNombre());
			iterTabla = tablasUnicasThis.iterator();

			while (iterTabla.hasNext()) {
				actual = iterTabla.next();
				actual.imprimirTabla();
			}
		}

		if(tablasUnicasOther.size()>0) {
			System.out.println("LAS SIGUIENTES TABLAS SE ENCUENTRAN SOLO EN LA BASE "+other.getNombre());
			iterTabla = tablasUnicasOther.iterator();
			while (iterTabla.hasNext()) {
				actual= iterTabla.next();
				actual.imprimirTabla();
			}
		}


		
//------------------------------------------------------------------------------------------------------------------
		LinkedList<Procedure> proceduresUnicosThis=this.ObtenerProceduresPropios(other);
		LinkedList<Procedure> proceduresUnicosOther=other.ObtenerProceduresPropios(this);
		if(proceduresUnicosThis.size()==0&&proceduresUnicosOther.size()==0) {
			System.out.println("NINGUNA BASE POSEE TABLAS EXCLUSIVAS");
		}

		System.out.println("LOS SIGUIENTES PROCEDURES SE ENCUENTRAN EN AMBAS BASES");
		LinkedList<String> proceduresEnComun = this.ObtenerProceduresComunes(other);
		iter = proceduresEnComun.iterator();
		while (iter.hasNext()) {
			String nombreProcedureComun= iter.next();
			this.obtenerProcedure(nombreProcedureComun).CompararProcedures(other.obtenerProcedure(nombreProcedureComun),this.getNombre(),other.getNombre());
		}
		Iterator<Procedure> iterProcedure;
		Procedure actual2;
		if(proceduresUnicosThis.size()>0) {
			System.out.println("LOS SIGUIENTES PROCEDURES SE ENCUENTRAN SOLO EN LA BASE "+this.getNombre());
			iterProcedure = proceduresUnicosThis.iterator();

			while (iterProcedure.hasNext()) {
				actual2 = iterProcedure.next();
				actual2.imprimirProcedure();
			}
		}

		if(proceduresUnicosOther.size()>0) {

			System.out.println("LOS SIGUIENTES PROCEDURES SE ENCUENTRAN SOLO EN LA BASE "+other.getNombre());
			iterProcedure = proceduresUnicosOther.iterator();
			while (iterProcedure.hasNext()) {
				actual2= iterProcedure.next();
				actual2.imprimirProcedure();
			}
		}
	}



	private Procedure obtenerProcedure(String nombreProcedureComun) {
		Procedure res;
		Iterator<Procedure> iter = this.listaProcedures.iterator();
		while(iter.hasNext()) {
			res = iter.next();
			if(res.getNombre().equals(nombre)) {
				return res;
			}
		}
		return null ;
	}
	

	public LinkedList<String> ObtenerProceduresComunes (Base other){
		LinkedList<String> result = new LinkedList<String>();
		Iterator<Procedure> iter = this.listaProcedures.iterator();
		while(iter.hasNext()) {
			String aux= iter.next().getNombre();

			if(other.obtenerProcedure(aux) != null) {
				result.add(aux);
			}

		}
		return result;
	} 

	public LinkedList<Procedure> ObtenerProceduresPropios (Base other){
		LinkedList<Procedure> result = new LinkedList<Procedure>();
		Iterator<Procedure> iter = this.listaProcedures.iterator();
		while(iter.hasNext()) {
			Procedure aux= iter.next();
			if(other.obtenerProcedure(aux.getNombre()) == null) {
				result.add(aux);
			}

		}
		return result;
	} 


}
