import Link from "next/link";

export default function Page() {
  return (
    <div>
      <h1>Route example</h1>
      <Link href={"/sign-in"}>SIGN IN</Link>
      <br />
      <Link href={"/sign-up"}>SIGN UP</Link>
    </div>
  );
}
