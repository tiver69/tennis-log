package org.dss.tennislog.repositories.query;

import lombok.Data;
import org.dss.tennislog.domain.Player;

@Data
public class PlayerMatchStatistic {
    private Player playerTwo;
    private Long count;

    public PlayerMatchStatistic(Player playerTwo, Long count) {
        this.playerTwo = playerTwo;
        this.count = count;
    }

    public String getPlayerTwo() {
        return playerTwo.getLastName() + " " + playerTwo.getFirstName();
    }
}
