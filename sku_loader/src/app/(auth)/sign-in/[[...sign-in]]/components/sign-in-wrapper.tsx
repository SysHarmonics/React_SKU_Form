"use client";

import { SignIn } from "@clerk/nextjs";

export function SignInWrapper() {
  return (
    <div className="w-fit max-w-[350px] mx-auto">
      <SignIn 
        appearance={{
          elements: {
            formButtonPrimary: 
              "bg-[#f705d8] hover:bg-[#f705d8]/90 text-white",
            footerActionLink: 
              "text-[#f705d8] hover:text-[#f705d8]/90",
            card: "border-2 border-[#f705d8]/10",
            headerTitle: "text-[#f705d8]",
            dividerLine: "bg-[#f705d8]/10",
            formFieldInput: 
              "border-[#f705d8]/20 focus:border-[#f705d8]/50 focus:ring-[#f705d8]/50",
            identityPreviewText: "text-[#f705d8]",
            identityPreviewEditButton: "text-[#f705d8]",
          },
        }}
        redirectUrl="/dashboard"
        signUpUrl="/sign-up"
      />
    </div>
  );
}
