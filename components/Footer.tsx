'use client';

export function Footer() {
  return (
    <footer className="py-12 border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <span className="font-mono text-white/60">Spilled Coffee Syndicate</span>
          <div className="flex gap-6 text-sm text-white/60">
            <a href="https://forms.gle/bsRtUgfBr8dYNaGr7" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
              Contact
            </a>
            <a href="#" className="hover:text-white transition">Privacy Policy</a>
            <a href="#" className="hover:text-white transition">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
