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



}
