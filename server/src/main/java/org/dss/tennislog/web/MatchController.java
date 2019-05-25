package org.dss.tennislog.web;

import org.dss.tennislog.domain.Match;
import org.dss.tennislog.exceptions.DataNotFoundException;
import org.dss.tennislog.services.MapValidationErrorService;
import org.dss.tennislog.services.MatchService;
import org.dss.tennislog.validator.MatchValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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
    private MatchValidator matchValidator;

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @PostMapping("/{playerOneId}-{playerTwoId}/{tournamentId}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> createNewMatch(@Valid @RequestBody Match match, BindingResult result,
                                            @PathVariable Long playerOneId, @PathVariable Long playerTwoId,
                                            @PathVariable Long tournamentId) {
        match = matchValidator.validate(playerOneId, playerTwoId, tournamentId, match, result);

        ResponseEntity<?> errorMap = mapValidationErrorService.mapValidationService(result);
        if (errorMap != null) return errorMap;

        Match newMatch = matchService.saveOrUpdate(match);
        return new ResponseEntity<Match>(newMatch,
                HttpStatus.CREATED);
    }

    @GetMapping("/{matchId}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> getMatchById(@PathVariable Long matchId) {

        Match match = matchService.getById(matchId);
        if (match == null) {
            throw new DataNotFoundException("Match with ID '" + matchId + "' doesn't exist");
        }
        return new ResponseEntity<Match>(match, HttpStatus.OK);
    }

    @DeleteMapping("/{matchId}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> deleteMatch(@PathVariable Long matchId) {
        matchService.deleteById(matchId);
        return new ResponseEntity<String>("Match with ID '" + matchId + "' was deleted.", HttpStatus.OK);
    }

}
