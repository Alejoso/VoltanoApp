import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const id = params.id;

  try {
    // Practicamente la misma query de antes, solo que añadimos el where dependiendo del id
    const [pedidoResult]: any = await db.query(
      `
      SELECT 
        hp.CodigoPedido AS id,
        DATE_FORMAT(hp.FechaRealizacion, '%Y-%m-%d') AS fecha,
        e.Nombre AS empleado,
        o.Nombre AS obra,
        hp.PrecioTotalPedido AS total,
        CASE 
          WHEN hp.EmpleadoAprueba IS NULL THEN 'En espera'
          ELSE 'Aceptado'
        END AS estado
      FROM HistorialPedidos hp
      JOIN Empleados e ON hp.EmpleadoRealiza = e.Cedula
      JOIN Obras o ON e.CodigoObra = o.CodigoObra
      WHERE hp.CodigoPedido = ?
      `,
      [id]
    );

    if (pedidoResult.length === 0) {
      return NextResponse.json({ error: "Pedido no encontrado" }, { status: 404 });
    }

    const pedido = pedidoResult[0];

    //Sacamos todos los materiales que esten relacionados al pedido
    const [materialesResult]: any = await db.query(
      `
      SELECT 
        m.Nombre AS nombre,
        mhp.Cantidad AS cantidad
      FROM MaterialHistorialPedidos mhp
      JOIN Materiales m ON mhp.CodigoMaterial = m.CodigoMaterial
      WHERE mhp.CodigoPedido = ?
      `,
      [id]
    );

    pedido.materiales = materialesResult;

    return NextResponse.json(pedido);
  } catch (error) {
    console.error("Error al obtener el pedido:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
