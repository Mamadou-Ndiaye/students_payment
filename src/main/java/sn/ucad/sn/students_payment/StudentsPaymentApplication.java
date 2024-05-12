package sn.ucad.sn.students_payment;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.GetMapping;
import sn.ucad.sn.students_payment.entities.Payment;
import sn.ucad.sn.students_payment.entities.Student;
import sn.ucad.sn.students_payment.entities.enums.PaymentStatus;
import sn.ucad.sn.students_payment.entities.enums.PaymentType;
import sn.ucad.sn.students_payment.repository.PaymentRepository;
import sn.ucad.sn.students_payment.repository.StudentRepository;

import java.time.LocalDate;
import java.util.Date;
import java.util.Random;
import java.util.UUID;

@SpringBootApplication
public class StudentsPaymentApplication {

    public static void main(String[] args) {
        SpringApplication.run(StudentsPaymentApplication.class, args);
    }

    @Bean
    CommandLineRunner init(StudentRepository studentRepository, PaymentRepository paymentRepository) {
        return args -> {
            studentRepository.save(Student.builder().id(UUID.randomUUID().toString()).firstName("Mamadou").lastName("NDIAYE").email("ndiamamadou").code("12333").programId("SIR").build());
            studentRepository.save(Student.builder().id(UUID.randomUUID().toString()).firstName("Modou").lastName("Fall").email("modou.fall").code("12344").programId("SIR").build());
            studentRepository.save(Student.builder().id(UUID.randomUUID().toString()).firstName("Fatima").lastName("Cisse").email("fatima.cisse").code("12355").programId("BI").build());
            studentRepository.save(Student.builder().id(UUID.randomUUID().toString()).firstName("Awa").lastName("DIOUF").email("awa.diouf").code("12366").programId("SIR").build());
            studentRepository.save(Student.builder().id(UUID.randomUUID().toString()).firstName("Virgiie").lastName("lamesse").email("virginie.lamesse").code("12377").programId("BI").build());

            PaymentType[] paymentTypes = PaymentType.values();
            Random random=new Random();
           studentRepository.findAll().forEach(student -> {
               for (int i=0; i<=10; i++) {
                   int index = random.nextInt(paymentTypes.length);
                  paymentRepository.save(Payment.builder().date(LocalDate.now()).student(student).status(PaymentStatus.CREATED).type(paymentTypes[index]).amount(1000 + (int)(Math.random()*2000)).build())  ;
               }
           });

        };
    }

}
