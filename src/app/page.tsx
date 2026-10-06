import Hero from "../components/Hero";
import LibrarySection from "../components/LibrarySection";
import { Exercise } from "./types";

async function getWorkouts(): Promise<Exercise[]> {
  const response = await fetch("https://api.api-store.workers.dev/api/fitlog");

  if (!response.ok) {
    throw new Error("Failed to fetch workouts");
  }

  const data: Exercise[] = await response.json();

  return data;
}

export default async function Home() {
  const workouts = await getWorkouts();

  return (
    <main className="bg-[#0d0f14]">
      <Hero />

      <LibrarySection workouts={workouts} />
    </main>
  );
}
