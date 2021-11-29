
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ConfirmationDialogComponent } from '../../core/confirmation-dialog/confirmation-dialog.component';
import { Router } from '@angular/router';
import { AddInstitucionComponent } from '../add-institucion/add-institucion.component';
import { EditInstitucionComponent } from '../edit-institucion/edit-institucion.component';
import { InstitucionService } from 'src/app/_services/institucion.service';
import { Institucion } from 'src/app/model-classes/institucion';


@Component({
  selector: 'app-gestion',
  templateUrl: './gestion.component.html',
  styleUrls: ['./gestion.component.scss']
})
export class GestionComponent implements OnInit {
  inst: any;
  checked = true;
  loading = false;
  dialogResult = "";
  instituciones : any = [];
  displayedColumns: string[] = ["nombre", "razon_social", "edit", "delete"];
  dataSource: MatTableDataSource<Institucion> = new MatTableDataSource<Institucion>();

  addCourseForm = this.fb.group({
    nombre: ['', Validators.required],
    razon_social: ['', Validators.required],
  });

  constructor(
    private router: Router,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private institucionService: InstitucionService,
    private fb: FormBuilder,
  ) { }

  getCourses() {
    this.loading = true;
    this.institucionService.getAll().subscribe(
      (data:any) => {
        if (!data) {
          return;
        }
        console.log("datos", data);
        this.instituciones = data;
        this.dataSource.data = this.instituciones;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.loading = false;
      });

  }

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  sortingCustomAccesor = (item, property) => {
    switch (property) {
      case 'nombre': return item.nombre;
      case 'razon_social': return item.razon_social;
      default: return item[property];
    }
  };

  ngOnInit() {
    this.dataSource.sortingDataAccessor = this.sortingCustomAccesor;
    this.getCourses();
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  deleteCourse(id: string) {
    this.openDeletionConfirmationDialog().afterClosed().subscribe(confirmation => {
      console.log(confirmation);
      if (confirmation.confirmed) {
        this.institucionService.delete(id).subscribe({
          next: result => {
            console.log(result);
            this.getCourses();
            this.toastr.success('Institucion eliminada correctamente', 'Notificación', { timeOut: 3000 });
          },
          error: result => {
            console.log(result);
          }
        });
      }
    });
  }

  openDeletionConfirmationDialog() {
    var deletionDialogConfig = this.getDialogConfig();
    deletionDialogConfig.data = { message: '¿Desea eliminar esta institución?' };
    return this.dialog.open(ConfirmationDialogComponent, deletionDialogConfig);
  }

  getDialogConfig() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    return dialogConfig;
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  loadData() {
    this.loading = true;
    this.institucionService.getAll().subscribe(
      (resp: any) => {
        this.inst = resp;
        this.loading = false;
        console.log(this.inst);
      }
    );
  }

  addCourse(modal, event) {
    event.target.parentElement.parentElement.blur();
    this.modalService.open(modal, { ariaLabelledBy: 'modal-basic-title', centered: true })
      .result.then((result) => {
        this.checked = true;
        var frm = this.addCourseForm.value;
        this.institucionService.insert(frm).subscribe((resp: any) => {
          if (resp.errors) {
            this.toastr.error('No se puede insertar la institución en la base de datos.', 'Notificación de error', { timeOut: 3000 });
            return;
          }
          this.toastr.success('Institución insertada correctamente', 'Notificación de inserción', { timeOut: 3000 });
          this.cleanForm();
          this.loadData();
        }, (error: any) => {
          console.log(error);
        });
      }, (reason) => {
      });
  }

  cleanForm() {
    this.addCourseForm = this.fb.group({
      nombre: ['', Validators.required],
      razon_social: ['', Validators.required],
    });
  }

  openAddDialog(): void {
    let dialogRef = this.dialog.open(AddInstitucionComponent, {
      width: '850px',
      data: 'This text is passed into the dialog',
      disableClose: true,
      autoFocus: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog closed: ${result}`);
      this.dialogResult = result;
      if (result == 'Confirm') {
        this.toastr.success('Institución agregada exitosamente', 'Notificación', { timeOut: 3000 });
        this.getCourses();
      }
    })
  }

  editCourse(id: String) {
    const dialogRef = this.dialog.open(EditInstitucionComponent, {
      data: id,
      width: '850px',
      disableClose: true,
      autoFocus: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result == 'Confirm') {
        this.getCourses();
        this.toastr.success('Institución editada exitosamente', 'Notificación', { timeOut: 3000 });
      }
    });
  }

  deleteData(id, modal, event) {
    event.target.parentElement.parentElement.blur();
    this.modalService.open(modal, { ariaLabelledBy: 'modal-basic-title', centered: true })
      .result.then((result) => {
        this.institucionService.delete(id)
          .subscribe(res => {
            this.toastr.success('Institución eliminada correctamente', 'Notificación de eliminación', { timeOut: 3000 });
            this.loadData();
          })
      }, (reason) => {
      });
  }
}
