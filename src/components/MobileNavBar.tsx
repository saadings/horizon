"use client";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { sidebarLinks } from "@/constants";
import { FooterType } from "@/enums/footer";
import { PlaidLinkVariant } from "@/enums/plaidLink";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Footer from "./Footer";
import PlaidLink from "./PlaidLink";

const MobileNavBar = ({ user }: MobileNavBarProps) => {
  const pathname = usePathname();

  return (
    <section className="w-full max-w-[264px]">
      <Sheet>
        <SheetTrigger>
          <Image
            src={"/icons/hamburger.svg"}
            width={30}
            height={30}
            alt="menu"
            className="cursor-pointer dark:brightness-[3] dark:invert-0"
          />
        </SheetTrigger>
        <SheetContent side={"left"} className="border-none bg-gray-950">
          <SheetHeader>
            {/* <SheetDescription>Welcome back, {user.firstName}!</SheetDescription> */}
            <Link
              href={"/"}
              className="flex cursor-pointer items-center gap-1 px-4"
            >
              <SheetTitle>
                <Image
                  src={"/icons/logo.svg"}
                  alt="horizon logo"
                  width={34}
                  height={34}
                />
              </SheetTitle>

              <SheetDescription asChild>
                <h1 className="text-26 font-ibm-plex-serif font-bold">
                  Horizon
                </h1>
              </SheetDescription>
            </Link>
          </SheetHeader>

          <div className="mobile-nav-sheet">
            <SheetClose asChild>
              <nav className="flex h-full flex-col gap-6 pt-16">
                {sidebarLinks.map(({ route, label, imgURL }) => {
                  const isActive =
                    pathname === route || pathname.startsWith(`${route}/`);

                  return (
                    <SheetClose key={label} asChild>
                      <Link
                        href={route}
                        className={cn("mobile-nav-sheet-close w-full", {
                          "bg-bank-gradient": isActive,
                        })}
                      >
                        <Image
                          src={imgURL}
                          alt={label}
                          width={20}
                          height={20}
                          className={cn({
                            "brightness-[3] invert-0": isActive,
                          })}
                        />
                        <p
                          className={cn(
                            "text-16 font-semibold dark:text-gray-500",
                            {
                              "!text-white": isActive,
                            },
                          )}
                        >
                          {label}
                        </p>
                      </Link>
                    </SheetClose>
                  );
                })}

                <PlaidLink user={user} variant={PlaidLinkVariant.GHOST} />
              </nav>
            </SheetClose>
            <Footer user={user} type={FooterType.MOBILE} />
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default MobileNavBar;
