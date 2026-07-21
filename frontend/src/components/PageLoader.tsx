export function PageLoader() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-8 bg-[#14213D]">
      {/* ambient background glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#B8863B]/10 blur-3xl" />
      </div>

      {/* orbiting loader */}
      <div className="relative h-24 w-24">
        <div className="absolute inset-0 rounded-full border-2 border-[#F7F3E8]/10" />

        <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-[#B8863B] border-r-[#B8863B]/40 [animation-duration:2.4s]" />

        <div className="absolute inset-3 animate-[spin_3.2s_linear_infinite_reverse] rounded-full border-2 border-transparent border-b-[#F7F3E8]/50" />

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-[#F7F3E8] shadow-lg">
            <span
              style={{ fontFamily: "'Newsreader', Georgia, serif" }}
              className="text-lg font-bold text-[#14213D]"
            >
              U
            </span>
            <span className="absolute inset-0 rounded-xl bg-[#B8863B]/30 [animation:ping_2.5s_cubic-bezier(0,0,0.2,1)_infinite]" />
          </div>
        </div>
      </div>

      <div className="relative flex flex-col items-center gap-3">
        <p
          style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace" }}
          className="text-xs font-semibold uppercase tracking-[0.3em] text-[#F7F3E8]/70"
        >
          Loading
        </p>
        <div className="h-1 w-40 overflow-hidden rounded-full bg-[#F7F3E8]/10">
          <div className="h-full w-1/3 animate-[loaderBar_2.8s_ease-in-out_infinite] rounded-full bg-gradient-to-r from-[#B8863B] via-[#F7F3E8] to-[#B8863B]" />
        </div>
      </div>

      <style>{`
        @keyframes loaderBar {
          0% { transform: translateX(-120%); }
          50% { transform: translateX(60%); }
          100% { transform: translateX(220%); }
        }
      `}</style>
    </div>
  );
}