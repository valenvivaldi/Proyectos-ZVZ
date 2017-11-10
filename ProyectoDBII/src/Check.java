
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
		System.out.println("----CHECK "+this.getNombre()+":");
		System.out.println("------EXPRESION: "+this.expresion+ "");
	}

	public void CompararChecks(Check other, String nombreBase1, String nombreBase2) {
		System.out.println("----CHECK "+this.getNombre()+":");
		if(this.expresion!=null&&other.expresion!=null&&this.expresion.equals(other.expresion)) {
			System.out.println("------EXPRESION: "+this.expresion+ "(AMBOS)");
		}else {
			System.out.println("------EXPRESION: "+this.expresion+ "(EN "+nombreBase1+")"+" "+other.expresion+ "(EN "+nombreBase2+")");
		}
		
		
	}

}
