import { NextResponse } from "next/server";

export async function GET(request: Request) {
 const { searchParams } = new URL(request.url);
 console.log(request.url);

 const query = searchParams.get("query");

 return 
}