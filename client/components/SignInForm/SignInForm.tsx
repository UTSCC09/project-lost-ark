import { Button, TextInput } from "@mantine/core";
import Link from "next/link";
import { useMemo } from "react";
import styles from "./SignInForm.module.scss";

const SignInForm: React.FC<{ type: "signin" | "signup" }> = ({ type }) => {
  const content = useMemo(() => {
    if (type === "signin") {
      return {
        title: "Sign In to Coin Ark",
        btnText: "Sign In",
        toggleText:
          "Don't have an account? Click here to create an account instead",
        redirect: "/signup",
      };
    } else {
      return {
        title: "Create an Account",
        btnText: "Sign Up",
        toggleText: "Already have an account? Click here to sign in instead",
        redirect: "/signin",
      };
    }
  }, [type]);
  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <h2>{content.title}</h2>
        <TextInput label="Username" required size="lg" />
        <TextInput label="Password" required size="lg" />
        <Button type="submit" fullWidth color="teal" size="lg">
          {content.btnText}
        </Button>
        <Link href={content.redirect}>
          <a className={styles.toggleForm}>{content.toggleText}</a>
        </Link>
      </form>
    </div>
  );
};

export default SignInForm;
