package org.dss.tennislog.web;

import org.dss.tennislog.domain.Match;
import org.dss.tennislog.domain.Player;
import org.dss.tennislog.security.JwtTokenProvider;
import org.dss.tennislog.security.payload.JWTLoginSuccessResponse;
import org.dss.tennislog.security.payload.LoginRequest;
import org.dss.tennislog.services.MapValidationErrorService;
import org.dss.tennislog.services.PlayerService;
import org.dss.tennislog.validator.PlayerValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;
import java.util.Map;

import static org.dss.tennislog.security.SecurityConstants.TOKEN_PREFIX;

@RestController
@RequestMapping("/api/player")
@CrossOrigin
public class PlayerController {

    @Autowired
    private PlayerService playerService;

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @Autowired
    private PlayerValidator playerValidator;

    @Autowired
    private JwtTokenProvider tokenProvider;

    @Autowired
    private AuthenticationManager authenticationManager;

    @PostMapping("/free/register")
    public ResponseEntity<?> registerPlayer(@Valid @RequestBody Player player, BindingResult result) {
        playerValidator.validate(player, result);

        ResponseEntity<?> errorMap = mapValidationErrorService.mapValidationService(result);
        if (errorMap != null) return errorMap;

        Player newPlayer = playerService.save(player);
        return new ResponseEntity<Player>(newPlayer, HttpStatus.CREATED);
    }

    @PostMapping("/free/login")
    public ResponseEntity<?> authenticatePlayer(@Valid @RequestBody LoginRequest loginRequest,
                                                BindingResult result) {
        ResponseEntity<?> errorMap = mapValidationErrorService.mapValidationService(result);
        if (errorMap != null) return errorMap;

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername(),
                        loginRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = TOKEN_PREFIX + tokenProvider.generateToken(authentication);
        return ResponseEntity.ok(new JWTLoginSuccessResponse(true, jwt));
    }

    @GetMapping("/current")
    @PreAuthorize("hasAuthority('USER')")
    public ResponseEntity<?> getCurrentPlayer(Principal principal) {

        Player player = playerService.getByUsername(principal.getName());
        return new ResponseEntity<Player>(player, HttpStatus.OK);
    }

    @PostMapping("/update")
    @PreAuthorize("hasAuthority('USER')")
    public ResponseEntity<?> updateCurrentPlayer(@Valid @RequestBody Player player, BindingResult result) {
        playerValidator.validateDates(player, result);

        ResponseEntity<?> errorMap = mapValidationErrorService.mapValidationService(result);
        if (errorMap != null) return errorMap;

        Player newPlayer = playerService.update(player);
        return new ResponseEntity<Player>(newPlayer, HttpStatus.CREATED);
    }

    @GetMapping("/matches")
    @PreAuthorize("hasAuthority('USER')")
    public Iterable<Match> findAllPlayerMatches(Principal principal) {
        return playerService.findAllPlayerMatches(principal.getName());
    }

    @GetMapping("/statistic")
    @PreAuthorize("hasAuthority('USER')")
    public ResponseEntity<?> getPlayerStatistic(Principal principal) {
        Map<String, Map<String, Long>> statistic = playerService.getPlayerStatistic(principal.getName());
        return new ResponseEntity<>(statistic, HttpStatus.OK);
    }

    @GetMapping("/all")
    @PreAuthorize("hasAuthority('ADMIN')")
    public Iterable<Player> findAll() {
        return playerService.findAll();
    }

    @GetMapping("/{playerId}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> getPlayerById(@PathVariable Long playerId) {

        Player player = playerService.getById(playerId);
        return new ResponseEntity<Player>(player, HttpStatus.OK);
    }

    @PostMapping("/set-admin/{playerId}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Player> setAdminToPlayer(@PathVariable Long playerId) {
        Player player = playerService.setAdmin(playerId);
        return new ResponseEntity<Player>(player, HttpStatus.OK);
    }

    @PostMapping("/remove-admin/{playerId}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Player> removeAdminFromPlayer(@PathVariable Long playerId) {
        Player player = playerService.removeAdmin(playerId);
        return new ResponseEntity<Player>(player, HttpStatus.OK);
    }
}
