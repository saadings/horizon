import { FooterType } from "@/enums/footer";
import { signOut } from "@/lib/actions/userActions";
import { cn } from "@/lib/utils";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { ModeToggle } from "./ToggleDarkModeButton";

const Footer = ({ user, type = FooterType.DESKTOP }: FooterProps) => {
  const router = useRouter();

  const handleLogout = async () => {
    const loggedOut = await signOut();

    if (loggedOut) {
      router.push("/sign-in");
    }
  };

  return (
    <>
      <div className="flex items-center justify-start space-x-2 max-xl:justify-center max-xl:space-x-0">
        <p className="text-gray-400 max-xl:hidden">Theme Toggle</p>
        <ModeToggle />
      </div>
      <footer className="footer space-x-2 max-xl:justify-center">
        <div
          className={cn(
            type === FooterType.MOBILE ? "footer_name_mobile" : "footer_name",
          )}
        >
          <p className="text-xl font-bold text-blue-500">
            {user?.firstName[0]}
          </p>
        </div>

        <div
          className={cn(
            type === FooterType.MOBILE ? "footer_email_mobile" : "footer_email",
          )}
        >
          <h1 className="text-14 truncate font-semibold text-blue-500">
            {user?.firstName}
          </h1>
          <p className="text-14 truncate font-normal text-gray-300">
            {user.email}
          </p>
        </div>

        <div onClick={handleLogout}>
          <LogOut size={20} className="text-slate-800 dark:text-slate-300" />
        </div>
      </footer>
    </>
  );
};

export default Footer;
