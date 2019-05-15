package org.dss.tennislog;

import org.dss.tennislog.services.TournamentService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
public class TennisLogApplication {

	@Bean
	BCryptPasswordEncoder cryptPasswordEncoder(){
		return new BCryptPasswordEncoder();
	}


	public static void main(String[] args) {
		SpringApplication.run(TennisLogApplication.class, args);
	}
}
