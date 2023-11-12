import { NextRequest, NextResponse } from "next/server";
import { ZodError, z } from "zod";

const Body = z.object({
  name: z.string().min(1),
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
          error_message: "이미 가입된 이메일입니다.",
        },
        { status: 400 },
      );
    }

    // send success response
    return NextResponse.json({ success: true });
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
