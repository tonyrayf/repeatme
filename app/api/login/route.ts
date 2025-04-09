import { NextResponse } from 'next/server';
import users from '../../users.json';

export async function POST(req: Request) {
    const { login, password } = await req.json();

    const user = users.find(user => user.login === login && user.password === password);

    if (user) {
        return NextResponse.json({ message: 'Успешный вход' }, { status: 200 });
    } else {
        return NextResponse.json({ message: 'Неверный логин или пароль' }, { status: 401 });
    }
}