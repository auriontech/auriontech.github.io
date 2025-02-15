export default function Home() {
  return (
    <div className="text-center py-12 sm:py-20 bg-gray-100 min-h-[60vh] flex flex-col items-center justify-center px-4">
      <div className="space-y-4 sm:space-y-6 max-w-xl">
        <h1 className="text-3xl sm:text-4xl font-bold">
          🚀 Building Hard Tech for Fun!
        </h1>
        <p className="text-base sm:text-lg text-gray-600">
          Hey, I&apos;m Adol. I tinker, build, and experiment with hard tech
          projects purely for fun. Whether I&apos;m dabbling in artificial
          intelligence, exploring quantum quirks, or crafting offbeat hardware,
          I&apos;m always up to something exciting!
        </p>
        <p className="text-base sm:text-lg text-gray-600">
          This page is a work in progress—just like my projects. Stick around
          and join me for a wild ride through the world of creative tech!
        </p>
        <div className="animate-pulse inline-block">
          <div className="h-2 w-20 sm:w-24 bg-blue-500 rounded mx-auto"></div>
        </div>
        <p className="text-xs sm:text-sm text-gray-500">
          More fun tech coming soon!
        </p>
      </div>
    </div>
  );
}
