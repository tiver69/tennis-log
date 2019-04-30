package org.dss.tennislog.repositories;

import org.dss.tennislog.domain.Match;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

//@Repository
public interface MatchRepository extends CrudRepository<Match, Long> {

    Match getById(Long id);

    @Override
    Iterable<Match> findAll();
}
