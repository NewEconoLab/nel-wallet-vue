﻿/// <reference path="RandomNumberGenerator.ts"/>

interface String {
    base58Decode(): Uint8Array;
    base64UrlDecode(): Uint8Array;
    toAesKey(): PromiseLike<ArrayBuffer>;
}

interface Uint8Array {
    base58Encode(): string;
    base64UrlEncode(): string;
}
declare function escape(s:string): string;
declare function unescape(s: string): string;

namespace Neo.Cryptography {
    String.prototype.base58Decode = function (): Uint8Array {
        return Base58.decode(this);
    }

    String.prototype.base64UrlDecode = function (): Uint8Array {
        let str = window.atob(this.replace(/-/g, '+').replace(/_/g, '/'));
        let arr = new Uint8Array(str.length);
        for (let i = 0; i < str.length; i++)
            arr[i] = str.charCodeAt(i);
        return arr;
    }

    String.prototype.toAesKey = function (): PromiseLike<ArrayBuffer> {
        let utf8 = unescape(encodeURIComponent(this));
        let codes = new Uint8Array(utf8.length);
        for (let i = 0; i < codes.length; i++)
            codes[i] = utf8.charCodeAt(i);
        return window.crypto.subtle.digest({ name: "SHA-256" }, codes).then(result => {
            return window.crypto.subtle.digest({ name: "SHA-256" }, result);
        });
    }

    Uint8Array.prototype.base58Encode = function () {
        return Base58.encode(this);
    }

    Uint8Array.prototype.base64UrlEncode = function () {
        let str: string = String.fromCharCode.apply(null, this);
        str = window.btoa(str);
        return str.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
    }

    let getAlgorithmName = (algorithm: string | Algorithm) => typeof algorithm === "string" ? algorithm : algorithm.name;
    let w = window as any;
    if (window.crypto == null)
        (window as any).crypto = { subtle: null, getRandomValues: null };
    if (window.crypto.getRandomValues == null) {
        if (w.msCrypto) {
            w.crypto.getRandomValues = array => w.msCrypto.getRandomValues(array);
        }
        else {
            RandomNumberGenerator.startCollectors();
            window.crypto.getRandomValues = RandomNumberGenerator.getRandomValues;
        }
    }
    w.crypto.subtle = window.crypto.subtle || w.crypto.webkitSubtle;
    if (window.crypto.subtle == null && w.msCrypto) {
        (window as any).crypto.subtle = {
            decrypt: (a, b, c) => new NeoPromise((resolve, reject) => { let op = w.msCrypto.subtle.decrypt(a, b, c) as any; op.oncomplete = () => resolve(op.result); op.onerror = e => reject(e); }),
            deriveBits: (a, b, c) => new NeoPromise((resolve, reject) => { let op = w.msCrypto.subtle.deriveBits(a, b, c) as any; op.oncomplete = () => resolve(op.result); op.onerror = e => reject(e); }),
            deriveKey: (a, b, c, d, e) => new NeoPromise((resolve, reject) => { let op = w.msCrypto.subtle.deriveKey(a, b, c, d, e) as any; op.oncomplete = () => resolve(op.result); op.onerror = e => reject(e); }),
            digest: (a, b) => new NeoPromise((resolve, reject) => { let op = w.msCrypto.subtle.digest(a, b); op.oncomplete = () => resolve(op.result); op.onerror = e => reject(e); }),
            encrypt: (a, b, c) => new NeoPromise((resolve, reject) => { let op = w.msCrypto.subtle.encrypt(a, b, c) as any; op.oncomplete = () => resolve(op.result); op.onerror = e => reject(e); }),
            exportKey: (a, b) => new NeoPromise((resolve, reject) => { let op = w.msCrypto.subtle.exportKey(a, b) as any; op.oncomplete = () => resolve(op.result); op.onerror = e => reject(e); }),
            generateKey: (a, b, c) => new NeoPromise((resolve, reject) => { let op = w.msCrypto.subtle.generateKey(a, b, c) as any; op.oncomplete = () => resolve(op.result); op.onerror = e => reject(e); }),
            importKey: (a, b, c, d, e) => new NeoPromise((resolve, reject) => { let op = w.msCrypto.subtle.importKey(a, b, c, d, e) as any; op.oncomplete = () => resolve(op.result); op.onerror = e => reject(e); }),
            sign: (a, b, c) => new NeoPromise((resolve, reject) => { let op = w.msCrypto.subtle.sign(a, b, c) as any; op.oncomplete = () => resolve(op.result); op.onerror = e => reject(e); }),
            unwrapKey: (a, b, c, d, e, f, g) => new NeoPromise((resolve, reject) => { let op = w.msCrypto.subtle.unwrapKey(a, b, c, d, e, f, g) as any; op.oncomplete = () => resolve(op.result); op.onerror = e => reject(e); }),
            verify: (a, b, c, d) => new NeoPromise((resolve, reject) => { let op = w.msCrypto.subtle.verify(a, b, c, d) as any; op.oncomplete = () => resolve(op.result); op.onerror = e => reject(e); }),
            wrapKey: (a, b, c, d) => new NeoPromise((resolve, reject) => { let op = w.msCrypto.subtle.wrapKey(a, b, c, d) as any; op.oncomplete = () => resolve(op.result); op.onerror = e => reject(e); }),
        };
    }
    if (window.crypto.subtle == null) {
        (window as any).crypto.subtle = {
            decrypt: (algorithm, key, data) => new NeoPromise((resolve, reject) => {
                if (typeof algorithm === "string" || algorithm.name != "AES-CBC" || !algorithm.iv || algorithm.iv.byteLength != 16 || data.byteLength % 16 != 0) {
                    reject(new RangeError());
                    return;
                }
                try {
                    let aes = new Aes((key as any).export(), (algorithm as any).iv);
                    resolve(aes.decrypt(data));
                }
                catch (e) {
                    reject(e);
                }
            }),
            deriveBits: null,
            deriveKey: null,
            digest: (algorithm, data) => new NeoPromise((resolve, reject) => {
                if (getAlgorithmName(algorithm) != "SHA-256") {
                    reject(new RangeError());
                    return;
                }
                try {
                    resolve(Sha256.computeHash(data));
                }
                catch (e) {
                    reject(e);
                }
            }),
            encrypt: (algorithm, key, data) => new NeoPromise((resolve, reject) => {
                if (typeof algorithm === "string" || algorithm.name != "AES-CBC" || !algorithm.iv || algorithm.iv.byteLength != 16) {
                    reject(new RangeError());
                    return;
                }
                try {
                    let aes = new Aes((key as AesCryptoKey).export(), (algorithm as any).iv);
                    resolve(aes.encrypt(data));
                }
                catch (e) {
                    reject(e);
                }
            }),
            exportKey: (format, key) => new NeoPromise((resolve, reject) => {
                if (format != "jwk" || !(key instanceof AesCryptoKey)) {
                    reject(new RangeError());
                    return;
                }
                try {
                    let k = key as AesCryptoKey;
                    resolve({
                        alg: "A256CBC",
                        ext: true,
                        k: k.export().base64UrlEncode(),
                        key_ops: k.usages,
                        kty: "oct"
                    });
                }
                catch (e) {
                    reject(e);
                }
            }),
            generateKey: (algorithm, extractable, keyUsages) => new NeoPromise((resolve, reject) => {
                if (typeof algorithm === "string" || algorithm.name != "AES-CBC" || (algorithm.length != 128 && algorithm.length != 192 && algorithm.length != 256)) {
                    reject(new RangeError());
                    return;
                }
                try {
                    resolve(AesCryptoKey.create(algorithm.length));
                }
                catch (e) {
                    reject(e);
                }
            }),
            importKey: (format, keyData, algorithm, extractable, keyUsages) => new NeoPromise((resolve, reject) => {
                if ((format != "raw" && format != "jwk") || getAlgorithmName(algorithm) != "AES-CBC") {
                    reject(new RangeError());
                    return;
                }
                try {
                    if (format == "jwk")
                        keyData = (keyData as any).k.base64UrlDecode();
                    resolve(AesCryptoKey.import(keyData));
                }
                catch (e) {
                    reject(e);
                }
            }),
            sign: null,
            unwrapKey: null,
            verify: null,
            wrapKey: null,
        };
    }
    function hook_ripemd160() {
        let digest_old = window.crypto.subtle.digest;
        window.crypto.subtle.digest = (algorithm, data) => {
            if (getAlgorithmName(algorithm) != "RIPEMD-160") return digest_old.call(window.crypto.subtle, algorithm, data);
            return new NeoPromise<ArrayBuffer>((resolve, reject) => {
                try {
                    resolve(RIPEMD160.computeHash(data));
                }
                catch (e) {
                    reject(e);
                }
            });
        };
    }
    hook_ripemd160();
    function hook_ecdsa() {
        let exportKey_old = window.crypto.subtle.exportKey;
        window.crypto.subtle.exportKey = (format, key) => {
            if (key.algorithm.name != "ECDSA") return exportKey_old.call(window.crypto.subtle, format, key);
            return new NeoPromise((resolve, reject) => {
                let k = key as ECDsaCryptoKey;
                if (format != "jwk" || (k.algorithm as any).namedCurve != "P-256")
                    reject(new RangeError());
                else
                    try {
                        if (k.type == "private")
                            resolve({
                                crv: (k.algorithm as any).namedCurve,
                                d: k.privateKey.base64UrlEncode(),
                                ext: true,
                                key_ops: k.usages,
                                kty: "EC",
                                x: k.publicKey.x.value.toUint8Array(false, 32).base64UrlEncode(),
                                y: k.publicKey.y.value.toUint8Array(false, 32).base64UrlEncode()
                            });
                        else
                            resolve({
                                crv: (k.algorithm as any).namedCurve,
                                ext: true,
                                key_ops: k.usages,
                                kty: "EC",
                                x: k.publicKey.x.value.toUint8Array(false, 32).base64UrlEncode(),
                                y: k.publicKey.y.value.toUint8Array(false, 32).base64UrlEncode()
                            });
                    }
                    catch (e) {
                        reject(e);
                    }
            });
        };
        let generateKey_old = window.crypto.subtle.generateKey;
        window.crypto.subtle.generateKey = (algorithm, extractable, keyUsages) => {
            if (getAlgorithmName(algorithm) != "ECDSA") return generateKey_old.call(window.crypto.subtle, algorithm, extractable, keyUsages);
            return new NeoPromise((resolve, reject) => {
                if ((algorithm as any).namedCurve != "P-256")
                    reject(new RangeError());
                else
                    try {
                        resolve(ECDsa.generateKey(ECCurve.secp256r1));
                    }
                    catch (e) {
                        reject(e);
                    }
            });
        };
        let importKey_old = window.crypto.subtle.importKey;
        window.crypto.subtle.importKey = (format, keyData, algorithm, extractable, keyUsages) => {
            if (getAlgorithmName(algorithm) != "ECDSA") return importKey_old.call(window.crypto.subtle, format, keyData, algorithm, extractable, keyUsages);
            return new NeoPromise((resolve, reject) => {
                if (format != "jwk" || (algorithm as any).namedCurve != "P-256")
                    reject(new RangeError());
                else
                    try {
                        let k = keyData as any;
                        let x = k.x.base64UrlDecode();
                        let y = k.y.base64UrlDecode();
                        let arr = new Uint8Array(65);
                        arr[0] = 0x04;
                        Array.copy(x, 0, arr, 1, 32);
                        Array.copy(y, 0, arr, 33, 32);
                        let pubkey = ECPoint.decodePoint(arr, ECCurve.secp256r1);
                        if (k.d)
                            resolve(new ECDsaCryptoKey(pubkey, k.d.base64UrlDecode()));
                        else
                            resolve(new ECDsaCryptoKey(pubkey));
                    }
                    catch (e) {
                        reject(e);
                    }
            });
        };
        let sign_old = window.crypto.subtle.sign;
        window.crypto.subtle.sign = (algorithm, key, data) => {
            if (getAlgorithmName(algorithm as any) != "ECDSA") return sign_old.call(window.crypto.subtle, algorithm, key, data);
            return new NeoPromise((resolve, reject) => {
                if ((algorithm as any).hash.name != "SHA-256" || key.algorithm.name != "ECDSA")
                    reject(new RangeError());
                else
                    try {
                        let ecdsa = new ECDsa(key as ECDsaCryptoKey);
                        resolve(ecdsa.sign(data));
                    }
                    catch (e) {
                        reject(e);
                    }
            });
        };
        let verify_old = window.crypto.subtle.verify;
        window.crypto.subtle.verify = (algorithm, key, signature, data) => {
            if (getAlgorithmName(algorithm as any) != "ECDSA") return verify_old.call(window.crypto.subtle, algorithm, key, signature, data);
            return new NeoPromise((resolve, reject) => {
                if ((algorithm as any).hash.name != "SHA-256" || key.algorithm.name != "ECDSA")
                    reject(new RangeError());
                else
                    try {
                        let ecdsa = new ECDsa(key as ECDsaCryptoKey);
                        resolve(ecdsa.verify(data, signature));
                    }
                    catch (e) {
                        reject(e);
                    }
            });
        };
    }
    try {
        (window.crypto.subtle.generateKey({ name: "ECDSA", namedCurve: "P-256" }, false, ["sign", "verify"]) as any).catch(hook_ecdsa);
    }
    catch (ex) {
        hook_ecdsa();
    }
}
