import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  try {

    //Primero borramos los materiales de historial de pedidos asociados al pedido


    const [result]: any = await db.query(
      "CALL EliminarPedidoYMateriales(?)",[id] //Borramos el pedido con el id
    );

    if (result.affectedRows === 0) {
      return NextResponse.json({ error: "Pedido no encontrado" }, { status: 404 });
    }

    return NextResponse.json({ message: "Pedido eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar pedido:", error);
    return NextResponse.json({ error: "Error al eliminar pedido" }, { status: 500 });
  }
}
