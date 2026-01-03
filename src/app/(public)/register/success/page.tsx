import Link from "next/link";

export default function SuccessPage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-xl w-full bg-white/80 backdrop-blur rounded-2xl shadow-soft border border-black/10 p-8 text-center">
        <h1 className="font-display text-3xl text-bootred">Submitted!</h1>
        <p className="mt-3 text-sm text-black/70">
          This Step 1 build validates your form and shows a success screen. In the next steps,
          we’ll store data in MongoDB, upload files to S3/R2, and generate ticket PDFs with QR.
        </p>
        <Link
          href="/register"
          className="mt-6 inline-flex items-center justify-center rounded-2xl bg-bootred px-5 py-3 text-white font-semibold shadow-soft hover:opacity-95"
        >
          Back to Registration
        </Link>
      </div>
    </main>
  );
}
