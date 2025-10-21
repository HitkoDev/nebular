import * as i0 from '@angular/core';
import { LOCALE_ID, Inject, Injectable, NgModule } from '@angular/core';
import { TranslationWidth } from '@angular/common';
import { NbDateService } from '@nebular/theme';
import _rollupMoment from 'moment';

/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
const moment = _rollupMoment || _rollupMoment;
class NbMomentDateService extends NbDateService {
    constructor(locale) {
        super();
        this.TIME_ONLY_FORMAT_KEY = 'LT';
        this.setLocale(locale);
    }
    setLocale(locale) {
        super.setLocale(locale);
        this.setMomentLocaleData(locale);
    }
    setHours(date, hour) {
        return this.clone(date).set({ hour });
    }
    setMinutes(date, minute) {
        return this.clone(date).set({ minute });
    }
    setSeconds(date, second) {
        return this.clone(date).set({ second });
    }
    setMilliseconds(date, milliseconds) {
        return this.clone(date).set({ milliseconds });
    }
    addDay(date, days) {
        return this.clone(date).add({ days });
    }
    addMonth(date, months) {
        return this.clone(date).add({ months });
    }
    addYear(date, years) {
        return this.clone(date).add({ years });
    }
    addMinutes(date, minute) {
        return this.clone(date).add({ minute });
    }
    addHours(date, hour) {
        return this.clone(date).add({ hour });
    }
    clone(date) {
        return date.clone().locale(this.locale);
    }
    valueOf(date) {
        return date.valueOf();
    }
    compareDates(date1, date2) {
        return this.getYear(date1) - this.getYear(date2) ||
            this.getMonth(date1) - this.getMonth(date2) ||
            this.getDate(date1) - this.getDate(date2);
    }
    createDate(year, month, date) {
        return moment([year, month, date]);
    }
    format(date, format) {
        if (date) {
            return date.format(format || this.localeData.defaultFormat);
        }
        return '';
    }
    getLocaleTimeFormat() {
        return moment.localeData().longDateFormat(this.TIME_ONLY_FORMAT_KEY);
    }
    getDate(date) {
        return this.clone(date).date();
    }
    getDayOfWeek(date) {
        return this.clone(date).day();
    }
    getDayOfWeekNames(style = TranslationWidth.Narrow) {
        return this.localeData.days[style];
    }
    getFirstDayOfWeek() {
        return this.localeData.firstDayOfWeek;
    }
    getMonth(date) {
        return date.month();
    }
    getHours(date) {
        return date.hour();
    }
    getMinutes(date) {
        return date.minute();
    }
    getSeconds(date) {
        return date.second();
    }
    getMilliseconds(date) {
        return date.milliseconds();
    }
    getMonthEnd(date) {
        return this.clone(date).endOf('month');
    }
    getMonthName(date, style = TranslationWidth.Abbreviated) {
        const month = this.getMonth(date);
        return this.getMonthNameByIndex(month, style);
    }
    getMonthNameByIndex(month, style = TranslationWidth.Abbreviated) {
        return this.localeData.months[style][month];
    }
    getMonthStart(date) {
        return this.clone(date).startOf('month');
    }
    getNumberOfDaysInMonth(date) {
        return this.clone(date).daysInMonth();
    }
    getYear(date) {
        return this.clone(date).year();
    }
    getYearEnd(date) {
        return this.clone(date).endOf('year');
    }
    getYearStart(date) {
        return this.clone(date).startOf('year');
    }
    isSameDay(date1, date2) {
        return this.isSameMonth(date1, date2) && this.getDate(date1) === this.getDate(date2);
    }
    isSameMonth(date1, date2) {
        return this.isSameYear(date1, date2) && this.getMonth(date1) === this.getMonth(date2);
    }
    isSameYear(date1, date2) {
        return this.getYear(date1) === this.getYear(date2);
    }
    isValidDateString(date, format) {
        return this.parse(date, format).isValid();
    }
    isValidTimeString(date, format) {
        return moment(date, format, true).isValid();
    }
    parse(date, format) {
        return moment(date, format || this.localeData.defaultFormat);
    }
    today() {
        return moment();
    }
    getId() {
        return 'moment';
    }
    setMomentLocaleData(locale) {
        const momentLocaleData = moment.localeData(locale);
        this.localeData = {
            firstDayOfWeek: momentLocaleData.firstDayOfWeek(),
            defaultFormat: momentLocaleData.longDateFormat('L'),
            months: {
                [TranslationWidth.Abbreviated]: momentLocaleData.monthsShort(),
                [TranslationWidth.Wide]: momentLocaleData.months(),
            },
            days: {
                [TranslationWidth.Wide]: momentLocaleData.weekdays(),
                [TranslationWidth.Short]: momentLocaleData.weekdaysShort(),
                [TranslationWidth.Narrow]: momentLocaleData.weekdaysMin(),
            },
        };
    }
    getWeekNumber(date) {
        return date.week();
    }
    getDateFormat() {
        return 'YYYY-MM-DD';
    }
    getTwelveHoursFormat() {
        return 'hh:mm A';
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.2", ngImport: i0, type: NbMomentDateService, deps: [{ token: LOCALE_ID }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.2", ngImport: i0, type: NbMomentDateService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.2", ngImport: i0, type: NbMomentDateService, decorators: [{
            type: Injectable
        }], ctorParameters: () => [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [LOCALE_ID]
                }] }] });

/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
class NbMomentDateModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.2", ngImport: i0, type: NbMomentDateModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "20.3.2", ngImport: i0, type: NbMomentDateModule }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "20.3.2", ngImport: i0, type: NbMomentDateModule, providers: [{ provide: NbDateService, useClass: NbMomentDateService }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.2", ngImport: i0, type: NbMomentDateModule, decorators: [{
            type: NgModule,
            args: [{
                    providers: [{ provide: NbDateService, useClass: NbMomentDateService }],
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

export { NbMomentDateModule, NbMomentDateService };
//# sourceMappingURL=nebular-moment.mjs.map
