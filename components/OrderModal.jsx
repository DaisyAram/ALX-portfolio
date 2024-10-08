//renders modal form for placing orders in the web application
import { Modal, useMantineTheme } from "@mantine/core";
import css from "../styles/OrderModal.module.css";
import { useRouter } from "next/router";
import { useState } from "react";
import { createOrder } from "../lib/orderHandler";
import toast, { Toaster } from "react-hot-toast";
import { useStore } from "../store/store";

export default function OrderModal({ opened, setOpened, PaymentMethod }) {
  const theme = useMantineTheme();
  const router = useRouter();
  const [FormData, setFormData] = useState({});

  const handleInput = (e) => {
    setFormData({ ...FormData, [e.target.name]: e.target.value });
  };
  const resetCart = useStore((state) => state.resetCart);
  const total = typeof window !== "undefined" && localStorage.getItem("total");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = await createOrder({ ...FormData, total, PaymentMethod });
    toast.success("Order Placed");
    resetCart();
    {
      typeof window !== "undefined" && localStorage.setItem("order", id);
    }
    router.push(`/order/${id}`);
   
  };

  return (
    <Modal
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colorScheme[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      opened={opened}
      onClose={() => setOpened(false)}
    >
      {/* Modal content */}
      <form action="" onSubmit={handleSubmit} className={css.formContainer}>
        <input
          type="text"
          name="name"
          required
          placeholder="Name"
          autoComplete="name"
          onChange={handleInput}
        />
        <input
          type="text"
          name="phone"
          required
          placeholder="Phone Number"
          onChange={handleInput}
        />
        <textarea
          name="address"
          rows={3}
          placeholder="Address"
          onChange={handleInput}
        ></textarea>

        <span>
          You will pay
          <span>$ {total}</span> on Delivery
        </span>

        <button type="submit" className="btn">
          Place Order
        </button>
      </form>
      <Toaster />
    </Modal>
  );
}
