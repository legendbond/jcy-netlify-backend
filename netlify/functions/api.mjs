// 囧次元 全接口代理（Netlify JS 函数）— 复用 probe.mjs 的加密原语与 TCP call（已验证 20000）
// 接受 { module, type, data, token }，映射到上游 43.145.33.254:27990
import { call, dec } from "./probe.mjs";

function qs(obj) {
  const p = new URLSearchParams();
  for (const [k, v] of Object.entries(obj)) { if (v !== undefined && v !== null && v !== "") p.set(k, String(v)); }
  return p.toString();
}

// module/type → 上游路径 + 方法
function routeTo(module, type, data, token) {
  const m = module || "video";
  const t = type || "";
  const d = data || {};
  if (m === "video") {
    if (t === "videoList") return { method: "GET", path: "/pc/video/list?" + qs({ channel: d.channel, page: d.page || 1, limit: d.limit || 30 }) };
    if (t === "videoDetail") return { method: "GET", path: "/pc/video/detail?" + qs({ id: d.id }) };
    if (t === "videoPlay") return { method: "GET", path: "/pc/video/play?" + qs({ id: d.id, part: d.part, play: "mp4" }) };
    if (t === "videoSearch") return { method: "GET", path: "/pc/search?" + qs({ keyword: d.key, q: d.key, page: d.page || 1, limit: d.limit || 20 }) };
    if (t === "videoBuy") return { method: "POST", body: { id: Number(d.id), part: d.part || "", play: "mp4" } };
    if (t === "channel") return { method: "GET", path: "/pc/channel?top-level=true" };
    if (t === "danmu") return { method: "GET", path: "/pc/danmaku/comments?" + qs({ id: d.id, part: d.part }) };
  }
  if (m === "user") {
    if (t === "login") return { method: "POST", body: { type: d.type || "password", enum: d.enum ?? 0, phone: d.phone || "", email: d.email || "", password: d.password || "", symbol: "win32" }, noToken: true };
    if (t === "register") return { method: "POST", body: { phone: d.phone || "", email: d.email || "", password: d.password || "" }, noToken: true };
    if (t === "logout") return { method: "POST", body: {}, path: "/pc/users/logout" };
    if (t === "info") return { method: "GET", path: "/pc/users/info" };
  }
  if (m === "users") {
    if (t === "gold") return { method: "GET", path: "/pc/video/gold" };
    if (t === "info") return { method: "GET", path: "/pc/users/info" };
    if (t === "taskList") return { method: "GET", path: "/pc/task/list" };
    if (t === "signInfo") return { method: "GET", path: "/pc/sign/info" };
    if (t === "sign") return { method: "POST", body: {}, path: "/pc/sign" };
    if (t === "invite") return { method: "GET", path: "/pc/invite/info" };
  }
  // 默认：login 需要特殊处理；其余走 info
  return { method: "GET", path: "/pc/users/info" };
}

export default async (req) => {
  const cors = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type" };
  if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: cors });
  let body;
  try { body = JSON.parse(await req.text()); } catch (e) { body = {}; }
  const { module, type, data, token } = body;
  const rt = routeTo(module, type, data || {}, token || "");
  // login/register 不带 token（首次获取）
  const tok = rt.noToken ? "" : (token || "");
  const res = rt.method === "POST"
    ? await call("POST", rt.path || "/pc/users/login", rt.body || {}, tok)
    : await call("GET", rt.path || "/pc/users/info", null, tok);

  if (res.error) {
    return new Response(JSON.stringify({ code: 50000, message: res.error, module, type }), { status: 200, headers: { "Content-Type": "application/json", ...cors } });
  }
  if (!res.parsed) {
    return new Response(JSON.stringify({ code: res.http || -1, message: "upstream http " + res.http, raw: (res.raw || "").slice(0, 150) }), { status: 200, headers: { "Content-Type": "application/json", ...cors } });
  }
  return new Response(JSON.stringify(res.parsed), { status: 200, headers: { "Content-Type": "application/json", ...cors } });
};

export const config = { path: "/api/request" };
