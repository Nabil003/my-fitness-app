import { Exercise } from "../app/types";
import WorkoutCard from "./WorkoutCard";

type LibrarySectionProps = {
  workouts: Exercise[];
};

export default function LibrarySection({ workouts }: LibrarySectionProps) {
  return (
    <section id="library" className="bg-[#0d0f14] text-white px-6 py-12">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-8">
          <h2 className="font-bold uppercase text-3xl">THE LIBRARY</h2>

          <p className="text-gray-400 mt-2 text-sm">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 grid-cols-1">
          {workouts.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      </div>
    </section>
  );
}
