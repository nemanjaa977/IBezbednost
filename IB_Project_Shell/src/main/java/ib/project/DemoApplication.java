package ib.project;

import java.io.File;
import java.util.ResourceBundle;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.password.PasswordEncoder;

import ib.project.rest.DemoController;

@SpringBootApplication
public class DemoApplication {
	
	

	private static String DATA_DIR_PATH;
	static {
		ResourceBundle rb = ResourceBundle.getBundle("application");
		DATA_DIR_PATH = rb.getString("dataDir");
		
	}
	
	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
		System.out.println(DemoController.class.getProtectionDomain().getCodeSource().getLocation().getPath() + File.separator + DATA_DIR_PATH);
		
		//create files folder in target/classes
		new File(DemoController.class.getProtectionDomain().getCodeSource().getLocation().getPath() + File.separator + DATA_DIR_PATH).mkdirs();
		
	}
}
 