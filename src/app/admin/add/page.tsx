"use client";

import { Navbar } from "@/app/components/NavbarAdmin";
import { useRouter } from "next/navigation";


import React, { useState } from "react";

export default function add() {
    const router = useRouter();
  return (

    <>
    <Navbar/>
    <main>
    <div className="flex justify-center items-center min-h-screen bg-gray-900 mt-[-50]">
        <div className="flex flex-col items-center gap-6">
            <h1>Que desea añadir?</h1>

            <button onClick={() => router.push("/admin/add/supplier")} className="w-60 h-16 text-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-2xl shadow-lg transition transform duration-200 hover:scale-105">
            Proveedor
            </button>

            <button onClick={() => router.push("/admin/add/material")} className="w-60 h-16 text-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-2xl shadow-lg transition transform duration-200 hover:scale-105">
            Material
            </button>

            <button onClick={() => router.push("/admin/add/construction")} className="w-60 h-16 text-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-2xl shadow-lg transition transform duration-200 hover:scale-105">
            Obra
            </button>

            <button onClick={() => router.push("/admin/add/employee")} className="w-60 h-16 text-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-2xl shadow-lg transition transform duration-200 hover:scale-105">
            Empleado
            </button>
        </div>
    </div>

    </main>
    </>
  );
}
