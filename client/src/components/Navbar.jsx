import { Link } from "react-router-dom";
function Navbar() {
  return (
    <nav className="flex justify-between items-center px-8 py-4 shadow-sm">
      <h1 className="text-2xl font-bold">
        CRM Portal
      </h1>
      <div className="flex gap-6">
        <a href="#features">Features</a>
        <a href="#pricing">Pricing</a>
        <Link to="/login">
          Login
        </Link>
        <Link
          to="/signup"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Start Free Trial
        </Link>
      </div>
    </nav>
  );
}
export default Navbar;