package org.dss.tennislog.services;

import org.dss.tennislog.TennisLogApplication;
import org.dss.tennislog.domain.Match;
import org.dss.tennislog.domain.Player;
import org.dss.tennislog.exceptions.UsernameAlreadyExistsException;
import org.dss.tennislog.repositories.MatchRepository;
import org.dss.tennislog.repositories.PlayerRepository;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class PlayerService {

    @Autowired
    private MatchRepository matchRepository;

    @Autowired
    private PlayerRepository playerRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public Player getById(Long playerId){
        return playerRepository.getById(playerId);
    }

    public Player getByUsername(String username){
        return playerRepository.findByUsername(username);
    }

    public Iterable<Player> findAll() {
        return playerRepository.findAll();
    }

    public Iterable<Match> findAllPlayerMatches(String username) {
        Long id = getByUsername(username).getId();
        return matchRepository.findByPlayerOneIdOrPlayerTwoId(id, id);
    }

    public Player saveOrUpdate(Player newPlayer){
        try {
            newPlayer.setPassword(bCryptPasswordEncoder.encode(newPlayer.getPassword()));
            //setup username if blank

            LoggerFactory.getLogger(TennisLogApplication.class).info(newPlayer.getUsername());
            newPlayer.setUsername(newPlayer.getUsername());

            LoggerFactory.getLogger(TennisLogApplication.class).info(newPlayer.getUsername());
            //check pass
            newPlayer.setConfirmPassword("");
            return playerRepository.save(newPlayer);
        } catch (Exception e) {
            LoggerFactory.getLogger(TennisLogApplication.class).info("here");
            throw new UsernameAlreadyExistsException("Username '"+ newPlayer.getUsername() + "' already exists");
        }
    }

}
