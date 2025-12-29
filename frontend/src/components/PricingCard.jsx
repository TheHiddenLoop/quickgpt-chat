import { Check, CheckCircle2, Sparkles,  } from "lucide-react";

function PricingCard({ name, description, price, features, isPremium, billingCycle, isActive, onClick }) {
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
      
      {isActive && (
        <div className="absolute -top-3 right-6 bg-green-500 text-white px-3 py-0.5 rounded-full text-xs font-bold flex items-center gap-1">
          <CheckCircle2 size={12} />
          Current Plan
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
            ₹{price}
          </span>
          <span className="text-base text-textSecondary">
            /{billingCycle}
          </span>
        </div>
        {billingCycle === "year" && (
          <p className="mt-1 text-sm text-textSecondary">
            That's just ₹{price/12}/month
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
        onClick={onClick}
        className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-300 shadow-md text-sm ${
          isActive 
            ? 'bg-gray-400 text-gray-700 cursor-not-allowed' 
            : 'bg-accent text-white hover:bg-primary'
        }`}
        disabled={isActive}
      >
        {isActive ? 'Current Plan' : 'Get Started'}
      </button>
    </div>
  );
}



export default PricingCard;
