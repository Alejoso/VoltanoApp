import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET() {
  try {
    const [rows] = await db.query("SELECT CodigoObra AS id, Nombre FROM Obras");
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
