import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { nombre, precio, proveedor } = body;

    if (!nombre || !precio || !proveedor) {
      return NextResponse.json({ error: "Todos los campos son obligatorios" }, { status: 400 });
    }

    //Se hace el insert del material
    const [materialResult]: any = await db.query(
      "INSERT INTO Materiales (Nombre, Precio) VALUES (?, ?)",
      [nombre, precio]
    );

    const codigoMaterial = materialResult.insertId;

    //Se inserta en MaterialProveedor
    await db.query(
      "INSERT INTO MaterialProveedor (CodigoMaterial, CodigoProveedor) VALUES (?, ?)",
      [codigoMaterial, proveedor]
    );

    return NextResponse.json({ message: "Material registrado correctamente" });
  } catch (error) {
    console.error("Error al registrar material:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
