import Layout from "@/components/Layout/Layout";
import SignInForm from "@/components/SignInForm/SignInForm";
import useIsLoggedIn from "@/hooks/useIsLoggedIn";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const SignUp: NextPage = () => {
  const router = useRouter();
  const { loggedIn, ready } = useIsLoggedIn();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (router.isReady && ready) {
      if (loggedIn) {
        router.push("/portfolio");
      } else {
        setLoading(false);
      }
    }
  }, [router, loggedIn, ready]);

  return <Layout>{!loading && <SignInForm type="signup" />}</Layout>;
};

export default SignUp;
