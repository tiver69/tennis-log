package org.dss.tennislog.services;

import org.dss.tennislog.domain.Tournament;
import org.dss.tennislog.exceptions.MatchIdException;
import org.dss.tennislog.repositories.TournamentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TournamentService {

    @Autowired
    private TournamentRepository tournamentRepository;

    public Tournament saveOrUpdate(Tournament match){
        return tournamentRepository.save(match);
    }

    public Tournament getById(Long matchId){
        return tournamentRepository.getById(matchId);
    }

    public Iterable<Tournament> findAll() {
        return tournamentRepository.findAll();
    }

    public void deleteById(Long tournamentId){
        Tournament tournament = tournamentRepository.getById(tournamentId);
        if (tournament == null) {
            throw new MatchIdException("Cannot delete with ID '"+ tournamentId + "'. This tournament does not exist.");
        }
        tournamentRepository.delete(tournament);
    }
}
