import typography from "../../styles/typography.module.css";
import styles from "./Footer.module.css";
import Input from "../Input";

export default function Footer() {
  return (
    <footer className={styles.container}>
      <div className={styles.leftContainer}>
        <p className={typography.h6}>Xction을 더 알차게 즐기는 법</p>
        <div className={styles.loginContainer}>
          <Input inputType="email" />
          <Input inputType="password" />
        </div>
        <p className={typography.subTitle2}>
          회원가입 시 서비스이용약관에 동의하는 것으로 간주됩니다
        </p>
      </div>
      <div className={styles.rightContainer}>
        <div className={styles.xctionInfoContainer}>
          <div>
            <h6 className={typography.h6}>Xction이 궁금하다면?</h6>
          </div>
          <div>
            <h6 className={typography.h6}>소개</h6>
          </div>
          <div className={styles.instagram}>
            <h6 className={typography.h6}>인스타그램</h6>
            <p className={typography.subTitle1}>@xction</p>
          </div>
          <div className={styles.email}>
            <h6 className={typography.h6}>이메일</h6>
            <p className={typography.subTitle1}>ready.xction@gmail.com</p>
          </div>
        </div>
        <div className={styles.privacyContainer}>
          <h6 className={typography.h6}>개인정보처리방침</h6>
        </div>
        <div className={styles.copyrightContainer}>
          <h6 className={typography.h6}>2024, Xction! All rights reserved</h6>
        </div>
      </div>
    </footer>
  );
}
