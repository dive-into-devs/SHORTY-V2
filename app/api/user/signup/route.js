import {NextResponse} from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import {hashPassword} from "@/lib/auth";

export async function POST(request){
  const body = await request.json();
  const {name, email, password} = body;
  if(!name || !email || !password){
    return NextResponse.json({error: "All fields are required"}, {status: 400});
  }
  await connectDB();
  const existingUser = await User.find ({email});
  if(existingUser.length > 0){
    return NextResponse.json({error: "User already exists"}, {status: 400});
  }
  const hashed = await hashPassword(password);
  const newUser = User.create({
    name,
    email,
    password: hashed,
  });
  // Note: You might want to return the user data or token here for further use
  return NextResponse.json({message: "User created successfully", user: {id: newUser._id, name: newUser.name, email: newUser.email}}, {status: 201});
}
