import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";

interface Imagen {
  id_imagen: number;
  id_categoria: number;
  url_imagen: string;
  nombre_archivo: string;
  fecha_subida: string;
}

interface Categoria {
  id_categoria: number;
  nombre_categoria: string;
  imagen_principal: string;
  descripcion: string | null;
  fecha_creacion: string;
  imagenes: Imagen[];
}

export default function GaleriaComponent() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await axios.get("/api/galeria/galeriaCategoria");
        setCategorias(response.data);
      } catch (error) {
        console.error(error);
        setError("Error al cargar las categorías");
      } finally {
        setLoading(false);
      }
    };

    fetchCategorias();
  }, []);

  if (loading) return <div>Cargando categorías...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {categorias.map((categoria) => (
        <div key={categoria.id_categoria} className="border rounded-lg overflow-hidden shadow-md">
          <Image
            src={categoria.imagen_principal}
            alt={categoria.nombre_categoria}
            width={500}
            height={300}
            className="w-full h-60 object-cover"
            priority={true}
          />
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-2">{categoria.nombre_categoria}</h2>
            <div className="grid grid-cols-3 gap-2">
              {categoria.imagenes.map((imagen) => (
                <Image
                  key={imagen.id_imagen}
                  src={imagen.url_imagen}
                  alt={imagen.nombre_archivo}
                  width={150}
                  height={150}
                  className="object-cover w-full h-32 rounded-lg"
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
