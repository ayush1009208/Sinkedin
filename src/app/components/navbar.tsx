import React, { useState } from "react";

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  return (
    <nav className="bg-transparent dark:bg-transparent fixed w-full top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center backdrop-blur-sm">
        {/* Logo */}
        <a href="#" className="text-2xl font-bold text-gray-800 dark:text-white">
          MyBrand
        </a>

        {/* Desktop Menu Links */}
        <div className="hidden md:flex space-x-12">
          {["Home", "About", "Services", "Contact", "Blog", "Portfolio"].map(
            (link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-gray-600 dark:text-gray-300 font-semibold hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
              >
                {link}
              </a>
            )
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            type="button"
            className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-transparent backdrop-blur-lg shadow-lg">
          <div className="flex flex-col items-start space-y-4 p-4">
            {["Home", "About", "Services", "Contact", "Blog", "Portfolio"].map(
              (link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="text-gray-600 dark:text-gray-300 font-semibold hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link}
                </a>
              )
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
