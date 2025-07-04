import bcryptjs from "bcryptjs";

export async function hashPassword(password){
  return await bcryptjs.hash(password, 12);
}

export async function verifyPassword(password, hashedPassword){
  return await bcryptjs.compare(password, hashedPassword);
}
