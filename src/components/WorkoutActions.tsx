"use client";

import { toast } from "react-toastify";

import { Exercise } from "../app/types";
import { usePlan } from "../context/PlanContext";

type WorkoutActionsProps = {
  workout: Exercise;
};

export default function WorkoutActions({ workout }: WorkoutActionsProps) {
  const { plannedWorkouts, savedWorkouts, addToPlan, saveForLater } = usePlan();

  const isPlanned = plannedWorkouts.some((item) => item.id === workout.id);

  const isSaved = savedWorkouts.some((item) => item.id === workout.id);

  const handleAddToPlan = () => {
    addToPlan(workout);

    toast.success("Added to today's plan!");
  };

  const handleSaveForLater = () => {
    saveForLater(workout);

    toast.success("Saved for later!");
  };

  return (
    <div className="flex-wrap gap-4 mt-8 flex">
      <button
        type="button"
        onClick={handleAddToPlan}
        disabled={isPlanned}
        className="cursor-pointer px-6 py-3 font-semibold text-black rounded-lg bg-[#b6ff00] transition hover:bg-[#c8ff33] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isPlanned ? "✓ Added to today's plan" : "＋ Add to today's plan"}
      </button>

      <button
        type="button"
        onClick={handleSaveForLater}
        disabled={isSaved}
        className="cursor-pointer font-semibold text-white transition rounded-lg border border-[#3a3e46] px-6 py-3 hover:border-[#b6ff00] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSaved ? "✓ Saved" : "♡ Save for later"}
      </button>
    </div>
  );
}
