import SignInButton from "@/app/_components/SignInButton";
import { signInAction } from "../_lib/actions";

export const metadata = {
  title: "Login",
};

export default function Page() {
  return (
    <form action={signInAction}>
      <div className="flex flex-col items-center gap-10 mt-10">
        <h2 className="text-3xl font-semibold">
          Sign in to access your guest area
        </h2>

        <SignInButton />
      </div>
    </form>
  );
}
