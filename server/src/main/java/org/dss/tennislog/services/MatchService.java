package org.dss.tennislog.services;

import org.dss.tennislog.domain.Match;
import org.dss.tennislog.exceptions.DataNotFoundException;
import org.dss.tennislog.repositories.MatchRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MatchService {

    @Autowired
    private MatchRepository matchRepository;

    public Match saveOrUpdate(Match match) {
        return matchRepository.save(match);
    }

    public Match getById(Long matchId) {
        Optional<Match> match = matchRepository.getById(matchId);

        if (match.isPresent()) {
            return match.get();
        } else {
            throw new DataNotFoundException("Match with ID '" + matchId + "' doesn't exist");
        }
    }

    public Iterable<Match> findAll() {
        return matchRepository.findAll();
    }

    public void deleteById(Long matchId) {
        Match match = getById(matchId);
        matchRepository.delete(match);
    }
}
