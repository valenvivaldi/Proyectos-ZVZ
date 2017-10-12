import java.util.Iterator;
import java.util.LinkedList;


public class Tabla {
	private String nombre;
	private LinkedList<Atributo> listaAtributos;
	private LinkedList<ClaveForanea> listaClavesForaneas;
	private LinkedList<Atributo> listaClavesPrimarias;
	private LinkedList<Atributo> listaUnicas;
	private LinkedList<Atributo> listaIndices;

	public Tabla(String nombre) {

		this.nombre = nombre;
		this.listaAtributos=new LinkedList<Atributo>();
		this.listaClavesForaneas=new LinkedList<ClaveForanea>();
		this.listaClavesPrimarias=new LinkedList<Atributo>();
		this.listaUnicas=new LinkedList<Atributo>();
		this.listaIndices=new LinkedList<Atributo>();

	}

	public void addAtributo(Atributo n) {
		this.listaAtributos.add(n);
	}

	public void addClaveP(String nombre) {
		Iterator<Atributo> iter = listaAtributos.iterator();
		while(iter.hasNext()) {
			Atributo actual = iter.next();
			if(actual.getNombre()==nombre) {
				this.listaClavesPrimarias.add(actual);
				break;
			}
		}
	}
	public void addClaveForanea(String nombre) {
		Iterator<Atributo> iter = listaAtributos.iterator();
		while(iter.hasNext()) {
			Atributo actual = iter.next();
			if(actual.getNombre()==nombre) {
				this.listaClavesPrimarias.add(actual);
				break;
			}
		}
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


	@Override
	public String toString() {
		return "Tabla [listaAtributos=" + listaAtributos + ", nombre=" + nombre + ", listaClavesForaneas="
				+ listaClavesForaneas + ", listaClavesPrimarias=" + listaClavesPrimarias + ", listaUnicas=" + listaUnicas
				+ ", listaIndices=" + listaIndices + "]";
	}

	/**
	 * @return the listaUnicas
	 */
	public LinkedList<Atributo> getListaUnicas() {
		return listaUnicas;
	}

	/**
	 * @param listaUnicas the listaUnicas to set
	 */
	public void setListaUnicas(LinkedList<Atributo> listaUnicas) {
		this.listaUnicas = listaUnicas;
	}

	/**
	 * @return the listaClavesPrimarias
	 */
	public LinkedList<Atributo> getListaClavesPrimarias() {
		return listaClavesPrimarias;
	}

	/**
	 * @param listaClavesPrimarias the listaClavesPrimarias to set
	 */
	public void setListaClavesPrimarias(LinkedList<Atributo> listaClavesPrimarias) {
		this.listaClavesPrimarias = listaClavesPrimarias;
	}

	/**
	 * @return the listaClavesForaneas
	 */
	public LinkedList<ClaveForanea> getListaClavesForaneas() {
		return listaClavesForaneas;
	}

	/**
	 * @param listaClavesForaneas the listaClavesForaneas to set
	 */
	public void setListaClavesForaneas(LinkedList<ClaveForanea> listaClavesForaneas) {
		this.listaClavesForaneas = listaClavesForaneas;
	}

	/**
	 * @return the listaIndices
	 */
	public LinkedList<Atributo> getListaIndices() {
		return listaIndices;
	}

	/**
	 * @param listaIndices the listaIndices to set
	 */
	public void setListaIndices(LinkedList<Atributo> listaIndices) {
		this.listaIndices = listaIndices;
	}
}
