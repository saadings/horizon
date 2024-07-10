import BankCard from "@/components/BankCard";
import HeaderBox from "@/components/HeaderBox";
import { getAccounts } from "@/lib/actions/bankActions";
import { getLoggedInUser } from "@/lib/actions/userActions";

const MyBanks = async () => {
  const loggedIn = await getLoggedInUser();

  if (!loggedIn) return;

  const accounts = await getAccounts({ userId: loggedIn?.$id! });

  if (!accounts) return;

  return (
    <section className="flex">
      <div className="my-banks">
        <HeaderBox
          title="My Bank Accounts"
          subtext="Effortlessly manage your banking activities."
        />

        <div className="space-y-4">
          <h2 className="header-2">Your Cards</h2>

          <div className="flex flex-wrap gap-6">
            {accounts &&
              accounts.data.map((account: Account) => (
                <BankCard
                  key={account.id}
                  account={account}
                  userName={loggedIn?.firstName || "Guest"}
                  showBalance={true}
                />
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyBanks;
