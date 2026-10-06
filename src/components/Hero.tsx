// Represents the actual Hero page

import Image from "next/image";
import Link from "next/link";

import Banner from "../assets/banner.png"; // represnts the banner image

export default function Hero() {
  return (
    <section className="px-6 py-8 text-white bg-[#0d0f14]">
      <div className="bg-[#171a20] overflow-hidden rounded-xl mx-auto max-w-[1400px] border border-[#292d35]">
        <div className="grid items-center md:grid-cols-2 md:px-12 gap-8 px-8 py-10">
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-wider text-[#b6ff00]">
              Workout Library
            </p>

            <h1 className="md:text-5xl text-4xl font-extrabold max-w-[600px] leading-tight uppercase">
              Train With Intent. Log Every Set.
            </h1>

            <p className="max-w-[550px] mt-5 text-gray-400 text-sm leading-6">
              FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
              into today&apos;s plan, and watch the week&apos;s work add up.
            </p>

            <Link
              href="#library"
              className="mt-6 uppercase px-6 py-3 items-center gap-2 rounded-md bg-[#b6ff00] inline-flex text-sm font-bold text-black transition hover:bg-[#c8ff33]"
            >
              Browse Workouts
              <span aria-hidden="true" className="leading-none text-lg">
                ↓
              </span>
            </Link>
          </div>

          <div className="flex justify-center items-center md:justify-end">
            <Image
              src={Banner}
              alt="Workout exercise"
              width={500}
              height={400}
              priority
              className="w-full h-auto object-contain max-w-[450px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
