import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      nombreObra,
      tipoVia,
      numeroVia,
      municipio,
      barrio,
      codigoPostal,
    } = body;

    if (!nombreObra || !tipoVia || !numeroVia || !municipio) {
      return NextResponse.json({ error: "Faltan campos obligatorios" }, { status: 400 });
    }

    // Insertar la nueva direccion
    const [direccionResult]: any = await db.query(
      `
      INSERT INTO Direccion (TipoDeVia, NumeroVia, Municipio, Barrio, CodigoPostal)
      VALUES (?, ?, ?, ?, ?)
      `,
      [tipoVia, numeroVia, municipio, barrio || null, codigoPostal || null]
    );

    const codigoDireccion = direccionResult.insertId; //Sacmos el id de la direccion que acabamos de insertar

    //Insertamos la obra
    await db.query(
      `
      INSERT INTO Obras (Nombre, CodigoDireccion)
      VALUES (?, ?)
      `,
      [nombreObra, codigoDireccion]
    );

    return NextResponse.json({ message: "Obra registrada correctamente" });
  } catch (error) {
    console.error("Error al registrar obra:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
