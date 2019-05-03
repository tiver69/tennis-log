package org.dss.tennislog.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.util.HashMap;
import java.util.Map;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class CreateMatchException extends RuntimeException {

    private Map<String,String> errorMap = new HashMap<>();

    public CreateMatchException() {
        super();
    }

    public void addException(String  field, String defaultMessage) {
        errorMap.put(field,defaultMessage);
    }

    public Map<String,String> getErrorMap(){
        return new HashMap<String, String>(errorMap);
    }

    public boolean isThrowable(){
        return !(errorMap.size()==0);
    }

}