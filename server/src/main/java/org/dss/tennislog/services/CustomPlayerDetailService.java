package org.dss.tennislog.services;

import org.dss.tennislog.domain.Player;
import org.dss.tennislog.repositories.PlayerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CustomPlayerDetailService implements UserDetailsService {

    @Autowired
    PlayerRepository playerRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Player player = playerRepository.findByUsername(username);

        if (player == null) new UsernameNotFoundException("Player not found");
        return player;
    }

    @Transactional
    public  Player loadPlayerById(Long id){
        Player player = playerRepository.getById(id);
        if (player == null) new UsernameNotFoundException("Player not found");
        return player;
    }

}
