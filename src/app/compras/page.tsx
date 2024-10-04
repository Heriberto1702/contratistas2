// src/app/compras/page.tsx

import path from "path";
import { promises as fs } from "fs";
import ComprasContratista from "../components/Compras/ComprasContratista";
import Image from "next/image";
import Link from "next/link";
import GoogleSheetData from "../components/GoogleSheetData/GoogleSheetData";
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
      <header>
        <nav>
          <div>
            <Link href="/">
              <Image
                src="/logoContratista.png"
                alt="logo-Contratista"
                width={182}
                height={119}
              />
            </Link>
          </div>
          <div>
            <Link href="/compras">Compras</Link>
            <Link href="/academia">Academia para Contratistas</Link>
            <Link href="/documentosutiles">Documentos útiles</Link>
            <Link href="/cuenta">Cuenta</Link>
          </div>
        </nav>
      </header>
      <div>
        <ComprasContratista comprasData={comprasData} />
        <GoogleSheetData />
      </div>
    </>
  );
};

export default ComprasPage;
