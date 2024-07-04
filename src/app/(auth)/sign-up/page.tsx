import AuthForm from "@/components/Forms/AuthForm";
import { AuthFormType } from "@/enums/authForm";
import { getLoggedInUser } from "@/lib/actions/userActions";

const SignUp = async () => {
  return (
    <section className="flex-center size-full max-sm:px-6">
      <AuthForm type={AuthFormType.SIGN_UP} />
    </section>
  );
};

export default SignUp;
