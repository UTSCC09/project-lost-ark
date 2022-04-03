import Portfolio from "@/components/Portfolio/Portfolio";
import useIsLoggedIn from "@/hooks/useIsLoggedIn";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const PortfolioPage: NextPage = () => {
  const router = useRouter();
  const { loggedIn, ready } = useIsLoggedIn();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (router.isReady && ready) {
      if (!loggedIn) {
        router.push("/signin");
      } else {
        setLoading(false);
      }
    }
  }, [router, loggedIn, ready]);

  if (loading) return null;
  return <Portfolio />;
};

export default PortfolioPage;
