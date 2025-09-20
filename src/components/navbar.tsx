// src/components/navbar.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-[#861388]">
              ORI Craft Labs
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/wellness" className="text-gray-700 hover:text-[#861388] transition-colors">
              Wellness
            </Link>
            <Link href="/culture" className="text-gray-700 hover:text-[#861388] transition-colors">
              Culture
            </Link>
            <Link href="/food" className="text-gray-700 hover:text-[#861388] transition-colors">
              Food
            </Link>
            <Link href="#about" className="text-gray-700 hover:text-[#861388] transition-colors">
              About
            </Link>
            <Link href="#contact" className="text-gray-700 hover:text-[#861388] transition-colors">
              Contact
            </Link>
          </div>
          <div className="md:hidden flex items-center">
            <Button variant="ghost" size="sm">
              Menu
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}