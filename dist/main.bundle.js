webpackJsonp(["main"],{

/***/ "../../../../../src/$$_lazy_route_resource lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "../../../../../src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "../../../../../src/app/app.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<h1>Reaktor Climate</h1>\r\n<!-- Lists the observation points when the request is done -->\r\n<div class=\"observation-point-div\" *ngFor=\"let observationPoint of observationPoints | async\">\r\n  <app-observation-point [observationPointKey]=\"observationPoint[0].key\"></app-observation-point>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire_lite__ = __webpack_require__("../../../../angularfire-lite/esm5/angularfire-lite.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AppComponent = (function () {
    function AppComponent(db) {
        this.db = db;
    }
    AppComponent.prototype.ngOnInit = function () {
        // fetches a list of observation points from the database
        this.observationPoints = this.db.read('observation-points');
    };
    AppComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'app-root',
            template: __webpack_require__("../../../../../src/app/app.component.html"),
            styles: [__webpack_require__("../../../../../src/app/app.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_angularfire_lite__["b" /* AngularFireLiteDatabase */]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("../../../platform-browser/esm5/platform-browser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire_lite__ = __webpack_require__("../../../../angularfire-lite/esm5/angularfire-lite.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser_animations__ = __webpack_require__("../../../platform-browser/esm5/animations.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_observation_point_observation_point_component__ = __webpack_require__("../../../../../src/app/components/observation-point/observation-point.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};









var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["H" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_8__components_observation_point_observation_point_component__["a" /* ObservationPointComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
                __WEBPACK_IMPORTED_MODULE_3_angularfire_lite__["a" /* AngularFireLite */].forRoot(__WEBPACK_IMPORTED_MODULE_5__environments_environment__["a" /* environment */].firebase),
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["c" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_6__angular_material__["a" /* MatButtonModule */],
                __WEBPACK_IMPORTED_MODULE_6__angular_material__["b" /* MatInputModule */]
            ],
            providers: [],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* AppComponent */]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "../../../../../src/app/components/observation-point/observation-point.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/observation-point/observation-point.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"observation-point-div\">\r\n  <h1>\r\n    {{name}}\r\n  </h1>\r\n  <p>{{ maxTemperature.temperature }}</p>\r\n  <p>{{ minTemperature.temperature }}</p>\r\n  <p>{{ lastTemperature.temperature }}</p>\r\n  <mat-form-field class=\"example-full-width\">\r\n    <input [value]=\"temperatureString\" #temperatureInput type=\"number\" matInput placeholder=\"New reading\">\r\n    <span matSuffix>C</span>\r\n  </mat-form-field>\r\n  <mat-form-field class=\"example-full-width\">\r\n    <input [value]=\"timeString\" #timeInput type=\"time\" matInput placeholder=\"Time\">\r\n  </mat-form-field>\r\n  <mat-form-field class=\"example-full-width\">\r\n    <input [value]=\"dateString\" #dateInput type=\"date\" matInput placeholder=\"Date\">\r\n  </mat-form-field>\r\n  <button mat-button (click)=\"sendTemperature(temperatureInput.value, timeInput.value, dateInput.value)\">Send</button>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/components/observation-point/observation-point.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ObservationPointComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__("../../../common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire_lite__ = __webpack_require__("../../../../angularfire-lite/esm5/angularfire-lite.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ObservationPointComponent = (function () {
    function ObservationPointComponent(db, http) {
        this.db = db;
        this.http = http;
    }
    ObservationPointComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.maxTemperature = { temperature: '--', time: '' };
        this.minTemperature = { temperature: '--', time: '' };
        this.lastTemperature = { temperature: '--', time: '' };
        console.log('asdf1');
        this.db.query('observation-points/' + this.observationPointKey).limitToFirst(4).on('value').subscribe(function (data) {
            if (data != null && data.length > 3) {
                console.log('asdf2');
                _this.name = data[3][0]; //returns the data in a weird array format instead of proper json, hopefully to be fixed later
                var url = 'https://maps.googleapis.com/maps/api/timezone/json?location=' + data[0][0] + '&timestamp='
                    + Math.round(Date.now() / 1000) + '&key=' + __WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].dateApiKey;
                _this.http.get(url).subscribe(function (timedata) {
                    var date = Date.now() + ((timedata.dstOffset + timedata.rawOffset) * 1000);
                    _this.runClock(date);
                    _this.fetchTemperatures(date);
                });
            }
        });
    };
    ObservationPointComponent.prototype.fetchTemperatures = function (date) {
        var _this = this;
        date = date - 86400000;
        this.db.query('observation-points/' + this.observationPointKey + '/readings').orderByChild('utc').startAt(date).on('value').subscribe(function (data) {
            if (data != null && data !== undefined && data.length > 0) {
                var temp = { temperature: data[0][0].temperature, time: data[0][0].time };
                var utc = Number.parseInt(data[0][0].utc);
                var last = 0;
                var min = temp;
                var max = temp;
                for (var i = 1; i < data.length; i++) {
                    temp = { temperature: data[i][0].temperature, time: data[i][0].time };
                    if (Number.parseFloat(min.temperature) > Number.parseFloat(temp.temperature)) {
                        min = temp;
                    }
                    if (Number.parseFloat(max.temperature) < Number.parseFloat(temp.temperature)) {
                        max = temp;
                    }
                    if (Number.parseInt(data[i][0].utc) > utc) {
                        last = i;
                        utc = Number.parseInt(data[i][0].utc);
                    }
                }
                _this.lastTemperature = { temperature: data[last][0].temperature, time: data[last][0].time };
                _this.maxTemperature = max;
                _this.minTemperature = min;
            }
        });
    };
    ObservationPointComponent.prototype.runClock = function (date) {
        var _this = this;
        this.dateUTC = date;
        this.dateString = this.parseDateFromSeconds(this.dateUTC);
        this.timeString = this.parseTimeFromSeconds(this.dateUTC);
        setInterval(function () {
            _this.dateUTC += 1000;
            _this.time = _this.parseTimeFromSeconds(_this.dateUTC);
        }, 1000);
    };
    ObservationPointComponent.prototype.parseTimeFromSeconds = function (dateUTC) {
        var second = Math.floor((dateUTC / 1000) % 60);
        var minute = Math.floor((dateUTC / (1000 * 60)) % 60);
        var hour = Math.floor((dateUTC / (1000 * 60 * 60)) % 24);
        var timeString = '';
        if (hour < 10) {
            timeString += '0' + hour + ':';
        }
        else {
            timeString += hour + ':';
        }
        if (minute < 10) {
            timeString += '0' + minute + ':';
        }
        else {
            timeString += minute + ':';
        }
        if (second < 10) {
            timeString += '0' + second;
        }
        else {
            timeString += second;
        }
        return timeString;
    };
    ObservationPointComponent.prototype.parseDateFromSeconds = function (dateUTC) {
        var date = new Date(dateUTC).toISOString().substring(0, 10);
        return date;
    };
    ObservationPointComponent.prototype.dateTimeToSeconds = function (date, time) {
        if (time.length === 5) {
            time += ':00';
        }
        return Date.parse(date + 'T' + time + '+0000');
    };
    ObservationPointComponent.prototype.sendTemperature = function (temperatureInput, timeInput, dateInput) {
        if (this.validateTemperature(temperatureInput) && this.validateDateTime(dateInput, timeInput)) {
            var data = { temperature: temperatureInput, time: timeInput, utc: this.dateTimeToSeconds(dateInput, timeInput) };
            this.db.push('observation-points/' + this.observationPointKey + '/readings', data);
        }
    };
    ObservationPointComponent.prototype.validateTemperature = function (temperature) {
        if (temperature == null) {
            return false;
        }
        var number = Number.parseFloat(temperature);
        if (isNaN(number) || number > 300 || number < -273.15) {
            return false;
        }
        return true;
    };
    ObservationPointComponent.prototype.validateDateTime = function (date, time) {
        var dateRegExp = /^(?!(?![02468][048]|[13579][26]00)..(?!(?!00)[02468][048]|[13579][26])...02.29)\d{4}([-])(?=0.|1[012])(?!(0[13578]|1[02]).31|02.3)\d\d\1[012]|3[01]$/;
        var timeRegExp = /^([0-1]?[0-9]|2[0-3]):([0-5][0-9])(:[0-5][0-9])?$/;
        if (timeRegExp.test(time) && dateRegExp.test(date)) {
            var dateUTC = this.dateTimeToSeconds(date, time);
            if (dateUTC <= this.dateUTC) {
                return true;
            }
        }
        this.errorMessage = 'Invalid time';
        return false;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Input */])(),
        __metadata("design:type", String)
    ], ObservationPointComponent.prototype, "observationPointKey", void 0);
    ObservationPointComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'app-observation-point',
            template: __webpack_require__("../../../../../src/app/components/observation-point/observation-point.component.html"),
            styles: [__webpack_require__("../../../../../src/app/components/observation-point/observation-point.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_angularfire_lite__["b" /* AngularFireLiteDatabase */], __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */]])
    ], ObservationPointComponent);
    return ObservationPointComponent;
}());



/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
var environment = {
    production: false,
    firebase: {
        apiKey: 'AIzaSyC0mlACsMyvumPUeEUC44dom7DAMwAZEAQ',
        authDomain: 'weather-data-ronktor.firebaseapp.com',
        databaseURL: 'https://weather-data-ronktor.firebaseio.com',
        projectId: 'weather-data-ronktor',
        storageBucket: 'weather-data-ronktor.appspot.com',
        messagingSenderId: '1059518516058'
    },
    dateApiKey: 'AIzaSyCuQX3Z9oG-vYtmKUC10njKyuStJfQ-sn4'
};


/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/esm5/platform-browser-dynamic.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_12" /* enableProdMode */])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map