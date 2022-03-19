import SignInForm from "@/components/SignInForm/SignInForm";
import { isLoggedIn } from "@/utils/utils";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const SignUp: NextPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (router.isReady) {
      if (isLoggedIn()) {
        router.push("/dashboard");
      } else {
        setLoading(false);
      }
    }
  }, [router]);

  if (loading) return null;
  return <SignInForm type="signup" />;
};

export default SignUp;
