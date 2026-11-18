import fs from "fs";
import path from "path";

// A clean PDF-1.4 generator for Md. Rezanur Rahman's Resume with interactive clickable hyperlinks
function generateResumePdf() {
  // A4 page (595.28 x 841.89 points)
  const W = 595.28;
  const H = 841.89;
  
  // Stream commands
  const s = [];
  const annots = [];

  function addLink(x1, y1, x2, y2, url) {
    annots.push({ x1, y1, x2, y2, url });
  }

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
  rect(36, H - 108, W - 72, 84, 1, 1, 1);
  line(36, H - 108, W - 36, H - 108, 0.89, 0.91, 0.94, 1);

  // Header content
  text("MD. REZANUR RAHMAN", 52, H - 52, "F2", 21, 0.043, 0.07, 0.125);
  text("Junior Full-Stack Web Developer", 52, H - 70, "F2", 11, 0.145, 0.388, 0.922);

  // Contact line with interactive link annotations
  text("mdrezanurrahman2@gmail.com   |   +8801551986848   |   github.com/Rezanur2   |   linkedin.com/in/md-rezanur-rahman", 52, H - 91, "F1", 8.8, 0.3, 0.35, 0.42);
  
  // Link annotations for contact info
  addLink(50, H - 95, 172, H - 81, "mailto:mdrezanurrahman2@gmail.com");
  addLink(184, H - 95, 252, H - 81, "tel:+8801551986848");
  addLink(264, H - 95, 360, H - 81, "https://github.com/Rezanur2");
  addLink(372, H - 95, 535, H - 81, "https://www.linkedin.com/in/md-rezanur-rahman");

  let curY = H - 124;

  function sectionHeader(title) {
    curY -= 13;
    text(title.toUpperCase(), 36, curY, "F2", 10.5, 0.145, 0.388, 0.922);
    line(36, curY - 4, W - 36, curY - 4, 0.89, 0.91, 0.94, 1);
    curY -= 15;
  }

  // --- PROFESSIONAL SUMMARY ---
  sectionHeader("Professional Summary");
  const summaryLines = [
    "Junior Full-Stack Web Developer focused on building clean, responsive, and accessible web applications using React,",
    "Next.js, TypeScript, Node.js, and MongoDB. Background in Physics providing disciplined analytical and problem-solving skills.",
    "Passionate about writing maintainable code, implementing robust REST APIs, and crafting intuitive user experiences."
  ];
  for (const sl of summaryLines) {
    text(sl, 36, curY, "F1", 9, 0.25, 0.3, 0.38);
    curY -= 12;
  }

  curY -= 4;

  // --- TECHNICAL SKILLS ---
  sectionHeader("Technical Skills");
  const skills = [
    ["Frontend Technologies", "HTML5, CSS3, JavaScript (ES6+), React.js, Next.js, TypeScript, Tailwind CSS"],
    ["Backend & Database", "Node.js, Express.js, MongoDB (Native Driver), REST API Design & Integration"],
    ["Authentication & Security", "Better Auth, JWT Verification (Remote JWKS), Google OAuth"],
    ["Tools & Workflow", "Git, GitHub, VS Code, Vercel, Netlify, Chrome DevTools"],
    ["Currently Expanding", "Backend Architecture, System Design, Automated Testing"]
  ];
  for (const [cat, items] of skills) {
    text(cat + ":", 36, curY, "F2", 8.8, 0.043, 0.07, 0.125);
    text(items, 168, curY, "F1", 8.8, 0.25, 0.3, 0.38);
    curY -= 13;
  }

  curY -= 4;

  // --- FEATURED PROJECTS ---
  sectionHeader("Featured Projects");

  const projects = [
    {
      name: "Book Nook",
      tagline: "Full-Stack Library Management Platform",
      tech: "Next.js, React, TypeScript, Express.js, Node.js, MongoDB, Better-Auth, Tailwind CSS",
      live: "https://booknook-frontend-gray.vercel.app",
      github: "https://github.com/Rezanur2/book-nook-client",
      bullets: [
        "Architected full-stack library platform with book discovery, category filtering, and personal loan dashboards.",
        "Engineered Express REST API with MongoDB atomic operations for concurrency-safe inventory decrements and returns.",
        "Integrated Better-Auth with server-side JWT verification using remote JWKS for secure protected route access."
      ]
    },
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
        "Engineered parser to normalize deeply nested API response blocks into clean article summaries with localized date formatting."
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
        "Implemented shared daily planner state via React Context with a strict 5-exercise cap and duplicate prevention."
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
    text(proj.name, 36, curY, "F2", 10, 0.043, 0.07, 0.125);
    text("— " + proj.tagline, 105, curY, "F3", 8.8, 0.3, 0.35, 0.42);
    
    // Live link text & clickable link annotation
    const liveText = "Live: " + proj.live.replace("https://", "");
    text(liveText, W - 235, curY, "F1", 7.8, 0.145, 0.388, 0.922);
    addLink(W - 238, curY - 3, W - 36, curY + 9, proj.live);
    
    curY -= 11.5;

    text("Stack: " + proj.tech, 36, curY, "F1", 8.2, 0.145, 0.388, 0.922);
    curY -= 10.5;

    for (const b of proj.bullets) {
      text("-", 42, curY, "F2", 8.5, 0.145, 0.388, 0.922);
      text(b, 52, curY, "F1", 8.3, 0.25, 0.3, 0.38);
      curY -= 10.5;
    }
    curY -= 3.5;
  }

  // --- EDUCATION ---
  sectionHeader("Education");
  text("B.Sc. (Honours) in Physics", 36, curY, "F2", 9.5, 0.043, 0.07, 0.125);
  text("Completed: 2024", W - 110, curY, "F2", 8.5, 0.145, 0.388, 0.922);
  curY -= 11.5;
  text("Kushtia Govt. College — Under National University, Bangladesh", 36, curY, "F1", 8.5, 0.25, 0.3, 0.38);
  curY -= 13;

  // --- LANGUAGES ---
  sectionHeader("Languages");
  text("Bangla (Native)", 36, curY, "F1", 8.5, 0.25, 0.3, 0.38);
  text("•", 120, curY, "F2", 8.5, 0.145, 0.388, 0.922);
  text("English (Intermediate)", 135, curY, "F1", 8.5, 0.25, 0.3, 0.38);

  console.log("Remaining bottom margin:", curY.toFixed(2), "pt");

  const streamContent = s.join("\n");
  const streamLength = Buffer.byteLength(streamContent, "utf-8");

  // Create PDF objects
  let nextObjId = 8;
  const annotObjs = [];
  const annotRefs = [];

  for (const a of annots) {
    const annotId = nextObjId++;
    annotRefs.push(`${annotId} 0 R`);
    const annotObj = `${annotId} 0 obj\n<< /Type /Annot /Subtype /Link /Rect [${a.x1.toFixed(2)} ${a.y1.toFixed(2)} ${a.x2.toFixed(2)} ${a.y2.toFixed(2)}] /Border [0 0 0] /A << /S /URI /URI (${a.url}) >> >>\nendobj\n`;
    annotObjs.push(annotObj);
  }

  const obj1 = "1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n";
  const obj2 = "2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n";
  const obj3 = `3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${W} ${H}] /Contents 7 0 R /Annots [ ${annotRefs.join(" ")} ] /Resources << /Font << /F1 4 0 R /F2 5 0 R /F3 6 0 R >> >> >>\nendobj\n`;
  const obj4 = "4 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>\nendobj\n";
  const obj5 = "5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>\nendobj\n";
  const obj6 = "6 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Oblique /Encoding /WinAnsiEncoding >>\nendobj\n";
  const obj7 = `7 0 obj\n<< /Length ${streamLength} >>\nstream\n${streamContent}\nendstream\nendobj\n`;

  const allObjs = [obj1, obj2, obj3, obj4, obj5, obj6, obj7, ...annotObjs];

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
  let xref = `xref\n0 ${allObjs.length + 1}\n0000000000 65535 f \n`;
  for (const off of xrefOffsets) {
    xref += String(off).padStart(10, "0") + " 00000 n \n";
  }

  const trailer = `trailer\n<< /Size ${allObjs.length + 1} /Root 1 0 R >>\nstartxref\n${startxref}\n%%EOF\n`;

  const finalPdf = Buffer.concat([
    Buffer.from(header, "binary"),
    Buffer.from(body, "utf-8"),
    Buffer.from(xref, "utf-8"),
    Buffer.from(trailer, "utf-8")
  ]);

  const dest = path.join(process.cwd(), "public", "resume.pdf");
  fs.writeFileSync(dest, finalPdf);
  console.log("Successfully generated:", dest, `(${finalPdf.length} bytes, ${annots.length} interactive links)`);
}

generateResumePdf();
