package sn.ucad.sn.students_payment.entities;


import jakarta.persistence.*;
import lombok.*;
import sn.ucad.sn.students_payment.entities.enums.PaymentStatus;
import sn.ucad.sn.students_payment.entities.enums.PaymentType;

import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
@Entity
public class Payment {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private LocalDate date;
    private double amount;
    private PaymentStatus status;
    private PaymentType type;
    private String file;
    @ManyToOne
    private Student student;

}
