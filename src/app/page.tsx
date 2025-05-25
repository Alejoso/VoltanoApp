"use client";
import { Navbar } from "@/app/components/NavbarAdmin";
import toast from 'react-hot-toast';
import { useRouter } from "next/navigation";


import React, { useState } from "react";

export default function Login() {

  const router = useRouter();

  const [formData, setFormData] = useState({
    usuario: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Simulando un envío a API
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombreUsuario: formData.usuario,
          password: formData.password,
        }),
      });      

      const data = await response.json();
      
      if (response.ok) {
        toast.success("Inicio de sesión exitoso");

        if (data.tipoUsuario === 'normal')
        {
          router.push("/user")
        }
        else
        {
          router.push("/admin")
        }

      } else {
        toast.error(data.error || "Error desconocido");
      }
      
      
    } catch (error) {
      console.error("Error al enviar:", error);
      toast.error("Error al conectar con el servidor");
    }
  };

  return (

    <>
    <Navbar/>
    <main>
    
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-4 mt-[-50px]">

      

      <h2 className="text-xl mb-6">Login</h2>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm flex flex-col gap-4"
      >
        <input
          type="usuario"
          name="usuario"
          placeholder="Usuario"
          value={formData.usuario}
          onChange={handleChange}
          className="h-12 px-4 rounded-md text-black"
        />

        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={formData.password}
          onChange={handleChange}
          className="h-12 px-4 rounded-md text-black"
        />

        <button
          type="submit"
          className="h-12 rounded-md bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-2xl shadow-lg transition transform duration-200 hover:scale-105"
        >
          Ingresar
        </button>
      </form>
    </div>
    
    </main>
    </>
  );
}
