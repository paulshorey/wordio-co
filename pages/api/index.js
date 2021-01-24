export default function handler(req, res) {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");
  res.end(
    `page https://besta.domains/api moved to https://besta.domains/docs <script>window.location.href='/docs';</script>`
  );
}
