"use client";

import { NavbarUser } from "@/app/components/NavbarUser";
import { useEffect, useState , useRef} from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface Pedido {
  id: number;
  obra: string;
  empleado: string;
  total: number;
  estado: string;
}


export default function VerPedidos() {
    const [pedidos, setPedidos] = useState<Pedido[]>([]);

    const toastShown = useRef(false);
    const router = useRouter(); 

    const [obraFiltro, setObraFiltro] = useState("");
    const [estadoFiltro, setEstadoFiltro] = useState("Todos");
    const [ordenDesc, setOrdenDesc] = useState(true);

  //Hacemos el llamdo a la API para que nos traiga la informacion de los pedidos que necesitamos
  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const res = await fetch("/api/viewOrders");
        const data = await res.json();
        setPedidos(data);
      } catch (error) {
        console.error("Error al cargar pedidos:", error);
      }
    };

    fetchPedidos();

    const datos = localStorage.getItem("usuario"); //Sacar la info del usuario actualmente registrado

    //No hay datos, no se ha registrado
    if (!datos && !toastShown.current) {
      toastShown.current = true;
      toast.error("No tienes permisos para estar en esta vista")
      router.push("/")
    }

  }, []);

  const pedidosFiltrados = pedidos
  .filter((p) =>
      p.obra.toLowerCase().includes(obraFiltro.toLowerCase())
  )
  .filter((p) =>
      estadoFiltro === "Todos" ? true : p.estado === estadoFiltro
  )
  .sort((a, b) =>
      ordenDesc ? b.id - a.id : a.id - b.id
  );

  return (
    <>
        <NavbarUser/>

        <div className="min-h-screen bg-gray-900 text-white p-8">

            {/* Filtro */}

            <div className="flex flex-wrap gap-4 items-center mb-6 bg-white/5 p-4 rounded-xl shadow-md">
                {/* Buscar por obra */}
                <input
                    type="text"
                    placeholder="Filtrar por obra"
                    value={obraFiltro}
                    onChange={(e) => setObraFiltro(e.target.value)}
                    className="px-4 py-2 rounded-xl bg-white text-black placeholder-white/40 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200"
                />

                {/* Filtrar por estado */}
                <select
                    value={estadoFiltro}
                    onChange={(e) => setEstadoFiltro(e.target.value)}
                    className="px-4 py-2 rounded-xl bg-white text-black border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200"
                >
                    <option value="Todos">Todos</option>
                    <option value="En espera">En espera</option>
                    <option value="Aceptado">Aceptado</option>
                </select>

                {/* Botón de orden */}
                <button
                    onClick={() => setOrdenDesc(!ordenDesc)}
                    className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold shadow-md transition duration-200"
                >
                    Orden: {ordenDesc ? "Descendente" : "Ascendente"}
                </button>
            </div>

            {/* Tabla de pedidos */}

            <h1 className="text-3xl font-bold mb-6">Pedidos Realizados</h1>

            <div className="overflow-x-auto">
                <table className="w-full table-auto border-collapse">
                <thead>
                    <tr className="bg-purple-700 text-white">
                    <th className="p-3 text-left">ID</th>
                    <th className="p-3 text-left">Obra</th>
                    <th className="p-3 text-left">Empleado</th>
                    <th className="p-3 text-left">Total</th>
                    <th className="p-3 text-left">Estado</th>
                    </tr>
                </thead>
                <tbody>
                    {pedidosFiltrados.map((p) => (
                    <tr key={p.id} onClick={() => router.push(`/user/viewOrders/${p.id}`)} className="cursor-pointer hover:bg-white/10 transition">
                        <td className="p-3">{p.id}</td>
                        <td className="p-3">{p.obra}</td>
                        <td className="p-3">{p.empleado}</td>
                        <td className="p-3">${p.total}</td>
                        <td className="p-3">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium
                            ${p.estado === "Aceptado" ? "bg-green-600" : "bg-yellow-500 text-black"}`}>
                            {p.estado}
                        </span>
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
        </div>
    </>
  );
}

