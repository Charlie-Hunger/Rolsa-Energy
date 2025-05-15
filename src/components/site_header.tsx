"use client";


import { useState, useEffect } from "react";
import Link from "next/link";
import { Leaf, Menu, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

// Create a custom event for auth state changes
export const dispatchAuthEvent = () => {
  const event = new Event('authStateChanged');
  window.dispatchEvent(event);
};

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check if the user is logged in when the component mounts
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Add cache-busting parameter to prevent cached responses
        const response = await fetch('/api/isLoggedIn?_=' + new Date().getTime());
        const data = await response.json();
        setIsAuthenticated(data.isLoggedIn);
      } catch (error) {
        console.error('Error checking authentication:', error);
      } finally {
        setIsLoading(false);
      }
    };

    // Initial auth check
    checkAuth();
    
    // Create a custom event listener for auth state changes
    const handleAuthChange = () => {
      checkAuth();
    };
    
    // Listen for auth state changes
    window.addEventListener('authStateChanged', handleAuthChange);
    
    // Clean up the event listener
    return () => {
      window.removeEventListener('authStateChanged', handleAuthChange);
    };
  }, []);

  // Handle logout
  const handleLogout = async () => {
    try {
      setIsLoading(true); // Show loading state while logging out
      
      const response = await fetch('/api/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store'
      });

      if (response.ok) {
        // Update state immediately before redirect
        setIsAuthenticated(false);
        
        // Dispatch auth event to update other components
        dispatchAuthEvent();
        
        // Give a brief moment for state to update visually
        setTimeout(() => {
          window.location.href = '/';
        }, 100);
      }
    } catch (error) {
      console.error('Error signing out:', error);
      setIsLoading(false); // Reset loading state on error
    }
  };

  // Authentication buttons for desktop
  const renderDesktopAuthButtons = () => {
    if (isLoading) {
      return (
        <div className="flex gap-2 items-center h-10">
          <div className="h-10 w-20 bg-gray-200 animate-pulse rounded-md"></div>
        </div>
      );
    }

    if (isAuthenticated) {
      return (
        <Button 
          variant="outline" 
          onClick={handleLogout}
          className="flex items-center gap-2"
          disabled={isLoading}
        >
          <LogOut className="h-4 w-4" />
          {isLoading ? "Signing Out..." : "Sign Out"}
        </Button>
      );
    }

    return (
      <>
        <Link href="/auth/signin">
          <Button variant="outline">Sign In</Button>
        </Link>
        <Link href="/auth/signup">
          <Button className="bg-green-600 hover:bg-green-700">Sign Up</Button>
        </Link>
      </>
    );
  };

  // Authentication buttons for mobile
  const renderMobileAuthButtons = () => {
    if (isLoading) {
      return (
        <div className="h-10 w-full bg-gray-200 animate-pulse rounded-md"></div>
      );
    }

    if (isAuthenticated) {
      return (
        <Button 
          variant="outline" 
          onClick={() => {
            handleLogout();
            setIsOpen(false);
          }}
          className="w-full flex items-center justify-center gap-2"
          disabled={isLoading}
        >
          <LogOut className="h-4 w-4" />
          {isLoading ? "Signing Out..." : "Sign Out"}
        </Button>
      );
    }

    return (
      <>
        <Link href="/auth/signin" onClick={() => setIsOpen(false)}>
          <Button variant="outline" className="w-full">
            Sign In
          </Button>
        </Link>
        <Link href="/auth/signup" onClick={() => setIsOpen(false)}>
          <Button className="w-full bg-green-600 hover:bg-green-700">
            Sign Up
          </Button>
        </Link>
      </>
    );
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between mx-auto ">
        <Link href="/" className="flex items-center space-x-2">
          <Leaf className="h-6 w-6 text-green-600" />
          <span className="text-xl font-bold">Rolsa</span>
        </Link>
        <nav className="hidden md:flex gap-6">
          <Link
            href="/"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Home
          </Link>
          <Link
            href="/services"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Services
          </Link>
          <Link
            href="/carbon-footprint"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Carbon Reduction
          </Link>
          <Link
            href="/calculator"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Carbon Calculator
          </Link>
          <Link
            href="/energy-calculator"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Energy Calculator
          </Link>
          <Link
            href="/booking"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Book Appoitments
          </Link>
        </nav>
        <div className="hidden md:flex gap-2">
          {renderDesktopAuthButtons()}
        </div>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="outline" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <div className="flex flex-col gap-6 pt-6">
              <Link
                href="/"
                className="flex items-center space-x-2"
                onClick={() => setIsOpen(false)}
              >
                <Leaf className="h-6 w-6 text-green-600" />
                <span className="text-xl font-bold">Rolsa</span>
              </Link>
              <nav className="flex flex-col gap-4">
                <Link
                  href="/"
                  className="text-sm font-medium hover:underline underline-offset-4"
                  onClick={() => setIsOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/services"
                  className="text-sm font-medium hover:underline underline-offset-4"
                  onClick={() => setIsOpen(false)}
                >
                  Services
                </Link>
                <Link
                  href="/carbon-footprint"
                  className="text-sm font-medium hover:underline underline-offset-4"
                  onClick={() => setIsOpen(false)}
                >
                  Carbon Reduction
                </Link>
                <Link
                  href="/calculator"
                  className="text-sm font-medium hover:underline underline-offset-4"
                  onClick={() => setIsOpen(false)}
                >
                  Carbon Calculator
                </Link>
                <Link
                  href="/booking"
                  className="text-sm font-medium hover:underline underline-offset-4"
                  onClick={() => setIsOpen(false)}
                >
                  Book Consultation
                </Link>
              </nav>
              <div className="flex flex-col gap-2">
                {renderMobileAuthButtons()}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
