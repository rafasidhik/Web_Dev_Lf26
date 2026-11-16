
import ProductList from "@/components/ProductList";
import Cart from "@/components/Cart";

export default function Home() {
  return (
    <main className="main-container">
      <header className="site-header">
        <div>
          <h1>Cartify<span>.</span></h1>
          <p>Discover products you&apos;ll love.</p>
        </div>

        <div className="header-tag">
          SMART SHOPPING
        </div>
      </header>

      <section className="shop-layout">
        <div className="products-section">
          <div className="section-heading">
            <div>
              <span className="eyebrow">OUR COLLECTION</span>
              <h2>Explore Products</h2>
            </div>
            <p>Find something you love.</p>
          </div>

          <ProductList />
        </div>

        <Cart />
      </section>

      <footer className="site-footer">
        <p>Cartify. © 2026 | Built with Next.js, TanStack Query & Zustand.</p>
      </footer>
    </main>
  );
}
