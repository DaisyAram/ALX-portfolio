// pages/pizza/[slug].js

import Image from "next/image";
import Layout from "../../components/Layout";
import client, { urlFor } from "../../lib/client";
import css from "../../styles/Pizza.module.css";
import LeftArrow from "../../assets/ArrowLeft.png";
import RightArrow from "../../assets/arrowRight.png";
import { useState } from "react";
import { useStore } from "../../store/store";
import toast, { Toaster } from "react-hot-toast";

export default function Pizza({ pizza }) {
  console.log('Pizza Object:', pizza);
  const src = urlFor(pizza.image).url();

  const [Size, setSize] = useState(1);
  const [Quantity, setQuantity] = useState(1);

  //  handle quantity
  const handleQuan = (type) => {
    type === "inc"
      ? setQuantity((prev) => prev + 1)
      : Quantity === 1
      ? null
      : setQuantity((prev) => prev - 1);
  };

  // add to cart function
  const addPizza = useStore((state) => state.addPizza);
  const addToCart = () => {
    addPizza({
      ...pizza,
      price: pizza.price[Size],
      quantity: Quantity,
      size: Size,
    });
    toast.success("Successfully Added To Cart");
  };

  return (
    <Layout>
      <div className={css.container}>
        <div className={css.imageWrapper}>
          <Image
            layout="fill"
            unoptimized
            objectFit="cover"
            alt=""
            loader={() => src}
            src={src}
          />
        </div>

        {/* right side */}
        <div className={css.right}>
          <span>{pizza.name}</span>
          <span>{pizza.details}</span>

          <span>
            <span style={{ color: "var(--themeOrange)" }}>$</span>{" "}
            {pizza.price[Size]}
          </span>

          <div className={css.size}>
            <span>Size</span>
            <div className={css.sizeVariants}>
              <div
                onClick={() => setSize(0)}
                className={Size === 0 ? css.selected : ""}
              >
                Small
              </div>
              <div
                onClick={() => setSize(1)}
                className={Size === 1 ? css.selected : ""}
              >
                Medium
              </div>
              <div
                onClick={() => setSize(2)}
                className={Size === 2 ? css.selected : ""}
              >
                Large
              </div>
            </div>
          </div>

          {/* quantity counter */}

          <div className={css.quantity}>
            <span>Quantity</span>

            <div className={css.counter}>
              <Image
                src={LeftArrow}
                height={20}
                width={20}
                alt=""
                objectFit="contain"
                onClick={() => handleQuan("dec")}
              />
              <span>{Quantity}</span>

              <Image
                src={RightArrow}
                height={20}
                width={20}
                alt=""
                objectFit="contain"
                onClick={() => handleQuan("inc")}
              />
            </div>
          </div>

          {/* button */}
          <div className={`btn ${css.btn}`} onClick={addToCart}>
            Add to cart
          </div>
        </div>
        <Toaster />
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = await client.fetch(
    `*[_type=="pizza" && defined(slug.current)][].slug.current`
  );

  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: "blocking",
  };
}

export async function getStaticProps(context) {
  const { slug = "" } = context.params;
  const pizza = await client.fetch(
    `*[_type=="pizza" && slug.current == '${slug}'][0]`
  );

  return {
    props: {
      pizza,
    },
  };
}
