package org.dss.tennislog.web;

import org.dss.tennislog.domain.Match;
import org.dss.tennislog.domain.Player;
import org.dss.tennislog.domain.Tournament;
import org.dss.tennislog.exceptions.DataNotFoundException;
import org.dss.tennislog.payload.JWTLoginSuccessResponse;
import org.dss.tennislog.payload.LoginRequest;
import org.dss.tennislog.security.JwtTokenProvider;
import org.dss.tennislog.services.MapValidationErrorService;
import org.dss.tennislog.services.PlayerService;
import org.dss.tennislog.validator.PlayerValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

import java.security.Principal;

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

    @GetMapping("/matches")
    public Iterable<Match> findAllPlayerMatches(Principal principal){
        return playerService.findAllPlayerMatches(principal.getName());
    }

    @GetMapping("/all")
    public Iterable<Player> findAll() {
        return playerService.findAll();
    }

    @GetMapping("/free/{playerId}")
    public ResponseEntity<?> getTournamentById(@PathVariable Long playerId){

        Player player = playerService.getById(playerId);

        if (player.getPassword() != null){
            throw new DataNotFoundException("Player with ID '" + playerId + "' already exist");
        }
        if (player == null) {
            throw new DataNotFoundException("Player with ID '" + playerId + "' doesn't exist");
        }
        return new ResponseEntity<Player>(player, HttpStatus.OK);
    }

    @GetMapping("/free/unregistered")
    public Iterable<Player> findUnregistered() {
        return playerService.findUnregistered();
    }

    @PostMapping("/free/register")
    public ResponseEntity<?> registerPlayer(@Valid @RequestBody Player player, BindingResult result){
        //validate passwords match
        playerValidator.validate(player,result);

        ResponseEntity<?> errorMap = mapValidationErrorService.mapValidationService(result);
        if (errorMap != null) return errorMap;

        Player newPlayer = playerService.saveOrUpdate(player);
        return new ResponseEntity<Player>(newPlayer, HttpStatus.CREATED);
    }

    @PostMapping("/free/login")
    public ResponseEntity<?> authenticatePlayer(@Valid @RequestBody LoginRequest loginRequest,
                                                BindingResult result){
        ResponseEntity<?> errorMap = mapValidationErrorService.mapValidationService(result);
        if(errorMap != null) return errorMap;

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername(),
                        loginRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = TOKEN_PREFIX + tokenProvider.generateToken(authentication);
        return ResponseEntity.ok(new JWTLoginSuccessResponse(true,jwt));
    }

    @GetMapping("/current")
    public ResponseEntity<?> getCurrentPlayer(Principal principal){

        Player player = playerService.getByUsername(principal.getName());
        if (player == null) {
            throw new DataNotFoundException("Player with username '" + principal.getName() + "' doesn't exist");
        }
        return new ResponseEntity<Player>(player, HttpStatus.OK);
    }

}
