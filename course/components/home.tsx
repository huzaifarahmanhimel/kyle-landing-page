
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

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/35 px-4 py-1 text-[11px] md:text-xs uppercase tracking-[0.16em] text-white/65">
      {children}
    </span>
  );
}

function Button({
  children,
  variant = "primary",
  href,
  onClick,
  disabled = false,
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

  const cls =
    `${base} ${styles[variant]} ` +
    `${disabled ? "opacity-90 cursor-default pointer-events-none" : ""} ` +
    className;

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

        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/55 to-transparent" />
      </div>

      <p className="mt-5 text-sm md:text-[15px] text-white">{tagline}</p>

      <h3 className="mt-2 text-lg font-extrabold">
        <a href="#" className="text-[#dafe9b] hover:underline">
          {title}
        </a>
      </h3>

      <p className="mt-2 text-2xl font-black tracking-tight text-white">{price}</p>

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

function FaqCard({ q, a }: { q: string; a: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5 md:p-6">
      <h3 className="text-[15px] sm:text-base md:text-lg font-bold text-white leading-snug">
        {q}
      </h3>
      <div className="mt-2 text-sm sm:text-[15px] leading-7 text-white/80">{a}</div>
    </div>
  );
}

function FaqSection() {
  return (
    <section id="faq" className="mt-16 sm:mt-18 md:mt-20 pb-8" aria-labelledby="faq-heading">
    <div className="mx-auto w-full max-w-275 rounded-3xl sm:rounded-[28px] md:rounded-4xl bg-[#062638] px-4 sm:px-6 md:px-10 py-10 sm:py-12">
      <p className="text-center text-sm sm:text-base italic text-white/85">
        Frequently asked
      </p>
        <h2
          id="faq-heading"
          className="mt-2 text-center text-2xl sm:text-3xl md:text-4xl font-extrabold"
        >
          Questions
        </h2>
        <p className="mt-2 text-center text-sm sm:text-base text-white/75">
          Anything unclear?{" "}
          <a
            href="mailto:support@kyleblackwell.com"
            className="text-yellow-300 font-semibold hover:underline break-all sm:break-normal"
          >
            support@kyleblackwell.com
          </a>
        </p>

        <div className="mt-8 sm:mt-10 grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 md:gap-10">
          <div className="space-y-5 sm:space-y-6 md:space-y-7">
            <FaqCard
              q="What type of setup do I need?"
              a={
                <>No special setup. You can access the platform on any phone, tablet, or computer.</>
              }
            />
            <FaqCard
              q="How does the Purpose Playbook Platform work?"
              a={
                <>It guides you step-by-step through the course, workbook, and app so you always know what to do next without feeling overwhelmed.</>
              }
            />
            <FaqCard
              q="Can beginners use this system?"
              a={<>Yes. The rhythm is simple and works at any income level and any starting point.</>}
            />
            <FaqCard
              q="Is this a “get rich” course?"
              a={<>No. This is a biblical stewardship system focused on clarity, peace, and wise decisions not quick wealth.</>}
            />
            <FaqCard
              q="What if I’ve made financial mistakes?"
              a={<>You’re not behind. The system is designed to give you a clear reset and help you rebuild confidence.</>}
            />
          </div>

          <div className="space-y-5 sm:space-y-6 md:space-y-7">
            <FaqCard
              q="Do I get the workbook?"
              a={<>Yes. The full workbook is built directly into the platform, with prompts beside every lesson.</>}
            />
            <FaqCard
              q="Are there live classes?"
              a={<>No live classes needed. Everything is recorded, guided, and available anytime.</>}
            />
            <FaqCard
              q="How is this different from other money courses?"
              a={<>It isn’t just videos. It’s a complete ecosystem — Course, Workbook, App, and Book all connected to create real-life change.</>}
            />
            <FaqCard
              q="Do I need a high income for this to work?"
              a={<>Not at all. The rhythm works whether you’re just starting out or managing a family budget.</>}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default function PurposePathLanding() {
  // TODO: replace with your real YouTube ID
  const youtubeId = "YOUTUBE_VIDEO_ID";

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
              <a href="#" className="text-sm md:text-base text-white/75 hover:text-white transition">
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
      <main className="mx-auto w-full max-w-[1100px] px-4 md:px-6 pt-24 md:pt-28 pb-16">
        {/* Hero */}
        <section className="text-center">
          <Pill>Purpose playbook</Pill>

          <h1 className="mt-4 text-[clamp(2.1rem,5vw,3.2rem)] font-extrabold uppercase tracking-[0.16em] leading-tight drop-shadow-[0_16px_40px_rgba(0,0,0,0.8)]">
            A Simple
            <span className="block bg-gradient-to-r from-[#dafe9b] to-[#dafe9b] bg-clip-text text-transparent">
              God-Centered System to Bring Order and Peace to Your Financial Life
            </span>
          </h1>

          <p className="mx-auto mt-3 max-w-[560px] text-sm md:text-base text-white/65">
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
        <section className="relative mx-auto mt-10 w-full max-w-[900px]">
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
                    <div className="ml-1 h-0 w-0 border-y-[12px] border-y-transparent border-l-[20px] border-l-white" />
                  </div>

                  <div className="absolute left-4 bottom-[-48px] sm:bottom-[-44px] rounded-full bg-black/70 px-3 py-1 text-xs tracking-wider">
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

        {/* Timeline */}
        <section id="career" className="mt-16 md:mt-20">
          <div className="text-center mx-auto max-w-[780px]">
            <h2 className="text-[clamp(2.0rem,4vw,3.2rem)] font-extrabold uppercase tracking-wide leading-tight">
              Design your purpose blueprint
            </h2>
            <p className="mt-4 text-sm md:text-base leading-7 text-white/85">
              The system that gives you clarity and direction.
            </p>
          </div>

          <div className="mt-10 flex justify-center">
            <div className="relative w-full max-w-[420px]">
              <div className="rounded-t-[28px] bg-[#dafe9b] p-4">
                {/* Put podcast.png in /public */}
                <Image
                  src="/podcast.png"
                  alt="Course creator"
                  width={840}
                  height={840}
                  className="w-full rounded-t-[24px] object-cover"
                />
              </div>
              <div className="absolute left-1/2 -translate-x-1/2 -bottom-10 h-10 w-[2px] bg-[#6253c7]" />
            </div>
          </div>

          <div className="relative mt-10 md:mt-14">
            <div className="pointer-events-none absolute top-[-40px] bottom-0 left-5 md:left-1/2 md:-translate-x-1/2 w-[2px] bg-[#6253c7]" />

            <div className="flex flex-col gap-10 md:gap-14">
              {[
                {
                  title: "BUILD A GOD-CENTERED FOUNDATION",
                  body: "Gain a clear, biblical view of money so you can make wise decisions with peace instead of pressure.",
                },
                {
                  title: "BUILD THE SYSTEM THAT KEEPS YOU GROUNDED",
                  body: "Create a simple rhythm using the Workbook and App that brings order, stability, and consistency to your financial life.",
                },
                {
                  title: "MAKE CONFIDENT DECISIONS IN REAL LIFE",
                  body: "Learn practical steps to handle real expenses and choices with confidence and clarity every month.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="relative grid grid-cols-[auto_1fr] md:grid-cols-[minmax(0,1.1fr)_auto_minmax(0,1.1fr)] gap-5 md:gap-10 items-start"
                >
                  <div className="hidden md:block">
                    <h3 className="text-2xl lg:text-3xl font-black uppercase">
                      {item.title}
                    </h3>
                  </div>

                  <div className="mt-1 flex items-start justify-center">
                    <div className="h-8 w-8 rounded-full border-[3px] border-[#6253c7] bg-[#111] grid place-items-center">
                      <div className="h-3 w-3 rounded-full bg-[#6253c7]" />
                    </div>
                  </div>

                  <div>
                    <h3 className="md:hidden text-xl font-black uppercase">{item.title}</h3>
                    <p className="mt-2 text-sm md:text-base leading-7 text-white/90">{item.body}</p>
                    <div className="mt-5">
                      <Button variant="primary" href="#courses" className="px-8">
                        Get Access
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Courses */}
        <section id="courses" className="mt-16 md:mt-20">
          <h2 className="text-center text-[clamp(1.9rem,4vw,3.1rem)] font-extrabold uppercase tracking-[0.12em] text-white drop-shadow">
            Browse{" "}
            <span className="bg-gradient-to-r from-[#dafe9b] to-[#dafe9b] bg-clip-text text-transparent">
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

        {/* Support */}
        <section className="mt-16 text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white">Confused or need a Hand?</h2>

          <div className="mt-6 flex flex-col sm:flex-row items-stretch justify-center gap-3">
            <a
              href="#"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#dafe9b] px-7 py-4 font-bold text-black"
            >
              <span aria-hidden>💬</span> MESSAGE US
            </a>
            <a
              href="#"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#dafe9b] px-7 py-4 font-bold text-black"
            >
              <span aria-hidden>🟢</span> WHATSAPP NOW
            </a>
            <a
              href="mailto:support@example.com"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#dafe9b] px-7 py-4 font-bold text-black"
            >
              <span aria-hidden>✉️</span> MAIL US
            </a>
          </div>
        </section>

        {/* Workbook */}
        <section
          id="workbook"
          className="mt-16 rounded-[32px] border border-white/20 bg-[#020617] px-6 md:px-10 py-10 shadow-[0_24px_80px_rgba(0,0,0,0.85)]"
          style={{
            backgroundImage:
              "radial-gradient(circle at top left, rgba(218, 254, 155, 0.2), transparent 60%), radial-gradient(circle at bottom right, rgba(98, 83, 199, 0.25), transparent 65%)",
          }}
        >
          <p className="text-xs uppercase tracking-[0.18em] text-white/70">Full workbook integration</p>
          <h2 className="mt-3 text-3xl md:text-4xl font-extrabold text-[#dafe9b]">
            Your Purpose Journey,<br className="hidden sm:block" /> Organized.
          </h2>
          <p className="mt-4 max-w-[560px] text-sm md:text-base leading-8 text-white/80">
            The workbook is not a PDF you forget about — it’s fully embedded into your learning flow. Every reflection,
            prompt, and habit integrates directly with the lessons.
          </p>

          <ul className="mt-6 grid gap-3">
            {[
              "Write prompts beside each lesson",
              "Track clarity, habits, gratitude & decisions",
              "Download your full progress anytime",
              "Build a powerful documented transformation",
            ].map((t) => (
              <li key={t} className="relative pl-8 text-white/90">
                <span className="absolute left-0 top-[2px] text-[#dafe9b]">✔</span>
                {t}
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <Button variant="primary" href="#courses" className="px-10">
              Explore the Workbook
            </Button>
          </div>
        </section>

        {/* Mentor */}
        <section
          id="mentor"
          className="mt-16 rounded-[32px] border border-white/20 bg-[#020617] shadow-[0_22px_60px_rgba(0,0,0,0.7)]"
          style={{
            backgroundImage:
              "radial-gradient(circle at top left, rgba(148, 163, 184, 0.15), transparent 60%)",
          }}
        >
          <div className="px-4 sm:px-6 md:px-10 py-10 md:py-12">
            <div className="flex flex-col lg:flex-row gap-10 lg:gap-14 items-start">
              <div className="w-full lg:w-[340px] flex flex-col items-center text-center">
                <div className="relative h-44 w-44 sm:h-52 sm:w-52">
                  <div className="absolute inset-0 rounded-full border border-white/25" />
                  <div className="absolute inset-[10px] rounded-full overflow-hidden">
                    <Image
                      src="/podcast.png"
                      alt="Kyle Blackwell"
                      fill
                      sizes="(max-width: 640px) 176px, 208px"
                      className="object-cover"
                      priority={false}
                    />
                  </div>
                </div>

                <p className="mt-6 text-[11px] sm:text-xs uppercase tracking-[0.22em] text-white/65 leading-relaxed">
                  CFP® · Financial advisor · Husband · Dad · Purpose teacher
                </p>
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-[11px] sm:text-xs uppercase tracking-[0.28em] text-white/60">
                  Meet your mentor
                </p>
                <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
                  Kyle Blackwell, <span className="text-[#dafe9b]">CFP®</span>
                </h2>
                <p className="mt-6 text-sm sm:text-base lg:text-lg leading-8 text-white/85">
                  Kyle’s taught stewardship to young adults, families, and retirees for almost two decades. He speaks
                  calmly, clearly, and practically — like a trusted older brother who’s seen what works and what doesn’t.
                </p>
                <p className="mt-6 text-sm sm:text-base lg:text-lg leading-8 text-white/85">
                  His goal is simple: help you build a financial life that aligns with God’s purpose for you.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Invitation */}
        <section
          id="invitation"
          className="mt-16 rounded-[32px] border border-white/20 bg-[#020617] px-6 md:px-10 py-10 shadow-[0_24px_70px_rgba(0,0,0,0.85)]"
          style={{
            backgroundImage:
              "radial-gradient(circle at top left, rgba(122, 85, 254, 0.45), transparent 55%), radial-gradient(circle at bottom right, rgba(218, 254, 155, 0.2), transparent 60%)",
          }}
        >
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-[1.4] min-w-0">
              <p className="text-xs uppercase tracking-[0.2em] text-white/65">The invitation</p>
              <h2 className="mt-2 text-3xl md:text-4xl font-extrabold">You don’t need more motivation.</h2>

              <ul className="mt-5 space-y-2">
                {[
                  "You don’t need a more complicated budget.",
                  "You don’t need to earn more before you get clarity.",
                ].map((t) => (
                  <li key={t} className="relative pl-6 text-white/85">
                    <span className="absolute left-0 top-[7px] h-2 w-2 rounded-full bg-[#dafe9b] shadow-[0_0_12px_rgba(218,254,155,0.8)]" />
                    {t}
                  </li>
                ))}
              </ul>

              <p className="mt-5 text-sm md:text-base leading-8 text-white/85">
                You need a simple system you can follow — one that honors God, reduces stress, and builds peace.
              </p>
              <p className="mt-3 text-sm md:text-base leading-8 font-semibold text-white">
                That’s what this platform gives you.
              </p>
            </div>

            <div className="flex-1 min-w-[240px] rounded-3xl border border-white/20 bg-white/5 px-6 py-7 flex flex-col justify-center gap-4">
              <p className="text-sm text-white/85">
                When you’re ready to stop guessing and start walking a clear financial path...
              </p>
              <a
                href="#courses"
                className="inline-flex items-center justify-center rounded-full bg-[#9e0101] px-6 py-3 font-extrabold uppercase tracking-[0.16em] text-white shadow-[0_18px_45px_rgba(0,0,0,0.8)] hover:brightness-105 transition"
              >
                Secure your spot now
              </a>
              <p className="text-xs text-white/70">
                Guided lessons, integrated workbook, and a simple rhythm you can actually stick with.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <FaqSection />

        {/* Footer (responsive, full-width dividers like your screenshot) */}
        <footer className="mt-16 text-white">
          <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-10 py-10 sm:py-14">
            <div className="h-px w-full bg-white/20" />

            <div className="py-8 sm:py-10">
              <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div className="max-w-full">
                  <div className="text-[clamp(1.8rem,6vw,3.2rem)] font-extrabold uppercase tracking-[0.22em] break-words">
                    PURPOSE PATH.
                  </div>
                </div>

                <div className="grid grid-cols-5 gap-3 sm:gap-4 w-fit md:flex md:flex-wrap md:justify-end md:gap-4">
                  {[
                    { label: "LinkedIn", href: "#", text: "in" },
                    { label: "Instagram", href: "#", text: "ig" },
                    { label: "TikTok", href: "#", text: "tt" },
                    { label: "YouTube", href: "#", text: "yt" },
                    { label: "Pinterest", href: "#", text: "pt" },
                  ].map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      aria-label={s.label}
                      className="h-11 w-11 sm:h-12 sm:w-12 rounded-full border border-white/30 text-white/80 grid place-items-center transition hover:border-white/60 hover:text-white"
                    >
                      <span className="text-base sm:text-lg font-semibold lowercase">
                        {s.text}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="h-px w-full bg-white/20" />

            <div className="py-8 sm:py-10">
              <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                <p className="text-white/55 text-sm sm:text-base md:text-lg leading-relaxed">
                  Klowt Ltd © 2025 | All Rights Reserved
                </p>

                <nav className="flex flex-col sm:flex-row gap-3 sm:gap-8 md:gap-10">
                  {[
                    { label: "Privacy Policy", href: "#" },
                    { label: "Cookie Policy", href: "#" },
                    { label: "Terms and Conditions", href: "#" },
                  ].map((l) => (
                    <a
                      key={l.label}
                      href={l.href}
                      className="text-white/80 text-sm sm:text-base md:text-lg hover:text-white transition"
                    >
                      {l.label}
                    </a>
                  ))}
                </nav>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

// ======================================================
// FILE: app/globals.css  (add these lines to prevent white gaps)
// ======================================================
// html,
// body {
//   background-color: #171926;
// }

// ======================================================
// NOTES
// 1) Put your images in /public:
//    - /PURPOSE-PATH-Logo-A1-04.jpg
//    - /podcast.png
//    - /mentoship.png
//    - /course-1.jpg
// 2) Replace youtubeId with your actual YouTube video id.
// ======================================================
