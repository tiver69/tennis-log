package org.dss.tennislog.repositories;

import org.dss.tennislog.domain.Match;
import org.dss.tennislog.domain.Tournament;
import org.springframework.data.repository.CrudRepository;

public interface TournamentRepository extends CrudRepository<Tournament, Long> {
    Tournament getById(Long id);
}
