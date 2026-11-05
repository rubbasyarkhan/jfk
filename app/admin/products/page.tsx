import Link from 'next/link';
import { getAllProducts } from '@/lib/firestore';

export default async function AdminProductsListPage() {
  const products = await getAllProducts();

  return (
    <div className="space-y-8 text-[#FFFFFF]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="eyebrow mb-1">Catalog Management</p>
          <h1 className="font-display text-3xl sm:text-4xl text-[#FFFFFF] uppercase">
            All Products &amp; Cards
          </h1>
        </div>

        <Link href="/admin/products/new" className="btn-gold !py-2.5">
          + Add New Bottle
        </Link>
      </div>

      {/* Products Table Card in Charcoal #242424 */}
      <div className="p-6 sm:p-8 rounded-2xl bg-[#242424] border border-[#3A3A3A]">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-[#3A3A3A] text-xs font-bold uppercase text-[#A0A0A0] tracking-wider">
                <th className="pb-4">Bottle / Item</th>
                <th className="pb-4">Category</th>
                <th className="pb-4">Price</th>
                <th className="pb-4">Badge</th>
                <th className="pb-4">Stock</th>
                <th className="pb-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#3A3A3A]/60">
              {products.map((item) => (
                <tr key={item.id} className="hover:bg-[#111111]/40 transition-colors">
                  <td className="py-4 font-bold text-[#FFFFFF] flex items-center gap-3">
                    <img
                      src={item.thumbnailUrl || item.images?.[0] || 'https://images.unsplash.com/photo-1527281400683-1aae777175f8?auto=format&fit=crop&w=400&q=80'}
                      alt=""
                      className="w-12 h-12 object-cover rounded-xl border border-[#3A3A3A] flex-shrink-0"
                    />
                    <div>
                      <p className="line-clamp-1">{item.name}</p>
                      <p className="text-xs text-[#A0A0A0] font-normal font-light">
                        {item.volume || 'Standard'} &bull; {item.tags?.slice(0, 2).join(', ')}
                      </p>
                    </div>
                  </td>

                  <td className="py-4 text-[#C7C7C7] capitalize">{item.category.replace(/-/g, ' ')}</td>

                  <td className="py-4 font-display text-[#D4AF37]">
                    {item.price ? `$${item.price.toFixed(2)}` : 'Inquire'}
                  </td>

                  <td className="py-4">
                    {item.badge ? (
                      <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase bg-[#5B1018] text-[#D4AF37] border border-[#D4AF37]/30">
                        {item.badge}
                      </span>
                    ) : (
                      <span className="text-[#A0A0A0] text-xs">—</span>
                    )}
                  </td>

                  <td className="py-4">
                    <span className="inline-flex items-center gap-1.5 text-xs text-green-400 font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                      In Stock
                    </span>
                  </td>

                  <td className="py-4 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <Link
                        href={`/products/${item.category}/${item.slug}`}
                        target="_blank"
                        className="text-xs text-[#A0A0A0] hover:text-[#FFFFFF]"
                      >
                        Preview
                      </Link>
                      <Link
                        href={`/admin/products/${item.id}`}
                        className="text-xs font-bold text-[#D4AF37] hover:underline"
                      >
                        Edit →
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
