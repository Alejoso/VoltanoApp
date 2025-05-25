import { NextResponse } from 'next/server';
import db from '@/lib/db';


export async function POST(request: Request) {
  const { nombreUsuario, password } = await request.json();

  try {
    const [rows]: any = await db.query(
      'SELECT * FROM Usuarios WHERE NombreUsuario = ?', // ?' Es un placeholder, se usa por seguridad para evitar sql injection
      [nombreUsuario]
    );

    console.log(password)

    // Si esta vacio, no encontro
    if (rows.length === 0) {
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 401 });
    }

    const usuario = rows[0];

    const passwordValida = password === usuario.Password

    if (!passwordValida) {
      return NextResponse.json({ error: 'Contraseña incorrecta' }, { status: 401 });
    }

    return NextResponse.json({ mensaje: 'Login exitoso', tipoUsuario: usuario.TipoUsuario });
  } catch (error) {
    console.error('Error en la API de login:', error);
    return NextResponse.json({ error: 'Error del servidor' }, { status: 500 });
  }
}
