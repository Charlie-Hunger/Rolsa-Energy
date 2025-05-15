import Image from "next/image";
import Link from "next/link";
import { Battery, Check, Lightbulb, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const FeatureItem = ({ children }: { children: React.ReactNode }) => (
  <li className="flex items-start gap-2">
    <Check className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5" />
    <span>{children}</span>
  </li>
);

const FeatureBadge = ({
  icon: Icon,
  text,
}: {
  icon: React.ElementType;
  text: string;
}) => (
  <div className="inline-flex items-center rounded-full border border-green-200 bg-green-50 px-3 py-1 text-sm dark:border-green-800 dark:bg-green-900">
    <Icon className="mr-1 h-3.5 w-3.5 text-green-600 dark:text-green-400" />
    <span className="text-green-600 dark:text-green-400">{text}</span>
  </div>
);

const ActionButtons = ({ href }: { href: string }) => (
  <div className="flex flex-col gap-2 min-[400px]:flex-row pt-4 justify-center">
    <Link href="/booking">
      <Button variant="outline">Get a Quote</Button>
    </Link>
  </div>
);

const services = [
  {
    value: "solar",
    title: "Solar Panel Solutions",
    icon: Zap,
    badge: "Clean Energy",
    imageAlt: "Solar Panel Installation",
    learnMoreHref: "/services/solar-panels",
    features: [
      "Premium monocrystalline panels with 25+ year warranty",
      "Custom system design based on your energy needs and roof configuration",
      "Battery storage options for energy independence",
      "Professional installation by certified technicians",
      "Smart monitoring system to track energy production",
    ],
  },
  {
    value: "ev",
    title: "EV Charging Solutions",
    icon: Battery,
    badge: "Clean Transportation",
    imageAlt: "EV Charging Station",
    learnMoreHref: "/services/ev-charging",
    features: [
      "Level 1, Level 2, and DC Fast Charging options",
      "Smart charging stations with scheduling and monitoring capabilities",
      "Integration with solar panel systems for truly green charging",
      "Commercial solutions with payment processing capabilities",
      "Professional installation and maintenance services",
    ],
  },
  {
    value: "smart",
    title: "Smart Energy Management",
    icon: Lightbulb,
    badge: "Energy Efficiency",
    imageAlt: "Smart Energy Management System",
    learnMoreHref: "/services/smart-meters",
    features: [
      "Real-time energy monitoring and analytics",
      "Identify energy waste and optimize consumption",
      "Smart home integration with voice assistants and mobile apps",
      "Automated energy-saving routines and schedules",
      "Compatible with solar and EV charging systems",
    ],
  },
];

export default function SimplifiedServicesPage() {
  return (
    <div className="flex flex-col min-h-screen items-center w-full">
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl text-center space-y-4">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Our Renewable Energy Solutions
          </h1>
          <p className="mx-auto max-w-3xl text-gray-500 md:text-xl dark:text-gray-400">
            Discover how Rolsa helps you transition to clean, sustainable
            energy.
          </p>
          <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center">
            <Link href="/booking">
              <Button variant="outline">Book a Consultation</Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <Tabs defaultValue="solar" className="space-y-8 w-full">
            <div className="flex justify-center">
              <TabsList className="grid w-full max-w-md grid-cols-3">
                {services.map((s) => (
                  <TabsTrigger key={s.value} value={s.value}>
                    {s.title.split(" ")[0]}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            {services.map((s) => (
              <TabsContent key={s.value} value={s.value} className="space-y-12">
                <div className="grid gap-6 lg:grid-cols-2 items-center text-center lg:text-left">
                  <div className="space-y-4 flex flex-col items-center lg:items-start">
                    <FeatureBadge icon={s.icon} text={s.badge} />
                    <h2 className="text-3xl font-bold">{s.title}</h2>
                    <p className="text-gray-500 dark:text-gray-400">
                      High-efficiency systems for residential, commercial, or
                      industrial needs.
                    </p>
                    <ul className="space-y-2 text-left">
                      {s.features.map((f, i) => (
                        <FeatureItem key={i}>{f}</FeatureItem>
                      ))}
                    </ul>
                    <ActionButtons href={s.learnMoreHref} />
                  </div>
                  <div className="flex justify-center">
                    <Image
                      src="window.svg"
                      alt={s.imageAlt}
                      width={600}
                      height={400}
                      className="rounded-lg object-cover"
                    />
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>
    </div>
  );
}
