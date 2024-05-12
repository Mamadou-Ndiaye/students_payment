package sn.ucad.sn.students_payment.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import sn.ucad.sn.students_payment.dtos.NewPaymentDTO;
import sn.ucad.sn.students_payment.entities.Payment;
import sn.ucad.sn.students_payment.entities.Student;
import sn.ucad.sn.students_payment.entities.enums.PaymentStatus;
import sn.ucad.sn.students_payment.repository.PaymentRepository;
import sn.ucad.sn.students_payment.repository.StudentRepository;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.net.URI;


import java.util.UUID;



@Service
public class PaymentService {
    private  final PaymentRepository paymentRepository;
    private  final StudentRepository studentRepository;

    public PaymentService(PaymentRepository paymentRepository, StudentRepository studentRepository) {
        this.paymentRepository = paymentRepository;
        this.studentRepository = studentRepository;
    }

    public Payment updatePaymentStatus(PaymentStatus status, Long paymentId) {
        Payment payment =  paymentRepository.findById(paymentId).get();
        payment.setStatus(status);
        return paymentRepository.save(payment);
    }

    public Payment savePayment(MultipartFile file, NewPaymentDTO newPaymentDTO) throws IOException {
        Student student = studentRepository.findByCode(newPaymentDTO.studentCode());
        Path folderPath = Paths.get(System.getProperty("user.home"),"students","payments");
        if(!Files.exists(folderPath)){
            Files.createDirectories(folderPath);
        }
        String fileName = UUID.randomUUID().toString();
        Path filePath = Paths.get(System.getProperty("user.home"),"students","payments",fileName+".pdf");
        Files.copy(file.getInputStream(), filePath);
        return paymentRepository.save(Payment.builder().amount(newPaymentDTO.amount()).type(newPaymentDTO.type()).file(filePath.toUri().toString()).status(PaymentStatus.CREATED).student(student).date(newPaymentDTO.date()).build());
    }

    public byte[] getPaymentFile(Long id) throws IOException {
            Payment payment = paymentRepository.findById(id).get();
            return Files.readAllBytes(Path.of(URI.create(payment.getFile())));

    }

}
