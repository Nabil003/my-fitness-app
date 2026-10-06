"use client";

import { createContext, useContext, useState, ReactNode } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Exercise } from "../app/types";

type PlanContextType = {
  plannedWorkouts: Exercise[];
  savedWorkouts: Exercise[];

  addToPlan: (workout: Exercise) => void;
  saveForLater: (workout: Exercise) => void;

  markAsDone: (id: number) => void;

  removeFromPlan: (id: number) => void;
  removeFromSaved: (id: number) => void;
};

const PlanContext = createContext<PlanContextType | undefined>(undefined);

export function PlanProvider({ children }: { children: ReactNode }) {
  const [plannedWorkouts, setPlannedWorkouts] = useState<Exercise[]>([]);

  const [savedWorkouts, setSavedWorkouts] = useState<Exercise[]>([]);

  const addToPlan = (workout: Exercise) => {
    setPlannedWorkouts((current) => {
      const alreadyAdded = current.some((item) => item.id === workout.id);

      if (alreadyAdded) {
        return current;
      }

      return [...current, workout];
    });
  };

  const saveForLater = (workout: Exercise) => {
    setSavedWorkouts((current) => {
      const alreadySaved = current.some((item) => item.id === workout.id);

      if (alreadySaved) {
        return current;
      }

      return [...current, workout];
    });
  };

  const markAsDone = (id: number) => {
    setPlannedWorkouts((current) =>
      current.filter((workout) => workout.id !== id),
    );

    toast.success("Workout completed!");
  };

  const removeFromPlan = (id: number) => {
    setPlannedWorkouts((current) =>
      current.filter((workout) => workout.id !== id),
    );

    toast.info("Removed from today's plan");
  };

  const removeFromSaved = (id: number) => {
    setSavedWorkouts((current) =>
      current.filter((workout) => workout.id !== id),
    );

    toast.info("Removed from saved");
  };

  return (
    <PlanContext.Provider
      value={{
        plannedWorkouts,
        savedWorkouts,

        addToPlan,
        saveForLater,

        markAsDone,

        removeFromPlan,
        removeFromSaved,
      }}
    >
      {children}

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="dark"
      />
    </PlanContext.Provider>
  );
}

export function usePlan() {
  const context = useContext(PlanContext);

  if (!context) {
    throw new Error("usePlan must be used inside PlanProvider");
  }

  return context;
}
