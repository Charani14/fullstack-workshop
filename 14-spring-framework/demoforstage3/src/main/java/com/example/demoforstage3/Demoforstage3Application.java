package com.example.demoforstage3;

import com.example.demoforstage3.config.AppConfig;
import com.example.demoforstage3.ui.ConsoleUI;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

public class Demoforstage3Application {

	public static void main(String[] args) {
		ApplicationContext context = new AnnotationConfigApplicationContext(AppConfig.class);
		ConsoleUI ui = context.getBean(ConsoleUI.class);
		ui.run();
	}
}
