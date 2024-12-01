"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";


const EventosPage = () => {
    return (
      <div style={{ padding: "20px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>Gestión de Eventos</h1>
        <p>Esta es la sección de administración de Eventos.</p>
      </div>
    );
  };
  
  export default EventosPage;
  