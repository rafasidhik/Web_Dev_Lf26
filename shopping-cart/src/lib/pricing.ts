/**
 * Realistic Indian Retail Pricing Mapping and Formatting Utility for Cartify.
 *
 * Maps products from the Fake Store API to realistic Indian market prices (INR)
 * tailored to each product's specific category, type, and retail value in India.
 */

export const PRODUCT_INR_PRICES: Record<number, number> = {
  // --- Category: Men's Clothing & Bags ---
  // 1: Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops
  1: 1799,
  // 2: Mens Casual Premium Slim Fit T-Shirts
  2: 499,
  // 3: Mens Cotton Jacket
  3: 2499,
  // 4: Mens Casual Slim Fit Long Sleeve
  4: 799,

  // --- Category: Jewelery ---
  // 5: John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet
  5: 6999,
  // 6: Solid Gold Petite Micropave Ring
  6: 9999,
  // 7: White Gold Plated Princess Diamond Engagement Ring
  7: 1999,
  // 8: Pierced Owl Rose Gold Plated Stainless Steel Double Earrings
  8: 599,

  // --- Category: Electronics ---
  // 9: WD 2TB Elements Portable External Hard Drive - USB 3.0
  9: 5499,
  // 10: SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s
  10: 4999,
  // 11: Silicon Power 256GB SSD 3D NAND A55 SLC Cache
  11: 1899,
  // 12: WD 4TB Gaming Drive Works with Playstation 4 Portable External Hard Drive
  12: 8999,
  // 13: Acer SB220Q bi 21.5 inches Full HD (1920 x 1080) IPS Ultra-Thin Monitor
  13: 7999,
  // 14: Samsung 49-Inch CHG90 144Hz Curved Gaming Monitor Super Ultrawide
  14: 74999,

  // --- Category: Women's Clothing ---
  // 15: BIYLACLESEN Women's 3-in-1 Snowboard Jacket Winter Coats
  15: 3499,
  // 16: Lock and Love Women's Removable Hooded Faux Leather Moto Biker Jacket
  16: 2199,
  // 17: Rain Jacket Women Windbreaker Striped Climbing Raincoats
  17: 1299,
  // 18: MBJ Women's Solid Short Sleeve Boat Neck V Neck
  18: 399,
  // 19: Opna Women's Short Sleeve Moisture Wicking Athletic T-Shirt
  19: 299,
  // 20: DANVOUY Womens T Shirt Casual Cotton Short Sleeve
  20: 449,
};

/**
 * Fallback generator for unknown product IDs based on category tiers.
 */
export function getCategoryFallbackPrice(category: string, id: number): number {
  const norm = (category || "").toLowerCase();
  if (norm.includes("electronic")) {
    const tiers = [2499, 4999, 7999, 12999];
    return tiers[Math.abs(id) % tiers.length];
  }
  if (norm.includes("jewel")) {
    const tiers = [999, 1999, 4999, 8999];
    return tiers[Math.abs(id) % tiers.length];
  }
  if (norm.includes("women")) {
    const tiers = [299, 499, 899, 1499, 2199];
    return tiers[Math.abs(id) % tiers.length];
  }
  // Men's clothing / default apparel
  const tiers = [399, 699, 1199, 1999, 2799];
  return tiers[Math.abs(id) % tiers.length];
}

/**
 * Returns a consistent, realistic INR retail price for any product.
 */
export function getProductInrPrice(product: { id: number; category?: string }): number {
  return (
    PRODUCT_INR_PRICES[product.id] ??
    getCategoryFallbackPrice(product.category || "", product.id)
  );
}

/**
 * Reusable Indian Rupee currency formatter using Intl.NumberFormat.
 * Formats numbers into standard Indian localized currency representation (e.g. ₹1,299).
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: price % 1 === 0 ? 0 : 2,
  }).format(price);
}

