import crypto from 'crypto';

var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/.pnpm/cookie@0.5.0/node_modules/cookie/index.js
var require_cookie = __commonJS({
  "node_modules/.pnpm/cookie@0.5.0/node_modules/cookie/index.js"(exports) {
    exports.parse = parse2;
    exports.serialize = serialize2;
    var __toString = Object.prototype.toString;
    var fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
    function parse2(str, options) {
      if (typeof str !== "string") {
        throw new TypeError("argument str must be a string");
      }
      var obj = {};
      var opt = options || {};
      var dec = opt.decode || decode;
      var index = 0;
      while (index < str.length) {
        var eqIdx = str.indexOf("=", index);
        if (eqIdx === -1) {
          break;
        }
        var endIdx = str.indexOf(";", index);
        if (endIdx === -1) {
          endIdx = str.length;
        } else if (endIdx < eqIdx) {
          index = str.lastIndexOf(";", eqIdx - 1) + 1;
          continue;
        }
        var key = str.slice(index, eqIdx).trim();
        if (void 0 === obj[key]) {
          var val = str.slice(eqIdx + 1, endIdx).trim();
          if (val.charCodeAt(0) === 34) {
            val = val.slice(1, -1);
          }
          obj[key] = tryDecode(val, dec);
        }
        index = endIdx + 1;
      }
      return obj;
    }
    function serialize2(name, val, options) {
      var opt = options || {};
      var enc = opt.encode || encode;
      if (typeof enc !== "function") {
        throw new TypeError("option encode is invalid");
      }
      if (!fieldContentRegExp.test(name)) {
        throw new TypeError("argument name is invalid");
      }
      var value = enc(val);
      if (value && !fieldContentRegExp.test(value)) {
        throw new TypeError("argument val is invalid");
      }
      var str = name + "=" + value;
      if (null != opt.maxAge) {
        var maxAge = opt.maxAge - 0;
        if (isNaN(maxAge) || !isFinite(maxAge)) {
          throw new TypeError("option maxAge is invalid");
        }
        str += "; Max-Age=" + Math.floor(maxAge);
      }
      if (opt.domain) {
        if (!fieldContentRegExp.test(opt.domain)) {
          throw new TypeError("option domain is invalid");
        }
        str += "; Domain=" + opt.domain;
      }
      if (opt.path) {
        if (!fieldContentRegExp.test(opt.path)) {
          throw new TypeError("option path is invalid");
        }
        str += "; Path=" + opt.path;
      }
      if (opt.expires) {
        var expires = opt.expires;
        if (!isDate(expires) || isNaN(expires.valueOf())) {
          throw new TypeError("option expires is invalid");
        }
        str += "; Expires=" + expires.toUTCString();
      }
      if (opt.httpOnly) {
        str += "; HttpOnly";
      }
      if (opt.secure) {
        str += "; Secure";
      }
      if (opt.priority) {
        var priority = typeof opt.priority === "string" ? opt.priority.toLowerCase() : opt.priority;
        switch (priority) {
          case "low":
            str += "; Priority=Low";
            break;
          case "medium":
            str += "; Priority=Medium";
            break;
          case "high":
            str += "; Priority=High";
            break;
          default:
            throw new TypeError("option priority is invalid");
        }
      }
      if (opt.sameSite) {
        var sameSite = typeof opt.sameSite === "string" ? opt.sameSite.toLowerCase() : opt.sameSite;
        switch (sameSite) {
          case true:
            str += "; SameSite=Strict";
            break;
          case "lax":
            str += "; SameSite=Lax";
            break;
          case "strict":
            str += "; SameSite=Strict";
            break;
          case "none":
            str += "; SameSite=None";
            break;
          default:
            throw new TypeError("option sameSite is invalid");
        }
      }
      return str;
    }
    function decode(str) {
      return str.indexOf("%") !== -1 ? decodeURIComponent(str) : str;
    }
    function encode(val) {
      return encodeURIComponent(val);
    }
    function isDate(val) {
      return __toString.call(val) === "[object Date]" || val instanceof Date;
    }
    function tryDecode(str, decode2) {
      try {
        return decode2(str);
      } catch (e) {
        return str;
      }
    }
  }
});

// src/core.ts
var import_cookie = __toESM(require_cookie(), 1);

// node_modules/.pnpm/iron-webcrypto@0.7.0/node_modules/iron-webcrypto/dist/index.js
var alphabetByEncoding = {};
var alphabetByValue = new Array(64);
for (let i = 0, start = "A".charCodeAt(0), limit = "Z".charCodeAt(0); i + start <= limit; i++) {
  const char = String.fromCharCode(i + start);
  alphabetByEncoding[char] = i;
  alphabetByValue[i] = char;
}
for (let i = 0, start = "a".charCodeAt(0), limit = "z".charCodeAt(0); i + start <= limit; i++) {
  const char = String.fromCharCode(i + start);
  const index = i + 26;
  alphabetByEncoding[char] = index;
  alphabetByValue[index] = char;
}
for (let i = 0; i < 10; i++) {
  alphabetByEncoding[i.toString(10)] = i + 52;
  const char = i.toString(10);
  const index = i + 52;
  alphabetByEncoding[char] = index;
  alphabetByValue[index] = char;
}
alphabetByEncoding["+"] = 62;
alphabetByValue[62] = "+";
alphabetByEncoding["/"] = 63;
alphabetByValue[63] = "/";
var bitsPerLetter = 6;
var bitsPerByte = 8;
var maxLetterValue = 63;
var fromBase64 = (input) => {
  let totalByteLength = input.length / 4 * 3;
  if (input.slice(-2) === "==") {
    totalByteLength -= 2;
  } else if (input.slice(-1) === "=") {
    totalByteLength--;
  }
  const out = new ArrayBuffer(totalByteLength);
  const dataView = new DataView(out);
  for (let i = 0; i < input.length; i += 4) {
    let bits = 0;
    let bitLength = 0;
    for (let j = i, limit = i + 3; j <= limit; j++) {
      if (input[j] !== "=") {
        if (!(input[j] in alphabetByEncoding)) {
          throw new TypeError(`Invalid character ${input[j]} in base64 string.`);
        }
        bits |= alphabetByEncoding[input[j]] << (limit - j) * bitsPerLetter;
        bitLength += bitsPerLetter;
      } else {
        bits >>= bitsPerLetter;
      }
    }
    const chunkOffset = i / 4 * 3;
    bits >>= bitLength % bitsPerByte;
    const byteLength = Math.floor(bitLength / bitsPerByte);
    for (let k = 0; k < byteLength; k++) {
      const offset = (byteLength - k - 1) * bitsPerByte;
      dataView.setUint8(chunkOffset + k, (bits & 255 << offset) >> offset);
    }
  }
  return new Uint8Array(out);
};
function toBase64(input) {
  let str = "";
  for (let i = 0; i < input.length; i += 3) {
    let bits = 0;
    let bitLength = 0;
    for (let j = i, limit = Math.min(i + 3, input.length); j < limit; j++) {
      bits |= input[j] << (limit - j - 1) * bitsPerByte;
      bitLength += bitsPerByte;
    }
    const bitClusterCount = Math.ceil(bitLength / bitsPerLetter);
    bits <<= bitClusterCount * bitsPerLetter - bitLength;
    for (let k = 1; k <= bitClusterCount; k++) {
      const offset = (bitClusterCount - k) * bitsPerLetter;
      str += alphabetByValue[(bits & maxLetterValue << offset) >> offset];
    }
    str += "==".slice(0, 4 - bitClusterCount);
  }
  return str;
}
var stringToBuffer = (value) => {
  return new TextEncoder().encode(value);
};
var bufferToString = (value) => {
  return new TextDecoder().decode(value);
};
var base64urlEncode = (value) => toBase64(value instanceof Uint8Array ? value : stringToBuffer(value)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
var base64urlDecode = (value) => fromBase64(
  value.replace(/-/g, "+").replace(/_/g, "/") + Array((4 - value.length % 4) % 4 + 1).join("=")
);
var defaults = {
  encryption: { saltBits: 256, algorithm: "aes-256-cbc", iterations: 1, minPasswordlength: 32 },
  integrity: { saltBits: 256, algorithm: "sha256", iterations: 1, minPasswordlength: 32 },
  ttl: 0,
  timestampSkewSec: 60,
  localtimeOffsetMsec: 0
};
var clone = (options) => ({
  ...options,
  encryption: { ...options.encryption },
  integrity: { ...options.integrity }
});
var algorithms = {
  "aes-128-ctr": { keyBits: 128, ivBits: 128, name: "AES-CTR" },
  "aes-256-cbc": { keyBits: 256, ivBits: 128, name: "AES-CBC" },
  sha256: { keyBits: 256, name: "SHA-256" }
};
var macFormatVersion = "2";
var macPrefix = `Fe26.${macFormatVersion}`;
var randomBytes = (_crypto, size) => {
  const bytes = new Uint8Array(size);
  _crypto.getRandomValues(bytes);
  return bytes;
};
var randomBits = (_crypto, bits) => {
  if (bits < 1)
    throw Error("Invalid random bits count");
  const bytes = Math.ceil(bits / 8);
  return randomBytes(_crypto, bytes);
};
var pbkdf2 = async (_crypto, password, salt, iterations, keyLength, hash) => {
  const passwordBuffer = stringToBuffer(password);
  const importedKey = await _crypto.subtle.importKey("raw", passwordBuffer, "PBKDF2", false, [
    "deriveBits"
  ]);
  const saltBuffer = stringToBuffer(salt);
  const params = { name: "PBKDF2", hash, salt: saltBuffer, iterations };
  const derivation = await _crypto.subtle.deriveBits(params, importedKey, keyLength * 8);
  return derivation;
};
var generateKey = async (_crypto, password, options) => {
  if (password == null || !password.length)
    throw new Error("Empty password");
  if (options == null || typeof options !== "object")
    throw new Error("Bad options");
  if (!(options.algorithm in algorithms))
    throw new Error(`Unknown algorithm: ${options.algorithm}`);
  const algorithm = algorithms[options.algorithm];
  const result = {};
  const hmac = options.hmac ?? false;
  const id = hmac ? { name: "HMAC", hash: algorithm.name } : { name: algorithm.name };
  const usage = hmac ? ["sign", "verify"] : ["encrypt", "decrypt"];
  if (typeof password === "string") {
    if (password.length < options.minPasswordlength)
      throw new Error(
        `Password string too short (min ${options.minPasswordlength} characters required)`
      );
    let { salt = "" } = options;
    if (!salt) {
      const { saltBits = 0 } = options;
      if (!saltBits)
        throw new Error("Missing salt and saltBits options");
      const randomSalt = randomBits(_crypto, saltBits);
      salt = [...new Uint8Array(randomSalt)].map((x) => x.toString(16).padStart(2, "0")).join("");
    }
    const derivedKey = await pbkdf2(
      _crypto,
      password,
      salt,
      options.iterations,
      algorithm.keyBits / 8,
      "SHA-1"
    );
    const importedEncryptionKey = await _crypto.subtle.importKey(
      "raw",
      derivedKey,
      id,
      false,
      usage
    );
    result.key = importedEncryptionKey;
    result.salt = salt;
  } else {
    if (password.length < algorithm.keyBits / 8)
      throw new Error("Key buffer (password) too small");
    result.key = await _crypto.subtle.importKey("raw", password, id, false, usage);
    result.salt = "";
  }
  if (options.iv)
    result.iv = options.iv;
  else if ("ivBits" in algorithm)
    result.iv = randomBits(_crypto, algorithm.ivBits);
  return result;
};
var encrypt = async (_crypto, password, options, data) => {
  const key = await generateKey(_crypto, password, options);
  const textBuffer = stringToBuffer(data);
  const encrypted = await _crypto.subtle.encrypt(
    { name: algorithms[options.algorithm].name, iv: key.iv },
    key.key,
    textBuffer
  );
  return { encrypted: new Uint8Array(encrypted), key };
};
var decrypt = async (_crypto, password, options, data) => {
  const key = await generateKey(_crypto, password, options);
  const decrypted = await _crypto.subtle.decrypt(
    { name: algorithms[options.algorithm].name, iv: key.iv },
    key.key,
    typeof data === "string" ? stringToBuffer(data) : data
  );
  return bufferToString(new Uint8Array(decrypted));
};
var hmacWithPassword = async (_crypto, password, options, data) => {
  const key = await generateKey(_crypto, password, { ...options, hmac: true });
  const textBuffer = stringToBuffer(data);
  const signed = await _crypto.subtle.sign({ name: "HMAC" }, key.key, textBuffer);
  const digest = base64urlEncode(new Uint8Array(signed));
  return { digest, salt: key.salt };
};
var normalizePassword = (password) => {
  if (typeof password === "string" || password instanceof Uint8Array)
    return { encryption: password, integrity: password };
  if ("secret" in password)
    return { id: password.id, encryption: password.secret, integrity: password.secret };
  return { id: password.id, encryption: password.encryption, integrity: password.integrity };
};
var seal = async (_crypto, object, password, options) => {
  if (!password)
    throw Error("Empty password");
  const opts = clone(options);
  const now = Date.now() + (opts.localtimeOffsetMsec || 0);
  const objectString = JSON.stringify(object);
  const pass = normalizePassword(password);
  const { id = "" } = pass;
  if (id && !/^\w+$/.test(id))
    throw new Error("Invalid password id");
  const { encrypted, key } = await encrypt(_crypto, pass.encryption, opts.encryption, objectString);
  const encryptedB64 = base64urlEncode(new Uint8Array(encrypted));
  const iv = base64urlEncode(key.iv);
  const expiration = opts.ttl ? now + opts.ttl : "";
  const macBaseString = `${macPrefix}*${id}*${key.salt}*${iv}*${encryptedB64}*${expiration}`;
  const mac = await hmacWithPassword(_crypto, pass.integrity, opts.integrity, macBaseString);
  const sealed = `${macBaseString}*${mac.salt}*${mac.digest}`;
  return sealed;
};
var fixedTimeComparison = (a, b) => {
  let mismatch = a.length === b.length ? 0 : 1;
  if (mismatch)
    b = a;
  for (let i = 0; i < a.length; i += 1)
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return mismatch === 0;
};
var unseal = async (_crypto, sealed, password, options) => {
  if (!password)
    throw Error("Empty password");
  const opts = clone(options);
  const now = Date.now() + (opts.localtimeOffsetMsec || 0);
  const parts = sealed.split("*");
  if (parts.length !== 8)
    throw new Error("Incorrect number of sealed components");
  const prefix = parts[0];
  let passwordId = parts[1];
  const encryptionSalt = parts[2];
  const encryptionIv = parts[3];
  const encryptedB64 = parts[4];
  const expiration = parts[5];
  const hmacSalt = parts[6];
  const hmac = parts[7];
  const macBaseString = `${prefix}*${passwordId}*${encryptionSalt}*${encryptionIv}*${encryptedB64}*${expiration}`;
  if (macPrefix !== prefix)
    throw new Error("Wrong mac prefix");
  if (expiration) {
    if (!/^\d+$/.exec(expiration))
      throw new Error("Invalid expiration");
    const exp = parseInt(expiration, 10);
    if (exp <= now - opts.timestampSkewSec * 1e3)
      throw new Error("Expired seal");
  }
  if (typeof password === "undefined" || typeof password === "string" && password.length === 0)
    throw new Error("Empty password");
  let pass = "";
  passwordId = passwordId || "default";
  if (typeof password === "string" || password instanceof Uint8Array)
    pass = password;
  else if (!(passwordId in password))
    throw new Error(`Cannot find password: ${passwordId}`);
  else
    pass = password[passwordId];
  pass = normalizePassword(pass);
  const macOptions = opts.integrity;
  macOptions.salt = hmacSalt;
  const mac = await hmacWithPassword(_crypto, pass.integrity, macOptions, macBaseString);
  if (!fixedTimeComparison(mac.digest, hmac))
    throw new Error("Bad hmac value");
  const encrypted = base64urlDecode(encryptedB64);
  const decryptOptions = opts.encryption;
  decryptOptions.salt = encryptionSalt;
  decryptOptions.iv = base64urlDecode(encryptionIv);
  const decrypted = await decrypt(_crypto, pass.encryption, decryptOptions, encrypted);
  if (decrypted)
    return JSON.parse(decrypted);
  return null;
};

// src/core.ts
var timestampSkewSec = 60;
var fourteenDaysInSeconds = 14 * 24 * 3600;
var currentMajorVersion = 2;
var versionDelimiter = "~";
var defaultOptions = {
  ttl: fourteenDaysInSeconds,
  cookieOptions: { httpOnly: true, secure: true, sameSite: "lax", path: "/" }
};
function normalizeStringPasswordToMap(password) {
  return typeof password === "string" ? { 1: password } : password;
}
function parseSeal(seal2) {
  const [sealWithoutVersion, tokenVersionAsString] = seal2.split(versionDelimiter);
  const tokenVersion = tokenVersionAsString == null ? null : parseInt(tokenVersionAsString, 10);
  return { sealWithoutVersion, tokenVersion };
}
function computeCookieMaxAge(ttl) {
  if (ttl === 0) {
    return 2147483647;
  }
  return ttl - timestampSkewSec;
}
function getCookie(req, cookieName) {
  return (0, import_cookie.parse)(
    ("headers" in req && typeof req.headers.get === "function" ? req.headers.get("cookie") : req.headers.cookie) ?? ""
  )[cookieName] ?? "";
}
function getServerActionCookie(cookieName, cookieHandler) {
  const cookieObject = cookieHandler.get(cookieName);
  const cookie = cookieObject?.value;
  if (typeof cookie === "string") {
    return cookie;
  }
  return "";
}
function extractCookieComponents(cookieValue) {
  const components = cookieValue.split(";");
  if (components.length > 0) {
    const firstPart = components[0];
    if (typeof firstPart === "string") {
      const parts = firstPart.trim().split("=");
      if (parts.length === 2 && typeof parts[0] === "string" && typeof parts[1] === "string") {
        return { cookieName: parts[0], cookieData: parts[1] };
      }
    }
  }
  return null;
}
function setCookie(res, cookieValue) {
  if ("headers" in res && typeof res.headers.append === "function") {
    res.headers.append("set-cookie", cookieValue);
    return;
  }
  let existingSetCookie = res.getHeader("set-cookie") ?? [];
  if (!Array.isArray(existingSetCookie)) {
    existingSetCookie = [existingSetCookie.toString()];
  }
  res.setHeader("set-cookie", [...existingSetCookie, cookieValue]);
}
function setServerActionCookie(cookieValue, cookieHandler) {
  const extracted = extractCookieComponents(cookieValue);
  if (extracted !== null) {
    const { cookieName, cookieData } = extracted;
    cookieHandler.set(cookieName, cookieData);
  }
}
function createSealData(_crypto = globalThis.crypto) {
  return async function sealData2(data, { password, ttl = fourteenDaysInSeconds }) {
    const passwordsMap = normalizeStringPasswordToMap(password);
    const mostRecentPasswordId = Math.max(...Object.keys(passwordsMap).map(Number));
    const passwordForSeal = {
      id: mostRecentPasswordId.toString(),
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      secret: passwordsMap[mostRecentPasswordId]
    };
    const seal2 = await seal(_crypto, data, passwordForSeal, {
      ...defaults,
      ttl: ttl * 1e3
    });
    return `${seal2}${versionDelimiter}${currentMajorVersion}`;
  };
}
function createUnsealData(_crypto = globalThis.crypto) {
  return async function unsealData2(seal2, { password, ttl = fourteenDaysInSeconds }) {
    const passwordsMap = normalizeStringPasswordToMap(password);
    const { sealWithoutVersion, tokenVersion } = parseSeal(seal2);
    try {
      const data = await unseal(_crypto, sealWithoutVersion, passwordsMap, {
        ...defaults,
        ttl: ttl * 1e3
      }) ?? {};
      if (tokenVersion === 2) {
        return data;
      }
      return { ...data.persistent };
    } catch (error) {
      if (error instanceof Error && /^(Expired seal|Bad hmac value|Cannot find password|Incorrect number of sealed components)/.test(
        error.message
      )) {
        return {};
      }
      throw error;
    }
  };
}
function mergeOptions(userSessionOptions, overrides) {
  const options = {
    ...defaultOptions,
    ...userSessionOptions,
    ...overrides,
    cookieOptions: {
      ...defaultOptions.cookieOptions,
      ...userSessionOptions.cookieOptions,
      ...overrides?.cookieOptions
    }
  };
  if (userSessionOptions.cookieOptions && "maxAge" in userSessionOptions.cookieOptions) {
    if (userSessionOptions.cookieOptions.maxAge === void 0) {
      options.ttl = 0;
    }
  } else {
    options.cookieOptions.maxAge = computeCookieMaxAge(options.ttl);
  }
  return options;
}
function createGetIronSession(sealData2, unsealData2) {
  return async function getIronSession2(req, res, userSessionOptions) {
    if (!req) {
      throw new Error("iron-session: Bad usage. Missing request parameter.");
    }
    if (!res) {
      throw new Error("iron-session: Bad usage. Missing response parameter.");
    }
    if (!userSessionOptions) {
      throw new Error("iron-session: Bad usage. Missing options.");
    }
    if (!userSessionOptions.cookieName) {
      throw new Error("iron-session: Bad usage. Missing cookie name.");
    }
    if (!userSessionOptions.password) {
      throw new Error("iron-session: Bad usage. Missing password.");
    }
    const passwordsMap = normalizeStringPasswordToMap(userSessionOptions.password);
    if (Object.values(passwordsMap).some((password) => password.length < 32)) {
      throw new Error("iron-session: Bad usage. Password must be at least 32 characters long.");
    }
    const options = mergeOptions(userSessionOptions);
    const sealFromCookies = getCookie(req, options.cookieName);
    const session = sealFromCookies ? await unsealData2(sealFromCookies, { password: passwordsMap, ttl: options.ttl }) : {};
    Object.defineProperties(session, {
      save: {
        value: async function save(saveOptions) {
          if ("headersSent" in res && res.headersSent) {
            throw new Error(
              "iron-session: Cannot set session cookie: session.save() was called after headers were sent. Make sure to call it before any res.send() or res.end()"
            );
          }
          const mergedOptions = mergeOptions(userSessionOptions, saveOptions);
          const seal2 = await sealData2(session, { password: passwordsMap, ttl: mergedOptions.ttl });
          const cookieValue = (0, import_cookie.serialize)(mergedOptions.cookieName, seal2, mergedOptions.cookieOptions);
          if (cookieValue.length > 4096) {
            throw new Error(
              `iron-session: Cookie length is too big (${cookieValue.length} bytes), browsers will refuse it. Try to remove some data.`
            );
          }
          setCookie(res, cookieValue);
        }
      },
      destroy: {
        value: async function destroy(destroyOptions) {
          Object.keys(session).forEach((key) => {
            delete session[key];
          });
          const mergedOptions = mergeOptions(userSessionOptions, destroyOptions);
          const cookieValue = (0, import_cookie.serialize)(mergedOptions.cookieName, "", {
            ...mergedOptions.cookieOptions,
            maxAge: 0
          });
          setCookie(res, cookieValue);
        }
      }
    });
    return session;
  };
}
function createGetServerActionIronSession(sealData2, unsealData2) {
  return async function getServerActionIronSession2(userSessionOptions, cookieHandler) {
    if (!userSessionOptions) {
      throw new Error("iron-session: Bad usage. Missing options.");
    }
    if (!cookieHandler) {
      throw new Error("iron-session: Bad usage. Missing NextJS cookies() handler.");
    }
    if (!userSessionOptions.cookieName) {
      throw new Error("iron-session: Bad usage. Missing cookie name.");
    }
    if (!userSessionOptions.password) {
      throw new Error("iron-session: Bad usage. Missing password.");
    }
    const passwordsMap = normalizeStringPasswordToMap(userSessionOptions.password);
    if (Object.values(passwordsMap).some((password) => password.length < 32)) {
      throw new Error("iron-session: Bad usage. Password must be at least 32 characters long.");
    }
    const options = mergeOptions(userSessionOptions);
    const sealFromCookies = getServerActionCookie(options.cookieName, cookieHandler);
    const session = sealFromCookies ? await unsealData2(sealFromCookies, { password: passwordsMap, ttl: options.ttl }) : {};
    Object.defineProperties(session, {
      save: {
        value: async function save(saveOptions) {
          const mergedOptions = mergeOptions(userSessionOptions, saveOptions);
          const seal2 = await sealData2(session, { password: passwordsMap, ttl: mergedOptions.ttl });
          const cookieValue = (0, import_cookie.serialize)(mergedOptions.cookieName, seal2, mergedOptions.cookieOptions);
          if (cookieValue.length > 4096) {
            throw new Error(
              `iron-session: Cookie length is too big (${cookieValue.length} bytes), browsers will refuse it. Try to remove some data.`
            );
          }
          setServerActionCookie(cookieValue, cookieHandler);
        }
      },
      destroy: {
        value: async function destroy(destroyOptions) {
          Object.keys(session).forEach((key) => {
            delete session[key];
          });
          const mergedOptions = mergeOptions(userSessionOptions, destroyOptions);
          const cookieValue = (0, import_cookie.serialize)(mergedOptions.cookieName, "", {
            ...mergedOptions.cookieOptions,
            maxAge: 0
          });
          setServerActionCookie(cookieValue, cookieHandler);
        }
      }
    });
    return session;
  };
}
function mergeHeaders(...headersList) {
  const mergedHeaders = new Headers();
  headersList.forEach((headers) => {
    new Headers(headers).forEach((value, key) => {
      mergedHeaders.append(key, value);
    });
  });
  return mergedHeaders;
}
function createResponse(originalResponse, bodyString, options) {
  return new Response(bodyString, {
    status: options?.status ?? originalResponse.status,
    statusText: options?.statusText ?? originalResponse.statusText,
    headers: mergeHeaders(options?.headers, originalResponse.headers)
  });
}

// src/index.node.ts
var sealData = createSealData(crypto.webcrypto);
var unsealData = createUnsealData(crypto.webcrypto);
var getIronSession = createGetIronSession(sealData, unsealData);
var getServerActionIronSession = createGetServerActionIronSession(sealData, unsealData);
/*! Bundled license information:

cookie/index.js:
  (*!
   * cookie
   * Copyright(c) 2012-2014 Roman Shtylman
   * Copyright(c) 2015 Douglas Christopher Wilson
   * MIT Licensed
   *)
*/

export { createGetIronSession, createGetServerActionIronSession, createResponse, createSealData, createUnsealData, getIronSession, getServerActionIronSession, mergeHeaders, sealData, unsealData };
