import * as i0 from '@angular/core';
import { Injectable, NgModule } from '@angular/core';
import { from, of } from 'rxjs';
import { map, catchError, switchMap, take } from 'rxjs/operators';
import { NbAuthStrategy, NbAuthResult, NbAuthIllegalTokenError, NbAuthStrategyOptions, NbAuthJWTToken, getDeepFromObject } from '@nebular/auth';
import * as i1 from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
class NbFirebaseBaseStrategy extends NbAuthStrategy {
    constructor(afAuth) {
        super();
        this.afAuth = afAuth;
    }
    logout() {
        const module = 'logout';
        return from(this.afAuth.signOut()).pipe(map(() => {
            return new NbAuthResult(true, null, this.getOption(`${module}.redirect.success`), [], this.getOption(`${module}.defaultMessages`));
        }), catchError((error) => this.processFailure(error, module)));
    }
    register(data) {
        throw new Error(`'register' is not supported by '${this.constructor.name}', use 'authenticate'.`);
    }
    requestPassword(data) {
        throw new Error(`'requestPassword' is not supported by '${this.constructor.name}', use 'authenticate'.`);
    }
    resetPassword(data = {}) {
        throw new Error(`'resetPassword' is not supported by '${this.constructor.name}', use 'authenticate'.`);
    }
    refreshToken(data = {}) {
        throw new Error(`'refreshToken' is not supported by '${this.constructor.name}', use 'authenticate'.`);
    }
    processFailure(error, module) {
        const errorMessages = [];
        if (error instanceof NbAuthIllegalTokenError) {
            errorMessages.push(error.message);
        }
        else {
            errorMessages.push(this.getOption('errors.getter')(module, error, this.options));
        }
        return of(new NbAuthResult(false, error, this.getOption(`${module}.redirect.failure`), errorMessages, []));
    }
    processSuccess(res, module) {
        return this.afAuth.idToken.pipe(map((token) => {
            return new NbAuthResult(true, res, this.getOption(`${module}.redirect.success`), [], this.getOption('messages.getter')(module, res, this.options), this.createToken(token));
        }));
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.2", ngImport: i0, type: NbFirebaseBaseStrategy, deps: [{ token: i1.AngularFireAuth }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.2", ngImport: i0, type: NbFirebaseBaseStrategy }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.2", ngImport: i0, type: NbFirebaseBaseStrategy, decorators: [{
            type: Injectable
        }], ctorParameters: () => [{ type: i1.AngularFireAuth }] });

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
class NbFirebasePasswordStrategyOptions extends NbAuthStrategyOptions {
    constructor() {
        super(...arguments);
        this.token = {
            class: NbAuthJWTToken,
        };
        this.register = {
            redirect: {
                success: '/',
                failure: null,
            },
            defaultErrors: ['Something went wrong, please try again.'],
            defaultMessages: ['You have been successfully registered.'],
        };
        this.login = {
            redirect: {
                success: '/',
                failure: null,
            },
            defaultErrors: ['Login/Email combination is not correct, please try again.'],
            defaultMessages: ['You have been successfully logged in.'],
        };
        this.logout = {
            redirect: {
                success: '/',
                failure: null,
            },
            defaultErrors: ['Something went wrong, please try again.'],
            defaultMessages: ['You have been successfully logged out.'],
        };
        this.refreshToken = {
            redirect: {
                success: null,
                failure: null,
            },
            defaultErrors: ['Something went wrong, please try again.'],
            defaultMessages: ['Your token has been successfully refreshed.'],
        };
        this.requestPassword = {
            redirect: {
                success: '/',
                failure: null,
            },
            defaultErrors: ['Something went wrong, please try again.'],
            defaultMessages: ['Reset password instructions have been sent to your email.'],
        };
        this.resetPassword = {
            redirect: {
                success: '/',
                failure: null,
            },
            defaultErrors: ['Something went wrong, please try again.'],
            defaultMessages: ['Your password has been successfully changed.'],
        };
        this.errors = {
            key: 'message',
            getter: (module, res, options) => getDeepFromObject(res, options.errors.key, options[module].defaultErrors),
        };
        this.messages = {
            key: 'messages',
            getter: (module, res, options) => getDeepFromObject(res.body, options.messages.key, options[module].defaultMessages),
        };
    }
}
// eslint-disable-next-line max-len
const firebasePasswordStrategyOptions = new NbFirebasePasswordStrategyOptions();

/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
class NbFirebasePasswordStrategy extends NbFirebaseBaseStrategy {
    constructor() {
        super(...arguments);
        this.defaultOptions = firebasePasswordStrategyOptions;
    }
    static setup(options) {
        return [NbFirebasePasswordStrategy, options];
    }
    authenticate({ email, password }) {
        const module = 'login';
        return from(this.afAuth.signInWithEmailAndPassword(email, password)).pipe(switchMap((res) => this.processSuccess(res, module)), catchError((error) => this.processFailure(error, module)));
    }
    refreshToken(data) {
        const module = 'refreshToken';
        return this.afAuth.authState.pipe(take(1), switchMap((user) => {
            if (user == null) {
                return of(new NbAuthResult(false, null, this.getOption(`${module}.redirect.failure`), [
                    "There is no logged in user so refresh of id token isn't possible",
                ]));
            }
            return this.refreshIdToken(user, module);
        }));
    }
    register({ email, password }) {
        const module = 'register';
        return from(this.afAuth.createUserWithEmailAndPassword(email, password)).pipe(switchMap((res) => this.processSuccess(res, module)), catchError((error) => this.processFailure(error, module)));
    }
    requestPassword({ email }) {
        const module = 'requestPassword';
        return from(this.afAuth.sendPasswordResetEmail(email)).pipe(map(() => {
            return new NbAuthResult(true, null, this.getOption(`${module}.redirect.success`), [], this.getOption(`${module}.defaultMessages`));
        }), catchError((error) => this.processFailure(error, module)));
    }
    resetPassword({ code, password }) {
        const module = 'resetPassword';
        return from(this.afAuth.confirmPasswordReset(code, password)).pipe(map(() => {
            return new NbAuthResult(true, null, this.getOption(`${module}.redirect.success`), [], this.getOption(`${module}.defaultMessages`));
        }), catchError((error) => this.processFailure(error, module)));
    }
    updatePassword(user, password, module) {
        return from(user.updatePassword(password)).pipe(map((token) => {
            return new NbAuthResult(true, null, this.getOption(`${module}.redirect.success`), [], this.getOption(`${module}.defaultMessages`), this.createToken(token));
        }), catchError((error) => this.processFailure(error, module)));
    }
    refreshIdToken(user, module) {
        return from(user.getIdToken(true)).pipe(map((token) => {
            return new NbAuthResult(true, null, this.getOption(`${module}.redirect.success`), [], this.getOption(`${module}.defaultMessages`), this.createToken(token));
        }), catchError((error) => this.processFailure(error, module)));
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.2", ngImport: i0, type: NbFirebasePasswordStrategy, deps: null, target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.2", ngImport: i0, type: NbFirebasePasswordStrategy }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.2", ngImport: i0, type: NbFirebasePasswordStrategy, decorators: [{
            type: Injectable
        }] });

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
class NbFirebaseIdentityProviderStrategyOptions extends NbAuthStrategyOptions {
    constructor() {
        super(...arguments);
        this.token = {
            class: NbAuthJWTToken,
        };
        this.logout = {
            redirect: {
                success: '/',
                failure: null,
            },
            defaultErrors: ['Something went wrong, please try again.'],
            defaultMessages: ['You have been successfully logged out.'],
        };
        this.authenticate = {
            redirect: {
                success: '/',
                failure: null,
            },
            defaultErrors: ['Something went wrong, please try again.'],
            defaultMessages: ['You have been successfully authenticated.'],
        };
        this.errors = {
            key: 'message',
            getter: (module, res, options) => options[module].defaultErrors,
        };
        this.messages = {
            key: 'message',
            getter: (module, res, options) => {
                return options[module].defaultMessages;
            },
        };
        this.scopes = [];
        this.customParameters = {};
    }
}
;

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
class NbFirebaseGoogleStrategy extends NbFirebaseBaseStrategy {
    constructor() {
        super(...arguments);
        this.defaultOptions = new NbFirebaseIdentityProviderStrategyOptions();
    }
    static setup(options) {
        return [NbFirebaseGoogleStrategy, options];
    }
    authenticate(data) {
        const module = 'authenticate';
        const provider = new firebase.auth.GoogleAuthProvider();
        const scopes = this.getOption('scopes');
        scopes.forEach((scope) => provider.addScope(scope));
        provider.setCustomParameters(this.getOption('customParameters'));
        return from(this.afAuth.signInWithPopup(provider)).pipe(switchMap((res) => this.processSuccess(res, module)), catchError((error) => this.processFailure(error, module)));
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.2", ngImport: i0, type: NbFirebaseGoogleStrategy, deps: null, target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.2", ngImport: i0, type: NbFirebaseGoogleStrategy }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.2", ngImport: i0, type: NbFirebaseGoogleStrategy, decorators: [{
            type: Injectable
        }] });

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
class NbFirebaseFacebookStrategy extends NbFirebaseBaseStrategy {
    constructor() {
        super(...arguments);
        this.defaultOptions = new NbFirebaseIdentityProviderStrategyOptions();
    }
    static setup(options) {
        return [NbFirebaseFacebookStrategy, options];
    }
    authenticate(data) {
        const module = 'authenticate';
        const provider = new firebase.auth.FacebookAuthProvider();
        const scopes = this.getOption('scopes');
        scopes.forEach((scope) => provider.addScope(scope));
        provider.setCustomParameters(this.getOption('customParameters'));
        return from(this.afAuth.signInWithPopup(provider)).pipe(switchMap((res) => this.processSuccess(res, module)), catchError((error) => this.processFailure(error, module)));
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.2", ngImport: i0, type: NbFirebaseFacebookStrategy, deps: null, target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.2", ngImport: i0, type: NbFirebaseFacebookStrategy }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.2", ngImport: i0, type: NbFirebaseFacebookStrategy, decorators: [{
            type: Injectable
        }] });

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
class NbFirebaseTwitteStrategy extends NbFirebaseBaseStrategy {
    constructor() {
        super(...arguments);
        this.defaultOptions = new NbFirebaseIdentityProviderStrategyOptions();
    }
    static setup(options) {
        return [NbFirebaseTwitteStrategy, options];
    }
    authenticate(data) {
        const module = 'authenticate';
        const provider = new firebase.auth.TwitterAuthProvider();
        provider.setCustomParameters(this.getOption('customParameters'));
        return from(this.afAuth.signInWithPopup(provider)).pipe(switchMap((res) => this.processSuccess(res, module)), catchError((error) => this.processFailure(error, module)));
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.2", ngImport: i0, type: NbFirebaseTwitteStrategy, deps: null, target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.2", ngImport: i0, type: NbFirebaseTwitteStrategy }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.2", ngImport: i0, type: NbFirebaseTwitteStrategy, decorators: [{
            type: Injectable
        }] });

/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
class NbFirebaseAuthModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.2", ngImport: i0, type: NbFirebaseAuthModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "20.3.2", ngImport: i0, type: NbFirebaseAuthModule }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "20.3.2", ngImport: i0, type: NbFirebaseAuthModule, providers: [
            NbFirebasePasswordStrategy,
            NbFirebaseGoogleStrategy,
            NbFirebaseFacebookStrategy,
            NbFirebaseTwitteStrategy,
        ] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.2", ngImport: i0, type: NbFirebaseAuthModule, decorators: [{
            type: NgModule,
            args: [{
                    providers: [
                        NbFirebasePasswordStrategy,
                        NbFirebaseGoogleStrategy,
                        NbFirebaseFacebookStrategy,
                        NbFirebaseTwitteStrategy,
                    ],
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

export { NbFirebaseAuthModule, NbFirebaseBaseStrategy, NbFirebaseFacebookStrategy, NbFirebaseGoogleStrategy, NbFirebaseIdentityProviderStrategyOptions, NbFirebasePasswordStrategy, NbFirebasePasswordStrategyOptions, NbFirebaseTwitteStrategy, firebasePasswordStrategyOptions };
//# sourceMappingURL=nebular-firebase-auth.mjs.map
