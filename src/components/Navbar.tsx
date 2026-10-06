"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import Logo from "../assets/logo.png";
import { usePlan } from "../context/PlanContext";

export default function Navbar() {
  const pathname = usePathname();

  const { plannedWorkouts, savedWorkouts } = usePlan();

  const isWorkoutActive = pathname === "/" || pathname.startsWith("/workout/");

  const isMyPlanActive = pathname === "/my-plan";

  return (
    <nav className="border-b text-white border-[#292c33] bg-[#0d0f14]">
      <div className="sm:px-6 lg:px-8 mx-auto max-w-[1400px] px-4">
        <div className="items-center justify-between gap-3 flex min-h-20">
          <Link href="/" className="items-center gap-2 flex shrink-0">
            <Image
              src={Logo}
              alt="FitLog Logo"
              width={28}
              height={28}
              className="object-contain"
            />

            <span className="hidden font-bold sm:inline text-xl">FITLOG</span>
          </Link>

          <div className="flex sm:gap-2 items-center gap-1 ">
            <Link
              href="/"
              className={`rounded-full px-3 py-2 text-sm transition sm:px-4 font-semibold ${
                isWorkoutActive
                  ? "bg-[#191c22] text-[#b6ff00]"
                  : "hover:text-[#b6ff00] text-white"
              }`}
            >
              Workout
            </Link>

            <Link
              href="/my-plan"
              className={`rounded-full transition sm:px-4 px-3 py-2 text-sm font-semibold ${
                isMyPlanActive
                  ? "text-[#b6ff00] bg-[#191c22]"
                  : "hover:text-[#b6ff00] text-white"
              }`}
            >
              My Plan
            </Link>
          </div>

          <div className="items-center gap-2 sm:gap-5 lg:gap-8 flex shrink-0">
            <Link
              href="/my-plan?tab=plan"
              className="flex items-center gap-1.5 sm:gap-2 transition hover:text-[#b6ff00]"
              aria-label={`Plan: ${plannedWorkouts.length} workouts`}
            >
              <span className="hidden md:inline text-sm font-semibold">
                Plan
              </span>

              <span className="flex h-7 min-w-7 rounded-full bg-[#b6ff00] px-2 items-center justify-center text-xs font-bold text-black sm:text-sm">
                {plannedWorkouts.length}
              </span>
            </Link>

            <Link
              href="/my-plan?tab=saved"
              className="flex items-center hover:text-[#b6ff00] sm:gap-2 gap-1.5 transition"
              aria-label={`Saved: ${savedWorkouts.length} workouts`}
            >
              <span className="font-semibold md:inline hidden text-sm">
                Saved
              </span>

              <span className="flex h-7 rounded-full border border-white px-2 text-xs min-w-7 items-center justify-center font-semibold text-white sm:text-sm">
                {savedWorkouts.length}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
