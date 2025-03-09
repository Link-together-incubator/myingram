"use client";

import { BellRing } from "lucide-react";

import { Button } from "@/shared/ui";

import s from "./Header.module.scss";

export function Header() {
  const isLoggedIn = true;

  const onLogInHandler = () => {
    // Log in logic goes here
    console.log("Logged in!");
  };

  const onSignUpHandler = () => {
    // Sign up logic goes here
    console.log("Signed up!");
  };

  return (
    <header className={s.header}>
      <div className={s["header-container"]}>
        <div className={s["header-container-title"]}>Inctagram</div>
        {isLoggedIn ? (
          <div className={s["header-container-btns"]}>
            <BellRing className="cursor-pointer" />
            <select name="language" id="1">
              <option value="english">English</option>
              <option value="russian">Russian</option>
            </select>
          </div>
        ) : (
          <div className={s["header-container-btns"]}>
            <select name="language" id="1">
              <option value="english">English</option>
              <option value="russian">Russian</option>
            </select>
            <Button
              size={"default"}
              variant={"secondary"}
              onClick={onLogInHandler}
            >
              Log in
            </Button>
            <Button
              size={"default"}
              variant={"secondary"}
              onClick={onSignUpHandler}
            >
              Sign up
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}
