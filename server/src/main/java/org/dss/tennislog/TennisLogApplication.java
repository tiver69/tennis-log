package org.dss.tennislog;

import org.dss.tennislog.domain.Match;
import org.dss.tennislog.repositories.MatchRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class TennisLogApplication {

	private static final Logger log = LoggerFactory.getLogger(TennisLogApplication.class);

	public static void main(String[] args) {
		SpringApplication.run(TennisLogApplication.class, args);
	}

	@Bean
	public CommandLineRunner demo(MatchRepository repository) {
		return (args) -> {
			// save a couple of customers
//            repository.save(new Player("Jack", "Bauer"));
//            repository.save(new Player("Chloe", "O'Brian"));
//            repository.save(new Player("Kim", "Bauer"));
//            repository.save(new Player("David", "Palmer"));
//            repository.save(new Player("Michelle", "Dessler"));

			// fetch all customers
//			log.info("Match found with findAll():");
//			log.info("-------------------------------");
//			for (Match match : repository.findAll()) {
//				log.info(match.toString());
//			}
//			log.info("");

//            // fetch an individual customer by ID
//			log.info("Match found with findById(1L):");
//			log.info("--------------------------------");
//			log.info(repository.findById(1L).toString());
//					.forEach(customer -> {
//
//						log.info(customer.toString());
//						log.info("");
//					});
		};
	}

}
