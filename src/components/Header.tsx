'use client';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setTotal } from '@/redux/slice/cartSlice';
import clsx from 'clsx';
import {
  ChevronDown,
  ChevronRight,
  Headphones,
  Heart,
  Menu,
  Search,
  ShieldCheck,
  ShoppingBag,
  Truck,
  User,
  X,
} from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { setAuthStatus } from '@/redux/slice/userSlice';

const Header = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState('');

  const dispatch = useAppDispatch();

  const { totalQuantity } = useAppSelector((state) => state.cart);
  const { authStatus, user } = useAppSelector((state) => state.user);
  

  useEffect(() => {
    dispatch(setTotal());
  }, [dispatch]);

  const handleSearch = () => {
    const query = searchQuery.trim();

    if (!query) {
      return;
    }

    router.push(`/store?search=${encodeURIComponent(query)}`);
  };

  return (
    <>
      {/* ================= TOP ANNOUNCEMENT BAR ================= */}
      <div className="hidden md:block bg-white border-b border-[#E5E5E5]">
        <div className="max-w-[1500px] mx-auto px-6 h-10 flex items-center justify-between text-sm text-[#555]">
          <div className="flex items-center gap-2">
            <Truck size={16} />
            <span>Free Delivery on Orders Above ₹999</span>
          </div>

          <div className="h-5 w-px bg-[#D8D8D8]" />

          <div className="flex items-center gap-2">
            <ShieldCheck size={16} />
            <span>100% Secure Payments</span>
          </div>

          <div className="h-5 w-px bg-[#D8D8D8]" />

          <div className="flex items-center gap-2">
            <Headphones size={16} />
            <span>24/7 Customer Support</span>
          </div>
        </div>
      </div>

      {/* ================= MAIN NAVBAR ================= */}
      <header className="sticky top-0 z-40 bg-[#171717] text-white shadow-md">
        <nav className="w-full">
          <div className="max-w-[1500px] mx-auto px-5 lg:px-8">
            <div className="h-[82px] lg:h-[92px] flex items-center gap-6 lg:gap-10">
              {/* LOGO */}
              <Link href="/" className="flex-shrink-0 flex items-center">
                <img
                  src="/truecart-logo.png"
                  alt="TrueCart"
                  className="w-[155px] sm:w-[175px] lg:w-[205px] h-auto object-contain"
                />
              </Link>

              {/* DESKTOP NAVIGATION */}
              <div className="hidden lg:flex items-center gap-1 xl:gap-2 flex-1">
                {/* HOME */}
                <Link
                  href="/"
                  className="px-5 py-3 rounded-lg bg-[#2B2B2B] text-white font-medium transition hover:bg-[#363636]"
                >
                  Home
                </Link>

                {/* STORE */}
                <Link
                  href="/store"
                  className="px-4 py-3 text-[#D0D0D0] font-medium transition hover:text-white"
                >
                  Store
                </Link>

                {/* ABOUT */}
                <Link
                  href="/"
                  className="px-4 py-3 text-[#D0D0D0] font-medium transition hover:text-white"
                >
                  About
                </Link>
              </div>

              {/* RIGHT SIDE */}
              <div className="ml-auto flex items-center gap-3 lg:gap-5">
                {/* SEARCH */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();

                    handleSearch();
                    setOpenMenu(false);
                  }}
                  className="
  flex
  items-center
  w-full
  max-w-[360px]
  h-11
  bg-[#292929]
  border
  border-[#444]
  rounded-lg
  px-4
  -translate-y-[2px]
  focus-within:border-[#777]
  transition
"
                >
                  <button type="submit" title="Search" className="text-[#555] hover:text-[#171717]">
                    <Search size={20} />
                  </button>

                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleSearch();
                        setOpenMenu(false);
                      }
                    }}
                    placeholder="Search products..."
                    className="
      w-full
    ml-3
    bg-transparent
    outline-none
    border-none
    text-white
    !text-white
    placeholder:text-[#BDBDBD]
    placeholder:!text-[#BDBDBD]
    caret-white
    text-sm
    "
                  />
                </form>

                {/* USER */}
                {authStatus ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="relative p-1 outline-none">
                        {user && (
                          <Avatar className="w-9 h-9 border border-[#555]">
                            <AvatarImage src={user?.avatar} alt={user?.name} />

                            <AvatarFallback className="bg-[#333] text-white font-semibold uppercase">
                              {user?.name?.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                        )}
                      </button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>

                      <DropdownMenuSeparator />

                      <DropdownMenuItem>
                        <Link href="/orders">Orders</Link>
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        onClick={() => {
                          signOut(auth);
                          dispatch(setAuthStatus(false));
                        }}
                        className="cursor-pointer"
                      >
                        Sign out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Link
                    href="/signin"
                    title="Profile"
                    className="hidden md:flex p-2 text-[#E5E5E5] hover:text-white transition"
                  >
                    <User size={24} strokeWidth={1.7} />
                  </Link>
                )}

                {/* CART */}
                <Link
                  href="/cart"
                  title="Cart"
                  className="relative p-2 text-[#E5E5E5] hover:text-white transition"
                >
                  <ShoppingBag size={25} strokeWidth={1.7} />

                  {totalQuantity > 0 && (
                    <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 rounded-full bg-white text-[#171717] text-[10px] font-bold flex items-center justify-center">
                      {totalQuantity}
                    </span>
                  )}
                </Link>

                {/* MOBILE MENU */}
                <button
                  className="lg:hidden p-2 text-white"
                  onClick={() => setOpenMenu(true)}
                  title="Menu"
                >
                  <Menu size={27} strokeWidth={1.6} />
                </button>
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* ================= MOBILE MENU ================= */}
      <section
        className={clsx(
          openMenu ? 'translate-x-0' : 'translate-x-[100vw]',
          'fixed inset-0 bg-white transition-transform duration-300 z-50'
        )}
      >
        {/* MOBILE MENU HEADER */}
        <div className="h-[82px] bg-[#171717] text-white flex items-center px-5">
          <div className="flex-1">
            <img src="/truecart-logo.png" alt="TrueCart" className="w-[150px] h-auto" />
          </div>

          <button className="p-2" onClick={() => setOpenMenu(false)} title="Close">
            <X size={27} strokeWidth={1.5} />
          </button>
        </div>

        <div className="px-5 py-6">
          {/* MOBILE ACCOUNT */}
          {authStatus ? (
            <div className="border-b pb-5 grid gap-4">
              <div className="flex items-center gap-4">
                {user && (
                  <Avatar>
                    <AvatarImage src={user?.avatar} alt={user?.name} />

                    <AvatarFallback className="font-semibold text-lg uppercase">
                      {user?.name?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                )}

                <h3 className="capitalize text-lg font-medium">{user?.name}</h3>
              </div>

              <Button variant="ghost" className="justify-start px-0">
                <Link href="/orders" onClick={() => setOpenMenu(false)}>
                  Orders
                </Link>
              </Button>

              <Button
                variant="ghost"
                className="justify-start px-0"
                onClick={() => {
                  signOut(auth);
                  dispatch(setAuthStatus(false));
                  setOpenMenu(false);
                }}
              >
                Sign Out
              </Button>
            </div>
          ) : (
            <Link
              href="/signin"
              onClick={() => setOpenMenu(false)}
              className="flex items-center py-4 border-b hover:bg-gray-50"
            >
              <div className="flex-1 flex items-center">
                <div className="rounded-lg bg-gray-100 p-2 mr-3">
                  <User strokeWidth={1.5} size={20} />
                </div>

                <span className="text-sm font-medium">Sign In / Sign Up</span>
              </div>

              <ChevronRight strokeWidth={1.5} />
            </Link>
          )}

          {/* MOBILE SEARCH */}
          <div className="flex items-center mt-6 h-12 bg-[#F4F4F4] rounded-lg px-4">
            <Search size={20} className="text-[#555]" />

            <input
              type="text"
              placeholder="Search products..."
              className="w-full ml-3 bg-transparent outline-none text-sm"
            />
          </div>

          {/* MOBILE NAV LINKS */}
          <div className="py-6 grid gap-1">
            <Link
              href="/"
              className="py-3 px-3 rounded-lg bg-[#171717] text-white font-medium"
              onClick={() => setOpenMenu(false)}
            >
              Home
            </Link>

            {links.map((elm) => (
              <Link
                key={elm.id}
                href={elm.path}
                onClick={() => setOpenMenu(false)}
                className="py-3 px-3 rounded-lg text-[#333] font-medium hover:bg-gray-100"
              >
                {elm.name}
              </Link>
            ))}
          </div>

          {/* MOBILE EXTRA LINKS */}
          <div className="border-t pt-5 grid gap-1">
            <Link
              href="/"
              className="py-3 px-3 text-sm text-[#555] hover:bg-gray-100 rounded-lg"
              onClick={() => setOpenMenu(false)}
            >
              About
            </Link>

            <Link
              href="/"
              className="py-3 px-3 text-sm text-[#555] hover:bg-gray-100 rounded-lg"
              onClick={() => setOpenMenu(false)}
            >
              Support
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Header;

const links = [
  {
    id: 1,
    path: '/store',
    name: 'Store',
  },
  {
    id: 2,
    path: '/store/mobiles',
    name: 'Mobiles',
  },
  {
    id: 3,
    path: '/store/tv',
    name: 'TV & Display',
  },
  {
    id: 4,
    path: '/store/laptop',
    name: 'Laptop',
  },
  {
    id: 5,
    path: '/store/accessories',
    name: 'Accessories',
  },
];
