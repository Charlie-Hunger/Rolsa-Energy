import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Leaf, Recycle, Sprout } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CarbonFootprintPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Reduce Your Carbon Footprint
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                  Learn how Rolsa's renewable energy solutions directly lower
                  your carbon emissions and help combat climate change.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/calculator">
                  <Button className="bg-green-600 hover:bg-green-700">
                    Calculate Your Footprint
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/booking">
                  <Button variant="outline">Book an Appoitment</Button>
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <Image
                src="window.svg"
                alt="Carbon Footprint Reduction"
                width={400}
                height={400}
                className="rounded-lg object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Carbon Reduction Solutions */}
      <section className="w-full py-12 md:py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              Our Carbon Reduction Solutions
            </h2>
            <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed dark:text-gray-400">
              Rolsa offers specific services that measurably reduce carbon
              emissions.
            </p>
          </div>

          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                  <Leaf className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-semibold">Solar Energy</h3>
              </div>
              <p className="text-gray-500 dark:text-gray-400">
                Our residential solar panels reduce CO2 emissions by 3-4 tons
                annually per household. Our commercial installations can reduce
                business carbon footprints by up to 80%.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                  <Recycle className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-semibold">EV Charging</h3>
              </div>
              <p className="text-gray-500 dark:text-gray-400">
                Our EV charging infrastructure, powered by renewable energy,
                cuts transportation emissions by 50-70% compared to gasoline
                vehicles, saving 4-5 tons of CO₂ annually per car.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                  <Sprout className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-semibold">Smart Energy</h3>
              </div>
              <p className="text-gray-500 dark:text-gray-400">
                Our smart energy management systems reduce energy waste by
                15-20%, optimizing consumption patterns and further decreasing
                your carbon emissions by 1-2 tons annually.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process and Results */}
      <section className="w-full py-12 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              How We Reduce Your Carbon Footprint
            </h2>
            <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed dark:text-gray-400">
              Our proven process delivers measurable carbon reduction results.
            </p>
          </div>

          <div className="mx-auto max-w-5xl">
            <div className="mb-10 p-6 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <div>
                  <h3 className="text-xl font-semibold mb-4">
                    Assessment & Installation
                  </h3>
                  <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300">
                    <li>Free carbon footprint assessment</li>
                    <li>Custom renewable energy solution design</li>
                    <li>Professional installation with minimal disruption</li>
                    <li>Integration with existing energy systems</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4">
                    Monitoring & Optimization
                  </h3>
                  <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300">
                    <li>Real-time carbon reduction tracking</li>
                    <li>Quarterly emissions reduction reports</li>
                    <li>Continuous system optimization</li>
                    <li>Regular updates on carbon credit savings</li>
                  </ul>
                </div>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-center mb-6">
              Estimated Carbon Reduction Results
            </h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="flex flex-col items-center py-6 px-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                <span className="text-3xl font-bold text-green-600 mb-2">
                  80%
                </span>
                <span className="text-center text-gray-500 dark:text-gray-400">
                  Average reduction in household energy emissions
                </span>
              </div>
              <div className="flex flex-col items-center py-6 px-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                <span className="text-3xl font-bold text-green-600 mb-2">
                  7-10 tons
                </span>
                <span className="text-center text-gray-500 dark:text-gray-400">
                  Average annual CO₂ reduction per customer
                </span>
              </div>
              <div className="flex flex-col items-center py-6 px-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                <span className="text-3xl font-bold text-green-600 mb-2">
                  50,000+
                </span>
                <span className="text-center text-gray-500 dark:text-gray-400">
                  Total tons of CO₂ reduced annually
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 bg-green-600 dark:bg-green-800">
        <div className="container mx-auto px-4 md:px-6 text-white">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              Start Reducing Your Carbon Footprint Today
            </h2>
            <p className="max-w-[700px] md:text-xl/relaxed">
              Join thousands of customers already cutting their emissions with
              Rolsa's solutions.
            </p>
            <div className="flex flex-col gap-2 min-[400px]:flex-row mt-4">
              <Link href="/calculator">
                <Button className="bg-white text-green-600 hover:bg-gray-100">
                  Calculate Your Footprint
                </Button>
              </Link>
              <Link href="/booking">
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-green-700"
                >
                  Book an Appointment
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
