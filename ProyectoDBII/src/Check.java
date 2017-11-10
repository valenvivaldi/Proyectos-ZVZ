
public class Check {

	private String expresion;
	private String nombre;
	private String tabla;

	public String getTabla() {
		return tabla;
	}

	public void setTabla(String tabla) {
		this.tabla = tabla;
	}

	public Check(String string, String string2, String string3) {
		this.tabla = string2;
		this.setNombre(string);
		this.setExpresion(string3);
}

	public String getExpresion() {
		return expresion;
	}

	public void setExpresion(String expresion) {
		this.expresion = expresion;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public void imprimirCheck() {

		
	}

	public void CompararChecks(Check buscarCheck, String nombreBase1, String nombreBase2) {
		// TODO Auto-generated method stub
		
	}

}
