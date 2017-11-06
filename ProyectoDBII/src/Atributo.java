
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

	@Override
	public String toString() {
		return "Atributo [tipo=" + tipo + ", nombre=" + nombre + "]";
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

}
