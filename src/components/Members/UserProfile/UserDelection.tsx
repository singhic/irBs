import styles from './UserProfile.module.css';

const UserDelection: React.FC = () => {
  return (
    <section className={styles.DelectionSection}>
      <header className={styles.DelectionHeader}>
        <button onClick={() => window.history.back()}>
          <img
            src="/img/icon/big-arrow-left.svg"
            alt="뒤로가기 아이콘"
            className={styles.headerIcon}
          />
        </button>
        <h1 className={styles.headerTitle}>회원탈퇴</h1>
      </header>
      <main className={styles.DelectionContent}>
        <article className={styles.contentSection}>
          <h3 className={styles.contentTitle}>회원 탈퇴 전 확인하세요</h3>
          <p className={styles.content}>
            회원탈퇴 시 정보는 영구히 삭제가 되며,<br />
            재가입이 불가합니다. 
          </p>
          <p className={styles.content}>
            이용불편은 게시판을 활용해 주세요.
          </p>
      </article>
      </main>
      <div className={styles.DelectionButtonWrapper}>
        <button type="button" className={styles.DelectionButton}>탈퇴하기</button>
      </div>
    </section>
  );
};

export default UserDelection;
