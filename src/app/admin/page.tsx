"use client";

import { Navbar } from "@/app/components/NavbarAdmin";
import { useRouter } from "next/navigation";
import { useEffect, useState , useRef } from "react";
import toast from "react-hot-toast";

export default function admin() {
    const router = useRouter();
    const toastShown = useRef(false); //Para evitar que el toast se muestre mas de una vez

    const [nombre, setNombre] = useState("");
    let tipo = ""

  useEffect(() => {

    const datos = localStorage.getItem("usuario"); //Sacar la info del usuario actualmente registrado

    //No hay datos, no se ha registrado
    if (!datos && !toastShown.current) {
      toastShown.current = true;
      toast.error("No tienes permisos para estar en esta vista")
      router.push("/")
    }

    //Sacar los datos del json del usuario
    if (datos) {
      const usuario = JSON.parse(datos);
      setNombre(usuario.nombreUsuario);
      tipo = usuario.tipo;
    }

    //Si no es de admin, pailas
    if(tipo !== "admin" && !toastShown.current)
      {
        toastShown.current = true;
        toast.error("No tienes permisos para estar en esta vista")
        if(tipo === ""){
          router.push("/")
        } else {
          router.push("/user")
        }
        
      }
  }, []);

  return (

    <>
    <Navbar/>
    <main>
      <div className="flex justify-center items-center min-h-screen bg-gray-900 mt-[-50px]">
        <div className="flex flex-col items-center gap-8">
          
          {/* Título centrado */}
          <div className="flex items-center">
            <span className="text-4xl font-bold text-white tracking-wide">
              Bienvenido, {nombre}
            </span>
          </div>

          {/* Botones */}
          <div className="flex flex-col items-center gap-6">
            <button
              onClick={() => router.push("/admin/modify")}
              className="w-60 h-16 text-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-2xl shadow-lg transition transform duration-200 hover:scale-105"
            >
              Gestionar pedidos
            </button>

            <button
              onClick={() => router.push("/admin/add")}
              className="w-60 h-16 text-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-2xl shadow-lg transition transform duration-200 hover:scale-105"
            >
              Añadir algo
            </button>
          </div>
        </div>
      </div>
    </main>

    </>
  );
}
