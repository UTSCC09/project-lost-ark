import Layout from "@/components/Layout/Layout";
import SignInForm from "@/components/SignInForm/SignInForm";
import useIsLoggedIn from "@/hooks/useIsLoggedIn";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const SignIn: NextPage = () => {
  const router = useRouter();
  const { loggedIn, ready } = useIsLoggedIn();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (router.isReady && ready) {
      if (loggedIn) {
        router.push("/dashboard");
      } else {
        setLoading(false);
      }
    }
  }, [router, loggedIn, ready]);

  if (loading) return null;
  return (
    <Layout>
      <SignInForm type="signin" />
    </Layout>
  );
};

export default SignIn;
