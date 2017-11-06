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
	
	public Tabla(String nombre) {

		this.nombre = nombre;
		this.listaAtributos=new LinkedList<Atributo>();
		

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
				if(atributos.getString(18)=="YES") {
					nuevoAtributo.setNullable(true);
				}


				this.listaAtributos.add(nuevoAtributo);
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			System.out.println("error cargando la tabla "+n);
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
			// TODO Auto-generated catch block
			System.out.println("error cargando la tabla "+n);
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
			// TODO Auto-generated catch block
			System.out.println("error cargando la tabla "+n);
			e.printStackTrace();
		}
	}
	
	public void CargarClavesForaneas(Connection connection) {
		ResultSet atributos = null;
		String n =null;
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
			// TODO Auto-generated catch block
			System.out.println("error cargando la tabla "+n);
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
		int i = 0;
		Atributo actual=null;
		Iterator<Atributo> iter =this.listaAtributos.iterator();
		while (iter.hasNext()) {
			actual = iter.next();
			if (actual.getNombre()==name) {
				return actual;
			}
		}
	
		
		return actual;	
	}
}
