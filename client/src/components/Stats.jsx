function Stats() {
  const stats = [
    { value: "500+", label: "Organizations" },
    { value: "20K+", label: "Leads Managed" },
    { value: "99.9%", label: "Uptime" },
    { value: "1M+", label: "Activities Logged" },
  ];
  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-6">
        {stats.map((item) => (
          <div
            key={item.label}
            className="bg-white rounded-xl shadow p-6 text-center"
          >
            <h3 className="text-3xl font-bold text-blue-600">
              {item.value}
            </h3>
            <p className="text-gray-600 mt-2">
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
export default Stats;