import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.LinkedList;

public class CatalogoPostgres implements InterfaceCatalog {

	



	public LinkedList<Trigger> obtenerTriggers(Connection conexion) {
		LinkedList<Trigger> result = new LinkedList<Trigger>();
		try {
			String query = "SELECT   triggers.trigger_name,   triggers.event_manipulation,   triggers.event_object_table,  triggers.action_timing,   triggers.action_statement FROM   information_schema.triggers";
			Statement stat = conexion.createStatement();
			ResultSet res = stat.executeQuery(query);
			Trigger nuevo;
			while(res.next()) {
				nuevo = new Trigger (res.getString(1),res.getString(3),res.getString(2),res.getString(4),res.getString(5));
				result.add(nuevo);
			} 	
		} catch (SQLException e) {
			System.out.println("hubo un error durante la generacion de la lista de triggers!");
			e.printStackTrace();
		}
		return result;
	}

	public   LinkedList<Check> obtenerChecks(Connection conexion) {
		LinkedList<Check> result = new LinkedList<Check>();
		try {
			String query = "select conname,conrelid,consrc from pg_constraint where contype ='c' ";
			Statement stat = conexion.createStatement();
			ResultSet res = stat.executeQuery(query);
			Check nuevo;
			while(res.next()) {
				nuevo = new Check (res.getString(1),res.getString(2),res.getString(3));
				result.add(nuevo);
			} 	
		} catch (SQLException e) {
			System.out.println("hubo un error durante la generacion de la lista de checks!");
			e.printStackTrace();
		}
		return result;
		
	}

	

}
