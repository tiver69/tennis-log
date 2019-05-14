package org.dss.tennislog.services.comparators;

import org.dss.tennislog.repositories.query.PlayerMatchStatistic;

import java.util.Comparator;

public class CommonResultComparator implements Comparator<PlayerMatchStatistic> {

    @Override
    public int compare(PlayerMatchStatistic o1, PlayerMatchStatistic o2) {
        return (int)(o2.getCount() - o1.getCount());
    }
}
