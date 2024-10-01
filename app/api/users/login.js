// app/api/auth/users/login/route.js

import connectMongo from '../../../lib/mongodb'; // Adjust the path as necessary
import User from '../../../models/User'; // Adjust the path as necessary
import { NextResponse } from 'next/server';

export async function POST(req) {
    await connectMongo();

    const { userId, password } = await req.json();

    // Validate input
    if (!userId || !password) {
        return NextResponse.json({ error: 'User ID and password are required' }, { status: 400 });
    }

    try {
        // Find the user by userId
        const user = await User.findOne({ userId });
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // Check if the password matches
        if (user.password !== password) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }

        // Authentication successful
        return NextResponse.json({ message: 'Login successful', user });
    } catch (error) {
        console.error('Error in login:', error);
        return NextResponse.json({ error: 'Internal Server Error', details: error.message }, { status: 500 });
    }
}
