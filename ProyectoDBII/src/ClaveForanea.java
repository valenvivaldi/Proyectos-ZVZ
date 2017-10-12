import java.util.LinkedList;

public class ClaveForanea {
	private LinkedList<Atributo> listaAtributos;
	private String tabla;
	private LinkedList<String> nombreAttrRef; // PREGUNTAR AL PROFE

	@Override
	public String toString() {
		return "ClaveForanea [listaAtributos=" + listaAtributos + ", tabla=" + tabla + ", nombreAttrRef="
				+ getNombreAttrRef() + "]";
	}
	
	public ClaveForanea( String tabla) {

		this.setListaAtributos(new LinkedList<Atributo>());
		this.setTabla(tabla);
	}
	public void addAtributo (Atributo nuevo) {
		getListaAtributos().add(nuevo);
	}
	public void addnombreAttRef (String nuevo) {
		getNombreAttrRef().add(nuevo);
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
	 * @return the tabla
	 */
	public String getTabla() {
		return tabla;
	}
	/**
	 * @param tabla the tabla to set
	 */
	public void setTabla(String tabla) {
		this.tabla = tabla;
	}

	/**
	 * @return the nombreAttrRef
	 */
	public LinkedList<String> getNombreAttrRef() {
		return nombreAttrRef;
	}

	/**
	 * @param nombreAttrRef the nombreAttrRef to set
	 */
	public void setNombreAttrRef(LinkedList<String> nombreAttrRef) {
		this.nombreAttrRef = nombreAttrRef;
	}
}
	