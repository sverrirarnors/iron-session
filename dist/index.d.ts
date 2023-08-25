import * as http from 'http';
import { IncomingMessage, ServerResponse } from 'http';

// Type definitions for cookie 0.5
// Project: https://github.com/jshttp/cookie
// Definitions by: Pine Mizune <https://github.com/pine>
//                 Piotr Błażejewicz <https://github.com/peterblazejewicz>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

/**
 * Basic HTTP cookie parser and serializer for HTTP servers.
 */

/**
 * Additional serialization options
 */
interface CookieSerializeOptions {
    /**
     * Specifies the value for the {@link https://tools.ietf.org/html/rfc6265#section-5.2.3|Domain Set-Cookie attribute}. By default, no
     * domain is set, and most clients will consider the cookie to apply to only
     * the current domain.
     */
    domain?: string | undefined;

    /**
     * Specifies a function that will be used to encode a cookie's value. Since
     * value of a cookie has a limited character set (and must be a simple
     * string), this function can be used to encode a value into a string suited
     * for a cookie's value.
     *
     * The default function is the global `encodeURIComponent`, which will
     * encode a JavaScript string into UTF-8 byte sequences and then URL-encode
     * any that fall outside of the cookie range.
     */
    encode?(value: string): string;

    /**
     * Specifies the `Date` object to be the value for the {@link https://tools.ietf.org/html/rfc6265#section-5.2.1|`Expires` `Set-Cookie` attribute}. By default,
     * no expiration is set, and most clients will consider this a "non-persistent cookie" and will delete
     * it on a condition like exiting a web browser application.
     *
     * *Note* the {@link https://tools.ietf.org/html/rfc6265#section-5.3|cookie storage model specification}
     * states that if both `expires` and `maxAge` are set, then `maxAge` takes precedence, but it is
     * possible not all clients by obey this, so if both are set, they should
     * point to the same date and time.
     */
    expires?: Date | undefined;
    /**
     * Specifies the boolean value for the {@link https://tools.ietf.org/html/rfc6265#section-5.2.6|`HttpOnly` `Set-Cookie` attribute}.
     * When truthy, the `HttpOnly` attribute is set, otherwise it is not. By
     * default, the `HttpOnly` attribute is not set.
     *
     * *Note* be careful when setting this to true, as compliant clients will
     * not allow client-side JavaScript to see the cookie in `document.cookie`.
     */
    httpOnly?: boolean | undefined;
    /**
     * Specifies the number (in seconds) to be the value for the `Max-Age`
     * `Set-Cookie` attribute. The given number will be converted to an integer
     * by rounding down. By default, no maximum age is set.
     *
     * *Note* the {@link https://tools.ietf.org/html/rfc6265#section-5.3|cookie storage model specification}
     * states that if both `expires` and `maxAge` are set, then `maxAge` takes precedence, but it is
     * possible not all clients by obey this, so if both are set, they should
     * point to the same date and time.
     */
    maxAge?: number | undefined;
    /**
     * Specifies the value for the {@link https://tools.ietf.org/html/rfc6265#section-5.2.4|`Path` `Set-Cookie` attribute}.
     * By default, the path is considered the "default path".
     */
    path?: string | undefined;
    /**
     * Specifies the `string` to be the value for the [`Priority` `Set-Cookie` attribute][rfc-west-cookie-priority-00-4.1].
     *
     * - `'low'` will set the `Priority` attribute to `Low`.
     * - `'medium'` will set the `Priority` attribute to `Medium`, the default priority when not set.
     * - `'high'` will set the `Priority` attribute to `High`.
     *
     * More information about the different priority levels can be found in
     * [the specification][rfc-west-cookie-priority-00-4.1].
     *
     * **note** This is an attribute that has not yet been fully standardized, and may change in the future.
     * This also means many clients may ignore this attribute until they understand it.
     */
    priority?: 'low' | 'medium' | 'high' | undefined;
    /**
     * Specifies the boolean or string to be the value for the {@link https://tools.ietf.org/html/draft-ietf-httpbis-rfc6265bis-03#section-4.1.2.7|`SameSite` `Set-Cookie` attribute}.
     *
     * - `true` will set the `SameSite` attribute to `Strict` for strict same
     * site enforcement.
     * - `false` will not set the `SameSite` attribute.
     * - `'lax'` will set the `SameSite` attribute to Lax for lax same site
     * enforcement.
     * - `'strict'` will set the `SameSite` attribute to Strict for strict same
     * site enforcement.
     *  - `'none'` will set the SameSite attribute to None for an explicit
     *  cross-site cookie.
     *
     * More information about the different enforcement levels can be found in {@link https://tools.ietf.org/html/draft-ietf-httpbis-rfc6265bis-03#section-4.1.2.7|the specification}.
     *
     * *note* This is an attribute that has not yet been fully standardized, and may change in the future. This also means many clients may ignore this attribute until they understand it.
     */
    sameSite?: true | false | 'lax' | 'strict' | 'none' | undefined;
    /**
     * Specifies the boolean value for the {@link https://tools.ietf.org/html/rfc6265#section-5.2.5|`Secure` `Set-Cookie` attribute}. When truthy, the
     * `Secure` attribute is set, otherwise it is not. By default, the `Secure` attribute is not set.
     *
     * *Note* be careful when setting this to `true`, as compliant clients will
     * not send the cookie back to the server in the future if the browser does
     * not have an HTTPS connection.
     */
    secure?: boolean | undefined;
}

type PasswordsMap = Record<string, string>;
type Password = PasswordsMap | string;
type RequestType = IncomingMessage | Request;
type ResponseType = Response | ServerResponse;
/**
 * The high-level type definition of the .get() and .set() methods
 * of { cookies() } from "next/headers"
 */
interface ICookieHandler {
    get: (name: string) => {
        name: string;
        value: string;
    } | undefined;
    set: (name: string, value: string) => void;
}
interface IronSessionOptions {
    /**
     * The cookie name that will be used inside the browser. Make sure it's unique
     * given your application.
     *
     * @example 'vercel-session'
     */
    cookieName: string;
    /**
     * The password(s) that will be used to encrypt the cookie. Can either be a string
     * or an object.
     *
     * When you provide multiple passwords then all of them will be used to decrypt
     * the cookie. But only the most recent (`= highest key`, `2` in the example)
     * password will be used to encrypt the cookie. This allows password rotation.
     *
     * @example { 1: 'password-1', 2: 'password-2' }
     */
    password: Password;
    /**
     * The time (in seconds) that the session will be valid for. Also sets the
     * `max-age` attribute of the cookie automatically (`= ttl - 60s`, so that the
     * cookie always expire before the session).
     *
     * `ttl = 0` means no expiration.
     *
     * @default 1209600
     */
    ttl?: number;
    /**
     * The options that will be passed to the cookie library.
     *
     * If you want to use "session cookies" (cookies that are deleted when the browser
     * is closed) then you need to pass `cookieOptions: { maxAge: undefined }`
     *
     * @see https://github.com/jshttp/cookie#options-1
     */
    cookieOptions?: CookieSerializeOptions;
}
type OverridableOptions = Pick<IronSessionOptions, 'cookieOptions' | 'ttl'>;
type IronSession<T> = T & {
    /**
     * Destroys the session data and removes the cookie.
     */
    readonly destroy: (destroyOptions?: OverridableOptions) => Promise<void>;
    /**
     * Encrypts the session data and sets the cookie.
     */
    readonly save: (saveOptions?: OverridableOptions) => Promise<void>;
};
declare function createSealData(_crypto?: Crypto): (data: unknown, { password, ttl }: {
    password: Password;
    ttl?: number;
}) => Promise<string>;
declare function createUnsealData(_crypto?: Crypto): <T extends {} = {}>(seal: string, { password, ttl }: {
    password: Password;
    ttl?: number;
}) => Promise<T>;
declare function createGetIronSession(sealData: ReturnType<typeof createSealData>, unsealData: ReturnType<typeof createUnsealData>): <T extends {} = {}>(req: RequestType, res: ResponseType, userSessionOptions: IronSessionOptions) => Promise<IronSession<T>>;
declare function createGetServerActionIronSession(sealData: ReturnType<typeof createSealData>, unsealData: ReturnType<typeof createUnsealData>): <T extends {} = {}>(userSessionOptions: IronSessionOptions, cookieHandler: ICookieHandler) => Promise<IronSession<T>>;
declare function mergeHeaders(...headersList: (HeadersInit | undefined)[]): Headers;
declare function createResponse(originalResponse: Response, bodyString: string, options?: ResponseInit): Response;

declare const sealData: (data: unknown, { password, ttl }: {
    password: string | {
        [x: string]: string;
    };
    ttl?: number;
}) => Promise<string>;
declare const unsealData: <T extends {} = {}>(seal: string, { password, ttl }: {
    password: string | {
        [x: string]: string;
    };
    ttl?: number;
}) => Promise<T>;
declare const getIronSession: <T extends {} = {}>(req: http.IncomingMessage | Request, res: Response | http.ServerResponse<http.IncomingMessage>, userSessionOptions: IronSessionOptions) => Promise<IronSession<T>>;
declare const getServerActionIronSession: <T extends {} = {}>(userSessionOptions: IronSessionOptions, cookieHandler: ICookieHandler) => Promise<IronSession<T>>;

export { ICookieHandler, IronSession, IronSessionOptions, createGetIronSession, createGetServerActionIronSession, createResponse, createSealData, createUnsealData, getIronSession, getServerActionIronSession, mergeHeaders, sealData, unsealData };
