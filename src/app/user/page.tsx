"use client";

import { NavbarUser } from "@/app/components/NavbarUser";
import { useRouter } from "next/navigation";
import { useEffect, useState , useRef } from "react";
import toast from "react-hot-toast";

export default function admin() {
    const router = useRouter();
    const toastShown = useRef(false); //Para evitar que el toast se muestre mas de una vez

    const [nombre, setNombre] = useState("");

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
    }
    
  }, []);

  return (

    <>
    <NavbarUser/>
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

          <button
              onClick={() => router.push("/user/newOrder")}
              className="w-60 h-16 text-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-2xl shadow-lg transition transform duration-200 hover:scale-105"
            >
              Nuevo pedido
            </button>


          <div className="flex flex-col items-center gap-6">
            <button
              onClick={() => router.push("/user/viewOrders")}
              className="w-60 h-16 text-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-2xl shadow-lg transition transform duration-200 hover:scale-105"
            >
              Ver pedidos
            </button>

          </div>
        </div>
      </div>

    </main>
    </>
  );
}
