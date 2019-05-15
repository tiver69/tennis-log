package org.dss.tennislog.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.Date;

@Entity
@Table(name = "tournaments")
@Data
public class Tournament {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column
    @NotBlank(message = "Tournament name must be specified!")
    private String name;
    @Column
    private String information;
    @Column(name = "start_date")
    @JsonFormat(pattern = "yyyy-mm-dd")
    private Date startDate;
    @Column(name = "end_date")
    @JsonFormat(pattern = "yyyy-mm-dd")
    private Date endDate;
}
