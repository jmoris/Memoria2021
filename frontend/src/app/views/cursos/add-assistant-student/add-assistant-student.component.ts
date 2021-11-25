import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsuariosService } from 'src/app/_services/usuarios.service';
import { CursosService } from 'src/app/_services/cursos.service';

@Component({
  selector: 'app-add-assistant-student',
  templateUrl: './add-assistant-student.component.html',
  styleUrls: ['./add-assistant-student.component.scss']
})
export class AddAssistantStudentComponent implements OnInit {

  students: any = [];
  courses: any = [];
  form: FormGroup;
  title: String;


  constructor(
    public dialogRef: MatDialogRef<AddAssistantStudentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: String,
    private userService: UsuariosService,
    private cursosService: CursosService
  ) {
    this.title = "Agregar ayudante"
    this.form = new FormGroup({
      iduser: new FormControl("", [Validators.required]),
      idcourse: new FormControl("", [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.loadCourse();
    this.loadStudents();
  }

  loadCourse() {
    this.cursosService.getAll().subscribe((data) => {
      console.log(data);
      this.courses = data;
    });
  }

  loadStudents() {
    this.userService.getStudents().subscribe((data) => {
      console.log(data);
        data.forEach(element => {
            if(element.active){
                this.students.push(element);
            }
        });
    });

  }

  onCloseConfirm() {
    if (this.form.invalid) {
      (<any>Object).values(this.form.controls).forEach(control => {
        control.markAsTouched();
      });
      return;
    }

    let data = this.form.value;
    console.log("Datos:", data);

    this.cursosService.agregarAyudanteAcurso(data).subscribe({
      next: result => {
        console.log(result);
        this.dialogRef.close('Confirm');
      },
      error: result => {
        console.log('Error: ', result);
      }
    });
  }

  onCloseCancel() {
    this.dialogRef.close("Cancel");
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.form.get(controlName).hasError(errorName);
  };

}
