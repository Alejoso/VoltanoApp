"use client";

import { NavbarUser } from "@/app/components/NavbarUser";
import { useRouter } from "next/navigation";
import { useEffect, useState , useRef } from "react";
import toast from "react-hot-toast";

export default function newOrder() {
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

  //Estructura del json que se le va a pasar a la api
  const [materiales, setMateriales] = useState([
    { codigo: "", cantidad: "" }
  ]);

  //Extrae la infromacion de forma dinamica
  const handleChange = (
    index: number,
    field: "codigo" | "cantidad",
    value: string
  ) => {
    const nuevos = [...materiales];
    nuevos[index][field] = value;
    setMateriales(nuevos);
  
    // Si es la última fila y ya está llena, agrega otra automáticamente
    const esUltimo = index === materiales.length - 1;
    const filaCompleta = nuevos[index].codigo && nuevos[index].cantidad;
  
    if (esUltimo && filaCompleta) {
      setMateriales([...nuevos, { codigo: "", cantidad: "" }]);
    }
  };

  const handleSubmit = async () => {
    // Filtrar materiales que no esten vacios (Ni en cantidad, ni en material)
    const pedidoFiltrado = materiales.filter(
      (m) => m.codigo.trim() !== "" && m.cantidad.trim() !== ""
    );
  
    if (pedidoFiltrado.length === 0) {
      toast.error("Debes ingresar al menos un material con cantidad");
      return;
    }
  
    try {
      const response = await fetch("/api/newOrder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          materiales: pedidoFiltrado,
          cedulaEmpleado: JSON.parse(localStorage.getItem("usuario")!).cedula, 
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        toast.success("Pedido enviado con éxito");
        setMateriales([{ codigo: "", cantidad: "" }]);
      } else {
        toast.error(data.error || "Error al guardar el pedido");
      }
    } catch (error) {
      console.error("Error al enviar el pedido:", error);
      toast.error("Error al conectar con el servidor");
    }
  };
  

  const [materialesDisponibles, setMaterialesDisponibles] = useState<
  { codigo: string; nombre: string }[]
  >([]);
  
  //Llamado a la api para que nos haga una query y traiga todos los materiales
  useEffect(() => {
    const fetchMateriales = async () => {
      try {
        const res = await fetch("/api/getMaterials");
        const data = await res.json();
        setMaterialesDisponibles(data);
      } catch (error) {
        console.error("Error cargando materiales", error);
      }
    };
  
    fetchMateriales();
  }, []);

  return (

    <>
    <NavbarUser/>

  <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-start px-4 pt-20 text-white">

  <h1 className="text-3xl font-bold mb-8">Nuevo Pedido</h1>

  <div className="bg-gray-800 p-6 rounded-xl shadow-lg w-full max-w-2xl flex flex-col gap-4">

    {materiales.map((item, index) => (
      <div key={index} className="flex gap-4 items-center">
       <select
        value={item.codigo}
        onChange={(e) => handleChange(index, "codigo", e.target.value)}
        className="w-full px-4 py-2 rounded-xl bg-white/10 text-white placeholder-white/40 border border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-400 transition duration-200 shadow-md"
        >
        {!item.codigo && (
          <option value="" disabled>
            Seleccionar material
          </option>
        )}
        {materialesDisponibles.map((mat) => (
          <option key={mat.codigo} value={mat.codigo} className="text-black">
            {mat.nombre}
          </option>
        ))}
      </select>

        <input
          type="number"
          placeholder="Cantidad"
          value={item.cantidad}
          onChange={(e) => handleChange(index, "cantidad", e.target.value)}
          className="w-32 px-4 py-2 rounded-xl bg-white/10 text-white placeholder-white/40 border border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-400 transition duration-200 shadow-md"
        />

      </div>
    ))}

  </div>
    <button
    onClick={handleSubmit}
    className="mt-6 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl shadow-lg transition duration-200 hover:scale-105"
  >
    Hacer Pedido
    </button>
  </div>
  </>
  );
}
