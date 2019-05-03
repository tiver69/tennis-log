package org.dss.tennislog.services;

import org.dss.tennislog.domain.Match;
import org.dss.tennislog.domain.Player;
import org.dss.tennislog.domain.Tournament;
import org.dss.tennislog.exceptions.CreateMatchException;
import org.dss.tennislog.exceptions.DataNotFoundException;
import org.dss.tennislog.repositories.MatchRepository;
import org.dss.tennislog.repositories.PlayerRepository;
import org.dss.tennislog.repositories.TournamentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MatchService {

    @Autowired
    private TournamentRepository tournamentRepository;
    @Autowired
    private MatchRepository matchRepository;
    @Autowired
    private PlayerRepository playerRepository;

    public Match saveOrUpdate(Long playerOneId, Long playerTwoId, Long tournamentId, Match match) {
        CreateMatchException ex = new CreateMatchException();
        if(playerOneId == playerTwoId)
            ex.addException("players", "Players must be different.");
        Player playerOne = playerRepository.getById(playerOneId);
        if (playerOne == null)
            ex.addException("playerOne", "Player with ID '" + playerOneId + "' doesn't exist.");
        Player playerTwo = playerRepository.getById(playerTwoId);
        if (playerTwo == null)
            ex.addException("playerTwo", "Player with ID '" + playerTwoId + "' doesn't exist.");
//        LoggerFactory.getLogger(TennisLogApplication.class).info("here" + (playerOne == null || playerTwo == null));
        Tournament tournament = tournamentRepository.getById(tournamentId);
        if (tournament == null)
            ex.addException("tournament", "Tournament with ID '"+ tournamentId + "' does not exist.");
        if (match.getPlayedStatus() == null) {
            match.setPlayedStatus(false);
            match.setScore("0:0");
        }
        else {
            if (match.getScore() == null || match.getScore().equals("0:0"))
                ex.addException("score", "Score must be specified for a played match.");
            if (match.getWinner() == null)
                ex.addException("winner", "Winner must be specified for a played match.");
        }
        if (ex.isThrowable()) throw ex;
        match.setPlayerOne(playerOne);
        match.setPlayerTwo(playerTwo);
        match.setTournament(tournament);
        return matchRepository.save(match);
    }

    public Match getById(Long matchId) {
        return matchRepository.getById(matchId);
    }

    public Iterable<Match> findAll() {
        return matchRepository.findAll();
    }

    public void deleteById(Long matchId) {
        Match match = matchRepository.getById(matchId);
        if (match == null) {
            throw new DataNotFoundException("Cannot delete with ID '" + matchId + "'. This match does not exist.");
        }
        matchRepository.delete(match);
    }
}
