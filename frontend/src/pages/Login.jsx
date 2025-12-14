import leftImg from "../assets/loginIllus.png"
import RightAuthPanel from "../components/RightAuthPanel"
import { Lock, Mail } from "lucide-react"
import InputField from "../components/Ui/Input"
import { useState } from "react"
import Button from "../components/Ui/Button"

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      return
    }

    console.log(formData);
    setFormData({
      email: "",
      password: ""
    })

  }

  return (
    <div className="min-h-screen bg-bgPrimary">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">

        <div className="flex items-center justify-center px-6">
          <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">

            <div className="flex flex-col items-center gap-2 mb-2">
              <div className="w-14 h-14 rounded-xl bg-bgSecondary flex items-center justify-center">
                <Mail className="w-6 h-6 text-primary" />
              </div>

              <h1 className="text-xl font-semibold text-textPrimary">
                Welcome Back
              </h1>

              <p className="text-sm text-textSecondary text-center">
                Login to continue to your account
              </p>
            </div>

            <div className="my-1">

              <div className="flex flex-col gap-2">
                <label className="text-textPrimary font-medium text-xs">
                  Email Address
                </label>
                <InputField
                  row
                  placeholder="Enter your email"
                  icon={Mail}
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-textPrimary font-medium text-xs">
                  Password
                </label>
                <InputField
                  placeholder="Enter your password"
                  icon={Lock}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  type="password"
                />
              </div>

            </div>

            <Button text="Login" className="w-full bg-primary text-textPrimary hover:bg-secondary" />
          </form>
        </div>


        <div className="bg-bgSecondary hidden lg:flex items-center justify-center">
          <RightAuthPanel
            image={leftImg}
            title="Welcome Back 👋"
            subtitle="Login to your account"
            description="Access your dashboard, manage your profile, and continue where you left off."
          />
        </div>

      </div>
    </div>
  );
}


export default Login
