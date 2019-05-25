package org.dss.tennislog.services;

import org.dss.tennislog.domain.Player;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class PlayerDetailService implements UserDetailsService {

    @Autowired
    private PlayerService playerService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return playerService.getByUsername(username);
    }

    @Transactional
    public Player loadPlayerById(Long id) {
        return playerService.getById(id);
    }
}
