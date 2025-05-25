"use client";
import { Navbar } from "@/app/components/NavbarAdmin";


import React, { useState } from "react";

export default function modify() {
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
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log("Respuesta de la API:", data);
    } catch (error) {
      console.error("Error al enviar:", error);
    }
  };

  return (

    <>
    <Navbar/>
    <main>
    
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-4 mt-[-50px]">

      
        <h1>Pedidos realizados</h1>
      
    </div>
    
    </main>
    </>
  );
}
