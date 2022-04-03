import { NextPage } from "next";
import { useRouter } from "next/router";

const CoinPage: NextPage = () => {
  const router = useRouter();
  const { coin } = router.query;
  return <div>{coin}</div>;
};

export default CoinPage;
