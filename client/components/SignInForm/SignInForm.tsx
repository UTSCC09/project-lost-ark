import styles from "./SignInForm.module.scss";
import { FormEvent, useContext, useEffect, useMemo, useState } from "react";
import { Button, Loader, Paper, TextInput } from "@mantine/core";
import { useNotifications } from "@mantine/notifications";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import { handleError } from "@/utils/utils";
import { AccountContext } from "@/context/AccountContext";
import { motion } from "framer-motion";

const SignInForm: React.FC<{ type: "signin" | "signup" }> = ({ type }) => {
  const query = useContext(AccountContext)!;
  const router = useRouter();
  const notifications = useNotifications();
  const [submitting, setSubmitting] = useState(false);
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

    setSubmitting(true);
    axios
      .post(`/api/${type}`, { username, password })
      .then((res) => {
        query
          .refetch()
          .catch(() => {})
          .finally(() => {
            router.push("/dashboard");
          });
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
        setSubmitting(false);
      });
  };

  return (
    <div className={styles.container}>
      <motion.div
        initial={{ opacity: 0, translateY: 20 }}
        animate={{
          opacity: 1,
          translateY: 0,
        }}
        exit={{
          opacity: 0,
          translateY: 20,
        }}
      >
        <Paper shadow="xs" radius="md" className={styles.paper}>
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
            <Button
              type="submit"
              fullWidth
              color="teal"
              size="lg"
              disabled={submitting}
            >
              {content.btnText}
              {submitting && (
                <Loader
                  style={{ position: "absolute", right: "1rem" }}
                  size="xs"
                  color="teal"
                />
              )}
            </Button>
            <Link href={content.redirect}>
              <a className={styles.toggleForm}>{content.toggleText}</a>
            </Link>
          </form>
        </Paper>
      </motion.div>
    </div>
  );
};

export default SignInForm;
