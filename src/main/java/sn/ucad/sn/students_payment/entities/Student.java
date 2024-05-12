package sn.ucad.sn.students_payment.entities;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter @Setter @ToString
@Entity
public class Student {
    @Id
    private String id;
    private String firstName;
    private String lastName;
    private String email;
    private String photo;
    private String programId;
    @Column(unique=true)
    private String code;
}
