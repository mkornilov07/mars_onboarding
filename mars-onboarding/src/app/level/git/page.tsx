import Link from "next/link";

export default function GitLevel() {
    return (
        <div>
            <div className = "flex text-white items-start content-start bg-black sticky top w-full h-30">
                <Link href = "/level/" className = "text-white m-5 text-5xl hover:text-red-700">⬅</Link>
                <h1>Git Level</h1>
            </div>
            <div className = "flex-col min-h-screen w-full bg-black text-white">
                stuff
            </div>
        </div>
)};