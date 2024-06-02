import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {PaymentType} from "../models/payments";
import {StudentsService} from "../services/students.service";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Component({
  selector: 'app-new-payment',
  templateUrl: './new-payment.component.html',
  styleUrls: ['./new-payment.component.css']
})
export class NewPaymentComponent implements OnInit{
    paymentFormGroup! : FormGroup;
    studentCode!: string;
    paymentType: string[]=[];


    fb=inject(FormBuilder);
    studentService=inject(StudentsService);
    activatedRoute= inject(ActivatedRoute);
   pdfFileUrl!: string;
   showProgress: boolean= false;

    ngOnInit(): void {

      for(let elt in PaymentType){
          let value = PaymentType[elt] ;
          if(typeof value === 'string'){
                 this.paymentType.push(value);
          }
      }
      this.studentCode=this.activatedRoute.snapshot.params['code'];
      this.paymentFormGroup= this.fb.group({
         date: this.fb.control(''),
         amount: this.fb.control(''),
         type: this.fb.control(''),
         studentCode: this.fb.control(this.studentCode),
         fileSource: this.fb.control(''),
         fileName: this.fb.control(''),
       })
    }

  selectFile(event: any) {
     if(event.target.files.length>0) {
        let file = event .target.files[0];
        this.paymentFormGroup.patchValue({
          fileSource: file,
          fileName: file.name
        }) ;
        this.pdfFileUrl =window.URL.createObjectURL(file);

     }
  }

  savePayment() {
     let date : Date = new Date(this.paymentFormGroup.value.date);
     let formattedDate: string = date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear();
     this.showProgress = true;
     const formData : FormData = new FormData();
     formData.append('file',this.paymentFormGroup.get('fileSource')!.value);
     formData.append('amount',this.paymentFormGroup.value.amount);
     formData.append('type',this.paymentFormGroup.value.type);
     formData.append('date', formattedDate);
     formData.append('studentCode',this.paymentFormGroup.value.studentCode);

     this.studentService.savePayment(formData).subscribe({
       next: value => {
         alert(" Payment saved Successfully");
       } ,
       error: err => {
         console.log(err);
       }
     })

  }
}
