package org.dss.tennislog.repositories;

import org.dss.tennislog.domain.Tournament;
import org.junit.Assert;
import org.junit.BeforeClass;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringRunner;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.Date;
import java.util.Iterator;
import java.util.Optional;

import static org.hamcrest.CoreMatchers.equalTo;

@TestPropertySource(locations = "classpath:application-test.properties")
@RunWith(SpringRunner.class)
//@Transactional
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
//@SpringBootTest(
//        webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT,
//        classes = TennisLogApplicationTests.class)
@DataJpaTest
public class TournamentRepositoryTest {

    @Autowired
    private TournamentRepository tournamentRepository;

    @PersistenceContext
    private EntityManager entityManager;

    private static Tournament tournament1 = new Tournament();
    private static Date currentDate;

    @BeforeClass
    public static void setUpClass() {
        tournament1.setName("test1");
        currentDate = new Date();
        tournament1.setStartDate(currentDate);
    }

    @Test
//    @Rollback(false)
    public void getByIdTest() {
        String findName = "";
        Optional<Tournament> tournament = tournamentRepository.getById(2L);
        if (tournament.isPresent())
            findName = tournament.get().getName();
//        System.out.println(tournament);
        Assert.assertThat("Names of tournament must be equal", findName, equalTo("test"));
    }

    @Test
    public void findAllByOrderByStartDateTest() {
        entityManager.persist(tournament1);
        entityManager.flush();

        Iterable<Tournament> allOrderedTournaments = tournamentRepository.findAllByOrderByStartDate();
        Iterator<Tournament> resultIterator = allOrderedTournaments.iterator();
        Date lastTournamentDate = new Date();
        while (resultIterator.hasNext()) {
            lastTournamentDate = resultIterator.next().getStartDate();
        }
//        System.out.println(tournamentRepository.findAllByOrderByStartDate());
        Assert.assertThat("Date of last element mus be the same as variable", lastTournamentDate, equalTo(currentDate));
    }
}