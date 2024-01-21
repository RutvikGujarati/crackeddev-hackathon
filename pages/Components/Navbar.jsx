"use client"
import Link from "next/link";
import Image from 'next/image'
import styles from "../../styles/Navbar.module.css";
// import ethers from "ethers"
import { useEffect } from "react";


const Navbar = (isWalletConnected, showOtherComponents, userAddress ) => {

  return (
    <nav className={styles.navbar}>
      <ul className={styles.navList}>
        {/* <li>
          <Link href="/" className={styles.navLink}>
            ⬅️Home
          </Link>
        </li> */}
        <li>
          <Link href="/home/jobs" className={styles.navLink}>
            ⚒️jobs
          </Link>
        </li>
        <li>
          <Link href="/home/projects" className={styles.navLink}>
            🔍Find A Repository
          </Link>
        </li>
        {/* <li>
          <Link href="/home/discuss" className={styles.navLink}>
            🗣️discuss
          </Link>
        </li> */}
        
      </ul>
    </nav>
  );
};

export default Navbar;
