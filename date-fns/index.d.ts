import { NbNativeDateService } from '@nebular/theme';
import * as i0 from '@angular/core';
import { ModuleWithProviders } from '@angular/core';

interface NbDateFnsOptions {
    format: string;
    parseOptions: {};
    formatOptions: {};
    getWeekOptions: {};
}
declare class NbDateFnsDateService extends NbNativeDateService {
    protected options: Partial<NbDateFnsOptions>;
    constructor(locale: string, options: any);
    format(date: Date, format: string): string;
    parse(date: string, format: string): Date;
    getId(): string;
    getWeekNumber(date: Date): number;
    getDateFormat(): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<NbDateFnsDateService, [null, { optional: true; }]>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NbDateFnsDateService>;
}

declare class NbDateFnsDateModule {
    static forRoot(options: Partial<NbDateFnsOptions>): ModuleWithProviders<NbDateFnsDateModule>;
    static forChild(options: Partial<NbDateFnsOptions>): ModuleWithProviders<NbDateFnsDateModule>;
    static ɵfac: i0.ɵɵFactoryDeclaration<NbDateFnsDateModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<NbDateFnsDateModule, never, never, never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<NbDateFnsDateModule>;
}

export { NbDateFnsDateModule, NbDateFnsDateService };
export type { NbDateFnsOptions };
