package org.dss.tennislog.exceptions.responses;

import lombok.Getter;
import lombok.Setter;

public class DataNotFoundExceptionResponse {

    @Getter @Setter
    private String idNotFound;

    public DataNotFoundExceptionResponse(String idNotFound) {
        this.idNotFound = idNotFound;
    }
}