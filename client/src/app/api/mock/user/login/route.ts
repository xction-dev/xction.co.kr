import { NextRequest, NextResponse } from "next/server";
import { ZodError, z } from "zod";

const Body = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export async function POST(request: NextRequest) {
  try {
    // parse body
    const body = await request.json();
    const validBody = Body.parse(body);

    // parse query
    const { searchParams } = new URL(request.url);
    const successQueryParam = searchParams.get("success");

    // send requested error response
    if (successQueryParam === "false") {
      return NextResponse.json(
        {
          error_type: 3,
          error_message: "이메일이나 비밀번호가 잘못되었습니다.",
        },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, user: validBody.email });
  } catch (e) {
    // default: unknown error
    const errorResponse: { status: number; data: unknown } = {
      status: 500,
      data: { error_type: 0, error_message: "Unknown error" },
    };

    // handle JSON error
    if (e instanceof SyntaxError && e.message.includes("JSON")) {
      errorResponse.status = 400;
      errorResponse.data = {
        error_type: 1,
        error_message: "Body should be a valid JSON object",
      };
    }

    // handle zod error
    if (e instanceof ZodError) {
      errorResponse.status = 400;
      errorResponse.data = {
        error_type: 2,
        error_fields: e.issues.map((issue) => ({
          path: issue.path,
          error_message: issue.message,
        })),
      };
    }

    // send error response
    return NextResponse.json(errorResponse.data, {
      status: errorResponse.status,
    });
  }
}
