import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import path from 'path';

export async function GET() {
    const pythonPath = path.join(process.cwd(), 'backend/.venv/Scripts/python.exe');
    const scriptPath = path.join(process.cwd(), 'backend/files/connect_repeat.py');

    return new Promise((resolve) => {
        exec(`${pythonPath} ${scriptPath}`, (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                return resolve(NextResponse.json({ error: 'Error executing script' }, { status: 500 }));
            }
            resolve(NextResponse.json({ output:stdout }));
        });
    });
}