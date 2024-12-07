import { SignInWrapper } from "./components/sign-in-wrapper";
import { Logo } from "@/components/ui/logo";

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center">
      {/* Main content wrapper */}
      <div className="flex flex-col items-center w-full max-w-[1200px] -mt-[53px]">
        {/* Logo */}
        <div className="mb-[-55px]">  {/* Negative margin to pull form up */}
          <Logo className="w-[400px] h-[400px]" />
        </div>
        
        {/* Form */}
        <div>
          <SignInWrapper />
        </div>
      </div>
    </div>
  );
}