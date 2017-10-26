import java.sql.*;
import java.io.*;
import java.util.*;

public class Main {
	public static void main(String[] args) throws IOException{
		Properties prop = new Properties();
		InputStream is = null;
		try {
			is = new FileInputStream("./config.PROPERTIES");
			prop.load(is);
		} catch(IOException e) {
			System.out.println(e.toString());
		}

		String driver = prop.getProperty("driver");
		System.out.println(driver);
		try {
			Class.forName(driver);
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}



		String protocolo = prop.getProperty("protocolo");
		System.out.println(protocolo);
		String usuario = prop.getProperty("usuario");
		System.out.println(usuario);
		String password = prop.getProperty("pass");
		System.out.println(password);
		String host = prop.getProperty("host");
		System.out.println(host);
		String nombre_base1 = prop.getProperty("nombre_base1");
		System.out.println(nombre_base1);
		String schema1 =prop.getProperty("schema1");
		String nombre_base2 = prop.getProperty("nombre_base2");
		System.out.println(nombre_base2);
		String schema2 =prop.getProperty("schema2");
		
		String url = "jdbc:"+protocolo+"://"+host+"/"+nombre_base1;
		String url2 = "jdbc:"+protocolo+"://"+host+"/"+nombre_base2;
		System.out.println("string de coneccion para la 1ra base ");
		System.out.println(url);
		System.out.println("string de coneccion para la 2da base ");
		System.out.println(url2);

		
		@SuppressWarnings("unused")
		Base base1 = new Base(schema1);
		@SuppressWarnings("unused")
		Base base2 = new Base(schema2);


		Connection connection1;
		@SuppressWarnings("unused")
		Connection connection2;
		try {
			connection1 = DriverManager.getConnection(url, usuario, password);
			System.out.println("INICIA CARGA DE TABLAS DE "+nombre_base1+"."+schema1);
			base1.CargarTablas(connection1);
			System.out.println(" tablas de la base de datos ");
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			System.out.println("error conectando a la base");
			e.printStackTrace();
		}	
		try {
			connection2 = DriverManager.getConnection(url2, usuario, password);
			System.out.println("INICIA CARGA DE TABLAS DE "+nombre_base2+"."+schema2);
			base2.CargarTablas(connection2);
			System.out.println(" tablas de la base de datos ");
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			System.out.println("error conectando a la base");
			e.printStackTrace();
		}	






	}
}