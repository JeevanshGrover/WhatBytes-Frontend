import Sidebar from "@/components/Sidebar";
import ProductGrid from "@/components/ProductGrid";

export default function HomePage() {
  return (
    <div className="flex flex-col md:flex-row gap-8 items-start">
      <Sidebar />

      <ProductGrid />
    </div>
  );
}
