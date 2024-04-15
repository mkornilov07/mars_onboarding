import 'animate.css';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex-col min-h-screen w-full place-content-center place-items-center justify-between bg-black">
      <div className="right-100 flex-col z-10 m-10 select-none place-content-center place-items-center max-w-5xl items-center justify-between bg-black">
        <p className="animate__animated animate__bounceInDown m-10 text-white hover:text-red-600 z-15 text-9xl font-semibold cursor-pointer">
          <Link href= "/level">
            MARS
            <br />
            O n b o a r d i n g
          </Link>
        </p>
        <h1 className="z-15 text-white m-10 font-mono relative w-[max-content] 
before:absolute before:inset-0 before:animate-typewriter before:bg-black
after:absolute after:inset-0 after:w-[0.125em] after:animate-caret after:bg-white">
          hewwo daddy where are my 4 garlic bweads and 8 milks
        </h1>
      </div>
    </main>
  );
};