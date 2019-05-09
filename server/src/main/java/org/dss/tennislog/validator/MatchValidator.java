package org.dss.tennislog.validator;

import org.dss.tennislog.domain.Match;
import org.dss.tennislog.domain.Player;
import org.dss.tennislog.domain.Tournament;
import org.dss.tennislog.exceptions.CreateMatchException;
import org.dss.tennislog.repositories.PlayerRepository;
import org.dss.tennislog.repositories.TournamentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class MatchValidator {

    @Autowired
    private TournamentRepository tournamentRepository;
    @Autowired
    private PlayerRepository playerRepository;

    public Match validate(Long playerOneId, Long playerTwoId, Long tournamentId, Match match) {
        CreateMatchException ex = new CreateMatchException();
        if(playerOneId == playerTwoId)
            ex.addException("players", "Players must be different.");
        Player playerOne = playerRepository.getById(playerOneId);
        if (playerOne == null)
            ex.addException("playerOne", "Player with ID '" + playerOneId + "' doesn't exist.");
        Player playerTwo = playerRepository.getById(playerTwoId);
        if (playerTwo == null)
            ex.addException("playerTwo", "Player with ID '" + playerTwoId + "' doesn't exist.");
        Tournament tournament = tournamentRepository.getById(tournamentId);
        if (tournament == null)
            ex.addException("tournament", "Tournament with ID '"+ tournamentId + "' does not exist.");
        if (match.getPlayedStatus() == null || !match.getPlayedStatus()) {
            match.setPlayedStatus(false);
            match.setScore("0:0");
        }
        if (match.getPlayedStatus()) {
            if (match.getScore() == null || match.getScore().equals("") || match.getScore().equals("0:0"))
                ex.addException("score", "Score must be specified for a played match.");
            if (match.getWinner() == null)
                ex.addException("winner", "Winner must be specified for a played match.");
        }
        if (ex.isThrowable()) throw ex;

        match.setPlayerOne(playerOne);
        match.setPlayerTwo(playerTwo);
        match.setTournament(tournament);
        return match;
    }
}
