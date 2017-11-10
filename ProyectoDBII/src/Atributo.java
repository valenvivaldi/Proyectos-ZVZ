
public class Atributo {
	private String tipo;
	private String nombre;
	private String refTabla;
	private String refAtributo;
	private boolean isNullable;
	private boolean isPrimaryKey;
	private boolean isUnique;
	private String indexnombre;

	public Atributo(String nombre,String tipo) {
		this.tipo = tipo;
		this.nombre = nombre;
		this.refTabla=null;
		this.refAtributo = null;
		this.isNullable=false;
		this.isPrimaryKey=false;
		this.isUnique=false;
		this.indexnombre=null;

	}

	public String getTipo() {
		return tipo;
	}

	public void setTipo(String tipo) {
		this.tipo = tipo;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}




	

	public void Cargar() {


	}

	public String getRefTabla() {
		return refTabla;
	}

	public void setRefTabla(String refTabla) {
		this.refTabla = refTabla;
	}

	public String getRefAtributo() {
		return refAtributo;
	}

	public void setRefAtributo(String refAtributo) {
		this.refAtributo = refAtributo;
	}

	public boolean isNullable() {
		return isNullable;
	}

	public void setNullable(boolean isNullable) {
		this.isNullable = isNullable;
	}

	public boolean isPrimaryKey() {
		return isPrimaryKey;
	}

	public void setPrimaryKey(boolean isPrimaryKey) {
		this.isPrimaryKey = isPrimaryKey;
	}

	public boolean isUnique() {
		return isUnique;
	}

	public void setUnique(boolean isUnique) {
		this.isUnique = isUnique;
	}

	public String getIndexnombre() {
		return indexnombre;
	}

	public void setIndexnombre(String indexnombre) {
		this.indexnombre = indexnombre;
	}

	public void imprimirAtributo() {
		System.out.println("----Atributo "+this.nombre);

		System.out.println("------TIPO: "+this.tipo);
		System.out.println("------CLAVE PRIMARIA?: "+this.isPrimaryKey+ "(AMBOS)");
		System.out.println("------NULLABLE?: "+this.isNullable+ "(AMBOS)");		
		if(this.refTabla != null) {
			System.out.println("------TABLA REFERENCIADA: "+this.refTabla+ "(AMBOS)");	
		}
		if(this.refAtributo != null) {
			System.out.println("------ATRIBUTO REFERENCIADO: "+this.refAtributo+ "(AMBOS)");	
		}
		System.out.println("------UNIQUE?: "+this.isUnique+ "(AMBOS)");
		System.out.println("------NOMBRE INDICE: "+this.indexnombre+ "(AMBOS)");

	}

	public void CompararAtributos(Atributo other, String nombreBase1, String nombreBase2) {
		System.out.println("----Atributo "+this.nombre);
		if(this.tipo.equals(other.tipo)) {
			System.out.println("------TIPO: "+this.tipo);
		}else {
			System.out.println("------TIPO: "+this.tipo+ "(EN "+nombreBase1+")"+" "+other.tipo+ "(EN "+nombreBase2+")");
		}

		if(this.isPrimaryKey ==other.isPrimaryKey) {
			System.out.println("------CLAVE PRIMARIA?: "+this.isPrimaryKey+ "(AMBOS)");
		}else {
			System.out.println("------CLAVE PRIMARIA?: "+this.isPrimaryKey+ "(EN "+nombreBase1+")"+" "+other.isPrimaryKey+ "(EN "+nombreBase2+")");
		}

		if(this.isNullable ==other.isNullable) {
			System.out.println("------NULLABLE?: "+this.isNullable+ "(AMBOS)");
		}else {
			System.out.println("------NULLABLE?: "+this.isNullable+ "(EN "+nombreBase1+")"+" "+other.isNullable+ "(EN "+nombreBase2+")");
		}
		
		
		if(this.refTabla!=null&&other.refTabla!=null&&this.refTabla .equals(other.refTabla)) {
			if(this.refTabla != null) {
				System.out.println("------TABLA REFERENCIADA: "+this.refTabla+ "(AMBOS)");	
			}

		}else {
			if(this.refTabla!=null) {
				System.out.println("------TABLA REFERENCIADA: "+this.refTabla+ "(EN "+nombreBase1+")");	
			}
			if(other.refTabla!=null) {
				System.out.print("------TABLA REFERENCIADA: "+other.refTabla+ "(EN "+nombreBase2+")");	
			}
		}

		if(this.refAtributo!=null&&other.refAtributo!=null&&this.refAtributo.equals(other.refAtributo)) {
			if(this.refAtributo != null) {
				System.out.println("------ATRIBUTO REFERENCIADO: "+this.refAtributo+ "(AMBOS)");	
			}
		}else {
			if(this.refAtributo!=null) {
				System.out.println("------ATRIBUTO REFERENCIADO: "+this.refAtributo+ "(EN "+nombreBase1+")");	
			}
			if(other.refAtributo!=null) {
				System.out.print("------ATRIBUTO REFERENCIADO: "+other.refAtributo+ "(EN "+nombreBase2+")");	
			}
		}

		if(this.isUnique ==other.isUnique) {
			System.out.println("------UNIQUE?: "+this.isUnique+ "(AMBOS)");
		}else {
			System.out.println("------UNIQUE?: "+this.isUnique+ "(EN "+nombreBase1+")"+" "+other.isUnique+ "(EN "+nombreBase2+")");
		}

		if(this.indexnombre!=null&&other.indexnombre!=null&&this.indexnombre.equals(other.indexnombre)) {
			System.out.println("------NOMBRE INDICE: "+this.indexnombre+ "(AMBOS)");
		}else {
			System.out.println("------NOMBRE INDICE: "+this.indexnombre+ "(EN "+nombreBase1+")"+" "+other.indexnombre+ "(EN "+nombreBase2+")");
		}






	}

}
