package sn.ucad.sn.students_payment.dtos;

import sn.ucad.sn.students_payment.entities.enums.PaymentType;

import java.time.LocalDate;

public record NewPaymentDTO(double amount, PaymentType type, LocalDate date, String studentCode) {
}