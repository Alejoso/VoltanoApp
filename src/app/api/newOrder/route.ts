import { NextResponse } from 'next/server';
import db from '@/lib/db';


export async function POST(request: Request) {
  const { materiales , cedulaEmpleado } = await request.json(); // Hace el request del json al front

  try {

    //Crea el pedido con solo la fecha y cedula del empleado
    const [insertResult]: any = await db.query(
        "INSERT INTO HistorialPedidos (FechaRealizacion, EmpleadoRealiza) VALUES (NOW(), ?)",
        [cedulaEmpleado]
    );

    const codigoPedido = insertResult.insertId; //Obtiene el id del pedido

    //Crea la tabla de rompimiento
    for (const item of materiales) {
        await db.query(
            "INSERT INTO MaterialHistorialPedidos (CodigoMaterial, CodigoPedido, Cantidad) VALUES (?, ?, ?)",
            [item.codigo, codigoPedido, item.cantidad]
        )
    }

    //Me calcula el total del pedido
    const [totalResult]: any = await db.query(
        `
        SELECT SUM(m.Precio * mhp.Cantidad) AS total
        FROM MaterialHistorialPedidos mhp
        JOIN Materiales m ON mhp.CodigoMaterial = m.CodigoMaterial
        WHERE mhp.CodigoPedido = ?
        `,
        [codigoPedido]
      );

      const total = totalResult[0].total ?? 0;

      //Actualizar el pedido con el total
      await db.query(
        "UPDATE HistorialPedidos SET PrecioTotalPedido = ? WHERE CodigoPedido = ?",
        [total, codigoPedido]
      );

    return NextResponse.json({ mensaje: 'Pedido insertado con exito'});
  
  } catch (error) {
    console.error('Error en la API de newORder:', error);
    return NextResponse.json({ error: 'Error del servidor' }, { status: 500 });
  }
}
