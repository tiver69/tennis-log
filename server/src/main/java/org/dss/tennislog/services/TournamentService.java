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

import java.util.*;

@Service
public class TournamentService {

    @Autowired
    private TournamentRepository tournamentRepository;

    @Autowired
    private MatchRepository matchRepository;

    public Tournament saveOrUpdate(Tournament tournament) {
        return tournamentRepository.save(tournament);
    }

    public Tournament getById(Long tournamentId) {
        Optional<Tournament> tournament = tournamentRepository.getById(tournamentId);

        if (tournament.isPresent()) {
            return tournament.get();
        } else {
            throw new DataNotFoundException("Tournament with ID '" + tournamentId + "' does not exist.");
        }
    }

    public Iterable<Tournament> findAll() {
        return tournamentRepository.findAllByOrderByStartDate();
    }

    public void deleteById(Long tournamentId) {
        Tournament tournament = getById(tournamentId);
        tournamentRepository.delete(tournament);
    }

    public Iterable<Match> findAllTournamentMatches(Long tournamentId) {
        Tournament tournament = getById(tournamentId);
        return matchRepository.findByTournamentIdOrderByDate(tournamentId);
    }

    public HashMap<Player, Long> countTournamentResult(Long tournamentId) {
        List<PlayerMatchStatistic> tournamentResults =
                matchRepository.countTournamentResult(getById(tournamentId));

        HashMap<Player, Long> response = new HashMap<>();
        int players = tournamentResults.size();
        for (PlayerMatchStatistic result : tournamentResults) {
            int position = tournamentResults.indexOf(result);
            response.put(result.getPlayer(), (long) ((players - position) * 10));
        }
        return response;
    }

    public List<PlayerMatchStatistic> countCommonResult() {
        Iterable<Tournament> tournaments = findAll();
        HashMap<Player, Long> result = new HashMap<>();
        List<PlayerMatchStatistic> result1 = new ArrayList<>();

        for (Tournament tournament : tournaments) {
            HashMap<Player, Long> tournamentResult = countTournamentResult(tournament.getId());
            for (Player player : tournamentResult.keySet()) {
                result.putIfAbsent(player, 0L);
                result.put(player, result.get(player) + tournamentResult.get(player));
            }
        }

        for (Player player : result.keySet()) {
            result1.add(new PlayerMatchStatistic(player, result.get(player)));
        }
        result1.sort(new CommonResultComparator());
        return result1;
    }

    public List<Player> findAllPlayersOfTournament(Long tournamentId) {
        List<Player> result = new ArrayList<>();

        List<PlayerMatchStatistic> tournamentPlayersWithResults =
                matchRepository.countTournamentResult(getById(tournamentId));
        tournamentPlayersWithResults.sort(new TournamentResultComparator(tournamentId, matchRepository));
        for (PlayerMatchStatistic playerMatchStatistic : tournamentPlayersWithResults) {
            result.add(playerMatchStatistic.getPlayer());
        }

        Set<Player> allTournamentPlayers = new HashSet<>();
        allTournamentPlayers.addAll(matchRepository.findWinnersFromTournament(getById(tournamentId)));
        allTournamentPlayers.addAll(matchRepository.findLoseFromTournament(getById(tournamentId)));
        for (Player player : allTournamentPlayers) {
            if (!result.contains(player)) result.add(player);
        }

        return result;
    }

    public List<List<Match>> getAsRoundTournament(Long tournamentId) {

        List<Player> players = findAllPlayersOfTournament(tournamentId);
        Match[][] matchArray = new Match[players.size()][players.size()];


        for (int i = 0; i < players.size(); i++) {
            Player playerOne = players.get(i);
            for (int j = 0; j < players.size(); j++) {
                Player playerTwo = players.get(j);
                Match current = matchRepository.findByPlayerOneIdAndPlayerTwoIdAndTournamentId(
                        playerOne.getId(), playerTwo.getId(), tournamentId);
                matchArray[i][j] = current;
            }
        }

        for (int i = 0; i < players.size(); i++) {
            for (int j = 0; j < players.size(); j++) {
                if (matchArray[i][j] != null && matchArray[j][i] == null) matchArray[j][i] = matchArray[i][j];
            }
        }

        List<List<Match>> result = new ArrayList<>();
        for (int i = 0; i < players.size(); i++) {
            result.add(new ArrayList<>());
            for (int j = 0; j < players.size(); j++) {
                result.get(i).add(matchArray[i][j]);
            }
        }
        return result;
    }
}
