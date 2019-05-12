package org.dss.tennislog.repositories;

import org.dss.tennislog.domain.Match;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface MatchRepository extends CrudRepository<Match, Long> {
    Optional<Match> getById(Long id);
    Iterable<Match> findAll();
    Iterable<Match> findByPlayerOneIdOrPlayerTwoIdOrderByDate(Long id1, Long id2);
    Iterable<Match> findByTournamentIdOrderByDate(Long id);
}
