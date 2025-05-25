"use client";

import { Navbar } from "@/app/components/NavbarAdmin";
import { useRouter } from "next/navigation";


import React, { useState } from "react";

export default function admin() {
    const router = useRouter();
  return (

    <>
    <Navbar/>
    <main>
    <div className="flex justify-center items-center min-h-screen bg-gray-900 mt-[-50]">
        <div className="flex flex-col items-center gap-6">
            <button onClick={() => router.push("/user/viewOrders")} className="w-60 h-16 text-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-2xl shadow-lg transition transform duration-200 hover:scale-105">
            Ver pedidos
            </button>

            <button onClick={() => router.push("/admin/modify")} className="w-60 h-16 text-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-2xl shadow-lg transition transform duration-200 hover:scale-105">
            Gestionar pedidos
            </button>

            <button onClick={() => router.push("/admin/add")} className="w-60 h-16 text-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-2xl shadow-lg transition transform duration-200 hover:scale-105">
            Añadir algo
            </button>
        </div>
    </div>

    </main>
    </>
  );
}
