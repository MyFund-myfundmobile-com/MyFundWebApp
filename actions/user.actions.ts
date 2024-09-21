"use server";

import { cookies } from "next/headers";

export async function cookieCreate(value: string, data: string) {
  cookies().set({
    name: value,
    value: data,
    httpOnly: true,
    path: "/",
  });
}

export async function deleteCookie(data: string) {
  cookies().delete(data);
}
