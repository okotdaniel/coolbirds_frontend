import Link from "next/link"
import { Search } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function Page() {
  // Sample blog posts
  const featuredPosts = [
    {
      id: 1,
      title: "5 Ways AI is Transforming Poultry Farm Management",
      excerpt:
        "Discover how artificial intelligence is revolutionizing poultry farming with predictive analytics, health monitoring, and more.",
      date: "April 5, 2025",
      author: "Dr. Sarah Johnson",
      category: "Technology",
      image: "/blog/ai-poultry.jpg",
      slug: "ai-transforming-poultry-farm-management",
    },
    {
      id: 2,
      title: "Optimizing Feed Efficiency: A Comprehensive Guide",
      excerpt:
        "Learn strategies to improve feed conversion ratios and reduce costs while maintaining optimal bird health and production.",
      date: "March 28, 2025",
      author: "Michael Chen",
      category: "Feed Management",
      image: "/blog/feed-efficiency.jpg",
      slug: "optimizing-feed-efficiency-guide",
    },
    {
      id: 3,
      title: "Environmental Control Best Practices for Layer Houses",
      excerpt:
        "Explore the latest techniques for maintaining optimal temperature, humidity, and air quality in layer houses.",
      date: "March 15, 2025",
      author: "Dr. Robert Williams",
      category: "Environment",
      image: "/blog/environmental-control.jpg",
      slug: "environmental-control-best-practices",
    },
  ]

  const recentPosts = [
    {
      id: 4,
      title: "Reducing Mortality Rates Through Early Disease Detection",
      excerpt: "How modern monitoring systems can help identify health issues before they become widespread problems.",
      date: "March 10, 2025",
      author: "Dr. Maria Garcia",
      category: "Health",
      image: "/blog/disease-detection.jpg",
      slug: "reducing-mortality-rates",
    },
    {
      id: 5,
      title: "Sustainable Poultry Farming: Balancing Profit and Environment",
      excerpt:
        "Strategies for implementing sustainable practices that benefit both your bottom line and the environment.",
      date: "March 5, 2025",
      author: "James Wilson",
      category: "Sustainability",
      image: "/blog/sustainable-farming.jpg",
      slug: "sustainable-poultry-farming",
    },
    {
      id: 6,
      title: "Maximizing Egg Quality: From Production to Packaging",
      excerpt: "A comprehensive approach to ensuring high-quality eggs throughout the entire production process.",
      date: "February 28, 2025",
      author: "Lisa Anderson",
      category: "Production",
      image: "/blog/egg-quality.jpg",
      slug: "maximizing-egg-quality",
    },
  ]

  return (
    <div className="container ">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Cool Birds Blog
              </h1>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Insights, tips, and best practices for modern poultry farming
              </p>
            </div>
            <div className="w-full max-w-md">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Search articles..." className="pl-8" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <Tabs defaultValue="all" className="space-y-8">
            <div className="flex justify-between items-center">
              <TabsList>
                <TabsTrigger value="all">All Posts</TabsTrigger>
                <TabsTrigger value="technology">Technology</TabsTrigger>
                <TabsTrigger value="management">Management</TabsTrigger>
                <TabsTrigger value="health">Health</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="all" className="space-y-8">
              {/* Featured Posts */}
              <div>
                <h2 className="text-2xl font-bold tracking-tight mb-6">Featured Articles</h2>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {featuredPosts.map((post) => (
                    <Card key={post.id} className="flex flex-col overflow-hidden">
                      <div className="aspect-video w-full overflow-hidden">
                        <img
                          src={post.image || "/placeholder.svg?height=200&width=300"}
                          alt={post.title}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <CardHeader className="flex-1">
                        <div className="space-y-1">
                          <Badge variant="secondary" className="mb-2">
                            {post.category}
                          </Badge>
                          <CardTitle className="text-xl">
                            <Link href={`/blog/${post.slug}`} className="hover:underline">
                              {post.title}
                            </Link>
                          </CardTitle>
                          <CardDescription>{post.excerpt}</CardDescription>
                        </div>
                      </CardHeader>
                      <CardFooter className="border-t pt-4 flex justify-between items-center">
                        <div className="text-sm text-muted-foreground">
                          By {post.author} • {post.date}
                        </div>
                        <Link href={`/blog/${post.slug}`}>
                          <Button variant="ghost" size="sm">
                            Read More
                          </Button>
                        </Link>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Recent Posts */}
              <div>
                <h2 className="text-2xl font-bold tracking-tight mb-6">Recent Articles</h2>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {recentPosts.map((post) => (
                    <Card key={post.id} className="flex flex-col overflow-hidden">
                      <div className="aspect-video w-full overflow-hidden">
                        <img
                          src={post.image || "/placeholder.svg?height=200&width=300"}
                          alt={post.title}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <CardHeader className="flex-1">
                        <div className="space-y-1">
                          <Badge variant="secondary" className="mb-2">
                            {post.category}
                          </Badge>
                          <CardTitle className="text-xl">
                            <Link href={`/blog/${post.slug}`} className="hover:underline">
                              {post.title}
                            </Link>
                          </CardTitle>
                          <CardDescription>{post.excerpt}</CardDescription>
                        </div>
                      </CardHeader>
                      <CardFooter className="border-t pt-4 flex justify-between items-center">
                        <div className="text-sm text-muted-foreground">
                          By {post.author} • {post.date}
                        </div>
                        <Link href={`/blog/${post.slug}`}>
                          <Button variant="ghost" size="sm">
                            Read More
                          </Button>
                        </Link>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Load More Button */}
              <div className="flex justify-center mt-8">
                <Button variant="outline">Load More Articles</Button>
              </div>
            </TabsContent>

            {/* Other tabs would have similar content filtered by category */}
            <TabsContent value="technology" className="space-y-8">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {[...featuredPosts, ...recentPosts]
                  .filter((post) => post.category === "Technology")
                  .map((post) => (
                    <Card key={post.id} className="flex flex-col overflow-hidden">
                      <div className="aspect-video w-full overflow-hidden">
                        <img
                          src={post.image || "/placeholder.svg?height=200&width=300"}
                          alt={post.title}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <CardHeader className="flex-1">
                        <div className="space-y-1">
                          <Badge variant="secondary" className="mb-2">
                            {post.category}
                          </Badge>
                          <CardTitle className="text-xl">
                            <Link href={`/blog/${post.slug}`} className="hover:underline">
                              {post.title}
                            </Link>
                          </CardTitle>
                          <CardDescription>{post.excerpt}</CardDescription>
                        </div>
                      </CardHeader>
                      <CardFooter className="border-t pt-4 flex justify-between items-center">
                        <div className="text-sm text-muted-foreground">
                          By {post.author} • {post.date}
                        </div>
                        <Link href={`/blog/${post.slug}`}>
                          <Button variant="ghost" size="sm">
                            Read More
                          </Button>
                        </Link>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Subscribe to our newsletter</h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed">
                Get the latest articles, tips, and industry insights delivered to your inbox.
              </p>
            </div>
            <div className="w-full max-w-md">
              <div className="flex space-x-2">
                <Input type="email" placeholder="Enter your email" />
                <Button type="submit">Subscribe</Button>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                By subscribing, you agree to our Terms of Service and Privacy Policy.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
