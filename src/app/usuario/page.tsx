"use client";
import NavBar from "../components/navbar/NavBar";
import UserProfileForm from "../components/UserProfileForm/UserProfileForm";
import Breadcrumbs from "../components/Breadcrumbs/breadcrumbs";
import { Suspense } from "react";
const UserDashboard = () => {
    return (
    <>
      <NavBar />
      <Suspense>

      <Breadcrumbs />
      </Suspense>
          <UserProfileForm />
        
    </>
  );
};

export default UserDashboard;
