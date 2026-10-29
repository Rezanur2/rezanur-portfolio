import fs from "fs";
import path from "path";

// A clean PDF-1.4 generator for Md. Rezanur Rahman's Resume
function generateResumePdf() {
  // We will build the content stream for an A4 page (595.28 x 841.89 points)
  const W = 595.28;
  const H = 841.89;
  
  // Stream commands
  const s = [];

  // Helper functions for drawing
  function rect(x, y, w, h, fillR, fillG, fillB) {
    s.push(`${fillR} ${fillG} ${fillB} rg`);
    s.push(`${x.toFixed(2)} ${y.toFixed(2)} ${w.toFixed(2)} ${h.toFixed(2)} re f`);
  }

  function line(x1, y1, x2, y2, strokeR, strokeG, strokeB, lineWidth = 1) {
    s.push(`${lineWidth} w`);
    s.push(`${strokeR} ${strokeG} ${strokeB} RG`);
    s.push(`${x1.toFixed(2)} ${y1.toFixed(2)} m ${x2.toFixed(2)} ${y2.toFixed(2)} l S`);
  }

  function text(str, x, y, font, size, r = 0.04, g = 0.07, b = 0.13) {
    const sanitized = str.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
    s.push("BT");
    s.push(`/${font} ${size} Tf`);
    s.push(`${r} ${g} ${b} rg`);
    s.push(`${x.toFixed(2)} ${y.toFixed(2)} Td`);
    s.push(`(${sanitized}) Tj`);
    s.push("ET");
  }

  // Background
  rect(0, 0, W, H, 0.98, 0.98, 0.99); // #f7f8fa

  // Top header bar / accent band
  rect(0, H - 6, W, 6, 0.145, 0.388, 0.922); // #2563eb

  // Header Box
  rect(36, H - 110, W - 72, 86, 1, 1, 1);
  line(36, H - 110, W - 36, H - 110, 0.89, 0.91, 0.94, 1);

  // Header content
  text("MD. REZANUR RAHMAN", 52, H - 54, "F2", 22, 0.043, 0.07, 0.125);
  text("Junior Web Developer / Frontend Developer", 52, H - 72, "F2", 11, 0.145, 0.388, 0.922);
  text("mdrezanurrahman2@gmail.com   |   +8801551986848   |   github.com/Rezanur2   |   linkedin.com/in/md-rezanur-rahman", 52, H - 94, "F1", 9, 0.3, 0.35, 0.42);

  let curY = H - 130;

  function sectionHeader(title) {
    curY -= 14;
    text(title.toUpperCase(), 36, curY, "F2", 11, 0.145, 0.388, 0.922);
    line(36, curY - 5, W - 36, curY - 5, 0.89, 0.91, 0.94, 1);
    curY -= 16;
  }

  // --- PROFESSIONAL SUMMARY ---
  sectionHeader("Professional Summary");
  const summaryLines = [
    "Junior Web Developer and Frontend Developer focused on building clean, responsive, and accessible user interfaces",
    "using React, Next.js, and TypeScript. Background in Physics with disciplined analytical and problem-solving skills.",
    "Passionate about writing maintainable code, solving complex JavaScript problems, and expanding full-stack capabilities",
    "with Node.js and MongoDB."
  ];
  for (const sl of summaryLines) {
    text(sl, 36, curY, "F1", 9.2, 0.25, 0.3, 0.38);
    curY -= 13;
  }

  curY -= 6;

  // --- TECHNICAL SKILLS ---
  sectionHeader("Technical Skills");
  const skills = [
    ["Frontend Technologies", "HTML5, CSS3, JavaScript (ES6+), React.js, Next.js, TypeScript, Tailwind CSS"],
    ["Application Patterns", "React Context API, Dynamic Routing, REST API Integration, Component Architecture"],
    ["Authentication", "Better Auth, Email/Password Auth, Google OAuth, GitHub OAuth"],
    ["Tools & Workflow", "Git, GitHub, VS Code, Vercel, Netlify, Chrome DevTools"],
    ["Currently Expanding", "Node.js, Express, MongoDB (Full-Stack Fundamentals)"]
  ];
  for (const [cat, items] of skills) {
    text(cat + ":", 36, curY, "F2", 9, 0.043, 0.07, 0.125);
    text(items, 160, curY, "F1", 9, 0.25, 0.3, 0.38);
    curY -= 14;
  }

  curY -= 6;

  // --- FEATURED PROJECTS ---
  sectionHeader("Featured Projects");

  const projects = [
    {
      name: "Bazar Dor",
      tagline: "Everyday Market Price Explorer in Bengali",
      tech: "Next.js, TypeScript, Tailwind CSS, daisyUI, Better Auth, MongoDB, REST API",
      live: "https://bazar-dor-sigma-six.vercel.app",
      github: "https://github.com/Rezanur2/Bazar-Dor",
      bullets: [
        "Architected a Bengali-first price explorer allowing users to track rising and falling commodity market prices.",
        "Implemented category routes, dynamic URL price sorting, and localized Bengali numeral and unit converters.",
        "Configured secure authentication flows with Better Auth connected to MongoDB with optional OAuth providers."
      ]
    },
    {
      name: "Bangla News 24",
      tagline: "Responsive Curated News Platform",
      tech: "Next.js, TypeScript, Tailwind CSS, daisyUI, Better Auth, MongoDB, REST API",
      live: "https://bangla-news-24-dusky-eight.vercel.app",
      github: "https://github.com/Rezanur2/bangla-news-24",
      bullets: [
        "Built a responsive news application featuring curated categories (politics, economy, tech, world) and lead story blocks.",
        "Engineered parser to normalize deeply nested API response blocks into clean article summaries with localized date formatting.",
        "Integrated account management with Google and credentials sign-in for saved reading preferences."
      ]
    },
    {
      name: "FitLog",
      tagline: "Workout Library & Daily Fitness Planner",
      tech: "Next.js, TypeScript, Tailwind CSS, daisyUI, React Context API, Toastify",
      live: "https://fit-log-gamma-two.vercel.app",
      github: "https://github.com/Rezanur2/fit-log",
      bullets: [
        "Created an interactive workout catalog with difficulty ratings, target muscle groups, and calorie estimates.",
        "Implemented shared daily planner state via React Context with a strict 5-exercise cap and duplicate prevention.",
        "Calculated dynamic session summaries with sorting by duration, calories, and user rating."
      ]
    },
    {
      name: "DevStack",
      tagline: "Technology Catalog & Developer Stack Assembler",
      tech: "React, Vite, TypeScript, Tailwind CSS, daisyUI",
      live: "https://devstackrezanur.netlify.app",
      github: "https://github.com/Rezanur2/DevStack",
      bullets: [
        "Developed a single-page stack builder with React Suspense for asynchronous local JSON data resolution.",
        "Implemented real-time synchronized panels for catalog filtering and personal technology stack compilation."
      ]
    }
  ];

  for (const proj of projects) {
    text(proj.name, 36, curY, "F2", 10.5, 0.043, 0.07, 0.125);
    text("— " + proj.tagline, 105, curY, "F3", 9, 0.3, 0.35, 0.42);
    text("Live: " + proj.live.replace("https://", ""), W - 240, curY, "F1", 8, 0.145, 0.388, 0.922);
    curY -= 12;

    text("Stack: " + proj.tech, 36, curY, "F1", 8.5, 0.145, 0.388, 0.922);
    curY -= 11;

    for (const b of proj.bullets) {
      text("-", 42, curY, "F2", 9, 0.145, 0.388, 0.922);
      text(b, 52, curY, "F1", 8.5, 0.25, 0.3, 0.38);
      curY -= 11;
    }
    curY -= 4;
  }

  curY -= 2;

  // --- EDUCATION ---
  sectionHeader("Education");
  text("B.Sc. (Honours) in Physics", 36, curY, "F2", 10, 0.043, 0.07, 0.125);
  text("Completed: 2024", W - 120, curY, "F2", 9, 0.145, 0.388, 0.922);
  curY -= 12;
  text("Kushtia Govt. College — Under National University, Bangladesh", 36, curY, "F1", 9, 0.25, 0.3, 0.38);
  curY -= 14;

  // --- LANGUAGES ---
  sectionHeader("Languages");
  text("Bangla (Native)", 36, curY, "F1", 9, 0.25, 0.3, 0.38);
  text("•", 125, curY, "F2", 9, 0.145, 0.388, 0.922);
  text("English (Intermediate)", 140, curY, "F1", 9, 0.25, 0.3, 0.38);

  const streamContent = s.join("\n");
  const streamLength = Buffer.byteLength(streamContent, "utf-8");

  // Object 1: Catalog
  // Object 2: Pages
  // Object 3: Page 1
  // Object 4: Font F1 (Helvetica)
  // Object 5: Font F2 (Helvetica-Bold)
  // Object 6: Font F3 (Helvetica-Oblique)
  // Object 7: Content Stream

  const obj1 = "1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n";
  const obj2 = "2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n";
  const obj3 = `3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${W} ${H}] /Contents 7 0 R /Resources << /Font << /F1 4 0 R /F2 5 0 R /F3 6 0 R >> >> >>\nendobj\n`;
  const obj4 = "4 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>\nendobj\n";
  const obj5 = "5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>\nendobj\n";
  const obj6 = "6 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Oblique /Encoding /WinAnsiEncoding >>\nendobj\n";
  const obj7 = `7 0 obj\n<< /Length ${streamLength} >>\nstream\n${streamContent}\nendstream\nendobj\n`;

  const allObjs = [obj1, obj2, obj3, obj4, obj5, obj6, obj7];

  let header = "%PDF-1.4\n%\xE2\xE3\xCF\xD3\n";
  let body = "";
  const xrefOffsets = [];

  let currentOffset = Buffer.byteLength(header, "binary");

  for (let i = 0; i < allObjs.length; i++) {
    xrefOffsets.push(currentOffset);
    body += allObjs[i];
    currentOffset += Buffer.byteLength(allObjs[i], "binary");
  }

  const startxref = currentOffset;
  let xref = `xref\n0 8\n0000000000 65535 f \n`;
  for (const off of xrefOffsets) {
    xref += String(off).padStart(10, "0") + " 00000 n \n";
  }

  const trailer = `trailer\n<< /Size 8 /Root 1 0 R >>\nstartxref\n${startxref}\n%%EOF\n`;

  const finalPdf = Buffer.concat([
    Buffer.from(header, "binary"),
    Buffer.from(body, "utf-8"),
    Buffer.from(xref, "utf-8"),
    Buffer.from(trailer, "utf-8")
  ]);

  const dest = path.join(process.cwd(), "public", "resume.pdf");
  fs.writeFileSync(dest, finalPdf);
  console.log("Successfully generated:", dest, `(${finalPdf.length} bytes)`);
}

generateResumePdf();
