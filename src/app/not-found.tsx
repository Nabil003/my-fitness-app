import React from "react";

import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative bg-[#0F1115] text-white min-h-screen overflow-hidden">
      <div className="h-96 w-96 rounded-full bg-[#C4F000]/10 blur-3xl absolute -right-32 -top-32" />
      <div className="absolute h-96 w-96 rounded-full bg-[#C4F000]/5 blur-3xl -bottom-40 -left-32" />

      <div className="inset-0 opacity-[0.035] absolute">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "linear-gradient(#C4F000 1px, transparent 1px), linear-gradient(90deg, #C4F000 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <section className="justify-center z-10 px-6 py-16 items-center flex min-h-screen relative">
        <div className="w-full text-center max-w-4xl">
          <div className="relative">
            <h1 className="font-black leading-[0.75] select-none text-[clamp(8rem,25vw,20rem)] tracking-[-0.08em] text-[#C4F000]">
              404
            </h1>

            <div className="text-[#C4F000]/10 blur-sm absolute inset-0 -z-10 font-black leading-[0.75] translate-y-4 text-[clamp(8rem,25vw,20rem)] tracking-[-0.08em] pointer-events-none">
              404
            </div>
          </div>

          <h2 className="font-black text-3xl sm:text-5xl uppercase tracking-tight mt-10">
            Page Not Found.
          </h2>

          <p className="text-zinc-400 sm:text-lg mx-auto mt-5 text-base leading-7 max-w-xl">
            Looks like you&apos;ve pushed into the wrong zone. The page
            you&apos;re looking for has been moved, removed, or never existed.
          </p>

          <div className="mt-9 gap-4 sm:flex-row flex-col items-center flex justify-center">
            <Link
              href="/"
              className="uppercase items-center px-7 py-3.5 justify-center gap-3 transition-all duration-300 group inline-flex rounded-full bg-[#C4F000] hover:shadow-[0_0_35px_rgba(196,240,0,0.25) text-sm font-black tracking-wider text-[#0F1115] hover:scale-105 hover:bg-[#d7ff33]]"
            >
              Back to Home
              <span className="group-hover:translate-x-1 transition-transform duration-300">
                →
              </span>
            </Link>
          </div>

          <div className="flex justify-center items-center gap-4 mt-16"></div>
        </div>
      </section>
    </main>
  );
}
