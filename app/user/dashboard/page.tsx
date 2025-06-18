"use client"
import Link from "next/link"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { Code, Globe, Trophy, ArrowRight, Target } from "lucide-react"

const tracks = [
  {
    title: "Android Development",
    description: "Track your progress in Android Dev",
    href: "/user/dashboard/android",
    icon: Code,
    color: "from-[#b5b5f6] to-[#c5c5f8]",
  },
  {
    title: "Web Development",
    description: "Track your journey in Web Dev",
    href: "/user/dashboard/web",
    icon: Globe,
    color: "from-[#f7bff4] to-[#f8cff6]",
  },
  {
    title: "Competitive Programming",
    description: "Track your CP progress",
    href: "/user/dashboard/cp",
    icon: Trophy,
    color: "from-[#d5d5f8] to-[#b5b5f6]",
  },
]

export default function DashboardHome() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#b5b5f6]/5 via-transparent to-[#f7bff4]/5"></div>
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-[#b5b5f6]/10 to-transparent"></div>

      <div className="relative z-10 p-6 sm:p-8 lg:p-10">
        {/* Header Section */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 bg-gradient-to-r from-[#b5b5f6] to-[#f7bff4] rounded-2xl flex items-center justify-center shadow-lg">
              <Target className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                Choose Your Roadmap
              </h1>
              <p className="text-gray-400 mt-1">Select a learning track to continue your journey</p>
            </div>
          </div>
        </div>

        {/* Roadmap Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tracks.map((track, index) => {
            const Icon = track.icon

            return (
              <Link key={track.title} href={track.href}>
                <Card
                  className="group relative overflow-hidden bg-gradient-to-br from-gray-800/50 to-gray-700/50 border border-gray-700/50 backdrop-blur-sm hover:border-[#b5b5f6]/30 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl rounded-2xl cursor-pointer"
                  style={{
                    animationDelay: `${index * 150}ms`,
                  }}
                >
                  {/* Background Gradient Effect */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${track.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                  ></div>

                  <CardHeader className="relative z-10 pb-4">
                    <div className="flex items-center justify-between mb-3">
                      <div
                        className={`w-12 h-12 bg-gradient-to-r ${track.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                      >
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-[#b5b5f6] group-hover:translate-x-1 transition-all duration-300" />
                    </div>
                    <CardTitle className="text-xl font-semibold text-white group-hover:text-[#b5b5f6] transition-colors duration-300">
                      {track.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="relative z-10 pt-0">
                    <CardDescription className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 mb-4">
                      {track.description}
                    </CardDescription>

                    {/* Action Indicator */}
                    <div className="pt-2 border-t border-gray-700/50">
                      <div className="flex items-center gap-2 text-sm text-gray-500 group-hover:text-[#f7bff4] transition-colors duration-300">
                        <span>Start Learning</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </div>
                  </CardContent>

                  {/* Hover Effect Border */}
                  <div
                    className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${track.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none`}
                  ></div>
                </Card>
              </Link>
            )
          })}
        </div>

        {/* Bottom Section */}
        <div className="mt-12 text-center">
          <div className="p-8 bg-gradient-to-r from-gray-800/30 to-gray-700/30 rounded-3xl border border-[#b5b5f6]/20 backdrop-blur-sm">
            <h3 className="text-2xl font-bold text-white mb-2">Need a custom roadmap?</h3>
            <p className="text-gray-400 mb-6">Get personalized learning paths based on your goals</p>
            <div className="flex items-center justify-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Target className="w-4 h-4 text-[#b5b5f6]" />
                <span>Goal-Based Learning</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
