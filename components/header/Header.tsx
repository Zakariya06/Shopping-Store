import { useAuth } from "@/context/authContext";
import {
  LogOut,
  MenuIcon,
  SearchIcon,
  Settings,
  ShoppingCartIcon,
  User,
  UserIcon,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";

function Header(props: any) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const { logOut } = useAuth();
  const router = useRouter();

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearch(search);
  };

  useEffect(() => {
    const onSearch = setTimeout(() => {
      if (router.pathname === "/") {
        if (search.trim()) {
          router.push(`?search=${encodeURIComponent(search)}`);
        } else {
          router.push("/");
        }
      }
    }, 500);

    return () => clearTimeout(onSearch);
  }, [search]);

  return (
    <nav className="bg-slate-800 text-white p-4 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between">
        {/* Left Section: Logo */}
        <div className="flex items-center space-x-4">
          {/* Mobile menu button, visible on small screens */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-md hover:bg-slate-700 transition-colors"
          >
            <MenuIcon />
          </button>

          <Link
            href="/"
            className="flex items-center text-2xl font-bold text-yellow-500 hover:text-yellow-400 transition-colors"
          >
            {/* Using a text-based logo for simplicity */}
            <span className="font-extrabold text-3xl">NEXT</span>
            <span className="font-light text-2xl">Shop</span>
          </Link>
        </div>

        {/* Middle Section: Search Bar (hidden on small screens, shown on medium and larger) */}
        {router.pathname === "/" && (
          <div className="hidden md:flex flex-grow max-w-xl mx-4 border border-white rounded-md">
            <div
              onSubmit={handleFormSubmit}
              className="relative flex-grow flex items-center gap-3 px-3"
            >
              <SearchIcon />
              <input
                type="text"
                placeholder="Search..."
                className="w-full   py-2 text-sm  text-white rounded-l-md border-r-0 outline-none"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <button className="bg-yellow-500 text-slate-900 font-semibold px-6 py-2 rounded-r-md hover:bg-yellow-400 transition-colors">
              Search
            </button>
          </div>
        )}

        {/* Right Section: Nav Links and Icons */}
        <div className="hidden md:flex items-center space-x-6">
          <a
            href="#"
            className="text-sm hover:text-yellow-500 transition-colors"
          >
            Hello, Sign in
          </a>
          <a
            href="#"
            className="text-sm hover:text-yellow-500 transition-colors"
          >
            Returns & Orders
          </a>
          <div className="relative group">
            <button className="flex items-center space-x-1 hover:text-yellow-500 transition-colors">
              <UserIcon />
              <span className="text-sm">Account</span>
            </button>

            <div className="absolute left-0 mt-2 w-40 bg-white shadow-md rounded-md opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 z-10">
              <ul className="py-2 text-sm text-gray-700">
                <li>
                  <Link
                    href="/profile"
                    className="flex item-center gap-2 px-4 py-2 hover:bg-gray-100"
                  >
                    <User className="w-4 h-4" /> Profile
                  </Link>
                </li>
                <li>
                  <Link
                    href="/settings"
                    className="flex item-center gap-2 px-4 py-2 hover:bg-gray-100"
                  >
                    <Settings className="w-4 h-4" />
                    Settings
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => logOut()}
                    className="flex item-center gap-2 w-full px-4 py-2 hover:bg-gray-100"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <a
            href="#"
            className="flex items-center space-x-1 hover:text-yellow-500 transition-colors"
          >
            <ShoppingCartIcon />
            <span className="text-sm font-bold">Cart</span>
          </a>
        </div>

        {/* Mobile-only links, with cart and account icons */}
        <div className="flex md:hidden items-center space-x-4">
          <a href="#" className="hover:text-yellow-500 transition-colors">
            <UserIcon />
          </a>
          <a href="#" className="hover:text-yellow-500 transition-colors">
            <ShoppingCartIcon />
          </a>
        </div>
      </div>

      {/* Mobile Menu, appears below the main navbar on small screens */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-slate-700 py-4 mt-2 rounded-lg shadow-inner">
          <div className="container mx-auto px-4 space-y-4">
            {/* Mobile search bar */}
            <div className="flex w-full">
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-4 pr-10 py-2 text-sm text-gray-900 rounded-l-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
              <button className="bg-yellow-500 text-slate-900 font-semibold px-4 py-2 rounded-r-md hover:bg-yellow-400 transition-colors">
                <SearchIcon />
              </button>
            </div>

            {/* Mobile navigation links */}
            <a
              href="#"
              className="block px-4 py-2 rounded-md hover:bg-slate-600 transition-colors"
            >
              Hello, Sign in
            </a>
            <a
              href="#"
              className="block px-4 py-2 rounded-md hover:bg-slate-600 transition-colors"
            >
              Returns & Orders
            </a>
            <a
              href="#"
              className="block px-4 py-2 rounded-md hover:bg-slate-600 transition-colors"
            >
              Today's Deals
            </a>
            <a
              href="#"
              className="block px-4 py-2 rounded-md hover:bg-slate-600 transition-colors"
            >
              Customer Service
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Header;
