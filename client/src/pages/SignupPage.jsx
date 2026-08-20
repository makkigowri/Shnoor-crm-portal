function SignupPage() {
  return (
    <div className="min-h-screen flex justify-center items-center">

      <form className="w-[500px] border rounded-xl p-8">

        <h2 className="text-3xl font-bold mb-6">
          Create Organization
        </h2>

        <input
          placeholder="Organization Name"
          className="w-full border p-3 mb-4"
        />

        <input
          placeholder="Admin Name"
          className="w-full border p-3 mb-4"
        />

        <input
          placeholder="Email"
          className="w-full border p-3 mb-4"
        />

        <input
          placeholder="Phone"
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
          Create Organization
        </button>

      </form>

    </div>
  );
}

export default SignupPage;