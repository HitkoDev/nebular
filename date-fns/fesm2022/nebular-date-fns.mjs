import * as i0 from '@angular/core';
import { LOCALE_ID, Inject, Optional, Injectable, NgModule } from '@angular/core';
import { NbNativeDateService, NB_DATE_SERVICE_OPTIONS, NbDateService } from '@nebular/theme';
import parse from 'date-fns/parse';
import formatDate from 'date-fns/format';
import getWeek from 'date-fns/getWeek';

/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
class NbDateFnsDateService extends NbNativeDateService {
    constructor(locale, options) {
        super(locale);
        this.options = options || {};
    }
    format(date, format) {
        if (date) {
            return formatDate(date, format || this.options.format, this.options.formatOptions);
        }
        return '';
    }
    parse(date, format) {
        return parse(date, format || this.options.format, new Date(), this.options.parseOptions);
    }
    getId() {
        return 'date-fns';
    }
    getWeekNumber(date) {
        return getWeek(date, this.options.getWeekOptions);
    }
    getDateFormat() {
        return 'YYYY-MM-dd';
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.2", ngImport: i0, type: NbDateFnsDateService, deps: [{ token: LOCALE_ID }, { token: NB_DATE_SERVICE_OPTIONS, optional: true }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.2", ngImport: i0, type: NbDateFnsDateService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.2", ngImport: i0, type: NbDateFnsDateService, decorators: [{
            type: Injectable
        }], ctorParameters: () => [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [LOCALE_ID]
                }] }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [NB_DATE_SERVICE_OPTIONS]
                }] }] });

/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
const dateFnsServiceProvider = { provide: NbDateService, useClass: NbDateFnsDateService };
class NbDateFnsDateModule {
    static forRoot(options) {
        return {
            ngModule: NbDateFnsDateModule,
            providers: [
                dateFnsServiceProvider,
                { provide: NB_DATE_SERVICE_OPTIONS, useValue: options },
            ],
        };
    }
    static forChild(options) {
        return {
            ngModule: NbDateFnsDateModule,
            providers: [
                dateFnsServiceProvider,
                { provide: NB_DATE_SERVICE_OPTIONS, useValue: options },
            ],
        };
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.2", ngImport: i0, type: NbDateFnsDateModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "20.3.2", ngImport: i0, type: NbDateFnsDateModule }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "20.3.2", ngImport: i0, type: NbDateFnsDateModule, providers: [dateFnsServiceProvider] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.2", ngImport: i0, type: NbDateFnsDateModule, decorators: [{
            type: NgModule,
            args: [{
                    providers: [dateFnsServiceProvider],
                }]
        }] });

/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

/**
 * Generated bundle index. Do not edit.
 */

export { NbDateFnsDateModule, NbDateFnsDateService };
//# sourceMappingURL=nebular-date-fns.mjs.map
