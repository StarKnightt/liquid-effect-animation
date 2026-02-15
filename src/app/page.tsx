import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#fafafa] px-6 dark:bg-[#0a0a0a]">
      <main className="flex max-w-2xl flex-col items-center gap-10 text-center">
        <div className="flex flex-col items-center gap-3">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-400">
            shadcn/ui component
          </span>
          <h1 className="text-5xl font-bold tracking-tight text-[#1d1d1f] dark:text-white sm:text-6xl">
            Liquid Effect
            <br />
            Animation
          </h1>
        </div>

        <p className="max-w-md text-lg leading-relaxed text-neutral-500 dark:text-neutral-400">
          Interactive liquid distortion for React. Built with Three.js,
          designed for the shadcn ecosystem. Zero npm dependencies.
        </p>

        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <Link
            href="/demo"
            className="flex h-11 items-center justify-center rounded-full bg-[#1d1d1f] px-8 text-sm font-medium text-white transition-opacity hover:opacity-80 dark:bg-white dark:text-[#1d1d1f]"
          >
            Live Demo
          </Link>
          <a
            href="https://github.com/StarKnightt/liquid-effect-animation"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-11 items-center justify-center rounded-full border border-neutral-200 px-8 text-sm font-medium text-[#1d1d1f] transition-colors hover:bg-neutral-100 dark:border-neutral-800 dark:text-white dark:hover:bg-neutral-900"
          >
            GitHub
          </a>
        </div>

        <div className="mt-6 flex flex-col items-center gap-3">
          <span className="text-xs font-medium uppercase tracking-widest text-neutral-400">
            Quick start
          </span>
          <code className="rounded-lg border border-neutral-200 bg-white px-5 py-3 text-sm text-neutral-600 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300">
            npx shadcn@latest add liquid-effect-animation
          </code>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-8 text-center">
          <div>
            <p className="text-2xl font-bold text-[#1d1d1f] dark:text-white">0</p>
            <p className="text-xs text-neutral-400">Dependencies</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-[#1d1d1f] dark:text-white">5</p>
            <p className="text-xs text-neutral-400">Props</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-[#1d1d1f] dark:text-white">&lt;4kb</p>
            <p className="text-xs text-neutral-400">Component Size</p>
          </div>
        </div>
      </main>

      <footer className="absolute bottom-6 text-xs text-neutral-400">
        MIT Licensed &middot; Built with Next.js, Tailwind CSS &amp; Three.js
      </footer>
    </div>
  );
}
