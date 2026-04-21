import bcrypt from "bcrypt";
import { insertUser, } from "./user.repository";
import { RegisterUserDTO } from "./user.type";
import { AppError } from "../../utility/errorClass";
import { findUserByEmail } from "../users/user.repository"

export const createUser = async (data: RegisterUserDTO) => {

  const normalizedEmail = data.email.trim().toLowerCase();

  const hashedPassword = await bcrypt.hash(data.password, 12);
  try {
    return await insertUser(data.username, normalizedEmail, hashedPassword);
  } catch (error: any) {

    if (error.code === "23505") {
      throw new AppError(
        "Validation failed",
        400,
        [{ field: "email", message: "Email already exists." }]
      );
    }
    throw error;
  }
};


export const login = async (data: RegisterUserDTO) => {
  const normalizedEmail = data.email.trim().toLowerCase();

  const user = await findUserByEmail(normalizedEmail);

  if (!user) {
    throw new AppError("Invalid email or password", 401);
  }

  const isMatch = await bcrypt.compare(
    data.password,
    user.password_hash
  );

  if (!isMatch) {
    throw new AppError("Invalid email or password", 401);
  }

  // remove password before returning
  const { password, ...safeUser } = user;

  return safeUser;
};