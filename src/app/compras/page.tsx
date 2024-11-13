// src/app/compras/page.tsx

import path from "path";
import { promises as fs } from "fs";
import ComprasContratista from "../components/Compras/ComprasContratista";
import NavBar from "../components/navbar/NavBar";
// Función para cargar datos desde el archivo JSON en el servidor
async function fetchComprasData() {
  const filePath = path.join(process.cwd(), "src", "data", "compras.json");
  const fileContents = await fs.readFile(filePath, "utf-8");
  return JSON.parse(fileContents);
}

const ComprasPage = async () => {
  const comprasData = await fetchComprasData();

  return (
    <>
      <NavBar />
      <div>
        <ComprasContratista comprasData={comprasData} />
      </div>
    </>
  );
};

export default ComprasPage;
