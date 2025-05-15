import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Battery, Lightbulb, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  // Service card data
  const services = [
    {
      icon: <Zap className="h-8 w-8 text-green-600 dark:text-green-400" />,
      title: "Solar Panels",
      description:
        "High-efficiency solar panels designed to maximize energy production for your home or business.",
      link: "/services/solar-panels",
    },
    {
      icon: <Battery className="h-8 w-8 text-green-600 dark:text-green-400" />,
      title: "EV Charging Points",
      description:
        "Fast and reliable charging solutions for electric vehicles at home or commercial locations.",
      link: "/services/ev-charging",
    },
    {
      icon: (
        <Lightbulb className="h-8 w-8 text-green-600 dark:text-green-400" />
      ),
      title: "Smart Energy Meters",
      description:
        "Intelligent energy management systems to optimize your energy usage and reduce costs.",
      link: "/services/smart-meters",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950">
        <div className="container mx-auto">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:gap-16">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Powering a Sustainable Future
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                  Rolsa provides innovative renewable energy solutions to help
                  you reduce your carbon footprint and save on energy costs.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/services">
                  <Button className="bg-green-600 hover:bg-green-700">
                    Explore Our Solutions
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/carbon-footprint">
                  <Button variant="outline">
                    Learn About Carbon Reduction
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <Image
                src="window.svg"
                alt="Renewable Energy"
                width={550}
                height={550}
                className="rounded-lg object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container mx-auto">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Our Energy Solutions
              </h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Discover how Rolsa can help you transition to clean, renewable
                energy with our comprehensive solutions.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3 lg:gap-12">
            {services.map((service, index) => (
              <div
                key={index}
                className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold">{service.title}</h3>
                <p className="text-center text-gray-500 dark:text-gray-400">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-green-600 dark:bg-green-800">
        <div className="container mx-auto text-white">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Ready to Go Green?
              </h2>
              <p className="max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Join thousands of satisfied customers who have reduced their
                carbon footprint with Rolsa.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/auth/signup">
                <Button className="bg-white text-green-600 hover:bg-gray-100">
                  Sign Up Today
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
