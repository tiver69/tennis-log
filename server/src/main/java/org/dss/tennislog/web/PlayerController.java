package org.dss.tennislog.web;

import org.dss.tennislog.domain.Match;
import org.dss.tennislog.services.MapValidationErrorService;
import org.dss.tennislog.services.PlayerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/player")
@CrossOrigin
public class PlayerController {

    @Autowired
    private PlayerService playerService;

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @GetMapping("/{playerId}/matches")
    public Iterable<Match> findAllMatches(@PathVariable Long playerId){
        return playerService.findAllPlayerMatches(playerId);
    }

}
