'use client';
import { validateRequest } from "../src/lucia";
import { redirect } from "next/dist/server/api-utils";
import { db } from "../src/lucia";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function User(){
	const [pic, setPic] = useState("");
    useEffect(() => {
		const getUser = async function(){
			return await validateRequest();
		}
		if (!getUser()) {
			return (<Link href='/login/'></Link>);
		}

		const pfp = db.prepare("SELECT picture FROM Users WHERE id = ?").get(user.id);
    });
}