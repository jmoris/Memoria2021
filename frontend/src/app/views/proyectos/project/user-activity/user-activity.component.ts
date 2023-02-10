import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-user-activty',
  templateUrl: './user-activity.component.html',
  styleUrls: ['./user-activity.component.scss']
})
export class UserActivityComponent implements OnInit {

  dateRangeForm: FormGroup;
  range = new FormGroup({
    fromDate: new FormControl('', Validators.required),
    toDate: new FormControl('', Validators.required)
  });
  idProyecto: any;

  constructor(
    public dialogRef: MatDialogRef<UserActivityComponent>,
    @Inject(MAT_DIALOG_DATA) public id: String,
    private formBuilder: FormBuilder
  ) {
    this.idProyecto = id;
  }

  ngOnInit(): void {
    this.dateRangeForm = this.formBuilder.group({
      fromDate: new FormControl('', Validators.required),
      toDate: new FormControl('', Validators.required)
    });
  }

  onFormSubmit() {
    console.log('Is Form Invalid', this.dateRangeForm.invalid);
  }

}
