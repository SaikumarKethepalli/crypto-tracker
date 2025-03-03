import { ArrowUpRight, ArrowDownRight } from "lucide-react"
import { formatCurrency, formatPercentage } from "@/lib/utils"

interface CryptoCardProps {
  crypto: {
    id: string
    symbol: string
    name: string
    image: string
    current_price: number
    price_change_percentage_24h: number
    market_cap: number
    total_volume: number
  }
}

export default function CryptoCard({ crypto }: CryptoCardProps) {
  const isPriceUp = crypto.price_change_percentage_24h >= 0

  return (
    <div className="p-6 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 transition-all hover:shadow-md">
      <div className="flex items-center gap-3 mb-4">
        <img src={crypto.image || "/placeholder.svg"} alt={crypto.name} className="w-10 h-10 rounded-full" />
        <div>
          <h3 className="font-bold text-gray-900 dark:text-gray-50">{crypto.name}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 uppercase">{crypto.symbol}</p>
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-2xl font-bold text-gray-900 dark:text-gray-50">{formatCurrency(crypto.current_price)}</p>

        <div
          className={`flex items-center text-sm ${
            isPriceUp ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
          }`}
        >
          {isPriceUp ? <ArrowUpRight className="h-4 w-4 mr-1" /> : <ArrowDownRight className="h-4 w-4 mr-1" />}
          <span>{formatPercentage(crypto.price_change_percentage_24h)}</span>
        </div>

        <div className="pt-2 border-t border-gray-100 dark:border-gray-700 grid grid-cols-2 gap-2 text-sm">
          <div>
            <p className="text-gray-500 dark:text-gray-400">Market Cap</p>
            <p className="font-medium text-gray-900 dark:text-gray-50">{formatCurrency(crypto.market_cap, true)}</p>
          </div>
          <div>
            <p className="text-gray-500 dark:text-gray-400">Volume (24h)</p>
            <p className="font-medium text-gray-900 dark:text-gray-50">{formatCurrency(crypto.total_volume, true)}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

