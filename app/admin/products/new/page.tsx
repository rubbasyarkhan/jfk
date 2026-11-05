import ProductForm from '@/components/admin/ProductForm';

export default function NewProductPage() {
  return (
    <div className="space-y-8">
      <div>
        <p className="eyebrow mb-1">Catalog Expansion</p>
        <h1 className="font-display text-3xl sm:text-4xl text-paper uppercase">
          Add New Bottle / Product
        </h1>
      </div>

      <ProductForm />
    </div>
  );
}
