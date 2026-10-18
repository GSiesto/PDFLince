"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  Check,
  ChevronDown,
  Copy,
  ExternalLink,
  FeatureIcon,
  FileCode,
  Folder,
  IconBadge,
  OperationIcon,
  Terminal,
  TerminalSquare,
} from "./ui/Icons";
import { useDictionary } from "../i18n/LocaleProvider";
import type { McpToolItem } from "../i18n/dictionaries/dictionary-types";
import { FaqSchema } from "./seo/FaqSchema";

function getConfigFileName(path?: string): string {
  if (!path) return "mcp_config.json";
  const firstPath = path.split(/\n|\s+or\s+/i)[0].trim();
  const withoutParen = firstPath.replace(/\s*\([^)]*\)\s*$/, "").trim();
  if (withoutParen.includes(">")) return "mcp_config.json";
  const parts = withoutParen.split(/[/\\]/);
  return parts.pop() || "mcp_config.json";
}

function HighlightedJson({ code }: { code: string }) {
  const regex =
    /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\\-]?\d+)?|[{}[\],])/g;

  const elements: (string | React.ReactNode)[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(code)) !== null) {
    if (match.index > lastIndex) {
      elements.push(code.substring(lastIndex, match.index));
    }

    const token = match[0];
    let className = "text-[#f3edea]";

    if (/^"/.test(token)) {
      if (/:$/.test(token)) {
        className = "text-[#ff8f73] font-semibold";
      } else {
        className = "text-[#6ee7b7]";
      }
    } else if (/true|false/.test(token)) {
      className = "text-[#fcd34d]";
    } else if (/null/.test(token)) {
      className = "text-[#f87171]";
    } else if (/^-?\d+(?:\.\d*)?(?:[eE][+\\-]?\d+)?$/.test(token)) {
      className = "text-[#93c5fd]";
    } else if (/[{}[\],]/.test(token)) {
      className = "text-[#a89f9b]";
    }

    elements.push(
      <span key={match.index} className={className}>
        {token}
      </span>
    );
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < code.length) {
    elements.push(code.substring(lastIndex));
  }

  return (
    <pre className="p-5 text-xs font-mono overflow-x-auto leading-relaxed text-[#f3edea] selection:bg-[var(--accent)] selection:text-white">
      <code>{elements}</code>
    </pre>
  );
}

export function McpPageContent() {
  const dictionary = useDictionary();
  const { mcp } = dictionary.pages;
  const { hero, privacyNotice, features, clients, tools, faq, cta, ui } = mcp;

  const uiLabels = {
    copyPath: ui?.copyPath ?? "Copy path",
    copiedPath: ui?.copiedPath ?? "Path copied",
    copyJson: ui?.copyJson ?? "Copy JSON",
    copiedJson: ui?.copiedJson ?? "Copied",
    parametersHeading: ui?.parametersHeading ?? "Parameters",
    paramName: ui?.paramName ?? "Name",
    paramType: ui?.paramType ?? "Type",
    paramRequired: ui?.paramRequired ?? "Required",
    paramDescription: ui?.paramDescription ?? "Description",
    yes: ui?.yes ?? "Yes",
    no: ui?.no ?? "No",
    promptExampleHeading: ui?.promptExampleHeading ?? "Example Prompt",
    copyPrompt: ui?.copyPrompt ?? "Copy prompt",
    copiedPrompt: ui?.copiedPrompt ?? "Copied",
    clickToCopy: ui?.clickToCopy ?? "Click to copy",
    directCliLabel: ui?.directCliLabel ?? "Direct CLI / stdio invocation:",
  };

  const [activeClientTab, setActiveClientTab] = useState(clients.tabs[0]?.id || "claude-desktop");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [selectedTool, setSelectedTool] = useState<string>(tools.items[0]?.name || "pdflince_inspect");

  const copyText = async (text: string, key: string) => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else if (typeof document !== "undefined") {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "fixed";
        textArea.style.left = "-9999px";
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }
      setCopiedKey(key);
      setTimeout(() => {
        setCopiedKey((curr) => (curr === key ? null : curr));
      }, 2000);
    } catch (e) {
      console.error("Clipboard write error:", e);
    }
  };

  const activeClient = clients.tabs.find((c) => c.id === activeClientTab) || clients.tabs[0];
  const activeToolItem: McpToolItem | undefined =
    tools.items.find((t) => t.name === selectedTool) || tools.items[0];

  // Select the 3 distinct architectural pillars (Privacy/Sovereignty, UI Parity, Universal Host/Model Support)
  const corePillars = [
    features.cards[0],
    features.cards[3] ?? features.cards[1],
    features.cards[2],
  ].filter(Boolean);

  return (
    <div className="min-h-screen bg-gradient-soft relative">
      <div
        className="container mx-auto px-4 py-10 md:py-14 space-y-16"
        style={{ maxWidth: "var(--max-width-wide-page)" }}
      >
        {/* 1. Focused Header + Immediate Setup */}
        <section id="setup" className="space-y-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left md:max-w-[76%]">
              <div className="mb-3.5 flex items-center justify-center md:justify-start">
                <span className="inline-flex items-center gap-2 rounded-full border border-[var(--ui)] bg-white/80 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--tx-3)]">
                  <span className="w-2 h-2 rounded-full bg-[var(--gr)] inline-block" />
                  {hero.eyebrow}
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-balance tracking-tight mb-3.5 text-[var(--tx)]">
                {hero.title}
              </h1>

              <p className="text-base md:text-lg text-[var(--tx-2)] text-balance leading-relaxed mb-5 max-w-2xl">
                {hero.subtitle}
              </p>

              {/* Compact inline metrics pills — zero visual clutter */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                {hero.stats.map((stat) => (
                  <span
                    key={stat.label}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-[var(--ui)]/80 border border-[var(--ui-2)] px-3 py-1 text-xs text-[var(--tx-2)]"
                  >
                    <strong className="font-bold text-[var(--accent)]">{stat.value}</strong>
                    <span>{stat.label}</span>
                  </span>
                ))}
              </div>
            </div>

            <div className="hidden md:flex md:w-[24%] justify-end items-center">
              <Image
                src="/images/stickers/pdflince_logo_processed.webp"
                alt="PDFLince MCP"
                width={176}
                height={176}
                className="w-full h-auto max-w-[168px] opacity-90"
                priority
                unoptimized
              />
            </div>
          </div>

          {/* Unified Setup Card: Client Tabs + Config Snippet + CLI One-Liner */}
          <div className="surface-card p-5 md:p-7 rounded-2xl border border-[var(--ui)] shadow-sm">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-[var(--ui)]">
              <div>
                <h2 className="text-lg font-bold text-[var(--tx)]">{clients.title}</h2>
                <p className="text-xs text-[var(--tx-2)] mt-0.5">{clients.subtitle}</p>
              </div>

              {/* Client Selector Pills */}
              <div className="flex flex-wrap gap-1.5" role="tablist" aria-label={clients.title}>
                {clients.tabs.map((client) => {
                  const isActive = client.id === activeClientTab;
                  return (
                    <button
                      key={client.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setActiveClientTab(client.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                        isActive
                          ? "bg-[var(--accent)] text-white shadow-xs"
                          : "bg-[var(--ui-2)] text-[var(--tx-2)] hover:bg-[var(--ui-3)]"
                      }`}
                    >
                      {client.name}
                    </button>
                  );
                })}
              </div>
            </div>

            {activeClient && (
              <div className="pt-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-3">
                  <p className="text-xs text-[var(--tx-2)]">{activeClient.description}</p>

                  {activeClient.configPath && (
                    <button
                      type="button"
                      onClick={() => copyText(activeClient.configPath!, `path-${activeClient.id}`)}
                      className="group inline-flex items-center gap-1.5 text-[11px] text-[var(--tx-3)] font-mono bg-[var(--ui-2)]/60 hover:bg-[var(--ui-2)] px-2.5 py-1 rounded-md border border-[var(--ui)] transition max-w-full text-left shrink-0"
                      title={uiLabels.copyPath}
                    >
                      <Folder className="w-3.5 h-3.5 text-[var(--tx-3)] group-hover:text-[var(--accent)] transition shrink-0" />
                      <span className="truncate max-w-[260px] sm:max-w-[340px]">{activeClient.configPath}</span>
                      <span className="text-[10px] text-[var(--accent)] font-sans font-semibold shrink-0 ml-1">
                        {copiedKey === `path-${activeClient.id}` ? uiLabels.copiedPath : uiLabels.copyPath}
                      </span>
                    </button>
                  )}
                </div>

                {/* Terminal JSON Config */}
                <div className="rounded-xl overflow-hidden border border-[var(--ui)] bg-[#1e1413] shadow-inner">
                  <div className="flex items-center justify-between px-4 py-2.5 bg-[#2a1d1b] border-b border-black/30">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56] inline-block" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e] inline-block" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f] inline-block" />
                      <span className="ml-2 font-mono text-[11px] text-white/80 flex items-center gap-1.5">
                        <FileCode className="w-3.5 h-3.5 text-white/60" />
                        <span>{getConfigFileName(activeClient.configPath)}</span>
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => copyText(activeClient.snippet, `client-${activeClient.id}`)}
                      className="inline-flex items-center gap-1.5 rounded-md bg-white/10 hover:bg-white/20 active:scale-95 text-white/90 px-3 py-1 text-xs font-mono transition"
                      aria-label={uiLabels.copyJson}
                    >
                      {copiedKey === `client-${activeClient.id}` ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" strokeWidth={2.5} />
                          <span className="text-emerald-400">{uiLabels.copiedJson}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>{uiLabels.copyJson}</span>
                        </>
                      )}
                    </button>
                  </div>

                  <HighlightedJson code={activeClient.snippet} />
                </div>

                {/* Integrated Standalone CLI Bar */}
                <div className="mt-4 pt-3.5 border-t border-[var(--ui)] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                  <span className="text-[var(--tx-3)] flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-[var(--accent)]" />
                    <span>{uiLabels.directCliLabel}</span>
                  </span>

                  <button
                    type="button"
                    onClick={() => copyText(hero.installCommand, "hero-install")}
                    className="inline-flex items-center justify-between sm:justify-start gap-2.5 font-mono text-xs bg-[var(--bg-2)] hover:bg-[var(--ui)]/60 border border-[var(--ui)] px-3 py-1.5 rounded-lg text-[var(--tx)] transition group"
                  >
                    <span>
                      <span className="text-[var(--accent)] font-bold select-none mr-1.5">$</span>
                      {hero.installCommand}
                    </span>
                    <span className="inline-flex items-center gap-1 font-sans text-[11px] font-semibold text-[var(--accent)]">
                      {copiedKey === "hero-install" ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-[var(--gr)]" strokeWidth={2.5} />
                          <span className="text-[var(--gr)]">{hero.copiedLabel}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>{hero.copyLabel}</span>
                        </>
                      )}
                    </span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* 2. Interactive Tool Explorer */}
        <section id="tools" className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-[var(--tx)]">{tools.title}</h2>
            <p className="text-sm text-[var(--tx-2)] mt-1">{tools.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            {/* Tool Selector List */}
            <div className="lg:col-span-4 surface-card p-2.5 rounded-xl border border-[var(--ui)] space-y-1">
              {tools.items.map((tool) => {
                const isSelected = tool.name === selectedTool;
                return (
                  <button
                    key={tool.name}
                    type="button"
                    onClick={() => setSelectedTool(tool.name)}
                    className={`w-full text-left px-3 py-2.5 rounded-lg text-xs transition flex items-center justify-between ${
                      isSelected
                        ? "bg-[var(--accent)] text-white font-semibold shadow-xs"
                        : "text-[var(--tx)] hover:bg-[var(--ui-2)]"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <OperationIcon
                        operation={tool.name}
                        className={`w-4 h-4 shrink-0 ${isSelected ? "text-white" : "text-[var(--accent)]"}`}
                      />
                      <div className="truncate">
                        <div className="truncate font-medium">{tool.title}</div>
                        <div
                          className={`font-mono text-[10px] truncate ${
                            isSelected ? "text-white/80" : "text-[var(--tx-3)]"
                          }`}
                        >
                          {tool.name}
                        </div>
                      </div>
                    </div>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-medium shrink-0 ml-2 ${
                        isSelected ? "bg-white/20 text-white" : "bg-[var(--ui)] text-[var(--tx-3)]"
                      }`}
                    >
                      {tool.badge}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Active Tool Inspector */}
            {activeToolItem && (
              <div className="lg:col-span-8 surface-card p-6 md:p-7 rounded-xl border border-[var(--ui)] flex flex-col shadow-sm space-y-6">
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <IconBadge size="md">
                        <OperationIcon operation={activeToolItem.name} className="w-5 h-5" />
                      </IconBadge>
                      <div>
                        <h3 className="text-xl font-bold text-[var(--tx)]">{activeToolItem.title}</h3>
                        <code className="text-xs font-mono text-[var(--tx-3)]">{activeToolItem.name}</code>
                      </div>
                    </div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[var(--ui)] text-[var(--accent)]">
                      {activeToolItem.badge}
                    </span>
                  </div>

                  <p className="text-sm text-[var(--tx-2)] leading-relaxed">
                    {activeToolItem.description}
                  </p>
                </div>

                {/* Actionable Example Prompt First (how humans actually trigger the tool) */}
                <div className="p-4 rounded-xl bg-[var(--bg-2)] border border-[var(--ui)]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold text-[var(--tx-3)] uppercase tracking-wider flex items-center gap-1.5">
                      <TerminalSquare className="w-3.5 h-3.5 text-[var(--accent)]" />
                      <span>{uiLabels.promptExampleHeading}</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => copyText(activeToolItem.promptExample, `prompt-${activeToolItem.name}`)}
                      className="text-xs text-[var(--accent)] hover:underline font-semibold inline-flex items-center gap-1"
                    >
                      {copiedKey === `prompt-${activeToolItem.name}` ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-[var(--gr)]" strokeWidth={2.5} />
                          <span className="text-[var(--gr)]">{uiLabels.copiedPrompt}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>{uiLabels.copyPrompt}</span>
                        </>
                      )}
                    </button>
                  </div>
                  <p
                    onClick={() => copyText(activeToolItem.promptExample, `prompt-${activeToolItem.name}`)}
                    className="text-xs md:text-sm font-mono text-[var(--tx)] cursor-pointer select-all leading-relaxed"
                    title={uiLabels.clickToCopy}
                  >
                    &ldquo;{activeToolItem.promptExample}&rdquo;
                  </p>
                </div>

                {/* Schema Parameters Table */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--tx-3)] mb-2.5">
                    {uiLabels.parametersHeading}
                  </h4>
                  <div className="overflow-x-auto rounded-lg border border-[var(--ui)]">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-[var(--ui)]/70 text-[var(--tx-3)] uppercase font-semibold text-[10px]">
                        <tr>
                          <th className="p-2.5 pl-3">{uiLabels.paramName}</th>
                          <th className="p-2.5">{uiLabels.paramType}</th>
                          <th className="p-2.5">{uiLabels.paramRequired}</th>
                          <th className="p-2.5 pr-3">{uiLabels.paramDescription}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[var(--ui)] bg-[var(--bg)]">
                        {activeToolItem.parameters.map((param) => (
                          <tr key={param.name} className="hover:bg-[var(--ui)]/20 transition-colors">
                            <td className="p-2.5 pl-3 font-mono text-[var(--tx)] font-semibold text-[11px]">
                              {param.name}
                            </td>
                            <td className="p-2.5 font-mono text-[var(--tx-2)] text-[11px] whitespace-nowrap">
                              {param.type}
                            </td>
                            <td className="p-2.5 text-[11px]">
                              {param.required ? (
                                <span className="inline-block px-1.5 py-0.5 rounded text-[10px] font-semibold bg-[var(--ui)] text-[var(--accent)]">
                                  {uiLabels.yes}
                                </span>
                              ) : (
                                <span className="text-[var(--tx-3)]">{uiLabels.no}</span>
                              )}
                            </td>
                            <td className="p-2.5 pr-3 text-[var(--tx-2)] text-[11px] leading-relaxed">
                              {param.description}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* 3. Distilled 3-Pillar Architecture + Security Verification */}
        <section className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {corePillars.map((card) => (
              <div
                key={card.title}
                className="surface-card p-6 rounded-xl border border-[var(--ui)] flex flex-col"
              >
                <IconBadge className="mb-4">
                  <FeatureIcon icon={card.icon} className="w-5 h-5" />
                </IconBadge>
                <h3 className="text-base font-bold mb-2 text-[var(--tx)]">{card.title}</h3>
                <p className="text-xs text-[var(--tx-2)] leading-relaxed">{card.description}</p>
              </div>
            ))}
          </div>

          <div className="surface-card px-5 py-4 rounded-xl border border-[var(--ui)] bg-[var(--bg-2)]/70 grid grid-cols-1 md:grid-cols-3 gap-3">
            {privacyNotice.points.map((point) => (
              <div key={point} className="flex items-start gap-2.5 text-xs text-[var(--tx-2)]">
                <Check className="w-4 h-4 text-[var(--gr)] shrink-0 mt-0.5" strokeWidth={2.25} />
                <span className="leading-relaxed">{point}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Concise FAQ + Subtle Footer Links */}
        <section id="faq" className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-2xl font-bold text-center text-[var(--tx)]">{faq.title}</h2>
          <div className="space-y-3">
            {faq.entries.map(({ question, answer }) => (
              <details
                key={question}
                name="mcp-faq"
                className="surface-card p-5 rounded-xl border border-[var(--ui)] group"
              >
                <summary className="cursor-pointer text-sm font-semibold text-[var(--tx)] select-none list-none flex items-center justify-between gap-3">
                  <span>{question}</span>
                  <ChevronDown className="w-4 h-4 text-[var(--tx-3)] shrink-0 transition-transform duration-200 group-open:rotate-180" />
                </summary>
                <p className="mt-3 text-xs md:text-sm text-[var(--tx-2)] leading-relaxed border-t border-[var(--ui)]/60 pt-3">
                  {answer}
                </p>
              </details>
            ))}
          </div>
          <FaqSchema data={faq.entries} />

          {/* Minimal Footer Action Bar */}
          <div className="pt-6 border-t border-[var(--ui)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--tx-2)]">
            <span>{cta.description}</span>
            <div className="flex items-center gap-3 shrink-0">
              <Link
                href={cta.webAppHref}
                className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--ui)] bg-white/90 px-4 py-2 font-semibold text-[var(--tx)] hover:bg-[var(--ui)]/50 transition"
              >
                <span>{cta.webAppLabel}</span>
              </Link>
              <a
                href={cta.githubHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--ui)] bg-white/90 px-4 py-2 font-semibold text-[var(--tx)] hover:bg-[var(--ui)]/50 transition"
              >
                <span>{cta.githubLabel}</span>
                <ExternalLink className="w-3.5 h-3.5 text-[var(--tx-3)]" />
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
