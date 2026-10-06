"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import { usePlan } from "../../context/PlanContext";

export default function MyPlanPage() {
  const {
    plannedWorkouts,
    savedWorkouts,
    markAsDone,
    removeFromPlan,
    removeFromSaved,
  } = usePlan();

  const router = useRouter();
  const searchParams = useSearchParams();

  const tab = searchParams.get("tab");

  const activeTab: "plan" | "saved" = tab === "saved" ? "saved" : "plan";

  const [sortBy, setSortBy] = useState<"duration" | "calories" | "rating">(
    "duration",
  );

  const displayedWorkouts =
    activeTab === "plan" ? plannedWorkouts : savedWorkouts;

  const totalExercises = displayedWorkouts.length;

  const totalMinutes = displayedWorkouts.reduce(
    (total, workout) => total + workout.duration,
    0,
  );

  const totalCalories = displayedWorkouts.reduce(
    (total, workout) => total + workout.caloriesBurned,
    0,
  );

  const sortedWorkouts = [...displayedWorkouts].sort((a, b) => {
    if (sortBy === "duration") {
      return a.duration - b.duration;
    }

    if (sortBy === "calories") {
      return b.caloriesBurned - a.caloriesBurned;
    }

    if (sortBy === "rating") {
      return b.rating - a.rating;
    }

    return 0;
  });

  return (
    <main className="px-6 py-12 bg-[#0d0f14] text-white">
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-10">
          <h1 className="uppercase font-bold text-3xl">My Plan</h1>

          <p className="text-gray-400 text-sm mt-2">
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </div>

        <div className="border-[#292d35] sm:grid-cols-3 overflow-hidden rounded-xl mb-10 grid grid-cols-1 border bg-[#171a20]">
          <div className="p-6">
            <p className="text-gray-400 text-xs">Exercises</p>

            <p className="text-[#b6ff00] mt-2 font-bold text-3xl">
              {totalExercises}
            </p>
          </div>

          <div className="sm:border-l p-6 border-[#292d35]">
            <p className="text-gray-400 text-xs">Minutes</p>

            <p className="font-bold text-3xl mt-2">{totalMinutes}</p>
          </div>

          <div className="sm:border-l p-6 border-[#292d35]">
            <p className="text-gray-400 text-xs">Calories</p>

            <p className="mt-2 font-bold text-3xl">{totalCalories}</p>
          </div>
        </div>

        <div className="items-end mb-6 flex-wrap justify-between flex gap-5">
          <div className="bg-[#171a20] rounded-xl p-1 flex">
            <button
              type="button"
              onClick={() => router.push("/my-plan?tab=plan")}
              className={`cursor-pointer px-5 py-2 text-sm rounded-lg font-semibold transition ${
                activeTab === "plan"
                  ? "text-[#b6ff00] bg-[#0d0f14]"
                  : "hover:text-white text-gray-500"
              }`}
            >
              Today&apos;s Plan
            </button>

            <button
              type="button"
              onClick={() => router.push("/my-plan?tab=saved")}
              className={`cursor-pointer transition font-semibold rounded-lg text-sm px-5 py-2 ${
                activeTab === "saved"
                  ? "text-[#b6ff00] bg-[#0d0f14]"
                  : "hover:text-white text-gray-500"
              }`}
            >
              Saved
            </button>
          </div>

          <div>
            <label htmlFor="sort" className="text-sm mb-2 block text-gray-400">
              Sort By
            </label>

            <select
              id="sort"
              value={sortBy}
              onChange={(event) =>
                setSortBy(
                  event.target.value as "duration" | "calories" | "rating",
                )
              }
              className="cursor-pointer focus:border-[#b6ff00] text-white px-4 py-2 rounded-lg transition border border-[#3a3e46] min-w-[180px] bg-[#171a20] text-sm outline-none"
            >
              <option value="duration">Duration</option>

              <option value="calories">Calories</option>

              <option value="rating">Rating</option>
            </select>
          </div>
        </div>

        {sortedWorkouts.length === 0 ? (
          <div className="flex px-6 text-center min-h-[300px] items-center border-dashed rounded-xl border border-[#292d35] flex-col justify-center">
            <h2 className="text-lg uppercase font-bold">Nothing Here Yet</h2>

            <p className="text-gray-500 text-sm mt-2">
              {activeTab === "plan"
                ? "Browse the library and add a lift to get today moving."
                : "Save workouts from the library and they will appear here."}
            </p>

            <Link
              href="/"
              className="transition hover:bg-[#c8ff33] bg-[#b6ff00] px-6 py-2 text-sm font-bold mt-5 rounded-full text-black"
            >
              Go to workouts
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {sortedWorkouts.map((workout) => (
              <div
                key={workout.id}
                className="flex flex-col gap-4 p-4 md:flex-row md:items-center rounded-xl border border-[#30343b] bg-[#171a20]"
              >
                <div className="overflow-hidden rounded-lg md:h-[100px] relative h-[130px] w-full shrink-0 md:w-[180px]">
                  <Image
                    src={workout.image}
                    alt={workout.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex-1">
                  <h2 className="text-lg uppercase font-bold">
                    {workout.name}
                  </h2>

                  <p className="text-gray-400 mt-1 text-sm">
                    {workout.equipment}
                  </p>

                  <div className="text-sm text-gray-300 mt-3 flex flex-wrap gap-5 ">
                    <span>
                      <span className="text-[#b6ff00]">◷</span>{" "}
                      {workout.duration} min
                    </span>

                    <span>🔥 {workout.caloriesBurned} kcal</span>

                    <span>
                      <span className="text-[#b6ff00]">★</span> {workout.rating}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 flex-wrap">
                  <Link
                    href={`/workout/${workout.id}`}
                    className="rounded-full hover:border-[#b6ff00] hover:text-[#b6ff00] px-5 py-2 text-sm font-semibold transition border border-[#3a3e46]"
                  >
                    View Details
                  </Link>

                  {activeTab === "plan" && (
                    <button
                      type="button"
                      onClick={() => markAsDone(workout.id)}
                      className="rounded-full bg-[#b6ff00] text-black transition hover:bg-[#c8ff33]px-6 py-2 text-sm font-bold cursor-pointer"
                    >
                      ✓ Mark as Done
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => {
                      if (activeTab === "plan") {
                        removeFromPlan(workout.id);
                      } else {
                        removeFromSaved(workout.id);
                      }
                    }}
                    className="transition px-3 py-2 text-2xl text-gray-400 cursor-pointer hover:text-red-400"
                    aria-label={`Remove ${workout.name}`}
                    title="Remove"
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
