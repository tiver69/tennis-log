package org.dss.tennislog.web;

import org.dss.tennislog.domain.Tournament;
import org.dss.tennislog.exceptions.MatchIdException;
import org.dss.tennislog.services.MapValidationErrorService;
import org.dss.tennislog.services.TournamentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

    @PostMapping("")
    public ResponseEntity<?> createNewTournament(@Valid @RequestBody Tournament tournament, BindingResult result){

        ResponseEntity<?> errorMap = mapValidationErrorService.mapValidationService(result);
        if (errorMap != null) return  errorMap;
        //        Tournament tournament = tournamentService.saveOrUpdate(tournament);
        return new ResponseEntity<Tournament>(tournamentService.saveOrUpdate(tournament),
                HttpStatus.CREATED);
    }

    @GetMapping("/{tournamentId}")
    public ResponseEntity<?> getTournamentById(@PathVariable Long tournamentId){

        Tournament tournament = tournamentService.getById(tournamentId);
        if (tournament == null) {
            throw new MatchIdException("Tournament with ID '" + tournamentId + "' doesn't exist");
        }
        return new ResponseEntity<Tournament>(tournament, HttpStatus.OK);
    }

    @GetMapping("/all")
    public Iterable<Tournament> findAll() {
        return tournamentService.findAll();
    }

    @DeleteMapping("/{tournamentId}")
    public ResponseEntity<?> deleteTournament(@PathVariable Long tournamentId){
        tournamentService.deleteById(tournamentId);
        return new ResponseEntity<String>("Project with ID '" + tournamentId+"' was deleted.", HttpStatus.OK);
    }

}
