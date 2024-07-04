import AuthForm from "@/components/Forms/AuthForm";
import { AuthFormType } from "@/enums/authForm";

const SignIn = () => {
  return (
    <section className="flex-center size-full max-sm:px-6">
      <AuthForm type={AuthFormType.SIGN_IN} />
    </section>
  );
};

export default SignIn;
