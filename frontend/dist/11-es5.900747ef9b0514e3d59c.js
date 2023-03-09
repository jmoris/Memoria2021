function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,_toPropertyKey(i.key),i)}}function _createClass(e,t,n){return t&&_defineProperties(e.prototype,t),n&&_defineProperties(e,n),Object.defineProperty(e,"prototype",{writable:!1}),e}function _toPropertyKey(e){var t=_toPrimitive(e,"string");return"symbol"==typeof t?t:String(t)}function _toPrimitive(e,t){if("object"!=typeof e||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var i=n.call(e,t||"default");if("object"!=typeof i)return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{urn1:function(e,t,n){"use strict";n.r(t);var i=n("ofXK"),c=n("uxn7"),o=n("3Pt+"),r=n("1kSV"),a=n("Kb4U"),s=n("DKVz"),l=n("jgPy"),u=n("lDzL"),d=n("tyNb"),f=n("0IaG"),m=n("+0xr"),b=n("Dh3D"),g=n("M9IT"),p=n("SrYB"),h=n("3Lqu"),v=n("fXoL"),C=n("kmnG"),y=n("qFsG"),k=n("bTqV");function _(e,t){1&e&&(v.fc(0,"mat-error"),v.Zc(1,"Debe ingresar el nombre"),v.ec())}function w(e,t){1&e&&(v.fc(0,"mat-error"),v.Zc(1,"Debe ingresar la raz\xf3n social"),v.ec())}var Z,x=((Z=function(){function e(t,n,i){var c=this;_classCallCheck(this,e),this.dialogRef=t,this.data=n,this.institucionService=i,this.hide=!0,this.cargando=!1,this.hasError=function(e,t){return c.form.get(e).hasError(t)},this.form=new o.j({nombre:new o.g("",[o.z.required]),razon_social:new o.g("",[o.z.required])})}return _createClass(e,[{key:"ngOnInit",value:function(){this.loadData()}},{key:"loadData",value:function(){var e=this;this.institucionService.getAll().subscribe((function(t){e.usuarios=t}))}},{key:"onCloseConfirm",value:function(){var e=this;this.form.invalid?Object.values(this.form.controls).forEach((function(e){e.markAsTouched()})):this.institucionService.insert(this.form.value).subscribe({next:function(t){console.log(t),e.dialogRef.close("Confirm")},error:function(e){console.log("Error: "+e)}})}},{key:"onCloseCancel",value:function(){this.dialogRef.close("Cancel")}}]),e}()).\u0275fac=function(e){return new(e||Z)(v.Zb(f.h),v.Zb(f.a),v.Zb(h.a))},Z.\u0275cmp=v.Tb({type:Z,selectors:[["app-add-institucion"]],decls:24,vars:4,consts:[["mat-dialog-title",""],[3,"formGroup"],[1,"form-div"],["appearance","standard",1,"input"],["matInput","","placeholder","","formControlName","nombre","maxlength","30"],[4,"ngIf"],["matInput","","placeholder","","formControlName","razon_social","maxlength","30"],[1,"modal-footer"],["mat-raised-button","",1,"btn","btn-primary","btn-rounded",3,"disabled","click"],["mat-raised-button","",1,"btn","btn-danger","btn-rounded",3,"click"]],template:function(e,t){1&e&&(v.fc(0,"div"),v.fc(1,"h2",0),v.Zc(2,"Agregar instituci\xf3n"),v.ec(),v.ac(3,"hr"),v.fc(4,"mat-dialog-content"),v.fc(5,"form",1),v.fc(6,"div",2),v.fc(7,"mat-form-field",3),v.fc(8,"mat-label"),v.Zc(9,"Nombre"),v.ec(),v.ac(10,"input",4),v.ac(11,"mat-hint"),v.Xc(12,_,2,0,"mat-error",5),v.ec(),v.fc(13,"mat-form-field",3),v.fc(14,"mat-label"),v.Zc(15,"Raz\xf3n social"),v.ec(),v.ac(16,"input",6),v.ac(17,"mat-hint"),v.Xc(18,w,2,0,"mat-error",5),v.ec(),v.ec(),v.ec(),v.ec(),v.fc(19,"mat-dialog-actions",7),v.fc(20,"button",8),v.rc("click",(function(){return t.onCloseConfirm()})),v.Zc(21,"Agregar"),v.ec(),v.fc(22,"button",9),v.rc("click",(function(){return t.onCloseCancel()})),v.Zc(23,"Cancelar"),v.ec(),v.ec(),v.ec()),2&e&&(v.Lb(5),v.Bc("formGroup",t.form),v.Lb(7),v.Bc("ngIf",t.hasError("nombre","required")),v.Lb(6),v.Bc("ngIf",t.hasError("razon_social","required")),v.Lb(2),v.Bc("disabled",t.form.invalid))},directives:[f.i,f.f,o.B,o.s,o.k,C.c,C.g,y.b,o.d,o.r,o.i,o.m,C.f,i.o,f.c,k.a,C.b],styles:[".container[_ngcontent-%COMP%]{display:flex;flex-direction:column}.container[_ngcontent-%COMP%] > *[_ngcontent-%COMP%]{width:100%}.form-div[_ngcontent-%COMP%]{display:flex;flex-direction:row}.form-div[_ngcontent-%COMP%] > *[_ngcontent-%COMP%], .input[_ngcontent-%COMP%]{width:100%}.input[_ngcontent-%COMP%]{padding-left:15px}.position-form[_ngcontent-%COMP%]{display:flex;flex-direction:row;justify-content:space-around}.mat-dialog-content[_ngcontent-%COMP%]{padding-left:20px;padding-right:20px;padding-bottom:5px}"]}),Z);function O(e,t){1&e&&(v.fc(0,"div",11),v.ac(1,"div",12),v.ec())}function D(e,t){1&e&&(v.fc(0,"mat-error"),v.Zc(1,"Debe ingresar el nombre"),v.ec())}function P(e,t){1&e&&(v.fc(0,"mat-error"),v.Zc(1,"Debe ingresar la raz\xf3n social"),v.ec())}var S,z=((S=function(){function e(t,n,i){var c=this;_classCallCheck(this,e),this.dialogRef=t,this.institucionService=n,this.data=i,this.hide=!0,this.form=new o.j({nombre:new o.g("",[o.z.required]),razon_social:new o.g("",[o.z.required])}),this.hasError=function(e,t){return c.form.get(e).hasError(t)},this.title="Editar instituci\xf3n",this.getData()}return _createClass(e,[{key:"ngOnInit",value:function(){}},{key:"getData",value:function(){var e=this;this.loading=!0,this.institucionService.get(this.data).subscribe({next:function(t){console.log(t),e.form.get("nombre").setValue(t.nombre),e.form.get("razon_social").setValue(t.razon_social),e.loading=!1},error:function(e){console.log(e)}})}},{key:"onCloseCancel",value:function(){this.dialogRef.close("Cancel")}},{key:"onCloseConfirm",value:function(){var e=this;this.form.invalid?Object.values(this.form.controls).forEach((function(e){e.markAsTouched()})):this.institucionService.update(this.data,this.form.value).subscribe({next:function(t){console.log(t),e.dialogRef.close("Confirm")},error:function(e){console.log(e)}})}}]),e}()).\u0275fac=function(e){return new(e||S)(v.Zb(f.h),v.Zb(h.a),v.Zb(f.a))},S.\u0275cmp=v.Tb({type:S,selectors:[["app-edit-institucion"]],decls:25,vars:7,consts:[["mat-dialog-title",""],["class","module-loader",4,"ngIf"],[3,"formGroup"],[1,"form-div"],["appearance","standard",1,"input"],["matInput","","placeholder","","formControlName","nombre","maxlength","30"],[4,"ngIf"],["matInput","","placeholder","","formControlName","razon_social","maxlength","30"],[1,"modal-footer"],["mat-raised-button","",1,"btn","btn-primary","btn-rounded",3,"disabled","click"],["mat-raised-button","",1,"btn","btn-danger","btn-rounded",3,"click"],[1,"module-loader"],[1,"spinner","spinner-bubble","spinner-bubble-primary","mr-3"]],template:function(e,t){1&e&&(v.fc(0,"div"),v.fc(1,"h2",0),v.Zc(2),v.ec(),v.ac(3,"hr"),v.fc(4,"mat-dialog-content"),v.Xc(5,O,2,0,"div",1),v.fc(6,"form",2),v.fc(7,"div",3),v.fc(8,"mat-form-field",4),v.fc(9,"mat-label"),v.Zc(10,"Nombre"),v.ec(),v.ac(11,"input",5),v.ac(12,"mat-hint"),v.Xc(13,D,2,0,"mat-error",6),v.ec(),v.fc(14,"mat-form-field",4),v.fc(15,"mat-label"),v.Zc(16,"Nombre"),v.ec(),v.ac(17,"input",7),v.ac(18,"mat-hint"),v.Xc(19,P,2,0,"mat-error",6),v.ec(),v.ec(),v.ec(),v.ec(),v.fc(20,"mat-dialog-actions",8),v.fc(21,"button",9),v.rc("click",(function(){return t.onCloseConfirm()})),v.Zc(22),v.ec(),v.fc(23,"button",10),v.rc("click",(function(){return t.onCloseCancel()})),v.Zc(24,"Cancelar"),v.ec(),v.ec(),v.ec()),2&e&&(v.Lb(2),v.ad(t.title),v.Lb(3),v.Bc("ngIf",t.loading),v.Lb(1),v.Bc("formGroup",t.form),v.Lb(7),v.Bc("ngIf",t.hasError("nombre","required")),v.Lb(6),v.Bc("ngIf",t.hasError("razon_social","required")),v.Lb(2),v.Bc("disabled",t.form.invalid),v.Lb(1),v.ad(t.title))},directives:[f.i,f.f,i.o,o.B,o.s,o.k,C.c,C.g,y.b,o.d,o.r,o.i,o.m,C.f,f.c,k.a,C.b],styles:[".container[_ngcontent-%COMP%]{display:flex;flex-direction:column}.container[_ngcontent-%COMP%] > *[_ngcontent-%COMP%]{width:100%}.form-div[_ngcontent-%COMP%]{display:flex;flex-direction:row}.form-div[_ngcontent-%COMP%] > *[_ngcontent-%COMP%], .input[_ngcontent-%COMP%]{width:100%}.input[_ngcontent-%COMP%]{padding-left:15px}.position-form[_ngcontent-%COMP%]{display:flex;flex-direction:row;justify-content:space-around}.mat-dialog-content[_ngcontent-%COMP%]{padding-left:20px;padding-right:20px;padding-bottom:5px}"]}),S),I=n("5eHb"),M=n("NFeN");function L(e,t){1&e&&(v.fc(0,"div",25),v.ac(1,"div",26),v.ec())}function E(e,t){1&e&&(v.fc(0,"th",27),v.Zc(1," Nombre "),v.ec())}function X(e,t){if(1&e&&(v.fc(0,"td",28),v.Zc(1),v.ec()),2&e){var n=t.$implicit;v.Lb(1),v.bd(" ",n.nombre," ")}}function B(e,t){1&e&&(v.fc(0,"th",27),v.Zc(1," Raz\xf3n social "),v.ec())}function N(e,t){if(1&e&&(v.fc(0,"td",28),v.Zc(1),v.ec()),2&e){var n=t.$implicit;v.Lb(1),v.bd(" ",n.razon_social," ")}}function A(e,t){1&e&&(v.fc(0,"th",29),v.Zc(1," Editar "),v.ec())}function q(e,t){if(1&e){var n=v.gc();v.fc(0,"td",28),v.fc(1,"button",30),v.rc("click",(function(){v.Qc(n);var e=t.$implicit;return v.vc().editCourse(e.id)})),v.ac(2,"mat-icon",31),v.ec(),v.ec()}}function j(e,t){1&e&&(v.fc(0,"th",29),v.Zc(1," Eliminar "),v.ec())}function R(e,t){if(1&e){var n=v.gc();v.fc(0,"td",28),v.fc(1,"button",30),v.rc("click",(function(){v.Qc(n);var e=t.$implicit;return v.vc().deleteCourse(e.id)})),v.ac(2,"mat-icon",32),v.ec(),v.ec()}}function T(e,t){1&e&&v.ac(0,"tr",33)}function F(e,t){1&e&&v.ac(0,"tr",34)}function $(e,t){1&e&&(v.fc(0,"div",35),v.fc(1,"h4",36),v.Zc(2,"Eliminaci\xf3n de usuario"),v.ec(),v.fc(3,"button",37),v.rc("click",(function(){return t.$implicit.dismiss("Cross click")})),v.fc(4,"span",38),v.Zc(5,"\xd7"),v.ec(),v.ec(),v.ec(),v.fc(6,"div",39),v.fc(7,"p"),v.fc(8,"strong"),v.Zc(9,"\xbfEstas seguro de querer eliminar este usuario?"),v.ec(),v.ec(),v.ec(),v.fc(10,"div",40),v.fc(11,"button",41),v.rc("click",(function(){return t.$implicit.dismiss("cancel")})),v.Zc(12,"Cancelar"),v.ec(),v.fc(13,"button",42),v.rc("click",(function(){return t.$implicit.close("Ok")})),v.Zc(14,"Borrar"),v.ec(),v.ec())}function G(e,t){1&e&&(v.fc(0,"div",35),v.fc(1,"h4",36),v.Zc(2,"Eliminaci\xf3n de proyecto"),v.ec(),v.fc(3,"button",37),v.rc("click",(function(){return t.$implicit.dismiss("Cross click")})),v.fc(4,"span",38),v.Zc(5,"\xd7"),v.ec(),v.ec(),v.ec(),v.fc(6,"div",39),v.fc(7,"p"),v.fc(8,"strong"),v.Zc(9,"\xbfEstas seguro de querer eliminar este proyecto?"),v.ec(),v.ec(),v.ec(),v.fc(10,"div",40),v.fc(11,"button",43),v.rc("click",(function(){return t.$implicit.dismiss("cancel")})),v.Zc(12,"Cancelar"),v.ec(),v.fc(13,"button",44),v.rc("click",(function(){return t.$implicit.close("Ok")})),v.Zc(14,"Borrar"),v.ec(),v.ec())}var V,H,K=function(){return[5,10,15]},Q=[{path:"gestion",component:(V=function(){function e(t,n,i,c,r,a){var s=this;_classCallCheck(this,e),this.router=t,this.modalService=n,this.toastr=i,this.dialog=c,this.institucionService=r,this.fb=a,this.checked=!0,this.loading=!1,this.dialogResult="",this.instituciones=[],this.displayedColumns=["nombre","razon_social","edit","delete"],this.dataSource=new m.k,this.addCourseForm=this.fb.group({nombre:["",o.z.required],razon_social:["",o.z.required]}),this.sortingCustomAccesor=function(e,t){switch(t){case"nombre":return e.nombre;case"razon_social":return e.razon_social;default:return e[t]}},this.doFilter=function(e){s.dataSource.filter=e.trim().toLocaleLowerCase()}}return _createClass(e,[{key:"getCourses",value:function(){var e=this;this.loading=!0,this.institucionService.getAll().subscribe((function(t){t&&(console.log("datos",t),e.instituciones=t,e.dataSource.data=e.instituciones,e.dataSource.sort=e.sort,e.dataSource.paginator=e.paginator,e.loading=!1)}))}},{key:"ngOnInit",value:function(){this.dataSource.sortingDataAccessor=this.sortingCustomAccesor,this.getCourses()}},{key:"deleteCourse",value:function(e){var t=this;this.openDeletionConfirmationDialog().afterClosed().subscribe((function(n){console.log(n),n.confirmed&&t.institucionService.delete(e).subscribe({next:function(e){console.log(e),t.getCourses(),t.toastr.success("Institucion eliminada correctamente","Notificaci\xf3n",{timeOut:3e3})},error:function(e){console.log(e)}})}))}},{key:"openDeletionConfirmationDialog",value:function(){var e=this.getDialogConfig();return e.data={message:"\xbfDesea eliminar esta instituci\xf3n?"},this.dialog.open(p.a,e)}},{key:"getDialogConfig",value:function(){var e=new f.e;return e.disableClose=!0,e.autoFocus=!0,e}},{key:"ngAfterViewInit",value:function(){this.dataSource.paginator=this.paginator}},{key:"loadData",value:function(){var e=this;this.loading=!0,this.institucionService.getAll().subscribe((function(t){e.inst=t,e.loading=!1,console.log(e.inst)}))}},{key:"addCourse",value:function(e,t){var n=this;t.target.parentElement.parentElement.blur(),this.modalService.open(e,{ariaLabelledBy:"modal-basic-title",centered:!0}).result.then((function(e){n.checked=!0,n.institucionService.insert(n.addCourseForm.value).subscribe((function(e){e.errors?n.toastr.error("No se puede insertar la instituci\xf3n en la base de datos.","Notificaci\xf3n de error",{timeOut:3e3}):(n.toastr.success("Instituci\xf3n insertada correctamente","Notificaci\xf3n de inserci\xf3n",{timeOut:3e3}),n.cleanForm(),n.loadData())}),(function(e){console.log(e)}))}),(function(e){}))}},{key:"cleanForm",value:function(){this.addCourseForm=this.fb.group({nombre:["",o.z.required],razon_social:["",o.z.required]})}},{key:"openAddDialog",value:function(){var e=this;this.dialog.open(x,{width:"850px",data:"This text is passed into the dialog",disableClose:!0,autoFocus:!0}).afterClosed().subscribe((function(t){console.log("Dialog closed: ".concat(t)),e.dialogResult=t,"Confirm"==t&&(e.toastr.success("Instituci\xf3n agregada exitosamente","Notificaci\xf3n",{timeOut:3e3}),e.getCourses())}))}},{key:"editCourse",value:function(e){var t=this;this.dialog.open(z,{data:e,width:"850px",disableClose:!0,autoFocus:!0}).afterClosed().subscribe((function(e){console.log("The dialog was closed"),"Confirm"==e&&(t.getCourses(),t.toastr.success("Instituci\xf3n editada exitosamente","Notificaci\xf3n",{timeOut:3e3}))}))}},{key:"deleteData",value:function(e,t,n){var i=this;n.target.parentElement.parentElement.blur(),this.modalService.open(t,{ariaLabelledBy:"modal-basic-title",centered:!0}).result.then((function(t){i.institucionService.delete(e).subscribe((function(e){i.toastr.success("Instituci\xf3n eliminada correctamente","Notificaci\xf3n de eliminaci\xf3n",{timeOut:3e3}),i.loadData()}))}),(function(e){}))}}]),e}(),V.\u0275fac=function(e){return new(e||V)(v.Zb(d.h),v.Zb(r.i),v.Zb(I.b),v.Zb(f.b),v.Zb(h.a),v.Zb(o.f))},V.\u0275cmp=v.Tb({type:V,selectors:[["app-gestion"]],viewQuery:function(e,t){var n;1&e&&(v.ed(b.a,!0),v.ed(g.a,!0)),2&e&&(v.Lc(n=v.sc())&&(t.sort=n.first),v.Lc(n=v.sc())&&(t.paginator=n.first))},decls:41,vars:7,consts:[[1,"breadcrumb"],[1,"separator-breadcrumb","border-top"],["class","module-loader",4,"ngIf"],[1,"row"],[1,"col-lg-12","col-md-12"],[1,"col-lg-2","col-md-6","col-sm-6"],[1,"card","card-icon-bg","card-icon-bg-primary","o-hidden","mb-4"],[1,"card-body","text-center"],[1,"i-Building"],[1,"content"],[1,"text-muted","mt-2","mb-0"],["type","button",1,"btn","btn-primary","btn-rounded","m-1",3,"click"],[1,"col-lg-12"],["mat-table","","matSort","","matSortActive","nombre","matSortDirection","asc","matSortDisableClear","",1,"mat-elevation-z8",3,"dataSource"],["matColumnDef","nombre"],["mat-header-cell","","mat-sort-header","",4,"matHeaderCellDef"],["mat-cell","",4,"matCellDef"],["matColumnDef","razon_social"],["matColumnDef","edit"],["mat-header-cell","",4,"matHeaderCellDef"],["matColumnDef","delete"],["mat-header-row","",4,"matHeaderRowDef"],["mat-row","",4,"matRowDef","matRowDefColumns"],[1,"mat-elevation-z8",3,"pageSize","pageSizeOptions"],["deleteConfirmModal",""],[1,"module-loader"],[1,"spinner","spinner-bubble","spinner-bubble-primary","mr-3"],["mat-header-cell","","mat-sort-header",""],["mat-cell",""],["mat-header-cell",""],["mat-icon-button","","color","warn",3,"click"],["svgIcon","edit",1,"mat-18"],["svgIcon","delete",1,"mat-18"],["mat-header-row",""],["mat-row",""],[1,"modal-header"],["id","modal-title",1,"modal-title"],["type","button","aria-label","Close button","aria-describedby","modal-title",1,"close",3,"click"],["aria-hidden","true"],[1,"modal-body"],[1,"modal-footer"],["type","button",1,"btn","btn-primary","btn-rounded",3,"click"],["type","button","ngbAutofocus","",1,"btn","btn-danger","btn-rounded",3,"click"],["type","button",1,"btn","btn-outline-secondary","btn-rounded",3,"click"],["type","button","ngbAutofocus","",1,"btn","btn-wide","btn-danger","btn-rounded",3,"click"]],template:function(e,t){1&e&&(v.fc(0,"div",0),v.fc(1,"h1"),v.Zc(2,"Instituciones"),v.ec(),v.fc(3,"ul"),v.fc(4,"li"),v.Zc(5,"Administrar Instituciones"),v.ec(),v.ec(),v.ec(),v.ac(6,"div",1),v.Xc(7,L,2,0,"div",2),v.fc(8,"div",3),v.fc(9,"div",4),v.fc(10,"div",3),v.fc(11,"div",5),v.fc(12,"div",6),v.fc(13,"div",7),v.ac(14,"i",8),v.fc(15,"div",9),v.fc(16,"p",10),v.Zc(17,"Nueva Institucion"),v.ec(),v.fc(18,"button",11),v.rc("click",(function(){return t.openAddDialog()})),v.Zc(19,"Agregar"),v.ec(),v.ec(),v.ec(),v.ec(),v.ec(),v.ec(),v.ec(),v.fc(20,"div",12),v.fc(21,"table",13),v.dc(22,14),v.Xc(23,E,2,0,"th",15),v.Xc(24,X,2,1,"td",16),v.cc(),v.dc(25,17),v.Xc(26,B,2,0,"th",15),v.Xc(27,N,2,1,"td",16),v.cc(),v.dc(28,18),v.Xc(29,A,2,0,"th",19),v.Xc(30,q,3,0,"td",16),v.cc(),v.dc(31,20),v.Xc(32,j,2,0,"th",19),v.Xc(33,R,3,0,"td",16),v.cc(),v.Xc(34,T,1,0,"tr",21),v.Xc(35,F,1,0,"tr",22),v.ec(),v.ac(36,"mat-paginator",23),v.ec(),v.Xc(37,$,15,0,"ng-template",null,24,v.Yc),v.Xc(39,G,15,0,"ng-template",null,24,v.Yc),v.ec()),2&e&&(v.Lb(7),v.Bc("ngIf",t.loading),v.Lb(14),v.Bc("dataSource",t.dataSource),v.Lb(13),v.Bc("matHeaderRowDef",t.displayedColumns),v.Lb(1),v.Bc("matRowDefColumns",t.displayedColumns),v.Lb(1),v.Bc("pageSize",5)("pageSizeOptions",v.Ec(6,K)))},directives:[i.o,m.j,b.a,m.c,m.e,m.b,m.g,m.i,g.a,m.d,b.b,m.a,k.a,M.a,m.f,m.h],styles:["table[_ngcontent-%COMP%]{width:100%}#title[_ngcontent-%COMP%]{font-size:24px;margin-top:10px;margin-left:5%;margin-bottom:15px}.list-container[_ngcontent-%COMP%]{padding-top:5%;padding-left:5%;padding-right:5%}th.mat-sort-header-sorted[_ngcontent-%COMP%]{color:#000}.container[_ngcontent-%COMP%]{display:flex;flex-direction:column}mat-form-field[_ngcontent-%COMP%]{padding:-10px}#divAncho[_ngcontent-%COMP%]{line-height:2em;height:4em;overflow:hidden}"]}),V)}],Y=((H=_createClass((function e(){_classCallCheck(this,e)}))).\u0275mod=v.Xb({type:H}),H.\u0275inj=v.Wb({factory:function(e){return new(e||H)},imports:[[d.l.forChild(Q)],d.l]}),H),J=n("vvyD"),W=n("TXLM");n.d(t,"InstitucionesModule",(function(){return ee}));var U,ee=((U=_createClass((function e(){_classCallCheck(this,e)}))).\u0275mod=v.Xb({type:U}),U.\u0275inj=v.Wb({factory:function(e){return new(e||U)},imports:[[i.c,o.l,o.x,l.a,s.a,u.f,r.j,Y,c.a,W.a,a.a,J.a]]}),U)}}]);