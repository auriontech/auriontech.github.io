import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="p-4 bg-white shadow-md">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0 px-4">
        <Link href="/" className="text-xl sm:text-2xl font-bold">
          Adol Tech
        </Link>
        <a
          href="https://www.buymeacoffee.com/adol"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 hover:text-gray-800 transition-colors"
        >
          Buy me a coffee ☕
        </a>
      </div>
    </nav>
  );
}
