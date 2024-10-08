import css from "../styles/Header.module.css";
import Image from "next/image";
import Logo from "../assets/Logo.png";
import { UilShoppingBag, UilReceipt } from "@iconscout/react-unicons";
import { useStore } from "../store/store";
import Link from "next/link";
import { useEffect, useState } from "react";
import { UilBars } from "@iconscout/react-unicons";

export default function Header() {
  const state = useStore((state) => state);
  const [Order, setOrder] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setOrder(localStorage.getItem("order"));
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const items = useStore((state) => state.cart.pizzas.length);

  return (
    <div className={css.header}>
      {/* logo side */}
      <div className={css.logo}>
        <Image src={Logo} alt="" width={50} height={50} />
        <span>Dine Dash </span>
      </div>

      {/*hamburger */}
      <div className={css.hamburger} onClick={toggleMenu}>
        <UilBars size={35} color={"#2E2E2E"} />
      </div>

      {/* menu side */}
      <ul className={`${css.menu} ${menuOpen ? css.menuOpen : ""}`}>
        <li>
          <Link href="../">Home</Link>
        </li>
        <li>
          <Link href="#Menu">Menu</Link>
        </li>
        <li>
        <a href={`https://wa.me/${+254718879941}`}>Contact</a>
        </li>
      </ul>

      {/* right side */}
      <div className={css.rightside}>
        <Link href="/cart">
          <div className={css.cart}>
            <UilShoppingBag size={35} color="#2E2E2E" />
            <div className={css.badge}>{items}</div>
          </div>
        </Link>

        {Order && (
          <Link href={`/order/${Order}`}>
            <div className={css.cart}>
              <UilReceipt size={35} color="#2E2E2E" />
              {Order != "" && <div className={css.badge}>1</div>}
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}
