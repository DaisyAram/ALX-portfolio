import Image from "next/image";
import css from "../styles/Hero.module.css";
import Cherry from "../assets/Cherry.png";
import HeroImage from "../assets/HeroImage.png";
import { UilPhone } from "@iconscout/react-unicons";
import Pizza1 from "../assets/p1.jpg";
import Link from "next/link";

export default function Hero() {
  return (
    <div className={css.container}>
      {/* left side */}
      <div className={css.left}>
        <div className={css.cherryDiv}>
          <span>More than Faster</span>
          <Image src={Cherry} width={40} height={25} alt="" />
        </div>

        <div className={css.heroText}>
          <span>Fastest</span>
          <span>In Delivering</span>
          <span>
            Your <span style={{ color: "var(--themeOrange)" }}>Pizza</span>
          </span>
        </div>

        <span className={css.miniText}>
          Our Mission is to filling your tummy with delicious food and with fast
          and free delivery
        </span>

        <button className={`btn ${css.btn}`}>
          <Link href="#Menu">Get Started</Link>
        </button>
      </div>
      {/* right side */}
      <div className={css.right}>
        <div className={css.imageContainer}>
          <Image src={HeroImage} alt="" layout="intrinsic" />
        </div>

        <div className={css.contactUs}>
          <a href={`https://wa.me/${+254718879941}`}>
          <span>Contact Us</span>
          </a>
          <div>
            <UilPhone color="white" />
          </div>
        </div>

        <div className={css.Pizza}>
          <div>
            <Image src={Pizza1} alt="" objectFit="cover" layout="intrinsic" />
          </div>

          <div className={css.details}>
            <span>Italian Pizza</span>
            <span>
              <span style={{ color: "var(--theme)" }}>$</span> 7.49
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
