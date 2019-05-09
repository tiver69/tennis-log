package org.dss.tennislog.validator;

import org.dss.tennislog.domain.Player;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

@Component
public class PlayerValidator implements Validator {
    @Override
    public boolean supports(Class<?> aClass) {
        return Player.class.equals(aClass);
    }

    @Override
    public void validate(Object object, Errors errors) {
        Player player = (Player)object;
        if (player.getPassword() == null){
            errors.rejectValue("password", "Empty", "This is required field");
            return;
        }
        if (player.getPassword().length() < 6) {
            errors.rejectValue("password", "Length", "Password must at least 6 characters");
        }
        if (!player.getPassword().equals(player.getConfirmPassword())) {
            errors.rejectValue("confirmPassword", "Match", "Passwords must match");
        }

    }
}
