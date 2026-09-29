'use client';

import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import Image from 'next/image';
import Link from 'next/link';

import { ChevronRight } from 'lucide-react';

import { IProduct } from '@/lib/interface';
import { priceFormat } from '@/lib/utils';
import Spinner from './Spinner';

const Slider = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products/all?limit=12');

        const data = await response.json();

        // First 4 products are used in the hero slider
        setProducts(data.products.slice(0, 4));
      } catch (error) {
        console.error('Error fetching slider products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  /* =========================
     LOADING
     ========================= */

  if (loading) {
    return (
      <section className="h-[300px] sm:h-[380px] md:h-[480px] flex items-center justify-center bg-[#F7F7F7]">
        <Spinner />
      </section>
    );
  }

  /* =========================
     NO PRODUCTS
     ========================= */

  if (!products.length) {
    return null;
  }

  return (
    <section className="w-full">
      <Swiper
        slidesPerView={1}
        spaceBetween={0}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        modules={[Navigation, Pagination, Autoplay]}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
        }}
        loop={products.length > 1}
        speed={800}
        className="hero-swiper"
      >
        {products.map((product) => (
          <SwiperSlide key={product._id}>
            <Link href={`/${product._id}`} className="block">
              <div
                className="
                  relative
                  w-full
                  h-[300px]
                  sm:h-[380px]
                  md:h-[480px]
                  overflow-hidden
                  bg-white
                "
              >
                {/* =========================
                    BACKGROUND
                   ========================= */}

                <div
                  className="
                    absolute
                    inset-0
                    bg-gradient-to-br
                    from-white
                    via-[#F7F7F7]
                    to-[#E5E5E5]
                  "
                />

                {/* Right gray section */}

                <div
                  className="
                    absolute
                    right-0
                    top-0
                    h-full
                    w-[25%]
                    bg-[#ECECEC]
                    opacity-60
                  "
                />

                {/* Bottom geometric shape */}

                <div
                  className="
                    absolute
                    right-[18%]
                    bottom-0
                    w-[55%]
                    h-[35%]
                    bg-white
                    skew-x-[-15deg]
                    opacity-70
                  "
                />

                {/* =========================
                    LEFT CONTENT
                   ========================= */}

                <div
                  className="
                    absolute
                    z-10
                    left-7
                    sm:left-12
                    md:left-[9%]
                    top-1/2
                    -translate-y-1/2
                    w-[48%]
                    sm:w-[45%]
                    md:w-[42%]
                  "
                >
                  {/* Small heading */}

                  <p
                    className="
                      text-[10px]
                      sm:text-xs
                      md:text-sm
                      tracking-[0.35em]
                      font-medium
                      text-[#555]
                      uppercase
                      mb-3
                    "
                  >
                    Featured Product
                  </p>

                  {/* Product title */}

                  <h1
                    className="
                      text-2xl
                      sm:text-4xl
                      md:text-5xl
                      lg:text-6xl
                      font-bold
                      leading-[1.05]
                      text-[#171717]
                      max-w-xl
                    "
                  >
                    {product.title}
                  </h1>

                  {/* Price */}

                  <div className="flex items-center gap-3 mt-4">
                    <span
                      className="
                        text-xl
                        sm:text-2xl
                        md:text-3xl
                        font-semibold
                        text-[#171717]
                      "
                    >
                      {priceFormat(product.price)}
                    </span>

                    {product.discountPrice && (
                      <del
                        className="
                          text-sm
                          sm:text-base
                          md:text-lg
                          text-[#777]
                        "
                      >
                        {priceFormat(product.discountPrice)}
                      </del>
                    )}
                  </div>

                  {/* Shop button */}

                  <div className="mt-5">
                    <span
                      className="
                        inline-flex
                        items-center
                        gap-2
                        px-5
                        py-3
                        rounded-lg
                        bg-[#262626]
                        text-white
                        text-sm
                        sm:text-base
                        font-medium
                        hover:bg-[#171717]
                        transition
                      "
                    >
                      Shop Now
                      <ChevronRight size={18} />
                    </span>
                  </div>
                </div>

                {/* =========================
                    PRODUCT IMAGE
                   ========================= */}

                <div
                  className="
                    absolute
                    right-[5%]
                    sm:right-[8%]
                    md:right-[10%]
                    top-1/2
                    -translate-y-1/2
                    w-[43%]
                    sm:w-[40%]
                    md:w-[38%]
                    h-[75%]
                    z-10
                    flex
                    items-center
                    justify-center
                  "
                >
                  <Image
                    src={product.thumbnail}
                    alt={product.title}
                    fill
                    priority
                    quality={100}
                    sizes="
                      (max-width: 640px) 43vw,
                      (max-width: 1024px) 40vw,
                      38vw
                    "
                    className="
                      object-contain
                      p-3
                      sm:p-5
                      md:p-8
                    "
                  />
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Slider;
