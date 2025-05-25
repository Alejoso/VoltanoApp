import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;
    const body = await req.json();
    const { cedula } = body;

    if (!cedula) {
        return NextResponse.json({ error: "Falta la cédula" }, { status: 400 });
    }

    try {
        const [result]: any = await db.query(
        "UPDATE HistorialPedidos SET EmpleadoAprueba = ? WHERE CodigoPedido = ?", //Update del pedido con la cedula en el id de pedido actual
        [cedula, id]
        );

        if (result.affectedRows === 0) {
        return NextResponse.json({ error: "Pedido no encontrado" }, { status: 404 });
        }

        return NextResponse.json({ message: "Pedido aprobado con éxito" });
    } catch (error) {
        console.error("Error al aprobar pedido:", error);
        return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
    }
}
