package org.dss.tennislog.exceptions;

import lombok.Getter;
import lombok.Setter;

public class MatchIdExceptionResponse {

    @Getter @Setter
    private String matchId;

    public MatchIdExceptionResponse(String matchId) {
    }
}
