'use server'
import { validateRequest, logout } from "../src/lib/lucia";
import { redirect } from "next/dist/server/api-utils";
import { getPic } from "../src/lib/lucia";
import Link from "next/link";
import { useState, useEffect, SetStateAction } from "react";

export default async function User(){
    const { user } = await validateRequest();
	if(!user) {
		return (
			<div className="flex justify-center content-center m-10">
				<Link href = "/login" className="rounded-md px-3.5 py-2 m-1 overflow-hidden relative group cursor-pointer border-2 font-medium border-red-600 text-red-600 text-white">
					<span className="absolute w-64 h-0 transition-all duration-300 origin-center rotate-45 -translate-x-20 bg-red-600 top-1/2 group-hover:h-64 group-hover:-translate-y-32 ease">
					</span>
					<span className="relative text-red-600 transition duration-300 group-hover:text-white ease">
						Sign in with Google
					</span>
				</Link>
			</div>
		);
	}
	else {
		return (
			<div className="flex-col justify-center content-center m-10 align-center">
				<img src = {user.picture} className="justify-center"></img>
				<form action={logout} className = "justify-self-center justify-center text-center content-center">
					<button className = "justify-self-center content-center text-center text-gray-600 hover:text-blue-600 hover:underline">Sign out</button>
				</form>
			</div>
		);
	}

}