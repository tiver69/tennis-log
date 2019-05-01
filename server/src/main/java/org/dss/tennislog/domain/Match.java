package org.dss.tennislog.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
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
    @NotBlank(message = "Player one must be specified")
    private Player playerOne = new Player();

    @ManyToOne
    @JoinColumn(name = "player_two", referencedColumnName = "id", nullable = false)
    @NotBlank(message = "Player two must be specified")
    private Player playerTwo = new Player();

    @Column
    private String score;
    @Column
    private Boolean winner;

    @ManyToOne
    @JoinColumn(name = "tournament_id", referencedColumnName = "id", nullable = false)
    @NotBlank(message = "Tournament must be specified")
    private Tournament tournament = new Tournament();


//    @PrePersist
//    protected void onCreate(){
//        this.startDate = new Date();
//    }
}
