import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../../../../services/navigation.service';
import { SearchService } from '../../../../services/search.service';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { UsuariosService } from 'src/app/_services/usuarios.service';

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

    constructor(
      private navService: NavigationService,
      private modalService: NgbModal,
      public searchService: SearchService,
      private auth: AuthenticationService,
      private userService: UsuariosService,
      private fb: FormBuilder,
    ) {
      this.user = this.auth.currentUserValue.user;
      this.getUserData(this.user.id);

      this.notifications = [
        {
          icon: 'i-Speach-Bubble-6',
          title: 'New message',
          badge: '3',
          text: 'James: Hey! are you busy?',
          time: new Date(),
          status: 'primary',
          link: '/chat'
        },
        {
          icon: 'i-Receipt-3',
          title: 'New order received',
          badge: '$4036',
          text: '1 Headphone, 3 iPhone x',
          time: new Date('11/11/2018'),
          status: 'success',
          link: '/tables/full'
        },
        {
          icon: 'i-Empty-Box',
          title: 'Product out of stock',
          text: 'Headphone E67, R98, XL90, Q77',
          time: new Date('11/10/2018'),
          status: 'danger',
          link: '/tables/list'
        },
        {
          icon: 'i-Data-Power',
          title: 'Server up!',
          text: 'Server rebooted successfully',
          time: new Date('11/08/2018'),
          status: 'success',
          link: '/dashboard/v2'
        },
        {
          icon: 'i-Data-Block',
          title: 'Server down!',
          badge: 'Resolved',
          text: 'Region 1: Server crashed!',
          time: new Date('11/06/2018'),
          status: 'danger',
          link: '/dashboard/v3'
        }
      ];
    }

    openPCAModal(modal){
      this.modalService.open(modal, { ariaLabelledBy: 'modal-basic-title', centered: true, size: 'lg' });
    }

    getUserData(userid) {
      this.loading = true;
      this.userService.getUserById(userid).subscribe({
        next: result => {
          console.log(result);
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
          
        },
        error: result => {
          console.log(result);
        }
      });
  
    }
  
    public hasError = (controlName: string, errorName: string) => {
      return this.form.get(controlName).hasError(errorName);
    };

}
