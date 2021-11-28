import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CursosService } from 'src/app/_services/cursos.service';
import { UsuariosService } from 'src/app/_services/usuarios.service';

@Component({
  selector: 'app-edit-institucion',
  templateUrl: './edit-institucion.component.html',
  styleUrls: ['./edit-institucion.component.scss']
})
export class EditInstitucionComponent implements OnInit {

  title: String;
  hide = true;
  loading: boolean;
  currentYear: number = new Date().getFullYear();
  semesters: string[] = ['Otoño', 'Primavera'];
  teachers: any = [];
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditInstitucionComponent>,
    private courseService: CursosService,
    private userService: UsuariosService,
    @Inject(MAT_DIALOG_DATA) private data) {
    this.title = "Editar curso";
    this.form = new FormGroup({
      nombre: new FormControl("", [Validators.required]),
      teacher_id: new FormControl("", [Validators.required]),
      ano: new FormControl('', [Validators.required]),
      semestre: new FormControl("", [Validators.required]),
    });
    this.getTeachersData();
    this.getCourseData();
  }

  

  ngOnInit(): void {
  }

  getCourseData() {
    this.loading = true;
    console.log("Estos datos: ", this.data);
    this.courseService.get(this.data).subscribe({
      next: result => {
        result = result[0];
        console.log("Resultado servicio: ", result);
        this.form.get('nombre').setValue(result.nombre);
        console.log('profesor: ' + result.profesor);
        this.form.get('teacher_id').setValue(result.profesor.id);
        this.form.get('ano').setValue(result.ano);
        this.form.get('semestre').setValue(result.semestre);
        this.loading = false;
      }, error: result => {
        console.log(result);
      }
    });
  }

  getTeachersData() {
    this.userService.getTeachers().subscribe((data) => {
      this.teachers = data;
    });

  }

  onCloseCancel(): void {
    this.dialogRef.close('Cancel');

  }

  onCloseConfirm(): void {
    if (this.form.invalid) {
      (<any>Object).values(this.form.controls).forEach(control => {
        control.markAsTouched();
      });
      return;
    }

    let courseData = this.form.value;
    courseData.semester = this.formatSemesterNumber(courseData.semester);
    console.log("CourseData: ", courseData.teacher_id);
    this.courseService.updateCourse(this.data, courseData).subscribe({
      next: result => {
        console.log(result);
        this.dialogRef.close('Confirm');

      },
      error: result => {
        console.log(result);
      }
    });
  }

  formatSemester(value) {
    switch (value) {
      case '1':
        return 'Otoño';
      case '2':
        return 'Primavera';
    }
  }

  formatSemesterNumber(value) {
    switch (value) {
      case 'Otoño':
        return 2;
      case 'Primavera':
        return 1;
    }
  }
  
  public hasError = (controlName: string, errorName: string) => {
    return this.form.get(controlName).hasError(errorName);
  };

}
