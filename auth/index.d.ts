import * as i0 from '@angular/core';
import { InjectionToken, OnDestroy, ChangeDetectorRef, OnInit, Injector, ModuleWithProviders } from '@angular/core';
import { HttpHeaders, HttpResponse, HttpRequest, HttpInterceptor, HttpHandler, HttpEvent, HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import * as i8 from '@angular/common';
import { Location } from '@angular/common';
import * as i10 from '@angular/router';
import { Router, Routes, ActivatedRoute } from '@angular/router';
import * as i9 from '@nebular/theme';
import * as i11 from '@angular/forms';

declare abstract class NbAuthToken {
    protected payload: any;
    abstract getValue(): string;
    abstract isValid(): boolean;
    abstract getOwnerStrategyName(): string;
    abstract getCreatedAt(): Date;
    abstract toString(): string;
    getName(): string;
    getPayload(): any;
}
declare class NbAuthTokenNotFoundError extends Error {
    constructor(message: string);
}
declare class NbAuthIllegalTokenError extends Error {
    constructor(message: string);
}
declare class NbAuthEmptyTokenError extends NbAuthIllegalTokenError {
    constructor(message: string);
}
declare class NbAuthIllegalJWTTokenError extends NbAuthIllegalTokenError {
    constructor(message: string);
}
interface NbAuthRefreshableToken {
    getRefreshToken(): string;
    setRefreshToken(refreshToken: string): any;
}
interface NbAuthTokenClass<T = NbAuthToken> {
    NAME: string;
    new (raw: any, strategyName: string, expDate?: Date): T;
}
declare function nbAuthCreateToken<T extends NbAuthToken>(tokenClass: NbAuthTokenClass<T>, token: any, ownerStrategyName: string, createdAt?: Date): T;
declare function decodeJwtPayload(payload: string): any;
/**
 * Wrapper for simple (text) token
 */
declare class NbAuthSimpleToken extends NbAuthToken {
    protected readonly token: any;
    protected readonly ownerStrategyName: string;
    protected createdAt?: Date;
    static NAME: string;
    constructor(token: any, ownerStrategyName: string, createdAt?: Date);
    protected parsePayload(): any;
    protected prepareCreatedAt(date: Date): Date;
    /**
     * Returns the token's creation date
     * @returns {Date}
     */
    getCreatedAt(): Date;
    /**
     * Returns the token value
     * @returns string
     */
    getValue(): string;
    getOwnerStrategyName(): string;
    /**
     * Is non empty and valid
     * @returns {boolean}
     */
    isValid(): boolean;
    /**
     * Validate value and convert to string, if value is not valid return empty string
     * @returns {string}
     */
    toString(): string;
}
/**
 * Wrapper for JWT token with additional methods.
 */
declare class NbAuthJWTToken extends NbAuthSimpleToken {
    static NAME: string;
    /**
     * for JWT token, the iat (issued at) field of the token payload contains the creation Date
     */
    protected prepareCreatedAt(date: Date): Date;
    /**
     * Returns payload object
     * @returns any
     */
    protected parsePayload(): void;
    /**
     * Returns expiration date
     * @returns Date
     */
    getTokenExpDate(): Date;
    /**
     * Is data expired
     * @returns {boolean}
     */
    isValid(): boolean;
}
/**
 * Wrapper for OAuth2 token whose access_token is a JWT Token
 */
declare class NbAuthOAuth2Token extends NbAuthSimpleToken {
    static NAME: string;
    constructor(data: {
        [key: string]: string | number;
    } | string, ownerStrategyName: string, createdAt?: Date);
    /**
     * Returns the token value
     * @returns string
     */
    getValue(): string;
    /**
     * Returns the refresh token
     * @returns string
     */
    getRefreshToken(): string;
    /**
     *  put refreshToken in the token payload
      * @param refreshToken
     */
    setRefreshToken(refreshToken: string): void;
    /**
     * Parses token payload
     * @returns any
     */
    protected parsePayload(): void;
    /**
     * Returns the token type
     * @returns string
     */
    getType(): string;
    /**
     * Is data expired
     * @returns {boolean}
     */
    isValid(): boolean;
    /**
     * Returns expiration date
     * @returns Date
     */
    getTokenExpDate(): Date;
    /**
     * Convert to string
     * @returns {string}
     */
    toString(): string;
}
/**
 * Wrapper for OAuth2 token embedding JWT tokens
 */
declare class NbAuthOAuth2JWTToken extends NbAuthOAuth2Token {
    static NAME: string;
    protected accessTokenPayload: any;
    protected parsePayload(): void;
    protected parseAccessTokenPayload(): any;
    /**
     * Returns access token payload
     * @returns any
     */
    getAccessTokenPayload(): any;
    /**
     * for Oauth2 JWT token, the iat (issued at) field of the access_token payload
     */
    protected prepareCreatedAt(date: Date): Date;
    /**
     * Is token valid
     * @returns {boolean}
     */
    isValid(): boolean;
    /**
     * Returns expiration date :
     * - exp if set,
     * - super.getExpDate() otherwise
     * @returns Date
     */
    getTokenExpDate(): Date;
}

declare class NbAuthResult {
    protected success: boolean;
    protected response?: any;
    protected redirect?: any;
    protected token: NbAuthToken;
    protected errors: string[];
    protected messages: string[];
    constructor(success: boolean, response?: any, redirect?: any, errors?: any, messages?: any, token?: NbAuthToken);
    getResponse(): any;
    getToken(): NbAuthToken;
    getRedirect(): string;
    getErrors(): string[];
    getMessages(): string[];
    isSuccess(): boolean;
    isFailure(): boolean;
}

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

interface NbStrategyToken {
    class?: NbAuthTokenClass;
    [key: string]: any;
}
declare class NbAuthStrategyOptions {
    name: string;
    token?: NbStrategyToken;
    headers?: HttpHeaders | {
        [header: string]: string | string[];
    };
}

declare abstract class NbAuthStrategy {
    protected defaultOptions: NbAuthStrategyOptions;
    protected options: NbAuthStrategyOptions;
    setOptions(options: any): void;
    getOption(key: string): any;
    createToken<T extends NbAuthToken>(value: any, failWhenInvalidToken?: boolean): T;
    getName(): string;
    abstract authenticate(data?: any): Observable<NbAuthResult>;
    abstract register(data?: any): Observable<NbAuthResult>;
    abstract requestPassword(data?: any): Observable<NbAuthResult>;
    abstract resetPassword(data?: any): Observable<NbAuthResult>;
    abstract logout(): Observable<NbAuthResult>;
    abstract refreshToken(data?: any): Observable<NbAuthResult>;
    protected createFailResponse(data?: any): HttpResponse<Object>;
    protected createSuccessResponse(data?: any): HttpResponse<Object>;
    protected getActionEndpoint(action: string): string;
    protected getHeaders(): HttpHeaders;
}

type NbAuthStrategyClass = new (...params: any[]) => NbAuthStrategy;
type NbAuthStrategies = [NbAuthStrategyClass, NbAuthStrategyOptions][];
interface NbAuthOptions {
    forms?: any;
    strategies?: NbAuthStrategies;
}
interface NbAuthSocialLink {
    link?: string;
    url?: string;
    target?: string;
    title?: string;
    icon?: string;
}
declare const defaultAuthOptions: any;
declare const NB_AUTH_OPTIONS: InjectionToken<NbAuthOptions>;
declare const NB_AUTH_USER_OPTIONS: InjectionToken<NbAuthOptions>;
declare const NB_AUTH_STRATEGIES: InjectionToken<NbAuthStrategies>;
declare const NB_AUTH_TOKENS: InjectionToken<NbAuthTokenClass<NbAuthToken>[]>;
declare const NB_AUTH_INTERCEPTOR_HEADER: InjectionToken<string>;
declare const NB_AUTH_TOKEN_INTERCEPTOR_FILTER: InjectionToken<(req: HttpRequest<any>) => boolean>;

interface NbTokenPack {
    name: string;
    ownerStrategyName: string;
    createdAt: Number;
    value: string;
}
declare const NB_AUTH_FALLBACK_TOKEN: InjectionToken<NbAuthTokenClass<NbAuthToken>>;
/**
 * Creates a token parcel which could be stored/restored
 */
declare class NbAuthTokenParceler {
    private fallbackClass;
    private tokenClasses;
    constructor(fallbackClass: NbAuthTokenClass, tokenClasses: NbAuthTokenClass[]);
    wrap(token: NbAuthToken): string;
    unwrap(value: string): NbAuthToken;
    protected getClassByName(name: any): NbAuthTokenClass;
    protected parseTokenPack(value: any): NbTokenPack;
    static ɵfac: i0.ɵɵFactoryDeclaration<NbAuthTokenParceler, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NbAuthTokenParceler>;
}

declare abstract class NbTokenStorage {
    abstract get(): NbAuthToken;
    abstract set(token: NbAuthToken): any;
    abstract clear(): any;
}
/**
 * Service that uses browser localStorage as a storage.
 *
 * The token storage is provided into auth module the following way:
 * ```ts
 * { provide: NbTokenStorage, useClass: NbTokenLocalStorage },
 * ```
 *
 * If you need to change the storage behaviour or provide your own - just extend your class from basic `NbTokenStorage`
 * or `NbTokenLocalStorage` and provide in your `app.module`:
 * ```ts
 * { provide: NbTokenStorage, useClass: NbTokenCustomStorage },
 * ```
 *
 */
declare class NbTokenLocalStorage extends NbTokenStorage {
    private parceler;
    protected key: string;
    constructor(parceler: NbAuthTokenParceler);
    /**
     * Returns token from localStorage
     * @returns {NbAuthToken}
     */
    get(): NbAuthToken;
    /**
     * Sets token to localStorage
     * @param {NbAuthToken} token
     */
    set(token: NbAuthToken): void;
    /**
     * Clears token from localStorage
     */
    clear(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NbTokenLocalStorage, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NbTokenLocalStorage>;
}

/**
 * Service that allows you to manage authentication token - get, set, clear and also listen to token changes over time.
 */
declare class NbTokenService {
    protected tokenStorage: NbTokenStorage;
    protected token$: BehaviorSubject<NbAuthToken>;
    constructor(tokenStorage: NbTokenStorage);
    /**
     * Publishes token when it changes.
     * @returns {Observable<NbAuthToken>}
     */
    tokenChange(): Observable<NbAuthToken>;
    /**
     * Sets a token into the storage. This method is used by the NbAuthService automatically.
     *
     * @param {NbAuthToken} token
     * @returns {Observable<any>}
     */
    set(token: NbAuthToken): Observable<null>;
    /**
     * Returns observable of current token
     * @returns {Observable<NbAuthToken>}
     */
    get(): Observable<NbAuthToken>;
    /**
     * Removes the token and published token value
     *
     * @returns {Observable<any>}
     */
    clear(): Observable<null>;
    protected publishStoredToken(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NbTokenService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NbTokenService>;
}

/**
 * Common authentication service.
 * Should be used to as an interlayer between UI Components and Auth Strategy.
 */
declare class NbAuthService {
    protected tokenService: NbTokenService;
    protected strategies: any;
    constructor(tokenService: NbTokenService, strategies: any);
    /**
     * Retrieves current authenticated token stored
     * @returns {Observable<any>}
     */
    getToken(): Observable<NbAuthToken>;
    /**
     * Returns true if auth token is present in the token storage
     * @returns {Observable<boolean>}
     */
    isAuthenticated(): Observable<boolean>;
    /**
     * Returns true if valid auth token is present in the token storage.
     * If not, calls the strategy refreshToken, and returns isAuthenticated() if success, false otherwise
     * @returns {Observable<boolean>}
     */
    isAuthenticatedOrRefresh(): Observable<boolean>;
    /**
     * Returns tokens stream
     * @returns {Observable<NbAuthSimpleToken>}
     */
    onTokenChange(): Observable<NbAuthToken>;
    /**
     * Returns authentication status stream
     * @returns {Observable<boolean>}
     */
    onAuthenticationChange(): Observable<boolean>;
    /**
     * Authenticates with the selected strategy
     * Stores received token in the token storage
     *
     * Example:
     * authenticate('email', {email: 'email@example.com', password: 'test'})
     *
     * @param strategyName
     * @param data
     * @returns {Observable<NbAuthResult>}
     */
    authenticate(strategyName: string, data?: any): Observable<NbAuthResult>;
    /**
     * Registers with the selected strategy
     * Stores received token in the token storage
     *
     * Example:
     * register('email', {email: 'email@example.com', name: 'Some Name', password: 'test'})
     *
     * @param strategyName
     * @param data
     * @returns {Observable<NbAuthResult>}
     */
    register(strategyName: string, data?: any): Observable<NbAuthResult>;
    /**
     * Sign outs with the selected strategy
     * Removes token from the token storage
     *
     * Example:
     * logout('email')
     *
     * @param strategyName
     * @returns {Observable<NbAuthResult>}
     */
    logout(strategyName: string): Observable<NbAuthResult>;
    /**
     * Sends forgot password request to the selected strategy
     *
     * Example:
     * requestPassword('email', {email: 'email@example.com'})
     *
     * @param strategyName
     * @param data
     * @returns {Observable<NbAuthResult>}
     */
    requestPassword(strategyName: string, data?: any): Observable<NbAuthResult>;
    /**
     * Tries to reset password with the selected strategy
     *
     * Example:
     * resetPassword('email', {newPassword: 'test'})
     *
     * @param strategyName
     * @param data
     * @returns {Observable<NbAuthResult>}
     */
    resetPassword(strategyName: string, data?: any): Observable<NbAuthResult>;
    /**
     * Sends a refresh token request
     * Stores received token in the token storage
     *
     * Example:
     * refreshToken('email', {token: token})
     *
     * @param {string} strategyName
     * @param data
     * @returns {Observable<NbAuthResult>}
     */
    refreshToken(strategyName: string, data?: any): Observable<NbAuthResult>;
    /**
     * Get registered strategy by name
     *
     * Example:
     * getStrategy('email')
     *
     * @param {string} provider
     * @returns {NbAbstractAuthProvider}
     */
    protected getStrategy(strategyName: string): NbAuthStrategy;
    private processResultToken;
    static ɵfac: i0.ɵɵFactoryDeclaration<NbAuthService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NbAuthService>;
}

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

declare class NbAuthComponent implements OnDestroy {
    protected auth: NbAuthService;
    protected location: Location;
    private destroy$;
    subscription: any;
    authenticated: boolean;
    token: string;
    constructor(auth: NbAuthService, location: Location);
    back(): boolean;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NbAuthComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NbAuthComponent, "nb-auth", never, {}, {}, never, never, false, never>;
}

declare class NbAuthBlockComponent {
    static ɵfac: i0.ɵɵFactoryDeclaration<NbAuthBlockComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NbAuthBlockComponent, "nb-auth-block", never, {}, {}, never, ["*"], false, never>;
}

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

declare class NbLoginComponent {
    protected service: NbAuthService;
    protected options: {};
    protected cd: ChangeDetectorRef;
    protected router: Router;
    redirectDelay: number;
    showMessages: any;
    strategy: string;
    errors: string[];
    messages: string[];
    user: any;
    submitted: boolean;
    socialLinks: NbAuthSocialLink[];
    rememberMe: boolean;
    constructor(service: NbAuthService, options: {}, cd: ChangeDetectorRef, router: Router);
    login(): void;
    getConfigValue(key: string): any;
    static ɵfac: i0.ɵɵFactoryDeclaration<NbLoginComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NbLoginComponent, "nb-login", never, {}, {}, never, never, false, never>;
}

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

declare class NbRegisterComponent {
    protected service: NbAuthService;
    protected options: {};
    protected cd: ChangeDetectorRef;
    protected router: Router;
    redirectDelay: number;
    showMessages: any;
    strategy: string;
    submitted: boolean;
    errors: string[];
    messages: string[];
    user: any;
    socialLinks: NbAuthSocialLink[];
    constructor(service: NbAuthService, options: {}, cd: ChangeDetectorRef, router: Router);
    register(): void;
    getConfigValue(key: string): any;
    static ɵfac: i0.ɵɵFactoryDeclaration<NbRegisterComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NbRegisterComponent, "nb-register", never, {}, {}, never, never, false, never>;
}

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

declare class NbRequestPasswordComponent {
    protected service: NbAuthService;
    protected options: {};
    protected cd: ChangeDetectorRef;
    protected router: Router;
    redirectDelay: number;
    showMessages: any;
    strategy: string;
    submitted: boolean;
    errors: string[];
    messages: string[];
    user: any;
    constructor(service: NbAuthService, options: {}, cd: ChangeDetectorRef, router: Router);
    requestPass(): void;
    getConfigValue(key: string): any;
    static ɵfac: i0.ɵɵFactoryDeclaration<NbRequestPasswordComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NbRequestPasswordComponent, "nb-request-password-page", never, {}, {}, never, never, false, never>;
}

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

declare class NbResetPasswordComponent {
    protected service: NbAuthService;
    protected options: {};
    protected cd: ChangeDetectorRef;
    protected router: Router;
    redirectDelay: number;
    showMessages: any;
    strategy: string;
    submitted: boolean;
    errors: string[];
    messages: string[];
    user: any;
    constructor(service: NbAuthService, options: {}, cd: ChangeDetectorRef, router: Router);
    resetPass(): void;
    getConfigValue(key: string): any;
    static ɵfac: i0.ɵɵFactoryDeclaration<NbResetPasswordComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NbResetPasswordComponent, "nb-reset-password-page", never, {}, {}, never, never, false, never>;
}

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

declare class NbLogoutComponent implements OnInit {
    protected service: NbAuthService;
    protected options: {};
    protected router: Router;
    redirectDelay: number;
    strategy: string;
    constructor(service: NbAuthService, options: {}, router: Router);
    ngOnInit(): void;
    logout(strategy: string): void;
    getConfigValue(key: string): any;
    static ɵfac: i0.ɵɵFactoryDeclaration<NbLogoutComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NbLogoutComponent, "nb-logout", never, {}, {}, never, never, false, never>;
}

declare function nbStrategiesFactory(options: NbAuthOptions, injector: Injector): NbAuthStrategy[];
declare function nbTokensFactory(strategies: NbAuthStrategy[]): NbAuthTokenClass[];
declare function nbOptionsFactory(options: any): any;
declare function nbNoOpInterceptorFilter(req: HttpRequest<any>): boolean;
declare class NbAuthModule {
    static forRoot(nbAuthOptions?: NbAuthOptions): ModuleWithProviders<NbAuthModule>;
    static ɵfac: i0.ɵɵFactoryDeclaration<NbAuthModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<NbAuthModule, [typeof NbAuthComponent, typeof NbAuthBlockComponent, typeof NbLoginComponent, typeof NbRegisterComponent, typeof NbRequestPasswordComponent, typeof NbResetPasswordComponent, typeof NbLogoutComponent], [typeof i8.CommonModule, typeof i9.NbLayoutModule, typeof i9.NbCardModule, typeof i9.NbCheckboxModule, typeof i9.NbAlertModule, typeof i9.NbInputModule, typeof i9.NbButtonModule, typeof i10.RouterModule, typeof i11.FormsModule, typeof i9.NbIconModule], [typeof NbAuthComponent, typeof NbAuthBlockComponent, typeof NbLoginComponent, typeof NbRegisterComponent, typeof NbRequestPasswordComponent, typeof NbResetPasswordComponent, typeof NbLogoutComponent]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<NbAuthModule>;
}

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

declare const routes: Routes;

declare class NbAuthJWTInterceptor implements HttpInterceptor {
    private injector;
    protected filter: any;
    constructor(injector: Injector, filter: any);
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>;
    protected get authService(): NbAuthService;
    static ɵfac: i0.ɵɵFactoryDeclaration<NbAuthJWTInterceptor, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NbAuthJWTInterceptor>;
}

declare class NbAuthSimpleInterceptor implements HttpInterceptor {
    private injector;
    protected headerName: string;
    constructor(injector: Injector, headerName?: string);
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>;
    protected get authService(): NbAuthService;
    static ɵfac: i0.ɵɵFactoryDeclaration<NbAuthSimpleInterceptor, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NbAuthSimpleInterceptor>;
}

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

declare class NbDummyAuthStrategyOptions extends NbAuthStrategyOptions {
    token?: NbStrategyToken;
    delay?: number;
    alwaysFail?: boolean;
}
declare const dummyStrategyOptions: NbDummyAuthStrategyOptions;

/**
 * Dummy auth strategy. Could be useful for auth setup when backend is not available yet.
 *
 *
 * Strategy settings.
 *
 * ```ts
 * export class NbDummyAuthStrategyOptions extends NbAuthStrategyOptions {
 *   name = 'dummy';
 *   token = {
 *     class: NbAuthSimpleToken,
 *   };
 *   delay? = 1000;
 *   alwaysFail? = false;
 * }
 * ```
 */
declare class NbDummyAuthStrategy extends NbAuthStrategy {
    protected defaultOptions: NbDummyAuthStrategyOptions;
    static setup(options: NbDummyAuthStrategyOptions): [NbAuthStrategyClass, NbDummyAuthStrategyOptions];
    authenticate(data?: any): Observable<NbAuthResult>;
    register(data?: any): Observable<NbAuthResult>;
    requestPassword(data?: any): Observable<NbAuthResult>;
    resetPassword(data?: any): Observable<NbAuthResult>;
    logout(data?: any): Observable<NbAuthResult>;
    refreshToken(data?: any): Observable<NbAuthResult>;
    protected createDummyResult(data?: any): NbAuthResult;
    static ɵfac: i0.ɵɵFactoryDeclaration<NbDummyAuthStrategy, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NbDummyAuthStrategy>;
}

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

interface NbPasswordStrategyModule {
    alwaysFail?: boolean;
    endpoint?: string;
    method?: string;
    redirect?: {
        success?: string | null;
        failure?: string | null;
    };
    requireValidToken?: boolean;
    defaultErrors?: string[];
    defaultMessages?: string[];
}
interface NbPasswordStrategyReset extends NbPasswordStrategyModule {
    resetPasswordTokenKey?: string;
}
interface NbPasswordStrategyToken {
    class?: NbAuthTokenClass;
    key?: string;
    getter?: Function;
}
interface NbPasswordStrategyMessage {
    key?: string;
    getter?: Function;
}
declare class NbPasswordAuthStrategyOptions extends NbAuthStrategyOptions {
    baseEndpoint?: string;
    login?: boolean | NbPasswordStrategyModule;
    register?: boolean | NbPasswordStrategyModule;
    requestPass?: boolean | NbPasswordStrategyModule;
    resetPass?: boolean | NbPasswordStrategyReset;
    logout?: boolean | NbPasswordStrategyReset;
    refreshToken?: boolean | NbPasswordStrategyModule;
    token?: NbPasswordStrategyToken;
    errors?: NbPasswordStrategyMessage;
    messages?: NbPasswordStrategyMessage;
    validation?: {
        password?: {
            required?: boolean;
            minLength?: number | null;
            maxLength?: number | null;
            regexp?: string | null;
        };
        email?: {
            required?: boolean;
            regexp?: string | null;
        };
        fullName?: {
            required?: boolean;
            minLength?: number | null;
            maxLength?: number | null;
            regexp?: string | null;
        };
    };
}
declare const passwordStrategyOptions: NbPasswordAuthStrategyOptions;

/**
 * The most common authentication provider for email/password strategy.
 *
 * Strategy settings. Note, there is no need to copy over the whole object to change the settings you need.
 * Also, this.getOption call won't work outside of the default options declaration
 * (which is inside of the `NbPasswordAuthStrategy` class), so you have to replace it with a custom helper function
 * if you need it.
 *
 * ```ts
 *export class NbPasswordAuthStrategyOptions extends NbAuthStrategyOptions {
 *  name: string;
 *  baseEndpoint? = '/api/auth/';
 *  login?: boolean | NbPasswordStrategyModule = {
 *    alwaysFail: false,
 *    endpoint: 'login',
 *    method: 'post',
 *    requireValidToken: true,
 *    redirect: {
 *      success: '/',
 *      failure: null,
 *    },
 *    defaultErrors: ['Login/Email combination is not correct, please try again.'],
 *    defaultMessages: ['You have been successfully logged in.'],
 *  };
 *  register?: boolean | NbPasswordStrategyModule = {
 *    alwaysFail: false,
 *    endpoint: 'register',
 *    method: 'post',
 *    requireValidToken: true,
 *    redirect: {
 *      success: '/',
 *      failure: null,
 *    },
 *    defaultErrors: ['Something went wrong, please try again.'],
 *    defaultMessages: ['You have been successfully registered.'],
 *  };
 *  requestPass?: boolean | NbPasswordStrategyModule = {
 *    endpoint: 'request-pass',
 *    method: 'post',
 *    redirect: {
 *      success: '/',
 *      failure: null,
 *    },
 *    defaultErrors: ['Something went wrong, please try again.'],
 *    defaultMessages: ['Reset password instructions have been sent to your email.'],
 *  };
 *  resetPass?: boolean | NbPasswordStrategyReset = {
 *    endpoint: 'reset-pass',
 *    method: 'put',
 *    redirect: {
 *      success: '/',
 *      failure: null,
 *    },
 *    resetPasswordTokenKey: 'reset_password_token',
 *    defaultErrors: ['Something went wrong, please try again.'],
 *    defaultMessages: ['Your password has been successfully changed.'],
 *  };
 *  logout?: boolean | NbPasswordStrategyReset = {
 *    alwaysFail: false,
 *    endpoint: 'logout',
 *    method: 'delete',
 *    redirect: {
 *      success: '/',
 *      failure: null,
 *    },
 *    defaultErrors: ['Something went wrong, please try again.'],
 *    defaultMessages: ['You have been successfully logged out.'],
 *  };
 *  refreshToken?: boolean | NbPasswordStrategyModule = {
 *    endpoint: 'refresh-token',
 *    method: 'post',
 *    requireValidToken: true,
 *    redirect: {
 *      success: null,
 *      failure: null,
 *    },
 *    defaultErrors: ['Something went wrong, please try again.'],
 *    defaultMessages: ['Your token has been successfully refreshed.'],
 *  };
 *  token?: NbPasswordStrategyToken = {
 *    class: NbAuthSimpleToken,
 *    key: 'data.token',
 *    getter: (module: string, res: HttpResponse<Object>, options: NbPasswordAuthStrategyOptions) => getDeepFromObject(
 *      res.body,
 *      options.token.key,
 *    ),
 *  };
 *  errors?: NbPasswordStrategyMessage = {
 *    key: 'data.errors',
 *    getter: (module: string, res: HttpErrorResponse, options: NbPasswordAuthStrategyOptions) => getDeepFromObject(
 *      res.error,
 *      options.errors.key,
 *      options[module].defaultErrors,
 *    ),
 *  };
 *  messages?: NbPasswordStrategyMessage = {
 *    key: 'data.messages',
 *    getter: (module: string, res: HttpResponse<Object>, options: NbPasswordAuthStrategyOptions) => getDeepFromObject(
 *      res.body,
 *      options.messages.key,
 *      options[module].defaultMessages,
 *    ),
 *  };
 *  validation?: {
 *    password?: {
 *      required?: boolean;
 *      minLength?: number | null;
 *      maxLength?: number | null;
 *      regexp?: string | null;
 *    };
 *    email?: {
 *      required?: boolean;
 *      regexp?: string | null;
 *    };
 *    fullName?: {
 *      required?: boolean;
 *      minLength?: number | null;
 *      maxLength?: number | null;
 *      regexp?: string | null;
 *    };
 *  };
 *}
 * ```
 */
declare class NbPasswordAuthStrategy extends NbAuthStrategy {
    protected http: HttpClient;
    private route;
    protected defaultOptions: NbPasswordAuthStrategyOptions;
    static setup(options: NbPasswordAuthStrategyOptions): [NbAuthStrategyClass, NbPasswordAuthStrategyOptions];
    constructor(http: HttpClient, route: ActivatedRoute);
    authenticate(data?: any): Observable<NbAuthResult>;
    register(data?: any): Observable<NbAuthResult>;
    requestPassword(data?: any): Observable<NbAuthResult>;
    resetPassword(data?: any): Observable<NbAuthResult>;
    logout(): Observable<NbAuthResult>;
    refreshToken(data?: any): Observable<NbAuthResult>;
    protected handleResponseError(res: any, module: string): Observable<NbAuthResult>;
    static ɵfac: i0.ɵɵFactoryDeclaration<NbPasswordAuthStrategy, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NbPasswordAuthStrategy>;
}

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

declare enum NbOAuth2ResponseType {
    CODE = "code",
    TOKEN = "token"
}
declare enum NbOAuth2GrantType {
    AUTHORIZATION_CODE = "authorization_code",
    PASSWORD = "password",
    REFRESH_TOKEN = "refresh_token"
}
declare enum NbOAuth2ClientAuthMethod {
    NONE = "none",
    BASIC = "basic",
    REQUEST_BODY = "request-body"
}
declare class NbOAuth2AuthStrategyOptions extends NbAuthStrategyOptions {
    baseEndpoint?: string;
    clientId: string;
    clientSecret?: string;
    clientAuthMethod?: string;
    redirect?: {
        success?: string;
        failure?: string;
    };
    defaultErrors?: any[];
    defaultMessages?: any[];
    authorize?: {
        endpoint?: string;
        redirectUri?: string;
        responseType?: string;
        requireValidToken?: boolean;
        scope?: string;
        state?: string;
        params?: {
            [key: string]: string;
        };
    };
    token?: {
        endpoint?: string;
        grantType?: string;
        redirectUri?: string;
        scope?: string;
        requireValidToken?: boolean;
        class: NbAuthTokenClass;
    };
    refresh?: {
        endpoint?: string;
        grantType?: string;
        scope?: string;
        requireValidToken?: boolean;
    };
}
declare const auth2StrategyOptions: NbOAuth2AuthStrategyOptions;

/**
 * OAuth2 authentication strategy.
 *
 * Strategy settings:
 *
 * ```ts
 * export enum NbOAuth2ResponseType {
 *   CODE = 'code',
 *   TOKEN = 'token',
 * }
 *
 * export enum NbOAuth2GrantType {
 *   AUTHORIZATION_CODE = 'authorization_code',
 *   PASSWORD = 'password',
 *   REFRESH_TOKEN = 'refresh_token',
 * }
 *
 * export class NbOAuth2AuthStrategyOptions {
 *   name: string;
 *   baseEndpoint?: string = '';
 *   clientId: string = '';
 *   clientSecret: string = '';
 *   clientAuthMethod: string = NbOAuth2ClientAuthMethod.NONE;
 *   redirect?: { success?: string; failure?: string } = {
 *     success: '/',
 *     failure: null,
 *   };
 *   defaultErrors?: any[] = ['Something went wrong, please try again.'];
 *   defaultMessages?: any[] = ['You have been successfully authenticated.'];
 *   authorize?: {
 *     endpoint?: string;
 *     redirectUri?: string;
 *     responseType?: string;
 *     requireValidToken: true,
 *     scope?: string;
 *     state?: string;
 *     params?: { [key: string]: string };
 *   } = {
 *     endpoint: 'authorize',
 *     responseType: NbOAuth2ResponseType.CODE,
 *   };
 *   token?: {
 *     endpoint?: string;
 *     grantType?: string;
 *     requireValidToken: true,
 *     redirectUri?: string;
 *     scope?: string;
 *     class: NbAuthTokenClass,
 *   } = {
 *     endpoint: 'token',
 *     grantType: NbOAuth2GrantType.AUTHORIZATION_CODE,
 *     class: NbAuthOAuth2Token,
 *   };
 *   refresh?: {
 *     endpoint?: string;
 *     grantType?: string;
 *     scope?: string;
 *     requireValidToken: true,
 *   } = {
 *     endpoint: 'token',
 *     grantType: NbOAuth2GrantType.REFRESH_TOKEN,
 *   };
 * }
 * ```
 *
 */
declare class NbOAuth2AuthStrategy extends NbAuthStrategy {
    protected http: HttpClient;
    protected route: ActivatedRoute;
    protected window: any;
    static setup(options: NbOAuth2AuthStrategyOptions): [NbAuthStrategyClass, NbOAuth2AuthStrategyOptions];
    get responseType(): any;
    get clientAuthMethod(): any;
    protected redirectResultHandlers: {
        [key: string]: Function;
    };
    protected redirectResults: {
        [key: string]: Function;
    };
    protected defaultOptions: NbOAuth2AuthStrategyOptions;
    constructor(http: HttpClient, route: ActivatedRoute, window: any);
    authenticate(data?: any): Observable<NbAuthResult>;
    getAuthorizationResult(): Observable<any>;
    refreshToken(token: NbAuthRefreshableToken): Observable<NbAuthResult>;
    passwordToken(username: string, password: string): Observable<NbAuthResult>;
    protected authorizeRedirect(): void;
    protected isRedirectResult(): Observable<boolean>;
    protected requestToken(code: string): Observable<NbAuthResult>;
    protected buildCodeRequestData(code: string): any;
    protected buildRefreshRequestData(token: NbAuthRefreshableToken): any;
    protected buildPasswordRequestData(username: string, password: string): string;
    protected buildAuthHeader(): HttpHeaders | undefined;
    protected getHeaders(): HttpHeaders;
    protected cleanParams(params: any): any;
    protected addCredentialsToParams(params: any): any;
    protected handleResponseError(res: any): Observable<NbAuthResult>;
    protected buildRedirectUrl(): string;
    protected parseHashAsQueryParams(hash: string): {
        [key: string]: string;
    };
    protected urlEncodeParameters(params: any): string;
    protected createRefreshedToken(res: any, existingToken: NbAuthRefreshableToken, requireValidToken: boolean): NbAuthToken;
    register(data?: any): Observable<NbAuthResult>;
    requestPassword(data?: any): Observable<NbAuthResult>;
    resetPassword(data?: any): Observable<NbAuthResult>;
    logout(): Observable<NbAuthResult>;
    static ɵfac: i0.ɵɵFactoryDeclaration<NbOAuth2AuthStrategy, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NbOAuth2AuthStrategy>;
}

declare class NbUser {
    id?: number;
    email?: string;
    password?: string;
    rememberMe?: boolean;
    terms?: boolean;
    confirmPassword?: string;
    fullName?: string;
    constructor(id?: number, email?: string, password?: string, rememberMe?: boolean, terms?: boolean, confirmPassword?: string, fullName?: string);
}

/**
 * Extending object that entered in first argument.
 *
 * Returns extended object or false if have no target object or incorrect type.
 *
 * If you wish to clone source object (without modify it), just use empty new
 * object as first argument, like this:
 *   deepExtend({}, yourObj_1, [yourObj_N]);
 */
declare const deepExtend: (...objects: any[]) => any;
declare function getDeepFromObject(object: {}, name: string, defaultValue?: any): any;
declare function urlBase64Decode(str: string): string;
declare function b64decode(str: string): string;
declare function b64DecodeUnicode(str: any): string;

export { NB_AUTH_FALLBACK_TOKEN, NB_AUTH_INTERCEPTOR_HEADER, NB_AUTH_OPTIONS, NB_AUTH_STRATEGIES, NB_AUTH_TOKENS, NB_AUTH_TOKEN_INTERCEPTOR_FILTER, NB_AUTH_USER_OPTIONS, NbAuthBlockComponent, NbAuthComponent, NbAuthEmptyTokenError, NbAuthIllegalJWTTokenError, NbAuthIllegalTokenError, NbAuthJWTInterceptor, NbAuthJWTToken, NbAuthModule, NbAuthOAuth2JWTToken, NbAuthOAuth2Token, NbAuthResult, NbAuthService, NbAuthSimpleInterceptor, NbAuthSimpleToken, NbAuthStrategy, NbAuthStrategyOptions, NbAuthToken, NbAuthTokenNotFoundError, NbAuthTokenParceler, NbDummyAuthStrategy, NbDummyAuthStrategyOptions, NbLoginComponent, NbLogoutComponent, NbOAuth2AuthStrategy, NbOAuth2AuthStrategyOptions, NbOAuth2ClientAuthMethod, NbOAuth2GrantType, NbOAuth2ResponseType, NbPasswordAuthStrategy, NbPasswordAuthStrategyOptions, NbRegisterComponent, NbRequestPasswordComponent, NbResetPasswordComponent, NbTokenLocalStorage, NbTokenService, NbTokenStorage, NbUser, auth2StrategyOptions, b64DecodeUnicode, b64decode, decodeJwtPayload, deepExtend, defaultAuthOptions, dummyStrategyOptions, getDeepFromObject, nbAuthCreateToken, nbNoOpInterceptorFilter, nbOptionsFactory, nbStrategiesFactory, nbTokensFactory, passwordStrategyOptions, routes, urlBase64Decode };
export type { NbAuthOptions, NbAuthRefreshableToken, NbAuthSocialLink, NbAuthStrategies, NbAuthStrategyClass, NbAuthTokenClass, NbPasswordStrategyMessage, NbPasswordStrategyModule, NbPasswordStrategyReset, NbPasswordStrategyToken, NbStrategyToken, NbTokenPack };
