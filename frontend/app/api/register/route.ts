import User from "@/schema/userSchema";
import { createUserValidationSchema } from "@/formValidationSchemas/userFormSchema";
import { dbConnect } from "@/lib/config";
import { statusCodes, validateData } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import brcyptjs from "bcryptjs";

export async function POST(request: NextRequest) {
  await dbConnect();
  try {
    const reqBody = await request.json();

    const result = validateData(reqBody, createUserValidationSchema);

    if (result.success) {
      const { data } = result;
      const userExist = await User.findOne({ email: data.email });

      if (userExist) {
        return NextResponse.json(
          {
            message: "User already exist",
          },
          {
            status: statusCodes.BAD_REQUEST,
          }
        );
      }

      const hashedPassword = brcyptjs.hashSync(data.password,10);

      await User.create({
        ...data,
        password: hashedPassword,
      });

      return NextResponse.json(
        {
          message: "User created successfully",
        },
        {
          status: statusCodes.CREATED,
        }
      );
    } else {
      return NextResponse.json(
        {
          message: "Error while creating user",
          error: result.error,
        },
        {
          status: statusCodes.BAD_REQUEST,
        }
      );
    }
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
