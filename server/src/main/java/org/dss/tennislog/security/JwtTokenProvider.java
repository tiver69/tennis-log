package org.dss.tennislog.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.dss.tennislog.domain.Player;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import static org.dss.tennislog.security.SecurityConstants.EXPIRATION_TIME;
import static org.dss.tennislog.security.SecurityConstants.SECRET_KEY;

/**
 * Generate the token
 * Validate the token
 * Get player Id from token
 */
@Component
public class JwtTokenProvider {

    public String generateToken(Authentication authentication){
        Player player = (Player)authentication.getPrincipal();
        Date now = new Date(System.currentTimeMillis());
        Date expiryDate = new Date(now.getTime()+EXPIRATION_TIME);
        String playerId = Long.toString(player.getId());
        Map<String,Object> claims = new HashMap<>();
        claims.put("id", playerId);
        claims.put("username", player.getUsername());
        claims.put("firstName", player.getFirstName());
        claims.put("lastName", player.getLastName());
        //roles somewhere here
        return Jwts.builder()
                .setSubject(playerId)
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(SignatureAlgorithm.HS512, SECRET_KEY)
                .compact();
    }


}
