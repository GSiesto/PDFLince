# Security Policy

## Supported Versions

| Version | Supported |
|:--------|:----------|
| Latest  | ✅        |

## Architecture & Privacy

PDFLince processes all files **100% client-side** in your browser. No file data is ever uploaded to a server. This privacy-first design means:

- **No server-side file processing** — zero risk of server-side data exposure
- **No API keys or credentials** stored in the codebase
- **Static deployment** (`output: "export"`) — no Node.js runtime in production

## Reporting a Vulnerability

If you discover a security vulnerability, please report it responsibly:

1. **Email**: [info@pdflince.com](mailto:info@pdflince.com) with subject line `[SECURITY] <brief description>`
2. **Do NOT** open a public GitHub issue for security vulnerabilities
3. This is a solo-maintained project — reports are handled on a best-effort basis

### What to include

- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

## Scope

Since PDFLince is a static client-side application, the most relevant vulnerabilities are:

- **XSS** via crafted PDF content or file names
- **Dependency vulnerabilities** in client-side libraries (pdf-lib, pdfjs-dist, etc.)
- **Data leakage** via analytics or third-party scripts

Server-infrastructure vulnerabilities (SSRF, RCE, etc.) are **out of scope** as no server processes user data.
