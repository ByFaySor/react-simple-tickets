import React, { useState, useEffect } from "react";
import PerfilAdmin from "./Admin"
import PerfilUser from "./User"
import { useLocation } from "react-router-dom";

export default function Perfil() {
  const location = useLocation();
  const [rol, setRol] = useState(2);

  useEffect(() => {
    setRol(location.state.rol);
  }, [location]);

  return (
    <div>
      {rol === 1 && (
        <PerfilAdmin />
      )}
      {rol === 2 && (
        <PerfilUser />
      )}
    </div>
  );
}