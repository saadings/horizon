import MobileNavBar from "@/components/MobileNavBar";
import Sidebar from "@/components/SideBars/LeftSidebar";
import { getLoggedInUser } from "@/lib/actions/userActions";
import Image from "next/image";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const loggedIn = await getLoggedInUser();

  if (!loggedIn) return;

  return (
    <main className="flex h-screen w-full font-inter">
      <Sidebar user={loggedIn!} />
      <div className="flex size-full flex-col">
        <div className="root-layout">
          <Image
            src={"/icons/logo.svg"}
            width={30}
            height={30}
            alt="menu icon"
          />
          <div>
            <MobileNavBar user={loggedIn!} />
          </div>
        </div>
        {children}
      </div>
    </main>
  );
}
