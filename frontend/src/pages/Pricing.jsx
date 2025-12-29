import { X } from "lucide-react";
import PricingCard from "../components/PricingCard";
import { useNavigate } from "react-router";
import { selectAuthUser } from "../fetures/authentication/authSelector";
import { useSelector } from "react-redux";
import { axiosInstance } from "../libs/axios.js"
import { plans } from "../libs/plans.js";

function Pricing() {

  const user = useSelector(selectAuthUser);

  const navigate = useNavigate();


  console.log(user);

  async function handlePurches(plan) {
    try {
      if (!plan) return;

      const response = await axiosInstance.post("/order/checkout", {
        planKey: plan.key,
      });

      const { url } = response.data;

      if (url) {
        window.location.href = url;
      } else {
        alert("Failed to start checkout.");
      }
    } catch (err) {
      console.error("Checkout error:", err);
      alert("Something went wrong.");
    }
  }


  const userSubscription = user?.user?.subscriptionType;

  return (
    <section className="relative min-h-screen bg-bgSecondary">
      <div className="relative max-w-7xl mx-auto px-6 py-2">
        <div className="text-center mb-10">
          <h2 className=" text-2xl sm:text-4xl font-bold text-textPrimary mb-2">
            Choose Your Plan
          </h2>
          <p className="text-sm sm:text-lg text-textSecondary">
            Transparent pricing designed to scale with your needs
          </p>

          <button
            onClick={() => navigate(-1)}
            className="absolute top-1 sm:top-7 right-8 p-2 rounded-full text-textSecondary hover:text-textPrimary hover:bg-bgPrimary transition-transform duration-300 hover:rotate-90"
            aria-label="Close pricing"
          >
            <X size={24} />
          </button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
          {plans.map((plan) => (
            <PricingCard
              key={plan.key}
              name={plan.name}
              description={plan.description}
              price={plan.price}
              features={plan.features}
              isPremium={plan.isPremium}
              billingCycle={plan.billingCycle}
              isActive={userSubscription === plan.key}
              onClick={() => handlePurches(plan)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}


export default Pricing;