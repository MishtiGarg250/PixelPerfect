import React from 'react'
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '../ui/card'
import Link from 'next/link'

const MainPage = () => {
  return (
    <div className="min-h-screen bg-black text-purple-200 px-8 py-12">
    
      <h1 className="text-4xl font-bold mb-8 text-white pb-4">
        Admin Dashboard
      </h1>

    
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        
        
        <Link href="/dashboard/articles" className="hover:scale-105 transition-transform">
            <Card className="bg-[#1c1c29] border-0 text-white hover:shadow-lg hover:border-purple-300 transition-all duration-300 rounded-2xl">
            <CardHeader>
              <CardTitle className="text-xl">Blogs Management</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-white/80 leading-relaxed">
              Effortlessly create, edit, and manage your blogs and articles to keep your content fresh and engaging.
              </CardDescription>
            </CardContent>
            </Card>
        </Link>

      
        <Link href="/dashboard/tracks" className="hover:scale-105 transition-transform">
          <Card className="bg-[#1c1c29] border-0 text-white hover:shadow-lg hover:border-purple-300 transition-all duration-300 rounded-2xl">
            <CardHeader>
              <CardTitle className="text-xl">Track Management</CardTitle>
            </CardHeader>
            <CardContent>
                <CardDescription className="text-white/80 leading-relaxed">
                Seamlessly organize, create, and manage your learning tracks to enhance the educational experience.
                </CardDescription>
            </CardContent>
          </Card>
        </Link>

      </div>
    </div>
  )
}

export default MainPage

