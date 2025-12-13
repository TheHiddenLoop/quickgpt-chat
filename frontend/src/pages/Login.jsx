import leftImg from "../assets/loginIllus.png"
import RightAuthPanel from "../components/RightAuthPanel"

function Login() {
  return (
    <div className='min-h-screen bg-bgPrimary'>
      <div className='grid grid-cols-2'>
        <form>
          
        </form>

        <div className='bg-bgSecondary h-screen hidden lg:flex items-center justify-center '>
          <RightAuthPanel
            image={leftImg}
            title="Welcome Back 👋"
            subtitle="Login to your account"
            description="Access your dashboard, manage your profile, and continue where you left off."
          />

        </div>
      </div>
    </div>
  )
}

export default Login
