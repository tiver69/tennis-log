package org.dss.tennislog.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

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
    @JsonFormat(pattern = "yyyy-mm-dd")
    private Date date;

    @ManyToOne
    @JoinColumn(name = "player_one", referencedColumnName = "id", nullable = false)
    private Player playerOne;

    @ManyToOne
    @JoinColumn(name = "player_two", referencedColumnName = "id", nullable = false)
    private Player playerTwo;

    @Column(name = "status")
    private Boolean playedStatus;
    @Column
    private String score;
    @Column
    private Boolean winner;

    @ManyToOne
    @JoinColumn(name = "tournament_id", referencedColumnName = "id", nullable = false, updatable = false)
    @JsonIgnore
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Tournament tournament;


//    @PrePersist
//    protected void onCreate(){
//        this.startDate = new Date();
//    }
}
