package org.dss.tennislog.exceptions.responses;

import lombok.Data;

@Data
public class UsernameAlreadyExistsResponse {

    private String username;

    public UsernameAlreadyExistsResponse(String username) {
        this.username = username;
    }
}
