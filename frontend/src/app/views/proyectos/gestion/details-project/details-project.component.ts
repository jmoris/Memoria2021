import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Project } from 'src/app/model-classes/project';

@Component({
  selector: 'app-details-project',
  templateUrl: './details-project.component.html',
  styleUrls: ['./details-project.component.scss']
})
export class DetailsProjectComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DetailsProjectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any ) {

     }

  ngOnInit(): void {
  }

  onCloseCancel() {
    this.dialogRef.close('Cancel');
  }
}
