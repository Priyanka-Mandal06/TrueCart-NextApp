"use client";

import Categories from "@/components/store/Categories";
import Filters from "@/components/store/Filters";
import useFetchProducts from "@/lib/request/useFetchProducts";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import React, { Suspense } from "react";
import { useParams } from "next/navigation";
import { setOpenFilter } from "@/redux/slice/filterSlice";
import Loading from "../loading";
import { PRICE_MIN, PRICE_MAX } from '@/redux/slice/filterSlice';

const StoreLayout = ({ children }: { children: React.ReactNode }) => {
  const params = useParams();
  const dispatch = useAppDispatch();

  const { brand, openFilter, sort, rating, offer, priceRange } = useAppSelector(
    (state) => state.filter
  );

  const brandFilter = brand.length > 0 ? `&brand=${brand.join("&brand=")}` : "";
  const catFilter =
    params.filter === "all"
      ? ""
      : params.filter
      ? `&category=${params.filter}`
      : "";
  const sortFilter = sort.order !== '' ? `&sort=${sort.field}&order=${sort.order}` : '';
  const ratingFilter = rating !== "" ? `&rating=${rating}` : "";
  const offerFilter = offer !== "" ? `&discountPercentage=${offer}` : "";
  const priceFilter =
    priceRange[0] !== PRICE_MIN || priceRange[1] !== PRICE_MAX
      ? `&minPrice=${priceRange[0]}&maxPrice=${priceRange[1]}`
      : '';

  useFetchProducts(`${brandFilter}${catFilter}${sortFilter}${ratingFilter}${offerFilter}${priceFilter}`);

  return (
    <main className="overflow-hidden">
      <Suspense fallback={<Loading />}>
        <Categories />
        <section className="grid lg:grid-cols-[300px_1fr] md:grid-cols-[250px_1fr] relative border-t">
          {openFilter && (
            <div
              className="fixed inset-0 bg-black/60"
              onClick={() => dispatch(setOpenFilter(false))}
            ></div>
          )}
          <Filters />
          {children}
        </section>
      </Suspense>
    </main>
  );
};

export default StoreLayout;
