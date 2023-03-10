import Image from "next/image";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { selectItems } from "../slices/basketSlice";

function Header() {
  const { data: session } = useSession();
  const router = useRouter();

  const items = useSelector(selectItems); // This grabs information from the global store

  return (
    <header>
      {/* Top Nav */}
      <div className="flex items-center bg-amazon_blue p-4 flex-grow py-2">
        <div className="mt-3 flex items-center flex-grow sm:flex-grow-0">
          <Image
            onClick={() => router.push("/")}
            src="https://links.papareact.com/f90"
            height={40}
            width={150}
            objectFit="contain"
            className="cursor-pointer"
            alt=""
          />
        </div>
        {/* Search Bar */}
        <div className="hidden bg-yellow-400 hover:bg-yellow-500 sm:flex items-center h-10 rounded-md flex-grow cursor-pointer ml-4">
          <input
            type="text"
            className="p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none px-4"
          />
          <MagnifyingGlassIcon className="h-12 p-4" />
        </div>
        {/* User Details */}
        <div className="text-white flex items-center text-xs space-x-6 mx-6 whitespace-nowrap">
          {/* Account */}
          <div
            onClick={!session ? signIn : signOut}
            className="cursor-pointer link"
          >
            <p className="hover:underline">
              {session ? `Hello, ${session.user?.name}` : "Sign In"}
            </p>
            <p className="font-extrabold md:text-sm">Account & Lists</p>
          </div>
          {/* Order */}
          <div className="cursor-pointer link">
            <p>Orders</p>
            <p className="font-extrabold md:text-sm"> & Returns</p>
          </div>
          {/* Basket */}
          <div
            onClick={() => router.push("/checkout")}
            className="relative link flex items-center"
          >
            <span className="absolute top-0 right-0 md:right-10 h-4 w-4 bg-yellow-400 text-center text-black rounded-full font-bold">
              {/* Number of Items in the Cart */}
              {items.length}
            </span>
            <ShoppingCartIcon className="h-10" />
            <p className="hidden font-extabold md:text-sm md:inline mt-2">
              Cart
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="flex items-center space-x-3 p-2 pl-6 bg-amazon_blue-light text-white text-sm">
        <p className="link flex items-center">
          <Bars3Icon className="h-6 mr-1" />
          All
        </p>
        <p className="link">Prime Video</p>
        <p className="link">Amazon Business</p>
        <p className="link">Today's Deals</p>
        <p className="link hidden lg:inline-flex">Electronics</p>
        <p className="link hidden lg:inline-flex">Food & Groceries</p>
        <p className="link hidden lg:inline-flex">Prime</p>
        <p className="link hidden lg:inline-flex">Buy Again</p>
        <p className="link hidden lg:inline-flex">Shopper Toolkit</p>
        <p className="link hidden lg:inline-flex">Health & Personal Care</p>
      </div>
    </header>
  );
}

export default Header;
