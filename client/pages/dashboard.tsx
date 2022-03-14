import { NextPage } from "next";
import { useState } from "react";

const Dashboard: NextPage = () => {
  // TODO
  const [s, setS] = useState(0);
  console.log("@dashboard");
  return (
    <div>
      <button onClick={() => setS(s + 1)}>{s}</button>
    </div>
  );
};

export default Dashboard;
