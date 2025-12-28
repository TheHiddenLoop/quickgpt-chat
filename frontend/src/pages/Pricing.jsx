import { X } from "lucide-react";
import PricingCard from "../components/PricingCard";
import { useNavigate } from "react-router";

function Pricing() {
    const navigate = useNavigate();
  const plans = [
    {
      name: "Monthly",
      description: "Flexible billing, cancel anytime",
      price: 29,
      billingCycle: "month",
      features: [
        "Unlimited access to all features",
        "24/7 priority support",
        "Advanced analytics dashboard",
        "Team collaboration tools",
        "99.9% uptime guarantee",
      ],
      isPremium: false,
    },
    {
      name: "Yearly",
      description: "Best value for long-term growth",
      price: 290,
      billingCycle: "year",
      features: [
        "Everything in Monthly plan",
        "Save 17% with annual billing",
        "Dedicated account manager",
        "Custom integrations",
        "Priority feature requests",
        "Quarterly strategy sessions",
      ],
      isPremium: true,
    },
  ];

  return (
    <section className="relative min-h-screen bg-bgSecondary">
      <div className="relative max-w-6xl mx-auto px-6 py-6">
        <div className="text-center mb-10">
          <h2 className=" text-2xl sm:text-4xl font-bold text-textPrimary mb-2">
            Choose Your Plan
          </h2>
          <p className="text-sm sm:text-lg text-textSecondary">
            Transparent pricing designed to scale with your needs
          </p>

          <button
            onClick={()=>navigate(-1)}
            className="absolute top-5 sm:top-8 right-8 p-2 rounded-full text-textSecondary hover:text-textPrimary hover:bg-bgPrimary transition-transform duration-300 hover:rotate-90"
            aria-label="Close pricing"
          >
            <X size={24} />
          </button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <PricingCard key={index} {...plan} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Pricing;