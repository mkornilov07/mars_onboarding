'use server'
import { validateRequest } from "../src/lib/lucia";
import { redirect } from "next/dist/server/api-utils";
import { getPic } from "../src/lib/lucia";
import Link from "next/link";
import { useState, useEffect, SetStateAction } from "react";

export default async function User(){
    const { user } = await validateRequest();
	if(!user) {
		return <Link href = "/login">Login with Google</Link>;
	}
	else {
		return <img src = {user.picture}></img>;
	}

}