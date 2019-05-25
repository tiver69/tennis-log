package org.dss.tennislog.repositories;

import org.dss.tennislog.domain.Tournament;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface TournamentRepository extends CrudRepository<Tournament, Long> {
    Optional<Tournament> getById(Long id);

    Iterable<Tournament> findAllByOrderByStartDate();
}
