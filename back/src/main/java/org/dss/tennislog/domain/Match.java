package org.dss.tennislog.domain;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name="matches")
@Data
public class Match {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private Date date;

    @ManyToOne
    @JoinColumn(name = "player_one", referencedColumnName = "id", nullable = false)
    private Player playerOne = new Player();

    @ManyToOne
    @JoinColumn(name = "player_two", referencedColumnName = "id", nullable = false)
    private Player playerTwo = new Player();

    @Column
    private String score;
    @Column
    private boolean winner;

    @ManyToOne
    @JoinColumn(name = "tournament_id", referencedColumnName = "id", nullable = false)
    private Tournament tournament = new Tournament();


//    @PrePersist
//    protected void onCreate(){
//        this.startDate = new Date();
//    }
}
