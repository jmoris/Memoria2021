import { Component, OnInit, Inject, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProjectsService } from 'src/app/_services/projects.service';
import * as moment from 'moment/moment';
import { isThisISOWeek } from 'date-fns';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.scss']
})
export class IssuesComponent implements OnInit {

  idProyecto: any;
  issues: any = [];
  displayedColumns2: string[] = ["title", "login", "created_at", "comments", 'assignees'];
  dataSource2: MatTableDataSource<any> = new MatTableDataSource<any>();
  @ViewChild(MatSort) sort2: MatSort;
  @ViewChild(MatPaginator) paginator2: MatPaginator;
  form2: FormGroup;
  loading: boolean = false;
  
  constructor(
    public dialogRef: MatDialogRef<IssuesComponent>,
    @Inject(MAT_DIALOG_DATA) public id: String,
    private proyectoService: ProjectsService,
    private formBuilder: FormBuilder,
    private changeDetection: ChangeDetectorRef,
  ) {
    this.idProyecto = id;
    this.loading = true;
    this.form2 = new FormGroup({
      status: new FormControl(0, [Validators.required]),
    });
    
    this.proyectoService.getIssues(this.idProyecto).subscribe(data => {
      console.log(data[0].assignees.map(x=>x.login).join(","));
      this.issues = data;
      this.dataSource2.data = this.issues;
      this.dataSource2.sort = this.sort2;
      this.dataSource2.paginator = this.paginator2;
      this.loading = false;
    });
  }

  getAsignados(data){
    return data.map(x=>x.login).join(",");
  }

  ngOnInit(): void {
  
  }

  onIssuesStatusChange(e){
    this.loading = true;
    this.proyectoService.getIssues(this.id, e.value).subscribe((data) => {
        
        this.issues = data;
        this.dataSource2.data = this.issues;
        this.dataSource2.sort = this.sort2;
        this.dataSource2.paginator = this.paginator2;
        this.loading = false;
        this.changeDetection.detectChanges();
    });
}

  formatDate(date) {
    return moment(date).format('DD-MM-YYYY');
  }

}
