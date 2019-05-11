package org.dss.tennislog.services;

import org.dss.tennislog.domain.Match;
import org.dss.tennislog.domain.Player;
import org.dss.tennislog.domain.Role;
import org.dss.tennislog.exceptions.UsernameAlreadyExistsException;
import org.dss.tennislog.repositories.MatchRepository;
import org.dss.tennislog.repositories.PlayerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.stream.Collectors;
import java.util.stream.Stream;

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

    public Player save(Player newPlayer){
        try {
            newPlayer.setPassword(bCryptPasswordEncoder.encode(newPlayer.getPassword()));
            newPlayer.setUsername(newPlayer.getUsername());
            newPlayer.setConfirmPassword("");
            newPlayer.setRoles(
                    Stream.of(Role.USER).collect(Collectors.toCollection(HashSet::new)));
            return playerRepository.save(newPlayer);
        } catch (Exception e) {
            throw new UsernameAlreadyExistsException("Username '"+ newPlayer.getUsername() + "' already exists");
        }
    }

    public Player update(Player updatePlayer){
        Player oldPlayer = playerRepository.getById(updatePlayer.getId());
        try {
            updatePlayer.setPassword(oldPlayer.getPassword());
            updatePlayer.setUsername(updatePlayer.getUsername());
            updatePlayer.setConfirmPassword("");
            return playerRepository.save(updatePlayer);
        } catch (Exception e) {
            e.printStackTrace();
            throw new UsernameAlreadyExistsException("Username '"+ updatePlayer.getUsername() + "' already exists");
        }
    }

}
