'use client'
import { redirect } from "next/dist/server/api-utils";
import Link from "next/link";
import { useState, useEffect, SetStateAction } from "react";

export default function User({logout, validateReq} : {logout: any, validateReq: any}){
	const [picture, setPicture] = useState("");
	useEffect(()=>{
		async function a() {
			const user = await validateReq();
			if(user) setPicture(user.picture)
		}
		a()
	},[])
    
	if(picture == "") {
		return (
			// <div className="flex justify-center content-center p-4">
				<Link href = "/login" className="inline-flex align-center rounded-md h-10 self-center px-3.5 py-2 m-1 overflow-hidden relative group cursor-pointer border-2 font-medium border-red-600 text-red-600 text-white">
					<span className="inline-flex items-center relative text-red-600 transition duration-300 group-hover:text-white ease">
						Sign in with Google
					</span>
				</Link>
			// </div>
		);
	}
	else {
		return <div className="object-contain self-center">
		<img src = {picture} className="justify-center align-center"></img>
		<form action={logout} className = "justify-self-center justify-center text-center content-center">
			<button className = "justify-self-center content-center text-center text-gray-600 hover:text-blue-600 hover:underline">Sign out</button>
		</form>
	</div>
		return (
			<div className="flex-col justify-center content-center p-4 align-center">
				<div className="object-contain">
					<img src = {picture} className="justify-center align-center"></img>
					<form action={logout} className = "justify-self-center justify-center text-center content-center">
						<button className = "justify-self-center content-center text-center text-gray-600 hover:text-blue-600 hover:underline">Sign out</button>
					</form>
				</div>
			</div>
		);
	}

}