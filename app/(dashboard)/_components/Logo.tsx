import Image from "next/image";

const Logo = () => {
  return (
    <div className='flex items-center justify-center flex-col relative'>
      <Image
        height={130}
        width={130}
        alt='cursify logo'
        src='/logo.svg'
      ></Image>
      <p className='absolute bottom-0 text-md font-[600] uppercase text-purple-500 '>
        Coursify
      </p>
    </div>
  );
};

export default Logo;
