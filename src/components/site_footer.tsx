import Link from "next/link"
import { Leaf } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="w-full border-t bg-background py-8 md:py-12">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="flex flex-col gap-2">
            <Link href="/" className="flex items-center space-x-2">
              <Leaf className="h-6 w-6 text-green-600" />
              <span className="text-xl font-bold">Rolsa</span>
            </Link>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Powering a sustainable future with innovative renewable energy solutions.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              <Link href="/terms" className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">
                Terms of Service
              </Link>
            </p>
          </div>
            <div className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold">Services</h3>
            <Link
              href=""
              className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
            >
              Solar Panel
            </Link>
            <Link
              href=""
              className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
            >
              EV Charging Points
            </Link>
            <Link
              href=""
              className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
            >
              Smart Energy Meters
            </Link>
            </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold">Resources</h3>
            <Link
              href="/carbon-footprint"
              className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
            >
              Carbon Reduction
            </Link>
            <Link
              href="/calculator"
              className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
            >
              Carbon Calculator
            </Link>
            <Link
              href="/booking"
              className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
            >
              Book Appoitments
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold">Connect</h3>
            <div className="flex space-x-4">
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Email: info@rolsa.com</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Phone: "number"</p>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} Rolsa Energy Solutions. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
    


        