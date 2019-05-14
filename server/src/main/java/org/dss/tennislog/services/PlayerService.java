package org.dss.tennislog.services;

import org.dss.tennislog.domain.Match;
import org.dss.tennislog.domain.Player;
import org.dss.tennislog.domain.Role;
import org.dss.tennislog.exceptions.DataNotFoundException;
import org.dss.tennislog.exceptions.UsernameAlreadyExistsException;
import org.dss.tennislog.repositories.MatchRepository;
import org.dss.tennislog.repositories.query.PlayerMatchStatistic;
import org.dss.tennislog.repositories.PlayerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;
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
        Optional<Player> player = playerRepository.getById(playerId);

        if(player.isPresent()) {
            return player.get();
        } else {
            throw new DataNotFoundException("Player with ID '" + playerId + "' doesn't exist");
        }
    }

    public Player getByUsername(String username){
        Optional<Player> player = playerRepository.findByUsername(username);

        if(player.isPresent()) {
            return player.get();
        } else {
            throw new UsernameNotFoundException("Player with username '" + username + "' doesn't exist");
        }
    }

    public Iterable<Player> findAll() {
        return playerRepository.findAllByOrderByLastName();
    }

    public Iterable<Match> findAllPlayerMatches(String username) {
        Long id = getByUsername(username).getId();
        return matchRepository.findByPlayerOneIdOrPlayerTwoIdOrderByDate(id, id);
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
        Player oldPlayer = getById(updatePlayer.getId());
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

    public Player setAdmin(Long playerId){
        Player player = getById(playerId);
        player.getRoles().add(Role.ADMIN);
//        LoggerFactory.getLogger(TennisLogApplication.class).info(player.getRoles().toString());
        return playerRepository.save(player);
    }

    public Player removeAdmin(Long playerId){
        Player player = getById(playerId);
        player.getRoles().remove(Role.ADMIN);
//        LoggerFactory.getLogger(TennisLogApplication.class).info(player.getRoles().toString());
        return playerRepository.save(player);
    }

    public Map<String, Map<String, Long>> getPlayerStatistic(String username){
        Long playerId = getByUsername(username).getId();
        long winnerMatch = matchRepository.countByPlayerOneIdAndPlayedStatus(playerId, true);
        long loseMatch = matchRepository.countByPlayerTwoIdAndPlayedStatus(playerId, true);

        Map<String,Map<String, Long>> statistic = new HashMap<>();
        statistic.put("general", new HashMap<>());
        statistic.get("general").put("winner", winnerMatch);
        statistic.get("general").put("lose", loseMatch);
        statistic.putAll(getPlayerStatisticToOtherPlayers(playerId));

        return  statistic;
    }

    private Map<String,Map<String, Long>> getPlayerStatisticToOtherPlayers(Long playerId) {
        List<PlayerMatchStatistic> matchWinnerStatistic = matchRepository.countPlayerWinnerStatistic(getById(playerId));
        List<PlayerMatchStatistic> matchLoseStatistics = matchRepository.countPlayerLoseStatistic(getById(playerId));

        Map<String,Map<String, Long>> statistic = new HashMap<>();

        matchWinnerStatistic.forEach(winStatistic-> {
            statistic.put(winStatistic.getPlayerString(), new HashMap<>());
            statistic.get(winStatistic.getPlayerString()).put("win", winStatistic.getCount());
            statistic.get(winStatistic.getPlayerString()).put("lose",0L);
        });

        matchLoseStatistics.forEach(loseStatistic-> {
            if (!statistic.containsKey(loseStatistic.getPlayerString())) {
                statistic.put(loseStatistic.getPlayerString(), new HashMap<>());
                statistic.get(loseStatistic.getPlayerString()).put("win",0L);
            }
            statistic.get(loseStatistic.getPlayerString()).put("lose",loseStatistic.getCount());
        });
        return statistic;
    }
}
