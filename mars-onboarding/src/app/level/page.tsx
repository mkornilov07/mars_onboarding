import Link from "next/link";

export default function LevelSelectPage() {
    return <div>
        <h1>Select your level:</h1>
        <h2><Link href = "/level/git">Git Level</Link></h2>
        <h2><Link href = "/level/linux">Linux Level</Link></h2>
        <h2><Link href = "/level/ros">ROS Level</Link></h2>

    </div>;

}