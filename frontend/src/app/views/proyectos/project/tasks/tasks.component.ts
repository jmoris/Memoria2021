import { Component, OnInit, Inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'task-component',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})

export class TaskComponent  {

  tasks: any = [];

  constructor
  (
    private modalService: NgbModal
    
  ) 
  {
    

  }


  addTask(modal, event)
  {
    event.target.parentElement.parentElement.blur();
    this.modalService.open(modal, { ariaLabelledBy: 'modal-basic-title', centered: true, size: 'lg' });
    
  }
  onCloseConfirm() {
    
  }



}
