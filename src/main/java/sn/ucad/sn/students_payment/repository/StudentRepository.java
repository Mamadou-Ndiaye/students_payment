package sn.ucad.sn.students_payment.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import sn.ucad.sn.students_payment.entities.Student;

import java.util.List;

public interface StudentRepository extends JpaRepository<Student, String> {
    Student findByCode(String code);

    List<Student> findByProgramId(String programId);
}