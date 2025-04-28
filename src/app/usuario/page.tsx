"use client";
import NavBar from "../components/navbar/NavBar";
import UserProfileForm from "../components/UserProfileForm/UserProfileForm";
import Breadcrumbs from "../components/Breadcrumbs/breadcrumbs";
const UserDashboard = () => {
    return (
    <>
      <NavBar />
      <Breadcrumbs />
          <UserProfileForm />
        
    </>
  );
};

export default UserDashboard;
