import http from "node:http";
import net from "node:net";

const PORT = Number(process.env.PORT || 3000);
const VITE_PORT = Number(process.env.VITE_PORT || 5173);

const isCrickHub = (url = "") => url === "/crickhub" || url.startsWith("/crickhub/") || url.startsWith("/crickhub?");
const unavailablePage = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="robots" content="noindex">
    <title>Website unavailable | Northlake Cricket Academy</title>
    <style>
      * { box-sizing: border-box; }
      body { display: grid; min-height: 100vh; place-items: center; margin: 0; padding: 24px; color: #173326; background: #f3f7f3; font-family: Arial, sans-serif; }
      main { width: min(100%, 560px); padding: 56px 36px; border: 1px solid #e0e9e1; border-radius: 16px; background: #fff; text-align: center; box-shadow: 0 18px 55px #17332612; }
      .mark { display: grid; width: 52px; height: 52px; place-items: center; margin: 0 auto 24px; border-radius: 50%; color: #fff; background: #1d6848; font-size: 24px; font-weight: 700; }
      p { margin: 0 0 12px; color: #627268; font-size: 12px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; }
      h1 { margin: 0; font-size: clamp(30px, 7vw, 42px); letter-spacing: -1.5px; }
      .message { margin: 16px auto 0; max-width: 390px; color: #66756b; font-size: 16px; font-weight: 400; letter-spacing: 0; line-height: 1.6; text-transform: none; }
      @media (max-width: 480px) { main { padding: 42px 24px; } }
    </style>
  </head>
  <body>
    <main>
      <span class="mark" aria-hidden="true">N</span>
      <p>Northlake Cricket Academy</p>
      <h1>Website is not available</h1>
      <p class="message">We’re sorry, but our website is currently unavailable. Please try again later.</p>
    </main>
  </body>
</html>`;

const server = http.createServer((req, res) => {
  if (isCrickHub(req.url)) {
    const upstream = http.request({ host: "localhost", port: VITE_PORT, path: req.url, method: req.method, headers: req.headers }, (up) => {
      res.writeHead(up.statusCode, up.headers);
      up.pipe(res);
    });
    upstream.on("error", () => { res.writeHead(502); res.end("CrickHub dev server (npm run dev) is not running."); });
    req.pipe(upstream);
    return;
  }
  res.writeHead(503, {
    "content-type": "text/html; charset=utf-8",
    "cache-control": "no-store",
    "retry-after": "300"
  });
  res.end(req.method === "HEAD" ? undefined : unavailablePage);
});

server.on("upgrade", (req, socket, head) => {
  if (!isCrickHub(req.url)) return socket.destroy();
  const upstream = net.connect(VITE_PORT, "localhost", () => {
    upstream.write(`${req.method} ${req.url} HTTP/1.1\r\n` + Object.entries(req.headers).map(([k, v]) => `${k}: ${v}`).join("\r\n") + "\r\n\r\n");
    upstream.write(head);
    socket.pipe(upstream).pipe(socket);
  });
  upstream.on("error", () => socket.destroy());
  socket.on("error", () => upstream.destroy());
});

server.listen(PORT, () => {
  console.log(`NCA site (unavailable): http://localhost:${PORT}/`);
  console.log(`CrickHub:               http://localhost:${PORT}/crickhub/`);
});
