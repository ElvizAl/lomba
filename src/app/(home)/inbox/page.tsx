
import Navbar from "@/components/layout/navbar";

export default function Inbox() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar title="Inbox" />
      <div className="p-4">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Messages</h2>
          <p className="text-gray-600">Inbox content goes here...</p>
        </div>
      </div>
    </div>
  );
}
