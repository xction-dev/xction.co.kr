import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    return NextResponse.json(body);
  } catch (e) {
    // default: unknown error
    const errorResponse: { status: number; data: unknown } = {
      status: 500,
      data: { error_type: 0, error_message: "unknown error" },
    };

    // handle JSON error
    if (e instanceof SyntaxError && e.message.includes("JSON")) {
      errorResponse.status = 400;
      errorResponse.data = {
        error_type: 1,
        error_message: "Body should be a valid JSON object",
      };
    }

    // send error response
    return NextResponse.json(errorResponse.data, {
      status: errorResponse.status,
    });
  }
}
