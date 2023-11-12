import { NextRequest, NextResponse } from "next/server";

let loggedIn = false;

export const cacheLogin = () => {
  loggedIn = true;
};

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  if (loggedIn) {
    return NextResponse.json({
      name: "준영",
    });
  } else {
    return NextResponse.json({ error_message: "로그인 실패" }, { status: 500 });
  }
}
