import { ImageResponse } from "next/og";
import { projects } from "@/data/projects";
import { siteConfig } from "@/data/site";

export const alt = `${siteConfig.name} — ${siteConfig.designation} portfolio`;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f7f8fa",
          color: "#0b1220",
          padding: "60px 72px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: 420,
            height: 420,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(37,99,235,0.12), rgba(37,99,235,0) 68%)",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 60,
              height: 60,
              borderRadius: 14,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#0b1220",
              color: "#ffffff",
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: -0.5,
            }}
          >
            {siteConfig.initials}
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 26, fontWeight: 600, letterSpacing: -0.5 }}>
              {siteConfig.name}
            </div>
            <div
              style={{
                fontSize: 14,
                letterSpacing: 2.4,
                textTransform: "uppercase",
                color: "#4b5563",
              }}
            >
              {siteConfig.designation}
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              width: 72,
              height: 4,
              borderRadius: 999,
              background: "#2563eb",
            }}
          />
          <div
            style={{
              fontSize: 68,
              fontWeight: 600,
              letterSpacing: -2.6,
              lineHeight: 1.06,
              maxWidth: 900,
            }}
          >
            I build responsive, accessible interfaces for the web.
          </div>
          <div
            style={{
              fontSize: 22,
              color: "#4b5565",
              maxWidth: 820,
              lineHeight: 1.5,
            }}
          >
            React · Next.js · TypeScript — four deployed projects with live
            demos and public source code.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid #e2e8f0",
            paddingTop: 24,
          }}
        >
          <div style={{ display: "flex", gap: 10 }}>
            {projects.map((project) => (
              <div
                key={project.slug}
                style={{
                  display: "flex",
                  padding: "8px 14px",
                  borderRadius: 10,
                  border: "1px solid #e2e8f0",
                  background: "#ffffff",
                  fontSize: 15,
                  color: "#0b1220",
                }}
              >
                {project.name}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", fontSize: 15, color: "#4b5563" }}>
            {siteConfig.email}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
