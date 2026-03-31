import { useState, useEffect, useRef, FormEvent, useCallback } from "react";
import confetti from "canvas-confetti";

const painPoints = [
  "Apollo scheduling gaps 😮‍💨",
  "Deliverability dropping 📉",
  "DKIM setup nightmares 🤯",
  "Credits wasted on bad data 💸",
  "LinkedIn blocks 🚫",
  "25k records = Airtable crawl 🐢",
  "Warm-up that doesn't work 🔥",
  "Support never replies 👻",
  "Filters on filters on filters 😵",
  "Bounced emails everywhere 📧",
];

const stats = [
  { value: "3+ hrs", label: "lost every week to filter hell" },
  { value: "25%", label: "of emails bounce. Gone. Just like that." },
  { value: "87%", label: "call outreach tools 'too complex'" },
];

const useCountUp = (end: string, duration = 1500) => {
  const [display, setDisplay] = useState(end);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const animate = useCallback(() => {
    if (hasAnimated) return;
    setHasAnimated(true);
    const numMatch = end.match(/[\d.]+/);
    if (!numMatch) { setDisplay(end); return; }
    const target = parseFloat(numMatch[0]);
    const prefix = end.slice(0, end.indexOf(numMatch[0]));
    const suffix = end.slice(end.indexOf(numMatch[0]) + numMatch[0].length);
    const isInt = !numMatch[0].includes('.');
    const start = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = target * eased;
      setDisplay(`${prefix}${isInt ? Math.round(current) : current.toFixed(1)}${suffix}`);
      if (progress < 1) requestAnimationFrame(step);
      else setDisplay(end);
    };
    requestAnimationFrame(step);
  }, [end, duration, hasAnimated]);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) animate(); },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [animate]);
  return { ref, display };
};
const StatItem = ({ stat, index }: { stat: { value: string; label: string }; index: number }) => {
  const counter = useCountUp(stat.value);
  return (
    <div className={`flex flex-col items-center gap-1 ${index > 0 ? "pl-10" : ""}`}>
      <span ref={counter.ref} className="font-display text-xl text-foreground">{counter.display}</span>
      <span className="text-xs text-white/60 uppercase tracking-wider font-body">{stat.label}</span>
    </div>
  );
};

const Index = () => {
  const [name, setName] = useState("");
  const [frustration, setFrustration] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  // Mouse-follow glow
  useEffect(() => {
    const hero = heroRef.current;
    const glow = glowRef.current;
    if (!hero || !glow) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = hero.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      glow.style.transform = `translate(${x - 200}px, ${y - 200}px)`;
      glow.style.opacity = "1";
    };

    const handleMouseLeave = () => {
      glow.style.opacity = "0";
    };

    hero.addEventListener("mousemove", handleMouseMove);
    hero.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      hero.removeEventListener("mousemove", handleMouseMove);
      hero.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    console.log({ name, frustration, email });
    setSubmitted(true);

    // Fire confetti
    const duration = 2000;
    const end = Date.now() + duration;
    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors: ["#ffffff", "#a0a0a0", "#606060"],
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors: ["#ffffff", "#a0a0a0", "#606060"],
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4"
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 z-[1] bg-background/50" />

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-6 max-w-5xl mx-auto">
        <span className="font-display text-2xl tracking-tight text-foreground">Prospera</span>
        <div className="liquid-glass rounded-full px-4 py-1.5 flex items-center gap-2 border border-foreground/10">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse-green" />
          <span className="text-xs text-foreground/60 font-body">Early Access Open</span>
        </div>
      </nav>

      {/* Hero */}
      <section
        ref={heroRef}
        className="relative z-10 flex flex-col items-center justify-center text-center px-6 min-h-[calc(100vh-88px)] max-w-3xl mx-auto pb-24"
      >
        {/* Mouse-follow glow */}
        <div
          ref={glowRef}
          className="pointer-events-none absolute z-0 w-[400px] h-[400px] rounded-full opacity-0 transition-opacity duration-500"
          style={{
            background: "radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)",
          }}
        />

        {/* Pill */}
        <div className="animate-fade-rise liquid-glass rounded-full px-5 py-2 border border-foreground/10 mb-8 relative z-10">
          <span className="uppercase text-xs tracking-widest text-muted-foreground font-body">
            Easy Search. Real Leads. Zero Hassle.
          </span>
        </div>

        {/* H1 */}
        <h1 className="animate-fade-rise font-display text-6xl sm:text-8xl leading-[0.92] tracking-[-2px] font-normal text-foreground relative z-10">
          Find clients.
          <br />
          <em className="text-muted-foreground">Without the chaos.</em>
        </h1>

        {/* Subcopy */}
        <p className="animate-fade-rise-delay font-body font-light text-base max-w-md mx-auto mt-5 leading-relaxed text-muted-foreground relative z-10">
          Every other tool makes you fight through filters, broken warm-ups, and walls of setup. Just tell Blomstre who/what you want. It finds them, verifies them, and writes your outreach. Done.
        </p>

        {/* Waitlist Form / Success State */}
        {submitted ? (
          <div className="animate-fade-rise mt-10 max-w-sm mx-auto flex flex-col items-center gap-4 w-full relative z-10">
            <div className="liquid-glass border border-foreground/10 rounded-2xl px-8 py-8 text-center w-full">
              <div className="text-4xl mb-3">🎉</div>
              <h2 className="font-display text-2xl text-foreground mb-2">You're in, {name}!</h2>
              <p className="text-sm text-muted-foreground font-body leading-relaxed">
                We'll reach out soon with early access. Get ready to ditch the filter chaos forever.
              </p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="animate-fade-rise-delay mt-10 max-w-sm mx-auto flex flex-col gap-3 w-full relative z-10">
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="liquid-glass border border-foreground/10 rounded-2xl px-4 py-3 text-sm text-foreground placeholder:text-foreground/30 bg-transparent outline-none w-full"
            />
            <textarea
              rows={2}
              placeholder="What's your biggest frustration finding leads right now?"
              value={frustration}
              onChange={(e) => setFrustration(e.target.value)}
              className="liquid-glass border border-foreground/10 rounded-2xl px-4 py-3 text-sm text-foreground placeholder:text-foreground/30 bg-transparent outline-none w-full resize-none"
            />
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="liquid-glass border border-foreground/10 rounded-2xl px-4 py-3 text-sm text-foreground placeholder:text-foreground/30 bg-transparent outline-none w-full"
            />
            <button
              type="submit"
              className="w-full rounded-2xl py-3.5 bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-all"
            >
              Join the Waitlist →
            </button>
            <p className="text-xs text-foreground/25 text-center mt-2">No spam. Early access only.</p>
          </form>
        )}

        {/* Pain points marquee */}
        <div className="animate-fade-rise-delay-2 mt-14 w-full max-w-3xl overflow-hidden relative">
          <div className="absolute left-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-r from-background/80 to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-l from-background/80 to-transparent pointer-events-none" />
          <div className="animate-marquee gap-3">
            {[...painPoints, ...painPoints].map((point, i) => (
              <span
                key={i}
               className="pill shrink-0 rounded-full px-4 py-1.5 text-xs text-white/70 border border-white/20 whitespace-nowrap mx-1.5 cursor-default transition-all duration-200 hover:scale-105 hover:text-white hover:shadow-[0_0_12px_rgba(255,255,255,0.08)]"
                style={{ background: 'rgba(255,255,255,0.10)' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.16)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.10)'; }}
              >
                {point}
              </span>
            ))}
          </div>
        </div>

        {/* Stats strip */}
        <div className="animate-fade-rise-delay-2 mt-10 liquid-glass rounded-2xl px-8 py-4 inline-flex gap-10 items-center divide-x divide-white/20 border border-foreground/10">
          {stats.map((stat, i) => (
              <StatItem key={i} stat={stat} index={i} />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="absolute bottom-0 w-full text-center text-xs text-foreground/20 py-5 z-10">
        © 2026 Blomstre. All rights reserved.
      </footer>
    </div>
  );
};

export default Index;
