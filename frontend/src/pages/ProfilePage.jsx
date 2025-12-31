import { useState } from "react";
import { Camera, User2, Mail, Edit3, X, CheckCircle, XCircle, Crown, Zap, TrendingUp, Gift } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { selectAuthStatus, selectAuthUser } from "../fetures/authentication/authSelector";
import InputField from "../components/Ui/Input";
import { InfoDisplay } from "../components/InfoDisplay";
import { useNavigate } from "react-router";
import { updateProfileAuth } from "../fetures/authentication/authSlice";


export default function ProfilePage() {
  const [selectedImg, setSelectedImg] = useState("");
  const [isEditingBasic, setIsEditingBasic] = useState(false);
  const loading = useSelector(selectAuthStatus);

  const userData = useSelector(selectAuthUser);
  const dispatch = useDispatch();

  const user = {
    user: {
      name: userData?.user?.name || "User",
      email: userData?.user?.email || "",
      profileImage: userData?.user?.profileImage || "",
      subscription: userData?.user?.subscriptionType || "free",
      points: userData?.user?.credits || 0,
      subscriptionExpiry: userData?.user?.endDate || new Date().toISOString()
    }
  };

  const [formData, setFormData] = useState({
    name: user?.user?.name || "",
    email: user?.user?.email || "",
  });

  const navigate = useNavigate();

  const [tempData, setTempData] = useState({ ...formData });

const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => setSelectedImg(reader.result);
    reader.readAsDataURL(file);

    const formData = new FormData();
    formData.append("image", file);
    dispatch(updateProfileAuth(formData));
  };

  const handleChange = (e) => {
    setTempData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSaveBasic = () => {
    setFormData((prev) => ({
      ...prev,
      name: tempData.name,
      email: tempData.email,
    }));
    dispatch(updateProfileAuth({name: tempData.name}));
    setIsEditingBasic(false);
  };

  const handleCancelBasic = () => {
    setTempData((prev) => ({
      ...prev,
      name: formData.name,
      email: formData.email,
    }));
    setIsEditingBasic(false);
  };

  const handleBack = () => {
    window.history.back();
  };

  const handleUpgrade = () => {
    navigate("/pricing")
  };

  const isPremium = user?.user?.subscription === "premium" || user?.user?.subscription === "yearly" || user?.user?.subscription === "monthly";
  const imgSrc = selectedImg || user?.user?.profileImage;

  return (
    <section className="relative min-h-screen bg-bgSecondary font-robot">
      <div className="relative max-w-7xl mx-auto py-4 sm:py-6">

        <div className="flex items-center justify-between px-3 sm:px-6 mb-6 sm:mb-10">
          <div>
            <h2 className="text-2xl sm:text-4xl font-bold text-textPrimary">
              My Profile
            </h2>
            <p className="text-sm sm:text-lg text-textSecondary mt-1">
              Manage your personal information and account settings
            </p>
          </div>

          <button
            onClick={handleBack}
            className="p-2 rounded-full text-textSecondary hover:text-textPrimary hover:bg-bgPrimary transition-all duration-300 shadow-sm"
            aria-label="Go back"
          >
            <X size={22} />
          </button>
        </div>

        <div className="bg-bgPrimary sm:rounded-2xl shadow-xl overflow-hidden px-3 sm:px-6">
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-4 sm:gap-8 py-4 sm:p-8">

            <div className="xl:col-span-1">
              <div className="sticky top-6 space-y-4 sm:space-y-6">

                <div className="bg-gradient-to-br from-primaryBg to-accentBg p-4 sm:p-6 rounded-2xl">
                  <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-textPrimary text-center">
                    Profile Picture
                  </h3>

                  <div className="flex justify-center mb-4 sm:mb-6">
                    <div className="relative group">
                      <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl border-4 border-primary overflow-hidden bg-primaryBg shadow-lg">
                        <img
                          src={imgSrc}
                          alt="Profile"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />

                        {loading === "loading" && (
                          <div className="absolute inset-0 flex items-center justify-center backdrop-blur-sm bg-bgPrimary/80">
                            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                          </div>
                        )}
                      </div>

                      <label
                        htmlFor="avatar-upload"
                        className={`absolute -bottom-2 -right-2 bg-gradient-to-r from-primary to-accent p-2 sm:p-3 rounded-xl cursor-pointer transition-all duration-300 hover:scale-110 hover:rotate-12 shadow-lg ${loading === "loading" ? "pointer-events-none opacity-50" : ""
                          }`}
                      >
                        <Camera className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                        <input
                          type="file"
                          id="avatar-upload"
                          className="hidden"
                          accept="image/*"
                          onChange={handleImageUpload}
                          disabled={loading === "loading"}
                        />
                      </label>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-textSecondary text-center">
                    Click the camera icon to update
                  </p>
                </div>

                <div className="bg-gradient-to-br from-warningBg to-warning/20 p-4 sm:p-6 rounded-2xl border-2 border-warning/30">
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <h3 className="text-base sm:text-lg font-bold text-textPrimary">
                      Credit Points
                    </h3>
                    <div className="p-2 bg-warningBg rounded-lg">
                      <Zap className="w-5 h-5 text-warning" />
                    </div>
                  </div>

                  <div className="text-center">
                    <p className="text-3xl sm:text-4xl font-bold text-warning mb-1 sm:mb-2">
                      {user?.user?.points || 0}
                    </p>
                    <p className="text-xs sm:text-sm text-textSecondary">
                      Available Points
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="xl:col-span-3 space-y-4 sm:space-y-6">

              <div className="bg-gradient-to-br from-bgSecondary to-bgSecondary/50 p-4 sm:p-8 rounded-2xl shadow-lg">
                <div className="flex justify-between items-start mb-4 sm:mb-6">
                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <div className="p-3 rounded-xl bg-primaryBg">
                      <Crown className="w-6 h-6 text-primary" />
                    </div>

                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2 text-textPrimary">
                        {isPremium ? "Premium Member" : "Free Plan"}
                      </h3>

                      <p className="text-xs sm:text-sm text-textSecondary">
                        {isPremium
                          ? `Active until ${new Date(
                            user?.user?.subscriptionExpiry
                          ).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}`
                          : "Upgrade to unlock premium features"}
                      </p>
                    </div>
                  </div>

                  {!isPremium && (
                    <button
                      onClick={handleUpgrade}
                      className="flex items-center space-x-2 px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-primary to-accent text-white rounded-xl font-semibold hover:shadow-xl transition-all duration-300 hover:scale-105"
                    >
                      <TrendingUp className="w-4 h-4" />
                      <span>Upgrade</span>
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                  {[
                    ["Monthly Credits", user?.user?.points || 0],
                    [
                      "Support",
                      isPremium
                        ? user.user.subscription === "monthly"
                          ? "Standard"
                          : "Priority"
                        : "Basic",
                    ],
                    ["Features", isPremium ? "All" : "Limited"],
                  ].map(([label, value], idx) => (
                    <div key={idx} className="p-3 sm:p-4 rounded-xl bg-bgPrimary">
                      <p className="text-xs sm:text-sm mb-1 text-textSecondary">
                        {label}
                      </p>
                      <p className="text-xl sm:text-2xl font-bold text-textPrimary">
                        {value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-primaryBg to-accentBg p-4 sm:p-8 rounded-2xl">
                <div className="flex justify-between items-center mb-8">
                  <div className="flex flex-col space-y-1">
                    <h3 className="text-xl sm:text-2xl font-bold text-textPrimary">
                      Basic Information
                    </h3>
                    <p className="text-textSecondary text-sm">
                      Your personal details
                    </p>
                  </div>

                  <div className="flex space-x-3">
                    {!isEditingBasic ? (
                      <button
                        onClick={() => setIsEditingBasic(true)}
                        className="flex items-center justify-center w-10 h-10 bg-primary hover:bg-secondary rounded-lg transition-all duration-300 text-white shadow-md hover:shadow-lg hover:scale-105"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                    ) : (
                      <div className="flex space-x-3">
                        <button
                          onClick={handleSaveBasic}
                          className="flex items-center justify-center w-10 h-10 bg-success hover:bg-success/90 rounded-lg transition-all duration-300 text-white shadow-md hover:shadow-lg hover:scale-105"
                        >
                          <CheckCircle className="w-5 h-5" />
                        </button>
                        <button
                          onClick={handleCancelBasic}
                          className="flex items-center justify-center w-10 h-10 bg-error hover:bg-error/90 rounded-lg transition-all duration-300 text-white shadow-md hover:shadow-lg hover:scale-105"
                        >
                          <XCircle className="w-5 h-5" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {!isEditingBasic ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InfoDisplay icon={User2} label="Full Name" value={formData.name} />
                    <InfoDisplay icon={Mail} label="Email Address" value={formData.email} />
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <InputField
                        name="name"
                        value={tempData.name}
                        onChange={handleChange}
                        icon={User2}
                        placeholder="Full Name"
                      />
                      <InputField
                        type="email"
                        name="email"
                        value={tempData.email}
                        onChange={handleChange}
                        icon={Mail}
                        placeholder="Email Address"
                        disabled={true}
                      />
                    </div>
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>

  );
}