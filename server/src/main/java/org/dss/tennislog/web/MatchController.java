package org.dss.tennislog.web;

import org.dss.tennislog.domain.Match;
import org.dss.tennislog.exceptions.MatchIdException;
import org.dss.tennislog.services.MapValidationErrorService;
import org.dss.tennislog.services.MatchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/apl/match")
public class MatchController {

    @Autowired
    private MatchService matchService;

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @PostMapping("")
    public ResponseEntity<?> createNewMatch(@Valid @RequestBody Match match, BindingResult result){

        ResponseEntity<?> errorMap = mapValidationErrorService.mapValidationService(result);
        if (errorMap != null) return  errorMap;
        //        Match match1 = matchService.saveOrUpdate(match);
        return new ResponseEntity<Match>(matchService.saveOrUpdate(match),
                HttpStatus.CREATED);
    }

    @GetMapping("/{matchId")
    public ResponseEntity<?> getMatchById(@PathVariable Long matchId){

        Match match = matchService.getById(matchId);
        if (match == null) {
            throw new MatchIdException("Match ID '" + matchId + "' doesn't exist");
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
        return new ResponseEntity<String>("Project with ID '" + matchId+"' was deleted.", HttpStatus.OK);
    }

}
