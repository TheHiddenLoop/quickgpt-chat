import { Check, Sparkles,  } from "lucide-react";

function PricingCard({ name, description, price, features, isPremium, billingCycle }) {
  return (
    <div
      className="relative p-10 rounded-xl transition-all duration-300 flex flex-col h-full bg-bgPrimary text-textPrimary shadow-lg hover:shadow-xl border border-border"
    >
      {isPremium && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-warning text-textPrimary px-3 py-0.5 rounded-full text-xs font-bold flex items-center gap-1">
          <Sparkles size={12} />
          Best Value
        </div>
      )}
      
      <div className="mb-6">
        <h3 className="text-xl font-bold mb-2 text-textPrimary">
          {name}
        </h3>
        <p className="text-sm text-textSecondary">
          {description}
        </p>
      </div>

      <div className="mb-8">
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-extrabold text-textPrimary">
            ${price}
          </span>
          <span className="text-base text-textSecondary">
            /{billingCycle}
          </span>
        </div>
        {billingCycle === "year" && (
          <p className="mt-1 text-sm text-textSecondary">
            That's just $24.17/month
          </p>
        )}
      </div>

      <ul className="space-y-4 mb-8 flex-grow">
        {features.map((feature, idx) => (
          <li key={idx} className="flex items-start gap-2">
            <div className="p-0.5 rounded-full bg-primaryBg mt-1 flex-shrink-0">
              <Check size={14} className="text-primary" />
            </div>
            <span className="text-sm text-textSecondary leading-relaxed">
              {feature}
            </span>
          </li>
        ))}
      </ul>

      <button
        className="w-full py-3 px-4 rounded-lg font-semibold transition-all duration-300 bg-accent text-white hover:bg-primary shadow-md text-sm"
      >
        Get Started
      </button>
    </div>
  );
}

export default PricingCard;
