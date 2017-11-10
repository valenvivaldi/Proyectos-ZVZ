import java.sql.Connection;
import java.util.LinkedList;

public interface InterfaceCatalog {

	public  abstract LinkedList<Trigger> obtenerTriggers(Connection conexion);
	public abstract LinkedList<Check> obtenerChecks(Connection conexion);
	

}
