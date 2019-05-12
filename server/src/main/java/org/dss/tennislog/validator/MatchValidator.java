package org.dss.tennislog.validator;

import org.dss.tennislog.domain.Match;
import org.dss.tennislog.domain.Player;
import org.dss.tennislog.domain.Tournament;
import org.dss.tennislog.exceptions.DataNotFoundException;
import org.dss.tennislog.repositories.PlayerRepository;
import org.dss.tennislog.repositories.TournamentRepository;
import org.dss.tennislog.services.PlayerService;
import org.dss.tennislog.services.TournamentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;

@Component
public class MatchValidator {

    @Autowired
    private TournamentRepository tournamentRepository;
    @Autowired
    private PlayerRepository playerRepository;

    @Autowired
    private PlayerService playerService;
    @Autowired
    private TournamentService tournamentService;

    public Match validate(Long playerOneId, Long playerTwoId, Long tournamentId, Match match, Errors errors) {
        Player playerOne = null;
        Player playerTwo = null;
        Tournament tournament = null;
        if (playerOneId != null && playerOneId.equals(playerTwoId)) {
            errors.rejectValue("playerOne", "Equal", "Players must be different.");
            errors.rejectValue("playerTwo", "Equal", "Players must be different.");
        }
        else {
            try {
                playerOne = playerService.getById(playerOneId);
            } catch (DataNotFoundException e) {
                errors.rejectValue("playerOne", "Empty", "Player with ID '" + playerOneId + "' doesn't exist");
            }
            try {
                playerTwo = playerService.getById(playerTwoId);
            } catch (DataNotFoundException e) {
                errors.rejectValue("playerTwo", "Empty", "Player with ID '" + playerOneId + "' doesn't exist");
            }
        }
        try {
            tournament = tournamentService.getById(tournamentId);
        } catch (DataNotFoundException e) {
            errors.rejectValue("tournament", "Empty", "Tournament with ID '" + playerOneId + "' doesn't exist");
        }
        if (match.getPlayedStatus() == null || !match.getPlayedStatus()) {
            match.setPlayedStatus(false);
            match.setScore("0:0");
        }
        if (match.getPlayedStatus()) {
            if (match.getScore() == null || match.getScore().equals("") || match.getScore().equals("0:0"))
                errors.rejectValue("score", "Empty", "Score must be specified for a played match.");
            if (match.getWinner() == null)
                errors.rejectValue("winner", "Empty", "Winner must be specified for a played match.");
        }

        match.setPlayerOne(playerOne);
        match.setPlayerTwo(playerTwo);
        match.setTournament(tournament);
        return match;
    }
}
