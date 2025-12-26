
// ======================================================
// FILE: app/components/PurposePathLanding.tsx
// ======================================================

"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";

type ButtonVariant = "primary" | "red" | "lime" | "ghost";

type ButtonProps = {
  children: React.ReactNode;
  variant?: ButtonVariant;
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
};

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/35 px-4 py-1 text-[11px] md:text-xs uppercase tracking-[0.16em] text-white/65">
      {children}
    </span>
  );
}

function Stat({
  value,
  label,
  icon,
}: {
  value?: string;
  label: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-2 px-2 py-1">
      {icon ? (
        <div className="text-3xl md:text-4xl">{icon}</div>
      ) : (
        <div className="text-4xl md:text-5xl font-extrabold tracking-tight">
          {value}
        </div>
      )}
      <div className="text-xs md:text-sm uppercase tracking-[0.18em] text-white/80 text-center">
        {label}
      </div>
    </div>
  );
}

function Button({
  children,
  variant = "primary",
  href,
  onClick,
  disabled,
  className = "",
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-xs md:text-sm font-extrabold uppercase tracking-[0.16em] transition active:scale-[0.99]";

  const styles: Record<ButtonVariant, string> = {
    primary:
      "bg-[#6253c7] text-white shadow-[0_18px_45px_rgba(0,0,0,0.70)] hover:brightness-105",
    red: "bg-[#ff1840] text-white hover:brightness-105",
    lime:
      "bg-[#dafe9b] text-black shadow-[0_18px_45px_rgba(0,0,0,0.65)] hover:brightness-105",
    ghost: "border-2 border-white text-white hover:bg-white hover:text-black",
  };

  const cls = `${base} ${styles[variant]} ${disabled ? "opacity-90 cursor-default" : ""} ${className}`;

  if (href) {
    return (
      <a href={href} className={cls} aria-disabled={disabled ? "true" : "false"}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={cls} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}

function CourseCard({
  image,
  tagline,
  title,
  price,
  badge,
  pro,
}: {
  image: string;
  tagline: string;
  title: string;
  price: string;
  badge?: string;
  pro?: string;
}) {
  return (
    <article className="group">
      <div className="relative aspect-video overflow-hidden rounded-4xl bg-black/30 shadow-[0_18px_45px_rgba(0,0,0,0.35)]">
        {/* background cover */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-[1.03]"
          style={{ backgroundImage: `url(${image})` }}
        />

        {badge ? (
          <div className="absolute right-3 top-3 rounded-full bg-yellow-300 px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.14em] text-black shadow">
            {badge}
          </div>
        ) : null}

        {pro ? (
          <div className="absolute bottom-3 right-3 rounded-lg bg-red-500 px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.14em] text-white shadow">
            {pro}
          </div>
        ) : null}

        <div className="absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-black/55 to-transparent" />
      </div>

      <p className="mt-5 text-sm md:text-[15px] text-white">{tagline}</p>

      <h3 className="mt-2 text-lg font-extrabold">
        <a href="#" className="text-[#dafe9b] hover:underline">
          {title}
        </a>
      </h3>

      <p className="mt-2 text-2xl font-black tracking-tight text-white">
        {price}
      </p>

      <div className="mt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <Button variant="red" href="#">
          Buy Now
        </Button>
        <Button variant="lime" href="#">
          Learn More
        </Button>
      </div>
    </article>
  );
}

function FaqItem({ q, a }: { q: string; a: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-base font-bold text-white">{q}</h3>
      <p className="mt-2 text-sm md:text-[15px] leading-7 text-white/85">{a}</p>
    </div>
  );
}

export default function PurposePathLanding() {
  const youtubeId = "YOUTUBE_VIDEO_ID"; // TODO: replace
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [overlayHidden, setOverlayHidden] = useState(false);

  const videoSrc = useMemo(() => {
    const base = `https://www.youtube.com/embed/${youtubeId}`;
    const params = new URLSearchParams({ enablejsapi: "1", rel: "0" });
    return `${base}?${params.toString()}`;
  }, [youtubeId]);

  const onPlay = () => {
    setOverlayHidden(true);
    const iframe = iframeRef.current;
    if (!iframe) return;

    try {
      const url = new URL(iframe.src);
      url.searchParams.set("autoplay", "1");
      iframe.src = url.toString();
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    if (youtubeId === "YOUTUBE_VIDEO_ID") setOverlayHidden(false);
  }, [youtubeId]);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#171926_0,#291a60_55%)] text-white">
      {/* Header */}
      <header className="fixed inset-x-0 top-0 z-60">
        <div className="px-4 md:px-8 py-4 bg-linear-to-b from-black/70 to-black/0">
          <div className="mx-auto flex w-full max-w-350 items-center justify-between gap-4">
            <Image
              src="/PURPOSE-PATH-Logo-A1-04.jpg"
              alt="purpose path"
              width={220}
              height={60}
              priority
              className="h-10 md:h-12 w-auto object-contain"
            />

            <nav className="flex items-center gap-3 md:gap-6">
              <a
                href="#"
                className="text-sm md:text-base text-white/75 hover:text-white transition"
              >
                Contact
              </a>
              <Button variant="ghost" href="#" className="px-5 py-2.5">
                ↪ Log in
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="mx-auto w-full max-w-275 px-4 md:px-6 pt-24 md:pt-28 pb-16">
        {/* Hero */}
        <section className="text-center">
          <Pill>Purpose playbook</Pill>

          <h1 className="mt-4 text-[clamp(2.1rem,5vw,3.2rem)] font-extrabold uppercase tracking-[0.16em] leading-tight drop-shadow-[0_16px_40px_rgba(0,0,0,0.8)]">
            A Simple
            <span className="block bg-linear-to-r from-[#dafe9b] to-[#dafe9b] bg-clip-text text-transparent">
              God-Centered System to Bring Order and Peace to Your Financial Life
            </span>
          </h1>

          <p className="mx-auto mt-3 max-w-140 text-sm md:text-base text-white/65">
            Most people aren’t “bad with money. They’re just unstructured and overwhelmed.
          </p>

          <div className="mt-6 flex justify-center">
            <div className="h-12 w-12 rounded-full bg-[radial-gradient(circle_at_30%_0,#f9a8d4,#dafe9b)] shadow-[0_12px_30px_rgba(59,130,246,0.45)] grid place-items-center">
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-black" aria-hidden="true">
                <path d="M12 3a1 1 0 0 1 1 1v12.17l4.59-4.58a1 1 0 0 1 1.41 1.42l-6.3 6.29a1.25 1.25 0 0 1-1.76 0l-6.3-6.29A1 1 0 0 1 5.7 11.6L10.3 16.2V4a1 1 0 0 1 1-1Z" />
              </svg>
            </div>
          </div>
        </section>

        {/* Video */}
        <section className="relative mx-auto mt-10 w-full max-w-225">
          <div className="absolute left-1/2 top-5 -translate-x-1/2 z-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/55 px-4 py-1 text-[11px] uppercase tracking-[0.18em] text-white/75">
              <span className="h-2 w-2 rounded-full bg-[#ff1744] shadow-[0_0_10px_rgba(255,23,68,0.9)]" />
              <span>PurposePlanner</span>
            </div>
          </div>

          <div className="overflow-hidden rounded-[26px] border-4 border-[#dafe9b] bg-black shadow-[0_0_12px_rgba(218,254,155,0.45)]">
            <div className="relative aspect-video">
              <iframe
                ref={iframeRef}
                className="absolute inset-0 h-full w-full"
                src={videoSrc}
                title="Intro Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />

              <button
                type="button"
                onClick={onPlay}
                className={`absolute inset-0 flex items-center justify-center bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.2),rgba(0,0,0,0.72))] transition-opacity ${
                  overlayHidden ? "opacity-0 pointer-events-none" : "opacity-100"
                }`}
                aria-label="Play video"
              >
                <div className="relative">
                  <div className="h-16 w-16 rounded-full border-2 border-white/85 bg-black/25 backdrop-blur-md shadow-[0_16px_40px_rgba(0,0,0,0.8)] grid place-items-center">
                    <div className="ml-1 h-0 w-0 border-y-12 border-y-transparent border-l-20 border-l-white" />
                  </div>

                  <div className="absolute left-4 -bottom-12 sm:-bottom-11 rounded-full bg-black/70 px-3 py-1 text-xs tracking-wider">
                    16:04
                  </div>
                </div>
              </button>
            </div>
          </div>

          <div className="mt-7 rounded-3xl bg-[#16151a] px-5 md:px-7 py-7 text-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <Stat value="52" label="IN-DEPTH VIDEO LESSONS" />
              <Stat value="15" label="MODULES" />
              <Stat icon={<span aria-hidden>💎</span>} label="LIFETIME ACCESS" />
              <Stat icon={<span aria-hidden>💬</span>} label="PRIVATE DISCORD COMMUNITY" />
            </div>

            <div className="mt-7 flex justify-center">
              <Button variant="primary" href="#courses" className="px-10">
                Join Now <span aria-hidden>→</span>
              </Button>
            </div>
          </div>
        </section>

        {/* Courses (trimmed for brevity in this fix doc)
            NOTE: keep the rest of your sections as-is below.
        */}

        <section id="courses" className="mt-16 md:mt-20">
          <h2 className="text-center text-[clamp(1.9rem,4vw,3.1rem)] font-extrabold uppercase tracking-[0.12em] text-white drop-shadow">
            Browse{" "}
            <span className="bg-linear-to-r from-[#dafe9b] to-[#dafe9b] bg-clip-text text-transparent">
              Courses
            </span>
          </h2>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-10">
            <CourseCard
              image="/course-1.jpg"
              tagline="Powerful Techniques to learn More, Earn More"
              title="Purpose Path"
              price="USD 189$"
            />
            <CourseCard
              image="/mentoship.png"
              tagline="Scale Up & 10x Your Financial Career"
              title="Mentorship"
              price="USD 99$"
              badge="Vol-3"
            />
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-16 border-t border-white/20 px-1 pt-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="text-2xl font-extrabold uppercase tracking-[0.25em]">
              purpose path<span className="text-white">.</span>
            </div>
          </div>

          <div className="mt-8 h-px w-full bg-white/20" />

          <div className="mt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-sm text-white/60">
            <p>Klowt Ltd © 2025 | All Rights Reserved</p>
          </div>
        </footer>
      </main>
    </div>
  );
}

