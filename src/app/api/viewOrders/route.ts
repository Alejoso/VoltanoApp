import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET() {
  try {
    //Query, guarda llos datos AS como lo queremos mostrar en la tabla. El case nos mira si esta null o no, para ver en que estado esta.
    const [rows] = await db.query(`
      SELECT 
        hp.CodigoPedido AS id,
        o.Nombre AS obra,
        e.Nombre AS empleado,
        hp.PrecioTotalPedido AS total,
        CASE 
          WHEN hp.EmpleadoAprueba IS NULL THEN 'En espera'
          ELSE 'Aceptado'
        END AS estado
      FROM HistorialPedidos hp
      JOIN Empleados e ON hp.EmpleadoRealiza = e.Cedula
      JOIN Obras o ON e.CodigoObra = o.CodigoObra
      ORDER BY hp.CodigoPedido DESC
    `);

    return NextResponse.json(rows);
  } catch (error) {
    console.error("Error al obtener pedidos:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
