import { TailwindIndicator } from "@/components/tailwind-indicator";
import LoginBackground from "@/assets/bg-login.jpg";
import { Toaster } from "@/components/ui/toaster";

interface Props {
  children: React.ReactNode;
}

function AuthLayout({ children }: Props) {
  return (
    <div className="relative w-screen h-screen bg-muted overflow-hidden">
      {children}
      <TailwindIndicator />
      <div
        className="w-screen h-screen mix-blend-multiply"
      >
        <img
          src={LoginBackground}
          alt="Background"
          className="dark:grayscale dark:opacity-20 object-cover w-full h-full"
        />
      </div>
      <Toaster />
    </div>
  );
}

export default AuthLayout;
