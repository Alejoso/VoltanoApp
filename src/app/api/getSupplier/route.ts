import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET() {
  try {

    const [rows] = await db.query(
      "SELECT CodigoProveedor AS id, Nombre FROM Proveedroes"
    );
    
    return NextResponse.json(rows);
  } catch (error) {
    console.error("Error al obtener proveedores:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
