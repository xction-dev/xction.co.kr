import typography from "../../styles/typography.module.css";
import styles from "./Header.module.css";
import "@/styles/globals.primitives.css";
import "@/styles/globals.tokens.css";
import { useRouter } from "next/router";
import Link from "next/link";
import SearchIcon from "../Icon/SearchIcon";
import BasicButton from "../Button/BasicButton";

export default function Header() {
  return (
    <header className={styles.container}>
      {/* Xction 로고, nav bar를 담습니다 */}
      <div className={styles.leftContainer}>
        <div className={styles.imgContainer}>
          <Link href="">
            <img src="/xction_logo.png" alt="Xction 로고" />
          </Link>
        </div>
        <nav className={styles.navContainer}>
          <Link href="" className={typography.h5}>
            홈
          </Link>
          <Link href="" className={typography.h5}>
            작품
          </Link>
          <Link href="" className={typography.h5}>
            아티클
          </Link>
          <Link href="" className={typography.h5}>
            커뮤니티
          </Link>
          <Link href="" className={typography.h5}>
            소개
          </Link>
        </nav>
      </div>
      {/* 검색, 로그인 버튼을 담습니다 */}
      <div className={styles.rightContainer}>
        <div className={styles.icon}>
          <SearchIcon />
        </div>
        <BasicButton color="white" content="로그인" />
      </div>
    </header>
  );
}
