import { NextRequest, NextResponse } from "next/server";
import { ZodError, z } from "zod";

const Id = z.coerce.number().int();

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const parsedId = Id.parse(params.id);
    if (parsedId === 0) {
      return NextResponse.json({
        id: parsedId,
        title: "프로젝트 1",
        src: "https://www.youtube.com/watch?v=gSSsZReIFRk",
      });
    } else {
      return NextResponse.json(
        {
          error_type: 3,
          error_message: "프로젝트가 존재하지 않습니다.",
        },
        { status: 404 },
      );
    }
  } catch (e) {
    // default: unknown error
    const errorResponse: { status: number; data: unknown } = {
      status: 500,
      data: { error_type: 0, error_message: "Unknown error" },
    };

    // handle zod error
    if (e instanceof ZodError) {
      errorResponse.status = 400;
      errorResponse.data = {
        error_type: 2,
        error_fields: e.issues.map((issue) => ({
          path: [...issue.path, "id"],
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
