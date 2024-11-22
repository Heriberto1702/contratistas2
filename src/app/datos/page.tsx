
import React from "react";
import NavBar from "../components/navbar/NavBar";
import UserProfileForm from "../components/UserProfileForm/UserProfileForm"; // Asegúrate de que la ruta sea correcta

const Page = () => {
  return (
    <>
      <NavBar />
      <UserProfileForm /> {/* Muestra el formulario de edición de datos */}
    </>
  );
};

export default Page;