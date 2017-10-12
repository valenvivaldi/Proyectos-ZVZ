import java.io.*;
import java.util.*;

public class Main {
	public static void main(String[] args) throws IOException{
		Properties prop = new Properties();
		InputStream is = null;
		try {
			is = new FileInputStream("./src/config.PROPERTIES");
			prop.load(is);
		} catch(IOException e) {
			System.out.println(e.toString());
		}

		String driver = prop.getProperty("driver");
		System.out.println(driver);
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
		String nombre_base2 = prop.getProperty("nombre_base2");
		System.out.println(nombre_base2);

		String url = "jdbc:"+protocolo+"://"+host+"/"+nombre_base1;
		String url2 = "jdbc:"+protocolo+"://"+host+"/"+nombre_base2;
		System.out.println("string de coneccion para la 1ra base ");
		System.out.println(url);
		System.out.println(url2);
		System.out.println("string de coneccion para la 2da base ");

		Base base1 = new Base(nombre_base1);
		Base base2 = new Base(nombre_base2);

	}
}