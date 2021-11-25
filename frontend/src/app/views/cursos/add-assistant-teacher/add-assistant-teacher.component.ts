import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsuariosService } from 'src/app/_services/usuarios.service';
import { CursosService } from 'src/app/_services/cursos.service';

@Component({
  selector: 'app-add-assistant-teacher',
  templateUrl: './add-assistant-teacher.component.html',
  styleUrls: ['./add-assistant-teacher.component.scss']
})
export class AddAssistantTeacherComponent implements OnInit {

  teachers: any = [];
  courses: any = [];
  form: FormGroup;
  title: String;

  constructor(
    public dialogRef: MatDialogRef<AddAssistantTeacherComponent>,
    @Inject(MAT_DIALOG_DATA) public data: String,
    private userService: UsuariosService,
    private cursosService: CursosService) {
    this.title = "Agregar profesor huésped"
    this.form = new FormGroup({
      iduser: new FormControl("", [Validators.required]),
      idcourse: new FormControl("", [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.loadCourse();
    this.loadTeacher();
  }

  loadCourse() {
    this.cursosService.getAll().subscribe((data) => {
      console.log(data);
      this.courses = data;
    });

  }

  loadTeacher() {
    this.userService.getTeachers().subscribe((data) => {
        data.forEach(element => {
            if(element.active){
                this.teachers.push(element);
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
    this.cursosService.agregarProfeAcurso(data).subscribe({
      next: result => {
        console.log(result);
        this.dialogRef.close('Confirm');
      },
      error: result => {
        console.log('Error: ' + result);
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
