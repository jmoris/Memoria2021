(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["views-dashboard-dashboard-module"],{

/***/ "./src/app/_helpers/profile.guard.ts":
/*!*******************************************!*\
  !*** ./src/app/_helpers/profile.guard.ts ***!
  \*******************************************/
/*! exports provided: ProfileGuard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProfileGuard", function() { return ProfileGuard; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm5/router.js");
/* harmony import */ var _services_authentication_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../_services/authentication.service */ "./src/app/_services/authentication.service.ts");






var ProfileGuard = /** @class */ (function () {
    function ProfileGuard(router, authenticationService) {
        this.router = router;
        this.authenticationService = authenticationService;
    }
    ProfileGuard.prototype.canActivate = function (route, state) {
        var currentUser = this.authenticationService.currentUserValue;
        var user = currentUser.user;
        return true;
    };
    ProfileGuard.ɵfac = function ProfileGuard_Factory(t) { return new (t || ProfileGuard)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_services_authentication_service__WEBPACK_IMPORTED_MODULE_2__["AuthenticationService"])); };
    ProfileGuard.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: ProfileGuard, factory: ProfileGuard.ɵfac, providedIn: 'root' });
    return ProfileGuard;
}());

/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ProfileGuard, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{ providedIn: 'root' }]
    }], function () { return [{ type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"] }, { type: _services_authentication_service__WEBPACK_IMPORTED_MODULE_2__["AuthenticationService"] }]; }, null); })();


/***/ }),

/***/ "./src/app/views/dashboard/dashboad-default/dashboad-default.component.ts":
/*!********************************************************************************!*\
  !*** ./src/app/views/dashboard/dashboad-default/dashboad-default.component.ts ***!
  \********************************************************************************/
/*! exports provided: DashboadDefaultComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashboadDefaultComponent", function() { return DashboadDefaultComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var src_app_services_usuarios_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/_services/usuarios.service */ "./src/app/_services/usuarios.service.ts");
/* harmony import */ var ngx_echarts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngx-echarts */ "./node_modules/ngx-echarts/__ivy_ngcc__/fesm5/ngx-echarts.js");





var DashboadDefaultComponent = /** @class */ (function () {
    // '#62549c', '#7566b5', '#7d6cbb', '#8877bd', '#9181bd', '#6957af'
    // '#62549c', '#638eb0', '#6d9abd', '#799fbd', '#9181bd', '#6957af' Celeste
    // '#62549c', '#a69962', '#c2b16d', '#baad79', '#9181bd', '#6957af' Amarillo
    function DashboadDefaultComponent(userService) {
        var _this = this;
        this.userService = userService;
        this.usuarios = [];
        this.salesChartPie = {
            color: ['#263db5', '#d22346'],
            tooltip: {
                show: true,
                backgroundColor: 'rgba(0, 0, 0, .8)'
            },
            xAxis: [{
                    axisLine: {
                        show: false
                    },
                    splitLine: {
                        show: false
                    }
                }
            ],
            yAxis: [{
                    axisLine: {
                        show: false
                    },
                    splitLine: {
                        show: false
                    }
                }
            ],
            series: [{
                    name: 'Proyectos',
                    type: 'pie',
                    radius: '75%',
                    center: ['50%', '50%'],
                    data: [
                        { value: 0, name: 'Activo' },
                        { value: 0, name: 'Inactivo' }
                    ],
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };
        this.userService.infoDash().subscribe(function (data) {
            _this.info = data;
            var info2 = null;
            info2 = {
                admin: 0,
                student: 0,
                teacher: 0
            };
            data.usuarios.forEach(function (element) {
                if (element.profile === 'admin') {
                    info2.admin = element.count;
                }
                else if (element.profile === 'student') {
                    info2.student = element.count;
                }
                else if (element.profile === 'teacher') {
                    info2.teacher = element.count;
                }
            });
            _this.info.usuarios = info2;
            _this.dataProyectos = {
                series: {
                    data: [
                        { value: _this.info.proyectos[0].activos, name: 'Activo' },
                        { value: _this.info.proyectos[1].inactivos, name: 'Inactivo' }
                    ]
                }
            };
            _this.dataCursos = {
                series: {
                    data: [
                        { value: _this.info.cursos[0].activos, name: 'Activo' },
                        { value: _this.info.cursos[1].inactivos, name: 'Inactivo' }
                    ]
                }
            };
        });
    }
    DashboadDefaultComponent.prototype.ngOnInit = function () {
    };
    DashboadDefaultComponent.prototype.onChartInit = function (e) {
    };
    DashboadDefaultComponent.ɵfac = function DashboadDefaultComponent_Factory(t) { return new (t || DashboadDefaultComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_services_usuarios_service__WEBPACK_IMPORTED_MODULE_1__["UsuariosService"])); };
    DashboadDefaultComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: DashboadDefaultComponent, selectors: [["app-dashboad-default"]], decls: 85, vars: 12, consts: [[1, ""], [1, "row"], [1, "breadcrumb", "col-md-9"], ["href", ""], [1, "separator-breadcrumb", "border-top"], [1, "col-lg-12", "col-md-12"], [1, "card", "mb-4"], [1, "card-body"], [1, "card-title"], [1, "col-lg-4", "col-md-6", "col-sm-6"], [1, "card", "card-icon", "mb-4"], [1, "card-body", "text-center"], [1, "i-Administrator"], [1, "text-muted", "mt-2", "mb-2"], [1, "text-primary", "text-24", "line-height-1", "m-0"], [1, "i-Business-Mens"], [1, "i-MaleFemale"], [1, "col-lg-6", "col-sm-12"], ["echarts", "", 2, "height", "182px", 3, "options", "merge", "autoResize"], [1, "i-Library"], [1, "i-Close-Window"], [1, "i-Book"]], template: function DashboadDefaultComponent_Template(rf, ctx) { if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 2);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "h1");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "Bienvenido");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "ul");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "li");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "a", 3);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8, "Administrador/a");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](9, "div", 4);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "div", 1);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "div", 5);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "div", 6);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "div", 7);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "div", 8);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](15, "Usuarios");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "div", 1);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "div", 9);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "div", 10);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "div", 11);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](20, "i", 12);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "p", 13);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](22, "Administradores");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](23, "p", 14);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](24);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](25, "div", 9);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](26, "div", 10);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](27, "div", 11);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](28, "i", 15);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](29, "p", 13);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](30, "Docentes");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](31, "p", 14);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](32);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](33, "div", 9);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](34, "div", 10);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](35, "div", 11);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](36, "i", 16);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](37, "p", 13);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](38, "Estudiantes");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](39, "p", 14);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](40);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](41, "div", 1);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](42, "div", 17);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](43, "div", 6);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](44, "div", 7);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](45, "div", 8);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](46, "Cursos Periodo Actual");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](47, "div", 18);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](48, "div", 17);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](49, "div", 6);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](50, "div", 7);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](51, "div", 8);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](52, "Proyectos Periodo Actual");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](53, "div", 18);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](54, "div", 1);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](55, "div", 5);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](56, "div", 6);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](57, "div", 7);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](58, "div", 8);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](59, "Cursos");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](60, "div", 1);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](61, "div", 9);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](62, "div", 10);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](63, "div", 11);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](64, "i", 19);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](65, "p", 13);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](66, "Totales");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](67, "p", 14);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](68);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](69, "div", 9);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](70, "div", 10);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](71, "div", 11);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](72, "i", 20);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](73, "p", 13);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](74, "Finalizados");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](75, "p", 14);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](76);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](77, "div", 9);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](78, "div", 10);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](79, "div", 11);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](80, "i", 21);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](81, "p", 13);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](82, "Activos");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](83, "p", 14);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](84);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        } if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](24);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.info == null ? null : ctx.info.usuarios == null ? null : ctx.info.usuarios.admin);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](8);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.info == null ? null : ctx.info.usuarios == null ? null : ctx.info.usuarios.teacher);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](8);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.info == null ? null : ctx.info.usuarios == null ? null : ctx.info.usuarios.student);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](7);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("options", ctx.salesChartPie)("merge", ctx.dataCursos)("autoResize", true);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("options", ctx.salesChartPie)("merge", ctx.dataCursos)("autoResize", true);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](15);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", (ctx.info == null ? null : ctx.info.cursos[0] == null ? null : ctx.info.cursos[0].activos) + (ctx.info == null ? null : ctx.info.cursos[1] == null ? null : ctx.info.cursos[1].inactivos), "");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](8);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("", ctx.info == null ? null : ctx.info.cursos[1] == null ? null : ctx.info.cursos[1].inactivos, " ");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](8);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.info == null ? null : ctx.info.cursos[0] == null ? null : ctx.info.cursos[0].activos);
        } }, directives: [ngx_echarts__WEBPACK_IMPORTED_MODULE_2__["ɵa"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL2Rhc2hib2FyZC9kYXNoYm9hZC1kZWZhdWx0L2Rhc2hib2FkLWRlZmF1bHQuY29tcG9uZW50LmNzcyJ9 */"] });
    return DashboadDefaultComponent;
}());

/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](DashboadDefaultComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-dashboad-default',
                templateUrl: './dashboad-default.component.html',
                styleUrls: ['./dashboad-default.component.css']
            }]
    }], function () { return [{ type: src_app_services_usuarios_service__WEBPACK_IMPORTED_MODULE_1__["UsuariosService"] }]; }, null); })();


/***/ }),

/***/ "./src/app/views/dashboard/dashboad-docente/dashboad-default.component.ts":
/*!********************************************************************************!*\
  !*** ./src/app/views/dashboard/dashboad-docente/dashboad-default.component.ts ***!
  \********************************************************************************/
/*! exports provided: DashboadDocenteComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashboadDocenteComponent", function() { return DashboadDocenteComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var src_app_services_usuarios_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/_services/usuarios.service */ "./src/app/_services/usuarios.service.ts");
/* harmony import */ var ngx_echarts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngx-echarts */ "./node_modules/ngx-echarts/__ivy_ngcc__/fesm5/ngx-echarts.js");





var DashboadDocenteComponent = /** @class */ (function () {
    //'#62549c', '#7566b5', '#7d6cbb', '#8877bd', '#9181bd', '#6957af'
    //'#62549c', '#638eb0', '#6d9abd', '#799fbd', '#9181bd', '#6957af' Celeste
    //'#62549c', '#a69962', '#c2b16d', '#baad79', '#9181bd', '#6957af' Amarillo
    function DashboadDocenteComponent(userService) {
        var _this = this;
        this.userService = userService;
        this.salesChartPie = {
            color: ['#263db5', '#d22346'],
            tooltip: {
                show: true,
                backgroundColor: 'rgba(0, 0, 0, .8)'
            },
            xAxis: [{
                    axisLine: {
                        show: false
                    },
                    splitLine: {
                        show: false
                    }
                }
            ],
            yAxis: [{
                    axisLine: {
                        show: false
                    },
                    splitLine: {
                        show: false
                    }
                }
            ],
            series: [{
                    name: 'Proyectos',
                    type: 'pie',
                    radius: '75%',
                    center: ['50%', '50%'],
                    data: [
                        { value: 0, name: 'Activo' },
                        { value: 0, name: 'Inactivo' }
                    ],
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };
        this.userService.infoDash().subscribe(function (data) {
            _this.info = data;
            var info2 = null;
            info2 = {
                admin: 0,
                student: 0,
                teacher: 0
            };
            data.usuarios.forEach(function (element) {
                if (element.profile === 'admin') {
                    info2.admin = element.count;
                }
                else if (element.profile === 'student') {
                    info2.student = element.count;
                }
                else if (element.profile === 'teacher') {
                    info2.teacher = element.count;
                }
            });
            _this.info.usuarios = info2;
            _this.dataProyectos = {
                series: {
                    data: [
                        { value: _this.info.proyectos[0].activos, name: 'Activo' },
                        { value: _this.info.proyectos[1].inactivos, name: 'Inactivo' }
                    ]
                }
            };
            _this.dataCursos = {
                series: {
                    data: [
                        { value: _this.info.cursos[0].activos, name: 'Activo' },
                        { value: _this.info.cursos[1].inactivos, name: 'Inactivo' }
                    ]
                }
            };
        });
    }
    DashboadDocenteComponent.prototype.ngOnInit = function () {
    };
    DashboadDocenteComponent.prototype.onChartInit = function (e) {
    };
    DashboadDocenteComponent.ɵfac = function DashboadDocenteComponent_Factory(t) { return new (t || DashboadDocenteComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_services_usuarios_service__WEBPACK_IMPORTED_MODULE_1__["UsuariosService"])); };
    DashboadDocenteComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: DashboadDocenteComponent, selectors: [["app-dashboad-default"]], decls: 85, vars: 12, consts: [[1, ""], [1, "row"], [1, "breadcrumb", "col-md-9"], ["href", ""], [1, "separator-breadcrumb", "border-top"], [1, "col-lg-12", "col-md-12"], [1, "card", "mb-4"], [1, "card-body"], [1, "card-title"], [1, "col-lg-4", "col-md-6", "col-sm-6"], [1, "card", "card-icon", "mb-4"], [1, "card-body", "text-center"], [1, "i-File-Clipboard-Text--Image"], [1, "text-muted", "mt-2", "mb-2"], [1, "text-primary", "text-24", "line-height-1", "m-0"], [1, "i-Diploma-2"], [1, "i-University"], [1, "col-lg-6", "col-sm-12"], ["echarts", "", 2, "height", "182px", 3, "options", "merge", "autoResize"], [1, "i-MaleFemale"]], template: function DashboadDocenteComponent_Template(rf, ctx) { if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 2);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "h1");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "Bienvenido");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "ul");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "li");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "a", 3);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8, "Docente");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](9, "div", 4);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "div", 1);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "div", 5);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "div", 6);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "div", 7);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "div", 8);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](15, "Has Participado en");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "div", 1);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "div", 9);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "div", 10);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "div", 11);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](20, "i", 12);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "p", 13);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](22, "Proyectos");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](23, "p", 14);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](24);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](25, "div", 9);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](26, "div", 10);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](27, "div", 11);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](28, "i", 15);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](29, "p", 13);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](30, "Cursos");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](31, "p", 14);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](32);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](33, "div", 9);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](34, "div", 10);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](35, "div", 11);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](36, "i", 16);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](37, "p", 13);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](38, "Semestres");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](39, "p", 14);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](40);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](41, "div", 1);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](42, "div", 17);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](43, "div", 6);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](44, "div", 7);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](45, "div", 8);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](46, "Cursos Periodo Actual");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](47, "div", 18);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](48, "div", 17);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](49, "div", 6);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](50, "div", 7);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](51, "div", 8);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](52, "Proyectos Periodo Actual");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](53, "div", 18);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](54, "div", 1);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](55, "div", 5);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](56, "div", 6);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](57, "div", 7);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](58, "div", 8);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](59, "Actualmente usted es Docente para");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](60, "div", 1);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](61, "div", 9);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](62, "div", 10);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](63, "div", 11);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](64, "i", 12);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](65, "p", 13);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](66, "Proyectos");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](67, "p", 14);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](68);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](69, "div", 9);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](70, "div", 10);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](71, "div", 11);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](72, "i", 15);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](73, "p", 13);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](74, "Cursos");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](75, "p", 14);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](76);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](77, "div", 9);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](78, "div", 10);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](79, "div", 11);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](80, "i", 19);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](81, "p", 13);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](82, "Alumnos");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](83, "p", 14);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](84);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        } if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](24);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.info == null ? null : ctx.info.usuarios.teacher);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](8);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.info == null ? null : ctx.info.usuarios.teacher);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](8);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.info == null ? null : ctx.info.usuarios.student);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](7);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("options", ctx.salesChartPie)("merge", ctx.dataCursos)("autoResize", true);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("options", ctx.salesChartPie)("merge", ctx.dataCursos)("autoResize", true);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](15);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.info == null ? null : ctx.info.usuarios.teacher);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](8);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.info == null ? null : ctx.info.usuarios.teacher);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](8);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.info == null ? null : ctx.info.usuarios.student);
        } }, directives: [ngx_echarts__WEBPACK_IMPORTED_MODULE_2__["ɵa"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL2Rhc2hib2FyZC9kYXNoYm9hZC1kb2NlbnRlL2Rhc2hib2FkLWRlZmF1bHQuY29tcG9uZW50LmNzcyJ9 */"] });
    return DashboadDocenteComponent;
}());

/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](DashboadDocenteComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-dashboad-default',
                templateUrl: './dashboad-default.component.html',
                styleUrls: ['./dashboad-default.component.css']
            }]
    }], function () { return [{ type: src_app_services_usuarios_service__WEBPACK_IMPORTED_MODULE_1__["UsuariosService"] }]; }, null); })();


/***/ }),

/***/ "./src/app/views/dashboard/dashboad-estudiante/dashboad-estudiante.component.ts":
/*!**************************************************************************************!*\
  !*** ./src/app/views/dashboard/dashboad-estudiante/dashboad-estudiante.component.ts ***!
  \**************************************************************************************/
/*! exports provided: DashboadEstudianteComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashboadEstudianteComponent", function() { return DashboadEstudianteComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var src_app_services_usuarios_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/_services/usuarios.service */ "./src/app/_services/usuarios.service.ts");
/* harmony import */ var ngx_echarts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngx-echarts */ "./node_modules/ngx-echarts/__ivy_ngcc__/fesm5/ngx-echarts.js");





var DashboadEstudianteComponent = /** @class */ (function () {
    // '#62549c', '#7566b5', '#7d6cbb', '#8877bd', '#9181bd', '#6957af'
    // '#62549c', '#638eb0', '#6d9abd', '#799fbd', '#9181bd', '#6957af' Celeste
    // '#62549c', '#a69962', '#c2b16d', '#baad79', '#9181bd', '#6957af' Amarillo
    function DashboadEstudianteComponent(userService) {
        var _this = this;
        this.userService = userService;
        this.usuarios = [];
        this.salesChartPie = {
            color: ['#263db5', '#d22346'],
            tooltip: {
                show: true,
                backgroundColor: 'rgba(0, 0, 0, .8)'
            },
            xAxis: [{
                    axisLine: {
                        show: false
                    },
                    splitLine: {
                        show: false
                    }
                }
            ],
            yAxis: [{
                    axisLine: {
                        show: false
                    },
                    splitLine: {
                        show: false
                    }
                }
            ],
            series: [{
                    name: 'Proyectos',
                    type: 'pie',
                    radius: '75%',
                    center: ['50%', '50%'],
                    data: [
                        { value: 0, name: 'Activo' },
                        { value: 0, name: 'Inactivo' }
                    ],
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };
        this.userService.infoDash().subscribe(function (data) {
            _this.info = data;
            var info2 = null;
            info2 = {
                admin: 0,
                student: 0,
                teacher: 0
            };
            data.usuarios.forEach(function (element) {
                if (element.profile === 'admin') {
                    info2.admin = element.count;
                }
                else if (element.profile === 'student') {
                    info2.student = element.count;
                }
                else if (element.profile === 'teacher') {
                    info2.teacher = element.count;
                }
            });
            _this.info.usuarios = info2;
            _this.dataProyectos = {
                series: {
                    data: [
                        { value: _this.info.proyectos[0].activos, name: 'Activo' },
                        { value: _this.info.proyectos[1].inactivos, name: 'Inactivo' }
                    ]
                }
            };
            _this.dataCursos = {
                series: {
                    data: [
                        { value: _this.info.cursos[0].activos, name: 'Activo' },
                        { value: _this.info.cursos[1].inactivos, name: 'Inactivo' }
                    ]
                }
            };
        });
    }
    DashboadEstudianteComponent.prototype.ngOnInit = function () {
    };
    DashboadEstudianteComponent.prototype.onChartInit = function (e) {
    };
    DashboadEstudianteComponent.ɵfac = function DashboadEstudianteComponent_Factory(t) { return new (t || DashboadEstudianteComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_services_usuarios_service__WEBPACK_IMPORTED_MODULE_1__["UsuariosService"])); };
    DashboadEstudianteComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: DashboadEstudianteComponent, selectors: [["app-dashboad-estudiante"]], decls: 54, vars: 9, consts: [[1, ""], [1, "row"], [1, "breadcrumb", "col-md-9"], ["href", ""], [1, "separator-breadcrumb", "border-top"], [1, "col-lg-12", "col-md-12"], [1, "card", "mb-4"], [1, "card-body"], [1, "card-title"], [1, "col-lg-4", "col-md-6", "col-sm-6"], [1, "card", "card-icon", "mb-4"], [1, "card-body", "text-center"], [1, "i-File-Clipboard-Text--Image"], [1, "text-muted", "mt-2", "mb-2"], [1, "text-primary", "text-24", "line-height-1", "m-0"], [1, "i-Diploma-2"], [1, "i-University"], [1, "col-lg-6", "col-sm-12"], ["echarts", "", 2, "height", "182px", 3, "options", "merge", "autoResize"]], template: function DashboadEstudianteComponent_Template(rf, ctx) { if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 2);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "h1");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "Bienvenido");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "ul");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "li");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "a", 3);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8, "Estudiante");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](9, "div", 4);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "div", 1);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "div", 5);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "div", 6);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "div", 7);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "div", 8);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](15, "Has Participado en");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "div", 1);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "div", 9);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "div", 10);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "div", 11);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](20, "i", 12);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "p", 13);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](22, "Proyectos");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](23, "p", 14);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](24);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](25, "div", 9);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](26, "div", 10);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](27, "div", 11);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](28, "i", 15);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](29, "p", 13);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](30, "Cursos");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](31, "p", 14);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](32);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](33, "div", 9);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](34, "div", 10);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](35, "div", 11);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](36, "i", 16);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](37, "p", 13);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](38, "Semestres");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](39, "p", 14);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](40);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](41, "div", 1);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](42, "div", 17);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](43, "div", 6);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](44, "div", 7);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](45, "div", 8);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](46, "Cursos Periodo Actual");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](47, "div", 18);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](48, "div", 17);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](49, "div", 6);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](50, "div", 7);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](51, "div", 8);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](52, "Proyectos Periodo Actual");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](53, "div", 18);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        } if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](24);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.info == null ? null : ctx.info.usuarios.teacher);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](8);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.info == null ? null : ctx.info.usuarios.teacher);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](8);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.info == null ? null : ctx.info.usuarios.student);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](7);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("options", ctx.salesChartPie)("merge", ctx.dataCursos)("autoResize", true);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("options", ctx.salesChartPie)("merge", ctx.dataCursos)("autoResize", true);
        } }, directives: [ngx_echarts__WEBPACK_IMPORTED_MODULE_2__["ɵa"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL2Rhc2hib2FyZC9kYXNoYm9hZC1lc3R1ZGlhbnRlL2Rhc2hib2FkLWVzdHVkaWFudGUuY29tcG9uZW50LmNzcyJ9 */"] });
    return DashboadEstudianteComponent;
}());

/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](DashboadEstudianteComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-dashboad-estudiante',
                templateUrl: './dashboad-estudiante.component.html',
                styleUrls: ['./dashboad-estudiante.component.css']
            }]
    }], function () { return [{ type: src_app_services_usuarios_service__WEBPACK_IMPORTED_MODULE_1__["UsuariosService"] }]; }, null); })();


/***/ }),

/***/ "./src/app/views/dashboard/dashboard-ayudante/dashboad-default.component.ts":
/*!**********************************************************************************!*\
  !*** ./src/app/views/dashboard/dashboard-ayudante/dashboad-default.component.ts ***!
  \**********************************************************************************/
/*! exports provided: DashboadAyudanteComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashboadAyudanteComponent", function() { return DashboadAyudanteComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var src_app_services_usuarios_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/_services/usuarios.service */ "./src/app/_services/usuarios.service.ts");
/* harmony import */ var ngx_echarts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngx-echarts */ "./node_modules/ngx-echarts/__ivy_ngcc__/fesm5/ngx-echarts.js");





var DashboadAyudanteComponent = /** @class */ (function () {
    //'#62549c', '#7566b5', '#7d6cbb', '#8877bd', '#9181bd', '#6957af'
    //'#62549c', '#638eb0', '#6d9abd', '#799fbd', '#9181bd', '#6957af' Celeste
    //'#62549c', '#a69962', '#c2b16d', '#baad79', '#9181bd', '#6957af' Amarillo
    function DashboadAyudanteComponent(userService) {
        var _this = this;
        this.userService = userService;
        this.salesChartPie = {
            color: ['#263db5', '#d22346'],
            tooltip: {
                show: true,
                backgroundColor: 'rgba(0, 0, 0, .8)'
            },
            xAxis: [{
                    axisLine: {
                        show: false
                    },
                    splitLine: {
                        show: false
                    }
                }
            ],
            yAxis: [{
                    axisLine: {
                        show: false
                    },
                    splitLine: {
                        show: false
                    }
                }
            ],
            series: [{
                    name: 'Proyectos',
                    type: 'pie',
                    radius: '75%',
                    center: ['50%', '50%'],
                    data: [
                        { value: 0, name: 'Activo' },
                        { value: 0, name: 'Inactivo' }
                    ],
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };
        this.userService.infoDash().subscribe(function (data) {
            _this.info = data;
            var info2 = null;
            info2 = {
                admin: 0,
                student: 0,
                teacher: 0
            };
            data.usuarios.forEach(function (element) {
                if (element.profile === 'admin') {
                    info2.admin = element.count;
                }
                else if (element.profile === 'student') {
                    info2.student = element.count;
                }
                else if (element.profile === 'teacher') {
                    info2.teacher = element.count;
                }
            });
            _this.info.usuarios = info2;
            _this.dataProyectos = {
                series: {
                    data: [
                        { value: _this.info.proyectos[0].activos, name: 'Activo' },
                        { value: _this.info.proyectos[1].inactivos, name: 'Inactivo' }
                    ]
                }
            };
            _this.dataCursos = {
                series: {
                    data: [
                        { value: _this.info.cursos[0].activos, name: 'Activo' },
                        { value: _this.info.cursos[1].inactivos, name: 'Inactivo' }
                    ]
                }
            };
        });
    }
    DashboadAyudanteComponent.prototype.ngOnInit = function () {
    };
    DashboadAyudanteComponent.prototype.onChartInit = function (e) {
    };
    DashboadAyudanteComponent.ɵfac = function DashboadAyudanteComponent_Factory(t) { return new (t || DashboadAyudanteComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_services_usuarios_service__WEBPACK_IMPORTED_MODULE_1__["UsuariosService"])); };
    DashboadAyudanteComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: DashboadAyudanteComponent, selectors: [["app-dashboad-default"]], decls: 85, vars: 12, consts: [[1, ""], [1, "row"], [1, "breadcrumb", "col-md-9"], ["href", ""], [1, "separator-breadcrumb", "border-top"], [1, "col-lg-12", "col-md-12"], [1, "card", "mb-4"], [1, "card-body"], [1, "card-title"], [1, "col-lg-4", "col-md-6", "col-sm-6"], [1, "card", "card-icon", "mb-4"], [1, "card-body", "text-center"], [1, "i-File-Clipboard-Text--Image"], [1, "text-muted", "mt-2", "mb-2"], [1, "text-primary", "text-24", "line-height-1", "m-0"], [1, "i-Diploma-2"], [1, "i-University"], [1, "col-lg-6", "col-sm-12"], ["echarts", "", 2, "height", "182px", 3, "options", "merge", "autoResize"], [1, "i-MaleFemale"]], template: function DashboadAyudanteComponent_Template(rf, ctx) { if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 2);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "h1");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "Bienvenido");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "ul");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "li");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "a", 3);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8, "Ayudante");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](9, "div", 4);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "div", 1);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "div", 5);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "div", 6);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "div", 7);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "div", 8);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](15, "Has Participado en");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "div", 1);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "div", 9);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "div", 10);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "div", 11);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](20, "i", 12);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "p", 13);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](22, "Proyectos");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](23, "p", 14);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](24);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](25, "div", 9);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](26, "div", 10);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](27, "div", 11);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](28, "i", 15);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](29, "p", 13);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](30, "Cursos");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](31, "p", 14);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](32);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](33, "div", 9);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](34, "div", 10);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](35, "div", 11);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](36, "i", 16);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](37, "p", 13);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](38, "Semestres");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](39, "p", 14);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](40);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](41, "div", 1);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](42, "div", 17);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](43, "div", 6);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](44, "div", 7);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](45, "div", 8);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](46, "Cursos Periodo Actual");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](47, "div", 18);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](48, "div", 17);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](49, "div", 6);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](50, "div", 7);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](51, "div", 8);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](52, "Proyectos Periodo Actual");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](53, "div", 18);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](54, "div", 1);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](55, "div", 5);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](56, "div", 6);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](57, "div", 7);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](58, "div", 8);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](59, "Eres Ayudante para");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](60, "div", 1);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](61, "div", 9);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](62, "div", 10);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](63, "div", 11);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](64, "i", 12);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](65, "p", 13);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](66, "Proyectos");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](67, "p", 14);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](68);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](69, "div", 9);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](70, "div", 10);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](71, "div", 11);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](72, "i", 15);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](73, "p", 13);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](74, "Cursos");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](75, "p", 14);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](76);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](77, "div", 9);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](78, "div", 10);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](79, "div", 11);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](80, "i", 19);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](81, "p", 13);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](82, "Alumnos");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](83, "p", 14);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](84);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        } if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](24);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.info.usuarios.teacher);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](8);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.info.usuarios.teacher);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](8);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.info.usuarios.student);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](7);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("options", ctx.salesChartPie)("merge", ctx.dataCursos)("autoResize", true);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("options", ctx.salesChartPie)("merge", ctx.dataCursos)("autoResize", true);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](15);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.info.usuarios.teacher);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](8);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.info.usuarios.teacher);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](8);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.info.usuarios.student);
        } }, directives: [ngx_echarts__WEBPACK_IMPORTED_MODULE_2__["ɵa"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL2Rhc2hib2FyZC9kYXNoYm9hcmQtYXl1ZGFudGUvZGFzaGJvYWQtZGVmYXVsdC5jb21wb25lbnQuY3NzIn0= */"] });
    return DashboadAyudanteComponent;
}());

/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](DashboadAyudanteComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-dashboad-default',
                templateUrl: './dashboad-default.component.html',
                styleUrls: ['./dashboad-default.component.css']
            }]
    }], function () { return [{ type: src_app_services_usuarios_service__WEBPACK_IMPORTED_MODULE_1__["UsuariosService"] }]; }, null); })();


/***/ }),

/***/ "./src/app/views/dashboard/dashboard-routing.module.ts":
/*!*************************************************************!*\
  !*** ./src/app/views/dashboard/dashboard-routing.module.ts ***!
  \*************************************************************/
/*! exports provided: DashboardRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashboardRoutingModule", function() { return DashboardRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm5/router.js");
/* harmony import */ var _dashboad_default_dashboad_default_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dashboad-default/dashboad-default.component */ "./src/app/views/dashboard/dashboad-default/dashboad-default.component.ts");
/* harmony import */ var _dashboad_estudiante_dashboad_estudiante_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./dashboad-estudiante/dashboad-estudiante.component */ "./src/app/views/dashboard/dashboad-estudiante/dashboad-estudiante.component.ts");
/* harmony import */ var _dashboard_ayudante_dashboad_default_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./dashboard-ayudante/dashboad-default.component */ "./src/app/views/dashboard/dashboard-ayudante/dashboad-default.component.ts");
/* harmony import */ var _dashboad_docente_dashboad_default_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./dashboad-docente/dashboad-default.component */ "./src/app/views/dashboard/dashboad-docente/dashboad-default.component.ts");
/* harmony import */ var src_app_helpers_profile_guard__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/_helpers/profile.guard */ "./src/app/_helpers/profile.guard.ts");









var routes = [
    {
        path: 'v1',
        component: _dashboad_default_dashboad_default_component__WEBPACK_IMPORTED_MODULE_2__["DashboadDefaultComponent"],
    },
    {
        path: 'v2',
        component: _dashboad_estudiante_dashboad_estudiante_component__WEBPACK_IMPORTED_MODULE_3__["DashboadEstudianteComponent"],
        canActivate: [src_app_helpers_profile_guard__WEBPACK_IMPORTED_MODULE_6__["ProfileGuard"]]
    },
    {
        path: 'v3',
        component: _dashboard_ayudante_dashboad_default_component__WEBPACK_IMPORTED_MODULE_4__["DashboadAyudanteComponent"],
        canActivate: [src_app_helpers_profile_guard__WEBPACK_IMPORTED_MODULE_6__["ProfileGuard"]]
    },
    {
        path: 'v4',
        component: _dashboad_docente_dashboad_default_component__WEBPACK_IMPORTED_MODULE_5__["DashboadDocenteComponent"],
        canActivate: [src_app_helpers_profile_guard__WEBPACK_IMPORTED_MODULE_6__["ProfileGuard"]]
    },
];
var DashboardRoutingModule = /** @class */ (function () {
    function DashboardRoutingModule() {
    }
    DashboardRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: DashboardRoutingModule });
    DashboardRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function DashboardRoutingModule_Factory(t) { return new (t || DashboardRoutingModule)(); }, imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] });
    return DashboardRoutingModule;
}());

(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](DashboardRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](DashboardRoutingModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
                exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
            }]
    }], null, null); })();


/***/ }),

/***/ "./src/app/views/dashboard/dashboard.module.ts":
/*!*****************************************************!*\
  !*** ./src/app/views/dashboard/dashboard.module.ts ***!
  \*****************************************************/
/*! exports provided: DashboardModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashboardModule", function() { return DashboardModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm5/common.js");
/* harmony import */ var ngx_custom_validators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngx-custom-validators */ "./node_modules/ngx-custom-validators/__ivy_ngcc__/fesm5/ngx-custom-validators.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm5/forms.js");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/__ivy_ngcc__/fesm5/ng-bootstrap.js");
/* harmony import */ var ngx_chips__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-chips */ "./node_modules/ngx-chips/__ivy_ngcc__/fesm5/ngx-chips.js");
/* harmony import */ var _dashboard_routing_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./dashboard-routing.module */ "./src/app/views/dashboard/dashboard-routing.module.ts");
/* harmony import */ var _dashboad_default_dashboad_default_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./dashboad-default/dashboad-default.component */ "./src/app/views/dashboard/dashboad-default/dashboad-default.component.ts");
/* harmony import */ var _dashboad_estudiante_dashboad_estudiante_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./dashboad-estudiante/dashboad-estudiante.component */ "./src/app/views/dashboard/dashboad-estudiante/dashboad-estudiante.component.ts");
/* harmony import */ var _dashboad_docente_dashboad_default_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./dashboad-docente/dashboad-default.component */ "./src/app/views/dashboard/dashboad-docente/dashboad-default.component.ts");
/* harmony import */ var _dashboard_ayudante_dashboad_default_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./dashboard-ayudante/dashboad-default.component */ "./src/app/views/dashboard/dashboard-ayudante/dashboad-default.component.ts");
/* harmony import */ var ngx_echarts__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ngx-echarts */ "./node_modules/ngx-echarts/__ivy_ngcc__/fesm5/ngx-echarts.js");
/* harmony import */ var src_app_shared_components_shared_components_module__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! src/app/shared/components/shared-components.module */ "./src/app/shared/components/shared-components.module.ts");
/* harmony import */ var _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @swimlane/ngx-datatable */ "./node_modules/@swimlane/ngx-datatable/__ivy_ngcc__/fesm5/swimlane-ngx-datatable.js");















var DashboardModule = /** @class */ (function () {
    function DashboardModule() {
    }
    DashboardModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: DashboardModule });
    DashboardModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function DashboardModule_Factory(t) { return new (t || DashboardModule)(); }, imports: [[
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"],
                src_app_shared_components_shared_components_module__WEBPACK_IMPORTED_MODULE_12__["SharedComponentsModule"],
                ngx_echarts__WEBPACK_IMPORTED_MODULE_11__["NgxEchartsModule"],
                _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_13__["NgxDatatableModule"],
                _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_4__["NgbModule"],
                _dashboard_routing_module__WEBPACK_IMPORTED_MODULE_6__["DashboardRoutingModule"],
                ngx_custom_validators__WEBPACK_IMPORTED_MODULE_2__["CustomFormsModule"],
                ngx_chips__WEBPACK_IMPORTED_MODULE_5__["TagInputModule"]
            ]] });
    return DashboardModule;
}());

(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](DashboardModule, { declarations: [_dashboad_default_dashboad_default_component__WEBPACK_IMPORTED_MODULE_7__["DashboadDefaultComponent"], _dashboad_estudiante_dashboad_estudiante_component__WEBPACK_IMPORTED_MODULE_8__["DashboadEstudianteComponent"], _dashboard_ayudante_dashboad_default_component__WEBPACK_IMPORTED_MODULE_10__["DashboadAyudanteComponent"], _dashboad_docente_dashboad_default_component__WEBPACK_IMPORTED_MODULE_9__["DashboadDocenteComponent"]], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"],
        src_app_shared_components_shared_components_module__WEBPACK_IMPORTED_MODULE_12__["SharedComponentsModule"],
        ngx_echarts__WEBPACK_IMPORTED_MODULE_11__["NgxEchartsModule"],
        _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_13__["NgxDatatableModule"],
        _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_4__["NgbModule"],
        _dashboard_routing_module__WEBPACK_IMPORTED_MODULE_6__["DashboardRoutingModule"],
        ngx_custom_validators__WEBPACK_IMPORTED_MODULE_2__["CustomFormsModule"],
        ngx_chips__WEBPACK_IMPORTED_MODULE_5__["TagInputModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](DashboardModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                imports: [
                    _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                    _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                    _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"],
                    src_app_shared_components_shared_components_module__WEBPACK_IMPORTED_MODULE_12__["SharedComponentsModule"],
                    ngx_echarts__WEBPACK_IMPORTED_MODULE_11__["NgxEchartsModule"],
                    _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_13__["NgxDatatableModule"],
                    _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_4__["NgbModule"],
                    _dashboard_routing_module__WEBPACK_IMPORTED_MODULE_6__["DashboardRoutingModule"],
                    ngx_custom_validators__WEBPACK_IMPORTED_MODULE_2__["CustomFormsModule"],
                    ngx_chips__WEBPACK_IMPORTED_MODULE_5__["TagInputModule"]
                ],
                declarations: [_dashboad_default_dashboad_default_component__WEBPACK_IMPORTED_MODULE_7__["DashboadDefaultComponent"], _dashboad_estudiante_dashboad_estudiante_component__WEBPACK_IMPORTED_MODULE_8__["DashboadEstudianteComponent"], _dashboard_ayudante_dashboad_default_component__WEBPACK_IMPORTED_MODULE_10__["DashboadAyudanteComponent"], _dashboad_docente_dashboad_default_component__WEBPACK_IMPORTED_MODULE_9__["DashboadDocenteComponent"]]
            }]
    }], null, null); })();


/***/ })

}]);
//# sourceMappingURL=views-dashboard-dashboard-module.js.map