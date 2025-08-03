import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, TrendingUp, Calculator, PieChart, BarChart3, Smartphone, Globe } from "lucide-react"

export default function ProductsPage() {
  const products = [
    {
      id: 1,
      title: "Trading Platform",
      description: "Advanced trading platform with real-time market data and analytics",
      icon: <TrendingUp className="w-8 h-8 text-blue-600" />,
      features: ["Real-time quotes", "Advanced charts", "Order management", "Portfolio tracking"],
      status: "Available",
      comingSoon: false,
    },
    {
      id: 2,
      title: "Investment Calculator",
      description: "Comprehensive financial calculators for investment planning",
      icon: <Calculator className="w-8 h-8 text-green-600" />,
      features: ["SIP Calculator", "EMI Calculator", "Tax Calculator", "Retirement Planner"],
      status: "Available",
      comingSoon: false,
    },
    {
      id: 3,
      title: "Portfolio Analyzer",
      description: "AI-powered portfolio analysis and optimization tools",
      icon: <PieChart className="w-8 h-8 text-purple-600" />,
      features: ["Risk Assessment", "Asset Allocation", "Performance Analytics", "Rebalancing"],
      status: "Coming Soon",
      comingSoon: true,
    },
    {
      id: 4,
      title: "Market Research",
      description: "In-depth market research and analysis reports",
      icon: <BarChart3 className="w-8 h-8 text-orange-600" />,
      features: ["Company Reports", "Sector Analysis", "IPO Research", "Market Trends"],
      status: "Coming Soon",
      comingSoon: true,
    },
    {
      id: 5,
      title: "Mobile App",
      description: "Trade on the go with our mobile trading application",
      icon: <Smartphone className="w-8 h-8 text-indigo-600" />,
      features: ["Mobile Trading", "Push Notifications", "Biometric Login", "Offline Mode"],
      status: "Coming Soon",
      comingSoon: true,
    },
    {
      id: 6,
      title: "API Platform",
      description: "Developer-friendly APIs for building financial applications",
      icon: <Globe className="w-8 h-8 text-teal-600" />,
      features: ["REST APIs", "WebSocket Feeds", "Documentation", "SDKs"],
      status: "Coming Soon",
      comingSoon: true,
    },
  ]

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
              <Link href="/products" className="text-blue-600 font-medium">
                PRODUCTS
              </Link>
              <Link href="/brokers" className="text-gray-500 hover:text-gray-900">
                BROKERS
              </Link>
              <Link href="/live-news" className="text-gray-500 hover:text-gray-900">
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
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Explore Our Products</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We're working hard to bring you a curated list of financial products. Stay tuned!
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {products.map((product) => (
            <Card key={product.id} className="relative hover:shadow-lg transition-shadow">
              {product.comingSoon && (
                <Badge className="absolute top-4 right-4 bg-orange-100 text-orange-800">Coming Soon</Badge>
              )}
              <CardHeader>
                <div className="flex items-center space-x-3 mb-4">
                  {product.icon}
                  <CardTitle className="text-xl">{product.title}</CardTitle>
                </div>
                <CardDescription className="text-gray-600">{product.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  className={`w-full ${product.comingSoon ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
                  disabled={product.comingSoon}
                >
                  {product.comingSoon ? "Coming Soon" : "Learn More"}
                  {!product.comingSoon && <ArrowRight className="w-4 h-4 ml-2" />}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-6 opacity-90">
            Join thousands of investors who trust Bluestock for their financial journey
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary">
              Start Free Trial
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-white border-white hover:bg-white hover:text-blue-600 bg-transparent"
            >
              Schedule Demo
            </Button>
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
