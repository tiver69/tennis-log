package org.dss.tennislog.services;

import org.dss.tennislog.domain.Match;
import org.dss.tennislog.domain.Player;
import org.dss.tennislog.domain.Tournament;
import org.dss.tennislog.exceptions.DataNotFoundException;
import org.dss.tennislog.repositories.MatchRepository;
import org.dss.tennislog.repositories.TournamentRepository;
import org.dss.tennislog.repositories.query.PlayerMatchStatistic;
import org.dss.tennislog.services.comparators.CommonResultComparator;
import org.dss.tennislog.services.comparators.TournamentResultComparator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

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
        Optional<Tournament> tournament = tournamentRepository.getById(tournamentId);

        if(tournament.isPresent()) {
            return tournament.get();
        } else {
            throw new DataNotFoundException("Tournament with ID '"+ tournamentId + "' does not exist.");
        }
    }

    public Iterable<Tournament> findAll() {
        return tournamentRepository.findAllByOrderByStartDate();
    }

    public void deleteById(Long tournamentId){
        Tournament tournament = getById(tournamentId);
        tournamentRepository.delete(tournament);
    }

    public Iterable<Match> findAllTournamentMatches(Long tournamentId){
        Tournament tournament = getById(tournamentId);
        return matchRepository.findByTournamentIdOrderByDate(tournamentId);
    }

    public HashMap<Player, Long> countTournamentResult(Long tournamentId){
        List<PlayerMatchStatistic> tournamentResults =
                matchRepository.countTournamentResult(getById(tournamentId));

        tournamentResults.sort(new TournamentResultComparator(tournamentId, matchRepository));

        HashMap<Player, Long> response = new HashMap<>();
        int players = tournamentResults.size();
        for (PlayerMatchStatistic result: tournamentResults) {
            int position = tournamentResults.indexOf(result);
            response.put(result.getPlayer(), (long)((players - position)*10));
        }
        return response;
    }

    public List<PlayerMatchStatistic> countCommonResult(){
        Iterable<Tournament> tournaments = findAll();
        HashMap<Player, Long> result = new HashMap<>();
        List<PlayerMatchStatistic> result1 = new ArrayList<>();

        for (Tournament tournament : tournaments) {
            HashMap<Player, Long> tournamentResult = countTournamentResult(tournament.getId());
            for (Player player: tournamentResult.keySet()){
                result.putIfAbsent(player, 0L);
                result.put(player,result.get(player)+tournamentResult.get(player));
            }
        }

        for (Player player:result.keySet()) {
            result1.add(new PlayerMatchStatistic(player,result.get(player)));
        }
        result1.sort(new CommonResultComparator());
        return result1;
    }

}
