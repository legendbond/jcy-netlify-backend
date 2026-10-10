// 囧次元 全接口代理（Netlify JS 函数）— 精简分发层
// 底层网络+加密全部复用同目录 probe.mjs 的导出（probe.mjs 已被证明能在 Netlify 上 build 并跑通 20000）。
// 小程序 POST /.netlify/functions/api {module,type,data,token} -> 上游 43.145.33.254:27990
import { call } from "./probe.mjs";

function qs(o){ const p = new URLSearchParams(); for (const [k, v] of Object.entries(o)) { if (v !== undefined && v !== null && v !== "") p.set(k, String(v)); } return p.toString(); }

export default async (req) => {
  const cors = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type" };
  if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: cors });
  let body;
  try { body = JSON.parse(await req.text()); } catch (e) { body = {}; }
  const m = body.module || "video", t = body.type || "", d = body.data || {}, token = body.token || "";
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
