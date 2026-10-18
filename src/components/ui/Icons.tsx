import React from "react";
import {
  ArrowUpDown,
  Blocks,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Copy,
  Crop,
  ExternalLink,
  FileCheck2,
  FileCode,
  FileImage,
  FileOutput,
  FileStack,
  FileText,
  FileUp,
  Folder,
  GripHorizontal,
  Heart,
  HelpCircle,
  ImagePlus,
  Images,
  Info,
  Layers,
  Loader2,
  Mail,
  Menu,
  Minimize2,
  Package,
  RotateCw,
  Scissors,
  Search,
  Share2,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Sprout,
  Terminal,
  TerminalSquare,
  ThumbsDown,
  ThumbsUp,
  Wrench,
  X,
  Zap,
  AlertCircle,
  AlertTriangle,
} from "lucide-react";
import type { OperationKey } from "../../types/operations";

export {
  AlertCircle,
  AlertTriangle,
  ArrowUpDown,
  Blocks,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Copy,
  Crop,
  ExternalLink,
  FileCheck2,
  FileCode,
  FileImage,
  FileOutput,
  FileStack,
  FileText,
  FileUp,
  Folder,
  GripHorizontal,
  Heart,
  HelpCircle,
  ImagePlus,
  Images,
  Info,
  Layers,
  Loader2,
  Mail,
  Menu,
  Minimize2,
  Package,
  RotateCw,
  Scissors,
  Search,
  Share2,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Sprout,
  Terminal,
  TerminalSquare,
  ThumbsDown,
  ThumbsUp,
  Wrench,
  X,
  Zap,
};

/**
 * Unified container badge used across PDFLince cards and headers
 * so every feature, reason, and tool icon shares the same visual geometry.
 */
export function IconBadge({
  children,
  size = "md",
  variant = "accent",
  className = "",
}: {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
  variant?: "accent" | "subtle" | "solid";
  className?: string;
}) {
  const sizeClasses = {
    sm: "w-8 h-8 rounded-lg",
    md: "w-10 h-10 rounded-lg",
    lg: "w-12 h-12 rounded-xl",
  }[size];

  const variantClasses = {
    accent: "bg-[var(--ui)] text-[var(--accent)] shadow-2xs",
    subtle: "bg-[var(--ui-2)] text-[var(--tx-2)]",
    solid: "bg-[var(--accent)] text-white shadow-xs",
  }[variant];

  return (
    <div
      className={`${sizeClasses} ${variantClasses} inline-flex items-center justify-center shrink-0 select-none ${className}`}
    >
      {children}
    </div>
  );
}

/**
 * Renders the canonical icon for any PDFLince operation key or MCP tool name.
 */
export function OperationIcon({
  operation,
  className = "w-4 h-4",
}: {
  operation: OperationKey | string;
  className?: string;
}) {
  switch (operation) {
    case "inspect":
    case "pdflince_inspect":
      return <Search className={className} strokeWidth={1.85} />;
    case "merge":
    case "pdflince_merge":
      return <FileStack className={className} strokeWidth={1.85} />;
    case "split":
    case "pdflince_split":
      return <Scissors className={className} strokeWidth={1.85} />;
    case "extract":
    case "pdflince_extract":
      return <FileOutput className={className} strokeWidth={1.85} />;
    case "reorder":
    case "pdflince_reorder":
      return <ArrowUpDown className={className} strokeWidth={1.85} />;
    case "rotate":
    case "pdflince_rotate":
      return <RotateCw className={className} strokeWidth={1.85} />;
    case "crop":
    case "pdflince_crop":
      return <Crop className={className} strokeWidth={1.85} />;
    case "compress":
    case "pdflince_compress":
      return <Minimize2 className={className} strokeWidth={1.85} />;
    case "pdfToImages":
    case "pdflince_pdf_to_images":
      return <FileImage className={className} strokeWidth={1.85} />;
    case "imagesToPdf":
    case "pdflince_images_to_pdf":
      return <Images className={className} strokeWidth={1.85} />;
    default:
      return <Wrench className={className} strokeWidth={1.85} />;
  }
}

/**
 * Maps semantic icon keys (or legacy emoji keys from locale dictionaries)
 * to unified Lucide vector icons.
 */
export function FeatureIcon({
  icon,
  className = "w-5 h-5",
}: {
  icon: string;
  className?: string;
}) {
  const key = icon.trim().toLowerCase();
  if (key === "shield" || key === "lock" || key.includes("🔒")) {
    return <ShieldCheck className={className} strokeWidth={1.85} />;
  }
  if (key === "zap" || key === "bolt" || key.includes("⚡")) {
    return <Zap className={className} strokeWidth={1.85} />;
  }
  if (key === "smartphone" || key === "devices" || key.includes("📱")) {
    return <Smartphone className={className} strokeWidth={1.85} />;
  }
  if (key === "heart" || key.includes("💚") || key.includes("❤️") || key.includes("💙")) {
    return <Heart className={className} strokeWidth={1.85} />;
  }
  if (key === "sparkles" || key.includes("✨")) {
    return <Sparkles className={className} strokeWidth={1.85} />;
  }
  if (key === "sprout" || key.includes("🌱")) {
    return <Sprout className={className} strokeWidth={1.85} />;
  }
  if (key === "blocks") {
    return <Blocks className={className} strokeWidth={1.85} />;
  }
  if (key === "layers") {
    return <Layers className={className} strokeWidth={1.85} />;
  }
  if (key === "file-check") {
    return <FileCheck2 className={className} strokeWidth={1.85} />;
  }
  if (key === "package") {
    return <Package className={className} strokeWidth={1.85} />;
  }
  if (key === "terminal") {
    return <Terminal className={className} strokeWidth={1.85} />;
  }
  return <ShieldCheck className={className} strokeWidth={1.85} />;
}
