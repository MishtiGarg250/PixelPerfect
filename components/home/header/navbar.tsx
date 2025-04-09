"use client"
import SearchInput from "./search-input"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Menu, X } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { UserButton, SignedIn } from "@clerk/nextjs"
import { SignedOut, SignInButton, SignUpButton } from "@clerk/clerk-react"

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-purple-500  backdrop-blur text-white shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Left Section */}
          <div className="flex items-center gap-8">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-extrabold tracking-tight">
                <span className="bg-gradient-to-r from-pink-400 to-purple-500 text-transparent bg-clip-text">
                  Pixel
                </span>
                <span className="text-white/60">{" "}Perfect</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6 text-sm font-medium text-white/70">
              <Link href="/about-us" className="hover:text-purple-400 transition-colors">About us</Link>
              <Link href="/skills" className="hover:text-purple-400 transition-colors">Skills</Link>
              <Link href="/dashboard" className="hover:text-purple-400 transition-colors">Dashboard</Link>
              <Link href="/articles" className="hover:text-purple-400 transition-colors">Articles</Link>
              <Link href="/study-plans" className="hover:text-purple-400 transition-colors">Study Plans</Link>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            <div className="hidden md:block">
              <SearchInput />
            </div>

            {/* User Auth */}
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
            <SignedOut>
              <div className="flex gap-2">
                <SignInButton>
                  <Button variant="outline" className="border-purple-500/50 text-puprle-400 hover:bg-purple-500 hover:text-white transition">
                    Login
                  </Button>
                </SignInButton>
                <SignUpButton>
                  <Button className="bg-purple-500 hover:bg-purple-600 text-white transition">
                    Sign up
                  </Button>
                </SignUpButton>
              </div>
            </SignedOut>

            {/* Mobile Menu Toggle */}
            <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className="h-6 w-6 text-puple-400" /> : <Menu className="h-6 w-6 text-white" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 space-y-4 border-t border-purple-500 ">
            {/* Search Input */}
            <div className="px-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-purple-400" />
                <Input
                  type="search"
                  placeholder="Search articles..."
                  className="pl-10 w-full focus-visible:ring-1 text-white"
                />
              </div>
            </div>

            {/* Navigation Links */}
            <div className="space-y-2 px-4 text-white">
              <Link href="/articles" className="block py-2 hover:text-purple-400" onClick={() => setIsMobileMenuOpen(false)}>Articles</Link>
              <Link href="/skills" className="block py-2 hover:text-purple-400" onClick={() => setIsMobileMenuOpen(false)}>Skills</Link>
              <Link href="/about-us" className="block py-2 hover:text-purple-400" onClick={() => setIsMobileMenuOpen(false)}>About</Link>
              <Link href="/dashboard" className="block py-2 hover:text-purple-400" onClick={() => setIsMobileMenuOpen(false)}>Dashboard</Link>
              <Link href="/study-plans" className="block py-2 hover:text-purple-400" onClick={() => setIsMobileMenuOpen(false)}>Study Plans</Link>
            </div>

            <SignedOut>
              <div className="px-4 flex flex-col gap-2">
                <SignInButton>
                  <Button variant="outline" className="w-full border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white">
                    Login
                  </Button>
                </SignInButton>
                <SignUpButton>
                  <Button className="w-full bg-purple-500 hover:bg-purple-600 text-white">
                    Sign up
                  </Button>
                </SignUpButton>
              </div>
            </SignedOut>
          </div>
        )}
      </div>
    </nav>
  )
}
