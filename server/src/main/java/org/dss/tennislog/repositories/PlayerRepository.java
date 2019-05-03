package org.dss.tennislog.repositories;

import org.dss.tennislog.domain.Player;
import org.springframework.data.repository.CrudRepository;

public interface PlayerRepository extends CrudRepository<Player, Long> {
    Player getById(Long id);
}
