"use client";

import Image from "next/image";
import { Product } from "@/lib/api";
import { formatPrice } from "@/lib/pricing";
import { useCartStore } from "@/store/cartStore";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <div className="product-card">
      <div className="product-image">
        <Image
          src={product.image}
          alt={product.title}
          width={150}
          height={150}
          style={{ objectFit: "contain", maxHeight: "150px", width: "auto" }}
          priority={product.id <= 4}
        />
      </div>

      <div className="product-info">
        <span className="product-category">{product.category}</span>

        <h3>{product.title}</h3>

        <div className="product-rating">
          ⭐ {product.rating?.rate ?? 0} ({product.rating?.count ?? 0} reviews)
        </div>

        <div className="product-bottom">
          <span className="product-price">
            {formatPrice(product.price)}
          </span>

          <button
            type="button"
            onClick={() => addToCart(product)}
            aria-label={`Add ${product.title} to cart`}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
