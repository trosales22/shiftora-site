export default function Footer() {
  return (
    <footer className="border-t border-slate-200 py-8">
      <div className="mx-auto max-w-6xl px-4 text-sm text-slate-500 flex flex-col md:flex-row items-center justify-between gap-2">
        <div>© {new Date().getFullYear()} Shiftora. Built with native Intl APIs.</div>
        <div className="opacity-80">No cookies. No trackers. Just time.</div>
      </div>
    </footer>
  );
}
