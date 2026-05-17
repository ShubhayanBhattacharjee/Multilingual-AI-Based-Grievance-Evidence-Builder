import { Link } from "react-router-dom"

const ShieldIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
)

const links = {
  Platform: [
    { label: "File a Complaint",    to: "/citizen/register" },
    { label: "Track Complaint",     to: "/track" },
    { label: "How It Works",        to: "/about#how" },
    { label: "Public Dashboard",    to: "/dashboard" },
  ],
  Company: [
    { label: "About Nivaran",       to: "/about" },
    { label: "Press & Media",       to: "/press" },
    { label: "Blog",                to: "/blog" },
    { label: "Careers",             to: "/careers" },
  ],
  Legal: [
    { label: "Privacy Policy",      to: "/privacy" },
    { label: "Terms of Service",    to: "/terms" },
    { label: "RTI Information",     to: "/rti" },
    { label: "Cookie Policy",       to: "/cookies" },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-20">

        <div className="grid md:grid-cols-5 gap-12 mb-16">

          {/* Brand col */}
          <div className="md:col-span-2">
            <Link to="/" className="inline-flex items-center gap-2 no-underline mb-5">
              <span className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-black
                shadow-[0_0_12px_rgba(37,99,235,0.4)]">
                <ShieldIcon />
              </span>
              <span className="font-['DM_Serif_Display'] text-xl text-white tracking-tight leading-none">
                Nivaran<span className="text-blue-400">.</span>
              </span>
            </Link>
            <p className="text-neutral-400 text-sm leading-relaxed max-w-xs mb-6"
              style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
              India's civic complaint platform — connecting citizens with the authorities
              that serve them, transparently and efficiently.
            </p>
            <div className="flex items-center gap-3">
              {/* Twitter/X */}
              <a href="#" aria-label="Twitter"
                className="w-9 h-9 rounded-xl bg-white/[0.06] border border-white/[0.08]
                  flex items-center justify-center text-neutral-400 hover:text-white
                  hover:bg-white/[0.10] transition-all duration-150">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              {/* LinkedIn */}
              <a href="#" aria-label="LinkedIn"
                className="w-9 h-9 rounded-xl bg-white/[0.06] border border-white/[0.08]
                  flex items-center justify-center text-neutral-400 hover:text-white
                  hover:bg-white/[0.10] transition-all duration-150">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </a>
              {/* GitHub */}
              <a href="#" aria-label="GitHub"
                className="w-9 h-9 rounded-xl bg-white/[0.06] border border-white/[0.08]
                  flex items-center justify-center text-neutral-400 hover:text-white
                  hover:bg-white/[0.10] transition-all duration-150">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([group, items]) => (
            <div key={group}>
              <p className="text-white text-xs font-bold tracking-widest uppercase mb-5">
                {group}
              </p>
              <ul className="flex flex-col gap-3">
                {items.map(item => (
                  <li key={item.to}>
                    <Link to={item.to}
                      className="text-neutral-400 hover:text-white text-sm no-underline
                        transition-colors duration-150"
                      style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row
          items-center justify-between gap-4">
          <p className="text-neutral-500 text-xs"
            style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
            © {new Date().getFullYear()} Nivaran. Built for the people of India.
          </p>
          <div className="flex items-center gap-1.5 text-xs text-neutral-500">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            All systems operational
          </div>
        </div>

      </div>
    </footer>
  )
}