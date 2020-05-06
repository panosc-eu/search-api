/// <reference types="express" />
import { Constructor, Provider, ValueOrPromise, Getter, Setter, BindingKey } from '@loopback/core';
import { AuthenticationMetadata, AuthenticateFn, AuthenticationStrategy } from '@loopback/authentication';
import { UserProfile } from '@loopback/security';
import { AuthMetadataProvider } from '@loopback/authentication/dist/providers/auth-metadata.provider';
import { UserRepository, UserRoleRepository } from './repositories';
import { Request } from '@loopback/rest';
export declare const JWT_STRATEGY_NAME = "jwt";
export declare function secured(type?: SecuredType, // more on this below
roles?: string[], strategy?: string, options?: object): MethodDecorator;
export declare enum SecuredType {
    IS_AUTHENTICATED = 0,
    PERMIT_ALL = 1,
    HAS_ANY_ROLE = 2,
    HAS_ROLES = 3,
    DENY_ALL = 4
}
export interface MyAuthenticationMetadata extends AuthenticationMetadata {
    type: SecuredType;
    roles: string[];
}
export declare class MyAuthMetadataProvider extends AuthMetadataProvider {
    protected _controllerClass: Constructor<{}>;
    protected _methodName: string;
    constructor(_controllerClass: Constructor<{}>, _methodName: string);
    value(): MyAuthenticationMetadata | undefined;
}
export declare const JWT_SECRET = "changeme";
export interface Credentials {
    username: string;
    password: string;
}
export declare namespace MyAuthBindings {
    const STRATEGY: BindingKey<AuthenticationStrategy | undefined>;
}
export declare class MyAuthStrategyProvider implements Provider<AuthenticationStrategy | undefined> {
    private metadata;
    private userRepository;
    private userRoleRepository;
    constructor(metadata: MyAuthenticationMetadata, userRepository: UserRepository, userRoleRepository: UserRoleRepository);
    value(): ValueOrPromise<AuthenticationStrategy | undefined>;
    verifyToken(payload: Credentials, done: (err: Error | null, user?: UserProfile | false, info?: Object) => void): Promise<void>;
    verifyRoles(username: string): Promise<void>;
}
export declare class MyAuthActionProvider implements Provider<AuthenticateFn> {
    readonly getStrategy: Getter<AuthenticationStrategy>;
    readonly setCurrentUser: Setter<UserProfile>;
    readonly getMetadata: Getter<MyAuthenticationMetadata>;
    constructor(getStrategy: Getter<AuthenticationStrategy>, setCurrentUser: Setter<UserProfile>, getMetadata: Getter<MyAuthenticationMetadata>);
    value(): AuthenticateFn;
    action(request: Request): Promise<UserProfile | undefined>;
}
