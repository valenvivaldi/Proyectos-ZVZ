
public class ParametroProcedure {

	private String nombre;
	private short entradaSalida;
	private String tipo;

	public ParametroProcedure(String string, short short1, String string2) {
		this.setNombre(string);
		this.entradaSalida = short1;
		this.tipo = string2;
	}

	@Override
	public String toString() {
		return "ParametroProcedure [nombre=" + getNombre() + ", entradaSalida=" + entradaSalida + ", tipo=" + tipo + "]";
	}

	public void CompararParametros(ParametroProcedure other, String db1, String db2) {
		System.out.println("------Parametro "+this.nombre);

		if(this.tipo==other.tipo) {
			System.out.println("--------TIPO: "+this.tipo);
		}else {
			System.out.println("--------TIPO: "+this.tipo+ "(EN "+db1+")"+" "+other.tipo+ "(EN "+db2+")");
		}

		if(this.entradaSalida ==other.entradaSalida) {
			System.out.println("--------ENTRADA/SALIDA: "+this.entradaSalida+ "(AMBOS)");
		}else {
			System.out.println("--------ENTRADA/SALIDA: "+this.entradaSalida+ "(EN "+db1+")"+" "+other.entradaSalida+ "(EN "+db2+")");
		}


	}

	public void imprimirParametroProcedure() {
		System.out.println("------Parametro "+this.nombre);
		System.out.println("--------TIPO: "+this.tipo);
		System.out.println("--------ENTRADA/SALIDA: "+this.entradaSalida+ "(AMBOS)");


	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	

}
