// app/api/auth/users/register/route.ts

import connectMongo from '../../../../lib/mongodb'; // Adjust the path as necessary
import User from '../../../../models/User'; // Adjust the path as necessary
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    await connectMongo();

    const { name, email, mobileNumber, userId, password } = await req.json();

    // Validate input
    if (!name || !email || !mobileNumber || !userId || !password) {
        return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ userId });
        if (existingUser) {
            return NextResponse.json({ error: 'User already exists' }, { status: 400 });
        }

        // Create a new user (hash the password in production)
        const newUser = new User({ name, email, mobileNumber, userId, password });
        await newUser.save();

        return NextResponse.json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error in registration:', error);
        return NextResponse.json({ error: 'Internal Server Error', details: error.message }, { status: 500 });
    }
}
