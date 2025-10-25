
import Navbar from "@/components/layout/navbar";

export default function Analitik() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar title="Analitik" />
      <div className="p-4">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Analytics Dashboard</h2>
          <p className="text-gray-600">Analytics content goes here...</p>
        </div>
      </div>
    </div>
  );
}
