import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProjectsService } from 'src/app/_services/projects.service';

export interface Cloc {
  language : string,	
  file : string,	
  blank : string,	
  comment : string,	
  code : string,	
}

@Component({
  selector: 'app-informe-cloc',
  templateUrl: './informe-cloc.component.html',
  styleUrls: ['./informe-cloc.component.scss']
})
export class InformeClocComponent implements OnInit {

  info: any = [];
  loading: boolean = true;
  resumen: any = {
    blank: 0,
    code: 0,
    comment: 0
  };
  @Input() id : number;      
  @Output() change : EventEmitter<Boolean> = new EventEmitter<Boolean>();
  displayedColumns: string[] = ["language", "file", "blank", "comment", "code"];

  dsCloc: MatTableDataSource<Cloc> = new MatTableDataSource<Cloc>();
  @ViewChild(MatSort) clocSort : MatSort = new MatSort();
  @ViewChild(MatPaginator) clocPag : MatPaginator;

  constructor(private proyectoService: ProjectsService) {
    this.loading = true;
    this.change.emit(this.loading);
  }

  ngOnInit() {
    setTimeout(() => { 
      this.loading = true;
      this.change.emit(this.loading);
      this.proyectoService.getKlocReport(this.id).subscribe((data:any) => {
        this.info = data.data;
        this.resumen = data.resumen;
        this.dsCloc.data = this.info;
        this.dsCloc.paginator = this.clocPag;  
        this.dsCloc.sort = this.clocSort; 
        this.loading = false;
        this.change.emit(this.loading);
      });
    });
    
  }

  ngAfterViewInit(): void {
  }

}
