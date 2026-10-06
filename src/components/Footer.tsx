import Image from "next/image";
import Link from "next/link";

import Logo from "../assets/logo.png";

export default function Footer() {
  return (
    <footer className="border-t bg-[#191c22] text-white border-[#292c33]">
      <div className="flex-col px-6 py-8 items-center justify-between gap-5 mx-auto flex max-w-[1400px] text-center sm:flex-row sm:px-8 sm:py-10 sm:text-left">
        <Link href="/" className="flex items-center shrink-0 gap-2">
          <Image
            src={Logo}
            alt="FitLog Logo"
            width={28}
            height={28}
            className="object-contain"
          />

          <span className="font-bold text-xl">FITLOG</span>
        </Link>

        <p className="text-sm text-gray-400 leading-6">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}
