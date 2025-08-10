import './App.css'
import { useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Converter from "./components/Converter";

export default function App() {
  useEffect(() => {
    document.title = "Shiftora — Timezone Converter";
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900 flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="relative overflow-hidden">
          <div className="mx-auto max-w-6xl px-4 py-12 md:py-20 grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
                World time,{" "}
                <span className="bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                  made simple
                </span>.
              </h1>
              <p className="mt-4 text-slate-600 text-lg">
                Shiftora is a clean, fast, dependency-free timezone converter. Pick a
                source and destination timezone, set a date & time, and get an exact
                answer—DST safe.
              </p>
              <ul className="mt-6 space-y-2 text-sm text-slate-600">
                <li>• Uses native <code className="bg-slate-100 px-1 rounded">Intl</code> APIs</li>
                <li>• Handles DST with a precise two-pass algorithm</li>
                <li>• No external libraries</li>
              </ul>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-tr from-indigo-200 via-blue-200 to-cyan-200 blur-3xl opacity-40 rounded-3xl" />
              <div className="relative rounded-3xl border border-slate-200 bg-white shadow-xl p-6 md:p-8">
                <Converter />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
