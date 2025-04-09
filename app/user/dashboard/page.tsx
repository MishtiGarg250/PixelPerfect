"use client";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";

const tracks = [
  {
    title: "Android Development",
    description: "Track your progress in Android Dev",
    href: "/user/dashboard/android",
  },
  {
    title: "Web Development",
    description: "Track your journey in Web Dev",
    href: "/user/dashboard/web",
  },
  {
    title: "Competitive Programming",
    description: "Track your CP progress",
    href: "/user/dashboard/cp",
  },
];

export default function DashboardHome() {
  return (
    <div className="p-6 min-h-screen bg-black text-white">
      <h1 className="text-3xl font-bold text-purple-400 mb-8">Choose Your Roadmap</h1>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {tracks.map((track) => (
          <Link key={track.title} href={track.href}>
            <Card className="bg-zinc-900 border border-purple-700 text-purple-200 hover:shadow-xl transition-shadow duration-300 cursor-pointer">
              <CardHeader>
                <CardTitle className="text-xl">{track.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-purple-400">
                  {track.description}
                </CardDescription>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

