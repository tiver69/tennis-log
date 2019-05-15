package org.dss.tennislog.services.comparators;

import org.dss.tennislog.domain.Match;
import org.dss.tennislog.repositories.MatchRepository;
import org.dss.tennislog.repositories.query.PlayerMatchStatistic;

import java.util.Comparator;

public class TournamentResultComparator implements Comparator<PlayerMatchStatistic> {

    private Long tournamentId;

    private MatchRepository matchRepository;

    public TournamentResultComparator(Long tournamentId, MatchRepository matchRepository) {
        this.tournamentId = tournamentId;
        this.matchRepository = matchRepository;
    }

    @Override
    public int compare(PlayerMatchStatistic o1, PlayerMatchStatistic o2) {
        if (!o1.getCount().equals(o2.getCount())) return (int) (o2.getCount() - o1.getCount());

        int o1WinnGames = getWinnGames(
                matchRepository.findByPlayerOneAndTournamentId(o1.getPlayer(), tournamentId));
        int o2WinnGames = getWinnGames(
                matchRepository.findByPlayerOneAndTournamentId(o2.getPlayer(), tournamentId));
        return o2WinnGames - o1WinnGames;
    }

    private int getWinnGames(Iterable<Match> matches) {
        int winnGames = 0;
        for (Match match : matches) {
            for (String scoreSet : match.getScore().split(" ")) {
                winnGames = winnGames +
                        Integer.parseInt(
                                scoreSet.substring(0, scoreSet.indexOf(":")));
            }
        }
        return winnGames;
    }

}
