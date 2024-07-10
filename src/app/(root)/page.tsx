import HeaderBox from "@/components/HeaderBox";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import RecentTransactions from "@/components/RecentTransactions";
import RightSideBar from "@/components/SideBars/RightSideBar";
import { ModeToggle } from "@/components/ToggleDarkModeButton";
import TotalBalanceBox from "@/components/TotalBalanceBox";
import { HeaderType } from "@/enums/headerBox";
import { getAccount, getAccounts } from "@/lib/actions/bankActions";
import { getLoggedInUser } from "@/lib/actions/userActions";
import { Suspense } from "react";

const Home = async ({ searchParams: { id, page } }: SearchParamProps) => {
  const currentPage = Number(page as string) || 1;

  const loggedIn = await getLoggedInUser();

  if (!loggedIn) return;

  const accounts = await getAccounts({ userId: loggedIn?.$id! });

  if (!accounts) return;

  const accountsData = accounts?.data;

  const appwriteItemId = (id as string) || accountsData[0]?.appwriteItemId;

  const account = await getAccount({ appwriteItemId });

  if (!account) return;

  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <div className="flex justify-between">
            <HeaderBox
              type={HeaderType.GREETING}
              title="Welcome"
              user={loggedIn?.firstName || "Guest"}
              subtext="Access and manage your account and transactions efficiently."
            />

            <ModeToggle />
          </div>

          <Suspense fallback={<LoadingSkeleton />}>
            <TotalBalanceBox
              accounts={accountsData}
              totalBanks={accounts?.totalBanks || 0}
              totalCurrentBalance={accounts?.totalCurrentBalance || 0}
            />
          </Suspense>
        </header>
        <Suspense fallback={<LoadingSkeleton />}>
          <RecentTransactions
            accounts={accountsData}
            transactions={account?.transactions || []}
            appwriteItemId={appwriteItemId}
            page={currentPage}
          />
        </Suspense>
      </div>
      <Suspense fallback={<LoadingSkeleton />}>
        <RightSideBar
          user={loggedIn!}
          transactions={account?.transactions || []}
          banks={accountsData?.slice(0, 2)}
        />
      </Suspense>
    </section>
  );
};

export default Home;
