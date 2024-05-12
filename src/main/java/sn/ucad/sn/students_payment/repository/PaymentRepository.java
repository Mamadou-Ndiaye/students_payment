package sn.ucad.sn.students_payment.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import sn.ucad.sn.students_payment.entities.Payment;
import sn.ucad.sn.students_payment.entities.enums.PaymentStatus;

import java.util.List;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
  List<Payment> findByStudentCode(String code);

  List<Payment> findByStatus(PaymentStatus status);
}