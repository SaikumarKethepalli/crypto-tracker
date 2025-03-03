import CryptoTracker from "@/components/crypto-tracker"

export default function Home() {
  return (
    <main className="min-h-screen p-4 md:p-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-gray-50">Crypto Price Tracker</h1>
        <CryptoTracker />
      </div>
    </main>
  )
}

