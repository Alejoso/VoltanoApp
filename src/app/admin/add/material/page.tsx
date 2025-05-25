"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Navbar } from "@/app/components/NavbarAdmin";
import {useRouter} from "next/navigation";

export default function material() {
  const [material, setMaterial] = useState({
    nombre: "",
    precio: "",
    proveedor: "",
  });

  const router = useRouter(); 

  const [proveedores, setProveedores] = useState<{ id: number; Nombre: string }[]>([]);

  useEffect(() => {
    const fetchProveedores = async () => {
      const res = await fetch("/api/getSupplier");
      const data = await res.json();
      setProveedores(data);
    };

    fetchProveedores();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setMaterial((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/newMaterial", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(material),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Material registrado correctamente");
        setMaterial({ nombre: "", precio: "", proveedor: "" });
        router.back(); 

      } else {
        toast.error(data.error || "Error al registrar material");
      }
    } catch {
      toast.error("Error de red");
    }
  };

  return (
    <> 
    <Navbar/>
    <main className="min-h-screen bg-gray-900 text-white p-8 flex justify-center items-start">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg w-full max-w-xl shadow-lg space-y-4">
        <h2 className="text-2xl font-bold mb-4">➕ Nuevo Material</h2>

        <input
          type="text"
          name="nombre"
          placeholder="Nombre del material"
          value={material.nombre}
          onChange={handleChange}
          required
          className="w-full p-3 rounded bg-white/10 placeholder-white/40"
        />

        <input
          type="number"
          name="precio"
          placeholder="Precio"
          value={material.precio}
          onChange={handleChange}
          required
          className="w-full p-3 rounded bg-white/10 placeholder-white/40"
        />

        <select
          name="proveedor"
          value={material.proveedor}
          onChange={handleChange}
          required
          className="w-full p-3 rounded bg-white/10 text-white"
        >
          <option value="" className="text-black">Seleccionar proveedor</option>
          {proveedores.map((p) => (
            <option key={p.id} value={p.id} className="text-black ">{p.Nombre}</option>
          ))}
        </select>


        <button
          type="submit"
          className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition"
        >
          Registrar Material
        </button>
      </form>
    </main>
    </>
  );
}
