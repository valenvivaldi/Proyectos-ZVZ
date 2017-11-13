import java.sql.Connection;
import java.sql.DatabaseMetaData;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Iterator;
import java.util.LinkedList;


public class Tabla {
	private String schema;
	private String nombre;
	private LinkedList<Atributo> listaAtributos;
	private LinkedList<Trigger> listaTriggers;
	private LinkedList<Check> listaChecks;

	public Tabla(String nombre) {

		this.nombre = nombre;
		this.listaAtributos=new LinkedList<Atributo>();
		this.listaTriggers=new LinkedList<Trigger>();
		this.listaChecks=new LinkedList<Check>();

	}

	public void addAtributo(Atributo n) {
		this.listaAtributos.add(n);
	}





	/**
	 * @return the listaAtributos
	 */
	public LinkedList<Atributo> getListaAtributos() {
		return listaAtributos;
	}

	/**
	 * @param listaAtributos the listaAtributos to set
	 */
	public void setListaAtributos(LinkedList<Atributo> listaAtributos) {
		this.listaAtributos = listaAtributos;
	}

	@Override
	public String toString() {
		return "Tabla [schema=" + schema + ", nombre=" + nombre + ", listaAtributos=" + listaAtributos + "]";
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


















	public void CargarBasico(Connection connection) {
		ResultSet atributos = null;
		String n =null;
		try {

			DatabaseMetaData metaData = connection.getMetaData();
			atributos = metaData.getColumns(null,this.schema,this.nombre, null);
			while(atributos.next()) {
				n =atributos.getString(4);
				System.out.println(" nombre: " +n );
				System.out.println(" tipo: " + atributos.getString(6));
				Atributo nuevoAtributo = new Atributo(atributos.getString(4),atributos.getString(6));
				if(atributos.getString(18).equals("YES")) {
					nuevoAtributo.setNullable(true);
				}


				this.listaAtributos.add(nuevoAtributo);
			}
		} catch (SQLException e) {
	
			System.out.println("error durante carg de tabla (carga basica)");
			e.printStackTrace();
		}
	}

	public void CargarClavesPrimarias(Connection connection) {
		ResultSet atributos = null;
		String n =null;
		try {

			DatabaseMetaData metaData = connection.getMetaData();
			atributos = metaData.getPrimaryKeys(null,this.schema,this.nombre);
			while(atributos.next()) {
				n =atributos.getString(4);
				System.out.println(" la columna  " +n+" es pk" );
				buscarAtributo(n).setPrimaryKey(true);
			}
		} catch (SQLException e) {
			
			System.out.println("error durante carg de tabla (carga de claves primarias)");
			e.printStackTrace();
		}
	}

	public void CargarIndices(Connection connection) {
		ResultSet atributos = null;
		String nombre =null;
		String indicenombre=null;
		boolean unica;
		Atributo actual =null;
		try {

			DatabaseMetaData metaData = connection.getMetaData();
			atributos = metaData.getIndexInfo(null,this.schema,this.nombre,false,false);
			while(atributos.next()) {
				if (atributos.getString(9)!=null) {
					nombre =atributos.getString(9);
					indicenombre =atributos.getString(6);
					unica = !(atributos.getBoolean(4));
					actual = buscarAtributo(nombre);
					actual.setIndexnombre(indicenombre);
					actual.setUnique(unica);
				}


			}
		} catch (SQLException e) {
			
			System.out.println("error durante carg de tabla (indices y claves unicas)");
			e.printStackTrace();
		}
	}

	public void CargarClavesForaneas(Connection connection) {
		ResultSet atributos = null;
		
		try {

			DatabaseMetaData metaData = connection.getMetaData();
			atributos = metaData.getImportedKeys(null,this.schema,this.nombre);
			while(atributos.next()) {
				String fkname = atributos.getString(8);
				String pkname = atributos.getString(4);
				String pktable = atributos.getString(3);
				Atributo actual = buscarAtributo(fkname);
				actual.setRefAtributo(pkname);
				actual.setRefTabla(pktable);

			}
		} catch (SQLException e) {
			
			System.out.println("error durante carg de tabla (carga claves foraneas)");
			e.printStackTrace();
		}
	}


	public void Cargar(Connection connection) {
		this.CargarBasico(connection);
		this.CargarClavesPrimarias(connection);
		this.CargarClavesForaneas(connection);
		this.CargarIndices(connection);

	}

	public String getSchema() {
		return schema;
	}

	public void setSchema(String schema) {
		this.schema = schema;
	}

	public Atributo buscarAtributo(String name) {
		
		Atributo actual=null;
		Iterator<Atributo> iter =this.listaAtributos.iterator();
		while (iter.hasNext()) {
			actual = iter.next();
			if (actual.getNombre().equals(name)) {
				return actual;
			}
		}


		return actual;	
	}

	public void imprimirTabla() {
		System.out.println("");
		System.out.println("  Tabla "+this.nombre+"("+this.listaAtributos.size()+"):");
		Iterator<Atributo> iter = this.listaAtributos.iterator();
		while(iter.hasNext()) {
			iter.next().imprimirAtributo();
		}
	}

	public void addTrigger(Trigger aux) {
		this.listaTriggers.add(aux);
		
	}

	public void addCheck(Check aux) {
		this.listaChecks.add(aux);
		
	}


	public Check buscarCheck(String nombre) {

		Check actual=null;
		Iterator<Check> iter =this.listaChecks.iterator();
		while (iter.hasNext()) {
			actual = iter.next();
			if (actual.getNombre().equals(nombre)) {
				return actual;
			}
		}


		return actual;	



	}

	public Trigger buscarTrigger(String nombre) {

		Trigger actual=null;
		Iterator<Trigger> iter =this.listaTriggers.iterator();
		while (iter.hasNext()) {
			actual = iter.next();
			if (actual.getNombre().equals(nombre)) {
				return actual;
			}
		}
		return actual;	
	}

	

	public LinkedList<String> ObtenerAtributosComunes(Tabla other){
		LinkedList<String> result = new LinkedList<String>();
		Iterator<Atributo> iter = this.listaAtributos.iterator();
		while(iter.hasNext()) {
			String aux= iter.next().getNombre();

			if(other.buscarAtributo(aux) != null) {
				result.add(aux);
			}

		}
		return result;

	}
	public LinkedList<String> ObtenerChecksComunes(Tabla other){
		LinkedList<String> result = new LinkedList<String>();
		Iterator<Check> iter = this.listaChecks.iterator();
		while(iter.hasNext()) {
			String aux= iter.next().getNombre();

			if(other.buscarCheck(aux) != null) {
				result.add(aux);
			}

		}
		return result;
	}

	public LinkedList<String> ObtenerTriggersComunes(Tabla other){
		LinkedList<String> result = new LinkedList<String>();
		Iterator<Trigger> iter = this.listaTriggers.iterator();
		while(iter.hasNext()) {
			String aux= iter.next().getNombre();

			if(other.buscarTrigger(aux) != null) {
				result.add(aux);
			}

		}
		return result;
	}

	
	public LinkedList<Atributo> ObtenerAtributosPropios (Tabla other){
		LinkedList<Atributo> result = new LinkedList<Atributo>();
		Iterator<Atributo> iter = this.listaAtributos.iterator();
		while(iter.hasNext()) {
			Atributo aux= iter.next();
			if(other.buscarAtributo(aux.getNombre()) == null) {
				result.add(aux);
			}
		}
		return result;
	} 
	
	public LinkedList<Check> ObtenerChecksPropios (Tabla other){
		LinkedList<Check> result = new LinkedList<Check>();
		Iterator<Check> iter = this.listaChecks.iterator();
		while(iter.hasNext()) {
			Check aux= iter.next();
			if(other.buscarCheck(aux.getNombre()) == null) {
				result.add(aux);
			}
		}
		return result;
	} 
	public LinkedList<Trigger> ObtenerTriggersPropios (Tabla other){
		LinkedList<Trigger> result = new LinkedList<Trigger>();
		Iterator<Trigger> iter = this.listaTriggers.iterator();
		while(iter.hasNext()) {
			Trigger aux= iter.next();
			if(other.buscarTrigger(aux.getNombre()) == null) {
				result.add(aux);
			}
		}
		return result;
	} 




	public void CompararTablas(Tabla other,String nombreBase1, String nombreBase2) {

		System.out.println("-TABLA "+this.nombre);
		LinkedList<Atributo> atributosUnicosThis=this.ObtenerAtributosPropios(other);
		LinkedList<Atributo> atributosUnicosOther=other.ObtenerAtributosPropios(this);

		if(atributosUnicosThis.size()==0&&atributosUnicosOther.size()==0) {
			System.out.println("--POSEE LOS MISMOS ATRIBUTOS EN AMBAS BASES");
		}
		
		
		System.out.println("--LOS SIGUIENTES ATRIBUTOS SE ENCUENTRAN EN LA TABLA "+this.getNombre()+" DE AMBAS BASES");
		LinkedList<String> atributosEnComun = this.ObtenerAtributosComunes(other);
		Iterator<String> iter = atributosEnComun.iterator();
		while (iter.hasNext()) {
			String nombreAtributoComun= iter.next();
			this.buscarAtributo(nombreAtributoComun).CompararAtributos(other.buscarAtributo(nombreAtributoComun),nombreBase1,nombreBase2);
		}

		Iterator<Atributo> iterAtributo;
		Atributo actual;
		if(atributosUnicosThis.size()>0) {
			System.out.println("LA TABLA "+this.getNombre()+" DE LA BASE "+nombreBase1+" POSEE "+atributosUnicosThis.size()+" QUE NO ESTAN EN LA OTRA");
			System.out.println("--LOS SIGUIENTES ATRIBUTOS  SE ENCUENTRAN SOLO EN LA EN LA TABLA "+this.getNombre()+" DE LA BASE "+nombreBase1);
			 iterAtributo = atributosUnicosThis.iterator();
			
			while (iterAtributo.hasNext()) {
				actual = iterAtributo.next();
				actual.imprimirAtributo();
			}
		}
		
		if(atributosUnicosOther.size()>0) {
			System.out.println("LA TABLA "+this.getNombre()+" DE LA BASE "+nombreBase2+" POSEE "+atributosUnicosOther.size()+" QUE NO ESTAN EN LA OTRA");
			System.out.println("--LOS SIGUIENTES ATRIBUTOS  SE ENCUENTRAN SOLO EN LA EN LA TABLA "+other.getNombre()+" DE LA BASE "+nombreBase2);
			
			iterAtributo = atributosUnicosOther.iterator();
			while (iterAtributo.hasNext()) {
				actual = iterAtributo.next();
				actual.imprimirAtributo();
			}	
		}
		//---------------------------------------------------------------------------------------------------------------------------
		
		
		//--------------------------------------------------------------------------------------------------------------------------


		LinkedList<Check> checksUnicosThis=this.ObtenerChecksPropios(other);
		LinkedList<Check> checksUnicosOther=other.ObtenerChecksPropios(this);

		if(checksUnicosThis.size()==0&&checksUnicosOther.size()==0) {
			System.out.println("--POSEE LOS MISMOS CHECK EN AMBAS BASES");
		}

		
		System.out.println("--LOS SIGUIENTES CHECK SE ENCUENTRAN EN LA TABLA "+this.getNombre()+" DE AMBAS BASES");
		LinkedList<String> checksEnComun = this.ObtenerChecksComunes(other);
		iter = checksEnComun.iterator();
		while (iter.hasNext()) {
			String nombreCheckComun= iter.next();
			this.buscarCheck(nombreCheckComun).CompararChecks(other.buscarCheck(nombreCheckComun),nombreBase1,nombreBase2);
		}
		Iterator<Check> iterCheck;
		Check actual2;
		if(checksUnicosThis.size()>0) {
			System.out.println("--LOS SIGUIENTES CHECK  SE ENCUENTRAN SOLO EN LA EN LA TABLA "+this.getNombre()+" DE LA BASE "+nombreBase1);
			iterCheck = checksUnicosThis.iterator();
			
			while (iterCheck.hasNext()) {
				actual2 = iterCheck.next();
				actual2.imprimirCheck();
			}	
		}
		

		if(checksUnicosOther.size()>0) {
			System.out.println("--LOS SIGUIENTES CHECK  SE ENCUENTRAN SOLO EN LA EN LA TABLA "+other.getNombre()+" DE LA BASE "+nombreBase2);
			iterCheck = checksUnicosOther.iterator();
			while (iterCheck.hasNext()) {
				actual2 = iterCheck.next();
				actual2.imprimirCheck();
			}		
		}	
		//--------------------------------------------------------------------------------------------------------------------------
		

		LinkedList<Trigger> triggersUnicosThis=this.ObtenerTriggersPropios(other);
		LinkedList<Trigger> triggersUnicosOther=other.ObtenerTriggersPropios(this);

		if(triggersUnicosThis.size()==0&&triggersUnicosOther.size()==0) {
			System.out.println("--POSEE LOS MISMOS TRIGGER EN AMBAS BASES");
		}


		System.out.println("--LOS SIGUIENTES TRIGGER SE ENCUENTRAN EN LA TABLA "+this.getNombre()+" DE AMBAS BASES");
		LinkedList<String> triggersEnComun = this.ObtenerTriggersComunes(other);
		iter = triggersEnComun.iterator();
		while (iter.hasNext()) {
			String nombreTriggerComun= iter.next();
			this.buscarTrigger(nombreTriggerComun).CompararTriggers(other.buscarTrigger(nombreTriggerComun),nombreBase1,nombreBase2);
		}

		Iterator<Trigger> iterTrigger;
		Trigger actual3;

		if(triggersUnicosThis.size()>0) {
			System.out.println("--LOS SIGUIENTES TRIGGER  SE ENCUENTRAN SOLO EN LA EN LA TABLA "+this.getNombre()+" DE LA BASE "+nombreBase1);
			iterTrigger = triggersUnicosThis.iterator();

			while (iterTrigger.hasNext()) {
				actual3 = iterTrigger.next();
				actual3.imprimirTrigger();
			}	
		}

		if(triggersUnicosOther.size()>0) {
			System.out.println("--LOS SIGUIENTES TRIGGER  SE ENCUENTRAN SOLO EN LA EN LA TABLA "+other.getNombre()+" DE LA BASE "+nombreBase2);
			iterTrigger = triggersUnicosOther.iterator();
			while (iterTrigger.hasNext()) {
				actual3 = iterTrigger.next();
				actual3.imprimirTrigger();
			}	
		}

	}


}
