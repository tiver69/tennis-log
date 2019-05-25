package org.dss.tennislog.security;

import io.jsonwebtoken.*;
import org.dss.tennislog.TennisLogApplication;
import org.dss.tennislog.domain.Player;
import org.slf4j.LoggerFactory;
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

    public String generateToken(Authentication authentication) {
        Player player = (Player) authentication.getPrincipal();
        Date now = new Date(System.currentTimeMillis());
        Date expiryDate = new Date(now.getTime() + EXPIRATION_TIME);
        String playerId = Long.toString(player.getId());
        Map<String, Object> claims = new HashMap<>();
        claims.put("id", playerId);
        claims.put("username", player.getUsername());
        claims.put("roles", player.getRoles());
        //roles somewhere here
        return Jwts.builder()
                .setSubject(playerId)
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(SignatureAlgorithm.HS512, SECRET_KEY)
                .compact();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token);
            return true;
        } catch (SignatureException ex) {
            LoggerFactory.getLogger(TennisLogApplication.class).info("Invalid token.");
        } catch (MalformedJwtException ex) {
            LoggerFactory.getLogger(TennisLogApplication.class).info("Invalid token.");
        } catch (ExpiredJwtException ex) {
            LoggerFactory.getLogger(TennisLogApplication.class).info("Expired token.");
        } catch (UnsupportedJwtException ex) {
            LoggerFactory.getLogger(TennisLogApplication.class).info("Unsupported token.");
        } catch (IllegalArgumentException ex) {
            LoggerFactory.getLogger(TennisLogApplication.class).info("Token is empty.");
        }
        return false;
    }

    public Long getPlayerIdFromJWT(String token) {
        Claims claims = Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token).getBody();
        String id = (String) claims.get("id");
        return Long.parseLong(id);
    }
}
