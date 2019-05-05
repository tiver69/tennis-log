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

	@Bean
	public CommandLineRunner demo(TournamentService repository) {
//		Logger log = LoggerFactory.getLogger(TennisLogApplication.class);
		return (args) -> {
//
//			 //save a couple of tournaments
//			Tournament tournament = new Tournament();
//			tournament.setName("name");
//			tournament.setInformation("namename");
//			repository.deleteById(7L);
			// fetch all customers
//			log.info("Match found with findAll():");
//			log.info("-------------------------------");
//			for (Tournament match : repository.findAll()) {
//				log.info(match.toString());
//			}
//			log.info("");

//            // fetch an individual match by ID
//			log.info("Match found with findById(1L):");
//			log.info("--------------------------------");
//			log.info(repository.getById(1L).toString());
//					.forEach(match -> {
//
//						log.info(match.toString());
//						log.info("");
//					});
//			log.info("Tournament found with findById('1'):");
//			log.info("--------------------------------------------");
//			repository.findAllTournamentMatches(1L).forEach(bauer -> {
//				log.info(bauer.toString());
//			});

		};
	}

}
