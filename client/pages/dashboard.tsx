import Dashboard from "@/components/Dashboard/Dashboard";
import { isLoggedIn } from "@/utils/utils";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const DashboardPage: NextPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (router.isReady) {
      if (!isLoggedIn()) {
        router.push("/signin");
      } else {
        setLoading(false);
      }
    }
  }, [router]);

  if (loading) return null;
  return <Dashboard />;
};

export default DashboardPage;
