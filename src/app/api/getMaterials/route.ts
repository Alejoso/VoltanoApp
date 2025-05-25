import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET() {
  try {

    const [rows] = await db.query("SELECT CodigoMaterial AS codigo, Nombre AS nombre FROM Materiales"); //Nos devuelve todos los materiales
    return NextResponse.json(rows);

  } catch (error) {

    console.error("Error al obtener materiales:", error);
    return NextResponse.json({ error: "Error al obtener materiales" }, { status: 500 });

  }
}
