import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
  } catch (e) {}

  // parse body
  const body = await request.json();

  const { searchParams } = new URL(request.url);
  const success = searchParams.get("success");

  if (success === "fail") {
    return NextResponse.json(
      { error_code: 1, error_message: "결과 쿼리를 찾을 수 없습니다." },
      { status: 401 },
    );
  }
}
