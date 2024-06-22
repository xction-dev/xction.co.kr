import Link from "next/link";
import MeTest from "@/modules/home/MeTest/MeTest";

export default function Home() {
  return (
    <main>
      <MeTest />
      <Link href="/login">로그인</Link>
    </main>
  );
}
