import styles from "./SignInForm.module.scss";
import CONFIG from "@/config/config";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { Alert, Button, TextInput } from "@mantine/core";
import { useNotifications } from "@mantine/notifications";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import { useApolloClient, gql } from "@apollo/client";
import { handleError } from "@/utils/utils";

const SignInForm: React.FC<{ type: "signin" | "signup" }> = ({ type }) => {
  const client = useApolloClient();
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

  useEffect(() => {
    if (router.isReady) {
      if (router.query.signout) {
        router.replace({ pathname: router.pathname }, undefined, {
          shallow: true,
        });
        notifications.showNotification({
          message: "Successfully signed out!",
          color: "teal",
        });
      }
    }
  }, [router]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const formElement = e.target as HTMLFormElement;
    const formData = new FormData(formElement);
    const { username, password } = Object.fromEntries(formData);

    axios
      .post(`${CONFIG.BACKEND_URL}/${type}`, { username, password })
      .then((res) => {
        formElement.reset();
        router.push("/dashboard");
      })
      .catch((err) => {
        let errorMsg;
        switch (err?.response?.status) {
          case 401:
            errorMsg = "Invalid username and/or password";
            break;
          case 409:
            errorMsg = "Username already exists";
            break;
        }
        handleError(err, { notifications, errorMsg });
      });
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2>{content.title}</h2>
        <TextInput
          id="username"
          name="username"
          label="Username"
          required
          size="lg"
        />
        <TextInput
          id="password"
          name="password"
          label="Password"
          required
          size="lg"
          type="password"
        />
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
