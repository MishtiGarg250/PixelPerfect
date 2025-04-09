import React from 'react'
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '../ui/card'
import Link from 'next/link'

const MainPage = () => {
  return (
    <div className="min-h-screen bg-black text-purple-200 px-8 py-12">
    
      <h1 className="text-4xl font-bold mb-10 text-purple-300 pb-4">
        Admin Dashboard
      </h1>

    
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        
        
        <Link href="/dashboard/articles" className="hover:scale-105 transition-transform">
          <Card className="bg-purple-900/10 border border-purple-500 text-purple-200 hover:shadow-lg hover:border-purple-300 transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-xl">Blog Management</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-purple-400">
                Create and manage your blogs and articles here
              </CardDescription>
            </CardContent>
          </Card>
        </Link>

      
        <Link href="/dashboard/tracks" className="hover:scale-105 transition-transform">
          <Card className="bg-purple-900/10 border border-purple-500 text-purple-200 hover:shadow-lg hover:border-purple-300 transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-xl">Track Management</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-purple-400">
                Manage and create all your learning tracks here
              </CardDescription>
            </CardContent>
          </Card>
        </Link>

      </div>
    </div>
  )
}

export default MainPage

