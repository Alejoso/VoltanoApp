"use client";
import toast from 'react-hot-toast';
import { useRouter } from "next/navigation";


import React, { useState } from "react";

export default function Login() {

  const router = useRouter();

  //Estructura del json que se le va a pasar a la api
  const [formData, setFormData] = useState({
    usuario: "",
    password: "",
  });

  //Extrae la infromacion de forma dinamica
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      //Se hace un llamado a la api
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

        //Se guarda la informacion del login en una variable local
        localStorage.setItem("usuario", JSON.stringify({
          nombreUsuario: data.nombreUsuario,
          tipo: data.tipoUsuario,
          cedula: data.cedula,
        }));

        //Dependiendo del tipo de usuario lo mandamos a una vista u otra
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
    <main>
    
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-4">

    <div className="flex items-center gap-4 mb-8">
      <span className="text-4xl font-bold text-white tracking-wide">Voltano</span>
      <img
        src="/rayo.png"
        alt="Logo Voltano"
        className="w-16 h-16 rounded-full shadow-md"
      />
    </div>

      <h2 className="text-xl mb-6 text-left w-full max-w-sm">Login</h2>

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
