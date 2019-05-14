package org.dss.tennislog.repositories.query;

import lombok.Data;
import org.dss.tennislog.domain.Player;

@Data
public class PlayerMatchStatistic {
    private Player player;
    private Long count;

    public PlayerMatchStatistic(Player player, Long count) {
        this.player = player;
        this.count = count;
    }

    public String getPlayerTwoString() {
        return player.getLastName() + " " + player.getFirstName();
    }
}
