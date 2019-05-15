package org.dss.tennislog.repositories;

import org.dss.tennislog.domain.Match;
import org.dss.tennislog.domain.Player;
import org.dss.tennislog.domain.Tournament;
import org.dss.tennislog.repositories.query.PlayerMatchStatistic;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Iterator;
import java.util.List;
import java.util.Optional;

import static org.hamcrest.CoreMatchers.equalTo;

@TestPropertySource(locations = "classpath:application-test.properties")
@RunWith(SpringRunner.class)
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@DataJpaTest
public class MatchRepositoryTest {

    @Autowired
    private MatchRepository matchRepository;

    @Autowired
    private PlayerRepository playerRepository;

    @Autowired
    private TournamentRepository tournamentRepository;

    @Test
    public void getByIdTest() {
        Match match = null;
        Optional<Match> getMatch = matchRepository.getById(1L);
        if (getMatch.isPresent()) match = getMatch.get();
        else Assert.fail();

        Assert.assertThat("Match must have player one with id 1",
                match.getPlayerOne().getId(), equalTo(1L));
        Assert.assertThat("Match must have player two with id 57",
                match.getPlayerTwo().getId(), equalTo(57L));
        Assert.assertThat("Match must be related to tournament with id 1",
                match.getTournament().getId(), equalTo(1L));
    }

    @Test
    public void findAllTest() {
        Iterable<Match> allMatches = matchRepository.findAll();
        Assert.assertThat("Must be found 17 matches ",
                allMatches.spliterator().getExactSizeIfKnown(), equalTo(17L));
    }

    @Test
    public void findByPlayerOneIdOrPlayerTwoIdOrderByDateTest() {
        Iterable<Match> allPlayerMatches = matchRepository.findByPlayerOneIdOrPlayerTwoIdOrderByDate(1L, 1L);
        Assert.assertThat("It must be 6 matches found.",
                allPlayerMatches.spliterator().getExactSizeIfKnown(), equalTo(6L));
        Iterator<Match> iterator = allPlayerMatches.iterator();
        Match lastMatch = new Match();
        while (iterator.hasNext()) {
            lastMatch = iterator.next();
        }
        Assert.assertThat("Match must have player two with id 57",
                lastMatch.getPlayerTwo().getId(), equalTo(57L));
        Assert.assertThat("Match must be related to tournament with id 1",
                lastMatch.getTournament().getId(), equalTo(1L));
    }

    @Test
    public void findByPlayerOneIdAndPlayerTwoIdAndTournamentIdTest() {
        Match getMatch = matchRepository.findByPlayerOneIdAndPlayerTwoIdAndTournamentId(1L, 57L, 1L);
        if (getMatch == null) Assert.fail();

        Assert.assertThat("Match must have player one with id 1",
                getMatch.getScore(), equalTo("2:1"));

    }

    @Test
    public void findByTournamentIdOrderByDateTest() {
        Iterable<Match> allPlayerMatches = matchRepository.findByTournamentIdOrderByDate(1L);
        Assert.assertThat("It must be 8 matches found.",
                allPlayerMatches.spliterator().getExactSizeIfKnown(), equalTo(8L));
        Iterator<Match> iterator = allPlayerMatches.iterator();
        Match lastMatch = new Match();
        while (iterator.hasNext()) {
            lastMatch = iterator.next();
        }
        Assert.assertThat("Match must have player one with id 1",
                lastMatch.getPlayerOne().getId(), equalTo(1L));
        Assert.assertThat("Match must have player two with id 57",
                lastMatch.getPlayerTwo().getId(), equalTo(57L));
    }

    @Test
    public void findByPlayerOneAndTournamentIdTest() {
        Optional<Player> getPlayer1ForTest = playerRepository.getById(1L);
        if (!getPlayer1ForTest.isPresent()) Assert.fail("Test is not completed due to player error");
        Player player = getPlayer1ForTest.get();

        Iterable<Match> result = matchRepository.findByPlayerOneAndTournamentId(player, 1L);
        Assert.assertThat("There must be 3 winn matches for player 1 in 1st tournament",
                result.spliterator().getExactSizeIfKnown(), equalTo(3L));
    }

    @Test
    public void countByPlayerOneIdAndPlayedStatusTest() {
        int winnMatches = matchRepository.countByPlayerOneIdAndPlayedStatus(1L, true);
        Assert.assertThat("There must be 3 winn matches found.",
                winnMatches, equalTo(3));
    }

    @Test
    public void countByPlayerTwoIdAndPlayedStatusTest() {
        int winnMatches = matchRepository.countByPlayerTwoIdAndPlayedStatus(1L, true);
        Assert.assertThat("There must be 2 lose matches found.",
                winnMatches, equalTo(2));
    }

    @Test
    public void countPlayerWinnerStatisticTest() {
        Optional<Player> getPlayer1ForTest = playerRepository.getById(1L);
        if (!getPlayer1ForTest.isPresent()) Assert.fail("Test is not completed due to player error");
        Player player = getPlayer1ForTest.get();

        List<PlayerMatchStatistic> result = matchRepository.countPlayerWinnerStatistic(player);
        Assert.assertThat("There must be 3 winn matches found.",
                result.size(), equalTo(3));
    }

    @Test
    public void countPlayerLoseStatisticTest() {
        Optional<Player> getPlayer1ForTest = playerRepository.getById(1L);
        if (!getPlayer1ForTest.isPresent()) Assert.fail("Test is not completed due to player error");
        Player player = getPlayer1ForTest.get();

        List<PlayerMatchStatistic> result = matchRepository.countPlayerLoseStatistic(player);
        Assert.assertThat("There must be 2 lose matches found.",
                result.size(), equalTo(2));
    }

    @Test
    public void countTournamentResultTest() {
        Optional<Tournament> getTournament1ForTest = tournamentRepository.getById(1L);
        if (!getTournament1ForTest.isPresent()) Assert.fail("Test is not completed due to tournament error");
        Tournament tournament = getTournament1ForTest.get();

        List<PlayerMatchStatistic> result = matchRepository.countTournamentResult(tournament);
        Assert.assertThat("There must be 4 different winners if 1st tournament",
                result.size(), equalTo(4));
    }

    @Test
    public void findWinnersFromTournamentTest() {
        Optional<Tournament> getTournament1ForTest = tournamentRepository.getById(1L);
        if (!getTournament1ForTest.isPresent()) Assert.fail("Test is not completed due to tournament error");
        Tournament tournament = getTournament1ForTest.get();

        List<Player> result = matchRepository.findWinnersFromTournament(tournament);
        Assert.assertThat("There must be 4 different winners if 1st tournament",
                result.size() - 1, equalTo(4));
    }

    @Test
    public void findLoseFromTournamentTest() {
        Optional<Tournament> getTournament1ForTest = tournamentRepository.getById(1L);
        if (!getTournament1ForTest.isPresent()) Assert.fail("Test is not completed due to tournament error");
        Tournament tournament = getTournament1ForTest.get();

        List<Player> result = matchRepository.findLoseFromTournament(tournament);
        Assert.assertThat("There must be 4 different losers if 1st tournament",
                result.size() - 1, equalTo(4));
    }
}