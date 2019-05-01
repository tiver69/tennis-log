package org.dss.tennislog.domain;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "players")
@Data
public class Player {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "first_name")
    private String firstName;
    @Column(name = "last_name")
    private String lastName;
    @Column
    private Integer age;
    @Column
    private Integer experience;
    @Column(name = "leading_hand")
    private String leadingHand;
}
