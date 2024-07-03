import { FooterType } from "@/enums/footer";
import { signOut } from "@/lib/actions/userActions";
import { cn } from "@/lib/utils";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

const Footer = ({ user, type = FooterType.DESKTOP }: FooterProps) => {
  const router = useRouter();

  const handleLogout = async () => {
    console.log("Logging out");

    const loggedOut = await signOut();

    if (loggedOut) {
      router.push("/sign-in");
    }
  };

  return (
    <footer className="footer space-x-2">
      <div
        className={cn(
          type === FooterType.MOBILE ? "footer_name_mobile" : "footer_name",
        )}
      >
        <p className="text-xl font-bold text-blue-500">{user?.name[0]}</p>
      </div>

      <div
        className={cn(
          type === FooterType.MOBILE ? "footer_email_mobile" : "footer_email",
        )}
      >
        <h1 className="text-14 truncate font-semibold text-blue-500">
          {user?.name}
        </h1>
        <p className="text-14 truncate font-normal text-gray-300">
          {user.email}
        </p>
      </div>

      <div className="footer_image" onClick={handleLogout}>
        <LogOut size={20} />
      </div>
    </footer>
  );
};

export default Footer;
