package org.dss.tennislog.web;

import org.dss.tennislog.domain.Match;
import org.dss.tennislog.domain.Player;
import org.dss.tennislog.services.MapValidationErrorService;
import org.dss.tennislog.services.PlayerService;
import org.dss.tennislog.validator.PlayerValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

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

    @GetMapping("/{playerId}/matches")
    public Iterable<Match> findAllMatches(@PathVariable Long playerId){
        return playerService.findAllPlayerMatches(playerId);
    }

    @GetMapping("/all")
    public Iterable<Player> findAll() {
        return playerService.findAll();
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerPlayer(@Valid @RequestBody Player player, BindingResult result){
        //validate passwords match
        playerValidator.validate(player,result);

        ResponseEntity<?> errorMap = mapValidationErrorService.mapValidationService(result);
        if (errorMap != null) return errorMap;

        Player newPlayer = playerService.savePlayer(player);
        return new ResponseEntity<Player>(newPlayer, HttpStatus.CREATED);
    }

}
