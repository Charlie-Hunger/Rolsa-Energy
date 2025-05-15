import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function TermsAndServicesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-12 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              Terms and Services
            </h1>
            <p className="max-w-[600px] text-gray-500 dark:text-gray-400">
              Please review our terms and conditions.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="w-full py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Terms and Services
              </p>

              <p className="text-sm text-gray-500 dark:text-gray-400 mt-8">
                Last Updated: April 2, 2025
              </p>
            </div>

            <div className="mt-8 text-center">
              <Link href="/">
                <Button className="bg-green-600 hover:bg-green-700">
                  Return to Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
