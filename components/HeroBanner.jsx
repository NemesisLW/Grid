import { BiArrowBack } from "react-icons/bi";
import Image from "next/image";

const HeroBanner = () => {
  return (
    <div className="relative text-white text-[20px] w-full max-w-[1360px] mx-auto">
      <div
        onClick={null}
        className="absolute right-[31px] md:right-[51px] bottom-0 w-[30px] md:w-[50px] h-[30px] md:h-[50px] bg-black z-10 flex items-center justify-center cursor-pointer hover:opacity-90"
      >
        <BiArrowBack className="text-sm md:text-lg" />
      </div>

      <div>
        <Image
          alt="next"
          src="/next.svg"
          width={100}
          height={100}
          className="aspect-[16/10] md:aspect-auto object-cover"
        />
        <div className="px-[15px] md:px-[40px] py-[10px] md:py-[25px] font-oswald bg-white absolute bottom-[25px] md:bottom-[75px] left-0 text-black/[0.9] text-[15px] md:text-[30px] uppercase font-medium cursor-pointer hover:opacity-90">
          Shop now
        </div>
      </div>
      <div>
        <Image
          alt="next"
          src="/next.svg"
          width={100}
          height={100}
          className="aspect-[16/10] md:aspect-auto object-cover"
        />
        <div className="px-[15px] md:px-[40px] py-[10px] md:py-[25px] font-oswald bg-white absolute bottom-[25px] md:bottom-[75px] left-0 text-black/[0.9] text-[15px] md:text-[30px] uppercase font-medium cursor-pointer hover:opacity-90">
          Shop now
        </div>
      </div>
      <div>
        <Image
          alt="next"
          src="/next.svg"
          width={100}
          height={100}
          className="aspect-[16/10] md:aspect-auto object-cover"
        />
        <div className="px-[15px] md:px-[40px] py-[10px] md:py-[25px] font-oswald bg-white absolute bottom-[25px] md:bottom-[75px] left-0 text-black/[0.9] text-[15px] md:text-[30px] uppercase font-medium cursor-pointer hover:opacity-90">
          Shop now
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
