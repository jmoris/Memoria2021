import { Component, ElementRef, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { NavigationService } from '../../../../services/navigation.service';
import { SearchService } from '../../../../services/search.service';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { UsuariosService } from 'src/app/_services/usuarios.service';
import { EditUserComponent } from 'src/app/views/usuarios/edit-user/edit-user.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header-sidebar-large',
  templateUrl: './header-sidebar-large.component.html',
  styleUrls: ['./header-sidebar-large.component.scss']
})
export class HeaderSidebarLargeComponent implements OnInit {

    notifications: any[];
    user : any;
    loading: boolean = false;

    form : FormGroup = this.fb.group({
      name: [''],
      lastname: [''],
      email: [''],
      password: [''],
      rut: [''],
      enrollment: [''],
      gh_user: [''],
      gh_token: [''],
      role: [''],
    });
    loadedUser: any;
    dialogResult = "";

    constructor(
      private navService: NavigationService,
      private modalService: NgbModal,
      public searchService: SearchService,
      private auth: AuthenticationService,
      private userService: UsuariosService,
      private fb: FormBuilder,
      private dialog: MatDialog,
      private toastr: ToastrService
    ) {
      this.user = this.auth.currentUserValue.user;
      this.getUserData(this.user.id);
    }

    openPCAModal(modal){
      this.modalService.open(modal, { ariaLabelledBy: 'modal-basic-title', centered: true, size: 'lg' });
    }

    getUserData(userid) {
      this.loading = true;
      this.userService.getUserById(userid).subscribe({
        next: result => {
          this.loadedUser = result;
          this.form.get('name').setValue(result.name);
          this.form.get('lastname').setValue(result.lastname);
          this.form.get('email').setValue(result.email);
          this.form.get('password').setValue("");
          this.form.get('rut').setValue(result.rut);
          this.form.get('gh_user').setValue(result.gh_user);
          this.form.get('gh_token').setValue(result.gh_token);
          this.form.get('enrollment').setValue(result.enrollment);
          this.form.get('role').setValue(result.pivot.role_id.toString());
          this.loading = false;
          
        }, error: result => {
          console.log(result);
        }
      });
    }

    ngOnInit() {
    }

    toggelSidebar() {
      const state = this.navService.sidebarState;
      if (state.childnavOpen && state.sidenavOpen) {
        return state.childnavOpen = false;
      }
      if (!state.childnavOpen && state.sidenavOpen) {
        return state.sidenavOpen = false;
      }
      // item has child items
      /*if (!state.sidenavOpen && !state.childnavOpen
        && this.navService.selectedItem.type === 'dropDown') {
          state.sidenavOpen = true;
          setTimeout(() => {
              state.childnavOpen = true;
          }, 50);
      }*/
      // item has no child items
      if (!state.sidenavOpen && !state.childnavOpen) {
        state.sidenavOpen = true;
      }
    }

    signout() {
        localStorage.clear();
      this.auth.logout();
    }

    onCloseConfirm() {
      if (this.form.invalid) {
        (<any>Object).values(this.form.controls).forEach(control => {
          control.markAsTouched();
        });
        return;
      }
  
      let userData = this.form.value;
  
      this.userService.updateUser(this.user.id, userData).subscribe({
        next: result => {
          console.log(result);
          this.toastr.success('Usuario modificado correctamente, los cambios se veran reflejados en el siguiente inicio de sesión..', 'Notificación', { timeOut: 3000 });
        },
        error: result => {
          console.log(result);
        }
      });
  
    }
  
    public hasError = (controlName: string, errorName: string) => {
      return this.form.get(controlName).hasError(errorName);
    };

    salir(){
      this.auth.logout();
      location.href = "http://localhost:8000/home"
    }

}
