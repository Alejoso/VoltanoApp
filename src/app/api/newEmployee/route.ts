import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      cedula,
      nombre,
      apellidos,
      rol,
      obra,
      usuario,
      password,
      tipoUsuario,
    } = body;

    //Validar campos obligatorios
    if (!cedula || !nombre || !apellidos || !rol || !obra || !usuario || !password || !tipoUsuario) {
      return NextResponse.json({ error: "Faltan campos requeridos" }, { status: 400 });
    }

    //Verificar si ya existe el usuario
    const [usuarioExistente]: any = await db.query(
      "SELECT * FROM Usuarios WHERE NombreUsuario = ?",
      [usuario]
    );
    if (usuarioExistente.length > 0) {
      return NextResponse.json({ error: "El nombre de usuario ya está en uso" }, { status: 409 });
    }

    //Insertar el empleado
    await db.query(
      "INSERT INTO Empleados (Cedula, Nombre, Apellidos, Rol, CodigoObra) VALUES (?, ?, ?, ?, ?)",
      [cedula, nombre, apellidos, rol, obra]
    );

    //Insertar su respectivo usuario
    await db.query(
      "INSERT INTO Usuarios (NombreUsuario, Password, TipoUsuario, CedulaEmpleado) VALUES (?, ?, ?, ?)",
      [usuario, password, tipoUsuario, cedula]
    );

    return NextResponse.json({ message: "Empleado registrado correctamente" });

  } catch (error) {
    console.error("Error al registrar empleado:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
