
public class Trigger {

	private String tabla;
	private String nombre;
	private String evento;
	private String tiempo;
	private String accion;

	public Trigger(String string, String string2, String string3, String string4, String string5) {
		
		this.setNombre(string);
		this.tabla=string2;
		this.setEvento(string3);
		this.setTiempo(string4);
		this.setAccion(string5);
	}

	public String getTabla() {
		
		return this.tabla;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public void CompararTriggers(Trigger other, String nombreBase1, String nombreBase2) {
		System.out.println("----TRIGGER "+this.getNombre()+":");
		if(this.evento==other.evento) {
			System.out.println("------EVENTO: "+this.evento+ "(AMBOS)");
		}else {
			System.out.println("------EVENTO: "+this.evento+ "(EN "+nombreBase1+")"+" "+other.evento+ "(EN "+nombreBase2+")");
		}
		
		if(this.tiempo==other.tiempo) {
			System.out.println("------TIEMPO: "+this.tiempo+ "(AMBOS)");
		}else {
			System.out.println("------TIEMPO: "+this.tiempo+ "(EN "+nombreBase1+")"+" "+other.tiempo+ "(EN "+nombreBase2+")");
		}
		
		if(this.accion==other.accion) {
			System.out.println("------ACCION: "+this.accion+ "(AMBOS)");
		}else {
			System.out.println("------ACCION: "+this.accion+ "(EN "+nombreBase1+")"+" "+other.accion+ "(EN "+nombreBase2+")");
		}
	
	}

	public void imprimirTrigger() {
		System.out.println("----TRIGGER "+this.getNombre()+":");
			System.out.println("------EVENTO: "+this.evento+ "(AMBOS)");
			System.out.println("------TIEMPO: "+this.tiempo+ "(AMBOS)");
			System.out.println("------ACCION: "+this.accion+ "(AMBOS)");
	}

	public String getEvento() {
		return evento;
	}

	public void setEvento(String evento) {
		this.evento = evento;
	}

	public String getTiempo() {
		return tiempo;
	}

	public void setTiempo(String tiempo) {
		this.tiempo = tiempo;
	}

	public String getAccion() {
		return accion;
	}

	public void setAccion(String accion) {
		this.accion = accion;
	}

}
