import Link from "next/link";
import ParticlesBackground from "../../../components/ParticlesBackground";

export default function LevelSelectPage() {
    return (
    <div>
        <ParticlesBackground></ParticlesBackground>
        <div className = "flex items-start content-start bg-black sticky top w-full h-30">
            <Link href = "/" className = "text-white m-5 text-5xl hover:text-red-700">⬅</Link>
        </div>
        <div className = "flex-col min-h-screen w-full bg-black text-white">
            <div className ="text-8xl select-none text-black bg-black">empty</div>
            <h1 className = "m-5 bg-black select-none bottom-10 flex content-center items-center justify-center text-red-600 font-semibold text-5xl">Level Select:</h1>
            <h2 className = "m-5 select-none flex content-center items-center justify-center hover:text-red-600 hover:animate-pulse hover:italic text-3xl hover:text-4xl"><Link href = "/level/git">Git Levels</Link></h2>
            <h2 className = "m-5 select-none flex content-center items-center justify-center hover:text-red-600 hover:animate-pulse hover:italic text-3xl hover:text-4xl"><Link href = "/level/linux">Linux Levels</Link></h2>
            <h2 className = "m-5 select-none flex content-center items-center justify-center hover:text-red-600 hover:animate-pulse hover:italic text-3xl hover:text-4xl"><Link href = "/level/ros">ROS Levels</Link></h2>
        </div>;
    </div>
    )
}