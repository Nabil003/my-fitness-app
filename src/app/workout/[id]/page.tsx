import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Exercise } from "../../types";
import WorkoutActions from "../../../components/WorkoutActions";

type WorkoutDetailsProps = {
  params: Promise<{
    id: string;
  }>;
};

async function getWorkout(id: string): Promise<Exercise | null> {
  const response = await fetch(" https://api.api-store.workers.dev/api/fitlog");

  if (!response.ok) {
    throw new Error("Failed to fetch workouts");
  }

  const workouts: Exercise[] = await response.json();

  const workout = workouts.find((item) => item.id === Number(id));

  return workout ?? null;
}

export default async function WorkoutDetails({ params }: WorkoutDetailsProps) {
  const { id } = await params;

  const workout = await getWorkout(id);

  if (!workout) {
    notFound();
  }

  return (
    <main className="text-white bg-[#0d0f14]">
      <section className="mx-auto px-6 py-14 max-w-[1400px]">
        <Link
          href="/"
          className="transition text-sm mb-8 hover:text-[#b6ff00] text-gray-400 inline-block"
        >
          ← Back to workouts
        </Link>

        <div className="grid gap-12 lg:grid-cols-2">
          <div className="border-[#30343b] rounded-xl border overflow-hidden">
            <Image
              src={workout.image}
              alt={workout.name}
              width={740}
              height={850}
              priority
              className="object-cover h-full w-full"
            />
          </div>

          <div>
            <h1 className="uppercase text-4xl font-bold">{workout.name}</h1>

            <p className="mt-3 text-gray-400 max-w-[600px] leading-7">
              {workout.description}
            </p>

            <div className="gap-2 flex flex-wrap mt-5">
              {workout.muscleGroups.map((muscle) => (
                <span
                  key={muscle}
                  className="uppercase text-black px-3 py-1  rounded-full text-xs font-semibold bg-[#b6ff00]"
                >
                  {muscle}
                </span>
              ))}
            </div>

            <div className="mt-8">
              <h2 className="uppercase text-xl mb-4 font-bold">Key Specs</h2>

              <div className="rounded-xl overflow-hidden border-[#30343b] border bg-[#171a20]">
                <DetailRow label="EQUIPMENT" value={workout.equipment} />

                <DetailRow label="DIFFICULTY" value={workout.difficulty} />

                <DetailRow label="SETS" value={workout.sets} />

                <DetailRow label="REPS" value={workout.reps} />

                <DetailRow label="DURATION" value={`${workout.duration} min`} />

                <DetailRow
                  label="CALORIES"
                  value={`${workout.caloriesBurned} kcal`}
                />

                <DetailRow label="RATING" value={workout.rating} />
              </div>
            </div>

            <div className="mt-8">
              <h2 className="uppercase text-xl font-bold">Instructions</h2>

              <ol className="mt-5 text-gray-300 space-y-4">
                {workout.instructions.map((instruction, index) => (
                  <li key={index} className="gap-4 flex">
                    <span className="text-[#b6ff00] font-bold">
                      {index + 1}.
                    </span>

                    <span>{instruction}</span>
                  </li>
                ))}
              </ol>
            </div>

            <WorkoutActions workout={workout} />
          </div>
        </div>
      </section>
    </main>
  );
}

function DetailRow({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="flex border-b px-5 py-4 last:border-b-0 border-[#30343b] items-center justify-between">
      <span className="text-gray-500 text-xs font-semibold">{label}</span>

      <span className="text-sm text-gray-200 font-medium">{value}</span>
    </div>
  );
}
