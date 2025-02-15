export default function Home() {
  return (
    <div className="py-12 sm:py-20 bg-secondary-50 dark:bg-secondary-900 min-h-[60vh] flex flex-col items-center justify-center px-4">
      <div className="container-custom space-y-6">
        <h1 className="heading-1 text-primary-600 dark:text-primary-400">
          🚀 Building Hard Tech for Fun!
        </h1>
        <h2 className="heading-2 text-secondary-800 dark:text-secondary-200">
          Who Am I?
        </h2>
        <p className="body-text">
          Hey, I&apos;m Adol. I tinker, build, and experiment with hard tech
          projects purely for fun. Whether I&apos;m dabbling in artificial
          intelligence, exploring quantum quirks, or crafting offbeat hardware,
          I&apos;m always up to something exciting!
        </p>
        <h2 className="heading-2 text-secondary-800 dark:text-secondary-200">
          What&apos;s Next?
        </h2>
        <p className="body-text">
          This page is a work in progress—just like my projects. Stick around
          and join me for a wild ride through the world of creative tech!
        </p>
        <div className="animate-pulse inline-block">
          <div className="h-2 w-20 sm:w-24 bg-primary-500 rounded mx-auto"></div>
        </div>
        <p className="text-xs sm:text-sm text-secondary-500 dark:text-secondary-400">
          More fun tech coming soon!
        </p>
      </div>
    </div>
  );
}
