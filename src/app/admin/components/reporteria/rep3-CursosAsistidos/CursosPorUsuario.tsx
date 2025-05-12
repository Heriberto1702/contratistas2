"use client";
import React, { useState, useEffect } from 'react';
import styles from "./CursosPorUsuario.module.css";
import Cargando from '@/app/components/Cargando/Cargando';
import * as XLSX from "xlsx";

interface Curso {
  id_curso: number;
  nombre_curso: string;
  tipo_curso: string;
  especialista: string;
  avance: number;
  estado: string;
}

interface Usuario {
  id_contratista: number;
  nombre_completo: string;
  email: string;
  cedula: string | null;
  cedula_logueado: string | null;
  ruc: string | null;
  cursos: Curso[];
}

export default function ReporteCursos() {
  const [data, setData] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedRows, setExpandedRows] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/reporteria/cursos_por_contratista");
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const toggleRow = (id_contratista: number) => {
    setExpandedRows(prev => 
      prev.includes(id_contratista)
        ? prev.filter(id => id !== id_contratista)
        : [...prev, id_contratista]
    );
  };

  const filteredData = data.filter(usuario => {
    const nombre = usuario.nombre_completo?.toLowerCase() || '';
    const email = usuario.email?.toLowerCase() || '';
    const cedula = usuario.cedula?.toLowerCase() || '';
    const cedulaLogueado = usuario.cedula_logueado?.toLowerCase() || '';
    const ruc = usuario.ruc?.toLowerCase() || '';
    const searchTermLower = searchTerm.toLowerCase();

    return nombre.includes(searchTermLower) ||
           email.includes(searchTermLower) ||
           cedula.includes(searchTermLower) ||
           cedulaLogueado.includes(searchTermLower) ||
           ruc.includes(searchTermLower);
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredData.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    setExpandedRows([]); // Reset expanded rows when changing pages
  };

  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page when changing items per page
    setExpandedRows([]); // Reset expanded rows
  };

  if (loading) {
    return <Cargando />;
  }
  const exportToExcel = () => {
    const wb = XLSX.utils.book_new();
  
    // Crear una fila de encabezado para el reporte de todos los usuarios
    const encabezado = [
      "Nombre",
      "Email",
      "Cédula",
      "Curso Inscrito",
      "Avance",
      "Estado"
    ];
  
    // Mapear los usuarios a un formato adecuado para la exportación
    const usuariosParaExportar = data.flatMap((usuario) => {
      // Si el usuario tiene cursos inscritos, procesamos la información de cada uno
      if (usuario.cursos.length > 0) {
        return usuario.cursos.map((curso) => [
          usuario.nombre_completo,
          usuario.email,
          usuario.cedula_logueado || usuario.cedula || usuario.ruc || "-",
          curso.nombre_curso,
          `${curso.avance}%`,
          curso.estado,
        ]);
      } else {
        // Si no tiene cursos, incluir solo una fila por usuario sin cursos
        return [
          [
            usuario.nombre_completo,
            usuario.email,
            usuario.cedula_logueado || usuario.cedula || usuario.ruc || "-",
            "No tiene cursos inscritos",
            "-",
            "-",
          ]
        ];
      }
    });
  
    // Crear la hoja de Excel
    const ws = XLSX.utils.aoa_to_sheet([encabezado, ...usuariosParaExportar]);
  
    // Agregar la hoja de Excel al libro
    XLSX.utils.book_append_sheet(wb, ws, "ReporteCursosPorContratistas");
  
    // Exportar el archivo
    XLSX.writeFile(wb, "Reporte_Cursos_Por_Contratistas.xlsx");
  };
  

  return (
    <div className={styles.container}>
      <>
        <div className={styles.header}>
          <h2 className={styles.title}>📊 Detalle de cursos por contratistas</h2>
          <button onClick={exportToExcel} className={styles.excelButton}>
            Descargar Excel 📥
          </button>
        </div>

        <div className={styles.controlsContainer}>
          <div className={styles.searchContainer}>
          <span className={styles.searchIcon}></span>
            <input
              type="text"
              placeholder="Buscar Contratista"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
            
          </div>

          <div className={styles.itemsPerPageContainer}>
            <label htmlFor="itemsPerPage">Mostrar:</label>
            <select
              id="itemsPerPage"
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
              className={styles.itemsPerPageSelect}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
            <span>registros por página</span>
          </div>
        </div>

        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th></th>
                <th>Nombre</th>
                <th>Email</th>
                <th>Cédula</th>
                <th>Cursos Inscritos</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((usuario) => (
                <React.Fragment key={usuario.id_contratista}>
                  <tr 
                    className={styles.userRow}
                    onClick={() => toggleRow(usuario.id_contratista)}
                  >
                    <td>
                      <button className={styles.expandButton}>
                        {expandedRows.includes(usuario.id_contratista) ? '▼' : '▶'}
                      </button>
                    </td>
                    <td data-label="Nombre">{usuario.nombre_completo || '-'}</td>
                    <td data-label="Email">{usuario.email || '-'}</td>
                    <td data-label="Cédula">
                      {usuario.cedula ? usuario.cedula : usuario.cedula_logueado || usuario.ruc || '-'}
                    </td>
                    <td data-label="Cursos Inscritos">{usuario.cursos?.length || 0}</td>
                  </tr>
                  {expandedRows.includes(usuario.id_contratista) && (
                    <tr className={styles.expandedRow}>
                      <td colSpan={5}>
                        <div className={styles.cursosContainer}>
                          {usuario.cursos?.map((curso) => (
                            <div key={curso.id_curso} className={styles.cursoCard}>
                              <h3>{curso.nombre_curso || '-'}</h3>
                              <p>
                                <strong>Especialista:</strong> {curso.especialista || '-'}
                                <br />
                                <strong>Estado:</strong> {curso.estado || '-'}
                              </p>
                              <div className={styles.progressContainer}>
                                <div 
                                  className={styles.progressBar}
                                  style={{ width: `${curso.avance || 0}%` }}
                                >
                                  {curso.avance || 0}%
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>

        <div className={styles.paginationContainer}>
          <button
            className={styles.paginationButton}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Anterior
          </button>

          <div className={styles.pageNumbers}>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                className={`${styles.pageButton} ${currentPage === page ? styles.activePage : ''}`}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            className={styles.paginationButton}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Siguiente
          </button>
        </div>
      </>
    </div>
  );
}
