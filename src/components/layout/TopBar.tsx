// src/components/layout/TopBar.tsx
import Container from "@/components/ui/Container";

const TOP_LINKS = [
  { label: "Trade Registration / Login", href: "#" },
  { label: "Customer Log-in", href: "#" },
  { label: "Contact Us", href: "#" },
  { label: "Newsletter Sign Up", href: "#" },
];

export const SOCIALS = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/ARKequine",
    hover: "#37589b",
    path: "M14 8.5V6.9c0-.7.2-1 1.1-1H17V3h-2.600C11.700 3 10.500 4.500 10.500 6.900v1.600H8.500V12h2v9H14v-9h2.700l.4-3.500H14z",
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/arkequine",
    hover: "#a67658",
    path: "M12,4.622c2.403,0,2.688,0.009,3.637,0.052c0.877,0.04,1.354,0.187,1.671,0.31c0.42,0.163,0.72,0.358,1.035,0.673 c0.315,0.315,0.51,0.615,0.673,1.035c0.123,0.317,0.27,0.794,0.31,1.671c0.043,0.949,0.052,1.234,0.052,3.637 s-0.009,2.688-0.052,3.637c-0.04,0.877-0.187,1.354-0.31,1.671c-0.163,0.42-0.358,0.72-0.673,1.035 c-0.315,0.315-0.615,0.51-1.035,0.673c-0.317,0.123-0.794,0.27-1.671,0.31c-0.949,0.043-1.233,0.052-3.637,0.052 s-2.688-0.009-3.637-0.052c-0.877-0.04-1.354-0.187-1.671-0.31c-0.42-0.163-0.72-0.358-1.035-0.673 c-0.315-0.315-0.51-0.615-0.673-1.035c-0.123-0.317-0.27-0.794-0.31-1.671C4.631,14.688,4.622,14.403,4.622,12 s0.009-2.688,0.052-3.637c0.04-0.877,0.187-1.354,0.31-1.671c0.163-0.42,0.358-0.72,0.673-1.035 c0.315-0.315,0.615-0.51,1.035-0.673c0.317-0.123,0.794-0.27,1.671-0.31C9.312,4.631,9.597,4.622,12,4.622 M12,3 C9.556,3,9.249,3.01,8.289,3.054C7.331,3.098,6.677,3.25,6.105,3.472C5.513,3.702,5.011,4.01,4.511,4.511 c-0.5,0.5-0.808,1.002-1.038,1.594C3.25,6.677,3.098,7.331,3.054,8.289C3.01,9.249,3,9.556,3,12c0,2.444,0.01,2.751,0.054,3.711 c0.044,0.958,0.196,1.612,0.418,2.185c0.23,0.592,0.538,1.094,1.038,1.594c0.5,0.5,1.002,0.808,1.594,1.038 c0.572,0.222,1.227,0.375,2.185,0.418C9.249,20.99,9.556,21,12,21s2.751-0.01,3.711-0.054c0.958-0.044,1.612-0.196,2.185-0.418 c0.592-0.23,1.094-0.538,1.594-1.038c0.5-0.5,0.808-1.002,1.038-1.594c0.222-0.572,0.375-1.227,0.418-2.185 C20.99,14.751,21,14.444,21,12s-0.01-2.751-0.054-3.711c-0.044-0.958-0.196-1.612-0.418-2.185c-0.23-0.592-0.538-1.094-1.038-1.594 c-0.5-0.5-1.002-0.808-1.594-1.038c-0.572-0.222-1.227-0.375-2.185-0.418C14.751,3.01,14.444,3,12,3L12,3z M12,7.378 c-2.552,0-4.622,2.069-4.622,4.622S9.448,16.622,12,16.622s4.622-2.069,4.622-4.622S14.552,7.378,12,7.378z M12,15 c-1.657,0-3-1.343-3-3s1.343-3,3-3s3,1.343,3,3S13.657,15,12,15z M16.804,6.116c-0.596,0-1.08,0.484-1.08,1.08 s0.484,1.08,1.08,1.08c0.596,0,1.08-0.484,1.08-1.08S17.401,6.116,16.804,6.116z",
  },
  {
    name: "X",
    href: "https://twitter.com/arkequine",
    hover: "#000",
    path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/channel/UCO8ffJ0DNeN3pj_7R1ovJ9A",
    hover: "#a72b1d",
    path: "M21.8,8.001c0,0-0.195-1.378-0.795-1.985c-0.76-0.797-1.613-0.801-2.004-0.847c-2.799-0.202-6.997-0.202-6.997-0.202 h-0.009c0,0-4.198,0-6.997,0.202C4.608,5.216,3.756,5.22,2.995,6.016C2.395,6.623,2.2,8.001,2.2,8.001S2,9.62,2,11.238v1.517 c0,1.618,0.2,3.237,0.2,3.237s0.195,1.378,0.795,1.985c0.761,0.797,1.76,0.771,2.205,0.855c1.6,0.153,6.8,0.201,6.8,0.201 s4.203-0.006,7.001-0.209c0.391-0.047,1.243-0.051,2.004-0.847c0.6-0.607,0.795-1.985,0.795-1.985s0.2-1.618,0.2-3.237v-1.517 C22,9.62,21.8,8.001,21.8,8.001z M9.935,14.594l-0.001-5.62l5.404,2.82L9.935,14.594z",
  },
];

function EuFlag() {
  const stars = Array.from({ length: 12 }, (_, i) => {
    const a = (i * Math.PI) / 6;
    return { x: 12 + 5.2 * Math.sin(a), y: 8 - 5.2 * Math.cos(a) };
  });
  return (
    <svg viewBox="0 0 24 16" width="24" height="16" aria-hidden="true">
      <rect width="24" height="16" fill="#039" />
      {stars.map((s, i) => (
        <circle key={i} cx={s.x} cy={s.y} r="0.9" fill="#fc0" />
      ))}
    </svg>
  );
}

function UkFlag() {
  return (
    <svg viewBox="0 0 24 16" width="24" height="16" aria-hidden="true">
      <rect width="24" height="16" fill="#012169" />
      <path d="M0 0L24 16M24 0L0 16" stroke="#fff" strokeWidth="3.2" />
      <path d="M0 0L24 16M24 0L0 16" stroke="#c8102e" strokeWidth="1.4" />
      <path d="M12 0V16M0 8H24" stroke="#fff" strokeWidth="5.4" />
      <path d="M12 0V16M0 8H24" stroke="#c8102e" strokeWidth="3.2" />
    </svg>
  );
}

export default function TopBar() {
  return (
    <div className="border-b border-topbar bg-topbar">
      <Container>
        <div className="flex h-[34px] items-center justify-between">
          <div className="flex items-center">
            <ul className="-ml-[10px] hidden items-center sm:flex">
              {SOCIALS.map((s) => (
                <li key={s.name}>
                  <a
                    href={s.href}
                    aria-label={`Link to ${s.name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-[30px] w-[29px] items-center justify-center text-muted transition-colors duration-200 hover:!bg-[var(--hover)] hover:text-white focus-visible:!bg-[var(--hover)] focus-visible:text-white"
                    style={{ "--hover": s.hover } as React.CSSProperties}
                  >
                    <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor" aria-hidden="true">
                      <path d={s.path} />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
            <nav className="ml-[14px] hidden items-center gap-x-5 text-[11px] leading-[10px] font-bold text-muted md:flex">
              {TOP_LINKS.map((link) => (
                <a key={link.label} href={link.href} className="py-[7px] whitespace-nowrap hover:text-ink-dark">
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
          <div className="relative top-[2px] ml-auto flex h-[20px] items-center">
            <a href="#" aria-label="Euro" className="flex h-[20px] w-[28px] items-center justify-center">
              <EuFlag />
            </a>
            <a href="#" aria-label="Pound sterling" className="flex h-[20px] w-[28px] items-center justify-center">
              <UkFlag />
            </a>
          </div>
        </div>
      </Container>
    </div>
  );
}
