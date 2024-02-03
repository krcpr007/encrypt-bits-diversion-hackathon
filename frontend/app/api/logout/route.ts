import { statusCodes } from "@/lib/utils";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest) {
  const cookieStore = cookies();

  const token = cookieStore.get("auth");
  if (!token) {
    return NextResponse.json(
      {
        message: "User not logged in",
      },
      {
        status: statusCodes.UNAUTHORIZED,
      }
    );
  }

  cookieStore.delete("auth");

  return NextResponse.json(
    {
      message: "User logged out",
    },
    { status: statusCodes.OK }
  );
}
