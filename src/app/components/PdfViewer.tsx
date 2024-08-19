"use client";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import styles from './PdfViewer.module.css'; // Importa el archivo CSS

const PdfViewer = ({ url }: any) => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  return (
    <div className={styles.pdfViewerContainer}>
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.10.111/build/pdf.worker.min.js">
        <div className={styles.pdfViewer}>
          <Viewer
            fileUrl={url}
            plugins={[defaultLayoutPluginInstance]}
          />
        </div>
      </Worker>
    </div>
  );
};

export default PdfViewer;