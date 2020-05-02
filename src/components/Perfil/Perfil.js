import React, { lazy, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const PerfilAdmin = lazy(() => import("./Admin"));
const PerfilUser = lazy(() => import("./User"));

export default function Perfil() {
  const location = useLocation();
  const [rol, setRol] = useState(0);

  useEffect(() => {
    setRol(location.state.rol);
  }, [location]);

  return (
    <React.Suspense fallback="Cargando, espere un momento ...">
      <div>
        {rol === 1 && (
          <PerfilAdmin />
        )}
        {rol === 2 && (
          <PerfilUser />
        )}
      </div>
    </React.Suspense>
  );
}