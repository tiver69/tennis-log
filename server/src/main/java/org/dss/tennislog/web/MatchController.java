package org.dss.tennislog.web;

import org.dss.tennislog.domain.Match;
import org.dss.tennislog.exceptions.DataNotFoundException;
import org.dss.tennislog.services.MapValidationErrorService;
import org.dss.tennislog.services.MatchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/match")
@CrossOrigin
public class MatchController {

    @Autowired
    private MatchService matchService;

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @PostMapping("/{playerOneId}-{playerTwoId}/{tournamentId}")
    public ResponseEntity<?> createNewMatch(@Valid @RequestBody Match match, BindingResult result,
                                            @PathVariable Long playerOneId, @PathVariable Long playerTwoId,
                                            @PathVariable Long tournamentId){
        ResponseEntity<?> errorMap = mapValidationErrorService.mapValidationService(result);
        Match newMatch = matchService.saveOrUpdate(playerOneId, playerTwoId, tournamentId, match);
        if (errorMap != null || newMatch == null) return  errorMap;
        return new ResponseEntity<Match>(newMatch,
                HttpStatus.CREATED);
    }

    @GetMapping("/{matchId}")
    public ResponseEntity<?> getMatchById(@PathVariable Long matchId){

        Match match = matchService.getById(matchId);
        if (match == null) {
            throw new DataNotFoundException("Match with ID '" + matchId + "' doesn't exist");
        }
        return new ResponseEntity<Match>(match, HttpStatus.OK);
    }

    @GetMapping("/all")
    public Iterable<Match> findAll() {
        return matchService.findAll();
    }

    @DeleteMapping("/{matchId}")
    public ResponseEntity<?> deleteMatch(@PathVariable Long matchId){
        matchService.deleteById(matchId);
        return new ResponseEntity<String>("Match with ID '" + matchId+"' was deleted.", HttpStatus.OK);
    }

}
