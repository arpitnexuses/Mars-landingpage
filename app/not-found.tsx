export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-6xl font-bold text-mars-red">404</h1>
      <h2 className="text-2xl font-semibold mt-4">Page Not Found</h2>
      <p className="mt-4 text-gray-600">The page you're looking for doesn't exist or has been moved.</p>
      <a
        href="/"
        className="mt-6 px-6 py-2 bg-mars-red text-white rounded-md hover:bg-mars-red/90 transition-colors"
      >
        Go Home
      </a>
    </div>
  )
} 