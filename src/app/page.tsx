import FeaturedProducts from "./_component/FeaturedProducts/FeaturedProducts";
import Hero from "./_component/Hero/Hero";
import Newsletter from "./_component/Newsletter/Newsletter";
import PromoBanners from "./_component/PromoBanners/PromoBanners";
import TrustBadges from "./_component/TrustBadges/TrustBadges";
import dynamic from "next/dynamic";

const ShopCategory = dynamic(() => import('./_component/ShopCategory/ShopCategory'), {
  loading: () => <div className="container mx-auto px-4 my-10 h-40 bg-gray-100 rounded-xl animate-pulse" />
});

export default function Home() {
  return (
    <>
      <Hero />

      <TrustBadges />

      <ShopCategory />

      <PromoBanners />

      <FeaturedProducts />

      <Newsletter />
    </>
  );
}
