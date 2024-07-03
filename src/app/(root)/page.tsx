import HeaderBox from "@/components/HeaderBox";
import RightSideBar from "@/components/SideBars/RightSideBar";
import TotalBalanceBox from "@/components/TotalBalanceBox";
import { HeaderType } from "@/enums/headerBox";
import { getLoggedInUser } from "@/lib/actions/userActions";
import { redirect } from "next/navigation";

const Home = async () => {
  const loggedIn = await getLoggedInUser();

  console.log(loggedIn);

  if (!loggedIn) {
    redirect("/sign-in");
  }

  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox
            type={HeaderType.GREETING}
            title="Welcome"
            user={loggedIn?.name || "Guest"}
            subtext="Access and manage your account and transactions efficiently."
          />

          <TotalBalanceBox
            accounts={[]}
            totalBanks={1}
            totalCurrentBalance={1250.56}
          />
        </header>
        RECENT TRANSACTIONS
      </div>
      <RightSideBar
        user={loggedIn}
        transactions={[]}
        banks={[
          {
            currentBalance: 123.5,
          },
          { currentBalance: 150.99 },
        ]}
      />
    </section>
  );
};

export default Home;
