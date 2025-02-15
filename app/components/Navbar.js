"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Hook to detect active route
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { signIn, signOut, useSession } from "next-auth/react";
export default function Navbar() {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname(); // Get current path

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50); // Shrinks when scrolled 50px down
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleAuth = () => {
    alert("Auth functionality coming soon!");
  };

  const navLinks = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/player-stats", label: "Player Stats" },
    { href: "/team-builder", label: "Team Builder" },
    { href: "/live-updates", label: "Live Updates" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full backdrop-blur-md transition-all duration-300 z-50 ${
        isScrolled ? "bg-white/90 shadow-md py-2" : "bg-white/80 py-4"
      }`}
    >
      <div className="max-w-6xl mx-auto flex justify-between items-center px-6">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-gray-900 transition-all duration-300">
          <Link href="/">{isScrolled ? "FPL" : "FPL Assistant"}</Link>
        </h1>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`relative px-3 py-2 text-gray-700 hover:text-blue-600 transition ${
                pathname === href
                  ? "font-semibold text-blue-600 after:absolute after:bottom-0 after:left-1/2 after:w-2/3 after:h-[2px] after:bg-blue-600 after:-translate-x-1/2"
                  : ""
              }`}
            >
              {label}
            </Link>
          ))}
          {session ? (
            <button
              onClick={() => signOut()}
              className="bg-red-600 px-4 py-2 rounded-md hover:bg-red-700"
            >
              Sign Out
            </button>
          ) : (
            <button
              onClick={() => signIn()} // This triggers the sign-in flow
              className="bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Sign In
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Animated Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: "0%", opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute top-16 left-0 w-full bg-white shadow-md md:hidden"
          >
            <ul className="flex flex-col space-y-4 p-4">
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className={`block p-2 text-gray-700 rounded ${
                      pathname === href
                        ? "bg-blue-100 text-blue-600 font-semibold"
                        : "hover:bg-gray-200"
                    }`}
                  >
                    {label}
                  </Link>
                </li>
              ))}
              <li>
                <button
                  onClick={handleAuth}
                  className="block w-full p-2 text-white bg-blue-600 rounded hover:bg-blue-700"
                >
                  Sign In
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
