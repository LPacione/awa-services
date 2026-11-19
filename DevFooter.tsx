import Image from "next/image";
import Link from "next/link";

export default function DevFooter() {
  return (
    <footer className="mt-12 rounded-2xl border border-white/10 bg-slate-900/90 p-4 text-center shadow-lg backdrop-blur-md">
      <div className="flex items-center justify-center gap-2">
        <div className="flex h-6 w-6 items-center justify-center overflow-hidden rounded-md shadow-sm">
          <Image
            src="/dev-logo.png"
            alt="Dev logo"
            width={24}
            height={24}
            className="h-full w-full object-contain"
          />
        </div>

        <p className="text-xs text-slate-300">
          Desarrollado por{" "}
          <a
            href="https://www.linkedin.com/in/lucianopacionealvez/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-white transition hover:text-emerald-400 hover:underline"
          >
            Luciano Pacione Alvez
          </a>
        </p>
      </div>

      <p className="mt-2 text-[12px] font-medium text-slate-300">
        ¿Querés una app personalizada para tu torneo o club?{" "}
        <a
          href="https://wa.me/5492924406226"
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold text-emerald-400 transition hover:text-emerald-300 hover:underline"
        >
          Escribime por WhatsApp
        </a>
      </p>
    </footer>
  );
}