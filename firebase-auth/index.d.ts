import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { NbAuthStrategy, NbAuthResult, NbAuthStrategyOptions, NbStrategyToken, NbPasswordStrategyModule, NbPasswordStrategyMessage, NbAuthStrategyClass } from '@nebular/auth';
import firebase from 'firebase/compat/app';
import * as i0 from '@angular/core';

import UserCredential = firebase.auth.UserCredential;

declare abstract class NbFirebaseBaseStrategy extends NbAuthStrategy {
    protected afAuth: AngularFireAuth;
    constructor(afAuth: AngularFireAuth);
    logout(): Observable<NbAuthResult>;
    register(data?: any): Observable<NbAuthResult>;
    requestPassword(data?: any): Observable<NbAuthResult>;
    resetPassword(data?: any): Observable<NbAuthResult>;
    refreshToken(data?: any): Observable<NbAuthResult>;
    protected processFailure(error: any, module: string): Observable<NbAuthResult>;
    protected processSuccess(res: UserCredential | null, module: string): Observable<NbAuthResult>;
    static ɵfac: i0.ɵɵFactoryDeclaration<NbFirebaseBaseStrategy, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NbFirebaseBaseStrategy>;
}

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

declare class NbFirebasePasswordStrategyOptions extends NbAuthStrategyOptions {
    token?: NbStrategyToken;
    register?: boolean | NbPasswordStrategyModule;
    login?: boolean | NbPasswordStrategyModule;
    logout?: boolean | NbPasswordStrategyModule;
    refreshToken?: boolean | NbPasswordStrategyModule;
    requestPassword?: boolean | NbPasswordStrategyModule;
    resetPassword?: boolean | NbPasswordStrategyModule;
    errors?: NbPasswordStrategyMessage;
    messages?: NbPasswordStrategyMessage;
}
declare const firebasePasswordStrategyOptions: NbFirebasePasswordStrategyOptions;

declare class NbFirebasePasswordStrategy extends NbFirebaseBaseStrategy {
    protected defaultOptions: NbFirebasePasswordStrategyOptions;
    static setup(options: NbFirebasePasswordStrategyOptions): [NbAuthStrategyClass, NbAuthStrategyOptions];
    authenticate({ email, password }: any): Observable<NbAuthResult>;
    refreshToken(data?: any): Observable<NbAuthResult>;
    register({ email, password }: any): Observable<NbAuthResult>;
    requestPassword({ email }: any): Observable<NbAuthResult>;
    resetPassword({ code, password }: {
        code: any;
        password: any;
    }): Observable<NbAuthResult>;
    protected updatePassword(user: any, password: any, module: any): Observable<NbAuthResult>;
    protected refreshIdToken(user: firebase.User, module: any): Observable<NbAuthResult>;
    static ɵfac: i0.ɵɵFactoryDeclaration<NbFirebasePasswordStrategy, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NbFirebasePasswordStrategy>;
}

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

declare class NbFirebaseIdentityProviderStrategyOptions extends NbAuthStrategyOptions {
    token?: NbStrategyToken;
    logout?: boolean | NbPasswordStrategyModule;
    authenticate?: boolean | NbPasswordStrategyModule;
    errors?: NbPasswordStrategyMessage;
    messages?: NbPasswordStrategyMessage;
    scopes?: string[];
    customParameters?: {
        [key: string]: string;
    };
}

declare class NbFirebaseGoogleStrategy extends NbFirebaseBaseStrategy {
    protected defaultOptions: NbFirebaseIdentityProviderStrategyOptions;
    static setup(options: NbFirebaseIdentityProviderStrategyOptions): [NbAuthStrategyClass, NbAuthStrategyOptions];
    authenticate(data?: any): Observable<NbAuthResult>;
    static ɵfac: i0.ɵɵFactoryDeclaration<NbFirebaseGoogleStrategy, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NbFirebaseGoogleStrategy>;
}

declare class NbFirebaseFacebookStrategy extends NbFirebaseBaseStrategy {
    protected defaultOptions: NbFirebaseIdentityProviderStrategyOptions;
    static setup(options: NbFirebaseIdentityProviderStrategyOptions): [NbAuthStrategyClass, NbAuthStrategyOptions];
    authenticate(data?: any): Observable<NbAuthResult>;
    static ɵfac: i0.ɵɵFactoryDeclaration<NbFirebaseFacebookStrategy, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NbFirebaseFacebookStrategy>;
}

declare class NbFirebaseTwitteStrategy extends NbFirebaseBaseStrategy {
    protected defaultOptions: NbFirebaseIdentityProviderStrategyOptions;
    static setup(options: NbFirebaseIdentityProviderStrategyOptions): [NbAuthStrategyClass, NbAuthStrategyOptions];
    authenticate(data?: any): Observable<NbAuthResult>;
    static ɵfac: i0.ɵɵFactoryDeclaration<NbFirebaseTwitteStrategy, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NbFirebaseTwitteStrategy>;
}

declare class NbFirebaseAuthModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<NbFirebaseAuthModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<NbFirebaseAuthModule, never, never, never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<NbFirebaseAuthModule>;
}

export { NbFirebaseAuthModule, NbFirebaseBaseStrategy, NbFirebaseFacebookStrategy, NbFirebaseGoogleStrategy, NbFirebaseIdentityProviderStrategyOptions, NbFirebasePasswordStrategy, NbFirebasePasswordStrategyOptions, NbFirebaseTwitteStrategy, firebasePasswordStrategyOptions };
