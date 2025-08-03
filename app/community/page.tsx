import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageCircle, ThumbsUp, Clock, TrendingUp } from "lucide-react"

export default function CommunityPage() {
  const forumPosts = [
    {
      id: 1,
      title: "Best IPO opportunities for Q4 2025?",
      author: "InvestorPro",
      avatar: "/placeholder.svg?height=40&width=40",
      replies: 23,
      likes: 45,
      timeAgo: "2 hours ago",
      category: "IPO Discussion",
      trending: true,
    },
    {
      id: 2,
      title: "Market analysis: Tech stocks outlook",
      author: "MarketGuru",
      avatar: "/placeholder.svg?height=40&width=40",
      replies: 18,
      likes: 32,
      timeAgo: "4 hours ago",
      category: "Market Analysis",
      trending: false,
    },
    {
      id: 3,
      title: "Beginner's guide to options trading",
      author: "TradingMentor",
      avatar: "/placeholder.svg?height=40&width=40",
      replies: 67,
      likes: 89,
      timeAgo: "1 day ago",
      category: "Education",
      trending: true,
    },
    {
      id: 4,
      title: "Portfolio diversification strategies",
      author: "WealthBuilder",
      avatar: "/placeholder.svg?height=40&width=40",
      replies: 34,
      likes: 56,
      timeAgo: "2 days ago",
      category: "Investment Strategy",
      trending: false,
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
              <Link href="/community" className="text-blue-600 font-medium">
                COMMUNITY
              </Link>
              <Link href="/products" className="text-gray-500 hover:text-gray-900">
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Community Forum</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join our community of investors and traders. Share insights and ask questions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Categories</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="ghost" className="w-full justify-start">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Trending
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  IPO Discussion
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  Market Analysis
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  Education
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  Investment Strategy
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Forum Posts */}
          <div className="lg:col-span-3 space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Recent Discussions</h2>
              <Button className="bg-blue-600 hover:bg-blue-700">New Post</Button>
            </div>

            {forumPosts.map((post) => (
              <Card key={post.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <Avatar>
                      <AvatarImage src={post.avatar || "/placeholder.svg"} alt={post.author} />
                      <AvatarFallback>{post.author[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge variant="outline">{post.category}</Badge>
                        {post.trending && (
                          <Badge className="bg-orange-100 text-orange-800">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            Trending
                          </Badge>
                        )}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-blue-600 cursor-pointer">
                        {post.title}
                      </h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>by {post.author}</span>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {post.timeAgo}
                        </div>
                        <div className="flex items-center">
                          <MessageCircle className="w-4 h-4 mr-1" />
                          {post.replies} replies
                        </div>
                        <div className="flex items-center">
                          <ThumbsUp className="w-4 h-4 mr-1" />
                          {post.likes} likes
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
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
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
