package org.dss.tennislog.web;

import org.dss.tennislog.domain.Match;
import org.dss.tennislog.domain.Tournament;
import org.dss.tennislog.exceptions.DataNotFoundException;
import org.dss.tennislog.services.MapValidationErrorService;
import org.dss.tennislog.services.TournamentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/tournament")
@CrossOrigin
public class TournamentController {

    @Autowired
    private TournamentService tournamentService;

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @GetMapping("/all")
    @PreAuthorize("hasAuthority('USER')")
    public Iterable<Tournament> findAll() {
        return tournamentService.findAll();
    }

    @GetMapping("/{tournamentId}/matches")
    @PreAuthorize("hasAuthority('USER')")
    public Iterable<Match> findAllMatches(@PathVariable Long tournamentId){
        return tournamentService.findAllTournamentMatches(tournamentId);
    }

    @PostMapping("")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> createNewTournament(@Valid @RequestBody Tournament tournament, BindingResult result){

        ResponseEntity<?> errorMap = mapValidationErrorService.mapValidationService(result);
        if (errorMap != null) return  errorMap;
        //        Tournament tournament = tournamentService.saveOrUpdate(tournament);
        return new ResponseEntity<Tournament>(tournamentService.saveOrUpdate(tournament),
                HttpStatus.CREATED);
    }

    @GetMapping("/{tournamentId}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> getTournamentById(@PathVariable Long tournamentId){

        Tournament tournament = tournamentService.getById(tournamentId);
        if (tournament == null) {
            throw new DataNotFoundException("Tournament with ID '" + tournamentId + "' doesn't exist");
        }
        return new ResponseEntity<Tournament>(tournament, HttpStatus.OK);
    }

    @DeleteMapping("/{tournamentId}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> deleteTournament(@PathVariable Long tournamentId){
        tournamentService.deleteById(tournamentId);
        return new ResponseEntity<String>("Tournament with ID '" + tournamentId+"' and all its matches were deleted.", HttpStatus.OK);
    }
}
