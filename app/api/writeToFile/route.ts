import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req) {
    const { content } = await req.json();

    // Определяем путь к файлу
    const filePath = path.join(process.cwd(), 'data.txt');

    // Записываем данные в файл
    fs.writeFile(filePath, content, { flag: 'a' }, (err) => {
        if (err) {
            return NextResponse.json({ message: 'Ошибка записи в файл' }, { status: 500 });
        }
    });

    return NextResponse.json({ message: 'Данные успешно записаны' }, { status: 200 });
}