"use client";
import { Navbar } from "@/app/components/NavbarAdmin";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function construction() {
    const router = useRouter();

    const [formData, setFormData] = useState({
        nombreObra: "",
        tipoVia: "",
        numeroVia: "",
        municipio: "",
        barrio: "",
        codigoPostal: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
        const res = await fetch("/api/newConstruction", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        const data = await res.json();

        if (res.ok) {
            toast.success("Obra registrada correctamente");
            router.back(); 
            
        } else {
            toast.error(data.error || "Error al registrar la obra");
        }
        } catch (err) {
        toast.error("Error de conexión con el servidor");
        }
    };

  return (

    <>
    <Navbar/>

    <main className="min-h-screen bg-gray-900 text-white p-8 flex justify-center items-start">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg w-full max-w-xl shadow-lg space-y-4">
        <h2 className="text-2xl font-bold mb-4">➕ Nueva Obra</h2>

        <input
          type="text"
          name="nombreObra"
          placeholder="Nombre de la obra"
          value={formData.nombreObra}
          onChange={handleChange}
          required
          className="w-full p-3 rounded bg-white/10 placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        <input
          type="text"
          name="tipoVia"
          placeholder="Tipo de vía (Ej: Calle, Carrera)"
          value={formData.tipoVia}
          onChange={handleChange}
          required
          className="w-full p-3 rounded bg-white/10 placeholder-white/40"
        />

        <input
          type="text"
          name="numeroVia"
          placeholder="Número de vía (Ej: 34 #54-35)"
          value={formData.numeroVia}
          onChange={handleChange}
          required
          className="w-full p-3 rounded bg-white/10 placeholder-white/40"
        />

        <input
          type="text"
          name="municipio"
          placeholder="Municipio"
          value={formData.municipio}
          onChange={handleChange}
          required
          className="w-full p-3 rounded bg-white/10 placeholder-white/40"
        />

        <input
          type="text"
          name="barrio"
          placeholder="Barrio (opcional)"
          value={formData.barrio}
          onChange={handleChange}
          className="w-full p-3 rounded bg-white/10 placeholder-white/40"
        />

        <input
          type="text"
          name="codigoPostal"
          placeholder="Código Postal (opcional)"
          value={formData.codigoPostal}
          onChange={handleChange}
          className="w-full p-3 rounded bg-white/10 placeholder-white/40"
        />

        <button
          type="submit"
          className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition"
        >
          Registrar Obra
        </button>
      </form>
    </main>
    </>
  );
}
