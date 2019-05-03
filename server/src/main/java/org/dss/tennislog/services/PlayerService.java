package org.dss.tennislog.services;

import org.dss.tennislog.domain.Match;
import org.dss.tennislog.domain.Player;
import org.dss.tennislog.domain.Tournament;
import org.dss.tennislog.repositories.MatchRepository;
import org.dss.tennislog.repositories.PlayerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PlayerService {

    @Autowired
    private MatchRepository matchRepository;

    @Autowired
    private PlayerRepository playerRepository;

    public Player getById(Long playerId){
        return playerRepository.getById(playerId);
    }

    public Iterable<Player> findAll() {
        return playerRepository.findAll();
    }

    public Iterable<Match> findAllPlayerMatches(Long id) {
        return matchRepository.findByPlayerOneIdOrPlayerTwoId(id, id);
    }

}
