package org.dss.tennislog.repositories;

import org.dss.tennislog.domain.Player;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface PlayerRepository extends CrudRepository<Player, Long> {
    Optional<Player> getById(Long id);
    Optional<Player> findByUsername(String username);
    Iterable<Player> findAllByOrderByLastName();
}
