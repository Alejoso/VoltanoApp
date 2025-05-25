"use client";

import { useEffect, useState , useRef} from "react";
import { useParams } from "next/navigation";
import {useRouter} from "next/navigation";

export default function DetallePedido() {
    const { id } = useParams();
    const [pedido, setPedido] = useState<any>(null);
    const router = useRouter(); 


    //Llamado a la api para sacar la informacion del pedido con el id
    useEffect(() => {
        const fetchDetalle = async () => {
        const res = await fetch(`/api/viewOrders/${id}`);
        const data = await res.json();
        setPedido(data);
        };
        fetchDetalle();
    }, [id]);

    if (!pedido) {
        return (
          <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
            <p className="text-xl text-white/80 animate-pulse">Cargando pedido...</p>
          </div>
        );
      }
      
    return (
        <div className="min-h-screen bg-gray-900 text-white flex justify-center items-start pt-20 px-4">
            <div className="bg-gray-800 w-full max-w-xl rounded-xl shadow-lg p-8">

                <h1 className="text-3xl font-bold mb-6">📄 Detalle del Pedido #{pedido.id}</h1>

                <div className="space-y-2 text-lg">
                <p><span className="font-semibold">🏗️ Obra:</span> {pedido.obra}</p>
                <p><span className="font-semibold">👷 Empleado:</span> {pedido.empleado}</p>
                <p><span className="font-semibold">📅 Fecha:</span> {pedido.fecha}</p>
                <p><span className="font-semibold">💰 Total:</span> ${pedido.total}</p>
                <p>
                    <span className="font-semibold">📌 Estado:</span>{" "}
                    <span className={`px-3 py-1 rounded-full text-sm font-medium
                    ${pedido.estado === "Aceptado" ? "bg-green-600" : "bg-yellow-400 text-black"}`}>
                    {pedido.estado}
                    </span>
                </p>
                </div>

                <h2 className="mt-8 text-2xl font-semibold">📦 Materiales:</h2>
                <ul className="mt-4 space-y-2 pl-5 list-disc text-base">
                {pedido.materiales.map((mat: any, i: number) => (
                    <li key={i} className="text-white/90">
                    {mat.nombre} - <span className="font-medium">{mat.cantidad} unidades</span>
                    </li>
                ))}
                </ul>

                <div className="mt-8">
                <button
                    onClick={() => router.back()}
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg shadow transition"
                >
                    Volver
                </button>
                </div>
            </div>
        </div>
    );
    }
