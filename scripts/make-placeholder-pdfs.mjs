import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

function pdf(lines) {
  const esc = (s) => s.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
  let y = 740;
  const ops = ["BT", "/F1 20 Tf", `72 ${y} Td`];
  lines.forEach((l, i) => {
    if (i === 1) ops.push("/F2 12 Tf");
    if (i > 0) ops.push("0 -28 Td");
    ops.push(`(${esc(l)}) Tj`);
  });
  ops.push("ET");
  const stream = ops.join("\n");
  const objs = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> >>",
    `<< /Length ${Buffer.byteLength(stream)} >>\nstream\n${stream}\nendstream`,
    "<< /Type /Font /Subtype /Type1 /BaseFont /Times-Bold >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Times-Roman >>",
  ];
  let out = "%PDF-1.4\n";
  const offsets = [];
  objs.forEach((o, i) => {
    offsets.push(Buffer.byteLength(out));
    out += `${i + 1} 0 obj\n${o}\nendobj\n`;
  });
  const xref = Buffer.byteLength(out);
  out += `xref\n0 ${objs.length + 1}\n0000000000 65535 f \n`;
  for (const o of offsets) out += `${String(o).padStart(10, "0")} 00000 n \n`;
  out += `trailer\n<< /Size ${objs.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF\n`;
  return out;
}

const root = process.cwd();
const dir = path.join(root, "content/articles");
for (const f of fs.readdirSync(dir)) {
  const { data } = matter(fs.readFileSync(path.join(dir, f), "utf8"));
  if (!data.pdf) continue;
  const target = path.join(root, "public", data.pdf);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  const title = String(data.title);
  fs.writeFileSync(
    target,
    pdf([
      title.length > 48 ? title.slice(0, 45) + "..." : title,
      "Scholar: Journal of Interdisciplinary Research",
      `Published ${data.published}  |  Pages ${data.pages}`,
      data.doi ? `DOI ${data.doi}` : "",
      "",
      "Placeholder PDF. Replace with the typeset article.",
    ]),
  );
}
fs.writeFileSync(
  path.join(root, "public/pdfs/scholar-template.pdf"),
  pdf(["Scholar Manuscript Template", "Single column, 12pt, 1.5 line spacing.", "Title, authors, affiliations, abstract, keywords, body, references.", "", "Placeholder PDF. Replace with the real template."]),
);
console.log(fs.readdirSync(path.join(root, "public/pdfs")));
