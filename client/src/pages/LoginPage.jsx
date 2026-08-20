function LoginPage() {
  return (
    <div className="min-h-screen flex justify-center items-center">

      <form className="w-96 border rounded-xl p-8">

        <h2 className="text-3xl font-bold mb-6">
          Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-3 mb-4"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 mb-4"
        />

        <button
          className="w-full bg-blue-600 text-white py-3 rounded"
        >
          Login
        </button>

      </form>

    </div>
  );
}

export default LoginPage;