"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Navbar } from "@/app/components/NavbarAdmin";
import { useRouter } from "next/navigation";

export default function employee() {
    const [obras, setObras] = useState<{ id: number; Nombre: string }[]>([]);
    const router = useRouter(); 
    const [formData, setFormData] = useState({
        cedula: "",
        nombre: "",
        apellidos: "",
        rol: "",
        obra: "",
        usuario: "",
        password: "",
        tipoUsuario: "normal",
    });

    useEffect(() => {
        const fetchObras = async () => {
        const res = await fetch("/api/getConstruction");
        const data = await res.json();
        setObras(data);
        };
        fetchObras();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
        const res = await fetch("/api/newEmployee", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        const data = await res.json();
        if (res.ok) {
            toast.success("Empleado registrado correctamente");
            setFormData({
            cedula: "",
            nombre: "",
            apellidos: "",
            rol: "",
            obra: "",
            usuario: "",
            password: "",
            tipoUsuario: "normal",
            });

            router.back();
        } else {
            toast.error(data.error || "Error al registrar empleado");
        }
        } catch {
        toast.error("Error al conectar con el servidor");
        }
    };

  return (
    <>
    <Navbar/>
    <main className="min-h-screen bg-gray-900 text-white p-8 flex justify-center items-start">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg w-full max-w-xl shadow-lg space-y-4">
        <h2 className="text-2xl font-bold mb-4">➕ Nuevo Empleado</h2>

        <input type="text" name="cedula" placeholder="Cédula" value={formData.cedula} onChange={handleChange} required className="w-full p-3 rounded bg-white/10" />
        <input type="text" name="nombre" placeholder="Nombre" value={formData.nombre} onChange={handleChange} required className="w-full p-3 rounded bg-white/10" />
        <input type="text" name="apellidos" placeholder="Apellidos" value={formData.apellidos} onChange={handleChange} required className="w-full p-3 rounded bg-white/10" />
        <input type="text" name="rol" placeholder="Rol del empleado" value={formData.rol} onChange={handleChange} required className="w-full p-3 rounded bg-white/10" />

        <select name="obra" value={formData.obra} onChange={handleChange} required className="w-full p-3 rounded bg-white/10 text-white">
          <option value="" className="text-black">Seleccionar obra</option>
          {obras.map((o) => (
            <option key={o.id} value={o.id} className="text-black">{o.Nombre}</option>
          ))}
        </select>

        <hr className="border-white/20" />

        <input type="text" name="usuario" placeholder="Usuario" value={formData.usuario} onChange={handleChange} required className="w-full p-3 rounded bg-white/10" />
        <input type="password" name="password" placeholder="Contraseña" value={formData.password} onChange={handleChange} required className="w-full p-3 rounded bg-white/10" />

        <select name="tipoUsuario" value={formData.tipoUsuario} onChange={handleChange} required className="w-full p-3 rounded bg-white/10 text-white">
          <option value="normal" className="text-black">Normal</option>
          <option value="admin" className="text-black">Administrador</option>
        </select>

        <button type="submit" className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition">Registrar Empleado</button>
      </form>
    </main>
    </>
  );
}
