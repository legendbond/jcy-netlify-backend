// 囧次元 上游出口探针（Node ESM，零依赖）— 由 _gen_probe_js.py 从 jcy_server.py 生成
// login -> users/info：20000=Netlify 出口被上游接受 / 50008=被拒 / CONNECT_FAIL=到不了
import crypto from "crypto";
import net from "net";
import http from "http";

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
// ---- VO 转码服务（9.3 参数，2026-11-09 上游换域名/换密钥）----
const VO = "http://yhhy.xj.zshtys888.com/vo1v03.php";
const VO_VERSION = "1.5.8.0";
const SECRET = "v50gjcy";
const VO_AES_KEY = "wcyjmnnnawozmydn";
const VO_AES_IV = "wcivwyjmlnzbhlmq";
const EXPIRED_CODES = new Set([50008, 50014, 500403]);
const PUB_KEY = crypto.createPublicKey(Buffer.from("LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0KTUlJQklqQU5CZ2txaGtpRzl3MEJBUUVGQUFPQ0FROEFNSUlCQ2dLQ0FRRUFyMTBEYjM5YXBoWDlnWm5seDRyLwpZMU5rbEV4RVBQbk0xM2gvR3c2RHg0b1hlVmFFOW43NmZEQ0tYZ01SZzRkZjRaRGVYNzZibCtBRjdDdkhCQVRGCmFLcGk0eDhtZTBXMk5sOFpvdmxYbVl5N1hDa3FoRENNK29JcTlGMldhTUE1UzBqTmVKOW9QbUd4bXo0MUlTUkYKbTNqRGxuVS91U3pVTnJneGZmbWNMemVOTDBOYThkZkJVaU5NZXZkdlRkMnlwYWh0a21yS0lpNEdRNlFvSGVpdwpmUzZaWTA1eC8vTUphVzhzN0N5VHA1eUUvbDlISXBuc3FCcUx3azJ5NjJwSGJEZHRUWEIrSEhNVHE5Uzk3dVhICkpuYmZRMWRWdndmYzZUTGtub1Jmam44bzZTUnRLdVZVNW81eDZMekZFTStTOXFaTS9MdmMwaHJsNWFXRnJmaFEKMndJREFRQUIKLS0tLS1FTkQgUFVCTElDIEtFWS0tLS0tCg==", "base64").toString("utf8"));
const PRIV_KEY = crypto.createPrivateKey(Buffer.from("-----BEGIN RSA PRIVATE KEY-----\nMIIEpAIBAAKCAQEA0fciNSCS8o6Y7pJVH+4SxVgDJCipDou4teBUlfStdaKAh08g\ny5V2izx/XdzeGf9g4Xgd7UwxPr+QKG/RvFAfAO0AYQK4uPOnjzDQvGPUBEKwRoGv\ncM8zo4wvfbLUjfXywpDDLrT/PdolliWn3gJ83nl86Oe2pOiNlG1ojxP8IXjUWrYB\n275EyyulYxG2nWK8RLJG2OcXNdqttM4ILFgIbawB8l94nlRSxb1g2fa5PKGxq33L\ngTt0GnGoVduXfpCUM19q0ju8WSDdXjEUhnRWWBWiRu4Pum24pI5qrJiiANvkg6fe\nk/tE0THUBlU0N5CG6UwVvoDs/opBiMmUg001eQIDAQABAoIBADN7Ofr2yrEIf7z3\nSkHy+M1EYDjMc28qmRaXM4Y1IRbXylXi8/KW6iMHqV8VWavcLx/5eLUHWoe9JpaT\nnERlDMUIV3Bx32MR8wKsAHJAs+p7g4c2IxMw6sNuCvLyFyXbqTNFlWXtYSwEQfUH\ntJo91+ogtZzRu7nBf31mOh3i045NBWnOAydv4QEhJerqQYh2byJwbgwjROPGT7oL\n5kGFQVtNHrQcXVV1dfrTD3raksRelGCxqh3gJWGj7JyTcM8bhOaQXcRGg2wbJ17f\nAYxFX9ZHzPekWzYYwhr97Pd/QAC6IYgw9/y85IX03Zub22vj33FlMX/WIWsf5ebo\n+z7/OgECgYEA5bviZ9Gy7Rj4Su9QXmDNLrPK+WXgQ3L8WqsEZG+YIFy80M3Y2Ax+\nMd7l0qeXTcA6IRKniO+hA6Pf7sTVEr+AGHLd3cCP311XDiDLENP4TTOtoKjSfsq5\ndzzYCSMlXPkVuAt6hHcn5eMpzD7W6grqmq1ZM05NbvOTXKoEuqbZg8ECgYEA6fij\n861vZmaKWneTdJU5+GtUGwSJwAmduxyXsK7JIfexCz0LBm/sBu3d+I4zKzQ/BhHu\nGKUZWAs8N7PZtq6mYX7xzDXg83wO1Q3qz6Eazid0dezJhbanlj5GThP8QUFIsddT\nqfcFygnPMchUjJyoCU30+SPRBFbvjJ0mWRrQv7kCgYEAnTwt5m7A7sQTVH5c3GuW\no2tM9ctDZgayL4AzPmaekS/Hz4XD74MFcC6lz7sCtKVnY7F31yJjarFjl/FCAFXv\nX0xnC9o63l7tMW9CbN8XaAeBw58oir1HmROcrQxQC0U0F0ZL8ZP4S8BhoDg2MfOM\nxJb2oUXre4/cgSSgnfuKjkECgYA6y52/vYSyEfCQnV3zvRBNSgNfqrtHA+OcQqon\n3zRyEcFu1o8vte51K09Nh8Z6A+4Wg2j2zn5Y7rHaOZrrWmY7N+BhdeSqqzE6/v1T\n4eNPjQCqJa/apzTj/5BBTKpmZ5ZyAm9m1cmhpOdpVjNRBoj/lZSLCyIaWhJmnpMl\nbySoGQKBgQCmDZ0nnO4tu4AVkCexeAhlTvU6WC6kx5hHbP1SvY/2qmR9lounFUCi\nrxguVdl8wpXekTLxNTBr2VrOpxEIaorXj6VhiG1YVn70H+0lVmJMp9GadEzaAq1v\nee1htE2bN5WH4J9wX3n+dyroM0UWiD5J5NxgypT7PRxIk4rznBOnCQ==\n-----END RSA PRIVATE KEY-----", "utf8"));

function pkcs7(b){ const p = 16 - (b.length % 16); return Buffer.concat([b, Buffer.alloc(p, p)]); }
function pkcs7Unpad(b){ const p = b[b.length-1]; return (p>=1 && p<=16) ? b.slice(0, b.length-p) : b; }
// 手动剥 PKCS#1 v1.5 私钥解密填充（00 02 PS 00 D），Node 24 禁了 RSA_PKCS1_PADDING 的私钥解密
function unpad15(buf){
  // buf: 256 字节原始 RSA 块
  let i = 2;
  while (i < buf.length && buf[i] !== 0) i++;
  if (i >= buf.length) return null;
  return buf.slice(i + 1);
}

// 复刻 Python json.dumps(obj, ensure_ascii=False)
function pyJson(o){ const ps = Object.keys(o).map(k => JSON.stringify(String(k)) + ": " + JSON.stringify(o[k])); return "{" + ps.join(", ") + "}"; }

// 复刻 auth_header(): b64(aes_cbc(AES_KEY, AES_IV, pkcs7(b64(authStr))))
function authHeader(){
  const s = APP_VERSION + "-" + Math.floor(Date.now()) + "-" + PLANFORM + "-" + INTERNAL + "-" + SYMBOL;
  const data = pkcs7(Buffer.from(Buffer.from(s).toString("base64")));
  const c = crypto.createCipheriv("aes-" + (AES_KEY.length * 8) + "-cbc", AES_KEY, AES_IV);
  c.setAutoPadding(false);
  return c.update(data).toString("base64");
}
// 复刻 params_encrypt(): b64(rsa_enc(PARAMS_KEY)) + "." + b64(aes_cbc(PARAMS_KEY, PARAMS_IV, pkcs7(text)))
function enc(obj){
  const text = pyJson(obj);
  const rsa = crypto.publicEncrypt({ key: PUB_KEY, padding: crypto.constants.RSA_PKCS1_PADDING }, PARAMS_KEY).toString("base64");
  const c = crypto.createCipheriv("aes-" + (PARAMS_KEY.length * 8) + "-cbc", PARAMS_KEY, PARAMS_IV);
  c.setAutoPadding(false);
  const ct = c.update(pkcs7(Buffer.from(text, "utf8")));
  return rsa + "." + ct.toString("base64");
}
// 复刻 params_decrypt()；Node 24 禁了 PKCS1v15 私钥解密，用 RSA_NO_PADDING + 手剥填充
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
function call(method, path, obj, token, timeoutMs){
  return new Promise((resolve) => {
    const headers = {
      "Host": HOST + ":" + PORT,
      "Content-Type": "application/json",
      "ts": String(Math.floor(Date.now())),
      "X-VERSION": VERSION, "APPID": APPID,
      "Authentication": authHeader(),
      "system": "3", "X-Token": token || "",
      "user-agent": "Dart/3.6 (dart:io)"
    };
    let body = null;
    if (method === "POST" && obj) { body = Buffer.from(enc(obj), "utf8"); }
    let settled = false;
    const done = (o) => { if (!settled) { settled = true; resolve(o); } };
    const req = http.request({ host: HOST, port: PORT, method, path, headers, rejectUnauthorized: false }, (res) => {
      const chunks = [];
      res.on("data", d => chunks.push(d));
      res.on("end", () => {
        const raw = Buffer.concat(chunks).toString("utf8");
        let parsed = null;
        try { parsed = JSON.parse(dec(raw)); } catch (e) {}
        done({ http: res.statusCode, raw: raw.slice(0, 300), parsed, error: (res.statusCode >= 400) ? ("http " + res.statusCode) : undefined });
      });
    });
    // 9.3 上游默认 25s，但 Netlify 函数超时有限，压缩到 8s 以适配 serverless
    req.setTimeout(timeoutMs || 8000, () => { try { req.destroy(); } catch (e) {} done({ http: -2, error: "timeout", raw: "", parsed: null }); });
    req.on("error", e => done({ http: -1, error: e.code || e.message, raw: "", parsed: null }));
    if (body) req.write(body);
    req.end();
  });
}

export { enc, dec, pyJson, pkcs7, pkcs7Unpad, call, authHeader, PARAMS_KEY, PARAMS_IV, PUB_KEY, PRIV_KEY, HOST, PORT, APPID, VERSION, PLANFORM, INTERNAL, APP_VERSION, SYMBOL };
function qs(o){ const p = new URLSearchParams(); for (const [k, v] of Object.entries(o)) { if (v !== undefined && v !== null && v !== "") p.set(k, String(v)); } return p.toString(); }

// ---- VO 转码（9.3：新域名 yhhy.xj.zshtys888.com + 新密钥/新签名 secret v50gjcy）----
function voConfigFromParse(parseText){
  const cfg = { version: VO_VERSION, secret: SECRET, aes_key: VO_AES_KEY, aes_iv: VO_AES_IV, platform: "Android" };
  if (!parseText) return cfg;
  let m = /aes_key\s*=\s*"([^"]+)"/.exec(parseText); if (m) cfg.aes_key = m[1];
  m = /aes_iv\s*=\s*"([^"]+)"/.exec(parseText); if (m) cfg.aes_iv = m[1];
  m = /utils\.md5\(data \.\. "([^"]+)" \.\. ts\)/.exec(parseText) || /data \.\. "([^"]+)" \.\. ts/.exec(parseText);
  if (m) cfg.secret = m[1];
  return cfg;
}
function md5sign(text){ return crypto.createHash("md5").update(text).digest("hex"); }
// AES-128-CBC 去 PKCS#7（VO 响应可能为 b64 密文）
function voAesDec(b64, key, iv){
  const raw = Buffer.from(b64.trim(), "base64");
  const d = crypto.createDecipheriv("aes-128-cbc", Buffer.from(key, "utf8"), Buffer.from(iv, "utf8"));
  d.setAutoPadding(false);
  let p = d.update(raw); p = Buffer.concat([p, d.final()]);
  return pkcs7Unpad(p).toString("utf8", "ignore");
}
function voHttpGet(url, headers, timeoutMs){
  return new Promise((resolve) => {
    const u = new URL(url);
    const req = http.request({ host: u.hostname, port: u.port || 80, method: "GET", path: (u.pathname || "/") + (u.search || ""), headers: Object.assign({ "user-agent": "Dart/3.6 (dart:io)" }, headers), rejectUnauthorized: false }, (res) => {
      const chunks = []; res.on("data", d => chunks.push(d));
      res.on("end", () => resolve({ http: res.statusCode, raw: Buffer.concat(chunks) }));
    });
    req.setTimeout(timeoutMs, () => { try { req.destroy(); } catch (e) {} resolve({ http: -2, error: "timeout", raw: Buffer.alloc(0) }); });
    req.on("error", e => resolve({ http: -1, error: e.code || e.message, raw: Buffer.alloc(0) }));
    req.end();
  });
}
// 9.3 resolve_source：明文 JSON 或 AES b64 密文，取 data.playAddr[] 或 data.url
async function resolveSource(source, retries, config){
  const cfg = config || voConfigFromParse(null);
  let lastErr = null;
  for (let attempt = 0; attempt <= (retries || 2); attempt++) {
    try {
      const ts = String(Math.floor(Date.now() / 1000));
      const url = VO + "?url=" + encodeURIComponent(source).replace("%7C", "|") + "&t=" + ts;
      const headers = {
        "x-time": ts, "x-form": "Android",
        "x-sign1": md5sign(cfg.version + cfg.secret + ts),
        "x-sign2": md5sign(source + cfg.secret + ts)
      };
      const r = await voHttpGet(url, headers, 15000);
      if (r.error) throw new Error(r.error);
      const txt = r.raw.toString("utf8", "replace");
      let obj;
      try { obj = JSON.parse(txt); } catch (e) { obj = JSON.parse(voAesDec(txt, cfg.aes_key, cfg.aes_iv)); }
      const addrs = ((obj.data || {}).playAddr) || [];
      if (!addrs.length && obj.url) return [{ title: null, desc: obj.type || "高清", vcodec: null, url: obj.url }];
      return addrs.map(it => ({ title: it.title, desc: it.desc, vcodec: it.vcodec, url: ((it.m3u8FileDomain || "") + (it.addr || "")) }));
    } catch (e) { lastErr = e; if (attempt < (retries || 2)) await new Promise(r2 => setTimeout(r2, 1000)); }
  }
  throw new Error("resolve failed: " + (lastErr && lastErr.message));
}
function toPayload(addrs){
  return addrs.map(a => ({
    resolution: a.desc || a.title || "高清", url: a.url || "", play: "url", ps: 0,
    vip_type: 0, completeness: 100, total_duration: 0, type: "auto", lua_header: {}, extension: { url: "auto" }
  }));
}
// 9.3 播放链：真实 PC play -> parse 提取 VO 配置 -> VO 转码出直链
async function origPlayPayload(vid, part, token){
  try {
    const o = await call("GET", "/pc/video/play?" + qs({ id: vid, play: "mp4", part: part || "" }), null, token);
    const r = o.parsed || {};
    if (r.code === 20000) {
      const data = r.data || [];
      if (data.length && data[0].url) {
        const cfg = voConfigFromParse(data[0].parse || "");
        const addrs = await resolveSource(data[0].url, 2, cfg);
        if (addrs.length) return toPayload(addrs);
      }
    }
  } catch (e) {}
  return [];
}
const _playCache = new Map();   // key -> [ts, result]
const _playFail = new Map();     // key -> ts
const PLAY_CACHE_TTL = 8, PLAY_FAIL_TTL = 3.0;
async function doPlayOnce(vid, part, token){
  let result = await origPlayPayload(vid, part, token);
  if (result.length) return result;
  // 空 -> 查 code 决定自动购买
  const o = await call("GET", "/pc/video/play?" + qs({ id: vid, play: "mp4", part: part || "" }), null, token);
  const r = o.parsed || {};
  if (r.code === 403101 || r.code === 403501 || String(r.message || "").includes("尚未购买")) {
    const buy = await call("POST", "/pc/video/buy", { id: Number(vid), part: part || "", play: "mp4" }, token);
    if ((buy.parsed || {}).code === 20000) {
      const r2 = await origPlayPayload(vid, part, token);
      if (r2.length) return r2;
    }
  }
  // 20000 但源空：梯度重试（0.5+0.5+1.5+1.5）
  for (let i = 0; i < 4; i++) {
    await new Promise(r2 => setTimeout(r2, [500, 500, 1500, 1500][i]));
    const retry = await origPlayPayload(vid, part, token);
    if (retry.length) return retry;
  }
  return [];
}
// 9.3 并发去重：8s 成功缓存 + 3s 失败缓存（serverless 单实例内生效）
async function playPayload(vid, part, token){
  const key = vid + "|" + (part || "");
  const now = Date.now() / 1000;
  const hit = _playCache.get(key);
  if (hit && now - hit[0] < PLAY_CACHE_TTL) return hit[1];
  const fail = _playFail.get(key);
  if (fail && Date.now() / 1000 - fail < PLAY_FAIL_TTL) {
    for (let q = 0; q < 2; q++) {
      const qres = await origPlayPayload(vid, part, token);
      if (qres.length) { _playFail.delete(key); _playCache.set(key, [now, qres]); return qres; }
    }
    _playFail.set(key, now);
    return [];
  }
  const result = await doPlayOnce(vid, part, token);
  if (result.length) {
    _playFail.delete(key);
    _playCache.set(key, [now, result]);
    if (_playCache.size > 512) { const t = Date.now() / 1000; for (const [k, v] of _playCache) { if (t - v[0] >= PLAY_CACHE_TTL) _playCache.delete(k); } }
  } else _playFail.set(key, now);
  return result;
}

// 全接口分发（复用同文件 call）：模块 video/user/users
async function dispatch(m, t, d, token){
  if (m === "video") {
    if (t === "videoList") return await call("GET", "/pc/video/list?" + qs({ channel: d.channel ?? 0, page: d.page || 1, limit: d.limit || 30, sort: d.sort || "addtime", area: d.area, type: d.type }), null, token);
    if (t === "videoDetail") return await call("GET", "/pc/video/detail?" + qs({ id: d.id }), null, token);
    // 9.3 完全对齐电脑版：banner 轮播 /pc/banners/{channel}（channel 走路径）
    if (t === "banners") return await call("GET", "/pc/banners/" + (d.channel ?? 0), null, token);
    // 9.3 完全对齐电脑版：频道详情 /pc/channel/{id}
    if (t === "channelDetail") return await call("GET", "/pc/channel/" + d.id, null, token);
    if (t === "videoPlay") {
      // 9.3 完整播放链：上游 play -> VO 转码出直链；403101/403501 自动 buy；空源梯度重试；8s 缓存
      // 返回 call() 同构格式，供 handler 统一处理
      const addrs = await playPayload(d.id, d.part, token);
      const body = addrs.length
        ? { code: 20000, message: "ok", data: addrs }
        : { code: 403101, message: "暂无可用播放源，请在模拟器播放该集后重试", data: [] };
      return { http: 200, parsed: body, raw: "" };
    }
    if (t === "videoSearch") return await call("GET", "/pc/search?" + qs({ keyword: d.key, q: d.key, page: d.page || 1, limit: d.limit || 20 }), null, token);
    if (t === "videoBuy") return await call("POST", "/pc/video/buy", { id: Number(d.id), part: d.part || "", play: "mp4" }, token);
    if (t === "channel") return await call("GET", "/pc/channel?top-level=true", null, token);
    if (t === "danmu") return await call("GET", "/pc/danmaku/comments?" + qs({ id: d.id, part: d.part }), null, token);
    return await call("GET", "/pc/users/info", null, token);
  }
  if (m === "user") {
    if (t === "login") return await call("POST", "/pc/users/login", { type: d.type || "password", enum: d.enum ?? 0, phone: d.phone || "", email: d.email || "", password: d.password || "", symbol: "win32" }, "");
    if (t === "register") return await call("POST", "/pc/users/register", { phone: d.phone || "", email: d.email || "", password: d.password || "" }, "");
    if (t === "logout") return await call("POST", "/pc/users/logout", {}, token);
    return await call("GET", "/pc/users/info", null, token);
  }
  if (m === "users") {
    if (t === "gold") return await call("GET", "/pc/video/gold", null, token);
    if (t === "taskList") return await call("GET", "/pc/task/list", null, token);
    if (t === "signInfo") return await call("GET", "/pc/sign/info", null, token);
    if (t === "sign") return await call("POST", "/pc/sign", {}, token);
    if (t === "invite") return await call("GET", "/pc/invite/info", null, token);
    return await call("GET", "/pc/users/info", null, token);
  }
  return await call("GET", "/pc/users/info", null, token);
}

export default async (req) => {
  const json = (o) => new Response(JSON.stringify(o), { status: 200, headers: { "Content-Type": "application/json" } });
  // 双模式：带 {module} 的 POST -> 全接口网关；否则 -> 出口连通性探测
  let body = {};
  try {
    if (req && req.method !== "GET") body = JSON.parse(await req.text());
  } catch (e) {}
  if (body && body.module) {
    const m = body.module, t = body.type || "", d = body.data || {}, token = body.token || "";
    let res = await dispatch(m, t, d, token);
    if (res.error) return json({ code: 50000, message: res.error, module: m, type: t });
    if (!res.parsed) return json({ code: res.http || -1, message: "upstream http " + res.http, raw: (res.raw || "").slice(0, 120) });
    // 9.3 _with_relogin 语义：遇 token 失效码（50008/50014/500403）且非登录接口 -> 内置账号重登拿新 token 重试一次
    if (EXPIRED_CODES.has(res.parsed.code) && t !== "login" && t !== "register") {
      const lg2 = await call("POST", "/pc/users/login", { type: "password", enum: 0, phone: "13299692690", password: "123456789", symbol: "win32" }, "");
      const tok2 = ((lg2.parsed || {}).data || {}).token || "";
      if (tok2) {
        const res2 = await dispatch(m, t, d, tok2);
        if (!res2.error && res2.parsed) return json(res2.parsed);
      }
    }
    return json(res.parsed);
  }
  // ---- 原探测行为 ----
  const res = {};
  const lg = await call("POST", "/pc/users/login", { type: "password", enum: 0, phone: "13299692690", password: "123456789", symbol: "win32" }, "");
  res.login_http = lg.http;
  res.login_code = (lg.parsed || {}).code;
  if (lg.error) {
    res.verdict = "CONNECT_FAIL: Netlify 出口到不了 " + HOST + ":" + PORT + " (" + lg.error + ")";
    return json(res);
  }
  res.login_raw = (lg.raw || "").slice(0, 150);
  const tok = ((lg.parsed || {}).data || {}).token || "";
  res.has_token = !!tok;
  if (!tok) {
    res.verdict = "login http=" + lg.http + " code=" + res.login_code + " 未取到 token (见 login_raw)";
    return json(res);
  }
  const info = await call("GET", "/pc/users/info", null, tok);
  res.info_http = info.http;
  res.info_code = (info.parsed || {}).code;
  if (info.error) res.verdict = "info CONNECT_FAIL: " + info.error;
  else if (res.info_code === 20000) res.verdict = "20000 - 上游接受 Netlify 出口 IP，可部署全接口";
  else if (res.info_code === 50008) res.verdict = "50008 - 上游拒 Netlify 出口 IP（同 Cloudflare）";
  else res.verdict = "unknown code=" + res.info_code + " raw=" + (info.raw || "").slice(0, 120);
  return json(res);
};
