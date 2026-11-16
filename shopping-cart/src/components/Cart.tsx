"use client";

import { useSyncExternalStore } from "react";
import Image from "next/image";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/lib/pricing";

// React 19 recommended hydration subscription
const subscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

export default function Cart() {
  const isHydrated = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const items = useCartStore((state) => state.items);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const increaseQuantity = useCartStore((state) => state.increaseQuantity);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
  const clearCart = useCartStore((state) => state.clearCart);
  const getTotalItems = useCartStore((state) => state.getTotalItems);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);

  if (!isHydrated) {
    return (
      <aside className="cart-container" aria-label="Shopping Cart">
        <div className="cart-header">
          <h2>Your Cart</h2>
          <span>0 items</span>
        </div>
        <div className="empty-cart">Loading cart...</div>
      </aside>
    );
  }

  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();

  return (
    <aside className="cart-container" aria-label="Shopping Cart">
      <div className="cart-header">
        <h2>Your Cart</h2>
        <span>
          {totalItems} {totalItems === 1 ? "item" : "items"}
        </span>
      </div>

      {items.length === 0 ? (
        <div className="empty-cart">Your cart is empty. Start shopping!</div>
      ) : (
        <>
          <div className="cart-items">
            {items.map((item) => (
              <div key={item.product.id} className="cart-item">
                <Image
                  src={item.product.image}
                  alt={item.product.title}
                  width={55}
                  height={65}
                  style={{ objectFit: "contain", width: "55px", height: "65px" }}
                />

                <div className="cart-item-info">
                  <h4>{item.product.title}</h4>
                  <p>{formatPrice(item.product.price * item.quantity)}</p>

                  <div className="quantity-controls">
                    <button
                      type="button"
                      onClick={() => decreaseQuantity(item.product.id)}
                      aria-label={`Decrease quantity of ${item.product.title}`}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => increaseQuantity(item.product.id)}
                      aria-label={`Increase quantity of ${item.product.title}`}
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  type="button"
                  className="remove-button"
                  onClick={() => removeFromCart(item.product.id)}
                  aria-label={`Remove ${item.product.title} from cart`}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="cart-footer">
            <div className="cart-total">
              <span>Total:</span>
              <strong>{formatPrice(totalPrice)}</strong>
            </div>

            <button
              type="button"
              className="clear-cart-button"
              onClick={clearCart}
            >
              Clear Cart
            </button>
          </div>
        </>
      )}
    </aside>
  );
}
