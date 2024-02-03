import User from "@/schema/userSchema";
import { loginValidationSchema } from "@/formValidationSchemas/userFormSchema";
import { dbConnect } from "@/lib/config";
import { statusCodes, validateData } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import brcyptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
  await dbConnect();
  try {
    const reqBody = await request.json();
    const result = validateData(reqBody, loginValidationSchema);

    if (!result.success) {
      return NextResponse.json(
        {
          message: "Error while logging in",
          error: result.error,
        },
        {
          status: statusCodes.BAD_REQUEST,
        }
      );
    }

    const { data } = result;

    const userExist = await User.findOne({ email: data.email });

    if (!userExist) {
      return NextResponse.json(
        {
          message: "User does not exist",
        },
        {
          status: statusCodes.BAD_REQUEST,
        }
      );
    }

    const isValidPassword = brcyptjs.compareSync(
      data.password,
      userExist.password
    );

    if (!isValidPassword) {
      return NextResponse.json(
        {
          message: "Invalid password",
        },
        {
          status: statusCodes.BAD_REQUEST,
        }
      );
    }

    const token = jwt.sign(
      {
        id: userExist._id,
        email: userExist.email,
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: "1d",
      }
    );

    const response = NextResponse.json(
      {
        message: "User logged in successfully",
      },
      {
        status: statusCodes.OK,
      }
    );

    response.cookies.set("auth", token, {
      httpOnly: true,
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      {
        message: "Internal Server Error",
      },
      {
        status: statusCodes.INTERNAL_SERVER_ERROR,
      }
    );
  }
}
