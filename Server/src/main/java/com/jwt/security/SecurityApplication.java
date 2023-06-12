package com.jwt.security;

import com.jwt.security.Entity.user.Role;
import com.jwt.security.requestResponse.RegisterRequest;
import com.jwt.security.service.AuthenticationService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.bind.annotation.CrossOrigin;

import static com.jwt.security.Entity.user.Role.ADMIN;
import static com.jwt.security.Entity.user.Role.MANAGER;

@SpringBootApplication
//@CrossOrigin(origins = "http://localhost:3000")
@ComponentScan(basePackages = "com.jwt.security")
public class SecurityApplication {

	public static void main(String[] args) {
		SpringApplication.run(SecurityApplication.class, args);
	}
	@Bean
	public CommandLineRunner commandLineRunner(
			AuthenticationService service
	) {
		return args -> {
			var admin = RegisterRequest.builder()
					.firstName("Admin")
					.lastName("Admin")
					.email("admin@mail.com")
					.password("password").role(ADMIN.name()).confirmPassword("password")
					.build();
			System.out.println("Admin token: " + service.register(admin).getAccessToken());

			var manager = RegisterRequest.builder()
					.firstName("Admin")
					.lastName("Admin")
					.email("manager@mail.com")
					.password("password")
					.role(MANAGER.name())
					.confirmPassword("password")
					.build();
			System.out.println("Manager token: " + service.register(manager).getAccessToken());

		};
	}
}
