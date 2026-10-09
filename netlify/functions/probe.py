# -*- coding: utf-8 -*-
"""Netlify 上游出口探针（cryptography 版）。
与 8765 jcy_server.py 同协议：login -> users/info，判定 Netlify 出口能否被上游接受。
20000=接受(可部署全接口) / 50008=被拒(同 Cloudflare) / connect 失败=网络层到不了该 IP:port。
"""
import base64, json, time, http.client
from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
from cryptography.hazmat.primitives.asymmetric import padding as _asym_pad
from cryptography.hazmat.primitives import serialization

HOST = "43.145.33.254"; PORT = 27990
APPID = "4150439554430529"; VERSION = "2024-07-02"
PLANFORM = "3"; INTERNAL = "1.0.0"
APP_VERSION = "1.1.5"; SYMBOL = "win32"
AES_KEY = b"ziISjqkXPsGUMRNGyWigxDGtJbfTdcGv"; AES_IV = b"WonrnVkxeIxDcFbv"; PARAMS_KEY = b"R5xThLNmXbpDOgyj"
SEND_B64 = "LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0KTUlJQklqQU5CZ2txaGtpRzl3MEJBUUVGQUFPQ0FROEFNSUlCQ2dLQ0FRRUFyMTBEYjM5YXBoWDlnWm5seDRyLwpZMU5rbEV4RVBQbk0xM2gvR3c2RHg0b1hlVmFFOW43NmZEQ0tYZ01SZzRkZjRaRGVYNzZibCtBRjdDdkhCQVRGCmFLcGk0eDhtZTBXMk5sOFpvdmxYbVl5N1hDa3FoRENNK29JcTlGMldhTUE1UzBqTmVKOW9QbUd4bXo0MUlTUkYKbTNqRGxuVS91U3pVTnJneGZmbWNMemVOTDBOYThkZkJVaU5NZXZkdlRkMnlwYWh0a21yS0lpNEdRNlFvSGVpdwpmUzZaWTA1eC8vTUphVzhzN0N5VHA1eUUvbDlISXBuc3FCcUx3azJ5NjJwSGJEZHRUWEIrSEhNVHE5Uzk3dVhICkpuYmZRMWRWdndmYzZUTGtub1Jmam44bzZTUnRLdVZVNW81eDZMekZFTStTOXFaTS9MdmMwaHJsNWFXRnJmaFEKMndJREFRQUIKLS0tLS1FTkQgUFVCTElDIEtFWS0tLS0tCg=="
RECV_PEM = "-----BEGIN RSA PRIVATE KEY-----\nMIIEpAIBAAKCAQEA0fciNSCS8o6Y7pJVH+4SxVgDJCipDou4teBUlfStdaKAh08g\ny5V2izx/XdzeGf9g4Xgd7UwxPr+QKG/RvFAfAO0AYQK4uPOnjzDQvGPUBEKwRoGv\ncM8zo4wvfbLUjfXywpDDLrT/PdolliWn3gJ83nl86Oe2pOiNlG1ojxP8IXjUWrYB\n275EyyulYxG2nWK8RLJG2OcXNdqttM4ILFgIbawB8l94nlRSxb1g2fa5PKGxq33L\ngTt0GnGoVduXfpCUM19q0ju8WSDdXjEUhnRWWBWiRu4Pum24pI5qrJiiANvkg6fe\nk/tE0THUBlU0N5CG6UwVvoDs/opBiMmUg001eQIDAQABAoIBADN7Ofr2yrEIf7z3\nSkHy+M1EYDjMc28qmRaXM4Y1IRbXylXi8/KW6iMHqV8VWavcLx/5eLUHWoe9JpaT\nnERlDMUIV3Bx32MR8wKsAHJAs+p7g4c2IxMw6sNuCvLyFyXbqTNFlWXtYSwEQfUH\ntJo91+ogtZzRu7nBf31mOh3i045NBWnOAydv4QEhJerqQYh2byJwbgwjROPGT7oL\n5kGFQVtNHrQcXVV1dfrTD3raksRelGCxqh3gJWGj7JyTcM8bhOaQXcRGg2wbJ17f\nAYxFX9ZHzPekWzYYwhr97Pd/QAC6IYgw9/y85IX03Zub22vj33FlMX/WIWsf5ebo\n+z7/OgECgYEA5bviZ9Gy7Rj4Su9QXmDNLrPK+WXgQ3L8WqsEZG+YIFy80M3Y2Ax+\nMd7l0qeXTcA6IRKniO+hA6Pf7sTVEr+AGHLd3cCP311XDiDLENP4TTOtoKjSfsq5\ndzzYCSMlXPkVuAt6hHcn5eMpzD7W6grqmq1ZM05NbvOTXKoEuqbZg8ECgYEA6fij\n861vZmaKWneTdJU5+GtUGwSJwAmduxyXsK7JIfexCz0LBm/sBu3d+I4zKzQ/BhHu\nGKUZWAs8N7PZtq6mYX7xzDXg83wO1Q3qz6Eazid0dezJhbanlj5GThP8QUFIsddT\nqfcFygnPMchUjJyoCU30+SPRBFbvjJ0mWRrQv7kCgYEAnTwt5m7A7sQTVH5c3GuW\no2tM9ctDZgayL4AzPmaekS/Hz4XD74MFcC6lz7sCtKVnY7F31yJjarFjl/FCAFXv\nX0xnC9o63l7tMW9CbN8XaAeBw58oir1HmROcrQxQC0U0F0ZL8ZP4S8BhoDg2MfOM\nxJb2oUXre4/cgSSgnfuKjkECgYA6y52/vYSyEfCQnV3zvRBNSgNfqrtHA+OcQqon\n3zRyEcFu1o8vte51K09Nh8Z6A+4Wg2j2zn5Y7rHaOZrrWmY7N+BhdeSqqzE6/v1T\n4eNPjQCqJa/apzTj/5BBTKpmZ5ZyAm9m1cmhpOdpVjNRBoj/lZSLCyIaWhJmnpMl\nbySoGQKBgQCmDZ0nnO4tu4AVkCexeAhlTvU6WC6kx5hHbP1SvY/2qmR9lounFUCi\nrxguVdl8wpXekTLxNTBr2VrOpxEIaorXj6VhiG1YVn70H+0lVmJMp9GadEzaAq1v\nee1htE2bN5WH4J9wX3n+dyroM0UWiD5J5NxgypT7PRxIk4rznBOnCQ==\n-----END RSA PRIVATE KEY-----"

_PUB = serialization.load_pem_public_key(base64.b64decode(SEND_B64))
_PRIV = serialization.load_pem_private_key(RECV_PEM.encode(), password=None)

def _pkcs7_pad(d):
    p = 16 - (len(d) % 16); return d + bytes([p]) * p
def _pkcs7_unpad(d):
    return d[:-d[-1]]

def _auth():
    s = "%s-%d-%s-%s-%s" % (APP_VERSION, int(time.time() * 1000), PLANFORM, INTERNAL, SYMBOL)
    c = Cipher(algorithms.AES(AES_KEY), modes.CBC(AES_IV)).encryptor()
    return base64.b64encode(c.update(_pkcs7_pad(base64.b64encode(s.encode()))) + c.finalize()).decode()

def _enc(obj):
    text = json.dumps(obj, ensure_ascii=False)
    rk = _PUB.encrypt(PARAMS_KEY, _asym_pad.PKCS1v15())
    iv = PARAMS_KEY[::-1]
    c = Cipher(algorithms.AES(PARAMS_KEY), modes.CBC(iv)).encryptor()
    return base64.b64encode(rk).decode() + "." + base64.b64encode(c.update(_pkcs7_pad(text.encode())) + c.finalize()).decode()

def _dec(text):
    if "." not in text:
        return text
    rp, ct = text.split(".", 1)
    try:
        k = _PRIV.decrypt(base64.b64decode(rp), _asym_pad.PKCS1v15())
        kk = k.decode(); iv = kk[::-1].encode()
        d = Cipher(algorithms.AES(kk.encode()), modes.CBC(iv)).decryptor()
        return _pkcs7_unpad(d.update(base64.b64decode(ct)) + d.finalize()).decode("utf-8", "ignore")
    except Exception:
        return text

def call(method, path, obj=None, token=""):
    headers = {"Content-Type": "application/json", "ts": str(int(time.time() * 1000)),
               "X-VERSION": VERSION, "APPID": APPID, "Authentication": _auth(),
               "system": "3", "X-Token": token, "user-agent": "Dart/3.6 (dart:io)"}
    conn = http.client.HTTPConnection(HOST, PORT, timeout=25)
    try:
        body = _enc(obj) if method == "POST" else None
        conn.request(method, path, body=body, headers=headers)
        r = conn.getresponse()
        raw = r.read().decode("utf-8", "ignore")
        if r.status != 200:
            return {"http": r.status, "raw": raw[:200], "parsed": None}
        try:
            parsed = json.loads(_dec(raw))
        except Exception:
            parsed = None
        return {"http": r.status, "raw": raw[:300], "parsed": parsed}
    except Exception as e:
        return {"http": None, "raw": "", "parsed": None, "error": "%s: %s" % (type(e).__name__, e)}
    finally:
        try: conn.close()
        except Exception: pass

def handler(event, context):
    res = {}
    lg = call("POST", "/pc/users/login",
              {"type": "password", "enum": 0, "phone": "13299692690", "password": "123456789", "symbol": "win32"})
    res["login_http"] = lg["http"]
    res["login_code"] = (lg.get("parsed") or {}).get("code")
    if lg.get("error"):
        res["verdict"] = "CONNECT_FAIL: Netlify 出口到不了 %s:%s (%s) — 网络层被拒" % (HOST, PORT, lg["error"])
        return {"statusCode": 200, "headers": {"Content-Type": "application/json", "Access-Control-Allow-Origin": "*"},
                "body": json.dumps(res, ensure_ascii=False)}
    res["login_raw"] = lg.get("raw", "")[:200]
    tok = ((lg.get("parsed") or {}).get("data") or {}).get("token") or ""
    res["has_token"] = bool(tok)
    if not tok:
        res["verdict"] = "login http=%s code=%s 未取到 token (见 login_raw)" % (lg["http"], res["login_code"])
        return {"statusCode": 200, "headers": {"Content-Type": "application/json", "Access-Control-Allow-Origin": "*"},
                "body": json.dumps(res, ensure_ascii=False)}
    info = call("GET", "/pc/users/info", None, tok)
    ic = (info.get("parsed") or {}).get("code")
    res["info_http"] = info["http"]; res["info_code"] = ic
    if info.get("error"):
        res["verdict"] = "info CONNECT_FAIL: %s" % info["error"]
    elif ic == 20000:
        res["verdict"] = "20000 - 上游接受 Netlify 出口 IP，可部署全接口"
    elif ic == 50008:
        res["verdict"] = "50008 - 上游拒 Netlify 出口 IP（同 Cloudflare）"
    else:
        res["verdict"] = "unknown code=%s raw=%s" % (ic, (info.get("raw") or "")[:150])
    return {"statusCode": 200, "headers": {"Content-Type": "application/json", "Access-Control-Allow-Origin": "*"},
            "body": json.dumps(res, ensure_ascii=False)}

if __name__ == "__main__":
    import subprocess, sys
    print(handler({}, None)["body"])
