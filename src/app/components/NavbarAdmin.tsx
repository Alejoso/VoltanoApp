"use client";

import React from "react";
import { useRouter } from "next/navigation";

export const Navbar = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("usuario"); // En caso de darle a salir, borra los datos del login
    router.push("/");
  };

  return (
    <nav className="w-full h-16 bg-gray-900 text-white flex justify-between items-center px-6 shadow-md">
      {/* Botones de la izquierda */}
      <div className="flex gap-6 items-center">
        <button onClick={() => router.push("/admin")} className="hover:underline" >
          Inicio
        </button>
        <button onClick={() => router.push("/admin/modify")} className="hover:underline">
          Gestionar pedidos
        </button>
        <button onClick={() => router.push("/admin/add")} className="hover:underline">
          Añadir algo
        </button>
        <button onClick={handleLogout} className="hover:underline text-red-400">
          Salir
        </button>
      </div>

      {/* Logo y título a la derecha */}
      <div className="flex items-center gap-2">
        <span className="text-lg font-bold">Voltano</span>
        <img src="/rayo.png" alt="Rayo voltano" className="w-8 h-8 rounded-full" />
      </div>
    </nav>
  );
};
