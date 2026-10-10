// 囧次元 防休眠保活（Netlify 定时函数）— 让网关保持 warm，避免冷启动连上游 ETIMEDOUT
// 用法：在 Netlify 控制台 Functions -> keepalive -> Enable scheduled function，设 cron "*/5 * * * *"(每5分钟)
// 逻辑：复用 probe.mjs 底层 call 做一次轻量 login（最便宜、且顺带验证出口仍被上游认）
import { call, HOST, PORT } from "./probe.mjs";

export default async () => {
  const t0 = Date.now();
  const lg = await call("POST", "/pc/users/login",
    { type: "password", enum: 0, phone: "13299692690", password: "123456789", symbol: "win32" }, "");
  const out = {
    ts: new Date().toISOString(),
    target: HOST + ":" + PORT,
    http: lg.http,
    code: (lg.parsed || {}).code,
    verdict: lg.error ? ("CONNECT_FAIL:" + lg.error) : (((lg.parsed || {}).code === 20000) ? "warm-ok" : "code=" + ((lg.parsed || {}).code)),
    ms: Date.now() - t0,
  };
  return new Response(JSON.stringify(out), { status: 200, headers: { "Content-Type": "application/json" } });
};
