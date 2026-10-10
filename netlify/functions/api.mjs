// 囧次元 全接口代理（Netlify JS 函数，自包含）— 由 _gen_api_js.py 从 jcy_server.py 生成
// 小程序 POST /.netlify/functions/api {module,type,data,token} -> 上游 43.145.33.254:27990
import crypto from "crypto";
import net from "net";

const HOST = "43.145.33.254";
const PORT = 27990;
const APPID = "4150439554430529";
const VERSION = "2024-07-02";
const PLANFORM = "3";
const INTERNAL = "1.0.0";
const APP_VERSION = "1.1.5";
const SYMBOL = "win32";
const AES_KEY = Buffer.from("emlJU2pxa1hQc0dVTVJOR3lXaWd4REd0SmJmVGRjR3Y=", "base64");
const AES_IV = Buffer.from("V29ucm5Wa3hlSXhEY0Zidg==", "base64");
const PARAMS_KEY = Buffer.from("UjV4VGhMTm1YYnBET2d5ag==", "base64");
const PARAMS_IV = Buffer.from(PARAMS_KEY.toString("latin1").split("").reverse().join(""));
const PUB_KEY = crypto.createPublicKey(Buffer.from("LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0KTUlJQklqQU5CZ2txaGtpRzl3MEJBUUVGQUFPQ0FROEFNSUlCQ2dLQ0FRRUFyMTBEYjM5YXBoWDlnWm5seDRyLwpZMU5rbEV4RVBQbk0xM2gvR3c2RHg0b1hlVmFFOW43NmZEQ0tYZ01SZzRkZjRaRGVYNzZibCtBRjdDdkhCQVRGCmFLcGk0eDhtZTBXMk5sOFpvdmxYbVl5N1hDa3FoRENNK29JcTlGMldhTUE1UzBqTmVKOW9QbUd4bXo0MUlTUkYKbTNqRGxuVS91U3pVTnJneGZmbWNMemVOTDBOYThkZkJVaU5NZXZkdlRkMnlwYWh0a21yS0lpNEdRNlFvSGVpdwpmUzZaWTA1eC8vTUphVzhzN0N5VHA1eUUvbDlISXBuc3FCcUx3azJ5NjJwSGJEZHRUWEIrSEhNVHE5Uzk3dVhICkpuYmZRMWRWdndmYzZUTGtub1Jmam44bzZTUnRLdVZVNW81eDZMekZFTStTOXFaTS9MdmMwaHJsNWFXRnJmaFEKMndJREFRQUIKLS0tLS1FTkQgUFVCTElDIEtFWS0tLS0tCg==", "base64").toString("utf8"));
const PRIV_KEY = crypto.createPrivateKey(Buffer.from("-----BEGIN RSA PRIVATE KEY-----\nMIIEpAIBAAKCAQEA0fciNSCS8o6Y7pJVH+4SxVgDJCipDou4teBUlfStdaKAh08g\ny5V2izx/XdzeGf9g4Xgd7UwxPr+QKG/RvFAfAO0AYQK4uPOnjzDQvGPUBEKwRoGv\ncM8zo4wvfbLUjfXywpDDLrT/PdolliWn3gJ83nl86Oe2pOiNlG1ojxP8IXjUWrYB\n275EyyulYxG2nWK8RLJG2OcXNdqttM4ILFgIbawB8l94nlRSxb1g2fa5PKGxq33L\ngTt0GnGoVduXfpCUM19q0ju8WSDdXjEUhnRWWBWiRu4Pum24pI5qrJiiANvkg6fe\nk/tE0THUBlU0N5CG6UwVvoDs/opBiMmUg001eQIDAQABAoIBADN7Ofr2yrEIf7z3\nSkHy+M1EYDjMc28qmRaXM4Y1IRbXylXi8/KW6iMHqV8VWavcLx/5eLUHWoe9JpaT\nnERlDMUIV3Bx32MR8wKsAHJAs+p7g4c2IxMw6sNuCvLyFyXbqTNFlWXtYSwEQfUH\ntJo91+ogtZzRu7nBf31mOh3i045NBWnOAydv4QEhJerqQYh2byJwbgwjROPGT7oL\n5kGFQVtNHrQcXVV1dfrTD3raksRelGCxqh3gJWGj7JyTcM8bhOaQXcRGg2wbJ17f\nAYxFX9ZHzPekWzYYwhr97Pd/QAC6IYgw9/y85IX03Zub22vj33FlMX/WIWsf5ebo\n+z7/OgECgYEA5bviZ9Gy7Rj4Su9QXmDNLrPK+WXgQ3L8WqsEZG+YIFy80M3Y2Ax+\nMd7l0qeXTcA6IRKniO+hA6Pf7sTVEr+AGHLd3cCP311XDiDLENP4TTOtoKjSfsq5\ndzzYCSMlXPkVuAt6hHcn5eMpzD7W6grqmq1ZM05NbvOTXKoEuqbZg8ECgYEA6fij\n861vZmaKWneTdJU5+GtUGwSJwAmduxyXsK7JIfexCz0LBm/sBu3d+I4zKzQ/BhHu\nGKUZWAs8N7PZtq6mYX7xzDXg83wO1Q3qz6Eazid0dezJhbanlj5GThP8QUFIsddT\nqfcFygnPMchUjJyoCU30+SPRBFbvjJ0mWRrQv7kCgYEAnTwt5m7A7sQTVH5c3GuW\no2tM9ctDZgayL4AzPmaekS/Hz4XD74MFcC6lz7sCtKVnY7F31yJjarFjl/FCAFXv\nX0xnC9o63l7tMW9CbN8XaAeBw58oir1HmROcrQxQC0U0F0ZL8ZP4S8BhoDg2MfOM\nxJb2oUXre4/cgSSgnfuKjkECgYA6y52/vYSyEfCQnV3zvRBNSgNfqrtHA+OcQqon\n3zRyEcFu1o8vte51K09Nh8Z6A+4Wg2j2zn5Y7rHaOZrrWmY7N+BhdeSqqzE6/v1T\n4eNPjQCqJa/apzTj/5BBTKpmZ5ZyAm9m1cmhpOdpVjNRBoj/lZSLCyIaWhJmnpMl\nbySoGQKBgQCmDZ0nnO4tu4AVkCexeAhlTvU6WC6kx5hHbP1SvY/2qmR9lounFUCi\nrxguVdl8wpXekTLxNTBr2VrOpxEIaorXj6VhiG1YVn70H+0lVmJMp9GadEzaAq1v\nee1htE2bN5WH4J9wX3n+dyroM0UWiD5J5NxgypT7PRxIk4rznBOnCQ==\n-----END RSA PRIVATE KEY-----", "utf8"));

function pkcs7(b){ const p = 16 - (b.length % 16); return Buffer.concat([b, Buffer.alloc(p, p)]); }
function pkcs7Unpad(b){ const p = b[b.length-1]; return (p>=1 && p<=16) ? b.slice(0, b.length-p) : b; }
function unpad15(buf){ let i = 2; while (i < buf.length && buf[i] !== 0) i++; if (i >= buf.length) return null; return buf.slice(i + 1); }
function pyJson(o){ const ps = Object.keys(o).map(k => JSON.stringify(String(k)) + ": " + JSON.stringify(o[k])); return "{" + ps.join(", ") + "}"; }
function authHeader(){
  const s = APP_VERSION + "-" + Math.floor(Date.now()) + "-" + PLANFORM + "-" + INTERNAL + "-" + SYMBOL;
  const data = pkcs7(Buffer.from(Buffer.from(s).toString("base64")));
  const c = crypto.createCipheriv("aes-" + (AES_KEY.length * 8) + "-cbc", AES_KEY, AES_IV);
  c.setAutoPadding(false);
  return c.update(data).toString("base64");
}
function enc(obj){
  const text = pyJson(obj);
  const rsa = crypto.publicEncrypt({ key: PUB_KEY, padding: crypto.constants.RSA_PKCS1_PADDING }, PARAMS_KEY).toString("base64");
  const c = crypto.createCipheriv("aes-" + (PARAMS_KEY.length * 8) + "-cbc", PARAMS_KEY, PARAMS_IV);
  c.setAutoPadding(false);
  const ct = c.update(pkcs7(Buffer.from(text, "utf8")));
  return rsa + "." + ct.toString("base64");
}
function dec(text){
  if (!text || !text.includes(".")) return text;
  const parts = text.split(".", 2);
  const rp = parts[0], ct = parts[1];
  try {
    const raw = crypto.privateDecrypt({ key: PRIV_KEY, padding: crypto.constants.RSA_NO_PADDING }, Buffer.from(rp, "base64"));
    const key = unpad15(raw);
    if (!key) return text;
    const iv = Buffer.from(key.toString("latin1").split("").reverse().join(""));
    const d = crypto.createDecipheriv("aes-" + (key.length * 8) + "-cbc", key, iv);
    d.setAutoPadding(false);
    return pkcs7Unpad(d.update(Buffer.from(ct, "base64"))).toString("utf8", "ignore");
  } catch (e) { return text; }
}
function call(method, path, obj, token){
  return new Promise((resolve) => {
    const headers = {
      "Host": HOST + ":" + PORT, "Content-Type": "application/json",
      "ts": String(Math.floor(Date.now())), "X-VERSION": VERSION, "APPID": APPID,
      "Authentication": authHeader(), "system": "3", "X-Token": token || "",
      "user-agent": "Dart/3.6 (dart:io)"
    };
    let body = "";
    if (method === "POST" && obj) { body = enc(obj); headers["Content-Length"] = Buffer.byteLength(body); }
    const req = net.connect(PORT, HOST, () => {
      let raw = method + " " + path + " HTTP/1.1\r\n";
      for (const [k, v] of Object.entries(headers)) raw += k + ": " + v + "\r\n";
      raw += "\r\n"; if (body) raw += body; req.write(raw);
    });
    req.setTimeout(25000);
    let data = "", settled = false;
    const tryParse = (final) => {
      if (settled) return;
      const i = data.indexOf("\r\n\r\n");
      if (i < 0) { if (final) { settled = true; resolve({ http: -3, error: "no-head", parsed: null }); } return; }
      const head = data.slice(0, i);
      const clM = head.toLowerCase().match(/\r\ncontent-length:\s*(\d+)/i);
      const cl = clM ? parseInt(clM[1], 10) : null;
      let rb = data.slice(i + 4);
      if (cl !== null && rb.length < cl) return;
      if (cl !== null) rb = rb.slice(0, cl);
      const code = parseInt((head.split("\r\n")[0] || " 0").split(" ")[1], 10) || -1;
      let parsed = null;
      try { parsed = JSON.parse(dec(rb)); } catch (e) {}
      settled = true; try { req.destroy(); } catch (e) {}
      resolve({ http: code, parsed, raw: rb.slice(0, 300) });
    };
    req.on("data", d => { data += d.toString("latin1"); tryParse(false); });
    req.on("end", () => tryParse(true));
    req.on("error", e => { if (!settled) { settled = true; resolve({ http: -1, error: e.code || e.message, parsed: null }); } });
    req.on("timeout", () => { try { req.destroy(); } catch (e) {} if (!settled) { settled = true; resolve({ http: -2, error: "timeout", parsed: null }); } });
  });
}
function qs(o){ const p = new URLSearchParams(); for (const [k, v] of Object.entries(o)) { if (v !== undefined && v !== null && v !== "") p.set(k, String(v)); } return p.toString(); }

export default async (req) => {
  const cors = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type" };
  if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: cors });
  let body;
  try { body = JSON.parse(await req.text()); } catch (e) { body = {}; }
  const { module, type, data, token } = body;
  const m = module || "video", t = type || "", d = data || {};
  const done = (res) => {
    if (res.error) return new Response(JSON.stringify({ code: 50000, message: res.error, module: m, type: t }), { status: 200, headers: { "Content-Type": "application/json", ...cors } });
    if (!res.parsed) return new Response(JSON.stringify({ code: res.http || -1, message: "upstream http " + res.http, raw: (res.raw || "").slice(0, 120) }), { status: 200, headers: { "Content-Type": "application/json", ...cors } });
    return new Response(JSON.stringify(res.parsed), { status: 200, headers: { "Content-Type": "application/json", ...cors } });
  };
  let res;
  if (m === "video") {
    if (t === "videoList") res = await call("GET", "/pc/video/list?" + qs({ channel: d.channel, page: d.page || 1, limit: d.limit || 30 }), null, token);
    else if (t === "videoDetail") res = await call("GET", "/pc/video/detail?" + qs({ id: d.id }), null, token);
    else if (t === "videoPlay") res = await call("GET", "/pc/video/play?" + qs({ id: d.id, part: d.part, play: "mp4" }), null, token);
    else if (t === "videoSearch") res = await call("GET", "/pc/search?" + qs({ keyword: d.key, q: d.key, page: d.page || 1, limit: d.limit || 20 }), null, token);
    else if (t === "videoBuy") res = await call("POST", "/pc/video/buy", { id: Number(d.id), part: d.part || "", play: "mp4" }, token);
    else if (t === "channel") res = await call("GET", "/pc/channel?top-level=true", null, token);
    else if (t === "danmu") res = await call("GET", "/pc/danmaku/comments?" + qs({ id: d.id, part: d.part }), null, token);
    else res = await call("GET", "/pc/users/info", null, token);
  } else if (m === "user") {
    if (t === "login") res = await call("POST", "/pc/users/login", { type: d.type || "password", enum: d.enum ?? 0, phone: d.phone || "", email: d.email || "", password: d.password || "", symbol: "win32" }, "");
    else if (t === "register") res = await call("POST", "/pc/users/register", { phone: d.phone || "", email: d.email || "", password: d.password || "" }, "");
    else if (t === "logout") res = await call("POST", "/pc/users/logout", {}, token);
    else res = await call("GET", "/pc/users/info", null, token);
  } else if (m === "users") {
    if (t === "gold") res = await call("GET", "/pc/video/gold", null, token);
    else if (t === "taskList") res = await call("GET", "/pc/task/list", null, token);
    else if (t === "signInfo") res = await call("GET", "/pc/sign/info", null, token);
    else if (t === "sign") res = await call("POST", "/pc/sign", {}, token);
    else if (t === "invite") res = await call("GET", "/pc/invite/info", null, token);
    else res = await call("GET", "/pc/users/info", null, token);
  } else res = await call("GET", "/pc/users/info", null, token);
  return done(res);
};

// 本地自测（NODE_TEST=1）
if (process.env.NODE_TEST === "1") {
  const test = await call("GET", "/pc/channel?top-level=true", null, "");
  console.log("channel:", test.http, test.parsed ? (test.parsed.code + " count=" + ((test.parsed.data||[]).length)) : test.raw);
}
