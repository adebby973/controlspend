import { Outlet, Link } from "react-router-dom";
import { useState } from "react";

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <section className="flex min-h-screen w-full flex-col bg-neutral-50 p-3 sm:p-5">
      {/* HEADER */}
      <header className="relative mx-auto flex min-h-16 w-full items-center justify-between rounded-2xl border border-amber-200 bg-white px-4 shadow-md sm:px-6 md:w-10/12 md:rounded-3xl">
        <Link to="/home">
          <h1 className="lora text-xl font-bold tracking-tight text-amber-400 transition hover:text-amber-600 sm:text-2xl md:text-3xl">
            Control Spend
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="roboto-serif hidden items-center gap-2 md:flex">
          <Link
            to="/home"
            className="rounded-xl px-4 py-2 text-sm font-medium text-neutral-700 transition hover:bg-amber-50 hover:text-amber-500"
          >
            Home
          </Link>

          <Link
            to="/expense"
            className="rounded-xl px-4 py-2 text-sm font-medium text-neutral-700 transition hover:bg-amber-50 hover:text-amber-500"
          >
            Expense
          </Link>

          <Link
            to="/savings"
            className="rounded-xl px-4 py-2 text-sm font-medium text-neutral-700 transition hover:bg-amber-50 hover:text-amber-500"
          >
            Savings
          </Link>

          <Link
            to="/profile"
            className="rounded-xl px-4 py-2 text-sm font-medium text-neutral-700 transition hover:bg-amber-50 hover:text-amber-500"
          >
            Profile
          </Link>
        </nav>

        {/* Hamburger */}
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-xl border border-neutral-200 bg-neutral-50 transition hover:border-amber-300 hover:bg-amber-50 md:hidden"
          aria-label="Toggle menu"
        >
          <span className="h-0.5 w-5 rounded bg-neutral-800"></span>
          <span className="h-0.5 w-5 rounded bg-neutral-800"></span>
          <span className="h-0.5 w-5 rounded bg-neutral-800"></span>
        </button>

        {/* Mobile Navigation */}
        {menuOpen && (
          <nav className="roboto-serif absolute right-0 top-full z-50 mt-3 flex w-52 flex-col gap-1 rounded-2xl border border-amber-200 bg-white p-2 shadow-xl md:hidden">
            <Link
              to="/home"
              onClick={() => setMenuOpen(false)}
              className="rounded-xl px-4 py-3 text-sm font-medium text-neutral-700 hover:bg-amber-50 hover:text-amber-500"
            >
              Home
            </Link>

            <Link
              to="/expense"
              onClick={() => setMenuOpen(false)}
              className="rounded-xl px-4 py-3 text-sm font-medium text-neutral-700 hover:bg-amber-50 hover:text-amber-500"
            >
              Expense
            </Link>

            <Link
              to="/savings"
              onClick={() => setMenuOpen(false)}
              className="rounded-xl px-4 py-3 text-sm font-medium text-neutral-700 hover:bg-amber-50 hover:text-amber-500"
            >
              Savings
            </Link>

            <Link
              to="/profile"
              onClick={() => setMenuOpen(false)}
              className="rounded-xl px-4 py-3 text-sm font-medium text-neutral-700 hover:bg-amber-50 hover:text-amber-500"
            >
              Profile
            </Link>
          </nav>
        )}
      </header>

      {/* PAGE CONTENT */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* FOOTER */}
      <footer className="mt-10 border-t border-amber-200 bg-white">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-6 px-5 py-8 sm:px-8 md:flex-row md:justify-between">
          <div className="text-center md:text-left">
            <Link to="/home">
              <h2 className="lora text-2xl font-semibold text-amber-400">
                Control Spend
              </h2>
            </Link>

            <p className="roboto-serif mt-1 text-sm text-neutral-500">
              Take control of your money.
            </p>
          </div>

          <nav className="roboto-serif flex flex-wrap justify-center gap-5 text-sm">
            <Link to="/home" className="text-neutral-600 hover:text-amber-500">
              Home
            </Link>

            <Link
              to="/expense"
              className="text-neutral-600 hover:text-amber-500"
            >
              Expense
            </Link>

            <Link
              to="/savings"
              className="text-neutral-600 hover:text-amber-500"
            >
              Savings
            </Link>

            <Link
              to="/profile"
              className="text-neutral-600 hover:text-amber-500"
            >
              Profile
            </Link>
          </nav>
        </div>

        <div className="border-t border-neutral-100 px-4 py-4 text-center">
          <p className="roboto-serif text-xs text-neutral-400">
            © 2026 Control Spend. Manage your money wisely.
          </p>
        </div>
      </footer>
    </section>
  );
}
