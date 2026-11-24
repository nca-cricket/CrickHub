import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const iconPaths = {
  arrow: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
  arrowUp: <><path d="M7 17 17 7" /><path d="M7 7h10v10" /></>,
  home: <><path d="m3 11 9-8 9 8" /><path d="M5 10v10h5v-6h4v6h5V10" /></>,
  info: <><circle cx="12" cy="12" r="9" /><path d="M12 11v5m0-8h.01" /></>,
  calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 10h18" /></>,
  check: <path d="m5 12 4 4L19 6" />,
  copy: <><rect x="8" y="8" width="12" height="12" rx="2" /><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3" /></>,
  fields: <><path d="m9 6 2 2 4-4M9 12l2 2 4-4M9 18l2 2 4-4" /><path d="M4 6h.01M4 12h.01M4 18h.01" /></>,
  folder: <path d="M3 6a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" />,
  chevronDown: <path d="m6 9 6 6 6-6" />,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  court: <><path d="M4 3h16v18H4zM9 3v18m6-18v18M4 8h5m6 0h5M4 16h5m6 0h5" /></>,
  device: <><rect x="3" y="5" width="13" height="11" rx="2" /><path d="M7 20h5m-2-4v4m5-11h6v11h-6z" /></>,
  edit: <><path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z" /></>,
  eye: <><path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6Z" /><circle cx="12" cy="12" r="2.5" /></>,
  eyeOff: <><path d="m3 3 18 18M10.6 6.2A11.8 11.8 0 0 1 12 6c6.5 0 10 6 10 6a15 15 0 0 1-3.1 3.7M6.2 6.3C3.5 8.1 2 12 2 12s3.5 6 10 6c1.2 0 2.3-.2 3.3-.6" /><path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" /></>,
  file: <><path d="M6 3h8l5 5v13H6zM14 3v5h5M9 13h6m-6 4h6" /></>,
  link: <><path d="M10 13a5 5 0 0 0 7.1 0l3-3A5 5 0 0 0 13 2.9l-1.7 1.7" /><path d="M14 11a5 5 0 0 0-7.1 0l-3 3A5 5 0 0 0 11 21.1l1.7-1.7" /></>,
  location: <><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
  menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
  plug: <><path d="M8 7V3m8 4V3M6 7h12v4a6 6 0 0 1-12 0V7Zm6 10v4" /></>,
  people: <><circle cx="9" cy="8" r="4" /><path d="M2 21a7 7 0 0 1 14 0m2-17a4 4 0 0 1 0 8m1 3a6 6 0 0 1 3 6" /></>,
  plus: <><path d="M12 5v14M5 12h14" /></>,
  send: <><path d="m21 3-9.5 18-2.5-7.5L1.5 11 21 3Z" /><path d="m21 3-12 11" /></>,
  chart: <><path d="M6 20v-6m6 6V6m6 14v-9" /></>,
  chat: <><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12Z" /></>,
  help: <><circle cx="12" cy="12" r="9" /><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.7.4-1 .9-1 1.7m0 3h.01" /></>,
  trash: <><path d="M4 7h16M10 11v6m4-6v6M6 7l1 13h10l1-13M9 7V4h6v3" /></>,
  close: <><path d="M6 6l12 12M18 6 6 18" /></>,
  refresh: <><path d="M20 11a8 8 0 0 0-14-4L4 9m0-5v5h5M4 13a8 8 0 0 0 14 4l2-2m0 5v-5h-5" /></>,
  percent: <><path d="m19 5-14 14" /><circle cx="6.5" cy="6.5" r="2.5" /><circle cx="17.5" cy="17.5" r="2.5" /></>,
  search: <><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 4 4" /></>,
  settings: <><circle cx="12" cy="12" r="3" /><path d="m19 13.5 1.2.9-1.2 2.1-1.5-.5a7 7 0 0 1-1.6.9l-.3 1.6h-2.4l-.3-1.6a7 7 0 0 1-1.7-.9l-1.4.5-1.2-2.1 1.2-.9a7 7 0 0 1 0-1.9l-1.2-.9 1.2-2.1 1.4.5a7 7 0 0 1 1.7-.9l.3-1.6h2.4l.3 1.6a7 7 0 0 1 1.6.9l1.5-.5 1.2 2.1-1.2.9a7 7 0 0 1 0 1.9Z" transform="translate(-2 -2)" /></>,
  shield: <><path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" /><path d="m9 12 2 2 4-4" /></>,
  spark: <><path d="m12 2 2.1 6.2L20 11l-5.9 2.8L12 20l-2.1-6.2L4 11l5.9-2.8L12 2Z" /><path d="m19 15 1 3 3 1-3 1-1 3-1-3-3-1 3-1 1-3Z" /></>,
  trophy: <><path d="M8 21h8m-4-4v4M7 4h10v5a5 5 0 0 1-10 0V4ZM7 6H4v2a4 4 0 0 0 4 4m9-6h3v2a4 4 0 0 1-4 4" /></>,
  wallet: <><rect x="3" y="5" width="18" height="15" rx="2" /><path d="M3 9h18m-5 5h.01M7 5V3h11" /></>,
  wrench: <><path d="M14.7 6.3a5 5 0 0 0-6.4 6.4L3 18l3 3 5.3-5.3a5 5 0 0 0 6.4-6.4l-3 3-3-3 3-3Z" /></>
};
const todayISO = () => {
  const date = new Date();
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
};

function Icon({ name, size = 20 }) {
  return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{iconPaths[name] || iconPaths.spark}</svg>;
}

function RegistrationFieldRow({ field, label, onRequiredChange, onVisibilityChange }) {
  return <div className={`registration-field-row ${field.visible ? "" : "field-hidden"}`}>
    <span className="registration-field-name">{label}</span>
    <div className="registration-field-controls">
      {field.visible ? <>
        <span className="registration-field-status">{field.required ? "Required" : "Optional"}</span>
        <label className="registration-required-switch"><input type="checkbox" role="switch" aria-label={`Make ${label} ${field.required ? "optional" : "required"}`} checked={field.required} onChange={(event) => onRequiredChange(event.target.checked)}/><i/></label>
      </> : <span className="registration-field-status">Hidden</span>}
      <button className="registration-visibility-button" type="button" aria-label={`${field.visible ? "Hide" : "Show"} ${label}`} onClick={() => onVisibilityChange(!field.visible)}><Icon name={field.visible ? "eye" : "eyeOff"} size={17}/></button>
    </div>
  </div>;
}

const seedServices = [
  { id: "lane", name: "Indoor lane rental", category: "Lane rental", description: "Private indoor net with professional turf and bowling machine access.", duration: 60, price: 45, active: true },
  { id: "coaching", name: "1-on-1 batting coaching", category: "Coaching", description: "Personal batting coaching for technique, footwork and match confidence.", duration: 60, price: 75, active: true },
  { id: "group", name: "Small group net session", category: "Training", description: "A coached group session designed to sharpen skills and match readiness.", duration: 90, price: 35, active: true },
  { id: "equipment", name: "Equipment hire", category: "Equipment", description: "Hire bats, pads, gloves and a helmet at the front desk.", duration: 0, price: 12, active: true }
];
const seedMemberships = [
  { id: "member-monthly", name: "CrickHub Club", description: "For players who want regular access to the nets and a place in the community.", price: 49, billing: "Monthly", benefits: ["10% off lane bookings", "Priority peak-time slots", "Member match nights"], active: true, featured: true },
  { id: "member-junior", name: "Junior Player", description: "A flexible membership to help young players build their game all year.", price: 35, billing: "Monthly", benefits: ["15% off coaching", "Junior training sessions", "Progress check-ins"], active: true },
  { id: "member-annual", name: "Season Pass", description: "One membership for the full season, with the best value for committed players.", price: 499, billing: "Annually", benefits: ["All Club benefits", "One month free", "Guest pass each month"], active: true }
];
const seedPackages = [
  { id: "pack-starter", name: "Net Starter", description: "Get more time in the nets with a flexible block of lane sessions.", price: 120, sessions: 5, validity: 90, benefits: ["5 lane sessions", "Shareable with one player"], active: true },
  { id: "pack-player", name: "Player Pack", description: "A training bundle for players who are ready to step up their practice.", price: 220, sessions: 10, validity: 180, benefits: ["10 lane sessions", "Save $50 vs. single bookings"], active: true, featured: true },
  { id: "pack-team", name: "Team Training", description: "Bring the squad together for a dedicated block of team net practice.", price: 400, sessions: 20, validity: 180, benefits: ["20 lane sessions", "Team-shareable credits"], active: true }
];
const seedRentals = [
  { id: "rental-machine", name: "Bowling machine", description: "Practice against consistent pace and swing settings. Staff setup is included.", category: "Training equipment", price: 25, rateUnit: "hour", deposit: 50, quantity: 2, active: true },
  { id: "rental-camera", name: "Video analysis kit", description: "Capture your session and review batting or bowling technique in slow motion.", category: "Performance tech", price: 35, rateUnit: "day", deposit: 100, quantity: 1, active: true, featured: true },
  { id: "rental-kit", name: "Cricket gear set", description: "A ready-to-play set with bat, pads, gloves and helmet for visiting players.", category: "Player equipment", price: 15, rateUnit: "day", deposit: 25, quantity: 6, active: true }
];
const seedCollections = [
  { id: "collection-training", name: "Training Equipment", category: "Rentals", rentalIds: ["rental-machine", "rental-camera"] },
  { id: "collection-player-gear", name: "Player Gear", category: "Rentals", rentalIds: ["rental-kit"] }
];
const seedBookings = [
  { name: "Jordan Lee", initials: "JL", lane: "Lane 01", session: "Net practice", time: "9:00 AM", end: "10:00 AM", date: todayISO(), coach: "Marcus Johnson", status: "Confirmed", color: "green" },
  { name: "Sofia Martinez", initials: "SM", lane: "Lane 02", session: "Batting practice", time: "9:30 AM", end: "10:30 AM", date: todayISO(), coach: "Priya Sharma", status: "Checked in", color: "peach" },
  { name: "Ethan Williams", initials: "EW", lane: "Lane 01", session: "Bowling practice", time: "10:30 AM", end: "11:30 AM", date: todayISO(), coach: "Marcus Johnson", status: "Confirmed", color: "blue" },
  { name: "Ava Patel", initials: "AP", lane: "Lane 03", session: "Net practice", time: "11:00 AM", end: "12:00 PM", date: todayISO(), coach: "Sam Williams", status: "Pending", color: "purple" },
  { name: "Noah Thompson", initials: "NT", lane: "Lane 02", session: "Coaching session", time: "12:00 PM", end: "1:00 PM", date: todayISO(), coach: "Priya Sharma", status: "Confirmed", color: "yellow" }
];
const seedCustomers = [
  { id: "customer-jordan", name: "Jordan Lee", email: "jordan.lee@example.com", phone: "(469) 555-0142", notes: "Adult member" },
  { id: "customer-sofia", name: "Sofia Martinez", email: "sofia.martinez@example.com", phone: "(469) 555-0186", notes: "Batting coaching" },
  { id: "customer-ethan", name: "Ethan Williams", email: "ethan.williams@example.com", phone: "(214) 555-0127", notes: "Regular lane booking" },
  { id: "customer-ava", name: "Ava Patel", email: "ava.patel@example.com", phone: "(972) 555-0163", notes: "Junior player" },
  { id: "customer-noah", name: "Noah Thompson", email: "noah.thompson@example.com", phone: "(469) 555-0194", notes: "Coaching sessions" }
];
const seedAvailability = [
  { day: "Monday", open: true, start: "08:00", end: "22:00" },
  { day: "Tuesday", open: true, start: "08:00", end: "22:00" },
  { day: "Wednesday", open: true, start: "08:00", end: "22:00" },
  { day: "Thursday", open: true, start: "08:00", end: "22:00" },
  { day: "Friday", open: true, start: "08:00", end: "23:00" },
  { day: "Saturday", open: true, start: "07:00", end: "23:00" },
  { day: "Sunday", open: true, start: "08:00", end: "20:00" }
];
const seedCampaigns = [
  { id: "campaign-offpeak", name: "Off-peak lane discount", audience: "All customers", discountType: "Percentage", amount: 15, code: "NETS15", appliesTo: "types", serviceTypes: ["Services"], duration: "Once", eligibility: "all", status: "Draft", updated: "Ready to launch" },
  { id: "campaign-player-gear", name: "Player gear offer", audience: "Returning players", discountType: "Fixed amount", amount: 10, code: "GEAR10", appliesTo: "individual", serviceIds: ["rental-kit"], duration: "Once", eligibility: "groups", customerGroups: ["Returning players"], status: "Draft", updated: "Ready to launch" }
];

function safeRead(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch (error) {
    console.error(`Could not load ${key}`, error);
    return fallback;
  }
}
function sanitizeBookingDescription(html) {
  const parsed = new DOMParser().parseFromString(html, "text/html");
  const allowedTags = new Set(["P", "BR", "STRONG", "B", "EM", "I", "U", "S", "DEL", "H2", "H3", "UL", "OL", "LI", "A"]);
  const cleanNode = (node) => {
    if (node.nodeType === Node.TEXT_NODE) return document.createTextNode(node.textContent || "");
    if (node.nodeType !== Node.ELEMENT_NODE) return document.createDocumentFragment();
    if (!allowedTags.has(node.tagName)) {
      const fragment = document.createDocumentFragment();
      Array.from(node.childNodes).forEach((child) => fragment.append(cleanNode(child)));
      return fragment;
    }
    const element = document.createElement(node.tagName.toLowerCase());
    if (node.tagName === "A") {
      const href = node.getAttribute("href");
      try {
        const url = new URL(href, window.location.origin);
        if (["http:", "https:"].includes(url.protocol)) {
          element.setAttribute("href", url.href);
          element.setAttribute("rel", "noopener noreferrer");
          element.setAttribute("target", "_blank");
        }
      } catch (error) {
        console.error("Invalid link removed from booking page description", error);
      }
    }
    if (["P", "H2", "H3", "LI"].includes(node.tagName)) {
      const textAlign = node.style.textAlign;
      if (["left", "center", "right", "justify"].includes(textAlign)) element.style.textAlign = textAlign;
    }
    Array.from(node.childNodes).forEach((child) => element.append(cleanNode(child)));
    return element;
  };
  const fragment = document.createDocumentFragment();
  Array.from(parsed.body.childNodes).forEach((node) => fragment.append(cleanNode(node)));
  const container = document.createElement("div");
  container.append(fragment);
  return container.innerHTML;
}
function clockMinutes(value) {
  const twelveHour = /^(\d{1,2}):(\d{2})\s(AM|PM)$/i.exec(value);
  if (twelveHour) return (Number(twelveHour[1]) % 12 + (twelveHour[3].toUpperCase() === "PM" ? 12 : 0)) * 60 + Number(twelveHour[2]);
  const twentyFourHour = /^(\d{2}):(\d{2})$/.exec(value);
  return twentyFourHour ? Number(twentyFourHour[1]) * 60 + Number(twentyFourHour[2]) : null;
}
function displayTime(value) {
  const [hour, minute] = value.split(":").map(Number);
  return `${hour % 12 || 12}:${String(minute).padStart(2, "0")} ${hour >= 12 ? "PM" : "AM"}`;
}

function Brand({ onClick }) {
  return <button className="brand" onClick={onClick} aria-label="CrickHub home"><span className="brand-mark">C</span><span className="brand-word">crick<span>hub</span><small>BUILT FOR YOUR GAME</small></span></button>;
}

function Landing({ onAdmin, onLogin, onSignup, onFacilities }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const jumpTo = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };
  return <div className="marketing">
    <header className="marketing-header">
      <div className="marketing-nav wrap">
        <Brand onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} />
        <button className="mobile-nav-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation"><Icon name={menuOpen ? "check" : "menu"} /></button>
        <nav className={menuOpen ? "marketing-links is-open" : "marketing-links"}>
          <button onClick={onFacilities}>Find a facility</button><button onClick={() => jumpTo("platform")}>Platform</button><button onClick={() => jumpTo("features")}>Features</button><button onClick={() => jumpTo("how-it-works")}>How it works</button>
          <button className="nav-login" onClick={onLogin}>Facility login</button><button className="nav-login" onClick={onSignup}>Create account</button><button className="button button-dark nav-cta" onClick={onAdmin}>Explore dashboard <Icon name="arrow" size={16} /></button>
        </nav>
      </div>
    </header>
    <main>
      <section className="hero wrap" id="platform">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-dot" /> THE HOME OF CRICKET OPERATIONS</div>
          <h1>Your cricket facility.<br />One <span className="headline-accent">winning</span> platform.</h1>
          <p className="hero-lead">Bookings. Coaching. Lane rentals. Members. Bring your whole cricket center together and make every day run smoother.</p>
          <div className="hero-actions"><button className="button button-dark button-large" onClick={onAdmin}>Explore the dashboard <Icon name="arrow" size={17} /></button><button className="button button-light button-large" onClick={() => jumpTo("features")}>See what’s inside</button></div>
          <div className="hero-proof"><div className="proof-avatars"><span>JM</span><span>PS</span><span>AK</span><span>+</span></div><p><strong>Made for the people behind the game</strong><br />From first booking to last ball of the day.</p></div>
        </div>
        <div className="hero-art" aria-label="CrickHub bookings dashboard preview">
          <div className="art-orbit orbit-one"></div><div className="art-orbit orbit-two"></div><div className="art-glow"></div>
          <div className="hero-cricket-ball"><span></span></div>
          <div className="mini-dashboard">
            <div className="mini-top"><span className="mini-brand"><i></i> crickhub</span><span className="mini-user">AR</span></div>
            <div className="mini-greeting"><span>THURSDAY, OCTOBER 9</span><strong>Good morning, Alex <b>✳</b></strong></div>
            <div className="mini-stats"><div><small>Bookings today</small><strong>08 <i>↗ 12%</i></strong><div className="mini-bars"><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/></div></div><div><small>Lane utilization</small><strong>76% <i>↗ 8%</i></strong><div className="mini-bars blue-bars"><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/></div></div></div>
            <div className="mini-schedule-head"><strong>Today’s schedule</strong><span>View all →</span></div>
            <div className="mini-booking"><span className="mini-time">9:00</span><span className="mini-avatar avatar-a">JL</span><span><b>Jordan Lee</b><small>Net practice · Lane 01</small></span><i className="booking-dot"></i></div>
            <div className="mini-booking"><span className="mini-time">9:30</span><span className="mini-avatar avatar-b">SM</span><span><b>Sofia Martinez</b><small>Batting · Lane 02</small></span><i className="booking-dot blue-dot"></i></div>
            <div className="mini-booking"><span className="mini-time">10:30</span><span className="mini-avatar avatar-c">EW</span><span><b>Ethan Williams</b><small>Bowling · Lane 01</small></span><i className="booking-dot purple-dot"></i></div>
          </div>
          <div className="floating-chip chip-bookings"><span className="chip-icon"><Icon name="calendar" size={17}/></span><span><small>Bookings handled</small><strong>24/7 online</strong></span><i>↗</i></div>
          <div className="floating-chip chip-lanes"><span className="pulse-dot"></span><span><small>Lane 03</small><strong>Ready to play</strong></span></div>
        </div>
        <button className="scroll-hint" onClick={() => jumpTo("platform-intro")} aria-label="Scroll to platform overview"><span></span>SCROLL TO EXPLORE</button>
      </section>

      <section className="platform-intro section-pad" id="platform-intro">
        <div className="wrap intro-layout"><div><div className="eyebrow"><span className="eyebrow-dot"/> ONE HOME FOR YOUR FACILITY</div><h2>Spend less time<br />managing. More time<br /><span className="headline-accent">building the game.</span></h2></div>
          <div className="intro-copy"><p>Replace spreadsheets, phone calls and scattered calendars with one simple workspace for your cricket center. CrickHub keeps your bookings, lanes, people and programs in sync.</p><button className="inline-link" onClick={() => jumpTo("features")}>Get to know CrickHub <Icon name="arrow" size={16}/></button><div className="intro-stats"><div><strong>24/7</strong><span>online booking</span></div><div><strong>1 place</strong><span>for your operation</span></div><div><strong>More time</strong><span>for the game</span></div></div></div>
        </div>
      </section>

      <section className="feature-section section-pad" id="features">
        <div className="wrap"><div className="section-heading"><div><div className="eyebrow"><span className="eyebrow-dot"/> A BETTER WAY TO RUN CRICKET</div><h2>Everything you need.<br /><span className="headline-accent">Nothing getting in the way.</span></h2></div><p>One connected toolkit for the everyday details and the big-picture growth of your cricket facility.</p></div>
          <div className="feature-grid">
            <Feature icon="calendar" tag="SIMPLE SCHEDULING" title="Bookings without the back-and-forth" text="Let players see availability and request lane time whenever it suits them. Your schedule stays clear and up to date." tone="mint" />
            <Feature icon="court" tag="FACILITY CONTROL" title="Every lane, at a glance" text="Know what’s in use, what’s coming up and which lanes are ready. Keep the whole center moving." tone="blue" />
            <Feature icon="people" tag="PEOPLE & PROGRAMS" title="Give every player a place" text="Keep track of members, coaches and training sessions, so the right people are where they need to be." tone="peach" />
            <Feature icon="wallet" tag="BUSINESS OVERVIEW" title="See how your center is doing" text="Bring bookings and facility activity into one view, and spend less time piecing together the numbers." tone="lavender" />
          </div>
        </div>
      </section>

      <section className="workflow-section section-pad" id="how-it-works"><div className="wrap workflow-wrap">
        <div className="workflow-copy"><div className="eyebrow"><span className="eyebrow-dot"/> UP AND RUNNING, YOUR WAY</div><h2>From busy work<br />to <span className="headline-accent">game on.</span></h2><p>CrickHub gives your team a clear place to start and room to grow. Set up your lanes, add your services and welcome your players.</p><button className="button button-dark button-large" onClick={onAdmin}>Take a look inside <Icon name="arrow" size={17}/></button></div>
        <div className="workflow-steps"><Step number="01" title="Set up your center" text="Add your lanes, services, coaching sessions and facility details." /><Step number="02" title="Bring your schedule together" text="See upcoming activity in one place and make every lane count." /><Step number="03" title="Welcome your players" text="Make it simple for your cricket community to find and book a session." /></div>
      </div></section>

      <section className="closing-cta"><div className="wrap closing-inner"><span className="cta-ball">✳</span><div><div className="eyebrow">YOUR FACILITY’S NEXT INNINGS</div><h2>Ready to get your center<br />running on <span>CrickHub?</span></h2><p>Take a look at the tools built for your game.</p></div><button className="button button-white button-large" onClick={onAdmin}>Explore the dashboard <Icon name="arrow" size={17}/></button></div></section>
    </main>
    <footer className="marketing-footer"><div className="wrap footer-main"><div className="footer-brand"><Brand onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}/><p>A better way to manage your cricket facility.</p></div><div className="footer-links"><strong>EXPLORE</strong><button onClick={() => jumpTo("platform")}>Platform</button><button onClick={() => jumpTo("features")}>Features</button><button onClick={() => jumpTo("how-it-works")}>How it works</button></div><div className="footer-links"><strong>YOUR CRICKHUB</strong><button onClick={onAdmin}>Facility dashboard</button><button onClick={onAdmin}>Service management</button><button onClick={onAdmin}>Bookings</button></div><div className="footer-contact"><strong>MADE FOR THE LOVE OF THE GAME</strong><p>CrickHub<br/>Run your cricket facility</p></div></div><div className="wrap footer-bottom"><span>© 2026 CrickHub. All rights reserved.</span><span>BUILT FOR YOUR GAME <b>✳</b></span></div></footer>
  </div>;
}

const marketplaceFacilities = [];

function FacilitiesHome({ onHome }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All facilities");
  const [selectedFacility, setSelectedFacility] = useState(null);
  const filteredFacilities = marketplaceFacilities.filter((facility) => {
    const matchesQuery = `${facility.name} ${facility.city} ${facility.category}`.toLowerCase().includes(query.trim().toLowerCase());
    const matchesCategory = category === "All facilities" || facility.category === category || facility.services.some((service) => service.name.toLowerCase().includes(category.toLowerCase()));
    return matchesQuery && matchesCategory;
  });

  return <div className="marketplace">
    <header className="marketplace-header">
      <div className="marketplace-nav">
        <Brand onClick={onHome}/>
        <div className="marketplace-nav-links"><span>Find your next session</span><button className="marketplace-admin-link" onClick={onHome}>For facility owners <Icon name="arrowUp" size={15}/></button></div>
      </div>
    </header>
    <main className="marketplace-main">
      <section className="marketplace-hero">
        <div className="marketplace-hero-copy">
          <span className="marketplace-eyebrow"><span/> YOUR NEXT INNINGS START HERE</span>
          <h1>Find a place to<br/><span>play cricket.</span></h1>
          <p>Discover cricket facilities near you and find the right space for your next practice, lesson or team session.</p>
        </div>
        <div className="marketplace-hero-art" aria-hidden="true"><div className="marketplace-ball"><i/></div><div className="marketplace-stumps"><i/><i/><i/></div><span className="marketplace-art-caption">MADE FOR THE GAME</span></div>
      </section>
      <section className="facility-search-panel" aria-label="Find a cricket facility">
        <label className="facility-search-field"><Icon name="search" size={19}/><span><small>SEARCH</small><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Facility or city" aria-label="Search by facility or city"/></span></label>
        <div className="facility-search-location"><Icon name="location" size={18}/><span><small>LOCATION</small><strong>Plano, Texas</strong></span></div>
        <button className="facility-search-button" onClick={() => setSelectedFacility(null)}>Search facilities <Icon name="arrow" size={17}/></button>
      </section>
      <section className="marketplace-results">
        <div className="marketplace-results-heading"><div><span className="marketplace-section-kicker">THE CRICKHUB DIRECTORY</span><h2>Explore facilities</h2></div><span className="facility-result-count">{filteredFacilities.length} {filteredFacilities.length === 1 ? "facility" : "facilities"}</span></div>
        <div className="facility-category-tabs" aria-label="Filter facility category">
          {["All facilities", "Indoor nets", "Coaching"].map((item) => <button key={item} className={category === item ? "active" : ""} onClick={() => { setCategory(item); setSelectedFacility(null); }}>{item}</button>)}
        </div>
        {selectedFacility ? <section className="facility-detail">
          <button className="facility-back-link" onClick={() => setSelectedFacility(null)}><Icon name="arrow" size={15}/> Back to facilities</button>
          <div className="facility-detail-heading"><span className="facility-card-monogram">N</span><div><span className="facility-open-label"><i/> CRICKHUB FACILITY</span><h2>{selectedFacility.name}</h2><p><Icon name="location" size={15}/>{selectedFacility.city}</p></div></div>
          <p className="facility-detail-description">{selectedFacility.description} Choose from lane rentals and coaching sessions below.</p>
          <h3>Sessions & pricing</h3>
          <div className="facility-services">{selectedFacility.services.map((service) => <article key={service.name}><span className="facility-service-icon"><Icon name={service.name.includes("coaching") ? "people" : "court"} size={19}/></span><div><strong>{service.name}</strong><small>{service.detail}</small></div><b>${service.price}<small>/ session</small></b></article>)}</div>
        </section> : <div className="facility-card-grid">
          {filteredFacilities.map((facility) => <article className="facility-card" key={facility.name}>
            <div className="facility-card-visual"><div className="facility-card-brand"><span>{facility.name[0]}</span><strong>{facility.name}</strong></div><div className="facility-visual-ball"/><div className="facility-visual-lines"/></div>
            <div className="facility-card-body"><div className="facility-card-title"><div><span className="facility-open-label"><i/> ACCEPTING BOOKINGS</span><h3>{facility.name}</h3><p><Icon name="location" size={15}/>{facility.city}</p></div><span className="facility-card-category">{facility.category}</span></div>
              <p className="facility-card-description">{facility.description}</p>
              <div className="facility-card-meta"><span><Icon name="court" size={16}/> Indoor cricket lanes</span><span><Icon name="people" size={16}/> Coaching available</span></div>
              <div className="facility-card-footer"><p>Sessions from <strong>${facility.price}</strong><span> / hour</span></p><button onClick={() => setSelectedFacility(facility)}>View facility <Icon name="arrow" size={16}/></button></div>
            </div>
          </article>)}
          {filteredFacilities.length === 0 && <div className="facility-empty-state"><span><Icon name="search" size={21}/></span><h3>No facilities found</h3><p>Try another facility name, city or category.</p><button onClick={() => { setQuery(""); setCategory("All facilities"); }}>Clear filters</button></div>}
        </div>}
      </section>
    </main>
    <footer className="marketplace-footer"><div><Brand onClick={onHome}/><span>Find your place in the game.</span></div><p>© 2026 CrickHub · Built for your game</p></footer>
  </div>;
}

const slugify = (value) => value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

function startNewFacility({ firstName, lastName, email, facilityName, city, state, phone }) {
  Object.keys(localStorage).filter((key) => key.startsWith("crickhub-")).forEach((key) => localStorage.removeItem(key));
  const write = (key, value) => localStorage.setItem(key, JSON.stringify(value));
  write("crickhub-profile-v1", { firstName, lastName, email });
  write("crickhub-facility-details-v1", { ...defaultFacilityDetails, facilityName, organizationName: facilityName, bookingSlug: slugify(facilityName), city, state, phone });
  write("crickhub-staff-v1", [{ ...defaultStaff[0], firstName, lastName, email }]);
  write("crickhub-senders-v1", []);
  write("crickhub-booking-page-v1", { logo: "", banners: [], description: "", serviceCategories: [], social: { website: "", instagram: "", facebook: "", tiktok: "", x: "" } });
  ["services", "bookings", "customers", "memberships", "packages", "rentals", "collections", "rooms", "equipment", "schedules"].forEach((name) => write(`crickhub-${name}-v1`, []));
  write("crickhub-account-v1", { email, createdAt: new Date().toISOString() });
}

function GoogleLogo() {
  return <svg aria-hidden="true" width="18" height="18" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.9 2.4 30.4 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.9 6.1C12.4 13.6 17.7 9.5 24 9.5z"/><path fill="#4285F4" d="M46.1 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.4c-.5 2.9-2.2 5.3-4.6 6.9l7.4 5.7c4.3-4 6.9-9.9 6.9-17.1z"/><path fill="#FBBC05" d="M10.5 28.7a14.5 14.5 0 0 1 0-9.4l-7.9-6.1a24 24 0 0 0 0 21.6l7.9-6.1z"/><path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.4-5.7c-2 1.4-4.8 2.3-8.5 2.3-6.3 0-11.6-4.1-13.5-9.8l-7.9 6.1C6.5 42.6 14.6 48 24 48z"/></svg>;
}

function loadGoogleScript() {
  return new Promise((resolve, reject) => {
    if (window.google?.accounts?.oauth2) return resolve();
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.onload = resolve;
    script.onerror = () => reject(new Error("Could not load Google sign-in."));
    document.head.appendChild(script);
  });
}

async function requestGoogleProfile() {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  if (!clientId) throw new Error("Google sign-in isn’t configured yet. Add VITE_GOOGLE_CLIENT_ID to enable it.");
  await loadGoogleScript();
  const accessToken = await new Promise((resolve, reject) => {
    window.google.accounts.oauth2.initTokenClient({
      client_id: clientId,
      scope: "openid email profile",
      callback: (response) => response.access_token ? resolve(response.access_token) : reject(new Error("Google sign-in was cancelled.")),
      error_callback: () => reject(new Error("Google sign-in was cancelled."))
    }).requestAccessToken();
  });
  const response = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", { headers: { Authorization: `Bearer ${accessToken}` } });
  if (!response.ok) throw new Error("Could not read your Google profile.");
  return response.json();
}

function FacilitySignup({ onBack, onLogin, onCreated }) {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [googleBusy, setGoogleBusy] = useState(false);
  const [googleAccount, setGoogleAccount] = useState(false);
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", password: "", facilityName: "", city: "", state: "", phone: "" });
  const set = (key) => (event) => setForm((current) => ({ ...current, [key]: event.target.value }));
  const continueWithGoogle = async () => {
    setError(""); setGoogleBusy(true);
    try {
      const profile = await requestGoogleProfile();
      setForm((current) => ({ ...current, firstName: profile.given_name || "", lastName: profile.family_name || "", email: profile.email || "", password: "" }));
      setGoogleAccount(true);
      setStep(2);
    } catch (googleError) {
      setError(googleError.message);
    } finally {
      setGoogleBusy(false);
    }
  };
  const next = (event) => {
    event.preventDefault();
    if (step === 1) {
      if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) return setError("Enter a valid email address.");
      setError(""); setStep(2); return;
    }
    if (!googleAccount && form.password.length < 8) return setError("Password must be at least 8 characters.");
    if (!slugify(form.facilityName)) return setError("Enter your facility name.");
    startNewFacility({ ...form, firstName: form.firstName.trim(), lastName: form.lastName.trim(), email: form.email.trim(), facilityName: form.facilityName.trim(), city: form.city.trim(), state: form.state.trim(), phone: form.phone.trim() });
    onCreated();
  };
  return <main className="facility-login">
    <button className="login-back" onClick={onBack}><Icon name="arrow" size={16}/> Back to CrickHub</button>
    <section className="login-card" aria-labelledby="signup-title">
      <Brand onClick={onBack}/>
      <div className="login-welcome"><span className="login-role">STEP {step} OF 2</span><h1 id="signup-title">{step === 1 ? "Create your CrickHub account" : "Set up your facility"}</h1><p>{step === 1 ? "Welcome! Please fill in the details to get started." : "Tell us about the facility you’re bringing to CrickHub."}</p></div>
      <form className="login-form" onSubmit={next}>
        {step === 1 ? <>
          <button className="google-button" type="button" onClick={continueWithGoogle} disabled={googleBusy}><GoogleLogo/> {googleBusy ? "Connecting to Google…" : "Continue with Google"}</button>
          <div className="login-divider"><span>or</span></div></> : null}
        {step === 1 ? <>
          <label>Email address<input type="email" value={form.email} onChange={set("email")} autoComplete="username" placeholder="Enter your email address" required/></label>
        </> : <>
          {googleAccount ? <p className="signup-slug">Signed in with Google as <b>{form.email}</b></p> : <p className="signup-slug">Creating an account for <b>{form.email}</b></p>}
          {!googleAccount && <>
            <div className="signup-row"><label>First name<input value={form.firstName} onChange={set("firstName")} autoComplete="given-name" required/></label><label>Last name<input value={form.lastName} onChange={set("lastName")} autoComplete="family-name" required/></label></div>
            <label>Password<span className="login-password"><input type={showPassword ? "text" : "password"} value={form.password} onChange={set("password")} autoComplete="new-password" placeholder="At least 8 characters" required/><button type="button" onClick={() => setShowPassword((visible) => !visible)}>{showPassword ? "Hide" : "Show"}</button></span></label>
          </>}
          <label>Facility name<input value={form.facilityName} onChange={set("facilityName")} placeholder="e.g. Riverside Cricket Club" required/></label>
          <div className="signup-row"><label>City<input value={form.city} onChange={set("city")} autoComplete="address-level2" required/></label><label>State<input value={form.state} onChange={set("state")} autoComplete="address-level1" required/></label></div>
          <label>Phone <small>(optional)</small><input type="tel" value={form.phone} onChange={set("phone")} autoComplete="tel"/></label>
          {slugify(form.facilityName) && <p className="signup-slug">Your booking page: book.crickhubapp.com/facilities/<b>{slugify(form.facilityName)}</b></p>}
        </>}
        {error && <p className="login-notice" role="alert">{error}</p>}
        <button className="login-submit" type="submit">{step === 1 ? "Continue" : "Create facility"} <Icon name="arrow" size={17}/></button>
        {step === 2 && <button className="login-forgot" type="button" onClick={() => { setError(""); setGoogleAccount(false); setStep(1); }}>Back</button>}
      </form>
      <p className="login-demo-note"><Icon name="spark" size={15}/> Demo preview: your account is saved only in this browser. Creating a facility clears any existing demo data here.</p>
      <div className="login-footer">Already have an account? <button onClick={onLogin}>Sign in</button></div>
    </section>
    <p className="login-copyright">© 2026 CrickHub · Built for your game</p>
  </main>;
}
function FacilityLogin({ onBack, onContinue, onSignup }) {
  const [showPassword, setShowPassword] = useState(false);
  const [notice, setNotice] = useState("");
  return <main className="facility-login">
    <button className="login-back" onClick={onBack}><Icon name="arrow" size={16}/> Back to CrickHub</button>
    <section className="login-card" aria-labelledby="login-title">
      <Brand onClick={onBack}/>
      <div className="login-welcome"><h1 id="login-title">Sign in to CrickHub</h1><p>Welcome back! Please sign in to continue</p></div>
      <form className="login-form" onSubmit={(event) => { event.preventDefault(); onContinue(); }}>
        <button className="google-button" type="button" onClick={async () => { setNotice(""); try { await requestGoogleProfile(); onContinue(); } catch (googleError) { setNotice(googleError.message); } }}><GoogleLogo/> Continue with Google</button>
        <div className="login-divider"><span>or</span></div>
        <label>Email address<input name="email" type="email" autoComplete="username" placeholder="Enter your email address" required/></label>
        <label>Password<span className="login-password"><input name="password" type={showPassword ? "text" : "password"} autoComplete="current-password" placeholder="Enter your password" required/><button type="button" onClick={() => setShowPassword((visible) => !visible)} aria-label={showPassword ? "Hide password" : "Show password"}>{showPassword ? "Hide" : "Show"}</button></span></label>
        <button className="login-forgot" type="button" onClick={() => setNotice("Password recovery isn’t connected in this demo.")}>Forgot password?</button>
        <button className="login-submit" type="submit">Continue <Icon name="arrow" size={17}/></button>
      </form>
      <p className="login-demo-note"><Icon name="spark" size={15}/> Demo preview: sign-in isn’t connected yet. Continue opens the admin dashboard.</p>
      {notice && <p className="login-notice" role="status">{notice}</p>}
      <div className="login-footer">Don’t have an account? <button onClick={onSignup}>Sign up</button></div>
      <div className="login-footer">Need access to this facility? <button onClick={() => setNotice("Ask your facility administrator to provide access.")}>Contact your administrator</button></div>
    </section>
    <p className="login-copyright">© 2026 CrickHub · Built for your game</p>
  </main>;
}

function Feature({ icon, tag, title, text, tone }) {
  return <article className="feature-card"><span className={`feature-icon tone-${tone}`}><Icon name={icon} size={21}/></span><span className="feature-tag">{tag}</span><h3>{title}</h3><p>{text}</p><span className="feature-arrow"><Icon name="arrowUp" size={16}/></span></article>;
}
function Step({ number, title, text }) {
  return <article className="workflow-step"><span>{number}</span><div><h3>{title}</h3><p>{text}</p></div><Icon name="check" size={18}/></article>;
}

function ServiceModal({ service, onClose, onSave }) {
  const [form, setForm] = useState(service || { name: "", category: "Lane rental", description: "", duration: 60, price: "", active: true });
  const change = (event) => setForm({ ...form, [event.target.name]: event.target.value });
  return <div className="modal-scrim" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}><form className="admin-modal" onSubmit={(event) => { event.preventDefault(); onSave({ ...form, price: Number(form.price), duration: Number(form.duration), active: form.active ?? true, id: form.id || `service-${Date.now()}` }); }}>
    <button type="button" className="modal-x" onClick={onClose} aria-label="Close">×</button><span className="admin-kicker">SERVICE CATALOG</span><h2>{service ? "Edit service" : "Add a service"}</h2><p>Give your players another way to get in the game.</p>
    <label>Service name<input name="name" required maxLength="60" value={form.name} onChange={change} placeholder="e.g. One-hour lane rental"/></label>
    <label>What’s included?<textarea name="description" required maxLength="180" rows="3" value={form.description} onChange={change} placeholder="Describe the session or rental"/></label>
    <div className="form-split"><label>Category<select name="category" value={form.category} onChange={change}><option>Lane rental</option><option>Coaching</option><option>Training</option><option>Equipment</option></select></label><label>Duration<select name="duration" value={form.duration} onChange={change}><option value="30">30 minutes</option><option value="60">1 hour</option><option value="90">1.5 hours</option><option value="120">2 hours</option><option value="0">Flexible</option></select></label></div>
    <label>Price (USD)<input name="price" type="number" min="0" step="0.01" required value={form.price} onChange={change} placeholder="45.00"/></label>
    <div className="modal-actions"><button type="button" className="admin-button secondary" onClick={onClose}>Cancel</button><button className="admin-button primary" type="submit">Save service <Icon name="arrow" size={16}/></button></div>
  </form></div>;
}

function OfferModal({ kind, offer, onClose, onSave }) {
  const isMembership = kind === "membership";
  const [form, setForm] = useState(offer || {
    name: "",
    description: "",
    price: "",
    billing: "Monthly",
    sessions: 5,
    validity: 90,
    benefits: [],
    active: true
  });
  const update = (event) => setForm({ ...form, [event.target.name]: event.target.value });
  return <div className="modal-scrim" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
    <form className="admin-modal" onSubmit={(event) => {
      event.preventDefault();
      onSave({
        ...form,
        id: form.id || `${kind}-${Date.now()}`,
        name: form.name.trim(),
        description: form.description.trim(),
        price: Number(form.price),
        sessions: isMembership ? undefined : Number(form.sessions),
        validity: isMembership ? undefined : Number(form.validity),
        benefits: String(form.benefitsInput ?? form.benefits.join(", ")).split(",").map((item) => item.trim()).filter(Boolean),
        active: form.active ?? true
      });
    }}>
      <button type="button" className="modal-x" onClick={onClose} aria-label="Close">×</button>
      <span className="admin-kicker">{isMembership ? "MEMBERSHIP PLANS" : "SESSION PACKAGES"}</span>
      <h2>{offer ? "Edit" : "Create"} {isMembership ? "membership plan" : "package"}</h2>
      <p>{isMembership ? "Set up recurring benefits for your cricket community." : "Bundle sessions so players can book ahead and save."}</p>
      <label>{isMembership ? "Plan name" : "Package name"}<input name="name" required maxLength="60" value={form.name} onChange={update} placeholder={isMembership ? "e.g. Club membership" : "e.g. Player pack"} /></label>
      <label>Description<textarea name="description" required maxLength="180" rows="2" value={form.description} onChange={update} placeholder="Describe what players get" /></label>
      <div className="form-split">
        <label>Price (USD)<input name="price" type="number" min="0" step="0.01" required value={form.price} onChange={update} placeholder="49.00" /></label>
        {isMembership
          ? <label>Billing<select name="billing" value={form.billing} onChange={update}><option>Monthly</option><option>Quarterly</option><option>Annually</option></select></label>
          : <label>Sessions<input name="sessions" type="number" min="1" step="1" required value={form.sessions} onChange={update} /></label>}
      </div>
      {!isMembership && <label>Validity<select name="validity" value={form.validity} onChange={update}><option value="30">30 days</option><option value="90">90 days</option><option value="180">6 months</option><option value="365">1 year</option></select></label>}
      <label>Benefits <span className="offer-hint">Separate each benefit with a comma</span><textarea name="benefitsInput" rows="2" value={form.benefitsInput ?? form.benefits.join(", ")} onChange={update} placeholder="Member discounts, Priority bookings" /></label>
      <div className="modal-actions"><button type="button" className="admin-button secondary" onClick={onClose}>Cancel</button><button className="admin-button primary" type="submit">Save {isMembership ? "plan" : "package"} <Icon name="arrow" size={16} /></button></div>
    </form>
  </div>;
}

function OfferCard({ offer, kind, onEdit, onToggle }) {
  const isMembership = kind === "membership";
  const billingUnit = { Monthly: "month", Quarterly: "quarter", Annually: "year" }[offer.billing] || "month";
  return <article className={`admin-service-card offer-card ${offer.active ? "" : "muted"}`}>
    <div className="service-card-heading">
      <span className={`service-illustration ${isMembership ? "membership-illustration" : "package-illustration"}`}><Icon name={isMembership ? "people" : "court"} /></span>
      {offer.featured && <span className="offer-featured">POPULAR</span>}
      <span className={offer.active ? "status-active" : "status-inactive"}>{offer.active ? "Active" : "Inactive"}</span>
      <button className="dots" onClick={onEdit} aria-label={`Edit ${offer.name}`}>···</button>
    </div>
    <span className="category-label">{isMembership ? "MEMBERSHIP PLAN" : "SESSION PACKAGE"}</span>
    <h2>{offer.name}</h2>
    <p>{offer.description}</p>
    <div className="offer-includes">
      {!isMembership && <span><Icon name="calendar" size={14} />{offer.sessions} lane sessions</span>}
      {isMembership && <span><Icon name="clock" size={14} />Billed {offer.billing.toLowerCase()}</span>}
      {!isMembership && <span><Icon name="clock" size={14} />Valid for {offer.validity} days</span>}
      {offer.benefits.map((benefit) => <span key={benefit}><Icon name="check" size={14} />{benefit}</span>)}
    </div>
    <div className="service-card-bottom offer-card-bottom">
      <strong>${Number(offer.price).toFixed(2)}<small> / {isMembership ? billingUnit : "package"}</small></strong>
      <button className={`toggle ${offer.active ? "on" : ""}`} aria-label={offer.active ? "Deactivate offer" : "Activate offer"} onClick={onToggle}><i /></button>
      <button className="edit-service" onClick={onEdit}>Edit {isMembership ? "plan" : "package"}</button>
    </div>
  </article>;
}

const durationOptions = [15, 30, 45, ...Array.from({ length: 11 }, (_, i) => 60 + i * 30)];
const durationLabel = (minutes) => {
  if (minutes < 60) return `${minutes} mins`;
  const hours = minutes / 60;
  return `${Number.isInteger(hours) ? hours : hours.toFixed(1).replace(/\.0$/, "")} ${hours === 1 ? "hour" : "hours"}`;
};

function RentalEditor({ rental, collections, rooms, equipment, schedules, memberships, onClose, onSave, onDelete }) {
  const initialCollection = collections.find((item) => item.rentalIds.includes(rental?.id))?.id || "";
  const [form, setForm] = useState(() => {
    const base = {
    name: "", previewText: "", description: "", price: "", rateUnit: "1 hour", active: true,
    roomIds: [], reserveMode: "any", reserveEquipment: false, equipmentIds: [], collectTax: false, taxIds: [], collectFee: false, feeIds: [],
    restrictions: [], scheduleEnabled: false, scheduleId: "", private: false, calendarColor: "#477db1", media: null, prices: [{ duration: 60, price: "" }], membershipPrices: [],
    ...rental
    };
    if (rental && !rental.prices?.length && rental.price !== undefined && rental.price !== "") base.prices = [{ duration: rental.rateUnit === "day" ? 360 : 60, price: rental.price }];
    return base;
  });
  const [collectionId, setCollectionId] = useState(initialCollection);
  const [pricingTab, setPricingTab] = useState("default");
  const [advanced, setAdvanced] = useState(false);
  const [collapsedRooms, setCollapsedRooms] = useState(() => new Set());
  const [error, setError] = useState("");
  const taxSettings = safeRead("crickhub-tax-fees-v1", { taxRates: [{ id: "tax-sales", name: "Sales Tax", percentage: "8.25" }], customFees: [{ id: "fee-convenience", name: "Convenience Fee", amount: "0.00" }] });
  const update = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((current) => ({ ...current, [name]: type === "checkbox" ? checked : value }));
  };
  const toggleId = (field, id) => setForm((current) => ({ ...current, [field]: current[field].includes(id) ? current[field].filter((item) => item !== id) : [...current[field], id] }));
  const setRow = (field, index, key, value) => setForm((current) => ({ ...current, [field]: current[field].map((row, i) => i === index ? { ...row, [key]: value } : row) }));
  const removeRow = (field, index) => setForm((current) => ({ ...current, [field]: current[field].filter((_, i) => i !== index) }));
  const addRow = (field, row) => setForm((current) => ({ ...current, [field]: [...current[field], row] }));
  const uploadMedia = (file) => {
    if (!file) return;
    if (!["image/jpeg", "image/png", "image/gif", "image/webp", "image/svg+xml"].includes(file.type) || file.size > 2 * 1024 * 1024) {
      setError("Choose a JPG, PNG, GIF, WEBP or SVG image no larger than 2 MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => { setForm((current) => ({ ...current, media: { name: file.name, data: reader.result } })); setError(""); };
    reader.onerror = () => setError("Could not read the image. Please try again.");
    reader.readAsDataURL(file);
  };
  const roomIds = new Set(rooms.map((room) => room.id));
  const roomsById = new Map(rooms.map((room) => [room.id, room]));
  const roomChildren = new Map();
  rooms.forEach((room) => {
    if (!roomChildren.has(room.parentId)) roomChildren.set(room.parentId, []);
    roomChildren.get(room.parentId).push(room);
  });
  const roomSubtree = (id) => {
    const ids = new Set();
    const visitDescendants = (roomId) => {
      if (ids.has(roomId)) return;
      ids.add(roomId);
      (roomChildren.get(roomId) || []).forEach((child) => visitDescendants(child.id));
    };
    visitDescendants(id);
    return ids;
  };
  const selectedRoomIds = new Set(form.roomIds);
  const roomSelection = (id) => {
    const descendants = roomSubtree(id);
    const selected = [...descendants].filter((roomId) => selectedRoomIds.has(roomId)).length;
    return { checked: selected === descendants.size, partial: selected > 0 && selected < descendants.size };
  };
  const toggleRoom = (id, checked) => {
    setForm((current) => {
      const selected = new Set(current.roomIds);
      roomSubtree(id).forEach((roomId) => { if (checked) selected.add(roomId); else selected.delete(roomId); });
      const ancestors = new Set([id]);
      let parent = roomsById.get(id)?.parentId;
      while (parent && roomsById.has(parent) && !ancestors.has(parent)) {
        ancestors.add(parent);
        const children = roomChildren.get(parent) || [];
        if (children.every((child) => [...roomSubtree(child.id)].every((roomId) => selected.has(roomId)))) selected.add(parent);
        else selected.delete(parent);
        parent = roomsById.get(parent)?.parentId;
      }
      return { ...current, roomIds: [...selected] };
    });
  };
  const roomRows = [];
  const visited = new Set();
  const visit = (room, depth) => {
    if (visited.has(room.id)) return;
    visited.add(room.id);
    roomRows.push({ room, depth });
    if (!collapsedRooms.has(room.id)) rooms.filter((child) => child.parentId === room.id).forEach((child) => visit(child, depth + 1));
  };
  rooms.filter((room) => !roomIds.has(room.parentId)).forEach((room) => visit(room, 0));
  const toggleRoomGroup = (id) => setCollapsedRooms((current) => { const next = new Set(current); if (next.has(id)) next.delete(id); else next.add(id); return next; });
  const save = (event) => {
    event.preventDefault();
    if (!form.name.trim()) { setError("Enter a rental name."); return; }
    if (!form.prices.length) { setPricingTab("default"); setError("Add at least one default price."); return; }
    if ([...form.prices, ...form.membershipPrices].some((row) => row.price === "" || !Number.isFinite(Number(row.price)) || Number(row.price) < 0 || !Number.isInteger(Number(row.duration)) || Number(row.duration) < 1) || form.membershipPrices.some((row) => !row.membershipId)) { setError("Complete each pricing row with a valid duration, price, and membership plan where applicable."); return; }
    const shortest = [...form.prices].sort((a, b) => Number(a.duration) - Number(b.duration))[0];
    if (form.restrictions.some((item) => item.start >= item.end)) { setError("Each time restriction must end after it starts."); return; }
    if (form.scheduleEnabled && !form.scheduleId) { setError("Choose a service schedule."); return; }
    onSave({ ...form, id: form.id || (globalThis.crypto?.randomUUID ? globalThis.crypto.randomUUID() : `rental-${Date.now()}`), name: form.name.trim(), description: form.description.trim(), previewText: form.previewText.trim(), price: Number(shortest.price), rateUnit: durationLabel(Number(shortest.duration)) }, collectionId, initialCollection, setError);
  };
  const listChoices = (items, field, empty) => items.length ? items.map((item) => <label className="rental-choice" key={item.id}><input type="checkbox" checked={form[field].includes(item.id)} onChange={() => toggleId(field, item.id)}/>{item.name}</label>) : <p className="rental-hint">{empty}</p>;
  const priceField = pricingTab === "default" ? "prices" : "membershipPrices";
  return <section className="rental-editor">
    <div className="rooms-breadcrumb"><button type="button" onClick={onClose}>Services</button><span>/</span><span>{rental ? "Edit Rental" : "Add Rental"}</span></div>
    <h2>{rental ? "Edit Rental" : "Add Rental"}</h2>
    <p className="rental-preview-notice">Settings are saved on this device. Booking, pricing rules, taxes and equipment reservations are not enforced in the current preview.</p>
    <form className="rental-editor-card" onSubmit={save}>
      <h3>Rental Details</h3>
      <div className="rental-editor-body">
        <section className="rental-editor-section"><div><h4>Basics</h4><p>Set the name and description</p></div><div className="rental-fields">
          <label>Name<input name="name" value={form.name} onChange={update} required maxLength={60} autoFocus/></label>
          <label>Preview Text <span className="optional-field-label">Optional</span><textarea name="previewText" maxLength={150} value={form.previewText} onChange={update} rows={2}/><small>This text will be displayed on the booking page. <span>{form.previewText.length} / 150 characters</span></small></label>
          <label>Collection <span className="optional-field-label">Optional</span><select value={collectionId} onChange={(event) => setCollectionId(event.target.value)}><option value="">None</option>{collections.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select></label>
          <label>Description <span className="optional-field-label">Optional</span><textarea name="description" rows={6} value={form.description} onChange={update} placeholder="Enter a description..."/></label>
          <label>Media <span className="optional-field-label">Optional</span><span className="rental-upload" onDragOver={(event) => event.preventDefault()} onDrop={(event) => { event.preventDefault(); uploadMedia(event.dataTransfer.files[0]); }}><Icon name="device" size={24}/><strong>{form.media?.name || "Click to upload or drag and drop"}</strong><small>JPG, PNG, GIF, WEBP, SVG (max: 2MB, 16:9 recommended)</small><input type="file" accept=".jpg,.jpeg,.png,.gif,.webp,.svg" onChange={(event) => { uploadMedia(event.target.files[0]); event.target.value = ""; }}/></span></label>
          {form.media && <button className="rental-text-button" type="button" onClick={() => setForm((current) => ({ ...current, media: null }))}>Remove image</button>}
        </div></section>
        <section className="rental-editor-section"><div><h4>Pricing</h4><p>Choose the price that your customers will see for this service</p></div><div className="rental-fields">
          <div className="rental-price-heading"><div className="rental-price-tabs" role="tablist" aria-label="Rental pricing"><button type="button" role="tab" aria-selected={pricingTab === "default"} onClick={() => setPricingTab("default")}>Default Pricing</button><button type="button" role="tab" aria-selected={pricingTab === "membership"} onClick={() => setPricingTab("membership")}>Membership Pricing</button></div><button type="button" className="rental-add-button" onClick={() => addRow(priceField, { duration: 60, price: "", ...(pricingTab === "membership" ? { membershipId: memberships[0]?.id || "" } : {}) })}>+ Add Price</button></div>
          {form[priceField].length > 0 ? <div className="rental-price-table">
            <div className="rental-price-table-head"><span>Duration</span>{pricingTab === "membership" && <span>Membership</span>}<span>Price</span><span>Actions</span></div>
            {form[priceField].map((row, index) => <div className="rental-price-table-row" key={index}>
              <select aria-label="Duration" value={row.duration} onChange={(event) => setRow(priceField, index, "duration", Number(event.target.value))}>{durationOptions.map((minutes) => <option key={minutes} value={minutes}>{durationLabel(minutes)}</option>)}</select>
              {pricingTab === "membership" && <select aria-label="Membership" value={row.membershipId} required onChange={(event) => setRow(priceField, index, "membershipId", event.target.value)}><option value="">Choose plan</option>{memberships.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select>}
              <span className="rental-price-input"><i>$</i><input aria-label="Price" type="number" min="0" step="0.01" required value={row.price} onChange={(event) => setRow(priceField, index, "price", event.target.value)} placeholder="0.00"/></span>
              <span className="rental-price-actions"><button type="button" aria-label="Duplicate price" onClick={() => setForm((current) => ({ ...current, [priceField]: [...current[priceField].slice(0, index + 1), { ...row }, ...current[priceField].slice(index + 1)] }))}><Icon name="copy" size={16}/></button><button type="button" aria-label="Delete price" onClick={() => removeRow(priceField, index)}><Icon name="trash" size={16}/></button></span>
            </div>)}
          </div> : <p className="rental-hint">{pricingTab === "default" ? "Add at least one price to continue." : "No membership prices added."}</p>}
        </div></section>
        <section className="rental-editor-section"><div><h4>Rooms</h4><p>Indicate which rooms the service can take place in, and how those rooms are reserved on purchase</p></div><div className="rental-fields"><strong>Rooms</strong>{roomRows.length ? roomRows.map(({ room, depth }) => {
          const selection = roomSelection(room.id);
          return <div className="rental-room-row" key={room.id} style={{ paddingLeft: `${depth * 24}px` }}>{rooms.some((item) => item.parentId === room.id) ? <button type="button" className={`room-expand ${!collapsedRooms.has(room.id) ? "expanded" : ""}`} aria-label={`${collapsedRooms.has(room.id) ? "Expand" : "Collapse"} ${room.name}`} aria-expanded={!collapsedRooms.has(room.id)} onClick={() => toggleRoomGroup(room.id)}><Icon name="chevronDown" size={16}/></button> : <span className="room-expand-spacer"/>}<label className="rental-choice"><input type="checkbox" checked={selection.checked} ref={(input) => { if (input) input.indeterminate = selection.partial; }} onChange={(event) => toggleRoom(room.id, event.target.checked)}/>{room.name}</label></div>;
        }) : <p className="rental-hint">Add rooms in Settings to select them here.</p>}<label>Reserve On Purchase<select name="reserveMode" value={form.reserveMode} onChange={update}><option value="any">Any selected room</option><option value="all">All selected rooms</option></select></label></div></section>
        <section className="rental-editor-section"><div><h4>Equipment</h4><p>Decide which equipment gets reserved when this rental is booked</p></div><div className="rental-fields"><label className="rental-choice"><input type="checkbox" name="reserveEquipment" checked={form.reserveEquipment} onChange={update}/>Reserve equipment</label>{form.reserveEquipment && listChoices(equipment.filter((item) => item.parentId), "equipmentIds", "Add equipment items in Settings to select them here.")}</div></section>
        <button type="button" className="rental-advanced-toggle" aria-expanded={advanced} onClick={() => setAdvanced(!advanced)}><span><strong>Advanced Settings</strong><small>Add restrictions, tax rates, and booking page settings</small></span><Icon name="chevronDown" size={18}/></button>
        {advanced && <>
          <section className="rental-editor-section"><div><h4>Tax Rates</h4><p>Choose the tax rate that applies to this service.</p></div><div className="rental-fields"><label className="rental-choice"><input type="checkbox" name="collectTax" checked={form.collectTax} onChange={update}/>Collect tax</label>{form.collectTax && listChoices(taxSettings.taxRates || [], "taxIds", "Add tax rates in Settings first.")}</div></section>
          <section className="rental-editor-section"><div><h4>Custom Fees</h4><p>Choose the custom fee that applies to this service.</p></div><div className="rental-fields"><label className="rental-choice"><input type="checkbox" name="collectFee" checked={form.collectFee} onChange={update}/>Collect fee</label>{form.collectFee && listChoices(taxSettings.customFees || [], "feeIds", "Add custom fees in Settings first.")}</div></section>
          <section className="rental-editor-section"><div><h4>Time Slot Restrictions</h4><p>Set start and end limits on the time slots shown to clients.</p></div><div className="rental-fields">{form.restrictions.map((row, index) => <div className="rental-price-row" key={index}><label>Start<input type="time" required value={row.start} onChange={(event) => setRow("restrictions", index, "start", event.target.value)}/></label><label>End<input type="time" required value={row.end} onChange={(event) => setRow("restrictions", index, "end", event.target.value)}/></label><button type="button" className="rental-text-button" onClick={() => removeRow("restrictions", index)}>Remove</button></div>)}{!form.restrictions.length && <p className="rental-hint">No slot restrictions</p>}<button type="button" className="rental-add-button" onClick={() => addRow("restrictions", { start: "09:00", end: "17:00" })}>Add restriction</button></div></section>
          <section className="rental-editor-section"><div><h4>Schedule</h4><p>Choose to offer this service only on certain days or times.</p></div><div className="rental-fields"><label className="rental-choice"><input type="checkbox" name="scheduleEnabled" checked={form.scheduleEnabled} onChange={update}/>Set service schedule</label>{form.scheduleEnabled && <label>Schedule<select name="scheduleId" value={form.scheduleId} onChange={update} required><option value="">Choose a schedule</option>{schedules.map((item) => <option value={item.id} key={item.id}>{item.name}</option>)}</select>{!schedules.length && <small>Add a schedule in Settings first.</small>}</label>}</div></section>
          <section className="rental-editor-section"><div><h4>Additional Checkout Details</h4><p>Request additional information during checkout.</p></div><div><p className="rental-hint">Custom checkout fields are not available in this preview.</p></div></section>
          <section className="rental-editor-section"><div><h4>Private</h4><p>Hide this service from clients on your booking page.</p></div><label className="rental-choice"><input type="checkbox" name="private" checked={form.private} onChange={update}/>Hide from booking page</label></section>
          <section className="rental-editor-section"><div><h4>Calendar Color</h4><p>The color used to display bookings for this service.</p></div><label className="rental-color-label">Color<input type="color" name="calendarColor" value={form.calendarColor} onChange={update}/></label></section>
        </>}
      </div>
      <footer className="rental-editor-actions">{rental && <button type="button" className="rental-delete-button" onClick={() => { if (window.confirm(`Delete "${rental.name}"? This will remove it from its collections.`)) onDelete(rental, setError); }}>Delete</button>}{error && <span role="alert">{error}</span>}<button type="button" className="admin-button secondary" onClick={onClose}>Cancel</button><button type="submit" className="admin-button primary">Save rental</button></footer>
    </form>
    {rental && <section className="rental-participants" aria-labelledby="rental-participants-title">
      <h3 id="rental-participants-title">Participants</h3>
      <div className="rental-participants-body">
        <p>Rental bookings are not connected yet. Participants will appear here when that feature is available.</p>
        <div className="rental-participants-table-wrap"><table className="rental-participants-table"><thead><tr><th scope="col">Name</th><th scope="col">Email</th><th scope="col"># of Sessions</th><th scope="col">Actions</th></tr></thead><tbody><tr><td colSpan="4">No participants yet.</td></tr></tbody></table></div>
      </div>
    </section>}
  </section>;
}

function RentalCard({ rental, onEdit, onToggle }) {
  return <article className={`admin-service-card rental-card ${rental.active ? "" : "muted"}`}>
    <div className="service-card-heading"><span className="service-illustration rental-illustration"><Icon name="court" /></span>{rental.featured && <span className="offer-featured">POPULAR</span>}<span className={rental.active ? "status-active" : "status-inactive"}>{rental.active ? "Active" : "Inactive"}</span><button className="dots" onClick={onEdit} aria-label={`Edit ${rental.name}`}>···</button></div>
    <span className="category-label">RENTAL</span><h2>{rental.name}</h2><p>{rental.description}</p>
    <div className="service-card-bottom rental-card-bottom"><strong>${Number(rental.price).toFixed(2)}<small> / {rental.rateUnit}</small></strong><button className={`toggle ${rental.active ? "on" : ""}`} aria-label={rental.active ? "Deactivate rental" : "Activate rental"} onClick={onToggle}><i/></button><button className="edit-service" onClick={onEdit}>Edit rental</button></div>
  </article>;
}

function CollectionModal({ collection, rentals, onClose, onSave }) {
  const [name, setName] = useState(collection?.name || "");
  const [rentalIds, setRentalIds] = useState(collection?.rentalIds || []);
  const toggleRental = (id) => setRentalIds((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  return <div className="modal-scrim" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
    <form className="admin-modal collection-modal" onSubmit={(event) => {
      event.preventDefault();
      onSave({ id: collection?.id || `collection-${Date.now()}`, name: name.trim(), category: "Rentals", rentalIds });
    }}>
      <button type="button" className="modal-x" onClick={onClose} aria-label="Close">×</button>
      <span className="admin-kicker">SERVICE COLLECTIONS</span>
      <h2>{collection ? "Edit collection" : "New collection"}</h2>
      <p>Group related rentals together for an easier booking experience.</p>
      <label>Collection name<input required maxLength="60" value={name} onChange={(event) => setName(event.target.value)} placeholder="e.g. Indoor Lanes" /></label>
      <span className="collection-picker-label">Choose rentals <small>{rentalIds.length} selected</small></span>
      <div className="collection-picker">
        {rentals.length ? rentals.map((rental) => <label className="collection-option" key={rental.id}>
          <input type="checkbox" checked={rentalIds.includes(rental.id)} onChange={() => toggleRental(rental.id)} />
          <span><strong>{rental.name}</strong><small>${Number(rental.price).toFixed(2)} / {rental.rateUnit}</small></span>
        </label>) : <p className="collection-no-rentals">Add rentals before creating a collection.</p>}
      </div>
      <div className="modal-actions"><button type="button" className="admin-button secondary" onClick={onClose}>Cancel</button><button className="admin-button primary" type="submit" disabled={rentalIds.length === 0}>Save collection <Icon name="arrow" size={16} /></button></div>
    </form>
  </div>;
}

function CollectionSuggestions({ existing, rentals, onClose, onCreate }) {
  const candidates = [
    { name: "Training Equipment", category: "Rentals", rentalIds: rentals.filter((item) => item.category === "Training equipment" || item.category === "Performance tech").map((item) => item.id) },
    { name: "Player Gear", category: "Rentals", rentalIds: rentals.filter((item) => item.category === "Player equipment" || item.category === "Facility gear").map((item) => item.id) }
  ].filter((candidate) => candidate.rentalIds.length > 0 && !existing.some((collection) => collection.name.toLowerCase() === candidate.name.toLowerCase()));
  return <div className="modal-scrim" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
    <section className="admin-modal suggestions-modal" role="dialog" aria-modal="true" aria-labelledby="suggestions-title">
      <button type="button" className="modal-x" onClick={onClose} aria-label="Close">×</button>
      <span className="admin-kicker">SMART SUGGESTIONS</span><h2 id="suggestions-title">Collections for your rentals</h2>
      <p>Group similar items so players can find what they need faster.</p>
      {candidates.length ? <div className="suggestion-list">{candidates.map((candidate) => <article className="suggestion-card" key={candidate.name}>
        <span className="collection-folder suggestion-folder"><Icon name="court" size={19}/></span>
        <div><strong>{candidate.name}</strong><small>{candidate.rentalIds.map((id) => rentals.find((item) => item.id === id)?.name).filter(Boolean).join(" · ")}</small></div>
        <button className="admin-button secondary" onClick={() => onCreate(candidate)}>Add</button>
      </article>)}</div> : <div className="collection-empty"><span>✓</span><strong>You’re all organized</strong><p>There are no new collection suggestions right now.</p></div>}
      <div className="modal-actions"><button type="button" className="admin-button secondary" onClick={onClose}>Done</button></div>
    </section>
  </div>;
}

function CollectionsManager({ collections, setCollections, rentals, onToast }) {
  const [query, setQuery] = useState("");
  const [modal, setModal] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const visible = collections.filter((collection) => {
    const itemNames = collection.rentalIds.map((id) => rentals.find((item) => item.id === id)?.name || "").join(" ");
    return `${collection.name} ${collection.category} ${itemNames}`.toLowerCase().includes(query.toLowerCase());
  });
  const saveCollection = (collection) => {
    setCollections((current) => current.some((item) => item.id === collection.id) ? current.map((item) => item.id === collection.id ? collection : item) : [...current, collection]);
    setModal(null);
    onToast(`${collection.name} saved.`);
  };
  const shareCollection = async (collection) => {
    const url = `${window.location.origin}/collections/${encodeURIComponent(collection.id)}`;
    try {
      await navigator.clipboard.writeText(url);
      onToast("Collection link copied.");
    } catch (error) {
      console.error("Could not copy collection link", error);
      onToast("Could not copy link. Check clipboard permissions.");
    }
  };
  return <section className="collections-page">
    <div className="collections-page-heading"><div><h2>Collections</h2><p>Group services together for an easier booking experience</p></div><div className="collections-heading-actions"><button className="suggestions-button" onClick={() => setShowSuggestions(true)}><Icon name="spark" size={16}/> View suggestions</button><button className="admin-button collection-create-button" onClick={() => setModal({})}><Icon name="plus" size={16}/> New collection</button></div></div>
    <section className="collections-panel">
      <div className="collections-panel-heading"><div><h3>Collections</h3><p>{collections.length} {collections.length === 1 ? "collection" : "collections"}</p></div><label className="collection-search"><Icon name="search" size={17}/><input type="search" aria-label="Search collections" placeholder="Search" value={query} onChange={(event) => setQuery(event.target.value)}/></label></div>
      <div className="collections-table-wrap"><table className="collections-table"><thead><tr><th>Name</th><th>Category</th><th>Services</th><th><span className="sr-only">Actions</span></th></tr></thead><tbody>
        {visible.map((collection) => {
          const collectionRentals = collection.rentalIds.map((id) => rentals.find((rental) => rental.id === id)).filter(Boolean);
          return <tr key={collection.id}><td data-label="Name"><span className="collection-name-cell"><span className="collection-folder"><Icon name="court" size={17}/></span><strong>{collection.name}</strong></span></td><td data-label="Category">{collection.category}</td><td data-label="Services"><div className="collection-service-chips">{collectionRentals.map((rental) => <span key={rental.id}>{rental.name}</span>)}{collectionRentals.length === 0 && <span className="no-collection-items">No rentals added</span>}</div></td><td data-label="Actions"><div className="collection-row-actions"><button className="collection-action" aria-label={`Copy ${collection.name} link`} title="Copy collection link" onClick={() => shareCollection(collection)}><Icon name="link" size={16}/></button><button className="collection-action collection-menu-trigger" aria-label={`More options for ${collection.name}`} onClick={() => setOpenMenu(openMenu === collection.id ? null : collection.id)}>···</button>{openMenu === collection.id && <div className="collection-action-menu"><button onClick={() => { setModal(collection); setOpenMenu(null); }}>Edit collection</button><button className="delete-option" onClick={() => { setCollections((current) => current.filter((item) => item.id !== collection.id)); setOpenMenu(null); onToast(`${collection.name} deleted.`); }}>Delete collection</button></div>}</div></td></tr>;
        })}
        {!visible.length && <tr><td colSpan="4"><div className="collection-empty"><strong>No collections found</strong><p>{collections.length ? "Try a different search." : "Create a collection to group your rentals."}</p></div></td></tr>}
      </tbody></table></div>
    </section>
    {modal !== null && <CollectionModal key={modal.id || "new-collection"} collection={modal.id ? modal : null} rentals={rentals} onClose={() => setModal(null)} onSave={saveCollection}/>}
    {showSuggestions && <CollectionSuggestions existing={collections} rentals={rentals} onClose={() => setShowSuggestions(false)} onCreate={(collection) => { saveCollection({ ...collection, id: `collection-${Date.now()}` }); setShowSuggestions(false); }}/>}
  </section>;
}

function ServicesManager({ services, memberships, setMemberships, packages, setPackages, rentals, setRentals, collections, setCollections, campaigns, setCampaigns, customers, rooms, equipment, schedules, onToast, section, setSection }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const [offerModal, setOfferModal] = useState(null);
  const [rentalModal, setRentalModal] = useState(null);
  useEffect(() => { setQuery(""); setFilter("All"); }, [section]);
  const isMemberships = section === "Membership plans";
  const isRentals = section === "Rentals";
  const isCollections = section === "Collections";
  const isCampaigns = section === "Campaigns";
  const offers = isMemberships ? memberships : packages;
  const setOffers = isMemberships ? setMemberships : setPackages;
  const kind = section === "Membership plans" ? "membership" : "package";
  const activeCount = offers.filter((item) => item.active).length;
  const activeRentalCount = rentals.filter((item) => item.active).length;
  const filteredOffers = offers.filter((item) => item.name.toLowerCase().includes(query.toLowerCase()) && (filter === "All" || (filter === "Active" ? item.active : !item.active)));
  const filteredRentals = rentals.filter((item) => [item.name, item.description, item.category].join(" ").toLowerCase().includes(query.toLowerCase()) && (filter === "All" || (filter === "Active" ? item.active : !item.active)));
  const saveOffer = (offer) => {
    setOffers((current) => current.some((item) => item.id === offer.id) ? current.map((item) => item.id === offer.id ? offer : item) : [offer, ...current]);
    setOfferModal(null);
    onToast(`${offer.name} saved.`);
  };
  const toggleOffer = (offer) => {
    setOffers((current) => current.map((item) => item.id === offer.id ? { ...item, active: !item.active } : item));
    onToast(`${offer.name} is now ${offer.active ? "inactive" : "active"}.`);
  };
  const persistRentals = (nextRentals, nextCollections, setError) => {
    try {
      const previousRentals = localStorage.getItem("crickhub-rentals-v1");
      localStorage.setItem("crickhub-rentals-v1", JSON.stringify(nextRentals));
      try { localStorage.setItem("crickhub-collections-v1", JSON.stringify(nextCollections)); }
      catch (error) {
        try { if (previousRentals === null) localStorage.removeItem("crickhub-rentals-v1"); else localStorage.setItem("crickhub-rentals-v1", previousRentals); }
        catch (rollbackError) { console.error("Could not restore rentals after a failed save", rollbackError); }
        throw error;
      }
    } catch (error) {
      console.error("Could not update rentals", error);
      setError("Could not update the rental on this device. Check available storage and try again.");
      return false;
    }
    setRentals(nextRentals);
    setCollections(nextCollections);
    return true;
  };
  const saveRental = (rental, collectionId, initialCollection, setError) => {
    const nextRentals = rentals.some((item) => item.id === rental.id) ? rentals.map((item) => item.id === rental.id ? rental : item) : [rental, ...rentals];
    const nextCollections = collectionId === initialCollection ? collections : collections.map((item) => ({ ...item, rentalIds: item.id === collectionId ? [...item.rentalIds.filter((id) => id !== rental.id), rental.id] : item.rentalIds.filter((id) => id !== rental.id) }));
    if (!persistRentals(nextRentals, nextCollections, setError)) return;
    setRentalModal(null);
    onToast(`${rental.name} saved to rentals.`);
  };
  const deleteRental = (rental, setError) => {
    if (campaigns.some((campaign) => (campaign.serviceIds || []).includes(rental.id))) {
      setError("This rental is used by a campaign and cannot be deleted while campaign editing is unavailable.");
      return;
    }
    const nextRentals = rentals.filter((item) => item.id !== rental.id);
    const nextCollections = collections.map((item) => ({ ...item, rentalIds: item.rentalIds.filter((id) => id !== rental.id) }));
    if (!persistRentals(nextRentals, nextCollections, setError)) return;
    setRentalModal(null);
    onToast(`${rental.name} deleted.`);
  };
  const toggleRental = (rental) => {
    setRentals((current) => current.map((item) => item.id === rental.id ? { ...item, active: !item.active } : item));
    onToast(`${rental.name} is now ${rental.active ? "inactive" : "active"}.`);
  };
  if (rentalModal && isRentals) return <RentalEditor key={rentalModal.rental?.id || "new-rental"} rental={rentalModal.rental} collections={collections} rooms={rooms} equipment={equipment} schedules={schedules} memberships={memberships} onClose={() => setRentalModal(null)} onSave={saveRental} onDelete={deleteRental}/>;
  return <section className="admin-services">
    {!isCollections && <div className="service-section-tabs" role="tablist" aria-label="Services and offers">
      {["Rentals", "Membership plans", "Campaigns"].map((item) => {
        const count = item === "Rentals" ? rentals.length : item === "Membership plans" ? memberships.length : campaigns.length;
        return <button key={item} role="tab" aria-selected={section === item} className={section === item ? "selected" : ""} onClick={() => { setSection(item); setQuery(""); setFilter("All"); }}>{item}<span>{count}</span></button>;
      })}
    </div>}
    {isCollections ? <CollectionsManager collections={collections} setCollections={setCollections} rentals={rentals} onToast={onToast}/> :
    isCampaigns ? <MarketingPage campaigns={campaigns} setCampaigns={setCampaigns} onToast={onToast} services={services} rentals={rentals} memberships={memberships} packages={packages} customers={customers}/> : <>
    <div className="service-toolbar">
      <span><b>{isRentals ? rentals.length : offers.length}</b> {section.toLowerCase()} <i /> <b>{isRentals ? activeRentalCount : activeCount}</b> active</span>
      <div>
        <label className="admin-search"><Icon name="search" size={17} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={`Search ${section.toLowerCase()}...`} /></label>
        <button className="admin-button primary" onClick={() => isRentals ? setRentalModal({}) : setOfferModal({ kind })}><Icon name="plus" size={16} /> Add {isRentals ? "rental" : isMemberships ? "plan" : "package"}</button>
      </div>
    </div>
    <div className="service-filter-tabs">{["All", "Active", "Inactive"].map((item) => {
      const count = isRentals ? rentals.filter((rental) => item === "All" || (item === "Active" ? rental.active : !rental.active)).length : offers.filter((offer) => item === "All" || (item === "Active" ? offer.active : !offer.active)).length;
      return <button key={item} className={filter === item ? "chosen" : ""} onClick={() => setFilter(item)}>{item} <span>{count}</span></button>;
    })}</div>
    {isRentals ? <>
      <div className="offer-intro rental-intro"><div><h2>Equipment for every innings.</h2><p>Manage rentable cricket gear, training equipment, and rates.</p></div><span className="offer-intro-icon rental-intro-icon"><Icon name="court" size={22}/></span></div>
      <div className="admin-service-grid offer-grid">{filteredRentals.map((rental) => <RentalCard key={rental.id} rental={rental} onEdit={() => setRentalModal({ rental })} onToggle={() => toggleRental(rental)}/>)}</div>
      {!filteredRentals.length && <div className="no-services">No rentals match. Try another search or add a rental.</div>}
    </> : <>
      <div className="offer-intro"><div><h2>{section === "Membership plans" ? "A place for every player." : "More practice. Better value."}</h2><p>{section === "Membership plans" ? "Build player loyalty with recurring plans and member-only benefits." : "Bundle lane time into prepaid session packs players can use at their own pace."}</p></div><span className={`offer-intro-icon ${kind}`}><Icon name={kind === "membership" ? "people" : "court"} size={22} /></span></div>
      <div className="admin-service-grid offer-grid">{filteredOffers.map((offer) => <OfferCard key={offer.id} offer={offer} kind={kind} onEdit={() => setOfferModal({ kind, offer })} onToggle={() => toggleOffer(offer)} />)}</div>
      {!filteredOffers.length && <div className="no-services">No {section.toLowerCase()} match. Try another search or create one.</div>}
    </>}
    {offerModal && <OfferModal key={offerModal.offer?.id || offerModal.kind} kind={offerModal.kind} offer={offerModal.offer} onClose={() => setOfferModal(null)} onSave={saveOffer} />}
    </>}
  </section>;
}

const calendarResources = {
  Rooms: ["Indoor Lane 1", "Indoor Lane 2", "Indoor Lane 3", "Indoor Lane 4", "Indoor Lane 5", "Outdoor Lane 1", "Outdoor Lane 2", "Outdoor Lane 3"],
  Staff: ["Marcus Johnson", "Priya Sharma", "Sam Williams"],
  Equipment: ["Bowling machine", "Video analysis kit", "Cricket gear set"]
};
const isoDate = (date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
const calendarDay = (iso) => new Date(`${iso}T12:00:00`);
const shortDate = (date) => date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
const minuteTime = (minute) => `${String(Math.floor(minute / 60)).padStart(2, "0")}:${String(minute % 60).padStart(2, "0")}`;

function CalendarPage({ bookings, onNewBooking }) {
  const [date, setDate] = useState(todayISO());
  const [period, setPeriod] = useState("Day");
  const [resourceType, setResourceType] = useState("Rooms");
  const [statusFilter, setStatusFilter] = useState("All statuses");
  const baseDate = calendarDay(date);
  const weekStart = new Date(baseDate);
  weekStart.setDate(baseDate.getDate() - ((baseDate.getDay() + 6) % 7));
  const days = period === "Day" ? [baseDate] : Array.from({ length: 7 }, (_, index) => {
    const day = new Date(weekStart);
    day.setDate(weekStart.getDate() + index);
    return day;
  });
  const resources = period === "Week" ? days.map(shortDate) : resourceType === "Rooms" ? calendarResources.Rooms : resourceType === "Staff" ? Array.from(new Set([...calendarResources.Staff, ...bookings.map((booking) => booking.coach).filter(Boolean)])) : calendarResources.Equipment;
  const firstHour = 7;
  const finalHour = 23;
  const rowHeight = 34;
  const timelineHeight = (finalHour - firstHour) * 2 * rowHeight;
  const timeRows = Array.from({ length: (finalHour - firstHour) * 2 }, (_, index) => firstHour * 60 + index * 30);
  const bookingsFor = (day, resource) => bookings.filter((booking) => {
    if ((booking.date || todayISO()) !== isoDate(day)) return false;
    if (statusFilter !== "All statuses" && booking.status !== statusFilter) return false;
    if (resourceType === "Rooms" && period === "Week") return true;
    if (resourceType === "Rooms") {
      const normalizeLane = (lane) => lane.toLowerCase().replace(/^indoor /, "").replace(/\d+/, (number) => String(Number(number)));
      return normalizeLane(booking.lane) === normalizeLane(resource);
    }
    if (resourceType === "Staff") return period === "Week" ? Boolean(booking.coach && booking.coach !== "To be assigned") : booking.coach === resource;
    if (resourceType === "Equipment") return booking.equipment === resource;
    return false;
  });
  const shiftDate = (amount) => {
    const next = new Date(baseDate);
    next.setDate(next.getDate() + amount * (period === "Week" ? 7 : 1));
    setDate(isoDate(next));
  };
  const calendarTitle = period === "Day" ? baseDate.toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric", year: "numeric" }) : `${shortDate(weekStart)} – ${shortDate(days[6])}`;
  const makeEvent = (booking, day, resource) => {
    const start = clockMinutes(booking.time) ?? firstHour * 60;
    const end = clockMinutes(booking.end) ?? start + 60;
    const top = Math.max(0, (start - firstHour * 60) / 30 * rowHeight);
    const height = Math.max(28, (end - start) / 30 * rowHeight - 3);
    const eventResource = resourceType === "Staff" ? booking.coach : resourceType === "Equipment" ? booking.equipment : booking.lane;
    return <article className={`calendar-event ${booking.color || "green"}`} key={`${booking.name}-${booking.time}`} style={{ top, height }}>
      <strong>{booking.name}</strong><span>{booking.session}</span><small>{booking.time} · {eventResource || booking.lane}</small>
    </article>;
  };
  return <section className="calendar-page">
    <div className="calendar-toolbar">
      <div className="calendar-nav"><button onClick={() => setDate(todayISO())}>Today</button><button aria-label="Previous date range" onClick={() => shiftDate(-1)}>Back</button><button aria-label="Next date range" onClick={() => shiftDate(1)}>Next</button></div>
      <label className="calendar-date-picker"><span>{calendarTitle}</span><input aria-label="Choose calendar date" type="date" value={date} onChange={(event) => event.target.value && setDate(event.target.value)}/></label>
      <div className="calendar-options">
        <div className="calendar-segment" aria-label="Resource type">{["Rooms", "Staff", "Equipment"].map((type) => <button key={type} className={resourceType === type ? "selected" : ""} onClick={() => setResourceType(type)}>{type}</button>)}</div>
        <div className="calendar-segment" aria-label="Calendar period">{["Day", "Week"].map((type) => <button key={type} className={period === type ? "selected" : ""} onClick={() => setPeriod(type)}>{type}</button>)}</div>
        <select aria-label="Filter bookings by status" value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}><option>All statuses</option><option>Confirmed</option><option>Checked in</option><option>Pending</option></select>
      </div>
    </div>
    <div className="calendar-help"><span><i className="calendar-legend-dot"/> Booked</span><span>Choose a time slot to add a booking</span><button className="admin-button primary" onClick={() => onNewBooking({ date, lane: "Lane 01", time: "09:00" })}><Icon name="plus" size={15}/> New booking</button></div>
    <div className={`calendar-grid-scroll ${period === "Week" ? "week-calendar" : ""}`}>
      <div className="calendar-grid" style={{ "--resource-count": resources.length }}>
        <div className="calendar-corner">{period === "Week" ? "TIME" : "TIME"}</div>
        {resources.map((resource, index) => {
          const day = period === "Week" ? days[index] : days[0];
          const bookingsToShow = bookingsFor(day, resource);
          return           <div className="calendar-resource-heading" key={`${resource}-${index}`}><strong>{period === "Week" ? shortDate(day) : resource}</strong>{period === "Week" && <small>{bookings.filter((booking) => (booking.date || todayISO()) === isoDate(day)).length} bookings</small>}</div>;
        })}
        <div className="calendar-time-axis" style={{ height: timelineHeight }}>{timeRows.map((minute) => <div className="calendar-time-label" style={{ top: (minute - firstHour * 60) / 30 * rowHeight }} key={minute}>{displayTime(minuteTime(minute))}</div>)}</div>
        {resources.map((resource, index) => {
          const day = period === "Week" ? days[index] : days[0];
          const bookingsToShow = bookingsFor(day, resource);
          return <div className="calendar-resource-column" style={{ height: timelineHeight }} key={`${resource}-${index}-column`}>
            {timeRows.map((minute) => <button className="calendar-slot" key={minute} aria-label={`Create booking ${resource} ${displayTime(minuteTime(minute))}`} style={{ top: (minute - firstHour * 60) / 30 * rowHeight }} onClick={() => onNewBooking({ date: isoDate(day), lane: period === "Week" || resourceType !== "Rooms" ? "Lane 01" : resource.replace("Indoor ", "").replace(/Lane (\d+)/, (_, number) => `Lane ${String(number).padStart(2, "0")}`), coach: period === "Day" && resourceType === "Staff" ? resource : "To be assigned", equipment: period === "Day" && resourceType === "Equipment" ? resource : "", time: minuteTime(minute) })}/>)}
            {bookingsToShow.map((booking) => makeEvent(booking, day, resource))}
          </div>;
        })}
      </div>
    </div>
  </section>;
}

function CustomerModal({ customer, onClose, onSave }) {
  const [name, setName] = useState(customer?.name || "");
  const [email, setEmail] = useState(customer?.email || "");
  const [phone, setPhone] = useState(customer?.phone || "");
  const [notes, setNotes] = useState(customer?.notes || "");
  return <div className="modal-scrim" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}><form className="admin-modal" onSubmit={(event) => { event.preventDefault(); onSave({ id: customer?.id || `customer-${Date.now()}`, name: name.trim(), email: email.trim(), phone: phone.trim(), notes: notes.trim() }); }}>
    <button type="button" className="modal-x" onClick={onClose} aria-label="Close">×</button><span className="admin-kicker">CUSTOMER PROFILE</span><h2>{customer ? "Edit customer" : "Add customer"}</h2><p>Keep contact details and notes together for your team.</p>
    <label>Full name<input required value={name} onChange={(event) => setName(event.target.value)} placeholder="e.g. Jordan Lee"/></label>
    <label>Email address<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="player@example.com"/></label>
    <label>Phone number<input type="tel" value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="(555) 123-4567"/></label>
    <label>Notes<textarea rows="3" value={notes} onChange={(event) => setNotes(event.target.value)} placeholder="Membership, preferences, or other details"/></label>
    <div className="modal-actions"><button className="admin-button secondary" type="button" onClick={onClose}>Cancel</button><button className="admin-button primary" type="submit">Save customer <Icon name="arrow" size={16}/></button></div>
  </form></div>;
}

function CustomersPage({ customers, setCustomers, bookings, onToast }) {
  const [query, setQuery] = useState("");
  const [modal, setModal] = useState(null);
  const filtered = customers.filter((customer) => `${customer.name} ${customer.email} ${customer.phone} ${customer.notes}`.toLowerCase().includes(query.toLowerCase()));
  const countBookings = (customer) => bookings.filter((booking) => booking.name.toLowerCase() === customer.name.toLowerCase()).length;
  const saveCustomer = (customer) => {
    setCustomers((current) => current.some((item) => item.id === customer.id) ? current.map((item) => item.id === customer.id ? customer : item) : [customer, ...current]);
    setModal(null);
    onToast(`${customer.name} saved.`);
  };
  return <section className="customers-page admin-panel">
    <div className="customer-toolbar"><div><h2>Customers</h2><p>{customers.length} player profiles</p></div><div><label className="customer-search"><Icon name="search" size={17}/><input aria-label="Search customers" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search customers"/></label><button className="admin-button primary" onClick={() => setModal({})}><Icon name="plus" size={16}/> Add customer</button></div></div>
    <div className="customer-table-wrap"><table className="customer-table"><thead><tr><th>Customer</th><th>Contact</th><th>Bookings</th><th>Notes</th><th>Actions</th></tr></thead><tbody>
      {filtered.map((customer) => <tr key={customer.id}><td data-label="Customer"><span className="customer-name"><i>{customer.name.split(/\s+/).map((part) => part[0]).join("").slice(0, 2).toUpperCase()}</i><strong>{customer.name}</strong></span></td><td data-label="Contact"><span className="customer-contact">{customer.email || "No email"}<small>{customer.phone || "No phone"}</small></span></td><td data-label="Bookings">{countBookings(customer)}</td><td data-label="Notes">{customer.notes || "—"}</td><td data-label="Actions"><button className="customer-edit" onClick={() => setModal(customer)}>Edit</button></td></tr>)}
      {!filtered.length && <tr><td colSpan="5"><div className="collection-empty"><strong>No customers found</strong><p>Try a different search or add a customer.</p></div></td></tr>}
    </tbody></table></div>
    {modal !== null && <CustomerModal key={modal.id || "new-customer"} customer={modal.id ? modal : null} onClose={() => setModal(null)} onSave={saveCustomer}/>}
  </section>;
}

function AvailabilityPage({ availability, setAvailability, onToast }) {
  const updateDay = (index, patch) => {
    const currentHours = availability.hours || seedAvailability;
    const nextDay = { ...currentHours[index], ...patch };
    if (nextDay.open && clockMinutes(nextDay.start) >= clockMinutes(nextDay.end)) {
      onToast("Closing time must be later than opening time.");
      return;
    }
    setAvailability((current) => {
      const hours = current.hours || seedAvailability;
      return { ...current, hours: hours.map((item, itemIndex) => itemIndex === index ? nextDay : item) };
    });
  };
  const hours = availability.hours || seedAvailability;
  const blockedDates = availability.blockedDates || [];
  const [newBlockedDate, setNewBlockedDate] = useState("");
  const addBlockedDate = () => {
    if (!newBlockedDate) return;
    if (blockedDates.includes(newBlockedDate)) { onToast("That date is already blocked."); return; }
    setAvailability((current) => ({ ...current, blockedDates: [...(current.blockedDates || []), newBlockedDate].sort() }));
    setNewBlockedDate("");
    onToast("Date blocked from online bookings.");
  };
  return <section className="availability-page">
    <div className="availability-intro"><div><h2>Booking availability</h2><p>Set regular opening hours and dates when your facility is unavailable.</p></div><span><Icon name="clock" size={21}/></span></div>
    <section className="availability-panel admin-panel"><div className="admin-panel-heading"><div><h2>Weekly hours</h2><p>Changes apply to your facility’s booking calendar.</p></div><span className="availability-timezone">Central Time · Plano, TX</span></div>
      <div className="availability-days">{hours.map((item, index) => <div className={`availability-day ${item.open ? "" : "day-closed"}`} key={item.day}><strong>{item.day}</strong><button className={`availability-switch ${item.open ? "enabled" : ""}`} role="switch" aria-checked={item.open} aria-label={`${item.day} availability`} onClick={() => updateDay(index, { open: !item.open })}><i/></button>{item.open ? <div className="availability-time-fields"><label><span className="sr-only">{item.day} opens</span><input type="time" value={item.start} onChange={(event) => updateDay(index, { start: event.target.value })}/></label><span>to</span><label><span className="sr-only">{item.day} closes</span><input type="time" value={item.end} onChange={(event) => updateDay(index, { end: event.target.value })}/></label></div> : <span className="closed-label">Closed</span>}</div>)}</div>
      <div className="blocked-dates"><div><h3>Blocked dates</h3><p>Close online booking for holidays, maintenance, or private events.</p></div><div className="blocked-date-add"><input type="date" aria-label="Date to block" value={newBlockedDate} onChange={(event) => setNewBlockedDate(event.target.value)}/><button className="admin-button secondary" onClick={addBlockedDate}><Icon name="plus" size={15}/> Block date</button></div>
        {blockedDates.length > 0 && <div className="blocked-date-list">{blockedDates.map((date) => <span key={date}>{calendarDay(date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}<button aria-label={`Unblock ${date}`} onClick={() => { setAvailability((current) => ({ ...current, blockedDates: current.blockedDates.filter((item) => item !== date) })); onToast("Date reopened for online bookings."); }}>×</button></span>)}</div>}
      </div>
    </section>
    <p className="availability-saved"><Icon name="check" size={15}/> Availability saves automatically on this device.</p>
  </section>;
}

function CampaignBuilder({ services, rentals, memberships, packages, customers, onClose, onSave }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [discountType, setDiscountType] = useState("Percentage");
  const [amount, setAmount] = useState("");
  const [appliesTo, setAppliesTo] = useState("types");
  const [serviceTypes, setServiceTypes] = useState([]);
  const [serviceTypesOpen, setServiceTypesOpen] = useState(false);
  const [serviceIds, setServiceIds] = useState([]);
  const [duration, setDuration] = useState("Once");
  const [code, setCode] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [eligibility, setEligibility] = useState("all");
  const [customerGroups, setCustomerGroups] = useState([]);
  const [customerIds, setCustomerIds] = useState([]);
  const [limitTotal, setLimitTotal] = useState(false);
  const [totalLimit, setTotalLimit] = useState("");
  const [limitPerCustomer, setLimitPerCustomer] = useState(false);
  const [perCustomerLimit, setPerCustomerLimit] = useState("1");
  const [dateError, setDateError] = useState("");
  const individualServices = [
    ...services.map((item) => ({ id: item.id, name: item.name, type: "Services" })),
    ...rentals.map((item) => ({ id: item.id, name: item.name, type: "Rentals" })),
    ...memberships.map((item) => ({ id: item.id, name: item.name, type: "Membership plans" })),
    ...packages.map((item) => ({ id: item.id, name: item.name, type: "Packages" }))
  ];
  const toggleValue = (setter, current, value) => setter(current.includes(value) ? current.filter((item) => item !== value) : [...current, value]);
  const generateCode = () => {
    const prefix = name.trim().toUpperCase().replace(/[^A-Z0-9]+/g, "").slice(0, 12) || "CRICKHUB";
    setCode(`${prefix}${Math.floor(100 + Math.random() * 900)}`);
  };
  const saveCampaign = (event) => {
    event.preventDefault();
    if (startDate && endDate && endDate < startDate) { setDateError("End date must be on or after the start date."); return; }
    setDateError("");
    onSave({
      id: `campaign-${Date.now()}`, name: name.trim(), description: description.trim(),
      discountType, amount: Number(amount), appliesTo, serviceTypes, serviceIds,
      duration, code: code.trim().toUpperCase(), startDate, endDate,
      eligibility, customerGroups, customerIds, limitTotal,
      totalLimit: limitTotal ? Number(totalLimit) : null,
      limitPerCustomer, perCustomerLimit: limitPerCustomer ? Number(perCustomerLimit) : null,
      status: "Draft", updated: "Just now"
    });
  };
  return <section className="campaign-builder-page">
    <div className="campaign-breadcrumb"><button onClick={onClose}>Campaigns</button><span>/</span><strong>Add Campaign</strong></div>
    <div className="campaign-builder-heading"><div><h2>Add Campaign</h2><p>Create a discount campaign and choose how customers can use it.</p></div><button className="admin-button secondary" onClick={onClose}>Cancel</button></div>
    <form className="campaign-builder-form" onSubmit={saveCampaign}>
      <header className="campaign-details-heading">Campaign Details</header>
      <section className="campaign-form-section">
        <div className="campaign-section-copy"><h3>Basics</h3><p>Set the name and description for this campaign.</p></div>
        <div className="campaign-section-fields">
          <label>Campaign name<input required maxLength="80" value={name} onChange={(event) => setName(event.target.value)} placeholder="e.g. Spring training offer"/></label>
          <label>Description <span className="optional-tag">Optional</span><textarea rows="5" value={description} onChange={(event) => setDescription(event.target.value)} placeholder="Describe this campaign for your team and customers..."/></label>
        </div>
      </section>
      <section className="campaign-form-section">
        <div className="campaign-section-copy"><h3>Discount</h3><p>Choose the discount, what it applies to, and how long it can be used.</p></div>
        <div className="campaign-section-fields">
          <fieldset className="campaign-fieldset"><legend>Type</legend><div className="discount-type-toggle">{["Percentage", "Fixed amount"].map((type) => <button type="button" key={type} className={discountType === type ? "selected" : ""} onClick={() => setDiscountType(type)}>{type}</button>)}</div></fieldset>
          <label className="campaign-amount-field">Amount <span className="amount-input"><input required type="number" min="0.01" step="0.01" max={discountType === "Percentage" ? "100" : undefined} value={amount} onChange={(event) => setAmount(event.target.value)}/><small>{discountType === "Percentage" ? "%" : "$"}</small></span></label>
          <fieldset className="campaign-fieldset"><legend>Applies to</legend><div className="campaign-radio-list">
            <label><input type="radio" name="appliesTo" value="types" checked={appliesTo === "types"} onChange={() => setAppliesTo("types")}/> Types of services</label>
            <label><input type="radio" name="appliesTo" value="individual" checked={appliesTo === "individual"} onChange={() => setAppliesTo("individual")}/> Individual services</label>
          </div></fieldset>
          {appliesTo === "types" ? <fieldset className="campaign-fieldset"><legend>Service types</legend><div className="campaign-service-type-picker">
            <button type="button" className="campaign-service-type-trigger" aria-expanded={serviceTypesOpen} onClick={() => setServiceTypesOpen((open) => !open)}><span>{serviceTypes.length ? serviceTypes.join(", ") : "Add service types"}</span><Icon name="chevronDown" size={16}/></button>
            {serviceTypesOpen && <div className="campaign-service-type-menu">{["Services", "Rentals", "Membership plans", "Packages"].map((type) => <label key={type}><input type="checkbox" checked={serviceTypes.includes(type)} onChange={() => toggleValue(setServiceTypes, serviceTypes, type)}/>{type}</label>)}<button type="button" onClick={() => setServiceTypesOpen(false)}>Done</button></div>}
          </div></fieldset> :
            <fieldset className="campaign-fieldset"><legend>Individual services</legend><div className="campaign-choice-grid individual-service-options">{individualServices.map((item) => <label key={item.id}><input type="checkbox" checked={serviceIds.includes(item.id)} onChange={() => toggleValue(setServiceIds, serviceIds, item.id)}/><span>{item.name}<small>{item.type}</small></span></label>)}</div></fieldset>}
          <label className="campaign-duration">Duration<select value={duration} onChange={(event) => setDuration(event.target.value)}><option>Once</option><option>Until campaign end</option><option>30 days</option><option>90 days</option><option>Forever</option></select><small>For memberships and packages, this determines how long the discount applies after redemption.</small></label>
        </div>
      </section>
      <section className="campaign-form-section">
        <div className="campaign-section-copy"><h3>Code</h3><p>Assign a customer-friendly code for this campaign.</p></div>
        <div className="campaign-section-fields"><label>Campaign code <span className="campaign-code-field"><input required maxLength="24" value={code} onChange={(event) => setCode(event.target.value.toUpperCase().replace(/[^A-Z0-9_-]/g, ""))} placeholder="e.g. SPRING20"/><button type="button" onClick={generateCode}>Generate</button></span></label></div>
      </section>
      <section className="campaign-form-section">
        <div className="campaign-section-copy"><h3>Active dates</h3><p>Set the dates when customers can use this campaign.</p></div>
        <div className="campaign-section-fields campaign-date-fields"><label>Start date<input type="date" value={startDate} onChange={(event) => { setStartDate(event.target.value); setDateError(""); }}/><small>Leave blank to start immediately.</small></label><label>End date<input type="date" value={endDate} min={startDate || undefined} onChange={(event) => { setEndDate(event.target.value); setDateError(""); }}/><small>Leave blank to never expire.</small></label>{dateError && <span className="campaign-error" role="alert">{dateError}</span>}</div>
      </section>
      <section className="campaign-form-section">
        <div className="campaign-section-copy"><h3>Customer eligibility</h3><p>Choose which customers or groups can redeem this campaign.</p></div>
        <div className="campaign-section-fields"><fieldset className="campaign-fieldset"><legend className="sr-only">Customer eligibility</legend><div className="campaign-radio-list">
          {[["all", "All customers"], ["groups", "Specific customer groups"], ["customers", "Specific customers"]].map(([value, label]) => <label key={value}><input type="radio" name="eligibility" value={value} checked={eligibility === value} onChange={() => setEligibility(value)}/>{label}</label>)}
        </div></fieldset>
          {eligibility === "groups" && <fieldset className="campaign-fieldset"><legend>Customer groups</legend><div className="campaign-choice-grid">{["New customers", "Returning players", "Members", "Junior players"].map((group) => <label key={group}><input type="checkbox" checked={customerGroups.includes(group)} onChange={() => toggleValue(setCustomerGroups, customerGroups, group)}/>{group}</label>)}</div></fieldset>}
          {eligibility === "customers" && <fieldset className="campaign-fieldset"><legend>Select customers</legend><div className="campaign-choice-grid individual-service-options">{customers.map((customer) => <label key={customer.id}><input type="checkbox" checked={customerIds.includes(customer.id)} onChange={() => toggleValue(setCustomerIds, customerIds, customer.id)}/><span>{customer.name}<small>{customer.email || "No email on file"}</small></span></label>)}</div></fieldset>}
        </div>
      </section>
      <section className="campaign-form-section usage-section">
        <div className="campaign-section-copy"><h3>Usage limits</h3><p>Limit the total number of redemptions or uses per customer.</p></div>
        <div className="campaign-section-fields">
          <label className="campaign-limit-toggle"><input type="checkbox" checked={limitTotal} onChange={(event) => setLimitTotal(event.target.checked)}/> Limit the number of times this campaign can be used in total</label>
          {limitTotal && <label className="campaign-limit-input">Total uses<input type="number" min="1" step="1" required value={totalLimit} onChange={(event) => setTotalLimit(event.target.value)} placeholder="e.g. 100"/></label>}
          <label className="campaign-limit-toggle"><input type="checkbox" checked={limitPerCustomer} onChange={(event) => setLimitPerCustomer(event.target.checked)}/> Limit the number of times this campaign can be used per customer</label>
          {limitPerCustomer && <label className="campaign-limit-input">Uses per customer<input type="number" min="1" step="1" required value={perCustomerLimit} onChange={(event) => setPerCustomerLimit(event.target.value)}/></label>}
        </div>
      </section>
      <div className="campaign-builder-actions"><button type="button" className="admin-button secondary" onClick={onClose}>Cancel</button><button className="admin-button primary" type="submit">Save campaign <Icon name="arrow" size={16}/></button></div>
    </form>
  </section>;
}

function MarketingPage({ campaigns, setCampaigns, onToast, services, rentals, memberships, packages, customers }) {
  const [creating, setCreating] = useState(false);
  const saveCampaign = (campaign) => {
    setCampaigns((current) => [campaign, ...current]);
    setCreating(false);
    onToast(`${campaign.name} saved as a draft.`);
  };
  const scheduleCampaign = (campaign) => {
    setCampaigns((current) => current.map((item) => item.id === campaign.id ? { ...item, status: "Scheduled", updated: "Scheduled just now" } : item));
    onToast(`${campaign.name} scheduled in this demo.`);
  };
  if (creating) return <CampaignBuilder services={services} rentals={rentals} memberships={memberships} packages={packages} customers={customers} onClose={() => setCreating(false)} onSave={saveCampaign}/>;
  const customerAudience = (campaign) => campaign.eligibility === "groups" ? (campaign.customerGroups || []).join(", ") || "Selected customer groups" : campaign.eligibility === "customers" ? `${(campaign.customerIds || []).length} selected customers` : campaign.audience || "All customers";
  return <section className="marketing-page">
    <div className="marketing-admin-hero"><div><span className="admin-kicker">GROW YOUR CRICKET COMMUNITY</span><h2>Marketing that brings players back.</h2><p>Share discounts and special offers with your players.</p><button className="admin-button primary" onClick={() => setCreating(true)}><Icon name="plus" size={16}/> Create campaign</button></div><span className="marketing-hero-icon"><Icon name="spark" size={28}/></span></div>
    <div className="marketing-metrics"><article><span>Campaigns</span><strong>{campaigns.length}</strong><small>Saved in your workspace</small></article><article><span>Customer audience</span><strong>{customers.length} players</strong><small>Profiles ready for targeting</small></article><article><span>Campaign tools</span><strong>Discount offers</strong><small>Codes, dates, and redemption rules</small></article></div>
    <section className="campaign-panel admin-panel"><div className="admin-panel-heading"><div><h2>Your campaigns</h2><p>Discounts, customer groups, and redemption status.</p></div><button className="inline-link" onClick={() => setCreating(true)}>New campaign <Icon name="arrow" size={15}/></button></div>
      <div className="campaign-list">{campaigns.map((campaign) => <article className="campaign-row" key={campaign.id}><span className="campaign-icon"><Icon name="spark" size={18}/></span><div className="campaign-name"><strong>{campaign.name}</strong><small>{customerAudience(campaign)} · {campaign.code || campaign.updated}</small></div>{campaign.code && <span className="campaign-code-chip">{campaign.discountType === "Percentage" ? `${campaign.amount}%` : `$${campaign.amount}`} · {campaign.code}</span>}<span className={`campaign-status ${campaign.status.toLowerCase()}`}>{campaign.status}</span><button className="admin-button secondary" disabled={campaign.status === "Scheduled"} onClick={() => scheduleCampaign(campaign)}>{campaign.status === "Scheduled" ? "Scheduled" : "Schedule"}</button></article>)}
      {!campaigns.length && <div className="collection-empty"><strong>No campaigns yet</strong><p>Create a campaign draft to reach your customers.</p></div>}</div>
    </section>
    <p className="marketing-demo-note">Campaign codes and eligibility are saved locally. Redemption and payment processing aren’t connected yet.</p>
  </section>;
}

const settingsGroups = [
  ["Facility", [["Basics", "settings"], ["Rooms", "location"], ["Equipment", "wrench"], ["Schedules", "calendar"]]],
  ["Payments", [["Checkout", "wallet"], ["Taxes & Fees", "percent"]]],
  ["Booking", [["Booking Page", "device"], ["Policies", "file"], ["Registration", "people"], ["Custom Fields", "fields"]]],
  ["People", [["Profile", "people"], ["Staff", "people"], ["Roles & Permissions", "shield"]]],
  ["Platform", [["Plan & Billing", "wallet"], ["Payouts", "wallet"], ["Integrations", "plug"], ["Automations", "spark"], ["Senders", "mail"]]]
];

const defaultFacilityDetails = {
  facilityName: "Your Cricket Facility",
  bookingSlug: "your-cricket-facility",
  publicCalendar: false,
  organizationName: "Your Cricket Facility",
  country: "United States",
  address1: "",
  address2: "",
  city: "Plano",
  state: "Texas",
  zip: "",
  phone: ""
};

function RichTextField({ label, ariaLabel, placeholder, onChange }) {
  const format = (command, value) => document.execCommand(command, false, value);
  const keep = (event) => event.preventDefault();
  const addLink = () => {
    const url = window.prompt("Link URL (https://...)");
    if (url) format("createLink", url);
  };
  return <div className="booking-description-editor-wrap staff-rich-text">
    <div className="booking-editor-toolbar" role="toolbar" aria-label={`${ariaLabel} formatting`}>
      <button type="button" aria-label="Undo" onMouseDown={keep} onClick={() => format("undo")}>↶</button><button type="button" aria-label="Redo" onMouseDown={keep} onClick={() => format("redo")}>↷</button><span/>
      <select aria-label="Text style" defaultValue="p" onMouseDown={keep} onChange={(event) => format("formatBlock", event.target.value)}><option value="p">Normal</option><option value="h2">Heading</option><option value="h3">Subheading</option></select><span/>
      <button type="button" aria-label="Bold" onMouseDown={keep} onClick={() => format("bold")}><strong>B</strong></button><button type="button" aria-label="Italic" onMouseDown={keep} onClick={() => format("italic")}><em>I</em></button><button type="button" aria-label="Underline" onMouseDown={keep} onClick={() => format("underline")}><u>U</u></button><button type="button" aria-label="Strikethrough" onMouseDown={keep} onClick={() => format("strikeThrough")}><s>S</s></button><button type="button" aria-label="Link" onMouseDown={keep} onClick={addLink}>🔗</button><span/>
      <button type="button" aria-label="Align left" onMouseDown={keep} onClick={() => format("justifyLeft")}>≡</button><button type="button" aria-label="Align center" onMouseDown={keep} onClick={() => format("justifyCenter")}>≡</button><button type="button" aria-label="Align right" onMouseDown={keep} onClick={() => format("justifyRight")}>≡</button><button type="button" aria-label="Justify" onMouseDown={keep} onClick={() => format("justifyFull")}>≡</button>
    </div>
    <div className="booking-description-editor" contentEditable suppressContentEditableWarning role="textbox" aria-label={label} aria-multiline="true" data-placeholder={placeholder} onInput={(event) => onChange(event.currentTarget.innerHTML)}/>
  </div>;
}

const staffRoleDefinitions = [["Owner", "All"], ["Admin", "All"], ["Staff", "Limited"], ["Instructor", "Limited"]];
const staffRoles = staffRoleDefinitions.map(([name]) => name);

const perm = (label, children = []) => ({ label, children });
const crudPermissions = (noun) => perm(`View ${noun}`, ["Add", "Edit", "Delete"].map((action) => perm(`${action} ${noun}`)));
const availabilityPermissions = ["View", "Add", "Edit", "Delete"].map((action) => perm(`${action} availability for any staff member`, [perm(`${action} availability for their own account`)]));
const rawPermissionColumns = [
  [
    ["Rentals", [crudPermissions("rentals")]],
    ["Lessons", [crudPermissions("lessons")]],
    ["Camps", [crudPermissions("camps")]],
    ["Classes", [crudPermissions("classes")]],
    ["Memberships", [crudPermissions("memberships")]],
    ["Packages", [crudPermissions("packages")]],
    ["Collections", [crudPermissions("collections")]],
    ["Calendar", [perm("View calendar", [perm("Add bookings"), perm("Edit bookings"), perm("Delete bookings"), ...availabilityPermissions])]],
    ["Customers", [perm("View customers", [perm("Add customers"), perm("Edit customers"), perm("Charge and refund customers", [perm("Add custom billing options"), perm("Edit custom billing options"), perm("Delete custom billing options"), perm("Create invoices"), perm("Manage wallet balance")]), perm("Assign packages to customers"), perm("Assign memberships to customers"), perm("Delete customers")])]],
    ["Equipment", [crudPermissions("equipment")]]
  ],
  [
    ["Marketing", [perm("View marketing", [perm("View coupons", [perm("Add coupons"), perm("Edit coupons"), perm("Delete coupons")]), perm("View gift cards"), perm("View email blasts", [perm("Manage email blasts")])])]],
    ["Retail", [perm("Sell products"), perm("Manage products"), perm("Manage categories")]],
    ["Reports", [perm("View reports", ["bookings", "occupancy", "customer", "payroll", "revenue", "unpaid registrations", "invoices", "wallet", "customer credits", "memberships"].map((name) => perm(`View ${name} report`)))]],
    ["Facility Settings", [perm("View facility settings", [perm("Edit facility details")]), crudPermissions("rooms"), crudPermissions("schedules")]],
    ["Booking Settings", [perm("View booking page settings", [perm("Edit booking page settings")]), perm("View policies", [perm("Edit policies")]), perm("View registration settings", [perm("Edit registration settings")]), perm("View custom fields", [perm("Edit custom fields")]), perm("View checkout settings", [perm("Edit checkout settings")]), perm("View taxes & fees", [perm("Manage taxes"), perm("Manage custom fees")])]],
    ["People Settings", [crudPermissions("staff"), perm("View roles & permissions", [perm("Edit roles & permissions")])]],
    ["Platform Settings", [perm("View plan & billing page", [perm("Change plan")]), perm("View payouts page"), perm("View integrations page"), perm("Edit automations"), perm("View senders", [perm("Add senders"), perm("Edit senders"), perm("Delete senders")])]]
  ]
];
const withPermissionIds = (node, parentId) => {
  const id = `${parentId}/${node.label}`;
  return { ...node, id, children: node.children.map((child) => withPermissionIds(child, id)) };
};
const permissionColumns = rawPermissionColumns.map((column) => column.map(([group, nodes]) => ({ group, nodes: nodes.map((node) => withPermissionIds(node, group)) })));
const collectPermissionIds = (node) => [node.id, ...node.children.flatMap(collectPermissionIds)];
const allPermissionIds = permissionColumns.flat().flatMap((section) => section.nodes.flatMap(collectPermissionIds));
const limitedPermissionIds = permissionColumns[0].flatMap((section) => section.nodes.map((node) => node.id));
const defaultRolePermissions = { Admin: allPermissionIds, Staff: limitedPermissionIds, Instructor: limitedPermissionIds };

function PermissionNode({ node, ancestors, checked, disabled, onToggle }) {
  return <div className="permission-node">
    <label><input type="checkbox" checked={checked.has(node.id)} disabled={disabled} onChange={(event) => onToggle(node, ancestors, event.target.checked)}/>{node.label}</label>
    {node.children.length > 0 && <div className="permission-children">{node.children.map((child) => <PermissionNode key={child.id} node={child} ancestors={[...ancestors, node]} checked={checked} disabled={disabled} onToggle={onToggle}/>)}</div>}
  </div>;
}
const staffColors = ["#3274b5", "#2e9d6a", "#d98324", "#c0392b", "#8e5bb5", "#d1578f", "#4b5563", "#b8a21c"];
const emptyStaff = { firstName: "", lastName: "", email: "", countryCode: "+1", phone: "", role: "", bio: "", notes: "", color: staffColors[0], photo: "" };
const defaultStaff = [{ id: "staff-owner", firstName: "Facility", lastName: "Owner", email: "", countryCode: "+1", phone: "", role: "Owner", bio: "", notes: "", color: staffColors[0], photo: "", active: true }];

const automationOrder = ["reminderEmails", "confirmationEmails", "reminderTexts", "confirmationTexts"];
const defaultAutomations = {
  reminderEmails: { title: "Booking Reminder Emails", description: "Reminder emails are sent to customers 24h before their booking", active: true, subject: "Reminder: your booking is tomorrow", body: "Hi, this is a reminder that your booking is coming up in 24 hours. We look forward to seeing you!" },
  confirmationEmails: { title: "Booking Confirmation Emails", description: "Confirmation emails are sent to customers immediately after they make a booking", active: true, subject: "Your booking is confirmed", body: "Hi, thanks for booking with us. Your booking is confirmed." },
  reminderTexts: { title: "Booking Reminder Texts", description: "Reminder texts are sent to customers 24h before their booking", active: true },
  confirmationTexts: { title: "Booking Confirmation Texts", description: "Confirmation texts are sent to customers immediately after they make a booking", active: true }
};

const emptySender = { nickname: "", fromName: "", fromEmail: "", replyTo: "", address1: "", address2: "", city: "", state: "", country: "", zip: "" };
const defaultSenders = [];

function SettingsPage({ selected, onSelect, onBack, onHome, onUpgradeLogin, facilityDetails, onSave, rooms, setRooms, equipment, setEquipment, schedules, setSchedules, services, rentals = [], memberships = [], campaigns = [], collections = [], onToast }) {
  const [draft, setDraft] = useState(facilityDetails);
  const [checkoutDraft, setCheckoutDraft] = useState(() => safeRead("crickhub-checkout-settings-v1", { reservePayInPerson: true, reservePayOnline: true, deviceName: "" }));
  const [checkoutMessage, setCheckoutMessage] = useState("");
  const [taxDraft, setTaxDraft] = useState(() => {
    const saved = safeRead("crickhub-tax-fees-v1", null);
    return saved && Array.isArray(saved.taxRates) && Array.isArray(saved.customFees) ? saved : {
      taxRates: [{ id: "tax-sales", name: "Sales Tax", percentage: "8.25", taxId: "" }],
      customFees: [{ id: "fee-convenience", name: "Convenience Fee", amount: "0.00" }]
    };
  });
  const [taxMessage, setTaxMessage] = useState("");
  const [expandedTaxRows, setExpandedTaxRows] = useState({ "tax-sales": true, "fee-convenience": true });
  const [openTaxMenu, setOpenTaxMenu] = useState("");
  const [bookingPageDraft, setBookingPageDraft] = useState(() => {
    const saved = safeRead("crickhub-booking-page-v1", {
      logo: "",
      banners: [],
      description: "",
      serviceCategories: [],
      social: { website: "", instagram: "", facebook: "", tiktok: "", x: "" }
    });
    return { ...saved, serviceCategories: Array.isArray(saved.serviceCategories) ? saved.serviceCategories : [] };
  });
  const bookingServiceContents = {
    rentals: rentals.filter((item) => item.active).map((item) => item.name),
    memberships: memberships.filter((item) => item.active).map((item) => item.name),
    campaigns: campaigns.map((item) => item.name),
    collections: collections.map((item) => item.name)
  };
  const bookingServiceItems = [{ id: "rentals", name: "Rentals" }, { id: "memberships", name: "Membership plans" }, { id: "campaigns", name: "Campaigns" }, { id: "collections", name: "Collections" }].filter((item) => bookingServiceContents[item.id].length > 0);
  const savedServiceCategories = bookingPageDraft.serviceCategories.filter((category) => bookingServiceItems.some((item) => item.id === category.id));
  const displayServiceCategories = [...savedServiceCategories, ...bookingServiceItems.filter((item) => !savedServiceCategories.some((category) => category.id === item.id))];
  const [bookingPageMessage, setBookingPageMessage] = useState("");
  const [socialMessage, setSocialMessage] = useState("");
  const [websiteMessage, setWebsiteMessage] = useState("");
  const [editingServiceCategory, setEditingServiceCategory] = useState("");
  const [serviceCategoryDraft, setServiceCategoryDraft] = useState("");
  const [draggingCategory, setDraggingCategory] = useState("");
  const [policyDraft, setPolicyDraft] = useState(() => {
    const defaults = {
      cancellationEnabled: true,
      cancellationHours: "1",
      refundToWallet: false,
      waiverEnabled: false,
      waiver: null,
      staffCollectsWaiver: false,
      slotIncrement: "30",
      checkInEnabled: true,
      checkInConfig: { opensAt: "60", notifyParticipants: true }
    };
    const saved = safeRead("crickhub-policies-v1", {});
    return { ...defaults, ...saved, checkInConfig: { ...defaults.checkInConfig, ...(saved.checkInConfig || {}) } };
  });
  const [policyMessage, setPolicyMessage] = useState("");
  const [policyModal, setPolicyModal] = useState("");
  const [checkInConfigDraft, setCheckInConfigDraft] = useState({ opensAt: "60", notifyParticipants: true });
  const [registrationDraft, setRegistrationDraft] = useState(() => {
    const defaults = {
      name: { visible: true, required: true },
      gender: { visible: false, required: false },
      dateOfBirth: { visible: false, required: false },
      address: { visible: false, required: false },
      phoneNumber: { visible: true, required: true }
    };
    const saved = safeRead("crickhub-registration-settings-v1", {});
    return Object.fromEntries(Object.entries(defaults).map(([key, value]) => [key, { ...value, ...(saved[key] || {}) }]));
  });
  const [registrationMessage, setRegistrationMessage] = useState("");
  const [profileDraft, setProfileDraft] = useState(() => ({ firstName: "Facility", lastName: "Owner", email: "", ...safeRead("crickhub-profile-v1", {}) }));
  const [profileMessage, setProfileMessage] = useState("");
  const [profileEmailEditing, setProfileEmailEditing] = useState(false);
  const [staffList, setStaffList] = useState(() => safeRead("crickhub-staff-v1", defaultStaff));
  const [staffTab, setStaffTab] = useState("active");
  const [staffSearch, setStaffSearch] = useState("");
  const [staffAdding, setStaffAdding] = useState(false);
  const [staffDraft, setStaffDraft] = useState(emptyStaff);
  const [staffErrors, setStaffErrors] = useState({});
  const [staffFormKey, setStaffFormKey] = useState(0);
  const [staffColorOpen, setStaffColorOpen] = useState(false);
  const [staffMessage, setStaffMessage] = useState("");
  const [rolePermissions, setRolePermissions] = useState(() => ({ ...defaultRolePermissions, ...safeRead("crickhub-role-permissions-v1", {}) }));
  const [roleView, setRoleView] = useState("");
  const [billingPortal, setBillingPortal] = useState(false);
  const [integrations, setIntegrations] = useState(() => safeRead("crickhub-integrations-v1", {}));
  const [automations, setAutomations] = useState(() => ({ ...defaultAutomations, ...safeRead("crickhub-automations-v1", {}) }));
  const [automationEditing, setAutomationEditing] = useState("");
  const [senders, setSenders] = useState(() => safeRead("crickhub-senders-v1", defaultSenders));
  const [senderForm, setSenderForm] = useState(null);
  const [senderErrors, setSenderErrors] = useState({});
  const [senderMessage, setSenderMessage] = useState("");
  const persistSenders = (next) => {
    setSenders(next);
    try { localStorage.setItem("crickhub-senders-v1", JSON.stringify(next)); } catch (error) { console.error("Could not save senders", error); }
  };
  const openSenderForm = (sender) => { setSenderErrors({}); setSenderForm(sender ? { ...sender } : { ...emptySender }); };
  const senderFormComplete = senderForm && ["nickname", "fromName", "fromEmail", "replyTo", "address1", "city", "state", "country", "zip"].every((key) => senderForm[key].trim());
  const saveSender = (event) => {
    event.preventDefault();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const errors = {};
    if (!emailPattern.test(senderForm.fromEmail.trim())) errors.fromEmail = "Enter a valid email address.";
    if (!emailPattern.test(senderForm.replyTo.trim())) errors.replyTo = "Enter a valid email address.";
    setSenderErrors(errors);
    if (Object.keys(errors).length) return;
    const clean = Object.fromEntries(Object.entries(senderForm).map(([key, value]) => [key, typeof value === "string" ? value.trim() : value]));
    if (clean.id) persistSenders(senders.map((item) => item.id === clean.id ? { ...item, ...clean, verified: item.fromEmail === clean.fromEmail ? item.verified : false, active: item.fromEmail === clean.fromEmail ? item.active : false } : item));
    else persistSenders([...senders, { ...clean, id: `sender-${Date.now()}`, verified: false, active: false }]);
    setSenderMessage("");
    setSenderForm(null);
  };
  const [automationDraft, setAutomationDraft] = useState({ subject: "", body: "" });
  const persistAutomations = (next) => {
    setAutomations(next);
    try { localStorage.setItem("crickhub-automations-v1", JSON.stringify(next)); } catch (error) { console.error("Could not save automations", error); }
  };
  const toggleAutomation = (id) => persistAutomations({ ...automations, [id]: { ...automations[id], active: !automations[id].active } });
  const editAutomation = (id) => { setAutomationDraft({ subject: automations[id].subject, body: automations[id].body }); setAutomationEditing(id); };
  const saveAutomation = (event) => {
    event.preventDefault();
    persistAutomations({ ...automations, [automationEditing]: { ...automations[automationEditing], ...automationDraft } });
    setAutomationEditing("");
  };
  const toggleIntegration = (id) => {
    const next = { ...integrations, [id]: !integrations[id] };
    setIntegrations(next);
    try { localStorage.setItem("crickhub-integrations-v1", JSON.stringify(next)); } catch (error) { console.error("Could not save integrations", error); }
  };
  const [roleDraft, setRoleDraft] = useState(new Set());
  const [roleMessage, setRoleMessage] = useState("");
  useEffect(() => { setRoleView(""); }, [selected]);
  const roleLabel = (name) => name === "Owner" || (rolePermissions[name] || []).length >= allPermissionIds.length ? "All" : "Limited";
  const openRole = (name) => { setRoleDraft(new Set(name === "Owner" ? allPermissionIds : rolePermissions[name])); setRoleMessage(""); setRoleView(name); };
  const toggleRolePermission = (node, ancestors, isChecked) => {
    setRoleDraft((current) => {
      const next = new Set(current);
      if (isChecked) [...ancestors, node].forEach((item) => next.add(item.id));
      else collectPermissionIds(node).forEach((id) => next.delete(id));
      return next;
    });
    setRoleMessage("");
  };
  const saveRole = (event) => {
    event.preventDefault();
    if (roleView === "Owner") { setRoleView(""); return; }
    const next = { ...rolePermissions, [roleView]: allPermissionIds.filter((id) => roleDraft.has(id)) };
    try {
      localStorage.setItem("crickhub-role-permissions-v1", JSON.stringify(next));
      setRolePermissions(next);
      setRoleMessage("");
      setRoleView("");
    } catch (error) {
      console.error("Could not save role permissions", error);
      setRoleMessage("Could not save role permissions. Please try again.");
    }
  };
  const [editingSlug, setEditingSlug] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const [copyMessage, setCopyMessage] = useState("");
  const bookingUrl = `https://book.crickhubapp.com/facilities/${draft.bookingSlug}`;
  const updateField = (field, value) => setDraft((current) => ({ ...current, [field]: value }));
  const copyBookingUrl = async () => {
    try {
      await navigator.clipboard.writeText(bookingUrl);
      setCopyMessage("Booking link copied.");
    } catch (error) {
      console.error("Could not copy booking page URL", error);
      setCopyMessage("Could not copy the link. Select and copy it manually.");
    }
  };
  const saveBasics = (event) => {
    event.preventDefault();
    const details = { ...draft, facilityName: draft.facilityName.trim(), bookingSlug: draft.bookingSlug.trim(), organizationName: draft.organizationName.trim() };
    if (!details.facilityName || !details.bookingSlug || !details.organizationName) {
      setSaveMessage("Enter a facility name, booking page URL, and organization name.");
      return;
    }
    if (onSave(details)) setSaveMessage("Facility details saved.");
    else setSaveMessage("Could not save facility details. Please try again.");
  };
  const saveCheckout = (event) => {
    event.preventDefault();
    try {
      localStorage.setItem("crickhub-checkout-settings-v1", JSON.stringify({
        reservePayInPerson: checkoutDraft.reservePayInPerson,
        reservePayOnline: checkoutDraft.reservePayOnline,
        deviceName: checkoutDraft.deviceName.trim()
      }));
      setCheckoutDraft((current) => ({ ...current, deviceName: current.deviceName.trim(), readerCode: "" }));
      setCheckoutMessage("Checkout settings saved.");
    } catch (error) {
      console.error("Could not save checkout settings", error);
      setCheckoutMessage("Could not save checkout settings. Please try again.");
    }
  };
  const saveTaxFees = (event) => {
    event.preventDefault();
    const normalized = {
      taxRates: taxDraft.taxRates.map((tax) => ({ ...tax, name: tax.name.trim(), taxId: tax.taxId.trim() })),
      customFees: taxDraft.customFees.map((fee) => ({ ...fee, name: fee.name.trim() }))
    };
    if (normalized.taxRates.some((tax) => !tax.name || tax.percentage === "" || Number(tax.percentage) < 0 || Number(tax.percentage) > 100)) {
      setTaxMessage("Enter a name and a tax rate between 0 and 100% for each tax rate.");
      return;
    }
    if (normalized.customFees.some((fee) => !fee.name || fee.amount === "" || Number(fee.amount) < 0)) {
      setTaxMessage("Enter a name and a valid amount for each custom fee.");
      return;
    }
    try {
      localStorage.setItem("crickhub-tax-fees-v1", JSON.stringify(normalized));
      setTaxDraft(normalized);
      setTaxMessage("Taxes & fees saved.");
    } catch (error) {
      console.error("Could not save taxes and fees", error);
      setTaxMessage("Could not save taxes and fees. Please try again.");
    }
  };
  const updateTaxRow = (collection, id, field, value) => setTaxDraft((current) => ({
    ...current,
    [collection]: current[collection].map((row) => row.id === id ? { ...row, [field]: value } : row)
  }));
  const addTaxRow = (collection) => {
    const id = `${collection === "taxRates" ? "tax" : "fee"}-${Date.now()}`;
    const row = collection === "taxRates" ? { id, name: "", percentage: "", taxId: "" } : { id, name: "", amount: "" };
    setTaxDraft((current) => ({ ...current, [collection]: [...current[collection], row] }));
    setExpandedTaxRows((current) => ({ ...current, [id]: true }));
  };
  const removeTaxRow = (collection, id) => {
    setTaxDraft((current) => ({ ...current, [collection]: current[collection].filter((row) => row.id !== id) }));
    setOpenTaxMenu("");
  };
  const updateBookingPageField = (field, value) => setBookingPageDraft((current) => ({ ...current, [field]: value }));
  const updateBookingSocial = (field, value) => setBookingPageDraft((current) => ({ ...current, social: { ...current.social, [field]: value } }));
  const openFacilityWebsite = () => {
    const raw = (bookingPageDraft.social.website || "").trim();
    let url = null;
    try { url = new URL(/^https?:\/\//i.test(raw) ? raw : `https://${raw}`); } catch { url = null; }
    if (!raw || !url || !/^https?:$/.test(url.protocol) || !url.hostname.includes(".")) {
      setWebsiteMessage("Enter a valid website URL to use the Home button.");
      return;
    }
    window.open(url.href, "_blank", "noopener,noreferrer");
  };
  const saveBookingPage = (event) => {
    event.preventDefault();
    const editor = document.querySelector(".booking-description-editor");
    const normalized = { ...bookingPageDraft, serviceCategories: displayServiceCategories, description: sanitizeBookingDescription(editor?.innerHTML || bookingPageDraft.description) };
    try {
      localStorage.setItem("crickhub-booking-page-v1", JSON.stringify(normalized));
      setBookingPageDraft(normalized);
      setBookingPageMessage("Booking page settings saved.");
    } catch (error) {
      console.error("Could not save booking page settings", error);
      setBookingPageMessage("Could not save booking page settings. Images may exceed available browser storage.");
    }
  };
  const uploadBookingImage = (field, file) => {
    if (!file) return;
    const allowedTypes = ["image/svg+xml", "image/png", "image/jpeg", "image/webp", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      setBookingPageMessage("Choose an SVG, PNG, JPG, WEBP, or GIF image.");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setBookingPageMessage("Each image must be smaller than 2MB.");
      return;
    }
    setBookingPageMessage("");
    const reader = new FileReader();
    reader.onload = () => {
      const image = { id: `booking-image-${Date.now()}`, name: file.name, data: reader.result };
      setBookingPageDraft((current) => ({ ...current, [field]: field === "banners" ? [...current.banners, image] : image }));
    };
    reader.onerror = () => {
      console.error("Could not read booking page image", reader.error);
      setBookingPageMessage("Could not load this image. Please try another file.");
    };
    reader.readAsDataURL(file);
  };
  const uploadBannerImages = (files) => {
    const remaining = Math.max(0, 10 - bookingPageDraft.banners.length);
    const selected = Array.from(files).slice(0, remaining);
    selected.forEach((file) => uploadBookingImage("banners", file));
    if (selected.length < files.length) setBookingPageMessage("You can add up to 10 banner images.");
  };
  const moveBanner = (fromIndex, toIndex) => setBookingPageDraft((current) => {
    if (toIndex < 0 || toIndex >= current.banners.length || fromIndex === toIndex) return current;
    const banners = [...current.banners];
    const [banner] = banners.splice(fromIndex, 1);
    banners.splice(toIndex, 0, banner);
    return { ...current, banners };
  });
  const updateServiceCategory = (id) => {
    const name = serviceCategoryDraft.trim();
    if (!name) return;
    setBookingPageDraft((current) => ({ ...current, serviceCategories: displayServiceCategories.map((category) => category.id === id ? { ...category, name } : category) }));
    setEditingServiceCategory("");
  };
  const moveServiceCategory = (id, targetId) => setBookingPageDraft((current) => {
    const fromIndex = displayServiceCategories.findIndex((category) => category.id === id);
    const toIndex = displayServiceCategories.findIndex((category) => category.id === targetId);
    if (fromIndex < 0 || toIndex < 0 || fromIndex === toIndex) return current;
    const serviceCategories = [...displayServiceCategories];
    const [category] = serviceCategories.splice(fromIndex, 1);
    serviceCategories.splice(toIndex, 0, category);
    return { ...current, serviceCategories };
  });
  const formatDescription = (command, value) => {
    document.execCommand(command, false, value);
  };
  const updatePolicy = (field, value) => setPolicyDraft((current) => ({ ...current, [field]: value }));
  const savePolicies = (event) => {
    event.preventDefault();
    const cancellationHours = Number(policyDraft.cancellationHours);
    if (!Number.isFinite(cancellationHours) || cancellationHours < 0 || cancellationHours > 720) {
      setPolicyMessage("Enter a cancellation window from 0 to 720 hours.");
      return;
    }
    try {
      localStorage.setItem("crickhub-policies-v1", JSON.stringify(policyDraft));
      setPolicyMessage("Policies saved.");
    } catch (error) {
      console.error("Could not save booking policies", error);
      setPolicyMessage("Could not save policies. The waiver file may exceed available browser storage.");
    }
  };
  const uploadWaiver = (file) => {
    if (!file) return;
    if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
      setPolicyMessage("Upload a PDF waiver document.");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setPolicyMessage("The waiver PDF must be smaller than 2MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      updatePolicy("waiver", { name: file.name, data: reader.result });
      setPolicyMessage("");
    };
    reader.onerror = () => {
      console.error("Could not read liability waiver", reader.error);
      setPolicyMessage("Could not load this waiver. Please try another PDF.");
    };
    reader.readAsDataURL(file);
  };
  const checkInUrl = `https://book.crickhubapp.com/facilities/${draft.bookingSlug}/check-in`;
  const copyCheckInUrl = async () => {
    try {
      await navigator.clipboard.writeText(checkInUrl);
      setPolicyMessage("Check-in link copied.");
    } catch (error) {
      console.error("Could not copy check-in URL", error);
      setPolicyMessage("Could not copy the link. Select and copy it manually.");
    }
  };
  const openCheckInConfig = () => {
    setCheckInConfigDraft({ ...policyDraft.checkInConfig });
    setPolicyModal("configure");
  };
  const applyCheckInConfig = (event) => {
    event.preventDefault();
    updatePolicy("checkInConfig", { ...checkInConfigDraft });
    setPolicyModal("");
  };
  const updateRegistrationField = (field, update) => setRegistrationDraft((current) => ({ ...current, [field]: { ...current[field], ...update } }));
  const saveRegistration = (event) => {
    event.preventDefault();
    try {
      localStorage.setItem("crickhub-registration-settings-v1", JSON.stringify(registrationDraft));
      setRegistrationMessage("Registration settings saved.");
    } catch (error) {
      console.error("Could not save registration settings", error);
      setRegistrationMessage("Could not save registration settings. Please try again.");
    }
  };
  const persistStaff = (next) => {
    try {
      localStorage.setItem("crickhub-staff-v1", JSON.stringify(next));
      setStaffList(next);
      return true;
    } catch (error) {
      console.error("Could not save staff", error);
      return false;
    }
  };
  const updateStaffDraft = (field, value) => { setStaffDraft((current) => ({ ...current, [field]: value })); setStaffErrors((current) => ({ ...current, [field]: "" })); };
  const startAddStaff = () => { setStaffDraft(emptyStaff); setStaffErrors({}); setStaffColorOpen(false); setStaffFormKey((key) => key + 1); setStaffAdding(true); };
  const uploadStaffPhoto = (file) => {
    if (!file) return;
    if (!file.type.startsWith("image/") || file.size > 2 * 1024 * 1024) { setStaffErrors((current) => ({ ...current, photo: "Choose an image under 2MB." })); return; }
    const reader = new FileReader();
    reader.onload = () => updateStaffDraft("photo", String(reader.result));
    reader.readAsDataURL(file);
  };
  const saveStaff = (event) => {
    event.preventDefault();
    const errors = {};
    const email = staffDraft.email.trim();
    if (!staffDraft.firstName.trim()) errors.firstName = "First name is required.";
    if (!staffDraft.lastName.trim()) errors.lastName = "Last name is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Enter a valid email address.";
    else if (staffList.some((member) => member.email.toLowerCase() === email.toLowerCase())) errors.email = "A staff member with this email already exists.";
    if (staffDraft.phone && !/^[\d\s().-]{7,15}$/.test(staffDraft.phone.trim())) errors.phone = "Enter a valid phone number.";
    if (!staffDraft.role) errors.role = "Select a role.";
    setStaffErrors(errors);
    if (Object.keys(errors).length) return;
    const member = { ...staffDraft, id: `staff-${Date.now()}`, firstName: staffDraft.firstName.trim(), lastName: staffDraft.lastName.trim(), email, phone: staffDraft.phone.trim(), bio: sanitizeBookingDescription(staffDraft.bio), notes: sanitizeBookingDescription(staffDraft.notes), active: true };
    if (persistStaff([...staffList, member])) {
      setStaffAdding(false);
      setStaffTab("active");
      setStaffMessage(`${member.firstName} ${member.lastName} added.`);
    } else {
      setStaffErrors({ form: "Could not save staff member. Please try again." });
    }
  };
  const toggleStaffActive = (id) => { persistStaff(staffList.map((member) => member.id === id ? { ...member, active: !member.active } : member)); setStaffMessage(""); };
  const saveProfile = (event) => {
    event.preventDefault();
    const email = profileDraft.email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setProfileMessage("Enter a valid email address.");
      return;
    }
    const next = { ...profileDraft, firstName: profileDraft.firstName.trim(), lastName: profileDraft.lastName.trim(), email };
    try {
      localStorage.setItem("crickhub-profile-v1", JSON.stringify(next));
      setProfileDraft(next);
      setProfileEmailEditing(false);
      setProfileMessage("Profile saved.");
    } catch (error) {
      console.error("Could not save profile", error);
      setProfileMessage("Could not save profile. Please try again.");
    }
  };
  return <div className="settings-page">
    <aside className="settings-navigation">
      <button className="settings-back" onClick={selected === "Booking Page" ? onHome : onBack}><span aria-hidden="true">←</span> Back to app</button>
      <nav aria-label="Settings">
        {settingsGroups.map(([group, items]) => <section className="settings-group" key={group}>
          <h2>{group}</h2>
          {items.map(([item, icon]) => <button key={item} className={selected === item ? "selected" : ""} aria-current={selected === item ? "page" : undefined} onClick={() => onSelect(item)}><Icon name={icon} size={17}/><span>{item}</span></button>)}
        </section>)}
      </nav>
    </aside>
    <main className={`settings-detail ${selected === "Registration" || selected === "Custom Fields" || selected === "Profile" ? "settings-registration-detail" : selected === "Staff" || selected === "Roles & Permissions" || selected === "Plan & Billing" || selected === "Integrations" || selected === "Automations" || selected === "Senders" ? "settings-staff-detail" : selected === "Policies" ? "settings-policies-detail" : selected === "Booking Page" ? "settings-booking-page-detail" : selected === "Taxes & Fees" ? "settings-taxes-detail" : selected === "Checkout" ? "settings-checkout-detail" : selected === "Payouts" ? "settings-payouts-detail" : selected === "Basics" ? "settings-basics-detail" : selected === "Rooms" ? "settings-rooms-detail" : selected === "Equipment" ? "settings-equipment-detail" : selected === "Schedules" ? "settings-schedules-detail" : ""}`}>
      {selected === "Payouts" ? <>
        <h1>Payouts</h1>
        <p className="settings-page-subtitle">View your Stripe payouts dashboard</p>
        <section className="payout-status-card">
          <div className="payout-status-heading"><span className="payout-status-icon"><Icon name="check" size={19}/></span><h2>Stripe account not connected</h2></div>
          <p>Connect Stripe to manage payouts from online bookings. <a href="https://dashboard.stripe.com/" target="_blank" rel="noreferrer">Visit your Stripe dashboard</a></p>
          <small>Stripe connection is not configured in this demo.</small>
        </section>
      </> : selected === "Taxes & Fees" ? <>
        <h1>Taxes &amp; Fees</h1>
        <p className="settings-page-subtitle">Configure tax rates and custom fees for your facility</p>
        <form className="tax-settings-card" noValidate onSubmit={saveTaxFees}>
          <div className="tax-settings-content">
            <section className="tax-settings-section">
              <div className="tax-section-description"><h2>Tax Rates</h2><p>Set up tax rates to charge for products &amp; services at your facility. <a href="https://stripe.com/tax" target="_blank" rel="noreferrer">Learn more</a></p></div>
              <div className="tax-section-controls">
                <h3>Tax Rates</h3>
                {taxDraft.taxRates.map((tax) => <article className="tax-entry" key={tax.id}>
                  <div className="tax-entry-heading">
                    <span>Tax Rate Details</span>
                    <div className="tax-entry-actions">
                      <div className="tax-more-wrap"><button className="tax-more-button" type="button" aria-label={`More options for ${tax.name || "tax rate"}`} aria-expanded={openTaxMenu === tax.id} onClick={() => setOpenTaxMenu((current) => current === tax.id ? "" : tax.id)}>•••</button>{openTaxMenu === tax.id && <div className="tax-entry-menu"><button type="button" onClick={() => removeTaxRow("taxRates", tax.id)}>Remove tax rate</button></div>}</div>
                      <button className="tax-collapse-button" type="button" aria-label={`${expandedTaxRows[tax.id] ? "Collapse" : "Expand"} ${tax.name || "tax rate"} details`} aria-expanded={Boolean(expandedTaxRows[tax.id])} onClick={() => setExpandedTaxRows((current) => ({ ...current, [tax.id]: !current[tax.id] }))}><Icon name="chevronDown" size={18}/></button>
                    </div>
                  </div>
                  {expandedTaxRows[tax.id] && <div className="tax-entry-fields">
                    <label>Name<input required value={tax.name} onChange={(event) => updateTaxRow("taxRates", tax.id, "name", event.target.value)} placeholder="e.g. Sales Tax"/></label>
                    <label className="tax-short-field">Percentage<span className="tax-suffix-input"><input required type="number" min="0" max="100" step="0.01" value={tax.percentage} onChange={(event) => updateTaxRow("taxRates", tax.id, "percentage", event.target.value)} placeholder="0.00"/><span>%</span></span></label>
                    <label className="tax-short-field"><span className="tax-field-label-row"><span>Tax ID</span><span className="optional-field-label">Optional</span></span><input value={tax.taxId} onChange={(event) => updateTaxRow("taxRates", tax.id, "taxId", event.target.value)} placeholder="12-3456789"/></label>
                  </div>}
                </article>)}
                <div className="tax-add-row"><button type="button" onClick={() => addTaxRow("taxRates")}>Add another tax rate</button></div>
              </div>
            </section>
            <section className="tax-settings-section custom-fees-section">
              <div className="tax-section-description"><h2>Custom Fees</h2><p>Set up custom fees to charge for products &amp; services at your facility. <a href="https://stripe.com/pricing" target="_blank" rel="noreferrer">Learn more</a></p></div>
              <div className="tax-section-controls">
                <h3>Custom Fees</h3>
                {taxDraft.customFees.map((fee) => <article className="tax-entry" key={fee.id}>
                  <div className="tax-entry-heading">
                    <span>Custom Fee Details</span>
                    <div className="tax-entry-actions">
                      <div className="tax-more-wrap"><button className="tax-more-button" type="button" aria-label={`More options for ${fee.name || "custom fee"}`} aria-expanded={openTaxMenu === fee.id} onClick={() => setOpenTaxMenu((current) => current === fee.id ? "" : fee.id)}>•••</button>{openTaxMenu === fee.id && <div className="tax-entry-menu"><button type="button" onClick={() => removeTaxRow("customFees", fee.id)}>Remove custom fee</button></div>}</div>
                      <button className="tax-collapse-button" type="button" aria-label={`${expandedTaxRows[fee.id] ? "Collapse" : "Expand"} ${fee.name || "custom fee"} details`} aria-expanded={Boolean(expandedTaxRows[fee.id])} onClick={() => setExpandedTaxRows((current) => ({ ...current, [fee.id]: !current[fee.id] }))}><Icon name="chevronDown" size={18}/></button>
                    </div>
                  </div>
                  {expandedTaxRows[fee.id] && <div className="tax-entry-fields">
                    <label>Name<input required value={fee.name} onChange={(event) => updateTaxRow("customFees", fee.id, "name", event.target.value)} placeholder="e.g. Convenience Fee"/><small>This name will be visible during checkout</small></label>
                    <label className="tax-short-field">Amount<span className="tax-prefix-input"><span>$</span><input required type="number" min="0" step="0.01" value={fee.amount} onChange={(event) => updateTaxRow("customFees", fee.id, "amount", event.target.value)} placeholder="0.00"/></span></label>
                  </div>}
                </article>)}
                <div className="tax-add-row"><button type="button" onClick={() => addTaxRow("customFees")}>Add another custom fee</button></div>
              </div>
            </section>
          </div>
          <div className="tax-settings-actions"><span className="settings-inline-message" role="status">{taxMessage}</span><button className="checkout-save-button" type="submit">Save</button></div>
        </form>
      </> : selected === "Booking Page" ? <>
        <h1>Booking Page</h1>
        <p className="settings-page-subtitle">Configure your public booking page appearance and settings</p>
        <form className="booking-page-card" onSubmit={saveBookingPage}>
          <h2 className="booking-card-title">Appearance</h2>
          <div className="booking-page-content">
            <section className="booking-page-section booking-logo-section">
              <div className="booking-section-description"><h3>Logo</h3><p>Upload a logo for your facility. Image should be square and less than 2MB.</p></div>
              <div className="booking-logo-wrap">
              <div className="booking-logo-controls">
                <div className="booking-logo-preview">{bookingPageDraft.logo?.data ? <img src={bookingPageDraft.logo.data} alt="Facility logo preview"/> : <span>{facilityDetails.facilityName.split(/\s+/).map((word) => word[0]).join("").slice(0, 3)}</span>}</div>
                <label className="booking-upload-button"><Icon name="plus" size={16}/>Upload Logo<input type="file" accept=".svg,.png,.jpg,.jpeg,.webp,.gif,image/svg+xml,image/png,image/jpeg,image/webp,image/gif" onChange={(event) => { uploadBookingImage("logo", event.target.files?.[0]); event.target.value = ""; }}/></label>
                {bookingPageDraft.logo?.data && <button type="button" className="booking-remove-logo" onClick={() => updateBookingPageField("logo", "")}>Remove</button>}
                <button type="button" className="booking-upload-button booking-home-button" onClick={openFacilityWebsite} title={`${facilityDetails.facilityName} website${bookingPageDraft.social.website ? `: ${bookingPageDraft.social.website}` : ""}`}><Icon name="home" size={16}/>Home</button>
              </div>
              <label className="booking-home-url">Home button website URL<input type="url" value={bookingPageDraft.social.website || ""} onChange={(event) => { updateBookingSocial("website", event.target.value); setWebsiteMessage(""); }} placeholder="https://www.example.com/"/></label>
              {websiteMessage && <span className="settings-inline-message" role="status">{websiteMessage}</span>}
              </div>
            </section>
            <section className="booking-page-section booking-banner-section">
              <div className="booking-section-description"><h3>Banner Images</h3><p>Add up to 10 banner images to showcase your facility. Images should be less than 2MB.</p></div>
              <div className="booking-banner-controls">
                <label className="booking-dropzone" onDragOver={(event) => event.preventDefault()} onDrop={(event) => { event.preventDefault(); uploadBannerImages(event.dataTransfer.files); }}>
                  <span className="booking-camera-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M4 7h3l1.5-2h7L17 7h3v12H4z"/><circle cx="12" cy="13" r="3.5"/></svg></span>
                  <strong>Click to upload or drag and drop</strong>
                  <small>SVG, PNG, JPG, WEBP, or GIF (max: 2MB, 16:9 ratio preferred)</small>
                  <input type="file" accept=".svg,.png,.jpg,.jpeg,.webp,.gif,image/svg+xml,image/png,image/jpeg,image/webp,image/gif" multiple onChange={(event) => { uploadBannerImages(Array.from(event.target.files || [])); event.target.value = ""; }}/>
                </label>
                {bookingPageDraft.banners.length > 0 && <div className="booking-banner-list">{bookingPageDraft.banners.map((banner, index) => <article className="booking-banner-item" key={banner.id} draggable onDragStart={() => setDraggingCategory(banner.id)} onDragOver={(event) => event.preventDefault()} onDrop={() => { const fromIndex = bookingPageDraft.banners.findIndex((item) => item.id === draggingCategory); moveBanner(fromIndex, index); setDraggingCategory(""); }}>
                  <span className="booking-drag-handle" aria-label="Drag to reorder banner">⠿</span><img src={banner.data} alt={banner.name}/><div className="booking-banner-actions"><button type="button" aria-label={`Move ${banner.name} up`} disabled={index === 0} onClick={() => moveBanner(index, index - 1)}>↑</button><button type="button" aria-label={`Move ${banner.name} down`} disabled={index === bookingPageDraft.banners.length - 1} onClick={() => moveBanner(index, index + 1)}>↓</button><button type="button" aria-label={`Remove ${banner.name}`} onClick={() => updateBookingPageField("banners", bookingPageDraft.banners.filter((item) => item.id !== banner.id))}>×</button></div>
                </article>)}</div>}
              </div>
            </section>
            <section className="booking-page-section booking-description-section">
              <div className="booking-section-description"><h3>Description</h3><p>Add a description for your facility.</p></div>
              <div className="booking-description-editor-wrap">
                <div className="booking-editor-toolbar" role="toolbar" aria-label="Description formatting">
                  <button type="button" aria-label="Bold" onMouseDown={(event) => event.preventDefault()} onClick={() => formatDescription("bold")}><strong>B</strong></button><button type="button" aria-label="Italic" onMouseDown={(event) => event.preventDefault()} onClick={() => formatDescription("italic")}><em>I</em></button><button type="button" aria-label="Underline" onMouseDown={(event) => event.preventDefault()} onClick={() => formatDescription("underline")}><u>U</u></button><button type="button" aria-label="Strikethrough" onMouseDown={(event) => event.preventDefault()} onClick={() => formatDescription("strikeThrough")}><s>S</s></button><span/>
                  <select aria-label="Text style" defaultValue="p" onMouseDown={(event) => event.preventDefault()} onChange={(event) => formatDescription("formatBlock", event.target.value)}><option value="p">Normal</option><option value="h2">Heading</option><option value="h3">Subheading</option></select>
                  <button type="button" aria-label="Align left" onMouseDown={(event) => event.preventDefault()} onClick={() => formatDescription("justifyLeft")}>≡</button><button type="button" aria-label="Align center" onMouseDown={(event) => event.preventDefault()} onClick={() => formatDescription("justifyCenter")}>≡</button><button type="button" aria-label="Align right" onMouseDown={(event) => event.preventDefault()} onClick={() => formatDescription("justifyRight")}>≡</button>
                </div>
                <div className="booking-description-editor" contentEditable suppressContentEditableWarning role="textbox" aria-label="Facility description" aria-multiline="true" dangerouslySetInnerHTML={{ __html: sanitizeBookingDescription(bookingPageDraft.description) }} onBlur={(event) => updateBookingPageField("description", event.currentTarget.innerHTML)}/>
              </div>
            </section>
            <section className="booking-page-section booking-service-section">
              <div className="booking-section-description"><h3>Service Display</h3><p>Change the order, name, or description of services on your booking page.</p></div>
              <div className="booking-service-list">{displayServiceCategories.map((category, index) => <article className="booking-service-row" key={category.id} draggable onDragStart={() => setDraggingCategory(category.id)} onDragOver={(event) => event.preventDefault()} onDrop={() => { moveServiceCategory(draggingCategory, category.id); setDraggingCategory(""); }}>
                <span className="booking-drag-handle" aria-label="Drag to reorder service category">⠿</span>
                {editingServiceCategory === category.id ? <input aria-label="Service display name" value={serviceCategoryDraft} onChange={(event) => setServiceCategoryDraft(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") updateServiceCategory(category.id); if (event.key === "Escape") setEditingServiceCategory(""); }}/> : <span className="booking-service-name">{category.name}<small className="booking-service-items">{bookingServiceContents[category.id].join(", ")}</small></span>}
                <div className="booking-service-actions">{editingServiceCategory === category.id ? <><button type="button" onClick={() => updateServiceCategory(category.id)}>Save name</button><button type="button" onClick={() => setEditingServiceCategory("")}>Cancel</button></> : <><button type="button" aria-label={`Move ${category.name} up`} disabled={index === 0} onClick={() => moveServiceCategory(category.id, displayServiceCategories[index - 1]?.id)}>↑</button><button type="button" aria-label={`Move ${category.name} down`} disabled={index === displayServiceCategories.length - 1} onClick={() => moveServiceCategory(category.id, displayServiceCategories[index + 1]?.id)}>↓</button><button type="button" aria-label={`Edit ${category.name}`} onClick={() => { setEditingServiceCategory(category.id); setServiceCategoryDraft(category.name); }}><Icon name="edit" size={16}/></button></>}
                </div>
              </article>)}</div>
            </section>
          </div>
          <div className="booking-page-actions"><span className="settings-inline-message" role="status">{bookingPageMessage}</span><button className="checkout-save-button" type="submit">Save</button></div>
        </form>
        <form className="booking-page-card booking-social-card" onSubmit={(event) => { event.preventDefault(); saveBookingPage(event); setSocialMessage("Social links saved."); }}>
          <h2 className="booking-card-title">Social</h2>
          <div className="booking-page-section booking-social-section">
            <div className="booking-section-description"><h3>Links</h3><p>Add social links on your booking page to your website, Instagram, Facebook, TikTok, or X pages</p></div>
            <div className="booking-social-fields">
              {[["website", "Website URL", "https://www.example.com/"], ["instagram", "Instagram Username", "https://instagram.com/username"], ["facebook", "Facebook Username", "https://facebook.com/username"], ["tiktok", "TikTok Username", "https://tiktok.com/@username"], ["x", "X Username", "https://x.com/username"]].map(([field, label, placeholder]) => <label key={field}>{label}<span className="optional-field-label">Optional</span><input type="url" value={bookingPageDraft.social[field] || ""} onChange={(event) => updateBookingSocial(field, event.target.value)} placeholder={placeholder}/></label>)}
            </div>
          </div>
          <div className="booking-page-actions"><span className="settings-inline-message" role="status">{socialMessage}</span><button className="checkout-save-button" type="submit">Save</button></div>
        </form>
      </> : selected === "Registration" ? <>
        <h1>Registration</h1>
        <p className="settings-page-subtitle">Configure registration policies and requirements for your facility</p>
        <form className="registration-settings-card" onSubmit={saveRegistration}>
          <h2 className="booking-card-title">Registration Policies</h2>
          <div className="registration-settings-content">
            <section className="registration-settings-section">
              <div className="booking-section-description"><h3>Personal Information</h3><p>Choose which personal details users will be required to enter when creating an account at your facility.</p></div>
              <div className="registration-field-list">
                {[["name", "Name"], ["gender", "Gender"], ["dateOfBirth", "Date of Birth"]].map(([key, label]) => <RegistrationFieldRow key={key} field={registrationDraft[key]} label={label} onRequiredChange={(required) => updateRegistrationField(key, { required })} onVisibilityChange={(visible) => updateRegistrationField(key, { visible })}/>)}
              </div>
            </section>
            <section className="registration-settings-section">
              <div className="booking-section-description"><h3>Contact Information</h3><p>Choose which pieces of contact info. users will be required to enter when creating an account at your facility.</p></div>
              <div className="registration-field-list">
                {[["address", "Address"], ["phoneNumber", "Phone Number"]].map(([key, label]) => <RegistrationFieldRow key={key} field={registrationDraft[key]} label={label} onRequiredChange={(required) => updateRegistrationField(key, { required })} onVisibilityChange={(visible) => updateRegistrationField(key, { visible })}/>)}
              </div>
            </section>
            <section className="registration-settings-section additional-information-section">
              <div className="booking-section-description"><h3>Additional Information</h3><p>Request the client to fill out additional details during registration.</p></div>
              <div className="registration-upgrade-card">
                <div className="registration-upgrade-art" aria-hidden="true"><Icon name="court" size={48}/><Icon name="people" size={36}/></div>
                <div><h3>Upgrade to collect extra information</h3><p>Custom fields are not included on your plan. Upgrade to ask customers for extra details during registration and signup.</p><button type="button" onClick={onUpgradeLogin}>Upgrade your plan</button></div>
              </div>
            </section>
          </div>
          <div className="booking-page-actions"><span className="settings-inline-message" role="status">{registrationMessage}</span><button className="checkout-save-button" type="submit">Save</button></div>
        </form>
      </> : selected === "Staff" ? (staffAdding ? <>
        <nav className="staff-breadcrumb" aria-label="Breadcrumb"><button type="button" onClick={() => setStaffAdding(false)}>Staff</button><span>/</span><span>Add Staff</span></nav>
        <h1>Add Staff</h1>
        <div className="staff-form-tabs"><span>Profile</span></div>
        <form className="registration-settings-card staff-form-card" onSubmit={saveStaff} noValidate>
          <h2 className="booking-card-title">Staff Details</h2>
          <div className="staff-form-content" key={staffFormKey}>
            <section className="booking-page-section">
              <div className="booking-section-description"><h3>Profile</h3><p>Update their profile picture and name</p></div>
              <div className="staff-profile-row">
                <label className="staff-avatar" title="Upload profile picture">{staffDraft.photo ? <img src={staffDraft.photo} alt="Staff profile"/> : <Icon name="people" size={44}/>}<input type="file" accept="image/*" aria-label="Upload staff profile picture" onChange={(event) => { uploadStaffPhoto(event.target.files?.[0]); event.target.value = ""; }}/></label>
                <label className="staff-field">First Name<input value={staffDraft.firstName} onChange={(event) => updateStaffDraft("firstName", event.target.value)} aria-invalid={Boolean(staffErrors.firstName)}/>{staffErrors.firstName && <small className="staff-error">{staffErrors.firstName}</small>}</label>
                <label className="staff-field">Last Name<input value={staffDraft.lastName} onChange={(event) => updateStaffDraft("lastName", event.target.value)} aria-invalid={Boolean(staffErrors.lastName)}/>{staffErrors.lastName && <small className="staff-error">{staffErrors.lastName}</small>}</label>
                {staffErrors.photo && <small className="staff-error staff-photo-error">{staffErrors.photo}</small>}
              </div>
            </section>
            <section className="booking-page-section">
              <div className="booking-section-description"><h3>Contact Information</h3><p>Update email and phone number.</p></div>
              <div className="staff-stack">
                <label className="staff-field">Email<input type="email" value={staffDraft.email} onChange={(event) => updateStaffDraft("email", event.target.value)} aria-invalid={Boolean(staffErrors.email)}/>{staffErrors.email && <small className="staff-error">{staffErrors.email}</small>}</label>
                <div className="staff-field"><span>Phone Number <span className="optional-field-label">Optional</span></span>
                  <div className="staff-phone"><select aria-label="Country code" value={staffDraft.countryCode} onChange={(event) => updateStaffDraft("countryCode", event.target.value)}><option value="+1">🇺🇸 +1</option><option value="+44">🇬🇧 +44</option><option value="+61">🇦🇺 +61</option><option value="+91">🇮🇳 +91</option></select><input type="tel" aria-label="Phone number" placeholder="123-456-7890" value={staffDraft.phone} onChange={(event) => updateStaffDraft("phone", event.target.value)}/></div>
                  {staffErrors.phone && <small className="staff-error">{staffErrors.phone}</small>}</div>
              </div>
            </section>
            <section className="booking-page-section">
              <div className="booking-section-description"><h3>Role and Permissions</h3><p>Set their role and whether they can offer services like lessons, camps, etc.</p></div>
              <label className="staff-field">Role<select value={staffDraft.role} onChange={(event) => updateStaffDraft("role", event.target.value)} aria-invalid={Boolean(staffErrors.role)}><option value=""></option>{staffRoles.map((role) => <option key={role} value={role}>{role}</option>)}</select>{staffErrors.role && <small className="staff-error">{staffErrors.role}</small>}</label>
            </section>
            <section className="booking-page-section">
              <div className="booking-section-description"><h3>Bio</h3><p>This will be shown to customers when booking a service.</p></div>
              <div className="staff-field"><span>Bio <span className="optional-field-label">Optional</span></span><RichTextField label="Bio" ariaLabel="Bio" placeholder="Add bio..." onChange={(html) => setStaffDraft((current) => ({ ...current, bio: html }))}/></div>
            </section>
            <section className="booking-page-section">
              <div className="booking-section-description"><h3>Notes</h3><p>This is for internal use only.</p></div>
              <div className="staff-field"><span>Notes <span className="optional-field-label">Optional</span></span><RichTextField label="Notes" ariaLabel="Notes" placeholder="Add notes..." onChange={(html) => setStaffDraft((current) => ({ ...current, notes: html }))}/></div>
            </section>
            <section className="booking-page-section staff-color-section">
              <div className="booking-section-description"><h3>Calendar Color</h3><p>The color used to display this staff member on the availability calendar.</p></div>
              <div className="staff-color-picker">
                <button type="button" aria-label="Calendar color" aria-expanded={staffColorOpen} onClick={() => setStaffColorOpen((open) => !open)}><i style={{ background: staffDraft.color }}/>⌄</button>
                {staffColorOpen && <div className="staff-color-menu" role="listbox" aria-label="Calendar colors">{staffColors.map((color) => <button type="button" key={color} role="option" aria-selected={staffDraft.color === color} aria-label={`Color ${color}`} className={staffDraft.color === color ? "selected" : ""} style={{ background: color }} onClick={() => { updateStaffDraft("color", color); setStaffColorOpen(false); }}/>)}</div>}
              </div>
            </section>
          </div>
          <div className="booking-page-actions"><span className="settings-inline-message staff-error" role="status">{staffErrors.form || ""}</span><button className="checkout-save-button" type="submit">Save</button></div>
        </form>
      </> : <>
        <div className="staff-header"><div><h1>Staff</h1><p className="settings-page-subtitle">Manage your staff members &amp; permissions</p></div><button type="button" className="staff-new-button" onClick={startAddStaff}><Icon name="plus" size={18}/>New</button></div>
        <div className="staff-tabs" role="tablist">
          <button type="button" role="tab" aria-selected={staffTab === "active"} className={staffTab === "active" ? "selected" : ""} onClick={() => setStaffTab("active")}>Active ({staffList.filter((member) => member.active).length})</button>
          <button type="button" role="tab" aria-selected={staffTab === "inactive"} className={staffTab === "inactive" ? "selected" : ""} onClick={() => setStaffTab("inactive")}>Inactive ({staffList.filter((member) => !member.active).length})</button>
        </div>
        <label className="staff-search"><Icon name="search" size={20}/><input type="search" placeholder="Search staff..." aria-label="Search staff" value={staffSearch} onChange={(event) => setStaffSearch(event.target.value)}/></label>
        {staffMessage && <span className="settings-inline-message" role="status">{staffMessage}</span>}
        {(() => {
          const query = staffSearch.trim().toLowerCase();
          const rows = staffList.filter((member) => member.active === (staffTab === "active") && `${member.firstName} ${member.lastName} ${member.email} ${member.role}`.toLowerCase().includes(query));
          return <div className="staff-table" role="table">
            <div className="staff-table-head" role="row"><span role="columnheader">Name</span><span role="columnheader">Email</span><span role="columnheader">Role</span><span role="columnheader"><span className="sr-only">Actions</span></span></div>
            {rows.length ? rows.map((member) => <div className="staff-table-row" role="row" key={member.id}>
              <span role="cell" className="staff-name-cell"><i style={{ background: member.color }}>{member.photo ? <img src={member.photo} alt=""/> : `${member.firstName[0] || ""}${member.lastName[0] || ""}`.toUpperCase()}</i>{member.firstName} {member.lastName}</span>
              <span role="cell">{member.email}</span><span role="cell">{member.role}</span>
              <span role="cell">{member.role !== "Owner" && <button type="button" className="staff-row-action" onClick={() => toggleStaffActive(member.id)}>{member.active ? "Deactivate" : "Activate"}</button>}</span>
            </div>) : <p className="staff-empty">{query ? "No staff match your search." : `No ${staffTab} staff.`}</p>}
          </div>;
        })()}
      </>) : selected === "Roles & Permissions" ? (roleView ? <>
        <nav className="staff-breadcrumb role-breadcrumb" aria-label="Breadcrumb"><button type="button" onClick={() => setRoleView("")}>Roles</button><span>›</span><span>{roleView}</span></nav>
        <h1>{roleView}</h1>
        <form className="role-detail-card" onSubmit={saveRole}>
          <div className="role-detail-body">
            <h2>Role details</h2>
            <label className="role-name-field">Name<input value={roleView} disabled readOnly aria-label="Role name"/></label>
            <h3>Permissions</h3>
            {roleView === "Owner" && <p className="role-owner-note"><Icon name="info" size={17}/>Owner permissions cannot be changed. There can only be one owner at any given time.</p>}
            <div className="permission-columns">
              {permissionColumns.map((column, index) => <div key={index}>{column.map((section) => <section className="permission-section" key={section.group}><h4>{section.group}</h4>{section.nodes.map((node) => <PermissionNode key={node.id} node={node} ancestors={[]} checked={roleDraft} disabled={roleView === "Owner"} onToggle={toggleRolePermission}/>)}</section>)}</div>)}
            </div>
          </div>
          <div className="role-detail-actions"><span className="settings-inline-message" role="status">{roleMessage}</span><button className="checkout-save-button" type="submit">Save</button></div>
        </form>
      </> : <>
        <h1>Roles &amp; Permissions</h1>
        <p className="settings-page-subtitle">Manage the permissions &amp; access for each staff role</p>
        <div className="staff-table roles-table" role="table">
          <div className="staff-table-head roles-table-row" role="row"><span role="columnheader">Name</span><span role="columnheader">Permissions</span></div>
          {staffRoleDefinitions.map(([name]) => <div className="staff-table-row roles-table-row" role="row" key={name}><span role="cell"><button type="button" className="role-link" onClick={() => openRole(name)}>{name}</button></span><span role="cell">{roleLabel(name)}</span></div>)}
        </div>
      </>) : selected === "Profile" ? <>
        <h1>Profile</h1>
        <p className="settings-page-subtitle">Manage your user profile</p>
        <form className="registration-settings-card profile-card" onSubmit={saveProfile} noValidate>
          <h2 className="booking-card-title">Your Details</h2>
          <div className="profile-content">
            <div className="profile-name-row">
              <div className="profile-avatar" aria-hidden="true">{bookingPageDraft.logo?.data ? <img src={bookingPageDraft.logo.data} alt=""/> : <span>{`${profileDraft.firstName[0] || ""}${profileDraft.lastName[0] || ""}`.toUpperCase() || "?"}</span>}</div>
              <div className="profile-name-fields">
                <label>First Name <span className="optional-field-label">Optional</span><input value={profileDraft.firstName} onChange={(event) => { setProfileDraft({ ...profileDraft, firstName: event.target.value }); setProfileMessage(""); }}/></label>
                <label>Last Name <span className="optional-field-label">Optional</span><input value={profileDraft.lastName} onChange={(event) => { setProfileDraft({ ...profileDraft, lastName: event.target.value }); setProfileMessage(""); }}/></label>
              </div>
            </div>
            <div className="profile-email">
              <div className="profile-email-label"><label htmlFor="profile-email">Email</label><button type="button" onClick={() => setProfileEmailEditing((editing) => !editing)}>{profileEmailEditing ? "Cancel" : "Change"}</button></div>
              <input id="profile-email" type="email" readOnly={!profileEmailEditing} value={profileDraft.email} onChange={(event) => { setProfileDraft({ ...profileDraft, email: event.target.value }); setProfileMessage(""); }}/>
            </div>
          </div>
          <div className="booking-page-actions"><span className="settings-inline-message" role="status">{profileMessage}</span><button className="checkout-save-button" type="submit">Save</button></div>
        </form>
      </> : selected === "Senders" ? <>
        <div className="staff-header"><div><h1>Senders</h1><p className="settings-page-subtitle">Manage verified senders for marketing &amp; transactional email blasts</p></div><button type="button" className="staff-new-button" onClick={() => openSenderForm()}><Icon name="plus" size={18}/>New</button></div>
        <div className="sender-list">
          {senders.length ? senders.map((sender) => <section className="sender-card" key={sender.id}>
            <div className="sender-head"><h2>{sender.nickname}</h2><span className={`sender-badge ${sender.verified ? "verified" : ""}`}>{sender.verified ? "Verified" : "Not Verified"}</span></div>
            <p className="sender-email">{sender.fromEmail}</p>
            <p className="sender-address">{`${[sender.address1, sender.address2].filter(Boolean).join(" ")} ${sender.city}, ${sender.state}, ${sender.country}, ${sender.zip}`}</p>
            <button type="button" role="switch" aria-checked={sender.active} disabled={!sender.verified} aria-label={`${sender.nickname} ${sender.active ? "on" : "off"}`} className={`automation-switch ${sender.active ? "on" : ""}`} onClick={() => persistSenders(senders.map((item) => item.id === sender.id ? { ...item, active: !item.active } : item))}><i/></button>
            <button type="button" className="sender-icon sender-edit" aria-label={`Edit ${sender.nickname}`} onClick={() => openSenderForm(sender)}><Icon name="edit" size={19}/></button>
            <button type="button" className="sender-icon sender-delete" aria-label={`Delete ${sender.nickname}`} onClick={() => { if (window.confirm(`Delete sender "${sender.nickname}"?`)) persistSenders(senders.filter((item) => item.id !== sender.id)); }}><Icon name="trash" size={19}/></button>
            {!sender.verified && <button type="button" className="sender-resend" onClick={() => setSenderMessage(`Verification link sent to ${sender.fromEmail}.`)}>Resend verification link<Icon name="refresh" size={19}/></button>}
          </section>) : <p className="staff-empty">No senders yet.</p>}
          <span className="settings-inline-message" role="status">{senderMessage}</span>
        </div>
        {senderForm && <div className="sender-overlay" onMouseDown={(event) => { if (event.target === event.currentTarget) setSenderForm(null); }}>
          <form className="sender-modal" role="dialog" aria-label={senderForm.id ? "Edit Sender" : "Add Sender"} onSubmit={saveSender} noValidate>
            <header><h2>{senderForm.id ? "Edit Sender" : "Add Sender"}</h2><button type="button" aria-label="Close" onClick={() => setSenderForm(null)}><Icon name="close" size={22}/></button></header>
            <div className="sender-modal-body">
              <p className="sender-legal">You're required to include your contact information, including a physical mailing address, inside every promotional email you send in order to comply with anti-spam laws such as <a href="https://www.ftc.gov/business-guidance/resources/can-spam-act-compliance-guide-business" target="_blank" rel="noopener noreferrer">CAN-SPAM</a> and <a href="https://crtc.gc.ca/eng/internet/anti.htm" target="_blank" rel="noopener noreferrer">CASL</a>.</p>
              <h3>Basics</h3>
              <label>Nickname<input autoFocus value={senderForm.nickname} onChange={(e) => setSenderForm({ ...senderForm, nickname: e.target.value })}/><small>This is only for your reference. It won't be shown to customers</small></label>
              <label>From Name<input value={senderForm.fromName} onChange={(e) => setSenderForm({ ...senderForm, fromName: e.target.value })}/><small>The name that will appear to customers when you email them</small></label>
              <label>From Email<input type="email" value={senderForm.fromEmail} onChange={(e) => setSenderForm({ ...senderForm, fromEmail: e.target.value })}/><small>The address you want to send emails from</small>{senderErrors.fromEmail && <em role="alert">{senderErrors.fromEmail}</em>}</label>
              <label>Reply To Email<input type="email" value={senderForm.replyTo} onChange={(e) => setSenderForm({ ...senderForm, replyTo: e.target.value })}/><small>The email that customers will see when they hit "Reply". Usually the same as the "From Email"</small>{senderErrors.replyTo && <em role="alert">{senderErrors.replyTo}</em>}</label>
              <h3>Company Address</h3>
              <label>Address Line 1<input value={senderForm.address1} onChange={(e) => setSenderForm({ ...senderForm, address1: e.target.value })}/></label>
              <label>Address Line 2 <span className="optional-badge">Optional</span><input value={senderForm.address2} onChange={(e) => setSenderForm({ ...senderForm, address2: e.target.value })}/></label>
              <label>City<input value={senderForm.city} onChange={(e) => setSenderForm({ ...senderForm, city: e.target.value })}/></label>
              <label>State/Province<input value={senderForm.state} onChange={(e) => setSenderForm({ ...senderForm, state: e.target.value })}/></label>
              <label>Country<input value={senderForm.country} onChange={(e) => setSenderForm({ ...senderForm, country: e.target.value })}/></label>
              <label>Zip/Postal Code<input value={senderForm.zip} onChange={(e) => setSenderForm({ ...senderForm, zip: e.target.value })}/></label>
            </div>
            <footer><button type="submit" className="sender-add" disabled={!senderFormComplete}>{senderForm.id ? "Save" : "Add"}</button></footer>
          </form>
        </div>}
      </> : selected === "Automations" ? <>
        <h1>Automations</h1>
        <p className="settings-page-subtitle">Edit & configure automated booking notifications</p>
        <div className="automation-list">
          {automationOrder.map((id) => {
            const item = automations[id];
            const editable = id.endsWith("Emails");
            return <section className="automation-card" key={id}>
              <div className="automation-head"><h2>{item.title}</h2><span className={`automation-badge ${item.active ? "" : "inactive"}`}>{item.active ? "Active" : "Inactive"}</span></div>
              <p>{item.description}</p>
              <button type="button" role="switch" aria-checked={item.active} aria-label={`${item.title} ${item.active ? "on" : "off"}`} className={`automation-switch ${item.active ? "on" : ""}`} onClick={() => toggleAutomation(id)}><i/></button>
              {editable && <button type="button" className="automation-edit" aria-label={`Edit ${item.title}`} onClick={() => editAutomation(id)}><Icon name="edit" size={19}/></button>}
              {automationEditing === id && <form className="automation-form" onSubmit={saveAutomation}>
                <label>Subject<input value={automationDraft.subject} onChange={(e) => setAutomationDraft({ ...automationDraft, subject: e.target.value })} required/></label>
                <label>Message<textarea rows="4" value={automationDraft.body} onChange={(e) => setAutomationDraft({ ...automationDraft, body: e.target.value })} required/></label>
                <div><button type="button" className="automation-cancel" onClick={() => setAutomationEditing("")}>Cancel</button><button type="submit" className="checkout-save-button">Save</button></div>
              </form>}
            </section>;
          })}
        </div>
      </> : selected === "Integrations" ? <>
        <h1>Integrations</h1>
        <p className="settings-page-subtitle">Connect CrickHub to your favourite tools and setup no-code automations</p>
        {[
          { title: "Automations", text: "Trigger automated workflows based on events in CrickHub", id: "zapier", name: "Zapier", logo: "zapier", color: "#ff4f00", desc: "Connect CrickHub to 9,000+ apps. Automate bookings, notifications & more.", link: "https://zapier.com/apps" },
          { title: "Marketplace", text: "Sync your availability and bookings with marketplace partners", id: "catchcorner", name: "CatchCorner", logo: "CC", color: "#587499", desc: "Connect CrickHub to CatchCorner to sync your availability and reach more customers through the marketplace." },
          { title: "Gift Cards", text: "Allow customers to purchase and redeem gift cards at checkout", id: "giftup", name: "GiftUp", logo: "GIFT UP!", color: "#5b2a86", desc: "Sell digital gift cards and allow customers to redeem them at checkout.", link: "https://giftup.com", disabled: true },
          { title: "Accounting", text: "Sync your payment data to your accounting software", id: "quickbooks", name: "QuickBooks", logo: "qb", color: "#2ca01c", desc: "Automatically sync charges, refunds, taxes, fees, and discounts to QuickBooks as daily journal entries.", disabled: true }
        ].map((group) => <section className="integration-group" key={group.id}>
          <h2>{group.title}</h2>
          <p>{group.text}</p>
          <div className="integration-card">
            <span className="integration-logo" style={{ background: group.color }}>{group.logo}</span>
            <div className="integration-body">
              <h3>{group.name}</h3>
              <p>{group.desc}{group.link && <> <a href={group.link} target="_blank" rel="noopener noreferrer">Learn more</a></>}</p>
              <button type="button" className="integration-connect" disabled={group.disabled} onClick={() => toggleIntegration(group.id)}>{integrations[group.id] ? "Disconnect" : "Connect"}</button>
            </div>
          </div>
        </section>)}
      </> : selected === "Plan & Billing" ? <>
        <h1>Plan & Billing</h1>
        <p className="settings-page-subtitle">Manage your plan & billing</p>
        <section className="billing-card"><small>Your Plan</small><h2>Essentials Plan</h2><p>Your next billing date is November 4th, 2026</p></section>
        <section className="billing-card"><h2>Manage Billing</h2><p>CrickHub is powered by Stripe. Visit your Stripe portal to manage plans and billing.</p><button type="button" className="billing-manage-button" onClick={() => setBillingPortal(true)}>Manage Subscription</button></section>
        <section className="billing-card"><h2>Change Plan</h2><p>To explore plan options or change your plan, please contact our Support team at <a href="mailto:support@crickhub.com">support@crickhub.com</a></p></section>
        {billingPortal && <div className="billing-portal" role="dialog" aria-label="Manage subscription">
          <aside className="billing-portal-side">
            <Brand onClick={() => setBillingPortal(false)}/>
            <h2>The easiest way to manage your facility.</h2>
            <button type="button" className="billing-return" onClick={() => setBillingPortal(false)}>← Return to CrickHub</button>
            <footer>Powered by <b>stripe</b> <span>Terms</span> <span>Privacy</span></footer>
          </aside>
          <div className="billing-portal-main">
            <small className="billing-portal-label">CURRENT SUBSCRIPTION</small>
            <div className="billing-portal-top">
              <div><h3>Essentials</h3><strong>$139.30 per month</strong><p>Your next billing date is November 4, 2026.</p><p>Your next estimated payment will be <b>$139.30</b></p></div>
              <button type="button" className="billing-cancel" onClick={() => setBillingPortal(false)}>Cancel subscription</button>
            </div>
            <div className="billing-breakdown">
              <small>NOV 4-DEC 4, 2026</small>
              <div><b>Essentials</b><span>$199.00</span></div>
              <div><b>Subtotal</b><b>$199.00</b></div>
              <div><span>30% off for 3 months (30% off)<small>Discount ends December 4, 2026</small></span><span>-$59.70</span></div>
              <div><b>Total</b><b>$139.30</b></div>
            </div>
            <small className="billing-portal-label">PAYMENT METHOD</small>
            <div className="billing-payment"><span className="billing-card-icon"/><div><b>Mastercard •••• 2077</b><small>Expires 02/2031</small></div><em>Default</em></div>
          </div>
        </div>}
      </> : selected === "Custom Fields" ? <>
        <h1>Custom Fields</h1>
        <p className="settings-page-subtitle">Define additional fields to collect from customers during sign-up.</p>
        <div className="registration-settings-card">
          <h2 className="booking-card-title">Custom Fields</h2>
          <div className="registration-settings-content">
            <section className="registration-settings-section additional-information-section">
              <div className="booking-section-description"><h3>Custom Fields</h3><p>These questions can be configured onto your registration and service sign up forms at your facility.</p></div>
              <div className="registration-upgrade-card">
                <div className="registration-upgrade-art" aria-hidden="true"><Icon name="court" size={48}/><Icon name="people" size={36}/></div>
                <div><h3>Upgrade to collect extra information</h3><p>Custom fields are not included on your plan. Upgrade to ask customers for extra details during registration and signup.</p><button type="button" onClick={onUpgradeLogin}>Upgrade your plan</button></div>
              </div>
            </section>
          </div>
        </div>
      </> : selected === "Policies" ? <>
        <h1>Policies</h1>
        <p className="settings-page-subtitle">Configure booking policies and rules for your facility</p>
        <form className="policies-settings-card" onSubmit={savePolicies}>
          <h2 className="booking-card-title">Booking Policies</h2>
          <div className="policies-settings-content">
            <section className="policy-settings-section cancellation-policy-section">
              <div className="booking-section-description"><h3>Cancellation Policy</h3><p>Set an optional time period for customers to be able to cancel or reschedule a booking with a full refund</p></div>
              <div className="policy-section-controls">
                <div className="policy-control-row">
                  <div className="policy-toggle-wrap"><span>Off</span><label className="policy-switch"><input type="checkbox" role="switch" aria-label="Cancellation Policy" checked={policyDraft.cancellationEnabled} onChange={(event) => updatePolicy("cancellationEnabled", event.target.checked)}/><i/></label><span>On</span></div>
                </div>
                {policyDraft.cancellationEnabled && <>
                  <div className="policy-hours-row"><label>Hours<input type="number" min="0" max="720" required value={policyDraft.cancellationHours} onChange={(event) => updatePolicy("cancellationHours", event.target.value)}/></label><p>Bookings can be cancelled or rescheduled up to {policyDraft.cancellationHours || "0"} hour{policyDraft.cancellationHours === "1" ? "" : "s"} prior to the booking time for a full refund.</p></div>
                  <label className="policy-wallet-option"><span className="policy-checkbox-row"><input type="checkbox" checked={policyDraft.refundToWallet} onChange={(event) => updatePolicy("refundToWallet", event.target.checked)}/><span>Refund cancellations to wallet instead of credit card</span></span><small>If enabled, refunds for cancellations will be credited to the customer’s wallet balance instead of their original payment method.</small><a href="https://stripe.com/docs/refunds" target="_blank" rel="noreferrer">Learn more</a></label>
                </>}
              </div>
            </section>
            <section className="policy-settings-section waiver-policy-section">
              <div className="booking-section-description"><h3>Liability Waiver</h3><p>Display and require customers to agree to your liability waiver before they are allowed to make any booking</p></div>
              <div className="policy-section-controls waiver-controls">
                <div className="policy-toggle-wrap"><span>Off</span><label className="policy-switch"><input type="checkbox" role="switch" aria-label="Liability Waiver" checked={policyDraft.waiverEnabled} onChange={(event) => updatePolicy("waiverEnabled", event.target.checked)}/><i/></label><span>On</span></div>
                <label className="waiver-upload-control"><Icon name="plus" size={18}/><span>{policyDraft.waiver?.name || "Upload liability waiver (PDF)"}</span><input type="file" accept="application/pdf,.pdf" onChange={(event) => { uploadWaiver(event.target.files?.[0]); event.target.value = ""; }}/></label>
                {policyDraft.waiver?.data && <button className="waiver-remove-button" type="button" onClick={() => updatePolicy("waiver", null)}>Remove waiver</button>}
                <label className="policy-staff-waiver"><input type="checkbox" checked={policyDraft.staffCollectsWaiver} onChange={(event) => updatePolicy("staffCollectsWaiver", event.target.checked)}/><span>Allow staff to collect waiver signatures in person</span><button type="button" aria-label="About in-person waiver signatures" title="Allow facility staff to record a waiver signature in person." className="policy-help-button">?</button></label>
              </div>
            </section>
            <section className="policy-settings-section slot-increment-section">
              <div className="booking-section-description"><h3>Slot Start Time Increment</h3><p>Set the interval for starting time slots on your booking page.</p></div>
              <div className="policy-increment-controls">
                <select aria-label="Slot start time increment" value={policyDraft.slotIncrement} onChange={(event) => updatePolicy("slotIncrement", event.target.value)}><option value="15">15 minute</option><option value="30">30 minute</option><option value="60">60 minute</option></select>
                <p>Slots are shown starting in {policyDraft.slotIncrement}-minute increments regardless of the slot duration. For example, for an hour long booking - customers will see 9AM-10AM, {policyDraft.slotIncrement === "15" ? "9:15AM-10:15AM, 9:30AM-10:30AM" : policyDraft.slotIncrement === "30" ? "9:30AM-10:30AM" : "10AM-11AM"}, and so on.</p>
              </div>
            </section>
            <section className="policy-settings-section checkin-policy-section">
              <div className="booking-section-description"><h3>Check-in <span className="policy-new-badge">New</span></h3><p>Enable our check-in experience to streamline attendance, waiver, and payment collection for bookings. <a href="https://book.crickhubapp.com/" target="_blank" rel="noreferrer">Learn more.</a></p></div>
              <div className="policy-checkin-controls">
                <div className="checkin-top-row">
                  <div className="policy-toggle-wrap"><span>Off</span><label className="policy-switch"><input type="checkbox" role="switch" aria-label="Check-in" checked={policyDraft.checkInEnabled} onChange={(event) => updatePolicy("checkInEnabled", event.target.checked)}/><i/></label><span>On</span></div>
                  <div className="checkin-actions"><button type="button" onClick={() => setPolicyModal("qr")}><Icon name="device" size={17}/>Show QR Code</button><button type="button" onClick={openCheckInConfig}><Icon name="settings" size={17}/>Configure</button></div>
                </div>
                {policyDraft.checkInEnabled && <label className="checkin-url-label">Self Check-in URL<span className="checkin-url-control"><input readOnly value={checkInUrl}/><button type="button" aria-label="Copy self check-in URL" onClick={copyCheckInUrl}><Icon name="copy" size={18}/></button></span></label>}
              </div>
            </section>
          </div>
          <div className="booking-page-actions"><span className="settings-inline-message" role="status">{policyMessage}</span><button className="checkout-save-button" type="submit">Save</button></div>
        </form>
        {policyModal === "configure" && <div className="modal-scrim policy-config-scrim" onMouseDown={(event) => { if (event.target === event.currentTarget) setPolicyModal(""); }}><form className="policy-config-modal" role="dialog" aria-modal="true" aria-labelledby="policy-modal-title" onSubmit={applyCheckInConfig}>
          <header><h2 id="policy-modal-title">Configure self check-in</h2></header>
          <div className="policy-config-body">
            <label className="checkin-open-select">Check-in opens at:<select value={checkInConfigDraft.opensAt} onChange={(event) => setCheckInConfigDraft((current) => ({ ...current, opensAt: event.target.value }))}><option value="15">15 minutes before event</option><option value="30">30 minutes before event</option><option value="60">1 hour before event</option><option value="120">2 hours before event</option></select></label>
            <div className="policy-notify-section"><h3>Notify participants</h3><div className="policy-toggle-wrap"><span>Off</span><label className="policy-switch"><input type="checkbox" role="switch" aria-label="Notify participants" checked={checkInConfigDraft.notifyParticipants} onChange={(event) => setCheckInConfigDraft((current) => ({ ...current, notifyParticipants: event.target.checked }))}/><i/></label><span>On</span></div></div>
            <div className="policy-notify-info"><span aria-hidden="true">i</span><p>Participants will be emailed, texted, and sent a push notification (if you have a branded app) when it’s time to check-in.</p></div>
          </div>
          <footer><button type="button" className="policy-config-cancel" onClick={() => setPolicyModal("")}>Cancel</button><button type="submit" className="policy-config-apply">Apply</button></footer>
        </form></div>}
        {policyModal === "qr" && <div className="modal-scrim" onMouseDown={(event) => { if (event.target === event.currentTarget) setPolicyModal(""); }}><section className="admin-modal policy-preview-modal" role="dialog" aria-modal="true" aria-labelledby="policy-modal-title"><button type="button" className="modal-x" aria-label="Close" onClick={() => setPolicyModal("")}>×</button><h2 id="policy-modal-title">Self Check-in QR Code</h2><p>Use this link for customer check-in. QR code display is a demo preview.</p><code>{checkInUrl}</code><button type="button" className="admin-button secondary" onClick={copyCheckInUrl}>Copy check-in link</button></section></div>}
      </> : selected === "Checkout" ? <>
        <h1>Checkout</h1>
        <p className="settings-page-subtitle">Configure payment methods and point of sale settings</p>
        <form className="checkout-settings-card" onSubmit={saveCheckout}>
          <div className="checkout-settings-content">
            <section className="checkout-settings-section checkout-online-section">
              <div className="checkout-section-description"><h2>Online</h2><p>Choose how you want to accept payments from customers online</p></div>
              <div className="checkout-section-controls">
                <label className="checkout-option"><span><input type="checkbox" role="switch" checked={checkoutDraft.reservePayInPerson} onChange={(event) => setCheckoutDraft((current) => ({ ...current, reservePayInPerson: event.target.checked }))}/><span>Reserve &amp; Pay-In-Person</span></span><small>Enable customers to reserve bookings online, and pay in-person at your facility.</small></label>
                <label className="checkout-option"><span><input type="checkbox" role="switch" checked={checkoutDraft.reservePayOnline} onChange={(event) => setCheckoutDraft((current) => ({ ...current, reservePayOnline: event.target.checked }))}/><span>Reserve &amp; Pay Online</span></span><small>Enable customers to reserve and pay for bookings online</small></label>
              </div>
            </section>
            <section className="checkout-settings-section checkout-pos-section">
              <div className="checkout-section-description"><h2>Point of Sale (POS)</h2><p>Use the Swift point of sale (POS) terminal to accept card payments in-person</p></div>
              <div className="checkout-pos-content">
                <div className="checkout-device-fields">
                  <label>Device Name <span className="optional-field-label">Optional</span><input value={checkoutDraft.deviceName || ""} onChange={(event) => setCheckoutDraft((current) => ({ ...current, deviceName: event.target.value }))} placeholder="e.g. Front Desk"/></label>
                  <label>Reader Code<input value={checkoutDraft.readerCode || ""} onChange={(event) => setCheckoutDraft((current) => ({ ...current, readerCode: event.target.value }))} placeholder="e.g. magnify-complete-koala"/></label>
                  <button className="checkout-connect-button" type="button" disabled={!checkoutDraft.deviceName?.trim() || !checkoutDraft.readerCode?.trim()} onClick={() => onToast("Terminal connection isn’t available in this demo.")}><Icon name="plus" size={17}/>Connect</button>
                </div>
                <div className="checkout-info" role="note"><span className="checkout-info-icon" aria-hidden="true">i</span><p><a href="https://dashboard.stripe.com/" target="_blank" rel="noreferrer">Visit your Stripe dashboard</a> to order a supported terminal (<strong>Stripe Reader S700</strong> or <strong>Stripe Reader S710</strong>). Once the device arrives, turn it on and enter the code that appears on the screen above to connect it to your Swift account.</p></div>
              </div>
            </section>
          </div>
          <div className="checkout-settings-actions"><span className="settings-inline-message" role="status">{checkoutMessage}</span><button className="checkout-save-button" type="submit">Save</button></div>
        </form>
      </> : selected === "Rooms" ? <RoomsPage rooms={rooms} setRooms={setRooms} schedules={schedules} onToast={onToast}/> : selected === "Equipment" ? <EquipmentPage equipment={equipment} setEquipment={setEquipment} onToast={onToast}/> : selected === "Schedules" ? <SchedulesPage schedules={schedules} setSchedules={setSchedules} rooms={rooms} services={services} onToast={onToast}/> : selected === "Basics" ? <>
        <h1>Basics</h1>
        <p className="settings-page-subtitle">Manage your facility settings.</p>
        <form className="facility-details-card" onSubmit={saveBasics}>
          <h2 className="facility-details-title">Facility Details</h2>
          <div className="facility-settings-section">
            <div className="facility-settings-description"><h3>Basics</h3><p>Set the facility name and booking page URL</p></div>
            <div className="facility-settings-fields">
              <label>Facility Name<input required value={draft.facilityName} onChange={(event) => updateField("facilityName", event.target.value)} placeholder="Facility name"/></label>
              <div className="booking-url-field">
                <div className="booking-url-label"><label htmlFor="facility-booking-url">Facility Booking Page</label><button type="button" onClick={() => { setEditingSlug((editing) => !editing); setCopyMessage(""); }}>{editingSlug ? "Done" : "Change"}</button></div>
                <div className="booking-url-control">{editingSlug ? <><span>https://book.crickhubapp.com/facilities/</span><input id="facility-booking-url" aria-label="Booking page URL slug" required value={draft.bookingSlug} onChange={(event) => updateField("bookingSlug", event.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-").replace(/-+/g, "-"))}/></> : <input id="facility-booking-url" readOnly value={bookingUrl}/>}<button type="button" className="booking-url-copy" aria-label="Copy booking page URL" onClick={copyBookingUrl}><Icon name="copy" size={16}/></button></div>
                <small className="settings-demo-hint">Booking page links are a preview in this demo.</small>
                {copyMessage && <small className="settings-inline-message">{copyMessage}</small>}
              </div>
              <label className="public-calendar-setting"><span className="settings-switch-row"><input type="checkbox" role="switch" checked={draft.publicCalendar} onChange={(event) => updateField("publicCalendar", event.target.checked)}/><span>Public Facing Calendar</span></span><small>Get a public shareable link to the facility calendar. Calendar publishing is not connected in this demo.</small></label>
            </div>
          </div>
          <div className="facility-settings-section contact-settings-section">
            <div className="facility-settings-description"><h3>Contact Info</h3><p>Add the facility's location and phone number</p></div>
            <div className="facility-settings-fields">
              <label>Organization name<input required value={draft.organizationName} onChange={(event) => updateField("organizationName", event.target.value)}/></label>
              <label>Country or region<select value={draft.country} onChange={(event) => updateField("country", event.target.value)}><option>United States</option><option>Canada</option><option>United Kingdom</option><option>Australia</option><option>Other</option></select></label>
              <label>Address line 1<input autoComplete="address-line1" value={draft.address1} onChange={(event) => updateField("address1", event.target.value)}/></label>
              <label>Address line 2<input autoComplete="address-line2" value={draft.address2} onChange={(event) => updateField("address2", event.target.value)}/></label>
              <label>City<input autoComplete="address-level2" value={draft.city} onChange={(event) => updateField("city", event.target.value)}/></label>
              <div className="facility-settings-split"><label>State<input autoComplete="address-level1" value={draft.state} onChange={(event) => updateField("state", event.target.value)}/></label><label>ZIP code<input autoComplete="postal-code" value={draft.zip} onChange={(event) => updateField("zip", event.target.value)}/></label></div>
              <label className="facility-phone-field">Phone <span className="optional-field-label">Optional</span><input type="tel" autoComplete="tel" value={draft.phone} onChange={(event) => updateField("phone", event.target.value)} placeholder="+1"/></label>
            </div>
          </div>
          <div className="facility-settings-actions"><span className="settings-inline-message" role="status">{saveMessage}</span><button className="admin-button primary" type="submit">Save changes</button></div>
        </form>
      </> : <>
        <span className="admin-kicker">{facilityDetails.facilityName.toUpperCase()} · SETTINGS</span>
        <h1>{selected}</h1>
        <p>Manage your facility’s {selected.toLowerCase()} settings.</p>
      </>}
    </main>
  </div>;
}

const scheduleDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const makeDefaultScheduleHours = () => scheduleDays.map((day, index) => ({
  day,
  open: index < 5,
  ranges: index < 5 ? [{ start: "09:00", end: "17:00" }] : []
}));
const makeScheduleDraft = (schedule) => schedule ? {
  ...schedule,
  hours: scheduleDays.map((day) => {
    const savedDay = schedule.hours?.find((item) => item.day === day);
    if (!savedDay) return { day, open: false, ranges: [] };
    return { ...savedDay, ranges: savedDay.ranges?.length ? savedDay.ranges.map((range) => ({ ...range })) : savedDay.open && savedDay.start && savedDay.end ? [{ start: savedDay.start, end: savedDay.end }] : [] };
  }),
  overrides: (schedule.overrides || []).map((override) => ({ ...override, ranges: (override.ranges || []).map((range) => ({ ...range })) }))
} : { id: "", name: "Working Hours", hours: makeDefaultScheduleHours(), overrides: [] };

function SchedulesPage({ schedules, setSchedules, rooms, services, onToast }) {
  const [search, setSearch] = useState("");
  const [draft, setDraft] = useState(null);
  const filteredSchedules = schedules.filter((schedule) => schedule.name.toLowerCase().includes(search.trim().toLowerCase()));
  const updateDay = (dayIndex, update) => setDraft((current) => ({ ...current, hours: current.hours.map((day, index) => index === dayIndex ? { ...day, ...update } : day) }));
  const updateRange = (dayIndex, rangeIndex, field, value) => setDraft((current) => ({
    ...current,
    hours: current.hours.map((day, index) => index === dayIndex ? { ...day, ranges: day.ranges.map((range, slot) => slot === rangeIndex ? { ...range, [field]: value } : range) } : day)
  }));
  const updateOverride = (overrideId, update) => setDraft((current) => ({ ...current, overrides: current.overrides.map((override) => override.id === overrideId ? { ...override, ...update } : override) }));
  const updateOverrideRange = (overrideId, rangeIndex, field, value) => setDraft((current) => ({
    ...current,
    overrides: current.overrides.map((override) => override.id === overrideId ? { ...override, ranges: override.ranges.map((range, slot) => slot === rangeIndex ? { ...range, [field]: value } : range) } : override)
  }));
  const addOverride = () => setDraft((current) => ({
    ...current,
    overrides: [...current.overrides, { id: globalThis.crypto?.randomUUID ? globalThis.crypto.randomUUID() : `override-${Date.now()}`, date: "", open: true, ranges: [{ start: "09:00", end: "17:00" }] }]
  }));
  const saveSchedule = (event) => {
    event.preventDefault();
    const name = draft.name.trim();
    if (!name) return;
    const duplicate = schedules.some((item) => item.id !== draft.id && item.name.toLowerCase() === name.toLowerCase());
    if (duplicate) {
      onToast("A schedule with that name already exists.");
      return;
    }
    if (draft.overrides.some((item) => !item.date)) {
      onToast("Choose a date for each override.");
      return;
    }
    if (draft.overrides.some((item, index) => draft.overrides.some((other, otherIndex) => otherIndex !== index && other.date === item.date))) {
      onToast("Each date can only have one override.");
      return;
    }
    const invalidHours = draft.hours.some((day) => day.open && (!day.ranges.length || day.ranges.some((range) => clockMinutes(range.start) === null || clockMinutes(range.end) === null || clockMinutes(range.end) <= clockMinutes(range.start))));
    const invalidOverrides = draft.overrides.some((override) => override.open && (!override.ranges.length || override.ranges.some((range) => clockMinutes(range.start) === null || clockMinutes(range.end) === null || clockMinutes(range.end) <= clockMinutes(range.start))));
    if (invalidHours || invalidOverrides) {
      onToast("For each open day and override, set an end time later than its start time.");
      return;
    }
    const saved = { ...draft, name };
    if (draft.id) {
      setSchedules((current) => current.map((item) => item.id === draft.id ? saved : item));
      onToast(`“${name}” updated.`);
    } else {
      const id = globalThis.crypto?.randomUUID ? globalThis.crypto.randomUUID() : `schedule-${Date.now()}`;
      setSchedules((current) => [...current, { ...saved, id }]);
      onToast(`“${name}” added.`);
    }
    setDraft(null);
  };
  const deleteSchedule = (schedule) => {
    if (rooms.some((room) => room.schedule === schedule.id)) {
      onToast("This schedule is assigned to a room. Assign another schedule before deleting it.");
      return;
    }
    setSchedules((current) => current.filter((item) => item.id !== schedule.id));
    onToast(`“${schedule.name}” deleted.`);
  };

  if (draft) return <section className="schedules-page schedules-editor">
    <div className="rooms-breadcrumb"><button type="button" onClick={() => setDraft(null)}>Schedules</button><span>/</span><span>{draft.id ? "Edit Schedule" : "Add Schedule"}</span></div>
    <form className="schedule-details-card" onSubmit={saveSchedule}>
      <h2>Schedule Details</h2>
      <div className="schedule-editor-layout">
        <div className="schedule-editor-main">
          <label className="schedule-name-field">Name<input required maxLength={80} value={draft.name} onChange={(event) => setDraft((current) => ({ ...current, name: event.target.value }))}/></label>
          <section className="schedule-hours">
            <h3>Hours</h3>
            <div className="schedule-day-list">{draft.hours.map((day, dayIndex) => <div className={`schedule-day ${day.open ? "" : "schedule-day-closed"}`} key={day.day}>
              <button type="button" className={`schedule-toggle ${day.open ? "enabled" : ""}`} role="switch" aria-checked={day.open} aria-label={`${day.day} hours`} onClick={() => updateDay(dayIndex, { open: !day.open, ranges: day.open ? [] : day.ranges.length ? day.ranges : [{ start: "09:00", end: "17:00" }] })}><i/></button><strong>{day.day}</strong>
              {day.open ? <div className="schedule-ranges">{day.ranges.map((range, rangeIndex) => <div className="schedule-range" key={rangeIndex}><input required type="time" aria-label={`${day.day} opening time ${rangeIndex + 1}`} value={range.start} onChange={(event) => updateRange(dayIndex, rangeIndex, "start", event.target.value)}/><span>–</span><input required type="time" aria-label={`${day.day} closing time ${rangeIndex + 1}`} value={range.end} onChange={(event) => updateRange(dayIndex, rangeIndex, "end", event.target.value)}/><button type="button" aria-label={`Remove ${day.day} hours ${rangeIndex + 1}`} onClick={() => updateDay(dayIndex, { ranges: day.ranges.filter((_, index) => index !== rangeIndex), open: day.ranges.length > 1 })}>×</button></div>)}
                <div className="schedule-day-actions"><button type="button" aria-label={`Add hours to ${day.day}`} onClick={() => updateDay(dayIndex, { open: true, ranges: [...day.ranges, { start: "18:00", end: "20:00" }] })}><Icon name="plus" size={16}/></button><button type="button" aria-label={`Copy ${day.day} hours to next day`} onClick={() => { const nextIndex = (dayIndex + 1) % scheduleDays.length; updateDay(nextIndex, { open: day.open, ranges: day.ranges.map((range) => ({ ...range })) }); }}><Icon name="copy" size={16}/></button></div>
              </div> : <span className="schedule-closed-label">Closed</span>}
            </div>)}</div>
          </section>
        </div>
        <aside className="schedule-overrides">
          <h3>Date Overrides</h3><p>Add specific dates when your schedule changes from your regular hours.</p>
          <div className="schedule-override-list">{draft.overrides.map((override) => <div className="schedule-override" key={override.id}>
            <div className="schedule-override-heading"><label>Date<input type="date" required value={override.date} onChange={(event) => updateOverride(override.id, { date: event.target.value })}/></label><button type="button" aria-label="Remove date override" onClick={() => setDraft((current) => ({ ...current, overrides: current.overrides.filter((item) => item.id !== override.id) }))}>×</button></div>
            <label className="schedule-override-toggle"><input type="checkbox" checked={override.open} onChange={(event) => updateOverride(override.id, { open: event.target.checked, ranges: event.target.checked ? override.ranges.length ? override.ranges : [{ start: "09:00", end: "17:00" }] : [] })}/> Open on this date</label>
            {override.open && override.ranges.map((range, index) => <div className="schedule-override-range" key={index}><input required type="time" aria-label="Override opening time" value={range.start} onChange={(event) => updateOverrideRange(override.id, index, "start", event.target.value)}/><span>–</span><input required type="time" aria-label="Override closing time" value={range.end} onChange={(event) => updateOverrideRange(override.id, index, "end", event.target.value)}/></div>)}
          </div>)}</div>
          <button type="button" className="schedule-add-override" onClick={addOverride}><Icon name="plus" size={16}/> Add an override</button>
        </aside>
      </div>
      <footer className="schedule-editor-actions"><button type="button" className="admin-button secondary" onClick={() => setDraft(null)}>Cancel</button><button type="submit" className="equipment-save">Save</button></footer>
    </form>
  </section>;

  return <section className="schedules-page">
    <header className="equipment-heading"><div><h1>Schedules</h1><p>Schedules indicate when a set of rooms are available for online booking</p></div><button className="equipment-new-button" onClick={() => setDraft(makeScheduleDraft(null))}><Icon name="plus" size={18}/> New</button></header>
    <label className="equipment-search"><Icon name="search" size={20}/><input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search schedules" aria-label="Search schedules"/></label>
    <div className="equipment-table-wrap"><table className="schedules-table"><thead><tr><th>Name</th><th>Services</th><th>Rooms</th><th>Actions</th></tr></thead><tbody>
      {filteredSchedules.map((schedule) => {
        const scheduleRooms = rooms.filter((room) => room.schedule === schedule.id);
        const serviceCount = services.filter((service) => service.scheduleId === schedule.id).length;
        return <tr key={schedule.id}><td>{schedule.name}</td><td>{serviceCount || "—"}</td><td>{scheduleRooms.length || "—"}</td><td><div className="schedule-row-actions"><button type="button" onClick={() => setDraft(makeScheduleDraft(schedule))}>Edit</button><button type="button" onClick={() => deleteSchedule(schedule)}>Delete</button></div></td></tr>;
      })}
      {!filteredSchedules.length && <tr><td className="equipment-empty" colSpan="4">{schedules.length ? "No schedules match your search." : "No schedules yet."}</td></tr>}
    </tbody></table></div>
  </section>;
}

function RoomsPage({ rooms, setRooms, schedules, onToast }) {
  const [search, setSearch] = useState("");
  const [editingRoom, setEditingRoom] = useState(null);
  const [collapsedRooms, setCollapsedRooms] = useState(() => new Set());
  const getRoomDepth = (roomId, visited = new Set()) => {
    if (!roomId || visited.has(roomId)) return 0;
    const room = rooms.find((item) => item.id === roomId);
    if (!room) return 0;
    visited.add(roomId);
    return 1 + getRoomDepth(room.parentId, visited);
  };
  const descendantsOf = (roomId) => {
    const descendants = new Set([roomId]);
    let found = true;
    while (found) {
      found = false;
      rooms.forEach((room) => {
        if (room.parentId && descendants.has(room.parentId) && !descendants.has(room.id)) {
          descendants.add(room.id);
          found = true;
        }
      });
    }
    return descendants;
  };
  const parentChoices = editingRoom?.id
    ? rooms.filter((room) => !descendantsOf(editingRoom.id).has(room.id) && getRoomDepth(room.id) < 4)
    : rooms.filter((room) => getRoomDepth(room.id) < 4);
  const roomsById = new Map(rooms.map((room) => [room.id, room]));
  const childrenByParent = new Map();
  rooms.forEach((room) => {
    const parentId = roomsById.has(room.parentId) ? room.parentId : "";
    if (!childrenByParent.has(parentId)) childrenByParent.set(parentId, []);
    childrenByParent.get(parentId).push(room);
  });
  const query = search.trim().toLowerCase();
  const matchingIds = new Set();
  if (query) {
    rooms.filter((room) => room.name.toLowerCase().includes(query)).forEach((room) => {
      let current = room;
      while (current && !matchingIds.has(current.id)) {
        matchingIds.add(current.id);
        current = roomsById.get(current.parentId);
      }
    });
  }
  const visibleRooms = [];
  const visited = new Set();
  const visitRoom = (room, depth, ancestorsVisible) => {
    if (visited.has(room.id)) return;
    visited.add(room.id);
    const visible = ancestorsVisible && (!query || matchingIds.has(room.id));
    if (visible) visibleRooms.push({ room, depth });
    (childrenByParent.get(room.id) || []).forEach((child) => visitRoom(child, depth + 1, visible && !collapsedRooms.has(room.id)));
  };
  (childrenByParent.get("") || []).forEach((room) => visitRoom(room, 0, true));
  rooms.forEach((room) => { if (!visited.has(room.id)) visitRoom(room, 0, true); });
  const expandAncestors = (roomIds) => {
    setCollapsedRooms((current) => {
      const next = new Set(current);
      roomIds.forEach((roomId) => {
        const visitedParents = new Set();
        let parent = roomsById.get(roomId);
        while (parent && !visitedParents.has(parent.id)) {
          visitedParents.add(parent.id);
          next.delete(parent.id);
          parent = roomsById.get(parent.parentId);
        }
      });
      return next;
    });
  };
  const updateSearch = (value) => {
    setSearch(value);
    const term = value.trim().toLowerCase();
    if (term) expandAncestors(rooms.filter((room) => room.name.toLowerCase().includes(term)).map((room) => room.parentId));
  };
  const startNewRoom = () => setEditingRoom({ id: "", name: "", schedule: schedules[0]?.id || "facility", parentId: "" });
  const saveRoom = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") || "").trim();
    const parentId = String(data.get("parentId") || "");
    const schedule = String(data.get("schedule") || "");
    if (!name || !schedule) return;
    if (editingRoom.id) {
      setRooms((current) => current.map((room) => room.id === editingRoom.id ? { ...room, name, schedule, parentId } : room));
      onToast(`“${name}” updated.`);
    } else {
      const id = globalThis.crypto?.randomUUID ? globalThis.crypto.randomUUID() : `room-${Date.now()}`;
      setRooms((current) => [...current, { id, name, schedule, parentId }]);
      onToast(`“${name}” added.`);
    }
    if (parentId) expandAncestors([parentId]);
    setEditingRoom(null);
  };
  const deleteRoom = (room) => {
    if (rooms.some((item) => item.parentId === room.id)) {
      onToast("Move or delete rooms inside this room before deleting it.");
      return;
    }
    setRooms((current) => current.filter((item) => item.id !== room.id));
    onToast(`“${room.name}” deleted.`);
  };
  const scheduleSummary = (schedule) => schedule === "facility" ? "Facility hours" : schedules.find((item) => item.id === schedule)?.name || "No schedule";

  if (editingRoom) return <section className="rooms-page rooms-form-page">
    <div className="rooms-breadcrumb"><button type="button" onClick={() => setEditingRoom(null)}>Rooms</button><span>/</span><span>{editingRoom.id ? "Edit Room" : "Add Room"}</span></div>
    <h2 className="rooms-form-title">{editingRoom.id ? "Edit Room" : "Add Room"}</h2>
    <form className="room-details-card" onSubmit={saveRoom}>
      <h3 className="room-details-title">Room Details</h3>
      <div className="room-details-fields">
        <section className="room-detail-row">
          <div><h4>Basics</h4><p>Set the name of this room</p></div>
          <label>Name<input name="name" required maxLength={80} defaultValue={editingRoom.name} autoFocus/></label>
        </section>
        <section className="room-detail-row">
          <div><h4>Schedule</h4><p>Assign a schedule to this room to set opening &amp; closing times on the room&apos;s availability</p></div>
          <label>Schedule<select name="schedule" defaultValue={editingRoom.schedule} required><option value="facility">Facility opening hours</option>{schedules.map((schedule) => <option key={schedule.id} value={schedule.id}>{schedule.name}</option>)}</select></label>
        </section>
        <section className="room-detail-row">
          <div><h4>Hierarchy</h4><p>Decide where this room should exist inside the setup of your facility</p></div>
          <label>Room should exist within<select name="parentId" defaultValue={editingRoom.parentId}><option value="">Facility (top level)</option>{parentChoices.map((room) => <option key={room.id} value={room.id}>{`${"— ".repeat(getRoomDepth(room.id))}${room.name}`}</option>)}</select><small>Rooms can live inside other rooms — up to 4 levels deep.</small></label>
        </section>
      </div>
      <footer className="room-details-actions"><button type="button" className="admin-button secondary" onClick={() => setEditingRoom(null)}>Cancel</button><button type="submit" className="admin-button primary">Save</button></footer>
    </form>
  </section>;

  return <section className="rooms-page">
    <header className="rooms-list-heading"><div><h2>Rooms</h2><p>Rooms are bookable spaces within your facility.</p></div><button className="admin-button primary" onClick={startNewRoom}><Icon name="plus" size={17}/> New</button></header>
    <label className="rooms-search"><Icon name="search" size={19}/><input type="search" value={search} onChange={(event) => updateSearch(event.target.value)} placeholder="Search rooms..." aria-label="Search rooms"/></label>
    <div className="rooms-table-wrap"><table className="rooms-table"><thead><tr><th>Name</th><th>Schedule</th><th>Actions</th></tr></thead><tbody>
      {visibleRooms.map(({ room, depth }) => {
        const hasChildren = (childrenByParent.get(room.id) || []).length > 0;
        const expanded = !collapsedRooms.has(room.id);
        return <tr key={room.id}><td><div className="room-name" style={{ paddingLeft: `${depth * 28}px` }}>{hasChildren ? <button type="button" className={`room-expand ${expanded ? "expanded" : ""}`} aria-label={`${expanded ? "Collapse" : "Expand"} ${room.name}`} aria-expanded={expanded} onClick={() => setCollapsedRooms((current) => { const next = new Set(current); if (next.has(room.id)) next.delete(room.id); else next.add(room.id); return next; })}><Icon name="chevronDown" size={16}/></button> : <span className="room-expand-spacer"/>}<span>{room.name}</span></div></td><td>{scheduleSummary(room.schedule)}</td><td><div className="room-row-actions"><button type="button" onClick={() => setEditingRoom({ ...room })}>Edit</button><button type="button" onClick={() => deleteRoom(room)}>Delete</button></div></td></tr>;
      })}
      {visibleRooms.length === 0 && <tr><td className="rooms-empty" colSpan="3">{rooms.length ? "No rooms match your search." : "No rooms yet. Create a room to make a space bookable."}</td></tr>}
    </tbody></table></div>
  </section>;
}

function EquipmentPage({ equipment, setEquipment, onToast }) {
  const [search, setSearch] = useState("");
  const [equipmentDialog, setEquipmentDialog] = useState(null);
  const [expandedGroups, setExpandedGroups] = useState(() => new Set(equipment.filter((item) => !item.parentId).map((item) => item.id)));
  const [openMenu, setOpenMenu] = useState(null);
  const query = search.trim().toLowerCase();
  const groups = equipment.filter((item) => !item.parentId);
  const visibleGroups = groups.filter((group) => group.name.toLowerCase().includes(query) || equipment.some((item) => item.parentId === group.id && item.name.toLowerCase().includes(query)));
  const openCreateGroup = () => setEquipmentDialog({ mode: "group", id: "", name: "" });
  const openCreateItem = (group) => setEquipmentDialog({ mode: "item", id: "", name: "", parentId: group.id });
  const openEditEquipment = (item) => setEquipmentDialog({ mode: item.parentId ? "item" : "group", id: item.id, name: item.name, parentId: item.parentId || "" });
  const saveEquipment = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") || "").trim();
    if (!name) return;
    const parentId = equipmentDialog.mode === "item" ? equipmentDialog.parentId : "";
    if (equipment.some((item) => item.id !== equipmentDialog.id && item.parentId === parentId && item.name.toLowerCase() === name.toLowerCase())) {
      onToast("Equipment with that name already exists in this group.");
      return;
    }
    if (equipmentDialog.id) {
      setEquipment((current) => current.map((item) => item.id === equipmentDialog.id ? { ...item, name } : item));
      onToast(`“${name}” updated.`);
    } else {
      const id = globalThis.crypto?.randomUUID ? globalThis.crypto.randomUUID() : `equipment-${Date.now()}`;
      setEquipment((current) => [...current, { id, name, parentId }]);
      if (parentId) setExpandedGroups((current) => new Set(current).add(parentId));
      onToast(`“${name}” added.`);
    }
    setEquipmentDialog(null);
  };
  const removeEquipment = (item) => {
    if (!item.parentId && equipment.some((entry) => entry.parentId === item.id)) {
      onToast("Delete the equipment items in this group before deleting the group.");
      return;
    }
    setEquipment((current) => current.filter((entry) => entry.id !== item.id));
    onToast(`“${item.name}” deleted.`);
  };
  return <section className="equipment-page">
    <header className="equipment-heading"><div><h1>Equipment</h1><p>Monitor the usage of key equipment at your facility.</p></div><button className="equipment-new-button" onClick={openCreateGroup}><Icon name="plus" size={18}/> New</button></header>
    <label className="equipment-search"><Icon name="search" size={20}/><input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search equipment..." aria-label="Search equipment"/></label>
    <div className="equipment-table-wrap"><table className="equipment-table"><thead><tr><th>Name</th><th>Actions</th></tr></thead><tbody>
      {visibleGroups.flatMap((group) => {
        const children = equipment.filter((item) => item.parentId === group.id);
        const matchingChildren = children.filter((item) => !query || group.name.toLowerCase().includes(query) || item.name.toLowerCase().includes(query));
        const isExpanded = expandedGroups.has(group.id) || Boolean(query);
        return [
          <tr className="equipment-group-row" key={group.id}>
            <td><button type="button" className={`equipment-expand ${isExpanded ? "expanded" : ""}`} aria-label={`${isExpanded ? "Collapse" : "Expand"} ${group.name}`} aria-expanded={isExpanded} onClick={() => setExpandedGroups((current) => { const next = new Set(current); if (next.has(group.id)) next.delete(group.id); else next.add(group.id); return next; })}><Icon name="chevronDown" size={18}/></button><span>{group.name}</span></td>
            <td><div className="equipment-group-actions"><button type="button" className="equipment-icon-button" aria-label={`Edit ${group.name}`} onClick={() => openEditEquipment(group)}><Icon name="edit" size={18}/></button><div className="equipment-action-menu-wrap"><button type="button" className="equipment-icon-button equipment-more-button" aria-label={`Actions for ${group.name}`} aria-expanded={openMenu === group.id} onClick={() => setOpenMenu((current) => current === group.id ? null : group.id)}>⋮</button>{openMenu === group.id && <div className="equipment-action-menu"><button type="button" onClick={() => { setOpenMenu(null); openCreateItem(group); }}>Add equipment item</button><button type="button" onClick={() => { setOpenMenu(null); removeEquipment(group); }}>Delete group</button></div>}</div></div></td>
          </tr>,
          ...(isExpanded ? matchingChildren.map((item) => <tr className="equipment-item-row" key={item.id}><td><span>{item.name}</span></td><td><div className="equipment-action-menu-wrap"><button type="button" className="equipment-icon-button equipment-more-button" aria-label={`Actions for ${item.name}`} aria-expanded={openMenu === item.id} onClick={() => setOpenMenu((current) => current === item.id ? null : item.id)}>⋮</button>{openMenu === item.id && <div className="equipment-action-menu"><button type="button" onClick={() => { setOpenMenu(null); openEditEquipment(item); }}>Edit</button><button type="button" onClick={() => { setOpenMenu(null); removeEquipment(item); }}>Delete</button></div>}</div></td></tr>) : [])
        ];
      })}
      {visibleGroups.length === 0 && <tr><td className="equipment-empty" colSpan="2">{equipment.length ? "No equipment matches your search." : "No equipment added yet."}</td></tr>}
    </tbody></table></div>
    {equipmentDialog && <div className="equipment-modal-scrim" onMouseDown={(event) => { if (event.target === event.currentTarget) setEquipmentDialog(null); }}>
      <form className="equipment-modal" onSubmit={saveEquipment} aria-labelledby="equipment-modal-title">
        <h2 id="equipment-modal-title">{equipmentDialog.id ? "Edit equipment" : equipmentDialog.mode === "item" ? "Add equipment item" : "Create new equipment"}</h2>
        <label>Name<input name="name" required maxLength={80} autoFocus defaultValue={equipmentDialog.name} placeholder="Enter equipment name"/></label>
        <footer><button type="button" className="equipment-cancel" onClick={() => setEquipmentDialog(null)}>Cancel</button><button type="submit" className="equipment-save">Save</button></footer>
      </form>
    </div>}
  </section>;
}

function Admin({ onHome, onUpgradeLogin, services, setServices }) {
  const [page, setPage] = useState("Overview");
  const [serviceSection, setServiceSection] = useState("Rentals");
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [selectedSetting, setSelectedSetting] = useState("Basics");
  const [facilityDetails, setFacilityDetails] = useState(() => {
    const savedDetails = safeRead("crickhub-facility-details-v1", {});
    return { ...defaultFacilityDetails, ...(savedDetails && typeof savedDetails === "object" ? savedDetails : {}) };
  });
  const [bookingModal, setBookingModal] = useState(false);
  const [bookingDraft, setBookingDraft] = useState({ date: todayISO(), lane: "Lane 01", time: "10:30", coach: "To be assigned", equipment: "" });
  const [bookings, setBookings] = useState(() => safeRead("crickhub-bookings-v1", seedBookings));
  const [customers, setCustomers] = useState(() => safeRead("crickhub-customers-v1", seedCustomers));
  const [availability, setAvailability] = useState(() => safeRead("crickhub-availability-v1", { hours: seedAvailability, blockedDates: [] }));
  const [campaigns, setCampaigns] = useState(() => {
    const saved = safeRead("crickhub-campaigns-v1", null);
    const legacySamples = Array.isArray(saved) && saved.length > 0 && saved.every((campaign) => ["campaign-welcome", "campaign-season"].includes(campaign.id));
    return !Array.isArray(saved) || saved.length === 0 || legacySamples ? seedCampaigns : saved;
  });
  const [memberships, setMemberships] = useState(() => safeRead("crickhub-memberships-v1", seedMemberships));
  const [packages, setPackages] = useState(() => safeRead("crickhub-packages-v1", seedPackages));
  const [rentals, setRentals] = useState(() => safeRead("crickhub-rentals-v1", seedRentals));
  const [collections, setCollections] = useState(() => safeRead("crickhub-collections-v1", seedCollections));
  const [rooms, setRooms] = useState(() => safeRead("crickhub-rooms-v1", []));
  const [equipment, setEquipment] = useState(() => safeRead("crickhub-equipment-v1", []));
  const [schedules, setSchedules] = useState(() => safeRead("crickhub-schedules-v1", []));
  const [toast, setToast] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  useEffect(() => { if (!toast) return; const timer = setTimeout(() => setToast(""), 2600); return () => clearTimeout(timer); }, [toast]);
  useEffect(() => { if (page !== "Services") setServiceSection("Rentals"); }, [page]);
  useEffect(() => {
    try { localStorage.setItem("crickhub-bookings-v1", JSON.stringify(bookings)); }
    catch (error) { console.error("Could not save bookings", error); }
  }, [bookings]);
  useEffect(() => {
    try {
      localStorage.setItem("crickhub-customers-v1", JSON.stringify(customers));
      localStorage.setItem("crickhub-availability-v1", JSON.stringify(availability));
      localStorage.setItem("crickhub-campaigns-v1", JSON.stringify(campaigns));
    } catch (error) { console.error("Could not save customers, availability, and campaigns", error); }
  }, [customers, availability, campaigns]);
  useEffect(() => {
    try {
      localStorage.setItem("crickhub-memberships-v1", JSON.stringify(memberships));
      localStorage.setItem("crickhub-packages-v1", JSON.stringify(packages));
      localStorage.setItem("crickhub-rentals-v1", JSON.stringify(rentals));
      localStorage.setItem("crickhub-collections-v1", JSON.stringify(collections));
    } catch (error) { console.error("Could not save services, plans, packages, rentals, and collections", error); }
  }, [memberships, packages, rentals, collections]);
  useEffect(() => {
    try { localStorage.setItem("crickhub-rooms-v1", JSON.stringify(rooms)); }
    catch (error) { console.error("Could not save rooms", error); }
  }, [rooms]);
  useEffect(() => {
    try { localStorage.setItem("crickhub-equipment-v1", JSON.stringify(equipment)); }
    catch (error) { console.error("Could not save equipment", error); }
  }, [equipment]);
  useEffect(() => {
    try { localStorage.setItem("crickhub-schedules-v1", JSON.stringify(schedules)); }
    catch (error) { console.error("Could not save schedules", error); }
  }, [schedules]);
  const menu = [
    ["Overview", "home", "Home"], ["Services", "link"], ["Calendar", "calendar"],
    ["Availability", "clock"], ["Customers", "people"], ["Marketing", "send"],
    ["Reports", "chart"], ["Settings", "settings"]
  ];
  const copyPublicLink = async () => {
    const url = `https://book.crickhubapp.com/facilities/${facilityDetails.bookingSlug}`;
    try { await navigator.clipboard.writeText(url); setToast("Public page link copied."); }
    catch (error) { console.error("Could not copy public page link", error); setToast(url); }
  };
  const descriptions = {
    Calendar: "View bookings by day, week, room, or staff member.",
    Availability: "Set when players can book your facility.",
    Customers: "Keep customer profiles and booking history together.",
    Marketing: "Create campaigns and keep your cricket community engaged.",
    Services: "Manage rentals, membership plans, campaigns, and collections for your cricket center.",
    Bookings: "Your upcoming sessions, all in one place."
  };
  const openBooking = (draft = {}) => {
    setBookingDraft({ date: draft.date || todayISO(), lane: draft.lane || "Lane 01", time: draft.time || "10:30", coach: draft.coach || "To be assigned", equipment: draft.equipment || "" });
    setBookingModal(true);
  };
  const saveFacilityDetails = (details) => {
    try {
      localStorage.setItem("crickhub-facility-details-v1", JSON.stringify(details));
      setFacilityDetails(details);
      return true;
    } catch (error) {
      console.error("Could not save facility details", error);
      return false;
    }
  };
  return <div className="admin-app">
    {settingsOpen && <SettingsPage selected={selectedSetting} onSelect={setSelectedSetting} onBack={() => setSettingsOpen(false)} onHome={onHome} onUpgradeLogin={onUpgradeLogin} facilityDetails={facilityDetails} onSave={saveFacilityDetails} rooms={rooms} setRooms={setRooms} equipment={equipment} setEquipment={setEquipment} schedules={schedules} setSchedules={setSchedules} services={services} rentals={rentals} memberships={memberships} campaigns={campaigns} collections={collections} onToast={setToast}/>}
    <aside className={`admin-sidebar ${sidebarOpen ? "sidebar-open" : ""}`}><Brand onClick={onHome}/><div className="admin-facility"><span>{facilityDetails.facilityName.slice(0, 1).toUpperCase()}</span><div><b>{facilityDetails.facilityName}</b><small>{[facilityDetails.city, facilityDetails.state].filter(Boolean).join(", ") || "Facility location not set"}</small></div></div><small className="admin-menu-label">WORKSPACE</small><nav>{menu.map(([item, icon, label]) => <React.Fragment key={item}><button className={page === item ? "selected" : ""} onClick={() => { if (item === "Settings") { setSelectedSetting("Basics"); setSettingsOpen(true); } else { if (item === "Services") setServiceSection("Rentals"); setPage(item); setSidebarOpen(false); } }}><Icon name={icon} size={18}/>{label || item}</button>{item === "Services" && page === "Services" && <button type="button" className={`admin-subnav-item ${serviceSection === "Collections" ? "selected" : ""}`} aria-current={serviceSection === "Collections" ? "page" : undefined} onClick={() => { setServiceSection("Collections"); setSidebarOpen(false); }}><Icon name="folder" size={18}/>Collections</button>}</React.Fragment>)}</nav><div className="admin-sidebar-links"><a href="mailto:support@crickhub.com"><Icon name="chat" size={18}/>Contact Us</a><button type="button" onClick={() => setToast("Help Center is coming soon.")}><Icon name="help" size={18}/>Help Center</button><button type="button" onClick={copyPublicLink}><Icon name="copy" size={18}/>Copy public page link</button></div></aside>
    <main className="admin-main"><header className="admin-topbar"><button className="admin-mobile-menu" onClick={() => setSidebarOpen(!sidebarOpen)}><Icon name="menu"/></button><div>{facilityDetails.facilityName} <span>/</span> <b>{page === "Overview" ? "Home" : page}</b></div><button className="admin-user" onClick={() => setToast("You’re all caught up.")}>AR</button></header>
      <div className="admin-content">
        {page === "Overview" ? <div className="admin-heading home-heading"><div><span className="admin-kicker">{facilityDetails.facilityName.toUpperCase()}</span><h1>{`${new Date().getHours() < 12 ? "Good morning" : new Date().getHours() < 18 ? "Good afternoon" : "Good evening"}, ${safeRead("crickhub-profile-v1", {}).firstName || "there"}`}</h1><p>{new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })} · Your facility is live.</p></div></div> :
        <div className="admin-heading"><div><span className="admin-kicker">{facilityDetails.facilityName.toUpperCase()} · FACILITY MANAGEMENT</span><h1>{page}</h1><p>{descriptions[page] || "Here’s what’s happening at your cricket center today."}</p></div>{page === "Calendar" && <button className="admin-button primary" onClick={() => openBooking()}><Icon name="plus" size={17}/> New booking</button>}</div>}
        {page === "Services" ? <ServicesManager services={services} memberships={memberships} setMemberships={setMemberships} packages={packages} setPackages={setPackages} rentals={rentals} setRentals={setRentals} collections={collections} setCollections={setCollections} campaigns={campaigns} setCampaigns={setCampaigns} customers={customers} rooms={rooms} equipment={equipment} schedules={schedules} onToast={setToast} section={serviceSection} setSection={setServiceSection} /> :
          page === "Calendar" ? <CalendarPage bookings={bookings} onNewBooking={openBooking}/> :
          page === "Availability" ? <AvailabilityPage availability={availability} setAvailability={setAvailability} onToast={setToast}/> :
          page === "Customers" ? <CustomersPage customers={customers} setCustomers={setCustomers} bookings={bookings} onToast={setToast}/> :
          page === "Marketing" ? <MarketingPage campaigns={campaigns} setCampaigns={setCampaigns} onToast={setToast} services={services} rentals={rentals} memberships={memberships} packages={packages} customers={customers}/> :
          page === "Overview" ? <HomeDashboard facilityDetails={facilityDetails} services={services} rooms={rooms} bookings={bookings} customers={customers} availability={availability} onPage={setPage} onSettings={(name) => { setSelectedSetting(name); setSettingsOpen(true); }} onBooking={() => openBooking()}/> :
          page === "Bookings" ? <section className="admin-panel"><div className="admin-panel-heading"><div><h2>Upcoming bookings</h2><p>{bookings.length} sessions scheduled</p></div></div><BookingTable bookings={bookings}/></section> :
          <section className="admin-panel placeholder-panel"><span className="service-illustration"><Icon name={page === "Members" || page === "Coaches" ? "people" : "court"}/></span><h2>{page} at your fingertips</h2><p>Your cricket center’s {page.toLowerCase()} tools will appear here.</p><button className="admin-button secondary" onClick={() => setPage("Services")}>Explore services <Icon name="arrow" size={16}/></button></section>}
      </div>
      <footer className="admin-footer">© 2026 CrickHub <button onClick={onHome}>Back to CrickHub home ↗</button></footer>
    </main>
    {bookingModal && <BookingModal facilityName={facilityDetails.facilityName} initialDate={bookingDraft.date} initialLane={bookingDraft.lane} initialTime={bookingDraft.time} initialCoach={bookingDraft.coach} initialEquipment={bookingDraft.equipment} onClose={() => setBookingModal(false)} onSave={(booking) => {
      const start = clockMinutes(booking.time);
      const end = start + 60;
      if ((availability.blockedDates || []).includes(booking.date)) { setToast("This date is blocked from online bookings."); return false; }
      const availabilityDay = (availability.hours || seedAvailability).find((item) => item.day === calendarDay(booking.date).toLocaleDateString("en-US", { weekday: "long" }));
      if (!availabilityDay?.open) { setToast("This facility is closed on the selected date."); return false; }
      if (start < clockMinutes(availabilityDay.start) || end > clockMinutes(availabilityDay.end)) { setToast("This booking falls outside the facility’s opening hours."); return false; }
      const conflict = bookings.some((item) => item.lane === booking.lane && (item.date || todayISO()) === booking.date && item.status !== "Cancelled" && start < (clockMinutes(item.end) ?? -1) && end > (clockMinutes(item.time) ?? 1440));
      if (conflict) { setToast("That lane is already booked during this time. Choose another slot."); return false; }
      setCustomers((items) => items.some((customer) => customer.name.toLowerCase() === booking.name.toLowerCase()) ? items : [{ id: `customer-${Date.now()}`, name: booking.name, email: "", phone: "", notes: "" }, ...items]);
      setBookings((items) => [booking, ...items]); setBookingModal(false); setToast("Booking confirmed."); return true;
    }}/>}
    {toast && <div className="toast-message">{toast}</div>}
  </div>;
}

function HomeDashboard({ facilityDetails, services, rooms, bookings, customers, availability, onPage, onSettings, onBooking }) {
  const [dismissed, setDismissed] = useState(() => safeRead("crickhub-home-setup-dismissed-v1", false) === true);
  const [expanded, setExpanded] = useState(false);
  const [openStep, setOpenStep] = useState("");
  const [manualDone, setManualDone] = useState(() => safeRead("crickhub-home-setup-manual-v1", {}));
  const dismiss = () => {
    setDismissed(true);
    try { localStorage.setItem("crickhub-home-setup-dismissed-v1", "true"); } catch (error) { console.error("Could not save setup state", error); }
  };
  const markDone = (id) => {
    const next = { ...manualDone, [id]: true };
    setManualDone(next);
    try { localStorage.setItem("crickhub-home-setup-manual-v1", JSON.stringify(next)); } catch (error) { console.error("Could not save setup state", error); }
  };
  const bookingPage = safeRead("crickhub-booking-page-v1", null) || {};
  const waiver = safeRead("crickhub-policies-v1", null)?.waiver;
  const steps = [
    { id: "rooms", label: "Add rooms to your facility", text: "Add the lanes, cages or courts customers can book.", done: (rooms || []).length > 0, cta: "Go to Rooms", go: () => onSettings("Rooms") },
    { id: "waiver", label: "Upload a liability waiver", text: "Upload a PDF waiver customers must accept before booking.", done: Boolean(waiver?.data), cta: "Go to Policies", go: () => onSettings("Policies") },
    { id: "settings", label: "Customize your facility settings", text: "Complete your facility's basic details.", cta: "Go to Basics", go: () => onSettings("Basics"), subs: [["Set your facility name", Boolean(facilityDetails.facilityName)], ["Add your street address and zip code", Boolean(facilityDetails.address1 && facilityDetails.zip)], ["Add a phone number", Boolean(facilityDetails.phone)]] },
    { id: "payments", label: "Connect Stripe to handle online payments", text: "Stripe is not connected in this demo. Review payouts, then mark this step as done.", cta: "Go to Payouts", go: () => onSettings("Payouts"), manual: true, subs: [["Review your payouts", Boolean(manualDone.payments)], ["Set up checkout", safeRead("crickhub-checkout-settings-v1", null) !== null]] },
    { id: "service", label: "Create your first bookable service", text: "Add a rental, lesson, camp or membership customers can book.", done: (services || []).length > 0, cta: "Go to Services", go: () => onPage("Services") },
    { id: "booking-page", label: "Customize your booking page", text: "Make your public booking page your own.", cta: "Go to Booking Page", go: () => onSettings("Booking Page"), subs: [["Upload your logo", Boolean(bookingPage.logo)], ["Add a banner image", (bookingPage.banners || []).length > 0], ["Add your website", Boolean(bookingPage.social?.website)]] },
    { id: "app", label: "Download the CrickHub admin mobile app", text: "Manage bookings on the go with the CrickHub admin app.", done: Boolean(manualDone.app), manual: true }
  ].map((step) => {
    const subDone = step.subs ? step.subs.filter(([, ok]) => ok).length : 0;
    return { ...step, subDone, done: step.subs ? subDone === step.subs.length : step.done };
  });
  const doneCount = steps.filter((step) => step.done).length;
  const remaining = steps.length - doneCount;
  const today = todayISO();
  const nowMinutes = new Date().getHours() * 60 + new Date().getMinutes();
  const upcoming = bookings.filter((item) => item.status !== "Cancelled" && ((item.date || today) > today || ((item.date || today) === today && (clockMinutes(item.time) ?? 0) >= nowMinutes)));
  const upcomingToday = upcoming.filter((item) => (item.date || today) === today).length;
  const hourCounts = bookings.reduce((counts, item) => { const minutes = clockMinutes(item.time); if (minutes != null) counts[Math.floor(minutes / 60)] = (counts[Math.floor(minutes / 60)] || 0) + 1; return counts; }, {});
  const popularHour = Object.keys(hourCounts).sort((a, b) => hourCounts[b] - hourCounts[a])[0];
  const popularLabel = popularHour === undefined ? "—" : `${Number(popularHour) % 12 || 12} ${Number(popularHour) >= 12 ? "PM" : "AM"}`;
  const popularNote = popularHour === undefined ? "No bookings yet" : Number(popularHour) < 12 ? "Mornings" : Number(popularHour) < 17 ? "Afternoons" : "Evenings";
  return <div className="home-grid">
    <div className="home-main">
      {!dismissed && <section className="home-setup">
        <button type="button" className="home-setup-close" aria-label="Dismiss setup" onClick={dismiss}><Icon name="close" size={20}/></button>
        <span className="home-setup-badge"><Icon name="check" size={15}/>{doneCount === steps.length ? "Setup complete" : bookings.length > 0 ? "First booking completed" : "Getting started"}</span>
        <h2>{doneCount === steps.length ? "Your facility is fully set up — great job!" : bookings.length > 0 ? "You've completed your first booking — nice work!" : "Let's get your facility ready for bookings"}</h2>
        <div className="home-progress"><div className="home-progress-bar"><i style={{ width: `${(doneCount / steps.length) * 100}%` }}/></div><span>{doneCount}/{steps.length}</span></div>
        {remaining > 0 && <p className="home-setup-note">You're almost there — {remaining} step{remaining === 1 ? "" : "s"} left to finish setting up.</p>}
        <button type="button" className="home-continue" aria-expanded={expanded} onClick={() => setExpanded(!expanded)}>{expanded ? "Hide setup" : "Continue setup"}<Icon name="chevronDown" size={17}/></button>
        {expanded && <ul className="home-steps">{steps.map((step) => <li key={step.id} className={step.done ? "done" : ""}>
          <button type="button" className="home-step-row" aria-expanded={openStep === step.id} onClick={() => setOpenStep(openStep === step.id ? "" : step.id)}>
            <span className="home-step-check">{step.done && <Icon name="check" size={13}/>}</span>
            <span className="home-step-label">{step.label}</span>
            {step.subs && <span className="home-step-count">{step.subDone}/{step.subs.length}</span>}
            <Icon name="chevronDown" size={18}/>
          </button>
          {openStep === step.id && <div className="home-step-detail">
            <p>{step.text}</p>
            {step.subs && <ul>{step.subs.map(([label, ok]) => <li key={label} className={ok ? "done" : ""}><span className="home-step-check small">{ok && <Icon name="check" size={11}/>}</span>{label}</li>)}</ul>}
            <div>
              {step.go && <button type="button" className="home-step-go" onClick={step.go}>{step.cta}</button>}
              {step.manual && !manualDone[step.id] && <button type="button" className="home-step-mark" onClick={() => markDone(step.id)}>Mark as done</button>}
            </div>
          </div>}
        </li>)}</ul>}
      </section>}
      <h2 className="home-section-title">Your business</h2>
      <div className="home-stats">
        <div><span>Revenue</span><strong>$0</strong><small>$0 per booking on average</small></div>
        <div><span>Bookings</span><strong>{bookings.length}</strong><small>{upcomingToday} upcoming today</small></div>
        <div><span>New customers</span><strong>{customers.length}</strong><small>{customers.length} total</small></div>
        <div><span>Most popular time</span><strong>{popularLabel}</strong><small>{popularNote}</small></div>
      </div>
      <p className="home-insight">More insights appear here as your facility builds history.</p>
    </div>
    <aside className="home-side">
      <section className="home-upcoming">
        <h2>Upcoming bookings</h2>
        {upcoming.length ? <ul>{upcoming.slice(0, 4).map((item) => <li key={`${item.name}-${item.date}-${item.time}`}><b>{item.name}</b><span>{item.time} · {item.lane}</span></li>)}</ul> : <p className="home-empty">No upcoming bookings</p>}
        <button type="button" className="inline-link" onClick={() => onPage("Calendar")}>View calendar <Icon name="arrowUp" size={14}/></button>
      </section>
      <h3 className="home-resources-title">Resources</h3>
      <article className="home-resource">
        <div className="home-resource-art"><b>CRICKET<br/>FACILITY</b><span>PRICING GUIDE</span></div>
        <h4>Pricing guide</h4>
        <p>How to price your services to stay competitive and keep your calendar full.</p>
      </article>
      <a className="home-help" href="mailto:support@crickhub.com"><Icon name="help" size={22}/><span><b>Help center</b><small>Guides, how-tos, and answers.</small></span></a>
    </aside>
  </div>;
}

function Metric({ label, value, change, icon }) {
  return <article className="metric-card"><span>{label}</span><Icon name={icon} size={18}/><strong>{value}</strong><small><b>↗ {change}</b> vs. last week</small></article>;
}
function BookingTable({ bookings }) {
  return <div className="booking-table-wrap"><table className="admin-booking-table"><thead><tr><th>PLAYER</th><th>LANE / SESSION</th><th>TIME</th><th>COACH</th><th>STATUS</th></tr></thead><tbody>{bookings.map((booking) => <tr key={`${booking.name}-${booking.time}`}><td><span className={`table-avatar ${booking.color}`}>{booking.initials}</span><b>{booking.name}</b></td><td>{booking.lane}<small>{booking.session}</small></td><td>{booking.time}</td><td>{booking.coach}</td><td><span className={`booking-status ${booking.status === "Pending" ? "pending" : ""}`}>{booking.status}</span></td></tr>)}</tbody></table></div>;
}
function BookingModal({ facilityName, onClose, onSave, initialDate = todayISO(), initialLane = "Lane 01", initialTime = "10:30", initialCoach = "To be assigned", initialEquipment = "" }) {
  const lanes = ["Lane 01", "Lane 02", "Lane 03", "Lane 04", "Lane 05", "Outdoor Lane 1", "Outdoor Lane 2", "Outdoor Lane 3"];
  const staff = ["To be assigned", ...calendarResources.Staff];
  const equipment = ["", ...calendarResources.Equipment];
  return <div className="modal-scrim" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
    <form className="admin-modal" onSubmit={(event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      const name = String(data.get("name")).trim();
      const start = String(data.get("time"));
      const [hour, minute] = start.split(":").map(Number);
      const endDate = new Date(2000, 0, 1, hour + 1, minute);
      onSave({
        name,
        initials: name.split(/\s+/).map((part) => part[0]).join("").slice(0, 2).toUpperCase(),
        lane: String(data.get("lane")),
        session: String(data.get("session")),
        time: displayTime(start),
        end: displayTime(`${String(endDate.getHours()).padStart(2, "0")}:${String(endDate.getMinutes()).padStart(2, "0")}`),
        date: String(data.get("date")),
        coach: String(data.get("coach")),
        equipment: String(data.get("equipment")),
        status: "Confirmed",
        color: "green"
      });
    }}>
      <button type="button" className="modal-x" onClick={onClose} aria-label="Close">×</button>
      <span className="admin-kicker">{facilityName.toUpperCase()}</span><h2>New booking</h2><p>Reserve a lane for a player or training session.</p>
      <label>Player name<input name="name" required placeholder="e.g. Jordan Lee"/></label>
      <div className="form-split"><label>Lane<select name="lane" defaultValue={initialLane}>{lanes.map((lane) => <option key={lane}>{lane}</option>)}</select></label><label>Session<select name="session"><option>Net practice</option><option>Batting practice</option><option>Bowling practice</option><option>Coaching session</option></select></label></div>
      <div className="form-split"><label>Staff<select name="coach" defaultValue={initialCoach}>{staff.map((person) => <option key={person}>{person}</option>)}</select></label><label>Equipment<select name="equipment" defaultValue={initialEquipment}>{equipment.map((item) => <option key={item} value={item}>{item || "No equipment"}</option>)}</select></label></div>
      <div className="form-split"><label>Date<input name="date" type="date" required defaultValue={initialDate}/></label><label>Start time<input name="time" type="time" required defaultValue={initialTime}/></label></div>
      <div className="modal-actions"><button className="admin-button secondary" type="button" onClick={onClose}>Cancel</button><button className="admin-button primary" type="submit">Confirm booking <Icon name="arrow" size={16}/></button></div>
    </form>
  </div>;
}

const appBase = import.meta.env.BASE_URL.replace(/\/$/, "");
const currentRoute = () => {
  const path = window.location.pathname;
  return (path.startsWith(appBase) ? path.slice(appBase.length) : path).replace(/\/+$/, "") || "/";
};
const publicSections = { rentals: "rentals", memberships: "memberships", campaigns: "campaigns", offers: "campaigns", collections: "collections" };
const parsePublicRoute = (route) => {
  const match = route.match(/^\/facilities\/([^/]+)(?:\/([^/]+))?$/);
  return match ? { slug: decodeURIComponent(match[1]), section: publicSections[match[2]] || "" } : null;
};

const publicFallbackFacilities = {
  northlakecricketacademy: { name: "Northlake Cricket Academy", description: "Structured coaching, indoor lanes and training for players of every level.", rentals: seedRentals, memberships: seedMemberships, campaigns: [], collections: seedCollections }
};

function loadPublicFacility(slug) {
  const details = safeRead("crickhub-facility-details-v1", null);
  const fallback = publicFallbackFacilities[slug];
  const isLocal = details?.bookingSlug === slug;
  if (!isLocal && !fallback) return null;
  const page = isLocal ? safeRead("crickhub-booking-page-v1", {}) : {};
  const rentals = isLocal ? safeRead("crickhub-rentals-v1", seedRentals) : fallback.rentals;
  const memberships = isLocal ? safeRead("crickhub-memberships-v1", seedMemberships) : fallback.memberships;
  const campaigns = isLocal ? safeRead("crickhub-campaigns-v1", seedCampaigns) : fallback.campaigns;
  const collections = isLocal ? safeRead("crickhub-collections-v1", seedCollections) : fallback.collections;
  return {
    name: isLocal ? details.facilityName : fallback.name,
    location: isLocal ? [details.city, details.state].filter(Boolean).join(", ") : "",
    description: page.description || (isLocal ? "" : fallback.description),
    logo: page.logo?.data || "",
    banners: page.banners || [],
    social: page.social || {},
    categories: Array.isArray(page.serviceCategories) ? page.serviceCategories : [],
    sections: {
      rentals: rentals.filter((item) => item.active && !item.private),
      memberships: memberships.filter((item) => item.active),
      campaigns: campaigns.filter((item) => item.status && item.status !== "Draft"),
      collections
    }
  };
}

function PublicItemCard({ section, item, rentals, onReserve }) {
  const price = (value) => `$${Number(value).toLocaleString()}`;
  if (section === "rentals") return <article className="public-card"><div><h3>{item.name}</h3><p>{item.previewText || item.description}</p></div><div className="public-card-action"><strong>{price(item.price)}<small> / {item.rateUnit}</small></strong><button onClick={() => onReserve(item.name)}>Reserve</button></div></article>;
  if (section === "memberships") return <article className="public-card"><div><h3>{item.name}</h3><p>{item.description}</p>{item.benefits?.length > 0 && <ul>{item.benefits.map((benefit) => <li key={benefit}>{benefit}</li>)}</ul>}</div><div className="public-card-action"><strong>{price(item.price)}<small> / {item.billing === "Annually" ? "year" : "month"}</small></strong><button onClick={() => onReserve(item.name)}>Join</button></div></article>;
  if (section === "campaigns") return <article className="public-card"><div><h3>{item.name}</h3><p>{item.discountType === "Percentage" ? `${item.amount}% off` : `$${item.amount} off`} for {String(item.audience || "all customers").toLowerCase()}.</p></div>{item.code && <div className="public-card-action"><strong className="public-code">{item.code}</strong></div>}</article>;
  const included = (item.rentalIds || []).map((id) => rentals.find((rental) => rental.id === id)?.name).filter(Boolean);
  return <article className="public-card"><div><h3>{item.name}</h3><p>{included.length ? included.join(", ") : "No rentals added yet."}</p></div></article>;
}

function PublicFacilityPage({ slug, section, onNavigate, onHome }) {
  const [notice, setNotice] = useState("");
  const facility = loadPublicFacility(slug);
  if (!facility) return <main className="public-page"><div className="public-empty"><h1>Facility not found</h1><p>We couldn’t find a booking page for “{slug}”.</p><button onClick={() => onNavigate("/facilities")}>Browse facilities</button></div></main>;
  const names = { rentals: "Rentals", memberships: "Membership plans", campaigns: "Offers", collections: "Collections" };
  const defaultOrder = ["rentals", "memberships", "campaigns", "collections"];
  const ordered = [...facility.categories.map((category) => category.id).filter((id) => defaultOrder.includes(id)), ...defaultOrder.filter((id) => !facility.categories.some((category) => category.id === id))];
  const label = (id) => id === "campaigns" ? names.campaigns : (facility.categories.find((category) => category.id === id)?.name || names[id]);
  const available = ordered.filter((id) => facility.sections[id].length > 0);
  const visible = section && available.includes(section) ? [section] : available;
  const website = (facility.social.website || "").trim();
  const base = `/facilities/${slug}`;
  const socials = [["instagram", "Instagram", "https://instagram.com/"], ["facebook", "Facebook", "https://facebook.com/"], ["tiktok", "TikTok", "https://tiktok.com/@"], ["x", "X", "https://x.com/"]].filter(([key]) => facility.social[key]);
  const socialHref = (value, prefix) => /^https?:\/\//i.test(value) ? value : `${prefix}${value.replace(/^@/, "")}`;
  return <main className="public-page">
    <header className="public-header">
      <div className="public-brand">{facility.logo ? <img src={facility.logo} alt={`${facility.name} logo`}/> : <span className="public-monogram">{facility.name[0]}</span>}<div><h1>{facility.name}</h1>{facility.location && <p><Icon name="location" size={14}/> {facility.location}</p>}</div></div>
      <div className="public-header-links">{website && <a href={/^https?:\/\//i.test(website) ? website : `https://${website}`} target="_blank" rel="noopener noreferrer">Home</a>}{socials.map(([key, name, prefix]) => <a key={key} href={socialHref(facility.social[key], prefix)} target="_blank" rel="noopener noreferrer">{name}</a>)}</div>
    </header>
    {facility.banners.length > 0 && <div className="public-banner"><img src={facility.banners[0].data} alt={facility.banners[0].name}/></div>}
    {facility.description && <div className="public-description" dangerouslySetInnerHTML={{ __html: sanitizeBookingDescription(facility.description) }}/>}
    {available.length > 0 && <nav className="public-tabs" aria-label="Services"><button className={!section ? "selected" : ""} onClick={() => onNavigate(base)}>All</button>{available.map((id) => <button key={id} className={section === id ? "selected" : ""} onClick={() => onNavigate(`${base}/${id}`)}>{label(id)}</button>)}</nav>}
    {notice && <p className="public-notice" role="status">{notice}</p>}
    {visible.map((id) => <section key={id} className="public-section"><h2>{label(id)}</h2><div className="public-grid">{facility.sections[id].map((item) => <PublicItemCard key={item.id} section={id} item={item} rentals={facility.sections.rentals} onReserve={(name) => setNotice(`Online checkout for “${name}” isn’t connected yet. Please contact ${facility.name} to book.`)}/>)}</div></section>)}
    {available.length === 0 && <p className="public-empty-note">Nothing is available to book yet. Check back soon.</p>}
    {section && !available.includes(section) && available.length > 0 && <p className="public-empty-note">There’s nothing in {names[section]} right now — showing everything else.</p>}
    <footer className="public-footer">Powered by <button onClick={onHome}>CrickHub</button></footer>
  </main>;
}

const viewForRoute = (route) => route === "/signup" ? "signup" : route === "/login" ? "login" : route === "/dashboard" ? "admin" : "home";

function App() {
  const [route, setRoute] = useState(currentRoute);
  const [view, setView] = useState(() => viewForRoute(currentRoute()));
  const [services, setServices] = useState(() => safeRead("crickhub-services-v1", seedServices));
  const publicRoute = parsePublicRoute(route);
  const navigate = (path) => {
    if (currentRoute() !== path) window.history.pushState({}, "", appBase + path);
    setRoute(path);
    setView(viewForRoute(path));
  };
  const showView = (next) => navigate(next === "signup" ? "/signup" : next === "login" ? "/login" : next === "admin" ? "/dashboard" : "/");
  const openFacilities = () => navigate("/facilities");
  const openHome = () => navigate("/");
  useEffect(() => {
    const syncView = () => { const path = currentRoute(); setRoute(path); setView(viewForRoute(path)); };
    window.addEventListener("popstate", syncView);
    return () => window.removeEventListener("popstate", syncView);
  }, []);
  useEffect(() => {
    try { localStorage.setItem("crickhub-services-v1", JSON.stringify(services)); }
    catch (error) { console.error("Could not save services", error); }
  }, [services]);
  useEffect(() => {
    document.title = publicRoute ? "Book online" : route === "/facilities" ? "Find cricket facilities — CrickHub" : view === "home" ? "CrickHub — Run your cricket facility" : view === "login" ? "Facility sign in — CrickHub" : view === "signup" ? "Create your facility — CrickHub" : "CrickHub — Facility dashboard";
    window.scrollTo(0, 0);
  }, [view, route]);
  if (publicRoute) return <PublicFacilityPage key={publicRoute.slug} slug={publicRoute.slug} section={publicRoute.section} onNavigate={navigate} onHome={openHome}/>;
  if (route === "/facilities") return <FacilitiesHome onHome={openHome}/>;
  if (view === "home") return <Landing onAdmin={() => showView("admin")} onLogin={() => showView("login")} onSignup={() => showView("signup")} onFacilities={openFacilities}/>;
  if (view === "login") return <FacilityLogin onBack={() => showView("home")} onContinue={() => showView("admin")} onSignup={() => showView("signup")}/>;
  if (view === "signup") return <FacilitySignup onBack={() => showView("home")} onLogin={() => showView("login")} onCreated={() => { setServices([]); showView("admin"); }}/>;
  return <Admin onHome={() => showView("home")} onUpgradeLogin={() => showView("login")} services={services} setServices={setServices}/>;
}

createRoot(document.getElementById("root")).render(<React.StrictMode><App/></React.StrictMode>);
