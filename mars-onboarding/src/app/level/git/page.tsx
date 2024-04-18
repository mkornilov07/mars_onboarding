import Link from "next/link";
import Popup from "../../../../components/Popup";

export default function GitLevel() {
    let lesson = (<p>You'll need this</p>);
    let title = (<code>git reset --hard</code>)
    return (
        <div>
            <div className = "flex text-white bg-black sticky justify-between top w-full h-30">
                <Link href = "/level/" className = "text-white m-5 self-center content-start text-5xl hover:text-red-700">⬅</Link>
                <h1 className = "m-10 select-none font-bold text-4xl place-self-center">Git Level</h1>
                <div className = "m-10 select-none cursor-help place-content-center">
                    <Popup contents = {lesson} title = {title}></Popup>
                </div>
            </div>
            <div className = "z-0 flex-col min-h-screen w-full bg-zinc-900 text-white place-items-center">
                <p className = "text-zinc-900 bg-zinc-900">empty placeholder</p>
                <p className = "text-zinc-900 bg-zinc-900">empty placeholder</p>
                <p className = "flex place-content-center">stuff</p>
            </div>
        </div>
)};