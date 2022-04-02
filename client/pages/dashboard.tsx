import Dashboard from "@/components/Dashboard/Dashboard";
import Layout from "@/components/Layout/Layout";
import useIsLoggedIn from "@/hooks/useIsLoggedIn";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const DashboardPage: NextPage = () => {
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
  return (
    <Layout>
      <Dashboard />
    </Layout>
  );
};

export default DashboardPage;
