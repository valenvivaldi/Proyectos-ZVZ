import java.sql.Connection;
import java.sql.DatabaseMetaData;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Iterator;
import java.util.LinkedList;


public class Base {

	public Base(String nombre) {
		this.nombre = nombre;
		this.listaTablas=new LinkedList<Tabla>();

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
	public void imprimirBase(){
		System.out.println("Base "+this.nombre+"("+this.listaTablas.size()+"):");
		Iterator<Tabla> iter = this.listaTablas.iterator();
		while(iter.hasNext()) {
			iter.next().imprimirTabla();
		}
		System.out.println("/Base "+this.nombre+":");
	}



}
