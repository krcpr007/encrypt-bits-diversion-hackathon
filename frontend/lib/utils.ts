import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { ZodSchema } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const statusCodes = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  UNAUTHORIZED: 401,
  INTERNAL_SERVER_ERROR: 500,
};

export const validateData = (data: any, validationSchema: ZodSchema) => {
  const isValidData = validationSchema.safeParse(data);

  if (!isValidData.success) {
    return {
      success: false,
      error: isValidData.error.issues.map((issue) => {
        return {
          path: issue.path[0],
          message: issue.message,
        };
      }),
    };
  }
  return {
    success: true,
    data: isValidData.data,
  };
};
