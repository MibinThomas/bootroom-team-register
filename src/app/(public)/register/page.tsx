import RegisterForm from "@/components/register/RegisterForm";

export const metadata = {
  title: "The Bootroom | Team Registration",
  description: "Register your team for The Bootroom event (10 players required).",
};

export default function RegisterPage() {
  return (
    <main className="min-h-screen p-4 md:p-10">
      <div className="mx-auto max-w-5xl">
        <header className="rounded-2xl border border-bootred/20 bg-white/70 backdrop-blur shadow-soft p-6 md:p-8">
  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

    {/* LEFT: Logo + Title */}
    <div className="flex items-center gap-4">
      
      {/* LOGO CONTAINER */}
      <div className="h-16 w-16 md:h-20 md:w-20 rounded-xl bg-white border border-bootred/20 shadow-soft flex items-center justify-center overflow-hidden">
        {/* Replace src with your actual logo */}
        <img
          src="/bootroom-logo.png"
          alt="The Bootroom Logo"
          className="h-full w-full object-contain p-2"
        />
      </div>

      {/* TITLE */}
      <div>
        <h1 className="font-display text-3xl md:text-4xl text-bootred">
          Team Registration
        </h1>
        <p className="mt-1 text-sm md:text-base text-black/70">
          Complete the form below to register your team. 10 players are required.
        </p>
      </div>
    </div>

    {/* RIGHT: Badge */}
    <div className="inline-flex items-center gap-2 rounded-2xl bg-cream border border-bootgold/30 px-4 py-2 self-start md:self-auto">
      <span className="h-2 w-2 rounded-full bg-bootgold" />
      <span className="text-xs md:text-sm text-bootbrown">
        Retro • Premium • Responsive
      </span>
    </div>

  </div>
</header>


        <section className="mt-6">
          <RegisterForm />
        </section>

        <footer className="mt-10 pb-8 text-center text-xs text-black/50">
          © {new Date().getFullYear()} The Bootroom. All rights reserved.
        </footer>
      </div>
    </main>
  );
}
