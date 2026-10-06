import Image from "next/image";
import Link from "next/link";

import { Exercise } from "../app/types";

type WorkoutCardProps = {
  workout: Exercise;
};

export default function WorkoutCard({ workout }: WorkoutCardProps) {
  return (
    <Link href={`/workout/${workout.id}`} className="block h-full">
      <article className="group h-full cursor-pointer border border-[#30343b] bg-[#1a1d23] overflow-hidden rounded-xl transition hover:-translate-y-1 hover:border-[#b6ff00]">
        <div className="h-[220px] overflow-hidden">
          <Image
            src={workout.image}
            alt={workout.name}
            width={740}
            height={400}
            className="h-full w-full object-cover duration-300 group-hover:scale-105 transition"
          />
        </div>

        <div className="p-4">
          <div className="mb-3 flex-wrap gap-2 flex">
            {workout.muscleGroups.map((muscle) => (
              <span
                key={muscle}
                className="rounded-full bg-[#b6ff00] font-semibold text-black px-2 py-1 text-[10px]"
              >
                {muscle}
              </span>
            ))}
          </div>

          <h3 className="text-lg uppercase text-white font-bold">
            {workout.name}
          </h3>

          <p className="mt-2 text-gray-400 text-sm">{workout.equipment}</p>

          <div className="mt-4 flex gap-4 text-xs text-gray-300 flex-wrap items-center">
            <span className="flex items-center gap-1">
              <span className="text-[#b6ff00]">◷</span>
              {workout.duration} min
            </span>

            <span className="flex gap-1 items-center">
              <span>🔥</span>
              {workout.caloriesBurned} kcal
            </span>

            <span className="flex gap-1 items-center">
              <span className="text-[#b6ff00]">★</span>

              {workout.rating}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
