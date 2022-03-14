import styles from "./SignInForm.module.scss";
import { FormEvent, useMemo } from "react";
import { Button, TextInput } from "@mantine/core";
import { useNotifications } from "@mantine/notifications";
import Link from "next/link";
import { useRouter } from "next/router";

const SignInForm: React.FC<{ type: "signin" | "signup" }> = ({ type }) => {
  const router = useRouter();
  const notifications = useNotifications();
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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const formElement = e.target as HTMLFormElement;
    const formData = new FormData(formElement);
    const { username, password } = Object.fromEntries(formData);

    // TODO: Error handling
    notifications.showNotification({
      color: "red",
      message: "Unable to connect",
    });

    // TODO: Connect to backend
    router.push("/dashboard");
    console.log(username, password);
    formElement.reset();
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2>{content.title}</h2>
        <TextInput name="username" label="Username" required size="lg" />
        <TextInput name="password" label="Password" required size="lg" />
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
