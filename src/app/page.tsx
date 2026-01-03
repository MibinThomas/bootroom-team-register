import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-xl w-full bg-white/70 backdrop-blur rounded-2xl shadow-soft border border-black/10 p-8">
        <h1 className="font-display text-3xl text-bootred">The Bootroom</h1>
        <p className="mt-3 text-sm text-black/70">
          Step 2: Registration UI + Ticket PDF generation with QR.
        </p>
        <div className="mt-6 flex gap-3">
          <Link
            href="/register"
            className="inline-flex items-center justify-center rounded-2xl bg-bootred px-5 py-3 text-white font-semibold shadow-soft hover:opacity-95"
          >
            Go to Registration
          </Link>
        </div>
      </div>
    </main>
  );
}
