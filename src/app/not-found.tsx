import Link from "next/link";
import type { Metadata } from "next";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "404 – Page Not Found | PDFLince",
  description: "The page you were looking for doesn't exist. Go back to PDFLince and continue working with your PDFs.",
};

export default function NotFound() {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          padding: 0,
          minHeight: "100vh",
          backgroundColor: "#fff7f5",
          color: "#2c0f0f",
          fontFamily: "'Roboto', sans-serif",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <header
          style={{
            width: "100%",
            borderBottom: "1px solid #ffe7e5",
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            padding: "1rem 1.5rem",
            display: "flex",
            alignItems: "center",
          }}
        >
          <div style={{ maxWidth: "1200px", margin: "0 auto", width: "100%", display: "flex" }}>
            <Link href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none", color: "inherit" }}>
              <img src="/favicon.ico?v=2" alt="PDFLince logo" width={32} height={32} style={{ marginRight: "0.5rem" }} />
              <span style={{ fontSize: "1.25rem", fontWeight: 700, fontFamily: "'Montserrat', sans-serif" }}>PDFLince</span>
            </Link>
          </div>
        </header>

        <main
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem 1.5rem",
            maxWidth: "540px",
            width: "100%",
            margin: "0 auto",
            animation: "fadeIn 0.5s ease forwards",
            textAlign: "center",
          }}
        >
          {/* Mascot and Badge */}
          <div style={{ position: "relative", marginBottom: "1.5rem" }}>
            <img 
              src="/images/stickers/pdflince_logo_processed.webp" 
              alt="PDFLince Mascot" 
              style={{ width: "120px", height: "auto", filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.1))" }} 
            />
            <div style={{
              position: "absolute",
              top: "-5px",
              right: "-15px",
              backgroundColor: "#e34e1c",
              color: "white",
              padding: "0.25rem 0.6rem",
              borderRadius: "1rem",
              fontSize: "0.75rem",
              fontWeight: 800,
              fontFamily: "'Montserrat', sans-serif",
              boxShadow: "0 2px 8px rgba(227,78,28,0.3)",
              transform: "rotate(5deg)"
            }}>
              404
            </div>
          </div>

          {/* Heading */}
          <h1
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(1.5rem, 5vw, 2.2rem)",
              color: "#2c0f0f",
              marginBottom: "0.5rem",
              lineHeight: 1.2,
            }}
          >
            What do you need to do?
          </h1>

          {/* Subtext */}
          <p
            style={{
              color: "#4e2525",
              fontSize: "1.05rem",
              lineHeight: 1.6,
              marginBottom: "2rem",
              maxWidth: "420px",
            }}
          >
            It seems the page you tried to visit is missing, but all our completely private PDF tools are right here:
          </p>

          <div
            style={{
              width: "100%",
            }}
          >

            {/* English tools */}
            <p style={{ color: "#4e2525", fontSize: "0.75rem", marginBottom: "0.5rem", opacity: 0.7 }}>🇬🇧 English</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", justifyContent: "center", marginBottom: "1rem" }}>
              {[
                { label: "Merge PDF", href: "/en/merge" },
                { label: "Compress PDF", href: "/en/compress" },
                { label: "Split PDF", href: "/en/split" },
                { label: "Extract Pages", href: "/en/extract" },
                { label: "Reorder Pages", href: "/en/reorder" },
                { label: "Rotate PDF", href: "/en/rotate" },
                { label: "Crop PDF", href: "/en/crop" },
                { label: "PDF to Images", href: "/en/pdf-to-images" },
                { label: "Images to PDF", href: "/en/images-to-pdf" },
              ].map((tool) => (
                <a key={tool.href} href={tool.href} className="tool-card" style={chipStyle}>{tool.label}</a>
              ))}
            </div>

            {/* Spanish tools */}
            <p style={{ color: "#4e2525", fontSize: "0.75rem", marginBottom: "0.5rem", opacity: 0.7 }}>🇪🇸 Español</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", justifyContent: "center", marginBottom: "1.5rem" }}>
              {[
                { label: "Unir PDF", href: "/unir" },
                { label: "Comprimir PDF", href: "/comprimir" },
                { label: "Dividir PDF", href: "/dividir" },
                { label: "Extraer páginas", href: "/extraer" },
                { label: "Reordenar páginas", href: "/reordenar" },
                { label: "Girar PDF", href: "/girar" },
                { label: "Recortar PDF", href: "/recortar" },
              ].map((tool) => (
                <a key={tool.href} href={tool.href} className="tool-card" style={chipStyle}>{tool.label}</a>
              ))}
            </div>

            {/* Other languages */}
            <p style={{ color: "#4e2525", fontSize: "0.75rem", marginBottom: "0.5rem", opacity: 0.7 }}>More languages</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", justifyContent: "center" }}>
              {[
                { label: "Deutsch", href: "/de" },
                { label: "Français", href: "/fr" },
                { label: "Italiano", href: "/it" },
                { label: "Português", href: "/pt" },
                { label: "Română", href: "/ro" },
              ].map((lang) => (
                <a key={lang.href} href={lang.href} style={langChipStyle}>{lang.label}</a>
              ))}
            </div>
          </div>
        </main>

        <style>{`
          * {
            box-sizing: border-box;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(16px); }
            to   { opacity: 1; transform: translateY(0); }
          }
          .tool-card {
            transition: all 0.2s cubic-bezier(0.22, 1, 0.36, 1);
          }
          .tool-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(227,78,28,0.15);
            border-color: #e34e1c !important;
            color: #e34e1c;
          }
          a:hover { opacity: 0.8; }
        `}</style>
      </body>
    </html>
  );
}

const chipStyle: React.CSSProperties = {
  fontSize: "0.85rem",
  color: "#2c0f0f",
  textDecoration: "none",
  padding: "0.6rem 1rem",
  borderRadius: "0.5rem",
  border: "1px solid #ffe7e5",
  backgroundColor: "#ffffff",
  fontWeight: 600,
  boxShadow: "0 2px 4px rgba(0,0,0,0.02)",
  flex: "1 1 calc(33.333% - 0.5rem)",
  minWidth: "120px",
  textAlign: "center",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const langChipStyle: React.CSSProperties = {
  fontSize: "0.75rem",
  color: "#4e2525",
  textDecoration: "none",
  padding: "0.25rem 0.6rem",
  borderRadius: "999px",
  border: "1px solid #ffe7e5",
  backgroundColor: "transparent",
  fontWeight: 500,
};
