'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import Slider from '@/components/Slider';
import { IProduct } from '@/lib/interface';
import { priceFormat } from '@/lib/utils';

const Home = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products/all?limit=12');
        const data = await response.json();

        // Products 5–8 → homepage grid
        setProducts(data.products.slice(4, 8));
      } catch (error) {
        console.error('Error fetching home products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <main className="bg-white min-h-screen pb-16">
      {/* =========================
          HERO SLIDER
          ========================= */}
      <Slider />

      {/* =========================
          HOME PRODUCTS
          ========================= */}
      {!loading && products.length > 0 && (
        <section className="w-[92%] max-w-6xl mx-auto mt-12 sm:mt-16">
          {/* Section heading */}
          <div className="mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-semibold text-[#171717]">Featured Products</h2>

            <p className="text-[#666666] mt-1 text-sm sm:text-base">
              Explore some of our featured products
            </p>
          </div>

          {/* 2 × 2 GRID */}
          <div className="grid grid-cols-2 gap-5 sm:gap-7 md:gap-8 max-w-5xl mx-auto">
            {products.map((product) => (
              <Link
                href={`/${product._id}`}
                key={product._id}
                className="
                  group
                  bg-[#F3F3F3]
                  rounded-xl
                  overflow-hidden
                  border border-[#E5E5E5]
                  hover:shadow-lg
                  transition-all
                  duration-300
                "
              >
                {/* IMAGE */}
                <div
                  className="
                    relative
                    w-full
                    h-[180px]
                    sm:h-[240px]
                    md:h-[280px]
                    bg-[#F7F7F7]
                    flex
                    items-center
                    justify-center
                  "
                >
                  <Image
                    src={product.thumbnail}
                    alt={product.title}
                    fill
                    sizes="(max-width: 640px) 45vw, 40vw"
                    className="
                      object-contain
                      p-5
                      sm:p-8
                      group-hover:scale-105
                      transition-transform
                      duration-300
                    "
                  />
                </div>

                {/* DETAILS */}
                <div className="p-4 sm:p-5">
                  <h3 className="text-base sm:text-lg md:text-xl font-medium text-[#171717] line-clamp-2">
                    {product.title}
                  </h3>

                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-base sm:text-lg font-semibold text-[#171717]">
                      {priceFormat(product.price)}
                    </span>

                    {product.discountPrice && (
                      <del className="text-sm sm:text-base text-[#777777]">
                        {priceFormat(product.discountPrice)}
                      </del>
                    )}
                  </div>

                  {product.discountPercentage && (
                    <p className="text-sm text-[#555555] mt-1">{product.discountPercentage}% OFF</p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
};

export default Home;
