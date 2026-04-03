export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";

import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    const adminUser = process.env.ADMIN_USER;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (username === adminUser && password === adminPassword) {
      // In a real app, you would sign a JWT here. 
      // For this "simple admin login", we use a session token approach.
      const response = NextResponse.json({ success: true });
      
      const cookieStore = await cookies();
      cookieStore.set({
        name: "admin_session",
        value: "authenticated_admin", // Simplest possible session flag for now
        httpOnly: true,
        path: "/",
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 7, // 1 week
      });

      return response;
    }

    return NextResponse.json(
      { message: "Credenciales inválidas" },
      { status: 401 }
    );
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
