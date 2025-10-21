import * as i0 from '@angular/core';
import { InjectionToken, OnDestroy, TemplateRef, ViewContainerRef, ModuleWithProviders } from '@angular/core';
import { Observable } from 'rxjs';
import * as i2 from '@angular/common';

interface NbAclRole {
    parent?: string;
    [permission: string]: string | string[] | undefined;
}
interface NbAccessControl {
    [role: string]: NbAclRole;
}
interface NbAclOptions {
    accessControl?: NbAccessControl;
}
declare const NB_SECURITY_OPTIONS_TOKEN: InjectionToken<NbAclOptions>;

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

declare abstract class NbRoleProvider {
    /**
     * Returns current user role
     * @returns {Observable<string | string[]>}
     */
    abstract getRole(): Observable<string | string[]>;
}

/**
 * Common acl service.
 */
declare class NbAclService {
    protected settings: NbAclOptions;
    private static readonly ANY_RESOURCE;
    private state;
    constructor(settings?: NbAclOptions);
    /**
     * Set/Reset ACL list
     * @param {NbAccessControl} list
     */
    setAccessControl(list: NbAccessControl): void;
    /**
     * Register a new role with a list of abilities (permission/resources combinations)
     * @param {string} role
     * @param {string} parent
     * @param {[permission: string]: string|string[]} abilities
     */
    register(role: string, parent?: string, abilities?: {
        [permission: string]: string | string[];
    }): void;
    /**
     * Allow a permission for specific resources to a role
     * @param {string} role
     * @param {string} permission
     * @param {string | string[]} resource
     */
    allow(role: string, permission: string, resource: string | string[]): void;
    /**
     * Check whether the role has a permission to a resource
     * @param {string} role
     * @param {string} permission
     * @param {string} resource
     * @returns {boolean}
     */
    can(role: string, permission: string, resource: string): any;
    private getRole;
    private validateRole;
    private validateResource;
    private exactCan;
    private getRoleResources;
    private getRoleAbilities;
    private getRoleParent;
    static ɵfac: i0.ɵɵFactoryDeclaration<NbAclService, [{ optional: true; }]>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NbAclService>;
}

/**
 * Access checker service.
 *
 * Injects `NbRoleProvider` to determine current user role, and checks access permissions using `NbAclService`
 */
declare class NbAccessChecker {
    protected roleProvider: NbRoleProvider;
    protected acl: NbAclService;
    constructor(roleProvider: NbRoleProvider, acl: NbAclService);
    /**
     * Checks whether access is granted or not
     *
     * @param {string} permission
     * @param {string} resource
     * @returns {Observable<boolean>}
     */
    isGranted(permission: string, resource: string): Observable<boolean>;
    static ɵfac: i0.ɵɵFactoryDeclaration<NbAccessChecker, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NbAccessChecker>;
}

declare class NbIsGrantedDirective implements OnDestroy {
    private templateRef;
    private viewContainer;
    private accessChecker;
    private destroy$;
    private hasView;
    constructor(templateRef: TemplateRef<any>, viewContainer: ViewContainerRef, accessChecker: NbAccessChecker);
    set nbIsGranted([permission, resource]: [string, string]);
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NbIsGrantedDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NbIsGrantedDirective, "[nbIsGranted]", never, { "nbIsGranted": { "alias": "nbIsGranted"; "required": false; }; }, {}, never, never, false, never>;
}

declare class NbSecurityModule {
    static forRoot(nbSecurityOptions?: NbAclOptions): ModuleWithProviders<NbSecurityModule>;
    static ɵfac: i0.ɵɵFactoryDeclaration<NbSecurityModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<NbSecurityModule, [typeof NbIsGrantedDirective], [typeof i2.CommonModule], [typeof NbIsGrantedDirective]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<NbSecurityModule>;
}

export { NB_SECURITY_OPTIONS_TOKEN, NbAccessChecker, NbAclService, NbIsGrantedDirective, NbRoleProvider, NbSecurityModule };
export type { NbAccessControl, NbAclOptions, NbAclRole };
