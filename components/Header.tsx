import Image from "next/image";
import Link from "next/link";
import Script from "next/script";

export default function Header() {
  return (
    <header className="flex flex-col xs:flex-row justify-between items-center w-full mt-3 border-b pb-7 sm:px-4 px-2 border-gray-500 gap-2">
      
      <Link href="/" className="flex space-x-2">
        <h1 className="sm:text-3xl text-xl font-bold ml-2 tracking-tight font-mono">
          GenFashionAI
        </h1>
      </Link>
    </header>
  );
}
