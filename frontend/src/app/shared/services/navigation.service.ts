import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { Router } from '@angular/router';

export interface IMenuItem {
    id?: string;
    title?: string;
    description?: string;
    type: string;       // Possible values: link/dropDown/extLink
    name?: string;      // Used as display text for item and title for separator type
    state?: string;     // Router state
    icon?: string;      // Material icon name
    tooltip?: string;   // Tooltip text
    disabled?: boolean; // If true, item will not be appeared in sidenav.
    sub?: IChildItem[]; // Dropdown items
    badges?: IBadge[];
    active?: boolean;
}
export interface IChildItem {
    id?: string;
    parentId?: string;
    type?: string;
    name: string;       // Display text
    state?: string;     // Router state
    icon?: string;
    sub?: IChildItem[];
    active?: boolean;
}

interface IBadge {
    color: string;      // primary/accent/warn/hex color codes(#fff000)
    value: string;      // Display text
}

interface ISidebarState {
    sidenavOpen?: boolean;
    childnavOpen?: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class NavigationService {
    user : any;
    public sidebarState: ISidebarState = {
        sidenavOpen: true,
        childnavOpen: false
    };
    selectedItem: IMenuItem;

    constructor(
        private router: Router,
        private auth: AuthenticationService
    ) {
        this.user = auth.currentUserValue;
        console.log('algo');
        console.log(this.user);
        if(this.user.role == 'Superadministrador'){
            this.defaultMenu.push({
                name: 'Home',
                description: 'Página principal o dashboard',
                type: 'link',
                icon: 'i-Home1',
                state: '/dashboard/admin'
            },{
                name: 'Instituciones',
                description: 'Gestión de las instituciones',
                type: 'link',
                icon: 'i-Building',
                state: '/instituciones/gestion'
            },{
                name: 'Usuarios',
                description: 'Gestión de los usuarios',
                type: 'link',
                icon: 'i-Administrator',
                state: '/usuarios/gestion'
            },
            {
                name: 'Cursos',
                description: 'Gestión de los cursos',
                type: 'link',
                icon: 'i-Library',
                state: '/cursos/gestion'
            },
            {
                name: 'Proyectos',
                description: 'Gestión de los proyectos',
                type: 'link',
                icon: 'i-File-Clipboard-File--Text',
                state: '/proyectos/gestion'
            });
        }else if(this.user.role == 'Administrador'){
            this.defaultMenu.push({
                name: 'Home',
                description: 'Página principal o dashboard',
                type: 'link',
                icon: 'i-Home1',
                state: '/dashboard/v1'
            },{
                name: 'Usuarios',
                description: 'Gestión de los usuarios',
                type: 'link',
                icon: 'i-Administrator',
                state: '/usuarios/gestion'
            },
            {
                name: 'Cursos',
                description: 'Gestión de los cursos',
                type: 'link',
                icon: 'i-Library',
                state: '/cursos/gestion'
            },
            {
                name: 'Proyectos',
                description: 'Gestión de los proyectos',
                type: 'link',
                icon: 'i-File-Clipboard-File--Text',
                state: '/proyectos/gestion'
            });
        }else if(this.user.role == 'Alumno'){
            this.defaultMenu.push({
                name: 'Home',
                description: 'Página principal o dashboard',
                type: 'link',
                icon: 'i-Home1',
                state: '/dashboard/v2'
            });
            /*if(this.user.assistants.length > 0){
                this.defaultMenu.push({
                    name: 'Cursos',
                    description: 'Gestión de los cursos',
                    type: 'link',
                    icon: 'i-Library',
                    state: '/cursos/gestion'
                });
            }*/
            this.defaultMenu.push({
                name: 'Proyectos',
                description: 'Gestión de los proyectos',
                type: 'link',
                icon: 'i-File-Clipboard-File--Text',
                state: '/proyectos/gestion'
            });
        }else if(this.user.role == 'Profesor'){
            this.defaultMenu.push({
                name: 'Home',
                description: 'Página principal o dashboard',
                type: 'link',
                icon: 'i-Home1',
                state: '/dashboard/v4'
            },
            {
                name: 'Cursos',
                description: 'Gestión de los cursos',
                type: 'link',
                icon: 'i-Library',
                state: '/cursos/gestion'
            },
            {
                name: 'Proyectos',
                description: 'Gestión de los proyectos',
                type: 'link',
                icon: 'i-File-Clipboard-File--Text',
                state: '/proyectos/gestion'
            });
        }
    }

    public defaultMenu: IMenuItem[] = [];


    // sets iconMenu as default;
    menuItems = new BehaviorSubject<IMenuItem[]>(this.defaultMenu);
    // navigation component has subscribed to this Observable
    menuItems$ = this.menuItems.asObservable();

    // You can customize this method to supply different menu for
    // different user type.
    // publishNavigationChange(menuType: string) {
    //   switch (userType) {
    //     case 'admin':
    //       this.menuItems.next(this.adminMenu);
    //       break;
    //     case 'user':
    //       this.menuItems.next(this.userMenu);
    //       break;
    //     default:
    //       this.menuItems.next(this.defaultMenu);
    //   }
    // }
}
