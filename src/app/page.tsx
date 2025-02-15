export default function Home() {
  return (
    <div className="text-center py-12 sm:py-20 bg-gray-100 min-h-[60vh] flex flex-col items-center justify-center px-4">
      <div className="space-y-4 sm:space-y-6">
        <h1 className="text-3xl sm:text-4xl font-bold">
          🚧 Under Development 🚧
        </h1>
        <p className="text-base sm:text-lg text-gray-600 max-w-md mx-auto">
          We are working on something new. Coming soon!
        </p>
        <div className="animate-pulse inline-block">
          <div className="h-2 w-20 sm:w-24 bg-blue-500 rounded mx-auto"></div>
        </div>
        <p className="text-xs sm:text-sm text-gray-500">
          Expected Launch: Q2 2025
        </p>
      </div>
    </div>
  );
}
