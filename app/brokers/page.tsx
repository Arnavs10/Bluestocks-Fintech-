import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Star, Check, X, ArrowRight, Filter } from "lucide-react"

export default function BrokersPage() {
  const brokers = [
    {
      id: 1,
      name: "Zerodha",
      logo: "/placeholder.svg?height=40&width=40",
      rating: 4.5,
      accountOpening: "₹0",
      equityDelivery: "₹0",
      equityIntraday: "₹20 or 0.03%",
      equityFutures: "₹20 or 0.03%",
      equityOptions: "₹20",
      features: ["Free AMC", "Advanced Charts", "Mobile App", "Research Reports"],
      pros: ["Zero brokerage on delivery", "User-friendly platform", "Good customer support"],
      cons: ["Limited research", "No advisory services"],
      recommended: true,
    },
    {
      id: 2,
      name: "Upstox",
      logo: "/placeholder.svg?height=40&width=40",
      rating: 4.2,
      accountOpening: "₹0",
      equityDelivery: "₹0",
      equityIntraday: "₹20 or 0.05%",
      equityFutures: "₹20 or 0.05%",
      equityOptions: "₹20",
      features: ["Free Demat", "Pro Charts", "Mobile Trading", "Market Analysis"],
      pros: ["Zero delivery charges", "Fast execution", "Good mobile app"],
      cons: ["Higher intraday charges", "Limited customer support"],
      recommended: false,
    },
    {
      id: 3,
      name: "Angel One",
      logo: "/placeholder.svg?height=40&width=40",
      rating: 4.0,
      accountOpening: "₹0",
      equityDelivery: "₹0",
      equityIntraday: "₹20 or 0.25%",
      equityFutures: "₹20 or 0.25%",
      equityOptions: "₹20",
      features: ["ARQ Engine", "SmartAPI", "Research Reports", "Advisory Services"],
      pros: ["Strong research", "Advisory services", "Multiple platforms"],
      cons: ["Higher charges", "Complex interface"],
      recommended: false,
    },
    {
      id: 4,
      name: "ICICI Direct",
      logo: "/placeholder.svg?height=40&width=40",
      rating: 3.8,
      accountOpening: "₹975",
      equityDelivery: "0.55%",
      equityIntraday: "0.05%",
      equityFutures: "0.05%",
      equityOptions: "₹100",
      features: ["3-in-1 Account", "Research Reports", "IPO Investment", "Mutual Funds"],
      pros: ["Bank integration", "Comprehensive services", "Strong research"],
      cons: ["High charges", "Account opening fees"],
      recommended: false,
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
              <Link href="/products" className="text-gray-500 hover:text-gray-900">
                PRODUCTS
              </Link>
              <Link href="/brokers" className="text-blue-600 font-medium">
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Compare Brokers</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find the best broker for your trading needs. Compare charges, features, and services.
          </p>
        </div>

        {/* Filter Section */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Badge variant="secondary">4 brokers found</Badge>
          </div>
          <div className="text-sm text-gray-600">Last updated: January 2025</div>
        </div>

        {/* Broker Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          {brokers.map((broker) => (
            <Card key={broker.id} className={`relative ${broker.recommended ? "ring-2 ring-blue-500" : ""}`}>
              {broker.recommended && (
                <Badge className="absolute -top-2 left-4 bg-blue-600 text-white">Recommended</Badge>
              )}
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img src={broker.logo || "/placeholder.svg"} alt={broker.name} className="w-10 h-10 rounded" />
                    <div>
                      <CardTitle className="text-xl">{broker.name}</CardTitle>
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(broker.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                            }`}
                          />
                        ))}
                        <span className="text-sm text-gray-600 ml-1">{broker.rating}</span>
                      </div>
                    </div>
                  </div>
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    Open Account
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-600">Account Opening</p>
                    <p className="font-semibold">{broker.accountOpening}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Equity Delivery</p>
                    <p className="font-semibold">{broker.equityDelivery}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Equity Intraday</p>
                    <p className="font-semibold">{broker.equityIntraday}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Equity Options</p>
                    <p className="font-semibold">{broker.equityOptions}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-900 mb-2">Key Features</p>
                  <div className="flex flex-wrap gap-1">
                    {broker.features.map((feature, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium text-green-600 mb-1">Pros</p>
                    <ul className="space-y-1">
                      {broker.pros.slice(0, 2).map((pro, index) => (
                        <li key={index} className="flex items-start">
                          <Check className="w-3 h-3 text-green-500 mr-1 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-600">{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-red-600 mb-1">Cons</p>
                    <ul className="space-y-1">
                      {broker.cons.slice(0, 2).map((con, index) => (
                        <li key={index} className="flex items-start">
                          <X className="w-3 h-3 text-red-500 mr-1 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-600">{con}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Detailed Comparison Table */}
        <Card>
          <CardHeader>
            <CardTitle>Detailed Comparison</CardTitle>
            <CardDescription>Compare all charges and features side by side</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Broker</TableHead>
                    <TableHead>Account Opening</TableHead>
                    <TableHead>Equity Delivery</TableHead>
                    <TableHead>Equity Intraday</TableHead>
                    <TableHead>Equity Futures</TableHead>
                    <TableHead>Equity Options</TableHead>
                    <TableHead>Rating</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {brokers.map((broker) => (
                    <TableRow key={broker.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center space-x-2">
                          <img src={broker.logo || "/placeholder.svg"} alt={broker.name} className="w-6 h-6 rounded" />
                          <span>{broker.name}</span>
                          {broker.recommended && (
                            <Badge variant="secondary" className="text-xs">
                              Best
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{broker.accountOpening}</TableCell>
                      <TableCell>{broker.equityDelivery}</TableCell>
                      <TableCell>{broker.equityIntraday}</TableCell>
                      <TableCell>{broker.equityFutures}</TableCell>
                      <TableCell>{broker.equityOptions}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                          {broker.rating}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white mt-12">
          <h2 className="text-3xl font-bold mb-4">Need Help Choosing?</h2>
          <p className="text-xl mb-6 opacity-90">
            Our experts can help you find the perfect broker for your trading style
          </p>
          <Button size="lg" variant="secondary">
            Get Personalized Recommendation
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
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
