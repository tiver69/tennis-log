package org.dss.tennislog.validator;

import org.dss.tennislog.domain.Player;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

import java.text.SimpleDateFormat;
import java.util.Date;

@Component
public class PlayerValidator implements Validator {
    @Override
    public boolean supports(Class<?> aClass) {
        return Player.class.equals(aClass);
    }

    @Override
    public void validate(Object object, Errors errors) {
        Player player = (Player) object;
        if (player.getPassword() == null) {
            errors.rejectValue("password", "Empty", "This is required field");
            return;
        }
        if (player.getPassword().length() < 6) {
            errors.rejectValue("password", "Length", "Password must at least 6 characters");
        }
        if (!player.getPassword().equals(player.getConfirmPassword())) {
            errors.rejectValue("confirmPassword", "Match", "Passwords must match");
        }
        this.validateDates(player, errors);
    }

    public void validateDates(Object object, Errors errors) {
        Player player = (Player) object;
        if (player.getBirthday() != null && player.getExperience() != null) {
            SimpleDateFormat dateFormat = new SimpleDateFormat("YYYY");
            if (Integer.parseInt(dateFormat.format(player.getBirthday())) > player.getExperience()) {
                errors.rejectValue("birthday", "Big", "You can't start playing before birthday");
                errors.rejectValue("experience", "Big", "You can't start playing before birthday");
            }
            if (dateFormat.format(new Date()).compareTo(dateFormat.format(player.getBirthday())) < 0)
                errors.rejectValue("birthday", "Big", "Specify birthday from the past");
            if (Integer.parseInt(dateFormat.format(new Date())) - player.getExperience() < 0)
                errors.rejectValue("experience", "Big", "Specify year from the past");
        }
    }
}