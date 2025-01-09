import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-8">Welcome to Your App</h1>
        <div className="space-x-4">
          <Link
            href="/login"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
          >
            Login
          </Link>
          <Link
            href="/dashboard"
            className="inline-block bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700"
          >
            Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
