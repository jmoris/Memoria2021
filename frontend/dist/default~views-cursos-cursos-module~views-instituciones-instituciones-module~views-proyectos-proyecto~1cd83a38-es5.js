function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }

function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~views-cursos-cursos-module~views-instituciones-instituciones-module~views-proyectos-proyecto~1cd83a38"], {
  /***/
  "./node_modules/ngx-custom-validators/__ivy_ngcc__/fesm2015/ngx-custom-validators.js":
  /*!*******************************************************************************************!*\
    !*** ./node_modules/ngx-custom-validators/__ivy_ngcc__/fesm2015/ngx-custom-validators.js ***!
    \*******************************************************************************************/

  /*! exports provided: CustomFormsModule, CustomValidators, ɵa, ɵb, ɵba, ɵbb, ɵbc, ɵbd, ɵbe, ɵbf, ɵbg, ɵbh, ɵbi, ɵbj, ɵbk, ɵbl, ɵbm, ɵbn, ɵbo, ɵbp, ɵbq, ɵbr, ɵbs, ɵbt, ɵbu, ɵbv, ɵbw, ɵbx, ɵby, ɵbz, ɵc, ɵd, ɵe, ɵf, ɵg, ɵh, ɵi, ɵj, ɵk, ɵl, ɵm, ɵn, ɵo, ɵp, ɵq, ɵr, ɵs, ɵt, ɵu, ɵv, ɵw, ɵx, ɵy, ɵz */

  /***/
  function node_modulesNgxCustomValidators__ivy_ngcc__Fesm2015NgxCustomValidatorsJs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "CustomFormsModule", function () {
      return CustomFormsModule;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "CustomValidators", function () {
      return CustomValidators;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ɵa", function () {
      return arrayLength;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ɵb", function () {
      return base64;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ɵba", function () {
      return ArrayLengthValidator;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ɵbb", function () {
      return Base64Validator;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ɵbc", function () {
      return CreditCardValidator;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ɵbd", function () {
      return DateValidator;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ɵbe", function () {
      return DateISOValidator;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ɵbf", function () {
      return DigitsValidator;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ɵbg", function () {
      return EmailValidator;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ɵbh", function () {
      return EqualValidator;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ɵbi", function () {
      return EqualToValidator;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ɵbj", function () {
      return GreaterThanValidator;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ɵbk", function () {
      return GreaterThanEqualValidator;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ɵbl", function () {
      return JSONValidator;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ɵbm", function () {
      return LessThanValidator;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ɵbn", function () {
      return LessThanEqualValidator;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ɵbo", function () {
      return MaxValidator;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ɵbp", function () {
      return MaxDateValidator;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ɵbq", function () {
      return MinValidator;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ɵbr", function () {
      return MinDateValidator;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ɵbs", function () {
      return NotEqualValidator;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ɵbt", function () {
      return NotEqualToValidator;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ɵbu", function () {
      return NumberValidator;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ɵbv", function () {
      return PropertyValidator;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ɵbw", function () {
      return RangeValidator;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ɵbx", function () {
      return RangeLengthValidator;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ɵby", function () {
      return UrlValidator;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ɵbz", function () {
      return UUIDValidator;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ɵc", function () {
      return creditCard;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ɵd", function () {
      return date;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ɵe", function () {
      return dateISO;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ɵf", function () {
      return digits;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ɵg", function () {
      return email;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ɵh", function () {
      return equal;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ɵi", function () {
      return equalTo;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ɵj", function () {
      return gt;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ɵk", function () {
      return gte;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ɵl", function () {
      return json;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ɵm", function () {
      return lt;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ɵn", function () {
      return lte;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ɵo", function () {
      return max;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ɵp", function () {
      return maxDate;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ɵq", function () {
      return min;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ɵr", function () {
      return minDate;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ɵs", function () {
      return notEqual;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ɵt", function () {
      return notEqualTo;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ɵu", function () {
      return number;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ɵv", function () {
      return property;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ɵw", function () {
      return range;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ɵx", function () {
      return rangeLength;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ɵy", function () {
      return url;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ɵz", function () {
      return uuid;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
    /* harmony import */


    var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/forms */
    "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");

    function isPresent(obj) {
      return obj !== undefined && obj !== null;
    }

    function isDate(obj) {
      try {
        var _date = new Date(obj);

        return !isNaN(_date.getTime());
      } catch (e) {
        return false;
      }
    }

    function parseDate(obj) {
      try {
        // Moment.js
        if (obj._d instanceof Date) {
          var d = obj._d;
          var month = +d.getMonth() + 1;
          var day = +d.getDate();
          return "".concat(d.getFullYear(), "-").concat(formatDayOrMonth(month), "-").concat(formatDayOrMonth(day));
        } // NgbDateStruct


        if (typeof obj === 'object' && obj.year != null && obj.month != null && obj.day != null) {
          var _month = +obj.month;

          var _day = +obj.day;

          return "".concat(obj.year, "-").concat(formatDayOrMonth(_month), "-").concat(formatDayOrMonth(_day));
        }
      } catch (e) {}

      return obj;
    }

    function formatDayOrMonth(month) {
      return month < 10 ? "0".concat(month) : month;
    }

    var arrayLength = function arrayLength(value) {
      return function (control) {
        if (isPresent(_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required(control))) {
          return null;
        }

        var obj = control.value;
        return Array.isArray(obj) && obj.length >= +value ? null : {
          arrayLength: {
            minLength: value
          }
        };
      };
    };

    var ARRAY_LENGTH_VALIDATOR = {
      provide: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NG_VALIDATORS"],
      useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["forwardRef"])(function () {
        return ArrayLengthValidator;
      }),
      multi: true
    };

    var ArrayLengthValidator =
    /*#__PURE__*/
    function () {
      function ArrayLengthValidator() {
        _classCallCheck(this, ArrayLengthValidator);
      }

      _createClass(ArrayLengthValidator, [{
        key: "ngOnInit",
        value: function ngOnInit() {
          this.validator = arrayLength(this.arrayLength);
        }
      }, {
        key: "ngOnChanges",
        value: function ngOnChanges(changes) {
          for (var key in changes) {
            if (key === 'arrayLength') {
              this.validator = arrayLength(changes[key].currentValue);

              if (this.onChange) {
                this.onChange();
              }
            }
          }
        }
      }, {
        key: "validate",
        value: function validate(c) {
          return this.validator(c);
        }
      }, {
        key: "registerOnValidatorChange",
        value: function registerOnValidatorChange(fn) {
          this.onChange = fn;
        }
      }]);

      return ArrayLengthValidator;
    }();

    ArrayLengthValidator.ɵfac = function ArrayLengthValidator_Factory(t) {
      return new (t || ArrayLengthValidator)();
    };

    ArrayLengthValidator.ɵdir = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineDirective"]({
      type: ArrayLengthValidator,
      selectors: [["", "arrayLength", "", "formControlName", ""], ["", "arrayLength", "", "formControl", ""], ["", "arrayLength", "", "ngModel", ""]],
      inputs: {
        arrayLength: "arrayLength"
      },
      features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵProvidersFeature"]([ARRAY_LENGTH_VALIDATOR]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵNgOnChangesFeature"]()]
    });
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()], ArrayLengthValidator.prototype, "arrayLength", void 0);

    var base64 = function base64(control) {
      if (isPresent(_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required(control))) {
        return null;
      }

      var v = control.value;
      return /^(?:[A-Z0-9+\/]{4})*(?:[A-Z0-9+\/]{2}==|[A-Z0-9+\/]{3}=|[A-Z0-9+\/]{4})$/i.test(v) ? null : {
        base64: true
      };
    };

    var BASE64_VALIDATOR = {
      provide: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NG_VALIDATORS"],
      useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["forwardRef"])(function () {
        return Base64Validator;
      }),
      multi: true
    };

    var Base64Validator =
    /*#__PURE__*/
    function () {
      function Base64Validator() {
        _classCallCheck(this, Base64Validator);
      }

      _createClass(Base64Validator, [{
        key: "validate",
        value: function validate(c) {
          return base64(c);
        }
      }]);

      return Base64Validator;
    }();

    Base64Validator.ɵfac = function Base64Validator_Factory(t) {
      return new (t || Base64Validator)();
    };

    Base64Validator.ɵdir = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineDirective"]({
      type: Base64Validator,
      selectors: [["", "base64", "", "formControlName", ""], ["", "base64", "", "formControl", ""], ["", "base64", "", "ngModel", ""]],
      features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵProvidersFeature"]([BASE64_VALIDATOR])]
    });

    var creditCard = function creditCard(control) {
      if (isPresent(_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required(control))) {
        return null;
      }

      var v = control.value;
      var sanitized = v.replace(/[^0-9]+/g, ''); // problem with chrome

      /* tslint:disable */

      if (!/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11}|(?:9792)\d{12})$/.test(sanitized)) {
        return {
          creditCard: true
        };
      }
      /* tslint:enable */


      var sum = 0;
      var digit;
      var tmpNum;
      var shouldDouble;

      for (var i = sanitized.length - 1; i >= 0; i--) {
        digit = sanitized.substring(i, i + 1);
        tmpNum = parseInt(digit, 10);

        if (shouldDouble) {
          tmpNum *= 2;

          if (tmpNum >= 10) {
            sum += tmpNum % 10 + 1;
          } else {
            sum += tmpNum;
          }
        } else {
          sum += tmpNum;
        }

        shouldDouble = !shouldDouble;
      }

      if (Boolean(sum % 10 === 0 ? sanitized : false)) {
        return null;
      }

      return {
        creditCard: true
      };
    };

    var CREDIT_CARD_VALIDATOR = {
      provide: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NG_VALIDATORS"],
      useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["forwardRef"])(function () {
        return CreditCardValidator;
      }),
      multi: true
    };

    var CreditCardValidator =
    /*#__PURE__*/
    function () {
      function CreditCardValidator() {
        _classCallCheck(this, CreditCardValidator);
      }

      _createClass(CreditCardValidator, [{
        key: "validate",
        value: function validate(c) {
          return creditCard(c);
        }
      }]);

      return CreditCardValidator;
    }();

    CreditCardValidator.ɵfac = function CreditCardValidator_Factory(t) {
      return new (t || CreditCardValidator)();
    };

    CreditCardValidator.ɵdir = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineDirective"]({
      type: CreditCardValidator,
      selectors: [["", "creditCard", "", "formControlName", ""], ["", "creditCard", "", "formControl", ""], ["", "creditCard", "", "ngModel", ""]],
      features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵProvidersFeature"]([CREDIT_CARD_VALIDATOR])]
    });

    var dateISO = function dateISO(control) {
      if (isPresent(_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required(control))) {
        return null;
      }

      var v = control.value;
      return /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(v) ? null : {
        dateISO: true
      };
    };

    var DATE_ISO_VALIDATOR = {
      provide: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NG_VALIDATORS"],
      useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["forwardRef"])(function () {
        return DateISOValidator;
      }),
      multi: true
    };

    var DateISOValidator =
    /*#__PURE__*/
    function () {
      function DateISOValidator() {
        _classCallCheck(this, DateISOValidator);
      }

      _createClass(DateISOValidator, [{
        key: "validate",
        value: function validate(c) {
          return dateISO(c);
        }
      }]);

      return DateISOValidator;
    }();

    DateISOValidator.ɵfac = function DateISOValidator_Factory(t) {
      return new (t || DateISOValidator)();
    };

    DateISOValidator.ɵdir = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineDirective"]({
      type: DateISOValidator,
      selectors: [["", "dateISO", "", "formControlName", ""], ["", "dateISO", "", "formControl", ""], ["", "dateISO", "", "ngModel", ""]],
      features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵProvidersFeature"]([DATE_ISO_VALIDATOR])]
    });

    var date = function date(control) {
      if (isPresent(_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required(control))) {
        return null;
      }

      var v = control.value;
      v = parseDate(v);
      return isDate(v) ? null : {
        date: true
      };
    };

    var DATE_VALIDATOR = {
      provide: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NG_VALIDATORS"],
      useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["forwardRef"])(function () {
        return DateValidator;
      }),
      multi: true
    };

    var DateValidator =
    /*#__PURE__*/
    function () {
      function DateValidator() {
        _classCallCheck(this, DateValidator);
      }

      _createClass(DateValidator, [{
        key: "validate",
        value: function validate(c) {
          return date(c);
        }
      }]);

      return DateValidator;
    }();

    DateValidator.ɵfac = function DateValidator_Factory(t) {
      return new (t || DateValidator)();
    };

    DateValidator.ɵdir = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineDirective"]({
      type: DateValidator,
      selectors: [["", "date", "", "formControlName", ""], ["", "date", "", "formControl", ""], ["", "date", "", "ngModel", ""]],
      features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵProvidersFeature"]([DATE_VALIDATOR])]
    });

    var digits = function digits(control) {
      if (isPresent(_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required(control))) {
        return null;
      }

      var v = control.value;
      return /^\d+$/.test(v) ? null : {
        digits: true
      };
    };

    var DIGITS_VALIDATOR = {
      provide: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NG_VALIDATORS"],
      useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["forwardRef"])(function () {
        return DigitsValidator;
      }),
      multi: true
    };

    var DigitsValidator =
    /*#__PURE__*/
    function () {
      function DigitsValidator() {
        _classCallCheck(this, DigitsValidator);
      }

      _createClass(DigitsValidator, [{
        key: "validate",
        value: function validate(c) {
          return digits(c);
        }
      }]);

      return DigitsValidator;
    }();

    DigitsValidator.ɵfac = function DigitsValidator_Factory(t) {
      return new (t || DigitsValidator)();
    };

    DigitsValidator.ɵdir = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineDirective"]({
      type: DigitsValidator,
      selectors: [["", "digits", "", "formControlName", ""], ["", "digits", "", "formControl", ""], ["", "digits", "", "ngModel", ""]],
      features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵProvidersFeature"]([DIGITS_VALIDATOR])]
    });

    var email = function email(control) {
      if (isPresent(_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required(control))) {
        return null;
      }

      var v = control.value;
      /* tslint:disable */

      return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) ? null : {
        'email': true
      };
      /* tslint:enable */
    };

    var EMAIL_VALIDATOR = {
      provide: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NG_VALIDATORS"],
      useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["forwardRef"])(function () {
        return EmailValidator;
      }),
      multi: true
    };

    var EmailValidator =
    /*#__PURE__*/
    function () {
      function EmailValidator() {
        _classCallCheck(this, EmailValidator);
      }

      _createClass(EmailValidator, [{
        key: "validate",
        value: function validate(c) {
          return email(c);
        }
      }]);

      return EmailValidator;
    }();

    EmailValidator.ɵfac = function EmailValidator_Factory(t) {
      return new (t || EmailValidator)();
    };

    EmailValidator.ɵdir = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineDirective"]({
      type: EmailValidator,
      selectors: [["", "ngvemail", "", "formControlName", ""], ["", "ngvemail", "", "formControl", ""], ["", "ngvemail", "", "ngModel", ""]],
      features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵProvidersFeature"]([EMAIL_VALIDATOR])]
    });

    var equalTo = function equalTo(equalControl) {
      var subscribe = false;
      return function (control) {
        if (!subscribe) {
          subscribe = true;
          equalControl.valueChanges.subscribe(function () {
            control.updateValueAndValidity();
          });
        }

        var v = control.value;
        return equalControl.value === v ? null : {
          equalTo: {
            control: equalControl,
            value: equalControl.value
          }
        };
      };
    };

    var EQUAL_TO_VALIDATOR = {
      provide: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NG_VALIDATORS"],
      useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["forwardRef"])(function () {
        return EqualToValidator;
      }),
      multi: true
    };

    var EqualToValidator =
    /*#__PURE__*/
    function () {
      function EqualToValidator() {
        _classCallCheck(this, EqualToValidator);
      }

      _createClass(EqualToValidator, [{
        key: "ngOnInit",
        value: function ngOnInit() {
          this.validator = equalTo(this.equalTo);
        }
      }, {
        key: "validate",
        value: function validate(c) {
          return this.validator(c);
        }
      }]);

      return EqualToValidator;
    }();

    EqualToValidator.ɵfac = function EqualToValidator_Factory(t) {
      return new (t || EqualToValidator)();
    };

    EqualToValidator.ɵdir = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineDirective"]({
      type: EqualToValidator,
      selectors: [["", "equalTo", "", "formControlName", ""], ["", "equalTo", "", "formControl", ""], ["", "equalTo", "", "ngModel", ""]],
      inputs: {
        equalTo: "equalTo"
      },
      features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵProvidersFeature"]([EQUAL_TO_VALIDATOR])]
    });
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()], EqualToValidator.prototype, "equalTo", void 0);

    var equal = function equal(val) {
      return function (control) {
        if (isPresent(_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required(control))) {
          return null;
        }

        var v = control.value;
        return val === v ? null : {
          equal: {
            value: val
          }
        };
      };
    };

    var EQUAL_VALIDATOR = {
      provide: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NG_VALIDATORS"],
      useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["forwardRef"])(function () {
        return EqualValidator;
      }),
      multi: true
    };

    var EqualValidator =
    /*#__PURE__*/
    function () {
      function EqualValidator() {
        _classCallCheck(this, EqualValidator);
      }

      _createClass(EqualValidator, [{
        key: "ngOnInit",
        value: function ngOnInit() {
          this.validator = equal(this.equal);
        }
      }, {
        key: "ngOnChanges",
        value: function ngOnChanges(changes) {
          for (var key in changes) {
            if (key === 'equal') {
              this.validator = equal(changes[key].currentValue);

              if (this.onChange) {
                this.onChange();
              }
            }
          }
        }
      }, {
        key: "validate",
        value: function validate(c) {
          return this.validator(c);
        }
      }, {
        key: "registerOnValidatorChange",
        value: function registerOnValidatorChange(fn) {
          this.onChange = fn;
        }
      }]);

      return EqualValidator;
    }();

    EqualValidator.ɵfac = function EqualValidator_Factory(t) {
      return new (t || EqualValidator)();
    };

    EqualValidator.ɵdir = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineDirective"]({
      type: EqualValidator,
      selectors: [["", "equal", "", "formControlName", ""], ["", "equal", "", "formControl", ""], ["", "equal", "", "ngModel", ""]],
      inputs: {
        equal: "equal"
      },
      features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵProvidersFeature"]([EQUAL_VALIDATOR]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵNgOnChangesFeature"]()]
    });
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()], EqualValidator.prototype, "equal", void 0);

    var gte = function gte(value) {
      return function (control) {
        if (!isPresent(value)) {
          return null;
        }

        if (isPresent(_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required(control))) {
          return null;
        }

        var v = +control.value;
        return v >= +value ? null : {
          gte: {
            value: value
          }
        };
      };
    };

    var GREATER_THAN_EQUAL_VALIDATOR = {
      provide: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NG_VALIDATORS"],
      useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["forwardRef"])(function () {
        return GreaterThanEqualValidator;
      }),
      multi: true
    };

    var GreaterThanEqualValidator =
    /*#__PURE__*/
    function () {
      function GreaterThanEqualValidator() {
        _classCallCheck(this, GreaterThanEqualValidator);
      }

      _createClass(GreaterThanEqualValidator, [{
        key: "ngOnInit",
        value: function ngOnInit() {
          this.validator = gte(this.gte);
        }
      }, {
        key: "ngOnChanges",
        value: function ngOnChanges(changes) {
          for (var key in changes) {
            if (key === 'gte') {
              this.validator = gte(changes[key].currentValue);

              if (this.onChange) {
                this.onChange();
              }
            }
          }
        }
      }, {
        key: "validate",
        value: function validate(c) {
          return this.validator(c);
        }
      }, {
        key: "registerOnValidatorChange",
        value: function registerOnValidatorChange(fn) {
          this.onChange = fn;
        }
      }]);

      return GreaterThanEqualValidator;
    }();

    GreaterThanEqualValidator.ɵfac = function GreaterThanEqualValidator_Factory(t) {
      return new (t || GreaterThanEqualValidator)();
    };

    GreaterThanEqualValidator.ɵdir = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineDirective"]({
      type: GreaterThanEqualValidator,
      selectors: [["", "gte", "", "formControlName", ""], ["", "gte", "", "formControl", ""], ["", "gte", "", "ngModel", ""]],
      inputs: {
        gte: "gte"
      },
      features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵProvidersFeature"]([GREATER_THAN_EQUAL_VALIDATOR]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵNgOnChangesFeature"]()]
    });
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()], GreaterThanEqualValidator.prototype, "gte", void 0);

    var gt = function gt(value) {
      return function (control) {
        if (!isPresent(value)) {
          return null;
        }

        if (isPresent(_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required(control))) {
          return null;
        }

        var v = +control.value;
        return v > +value ? null : {
          gt: {
            value: value
          }
        };
      };
    };

    var GREATER_THAN_VALIDATOR = {
      provide: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NG_VALIDATORS"],
      useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["forwardRef"])(function () {
        return GreaterThanValidator;
      }),
      multi: true
    };

    var GreaterThanValidator =
    /*#__PURE__*/
    function () {
      function GreaterThanValidator() {
        _classCallCheck(this, GreaterThanValidator);
      }

      _createClass(GreaterThanValidator, [{
        key: "ngOnInit",
        value: function ngOnInit() {
          this.validator = gt(this.gt);
        }
      }, {
        key: "ngOnChanges",
        value: function ngOnChanges(changes) {
          for (var key in changes) {
            if (key === 'gt') {
              this.validator = gt(changes[key].currentValue);

              if (this.onChange) {
                this.onChange();
              }
            }
          }
        }
      }, {
        key: "validate",
        value: function validate(c) {
          return this.validator(c);
        }
      }, {
        key: "registerOnValidatorChange",
        value: function registerOnValidatorChange(fn) {
          this.onChange = fn;
        }
      }]);

      return GreaterThanValidator;
    }();

    GreaterThanValidator.ɵfac = function GreaterThanValidator_Factory(t) {
      return new (t || GreaterThanValidator)();
    };

    GreaterThanValidator.ɵdir = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineDirective"]({
      type: GreaterThanValidator,
      selectors: [["", "gt", "", "formControlName", ""], ["", "gt", "", "formControl", ""], ["", "gt", "", "ngModel", ""]],
      inputs: {
        gt: "gt"
      },
      features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵProvidersFeature"]([GREATER_THAN_VALIDATOR]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵNgOnChangesFeature"]()]
    });
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()], GreaterThanValidator.prototype, "gt", void 0);

    var json = function json(control) {
      if (isPresent(_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required(control))) {
        return null;
      }

      var v = control.value;

      try {
        var obj = JSON.parse(v);

        if (Boolean(obj) && typeof obj === 'object') {
          return null;
        }
      } catch (e) {}

      return {
        json: true
      };
    };

    var JSON_VALIDATOR = {
      provide: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NG_VALIDATORS"],
      useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["forwardRef"])(function () {
        return JSONValidator;
      }),
      multi: true
    };

    var JSONValidator =
    /*#__PURE__*/
    function () {
      function JSONValidator() {
        _classCallCheck(this, JSONValidator);
      }

      _createClass(JSONValidator, [{
        key: "validate",
        value: function validate(c) {
          return json(c);
        }
      }]);

      return JSONValidator;
    }();

    JSONValidator.ɵfac = function JSONValidator_Factory(t) {
      return new (t || JSONValidator)();
    };

    JSONValidator.ɵdir = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineDirective"]({
      type: JSONValidator,
      selectors: [["", "json", "", "formControlName", ""], ["", "json", "", "formControl", ""], ["", "json", "", "ngModel", ""]],
      features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵProvidersFeature"]([JSON_VALIDATOR])]
    });

    var lte = function lte(value) {
      return function (control) {
        if (!isPresent(value)) {
          return null;
        }

        if (isPresent(_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required(control))) {
          return null;
        }

        var v = +control.value;
        return v <= +value ? null : {
          lte: {
            value: value
          }
        };
      };
    };

    var LESS_THAN_EQUAL_VALIDATOR = {
      provide: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NG_VALIDATORS"],
      useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["forwardRef"])(function () {
        return LessThanEqualValidator;
      }),
      multi: true
    };

    var LessThanEqualValidator =
    /*#__PURE__*/
    function () {
      function LessThanEqualValidator() {
        _classCallCheck(this, LessThanEqualValidator);
      }

      _createClass(LessThanEqualValidator, [{
        key: "ngOnInit",
        value: function ngOnInit() {
          this.validator = lte(this.lte);
        }
      }, {
        key: "ngOnChanges",
        value: function ngOnChanges(changes) {
          for (var key in changes) {
            if (key === 'lte') {
              this.validator = lte(changes[key].currentValue);

              if (this.onChange) {
                this.onChange();
              }
            }
          }
        }
      }, {
        key: "validate",
        value: function validate(c) {
          return this.validator(c);
        }
      }, {
        key: "registerOnValidatorChange",
        value: function registerOnValidatorChange(fn) {
          this.onChange = fn;
        }
      }]);

      return LessThanEqualValidator;
    }();

    LessThanEqualValidator.ɵfac = function LessThanEqualValidator_Factory(t) {
      return new (t || LessThanEqualValidator)();
    };

    LessThanEqualValidator.ɵdir = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineDirective"]({
      type: LessThanEqualValidator,
      selectors: [["", "lte", "", "formControlName", ""], ["", "lte", "", "formControl", ""], ["", "lte", "", "ngModel", ""]],
      inputs: {
        lte: "lte"
      },
      features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵProvidersFeature"]([LESS_THAN_EQUAL_VALIDATOR]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵNgOnChangesFeature"]()]
    });
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()], LessThanEqualValidator.prototype, "lte", void 0);

    var lt = function lt(value) {
      return function (control) {
        if (!isPresent(value)) {
          return null;
        }

        if (isPresent(_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required(control))) {
          return null;
        }

        var v = +control.value;
        return v < +value ? null : {
          lt: {
            value: value
          }
        };
      };
    };

    var LESS_THAN_VALIDATOR = {
      provide: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NG_VALIDATORS"],
      useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["forwardRef"])(function () {
        return LessThanValidator;
      }),
      multi: true
    };

    var LessThanValidator =
    /*#__PURE__*/
    function () {
      function LessThanValidator() {
        _classCallCheck(this, LessThanValidator);
      }

      _createClass(LessThanValidator, [{
        key: "ngOnInit",
        value: function ngOnInit() {
          this.validator = lt(this.lt);
        }
      }, {
        key: "ngOnChanges",
        value: function ngOnChanges(changes) {
          for (var key in changes) {
            if (key === 'lt') {
              this.validator = lt(changes[key].currentValue);

              if (this.onChange) {
                this.onChange();
              }
            }
          }
        }
      }, {
        key: "validate",
        value: function validate(c) {
          return this.validator(c);
        }
      }, {
        key: "registerOnValidatorChange",
        value: function registerOnValidatorChange(fn) {
          this.onChange = fn;
        }
      }]);

      return LessThanValidator;
    }();

    LessThanValidator.ɵfac = function LessThanValidator_Factory(t) {
      return new (t || LessThanValidator)();
    };

    LessThanValidator.ɵdir = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineDirective"]({
      type: LessThanValidator,
      selectors: [["", "lt", "", "formControlName", ""], ["", "lt", "", "formControl", ""], ["", "lt", "", "ngModel", ""]],
      inputs: {
        lt: "lt"
      },
      features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵProvidersFeature"]([LESS_THAN_VALIDATOR]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵNgOnChangesFeature"]()]
    });
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()], LessThanValidator.prototype, "lt", void 0);

    var maxDate = function maxDate(maxInput) {
      var value;
      var subscribe = false;
      var maxValue = maxInput;
      var isForm = maxInput instanceof _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"] || maxInput instanceof _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgModel"];
      return function (control) {
        if (!subscribe && isForm) {
          subscribe = true;
          maxInput.valueChanges.subscribe(function () {
            control.updateValueAndValidity();
          });
        }

        if (isForm) {
          maxValue = maxInput.value;
        }

        value = parseDate(maxValue);

        if (!isDate(value) && !(value instanceof Function)) {
          if (value == null) {
            return null;
          } else if (isForm) {
            return {
              maxDate: {
                error: 'maxDate is invalid'
              }
            };
          } else {
            throw Error('maxDate value must be or return a formatted date');
          }
        }

        if (isPresent(_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required(control))) {
          return null;
        }

        var d = new Date(parseDate(control.value)).getTime();

        if (!isDate(d)) {
          return {
            value: true
          };
        }

        if (value instanceof Function) {
          value = value();
        }

        return d <= new Date(value).getTime() ? null : isForm ? {
          maxDate: {
            control: maxInput,
            value: maxInput.value
          }
        } : {
          maxDate: {
            value: maxValue,
            control: undefined
          }
        };
      };
    };

    var MAX_DATE_VALIDATOR = {
      provide: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NG_VALIDATORS"],
      useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["forwardRef"])(function () {
        return MaxDateValidator;
      }),
      multi: true
    };

    var MaxDateValidator =
    /*#__PURE__*/
    function () {
      function MaxDateValidator() {
        _classCallCheck(this, MaxDateValidator);
      }

      _createClass(MaxDateValidator, [{
        key: "ngOnInit",
        value: function ngOnInit() {
          this.validator = maxDate(this.maxDate);
        }
      }, {
        key: "ngOnChanges",
        value: function ngOnChanges(changes) {
          for (var key in changes) {
            if (key === 'maxDate') {
              this.validator = maxDate(changes[key].currentValue);

              if (this.onChange) {
                this.onChange();
              }
            }
          }
        }
      }, {
        key: "validate",
        value: function validate(c) {
          return this.validator(c);
        }
      }, {
        key: "registerOnValidatorChange",
        value: function registerOnValidatorChange(fn) {
          this.onChange = fn;
        }
      }]);

      return MaxDateValidator;
    }();

    MaxDateValidator.ɵfac = function MaxDateValidator_Factory(t) {
      return new (t || MaxDateValidator)();
    };

    MaxDateValidator.ɵdir = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineDirective"]({
      type: MaxDateValidator,
      selectors: [["", "maxDate", "", "formControlName", ""], ["", "maxDate", "", "formControl", ""], ["", "maxDate", "", "ngModel", ""]],
      inputs: {
        maxDate: "maxDate"
      },
      features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵProvidersFeature"]([MAX_DATE_VALIDATOR]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵNgOnChangesFeature"]()]
    });
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()], MaxDateValidator.prototype, "maxDate", void 0);

    var max = function max(value) {
      return function (control) {
        if (!isPresent(value)) {
          return null;
        }

        if (isPresent(_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required(control))) {
          return null;
        }

        var v = +control.value;
        return v <= +value ? null : {
          max: {
            value: value
          }
        };
      };
    };

    var MAX_VALIDATOR = {
      provide: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NG_VALIDATORS"],
      useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["forwardRef"])(function () {
        return MaxValidator;
      }),
      multi: true
    };

    var MaxValidator =
    /*#__PURE__*/
    function () {
      function MaxValidator() {
        _classCallCheck(this, MaxValidator);
      }

      _createClass(MaxValidator, [{
        key: "ngOnInit",
        value: function ngOnInit() {
          this.validator = max(this.max);
        }
      }, {
        key: "ngOnChanges",
        value: function ngOnChanges(changes) {
          for (var key in changes) {
            if (key === 'max') {
              this.validator = max(changes[key].currentValue);

              if (this.onChange) {
                this.onChange();
              }
            }
          }
        }
      }, {
        key: "validate",
        value: function validate(c) {
          return this.validator(c);
        }
      }, {
        key: "registerOnValidatorChange",
        value: function registerOnValidatorChange(fn) {
          this.onChange = fn;
        }
      }]);

      return MaxValidator;
    }();

    MaxValidator.ɵfac = function MaxValidator_Factory(t) {
      return new (t || MaxValidator)();
    };

    MaxValidator.ɵdir = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineDirective"]({
      type: MaxValidator,
      selectors: [["", "max", "", "formControlName", ""], ["", "max", "", "formControl", ""], ["", "max", "", "ngModel", ""]],
      inputs: {
        max: "max"
      },
      features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵProvidersFeature"]([MAX_VALIDATOR]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵNgOnChangesFeature"]()]
    });
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()], MaxValidator.prototype, "max", void 0);

    var minDate = function minDate(minInput) {
      var value;
      var subscribe = false;
      var minValue = minInput;
      var isForm = minInput instanceof _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"] || minInput instanceof _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgModel"];
      return function (control) {
        if (!subscribe && isForm) {
          subscribe = true;
          minInput.valueChanges.subscribe(function () {
            control.updateValueAndValidity();
          });
        }

        if (isForm) {
          minValue = minInput.value;
        }

        value = parseDate(minValue);

        if (!isDate(value) && !(value instanceof Function)) {
          if (value == null) {
            return null;
          } else if (isForm) {
            return {
              minDate: {
                error: 'minDate is invalid'
              }
            };
          } else {
            throw Error('minDate value must be or return a formatted date');
          }
        }

        if (isPresent(_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required(control))) {
          return null;
        }

        var d = new Date(parseDate(control.value)).getTime();

        if (!isDate(d)) {
          return {
            value: true
          };
        }

        if (value instanceof Function) {
          value = value();
        }

        return d >= new Date(value).getTime() ? null : isForm ? {
          minDate: {
            control: minInput,
            value: minInput.value
          }
        } : {
          minDate: {
            value: minValue,
            control: undefined
          }
        };
      };
    };

    var MIN_DATE_VALIDATOR = {
      provide: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NG_VALIDATORS"],
      useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["forwardRef"])(function () {
        return MinDateValidator;
      }),
      multi: true
    };

    var MinDateValidator =
    /*#__PURE__*/
    function () {
      function MinDateValidator() {
        _classCallCheck(this, MinDateValidator);
      }

      _createClass(MinDateValidator, [{
        key: "ngOnInit",
        value: function ngOnInit() {
          this.validator = minDate(this.minDate);
        }
      }, {
        key: "ngOnChanges",
        value: function ngOnChanges(changes) {
          for (var key in changes) {
            if (key === 'minDate') {
              this.validator = minDate(changes[key].currentValue);

              if (this.onChange) {
                this.onChange();
              }
            }
          }
        }
      }, {
        key: "validate",
        value: function validate(c) {
          return this.validator(c);
        }
      }, {
        key: "registerOnValidatorChange",
        value: function registerOnValidatorChange(fn) {
          this.onChange = fn;
        }
      }]);

      return MinDateValidator;
    }();

    MinDateValidator.ɵfac = function MinDateValidator_Factory(t) {
      return new (t || MinDateValidator)();
    };

    MinDateValidator.ɵdir = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineDirective"]({
      type: MinDateValidator,
      selectors: [["", "minDate", "", "formControlName", ""], ["", "minDate", "", "formControl", ""], ["", "minDate", "", "ngModel", ""]],
      inputs: {
        minDate: "minDate"
      },
      features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵProvidersFeature"]([MIN_DATE_VALIDATOR]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵNgOnChangesFeature"]()]
    });
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()], MinDateValidator.prototype, "minDate", void 0);

    var min = function min(value) {
      return function (control) {
        if (!isPresent(value)) {
          return null;
        }

        if (isPresent(_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required(control))) {
          return null;
        }

        var v = +control.value;
        return v >= +value ? null : {
          min: {
            value: value
          }
        };
      };
    };

    var MIN_VALIDATOR = {
      provide: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NG_VALIDATORS"],
      useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["forwardRef"])(function () {
        return MinValidator;
      }),
      multi: true
    };

    var MinValidator =
    /*#__PURE__*/
    function () {
      function MinValidator() {
        _classCallCheck(this, MinValidator);
      }

      _createClass(MinValidator, [{
        key: "ngOnInit",
        value: function ngOnInit() {
          this.validator = min(this.min);
        }
      }, {
        key: "ngOnChanges",
        value: function ngOnChanges(changes) {
          for (var key in changes) {
            if (key === 'min') {
              this.validator = min(changes[key].currentValue);

              if (this.onChange) {
                this.onChange();
              }
            }
          }
        }
      }, {
        key: "validate",
        value: function validate(c) {
          return this.validator(c);
        }
      }, {
        key: "registerOnValidatorChange",
        value: function registerOnValidatorChange(fn) {
          this.onChange = fn;
        }
      }]);

      return MinValidator;
    }();

    MinValidator.ɵfac = function MinValidator_Factory(t) {
      return new (t || MinValidator)();
    };

    MinValidator.ɵdir = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineDirective"]({
      type: MinValidator,
      selectors: [["", "min", "", "formControlName", ""], ["", "min", "", "formControl", ""], ["", "min", "", "ngModel", ""]],
      inputs: {
        min: "min"
      },
      features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵProvidersFeature"]([MIN_VALIDATOR]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵNgOnChangesFeature"]()]
    });
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()], MinValidator.prototype, "min", void 0);

    var notEqualTo = function notEqualTo(notEqualControl) {
      var subscribe = false;
      return function (control) {
        if (!subscribe) {
          subscribe = true;
          notEqualControl.valueChanges.subscribe(function () {
            control.updateValueAndValidity();
          });
        }

        var v = control.value;

        if (notEqualControl.value == null && v == null) {
          return null;
        }

        return notEqualControl.value !== v ? null : {
          notEqualTo: {
            control: notEqualControl,
            value: notEqualControl.value
          }
        };
      };
    };

    var NOT_EQUAL_TO_VALIDATOR = {
      provide: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NG_VALIDATORS"],
      useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["forwardRef"])(function () {
        return NotEqualToValidator;
      }),
      multi: true
    };

    var NotEqualToValidator =
    /*#__PURE__*/
    function () {
      function NotEqualToValidator() {
        _classCallCheck(this, NotEqualToValidator);
      }

      _createClass(NotEqualToValidator, [{
        key: "ngOnInit",
        value: function ngOnInit() {
          this.validator = notEqualTo(this.notEqualTo);
        }
      }, {
        key: "validate",
        value: function validate(c) {
          return this.validator(c);
        }
      }]);

      return NotEqualToValidator;
    }();

    NotEqualToValidator.ɵfac = function NotEqualToValidator_Factory(t) {
      return new (t || NotEqualToValidator)();
    };

    NotEqualToValidator.ɵdir = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineDirective"]({
      type: NotEqualToValidator,
      selectors: [["", "notEqualTo", "", "formControlName", ""], ["", "notEqualTo", "", "formControl", ""], ["", "notEqualTo", "", "ngModel", ""]],
      inputs: {
        notEqualTo: "notEqualTo"
      },
      features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵProvidersFeature"]([NOT_EQUAL_TO_VALIDATOR])]
    });
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()], NotEqualToValidator.prototype, "notEqualTo", void 0);

    var notEqual = function notEqual(val) {
      return function (control) {
        if (isPresent(_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required(control))) {
          return null;
        }

        var v = control.value;
        return val !== v ? null : {
          notEqual: {
            value: val
          }
        };
      };
    };

    var NOT_EQUAL_VALIDATOR = {
      provide: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NG_VALIDATORS"],
      useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["forwardRef"])(function () {
        return NotEqualValidator;
      }),
      multi: true
    };

    var NotEqualValidator =
    /*#__PURE__*/
    function () {
      function NotEqualValidator() {
        _classCallCheck(this, NotEqualValidator);
      }

      _createClass(NotEqualValidator, [{
        key: "ngOnInit",
        value: function ngOnInit() {
          this.validator = notEqual(this.notEqual);
        }
      }, {
        key: "ngOnChanges",
        value: function ngOnChanges(changes) {
          for (var key in changes) {
            if (key === 'notEqual') {
              this.validator = notEqual(changes[key].currentValue);

              if (this.onChange) {
                this.onChange();
              }
            }
          }
        }
      }, {
        key: "validate",
        value: function validate(c) {
          return this.validator(c);
        }
      }, {
        key: "registerOnValidatorChange",
        value: function registerOnValidatorChange(fn) {
          this.onChange = fn;
        }
      }]);

      return NotEqualValidator;
    }();

    NotEqualValidator.ɵfac = function NotEqualValidator_Factory(t) {
      return new (t || NotEqualValidator)();
    };

    NotEqualValidator.ɵdir = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineDirective"]({
      type: NotEqualValidator,
      selectors: [["", "notEqual", "", "formControlName", ""], ["", "notEqual", "", "formControl", ""], ["", "notEqual", "", "ngModel", ""]],
      inputs: {
        notEqual: "notEqual"
      },
      features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵProvidersFeature"]([NOT_EQUAL_VALIDATOR]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵNgOnChangesFeature"]()]
    });
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()], NotEqualValidator.prototype, "notEqual", void 0);

    var number = function number(control) {
      if (isPresent(_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required(control))) {
        return null;
      }

      var v = control.value;
      return /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(v) ? null : {
        'number': true
      };
    };

    var NUMBER_VALIDATOR = {
      provide: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NG_VALIDATORS"],
      useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["forwardRef"])(function () {
        return NumberValidator;
      }),
      multi: true
    };

    var NumberValidator =
    /*#__PURE__*/
    function () {
      function NumberValidator() {
        _classCallCheck(this, NumberValidator);
      }

      _createClass(NumberValidator, [{
        key: "validate",
        value: function validate(c) {
          return number(c);
        }
      }]);

      return NumberValidator;
    }();

    NumberValidator.ɵfac = function NumberValidator_Factory(t) {
      return new (t || NumberValidator)();
    };

    NumberValidator.ɵdir = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineDirective"]({
      type: NumberValidator,
      selectors: [["", "number", "", "formControlName", ""], ["", "number", "", "formControl", ""], ["", "number", "", "ngModel", ""]],
      features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵProvidersFeature"]([NUMBER_VALIDATOR])]
    });

    var property = function property(value) {
      return function (control) {
        if (isPresent(_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required(control))) {
          return null;
        }

        var properties = value.split(',');
        var obj = control.value;
        var isValid = true;

        var _iterator = _createForOfIteratorHelper(properties),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var prop = _step.value;

            if (obj[prop] == null) {
              isValid = false;
              break;
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }

        return isValid ? null : {
          hasProperty: {
            value: value
          }
        };
      };
    };

    var PROPERTY_VALIDATOR = {
      provide: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NG_VALIDATORS"],
      useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["forwardRef"])(function () {
        return PropertyValidator;
      }),
      multi: true
    };

    var PropertyValidator =
    /*#__PURE__*/
    function () {
      function PropertyValidator() {
        _classCallCheck(this, PropertyValidator);
      }

      _createClass(PropertyValidator, [{
        key: "ngOnInit",
        value: function ngOnInit() {
          this.validator = property(this.property);
        }
      }, {
        key: "ngOnChanges",
        value: function ngOnChanges(changes) {
          for (var key in changes) {
            if (key === 'property') {
              this.validator = property(changes[key].currentValue);

              if (this.onChange) {
                this.onChange();
              }
            }
          }
        }
      }, {
        key: "validate",
        value: function validate(c) {
          return this.validator(c);
        }
      }, {
        key: "registerOnValidatorChange",
        value: function registerOnValidatorChange(fn) {
          this.onChange = fn;
        }
      }]);

      return PropertyValidator;
    }();

    PropertyValidator.ɵfac = function PropertyValidator_Factory(t) {
      return new (t || PropertyValidator)();
    };

    PropertyValidator.ɵdir = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineDirective"]({
      type: PropertyValidator,
      selectors: [["", "property", "", "formControlName", ""], ["", "property", "", "formControl", ""], ["", "property", "", "ngModel", ""]],
      inputs: {
        property: "property"
      },
      features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵProvidersFeature"]([PROPERTY_VALIDATOR]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵNgOnChangesFeature"]()]
    });
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()], PropertyValidator.prototype, "property", void 0);

    var rangeLength = function rangeLength(value) {
      return function (control) {
        if (!isPresent(value)) {
          return null;
        }

        if (isPresent(_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required(control))) {
          return null;
        }

        var v = control.value;
        return v.length >= value[0] && v.length <= value[1] ? null : {
          rangeLength: {
            value: value
          }
        };
      };
    };

    var RANGE_LENGTH_VALIDATOR = {
      provide: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NG_VALIDATORS"],
      useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["forwardRef"])(function () {
        return RangeLengthValidator;
      }),
      multi: true
    };

    var RangeLengthValidator =
    /*#__PURE__*/
    function () {
      function RangeLengthValidator() {
        _classCallCheck(this, RangeLengthValidator);
      }

      _createClass(RangeLengthValidator, [{
        key: "ngOnInit",
        value: function ngOnInit() {
          this.validator = rangeLength(this.rangeLength);
        }
      }, {
        key: "ngOnChanges",
        value: function ngOnChanges(changes) {
          for (var key in changes) {
            if (key === 'rangeLength') {
              this.validator = rangeLength(changes[key].currentValue);

              if (this.onChange) {
                this.onChange();
              }
            }
          }
        }
      }, {
        key: "validate",
        value: function validate(c) {
          return this.validator(c);
        }
      }, {
        key: "registerOnValidatorChange",
        value: function registerOnValidatorChange(fn) {
          this.onChange = fn;
        }
      }]);

      return RangeLengthValidator;
    }();

    RangeLengthValidator.ɵfac = function RangeLengthValidator_Factory(t) {
      return new (t || RangeLengthValidator)();
    };

    RangeLengthValidator.ɵdir = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineDirective"]({
      type: RangeLengthValidator,
      selectors: [["", "rangeLength", "", "formControlName", ""], ["", "rangeLength", "", "formControl", ""], ["", "rangeLength", "", "ngModel", ""]],
      inputs: {
        rangeLength: "rangeLength"
      },
      features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵProvidersFeature"]([RANGE_LENGTH_VALIDATOR]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵNgOnChangesFeature"]()]
    });
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()], RangeLengthValidator.prototype, "rangeLength", void 0);

    var range = function range(value) {
      return function (control) {
        if (!isPresent(value)) {
          return null;
        }

        if (isPresent(_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required(control))) {
          return null;
        }

        var v = +control.value;
        return v >= value[0] && v <= value[1] ? null : {
          range: {
            value: value
          }
        };
      };
    };

    var RANGE_VALIDATOR = {
      provide: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NG_VALIDATORS"],
      useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["forwardRef"])(function () {
        return RangeValidator;
      }),
      multi: true
    };

    var RangeValidator =
    /*#__PURE__*/
    function () {
      function RangeValidator() {
        _classCallCheck(this, RangeValidator);
      }

      _createClass(RangeValidator, [{
        key: "ngOnInit",
        value: function ngOnInit() {
          this.validator = range(this.range);
        }
      }, {
        key: "ngOnChanges",
        value: function ngOnChanges(changes) {
          for (var key in changes) {
            if (key === 'range') {
              this.validator = range(changes[key].currentValue);

              if (this.onChange) {
                this.onChange();
              }
            }
          }
        }
      }, {
        key: "validate",
        value: function validate(c) {
          return this.validator(c);
        }
      }, {
        key: "registerOnValidatorChange",
        value: function registerOnValidatorChange(fn) {
          this.onChange = fn;
        }
      }]);

      return RangeValidator;
    }();

    RangeValidator.ɵfac = function RangeValidator_Factory(t) {
      return new (t || RangeValidator)();
    };

    RangeValidator.ɵdir = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineDirective"]({
      type: RangeValidator,
      selectors: [["", "range", "", "formControlName", ""], ["", "range", "", "formControl", ""], ["", "range", "", "ngModel", ""]],
      inputs: {
        range: "range"
      },
      features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵProvidersFeature"]([RANGE_VALIDATOR]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵNgOnChangesFeature"]()]
    });
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()], RangeValidator.prototype, "range", void 0);

    var url = function url(control) {
      if (isPresent(_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required(control))) {
        return null;
      }

      var v = control.value;
      /* tslint:disable */

      return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(v) ? null : {
        'url': true
      };
      /* tslint:enable */
    };

    var URL_VALIDATOR = {
      provide: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NG_VALIDATORS"],
      useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["forwardRef"])(function () {
        return UrlValidator;
      }),
      multi: true
    };

    var UrlValidator =
    /*#__PURE__*/
    function () {
      function UrlValidator() {
        _classCallCheck(this, UrlValidator);
      }

      _createClass(UrlValidator, [{
        key: "validate",
        value: function validate(c) {
          return url(c);
        }
      }]);

      return UrlValidator;
    }();

    UrlValidator.ɵfac = function UrlValidator_Factory(t) {
      return new (t || UrlValidator)();
    };

    UrlValidator.ɵdir = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineDirective"]({
      type: UrlValidator,
      selectors: [["", "url", "", "formControlName", ""], ["", "url", "", "formControl", ""], ["", "url", "", "ngModel", ""]],
      features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵProvidersFeature"]([URL_VALIDATOR])]
    });
    var uuids = {
      '3': /^[0-9A-F]{8}-[0-9A-F]{4}-3[0-9A-F]{3}-[0-9A-F]{4}-[0-9A-F]{12}$/i,
      '4': /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
      '5': /^[0-9A-F]{8}-[0-9A-F]{4}-5[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
      'all': /^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/i
    };

    var uuid = function uuid(version) {
      return function (control) {
        if (isPresent(_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required(control))) {
          return null;
        }

        var v = control.value;
        var pattern = uuids[version] || uuids.all;
        return new RegExp(pattern).test(v) ? null : {
          uuid: true
        };
      };
    };

    var UUID_VALIDATOR = {
      provide: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NG_VALIDATORS"],
      useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["forwardRef"])(function () {
        return UUIDValidator;
      }),
      multi: true
    };

    var UUIDValidator =
    /*#__PURE__*/
    function () {
      function UUIDValidator() {
        _classCallCheck(this, UUIDValidator);
      }

      _createClass(UUIDValidator, [{
        key: "ngOnInit",
        value: function ngOnInit() {
          this.validator = uuid(this.uuid);
        }
      }, {
        key: "ngOnChanges",
        value: function ngOnChanges(changes) {
          for (var key in changes) {
            if (key === 'uuid') {
              this.validator = uuid(changes[key].currentValue);

              if (this.onChange) {
                this.onChange();
              }
            }
          }
        }
      }, {
        key: "validate",
        value: function validate(c) {
          return this.validator(c);
        }
      }, {
        key: "registerOnValidatorChange",
        value: function registerOnValidatorChange(fn) {
          this.onChange = fn;
        }
      }]);

      return UUIDValidator;
    }();

    UUIDValidator.ɵfac = function UUIDValidator_Factory(t) {
      return new (t || UUIDValidator)();
    };

    UUIDValidator.ɵdir = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineDirective"]({
      type: UUIDValidator,
      selectors: [["", "uuid", "", "formControlName", ""], ["", "uuid", "", "formControl", ""], ["", "uuid", "", "ngModel", ""]],
      inputs: {
        uuid: "uuid"
      },
      features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵProvidersFeature"]([UUID_VALIDATOR]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵNgOnChangesFeature"]()]
    });
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()], UUIDValidator.prototype, "uuid", void 0);
    var CustomValidators = {
      arrayLength: arrayLength,
      base64: base64,
      creditCard: creditCard,
      date: date,
      dateISO: dateISO,
      digits: digits,
      email: email,
      equal: equal,
      equalTo: equalTo,
      gt: gt,
      gte: gte,
      json: json,
      lt: lt,
      lte: lte,
      max: max,
      maxDate: maxDate,
      min: min,
      minDate: minDate,
      notEqual: notEqual,
      notEqualTo: notEqualTo,
      number: number,
      property: property,
      range: range,
      rangeLength: rangeLength,
      url: url,
      uuid: uuid
    };
    var CustomDirectives = [ArrayLengthValidator, Base64Validator, CreditCardValidator, DateValidator, DateISOValidator, DigitsValidator, EmailValidator, EqualValidator, EqualToValidator, GreaterThanValidator, GreaterThanEqualValidator, JSONValidator, LessThanValidator, LessThanEqualValidator, MaxValidator, MaxDateValidator, MinValidator, MinDateValidator, NotEqualValidator, NotEqualToValidator, NumberValidator, PropertyValidator, RangeValidator, RangeLengthValidator, UrlValidator, UUIDValidator];

    var CustomFormsModule =
    /*#__PURE__*/
    _createClass(function CustomFormsModule() {
      _classCallCheck(this, CustomFormsModule);
    });

    CustomFormsModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({
      type: CustomFormsModule
    });
    CustomFormsModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({
      factory: function CustomFormsModule_Factory(t) {
        return new (t || CustomFormsModule)();
      }
    });
    /*@__PURE__*/

    (function () {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](ArrayLengthValidator, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"],
        args: [{
          selector: '[arrayLength][formControlName],[arrayLength][formControl],[arrayLength][ngModel]',
          providers: [ARRAY_LENGTH_VALIDATOR]
        }]
      }], null, {
        arrayLength: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
        }]
      });
    })();
    /*@__PURE__*/


    (function () {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](Base64Validator, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"],
        args: [{
          selector: '[base64][formControlName],[base64][formControl],[base64][ngModel]',
          providers: [BASE64_VALIDATOR]
        }]
      }], null, null);
    })();
    /*@__PURE__*/


    (function () {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](CreditCardValidator, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"],
        args: [{
          selector: '[creditCard][formControlName],[creditCard][formControl],[creditCard][ngModel]',
          providers: [CREDIT_CARD_VALIDATOR]
        }]
      }], null, null);
    })();
    /*@__PURE__*/


    (function () {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](DateISOValidator, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"],
        args: [{
          selector: '[dateISO][formControlName],[dateISO][formControl],[dateISO][ngModel]',
          providers: [DATE_ISO_VALIDATOR]
        }]
      }], null, null);
    })();
    /*@__PURE__*/


    (function () {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](DateValidator, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"],
        args: [{
          selector: '[date][formControlName],[date][formControl],[date][ngModel]',
          providers: [DATE_VALIDATOR]
        }]
      }], null, null);
    })();
    /*@__PURE__*/


    (function () {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](DigitsValidator, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"],
        args: [{
          selector: '[digits][formControlName],[digits][formControl],[digits][ngModel]',
          providers: [DIGITS_VALIDATOR]
        }]
      }], null, null);
    })();
    /*@__PURE__*/


    (function () {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](EmailValidator, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"],
        args: [{
          selector: '[ngvemail][formControlName],[ngvemail][formControl],[ngvemail][ngModel]',
          providers: [EMAIL_VALIDATOR]
        }]
      }], null, null);
    })();
    /*@__PURE__*/


    (function () {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](EqualToValidator, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"],
        args: [{
          selector: '[equalTo][formControlName],[equalTo][formControl],[equalTo][ngModel]',
          providers: [EQUAL_TO_VALIDATOR]
        }]
      }], null, {
        equalTo: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
        }]
      });
    })();
    /*@__PURE__*/


    (function () {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](EqualValidator, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"],
        args: [{
          selector: '[equal][formControlName],[equal][formControl],[equal][ngModel]',
          providers: [EQUAL_VALIDATOR]
        }]
      }], null, {
        equal: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
        }]
      });
    })();
    /*@__PURE__*/


    (function () {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](GreaterThanEqualValidator, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"],
        args: [{
          selector: '[gte][formControlName],[gte][formControl],[gte][ngModel]',
          providers: [GREATER_THAN_EQUAL_VALIDATOR]
        }]
      }], null, {
        gte: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
        }]
      });
    })();
    /*@__PURE__*/


    (function () {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](GreaterThanValidator, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"],
        args: [{
          selector: '[gt][formControlName],[gt][formControl],[gt][ngModel]',
          providers: [GREATER_THAN_VALIDATOR]
        }]
      }], null, {
        gt: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
        }]
      });
    })();
    /*@__PURE__*/


    (function () {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](JSONValidator, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"],
        args: [{
          selector: '[json][formControlName],[json][formControl],[json][ngModel]',
          providers: [JSON_VALIDATOR]
        }]
      }], null, null);
    })();
    /*@__PURE__*/


    (function () {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](LessThanEqualValidator, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"],
        args: [{
          selector: '[lte][formControlName],[lte][formControl],[lte][ngModel]',
          providers: [LESS_THAN_EQUAL_VALIDATOR]
        }]
      }], null, {
        lte: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
        }]
      });
    })();
    /*@__PURE__*/


    (function () {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](LessThanValidator, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"],
        args: [{
          selector: '[lt][formControlName],[lt][formControl],[lt][ngModel]',
          providers: [LESS_THAN_VALIDATOR]
        }]
      }], null, {
        lt: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
        }]
      });
    })();
    /*@__PURE__*/


    (function () {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](MaxDateValidator, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"],
        args: [{
          selector: '[maxDate][formControlName],[maxDate][formControl],[maxDate][ngModel]',
          providers: [MAX_DATE_VALIDATOR]
        }]
      }], null, {
        maxDate: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
        }]
      });
    })();
    /*@__PURE__*/


    (function () {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](MaxValidator, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"],
        args: [{
          selector: '[max][formControlName],[max][formControl],[max][ngModel]',
          providers: [MAX_VALIDATOR]
        }]
      }], null, {
        max: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
        }]
      });
    })();
    /*@__PURE__*/


    (function () {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](MinDateValidator, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"],
        args: [{
          selector: '[minDate][formControlName],[minDate][formControl],[minDate][ngModel]',
          providers: [MIN_DATE_VALIDATOR]
        }]
      }], null, {
        minDate: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
        }]
      });
    })();
    /*@__PURE__*/


    (function () {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](MinValidator, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"],
        args: [{
          selector: '[min][formControlName],[min][formControl],[min][ngModel]',
          providers: [MIN_VALIDATOR]
        }]
      }], null, {
        min: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
        }]
      });
    })();
    /*@__PURE__*/


    (function () {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](NotEqualToValidator, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"],
        args: [{
          selector: '[notEqualTo][formControlName],[notEqualTo][formControl],[notEqualTo][ngModel]',
          providers: [NOT_EQUAL_TO_VALIDATOR]
        }]
      }], null, {
        notEqualTo: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
        }]
      });
    })();
    /*@__PURE__*/


    (function () {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](NotEqualValidator, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"],
        args: [{
          selector: '[notEqual][formControlName],[notEqual][formControl],[notEqual][ngModel]',
          providers: [NOT_EQUAL_VALIDATOR]
        }]
      }], null, {
        notEqual: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
        }]
      });
    })();
    /*@__PURE__*/


    (function () {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](NumberValidator, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"],
        args: [{
          selector: '[number][formControlName],[number][formControl],[number][ngModel]',
          providers: [NUMBER_VALIDATOR]
        }]
      }], null, null);
    })();
    /*@__PURE__*/


    (function () {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](PropertyValidator, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"],
        args: [{
          selector: '[property][formControlName],[property][formControl],[property][ngModel]',
          providers: [PROPERTY_VALIDATOR]
        }]
      }], null, {
        property: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
        }]
      });
    })();
    /*@__PURE__*/


    (function () {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](RangeLengthValidator, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"],
        args: [{
          selector: '[rangeLength][formControlName],[rangeLength][formControl],[rangeLength][ngModel]',
          providers: [RANGE_LENGTH_VALIDATOR]
        }]
      }], null, {
        rangeLength: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
        }]
      });
    })();
    /*@__PURE__*/


    (function () {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](RangeValidator, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"],
        args: [{
          selector: '[range][formControlName],[range][formControl],[range][ngModel]',
          providers: [RANGE_VALIDATOR]
        }]
      }], null, {
        range: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
        }]
      });
    })();
    /*@__PURE__*/


    (function () {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](UrlValidator, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"],
        args: [{
          selector: '[url][formControlName],[url][formControl],[url][ngModel]',
          providers: [URL_VALIDATOR]
        }]
      }], null, null);
    })();
    /*@__PURE__*/


    (function () {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](UUIDValidator, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"],
        args: [{
          selector: '[uuid][formControlName],[uuid][formControl],[uuid][ngModel]',
          providers: [UUID_VALIDATOR]
        }]
      }], null, {
        uuid: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
        }]
      });
    })();

    (function () {
      (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](CustomFormsModule, {
        declarations: [ArrayLengthValidator, Base64Validator, CreditCardValidator, DateValidator, DateISOValidator, DigitsValidator, EmailValidator, EqualValidator, EqualToValidator, GreaterThanValidator, GreaterThanEqualValidator, JSONValidator, LessThanValidator, LessThanEqualValidator, MaxValidator, MaxDateValidator, MinValidator, MinDateValidator, NotEqualValidator, NotEqualToValidator, NumberValidator, PropertyValidator, RangeValidator, RangeLengthValidator, UrlValidator, UUIDValidator],
        exports: [ArrayLengthValidator, Base64Validator, CreditCardValidator, DateValidator, DateISOValidator, DigitsValidator, EmailValidator, EqualValidator, EqualToValidator, GreaterThanValidator, GreaterThanEqualValidator, JSONValidator, LessThanValidator, LessThanEqualValidator, MaxValidator, MaxDateValidator, MinValidator, MinDateValidator, NotEqualValidator, NotEqualToValidator, NumberValidator, PropertyValidator, RangeValidator, RangeLengthValidator, UrlValidator, UUIDValidator]
      });
    })();
    /*@__PURE__*/


    (function () {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](CustomFormsModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"],
        args: [{
          declarations: [CustomDirectives],
          exports: [CustomDirectives]
        }]
      }], null, null);
    })();
    /**
     * Generated bundle index. Do not edit.
     */
    //# sourceMappingURL=ngx-custom-validators.js.map

    /***/

  }
}]);
//# sourceMappingURL=default~views-cursos-cursos-module~views-instituciones-instituciones-module~views-proyectos-proyecto~1cd83a38-es5.js.map