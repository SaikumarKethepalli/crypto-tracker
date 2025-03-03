"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { Search, RefreshCw } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import CryptoCard from "@/components/crypto-card"
import { Skeleton } from "@/components/ui/skeleton"

interface Cryptocurrency {
  id: string
  symbol: string
  name: string
  image: string
  current_price: number
  price_change_percentage_24h: number
  market_cap: number
  total_volume: number
}

export default function CryptoTracker() {
  const [searchQuery, setSearchQuery] = useState("")

  const fetchCryptoData = async () => {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false&locale=en",
    )

    if (!response.ok) {
      throw new Error("Failed to fetch cryptocurrency data")
    }

    return response.json()
  }

  const { data, isLoading, isError, error, refetch, isFetching } = useQuery<Cryptocurrency[]>({
    queryKey: ["cryptoData"],
    queryFn: fetchCryptoData,
    staleTime: 60000, // 1 minute
  })

  const filteredData = data?.filter(
    (crypto) =>
      crypto.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      crypto.symbol.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
          <Input
            placeholder="Search cryptocurrencies..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button onClick={() => refetch()} disabled={isFetching} className="w-full sm:w-auto">
          <RefreshCw className={`h-4 w-4 mr-2 ${isFetching ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      {isError && (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-lg">
          Error: {(error as Error).message || "Failed to fetch cryptocurrency data"}
        </div>
      )}

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="p-6 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800"
            >
              <div className="flex items-center gap-3 mb-4">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-12" />
                </div>
              </div>
              <div className="space-y-3">
                <Skeleton className="h-8 w-32" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          {filteredData && filteredData.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredData.map((crypto) => (
                <CryptoCard key={crypto.id} crypto={crypto} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">
                {searchQuery ? "No cryptocurrencies found matching your search." : "No cryptocurrency data available."}
              </p>
            </div>
          )}
        </>
      )}
    </div>
  )
}

