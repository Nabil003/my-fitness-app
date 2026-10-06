export default function Loading() {
  return (
    <main className="flex min-h-[500px] items-center justify-center bg-[#0d0f14] text-white">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#30343b] border-t-[#b6ff00]" />
        <p className="text-sm font-semibold text-gray-400">Loading workouts…</p>
      </div>
    </main>
  );
}
