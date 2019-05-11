package org.dss.tennislog.services;

import org.dss.tennislog.domain.Match;
import org.dss.tennislog.exceptions.DataNotFoundException;
import org.dss.tennislog.repositories.MatchRepository;
import org.dss.tennislog.validator.MatchValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MatchService {

    @Autowired
    private MatchRepository matchRepository;
    @Autowired
    private MatchValidator matchValidator;

    public Match saveOrUpdate(Long playerOneId, Long playerTwoId, Long tournamentId, Match match) {
        match = matchValidator.validate(playerOneId, playerTwoId, tournamentId, match);
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
