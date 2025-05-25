import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      nombre,
      correo,
      telefono,
      tipoVia,
      numeroVia,
      municipio,
      barrio,
      codigoPostal,
    } = body;

    if (!nombre || !telefono || !tipoVia || !numeroVia || !municipio) {
      return NextResponse.json(
        { error: "Faltan campos obligatorios" },
        { status: 400 }
      );
    }

    //Insertamos la direccion
    const [direccionResult]: any = await db.query(
      `
      INSERT INTO Direccion (TipoDeVia, NumeroVia, Municipio, Barrio, CodigoPostal)
      VALUES (?, ?, ?, ?, ?)
      `,
      [tipoVia, numeroVia, municipio, barrio || null, codigoPostal || null]
    );

    const codigoDireccion = direccionResult.insertId;

    //Inseramos el proveedor
    await db.query(
      `
      INSERT INTO Proveedroes (Nombre, Correo, NumeroTelefono, CodigoDireccion)
      VALUES (?, ?, ?, ?)
      `,
      [nombre, correo || null, telefono, codigoDireccion]
    );

    return NextResponse.json({ message: "Proveedor registrado correctamente" });
  } catch (error) {
    console.error("Error al registrar proveedor:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
