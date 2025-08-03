import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, TrendingUp, ArrowUp, ArrowDown, Minus, Bell } from "lucide-react"

export default function LiveNewsPage() {
  const marketData = [
    { name: "NIFTY 50", value: "21,456.30", change: "+234.50", changePercent: "+1.11%", trend: "up" },
    { name: "SENSEX", value: "70,842.30", change: "+456.20", changePercent: "+0.65%", trend: "up" },
    { name: "BANK NIFTY", value: "46,123.45", change: "-123.45", changePercent: "-0.27%", trend: "down" },
    { name: "NIFTY IT", value: "32,456.78", change: "+0.00", changePercent: "0.00%", trend: "neutral" },
  ]

  const newsArticles = [
    {
      id: 1,
      title: "RBI announces new monetary policy measures to boost economic growth",
      summary:
        "The Reserve Bank of India has announced a series of measures aimed at supporting economic recovery and maintaining price stability.",
      category: "Policy",
      time: "2 minutes ago",
      author: "Economic Times",
      image: "/placeholder.svg?height=200&width=300",
      trending: true,
      impact: "high",
    },
    {
      id: 2,
      title: "Tech stocks rally as Q4 earnings exceed expectations",
      summary:
        "Major technology companies report strong quarterly results, driving significant gains in the IT sector.",
      category: "Earnings",
      time: "15 minutes ago",
      author: "Business Standard",
      image: "/placeholder.svg?height=200&width=300",
      trending: true,
      impact: "medium",
    },
    {
      id: 3,
      title: "New IPO filing: Fintech startup seeks ₹2,000 crore funding",
      summary:
        "A leading fintech company has filed for an initial public offering, marking another major listing in the sector.",
      category: "IPO",
      time: "1 hour ago",
      author: "Mint",
      image: "/placeholder.svg?height=200&width=300",
      trending: false,
      impact: "medium",
    },
    {
      id: 4,
      title: "Oil prices surge amid geopolitical tensions",
      summary:
        "Crude oil prices have risen sharply following developments in the Middle East, affecting energy sector stocks.",
      category: "Commodities",
      time: "2 hours ago",
      author: "Reuters",
      image: "/placeholder.svg?height=200&width=300",
      trending: false,
      impact: "high",
    },
    {
      id: 5,
      title: "Banking sector shows resilience with improved NPA ratios",
      summary:
        "Major banks report declining non-performing assets, indicating improved financial health across the sector.",
      category: "Banking",
      time: "3 hours ago",
      author: "Financial Express",
      image: "/placeholder.svg?height=200&width=300",
      trending: false,
      impact: "low",
    },
  ]

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <ArrowUp className="w-4 h-4 text-green-600" />
      case "down":
        return <ArrowDown className="w-4 h-4 text-red-600" />
      default:
        return <Minus className="w-4 h-4 text-gray-600" />
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-green-100 text-green-800"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded"></div>
                <span className="text-xl font-bold text-gray-900">BLUESTOCK</span>
              </Link>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/ipo" className="text-gray-500 hover:text-gray-900">
                IPO
              </Link>
              <Link href="/community" className="text-gray-500 hover:text-gray-900">
                COMMUNITY
              </Link>
              <Link href="/products" className="text-gray-500 hover:text-gray-900">
                PRODUCTS
              </Link>
              <Link href="/brokers" className="text-gray-500 hover:text-gray-900">
                BROKERS
              </Link>
              <Link href="/live-news" className="text-blue-600 font-medium">
                LIVE NEWS{" "}
                <Badge variant="secondary" className="ml-1 bg-blue-600 text-white">
                  NEW
                </Badge>
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              <Button variant="ghost">Sign In</Button>
              <Button className="bg-blue-600 hover:bg-blue-700">Sign Up Now</Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Market Overview */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Market Overview</h2>
            <div className="flex items-center text-sm text-gray-600">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
              Live Updates
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {marketData.map((market, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-sm">{market.name}</h3>
                    {getTrendIcon(market.trend)}
                  </div>
                  <div className="text-lg font-bold">{market.value}</div>
                  <div
                    className={`text-sm ${market.trend === "up" ? "text-green-600" : market.trend === "down" ? "text-red-600" : "text-gray-600"}`}
                  >
                    {market.change} ({market.changePercent})
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main News Feed */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold text-gray-900">Live News</h1>
              <Button variant="outline" size="sm">
                <Bell className="w-4 h-4 mr-2" />
                Subscribe to Alerts
              </Button>
            </div>

            <div className="space-y-6">
              {newsArticles.map((article) => (
                <Card key={article.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-4">
                      <img
                        src={article.image || "/placeholder.svg"}
                        alt={article.title}
                        className="w-full md:w-48 h-32 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge variant="outline">{article.category}</Badge>
                          <Badge className={getImpactColor(article.impact)}>{article.impact} impact</Badge>
                          {article.trending && (
                            <Badge className="bg-orange-100 text-orange-800">
                              <TrendingUp className="w-3 h-3 mr-1" />
                              Trending
                            </Badge>
                          )}
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2 hover:text-blue-600 cursor-pointer">
                          {article.title}
                        </h3>
                        <p className="text-gray-600 mb-3 line-clamp-2">{article.summary}</p>
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <div className="flex items-center space-x-4">
                            <span>{article.author}</span>
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              {article.time}
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">
                            Read More
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-8">
              <Button variant="outline" size="lg">
                Load More News
              </Button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Trending Topics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Trending Topics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">#RBIPolicy</span>
                  <Badge variant="secondary">Hot</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">#TechEarnings</span>
                  <Badge variant="secondary">Rising</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">#IPOWatch</span>
                  <Badge variant="secondary">New</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">#BankingStocks</span>
                  <Badge variant="secondary">Stable</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Market Movers */}
            <Card>
              <CardHeader>
                <CardTitle>Top Gainers</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">RELIANCE</span>
                  <span className="text-green-600 text-sm">+3.45%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">TCS</span>
                  <span className="text-green-600 text-sm">+2.87%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">HDFC BANK</span>
                  <span className="text-green-600 text-sm">+2.34%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">INFOSYS</span>
                  <span className="text-green-600 text-sm">+1.98%</span>
                </div>
              </CardContent>
            </Card>

            {/* Newsletter Signup */}
            <Card>
              <CardHeader>
                <CardTitle>Stay Updated</CardTitle>
                <CardDescription>Get daily market insights delivered to your inbox</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">Subscribe</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Resources</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <Link href="#" className="hover:text-gray-900">
                    Trading View
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-gray-900">
                    NSE Holidays
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-gray-900">
                    e-Voting CDSL
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <Link href="#" className="hover:text-gray-900">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-gray-900">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-gray-900">
                    About US
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Offerings</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <Link href="#" className="hover:text-gray-900">
                    Compare Broker
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-gray-900">
                    Fin Calculators
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-gray-900">
                    IPO
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Links</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <Link href="#" className="hover:text-gray-900">
                    Shark Investor
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-gray-900">
                    Mutual Funds
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-gray-900">
                    Sitemap
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Policy</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <Link href="#" className="hover:text-gray-900">
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-gray-900">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-gray-900">
                    Refund Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
