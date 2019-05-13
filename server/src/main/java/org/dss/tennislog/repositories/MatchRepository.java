package org.dss.tennislog.repositories;

import org.dss.tennislog.domain.Match;
import org.dss.tennislog.domain.Player;
import org.dss.tennislog.repositories.query.PlayerMatchStatistic;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface MatchRepository extends CrudRepository<Match, Long> {
    Optional<Match> getById(Long id);
    Iterable<Match> findAll();
    Iterable<Match> findByPlayerOneIdOrPlayerTwoIdOrderByDate(Long id1, Long id2);
    Iterable<Match> findByTournamentIdOrderByDate(Long id);
    int countByPlayerOneIdAndPlayedStatus(Long playerOneId, Boolean playedStatus);
    int countByPlayerTwoIdAndPlayedStatus(Long playerOneId, Boolean playedStatus);

    @Query("SELECT " +
            "new org.dss.tennislog.repositories.query.PlayerMatchStatistic(m.playerTwo, Count(m.id)) " +
            "FROM Match m "+
            "WHERE m.playerOne = :playerOne AND m.playedStatus = true " +
            "GROUP BY m.playerTwo")
    List<PlayerMatchStatistic> countWinnerStatistic(@Param("playerOne") Player playerOne);

    @Query("SELECT " +
            "new org.dss.tennislog.repositories.query.PlayerMatchStatistic(m.playerOne, Count(m.id)) " +
            "FROM Match m "+
            "WHERE m.playerTwo = :playerTwo " +
            "GROUP BY m.playerOne")
    List<PlayerMatchStatistic> countLoseStatistic(@Param("playerTwo") Player playerTwo);
}
