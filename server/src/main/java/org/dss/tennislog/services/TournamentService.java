package org.dss.tennislog.services;

import org.dss.tennislog.domain.Match;
import org.dss.tennislog.domain.Tournament;
import org.dss.tennislog.exceptions.DataNotFoundException;
import org.dss.tennislog.repositories.MatchRepository;
import org.dss.tennislog.repositories.TournamentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TournamentService {

    @Autowired
    private TournamentRepository tournamentRepository;

    @Autowired
    private MatchRepository matchRepository;

    public Tournament saveOrUpdate(Tournament tournament){
        return tournamentRepository.save(tournament);
    }

    public Tournament getById(Long tournamentId){
        return tournamentRepository.getById(tournamentId);
    }

    public Iterable<Tournament> findAll() {
        return tournamentRepository.findAll();
    }

    public void deleteById(Long tournamentId){
        Tournament tournament = tournamentRepository.getById(tournamentId);
        if (tournament == null) {
            throw new DataNotFoundException("Cannot delete with ID '"+ tournamentId + "'. This tournament does not exist.");
        }
        tournamentRepository.delete(tournament);
    }

    public Iterable<Match> findAllTournamentMatches(Long tournamentId){
        Tournament tournament = tournamentRepository.getById(tournamentId);
        if (tournament == null) {
            throw new DataNotFoundException("Tournament with ID '"+ tournamentId + "' does not exist.");
        }
        return matchRepository.findByTournamentId(tournamentId);
    }
}
