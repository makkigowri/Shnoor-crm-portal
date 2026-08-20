import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="text-center py-24 px-8">

      <h1 className="text-5xl font-bold mb-6">
        Manage Leads & Customers
        From One CRM
      </h1>

      <p className="text-gray-600 max-w-2xl mx-auto mb-8">
        Track leads, manage customers,
        automate follow-ups and close deals faster.
      </p>

      <div className="flex justify-center gap-4">

        <Link
          to="/signup"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg"
        >
          Start Free Trial
        </Link>

        <button className="border px-6 py-3 rounded-lg">
          Book Demo
        </button>

      </div>

    </section>
  );
}

export default Hero;