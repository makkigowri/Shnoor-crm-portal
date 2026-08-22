import {
  Users,
  Briefcase,
  BarChart3,
} from "lucide-react";
function Features() {
  return (
    <section
      id="features"
      className="py-20 px-8"
    >
      <h2 className="text-4xl font-bold text-center mb-12">
        Features
      </h2>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="border p-6 rounded-xl">
          <Users />
          <h3 className="font-bold mt-3">
            Lead Management
          </h3>
        </div>
        <div className="border p-6 rounded-xl">
          <Briefcase />
          <h3 className="font-bold mt-3">
            Sales Pipeline
          </h3>
        </div>
        <div className="border p-6 rounded-xl">
          <BarChart3 />
          <h3 className="font-bold mt-3">
            Analytics
          </h3>
        </div>
      </div>
    </section>
  );
}
export default Features;