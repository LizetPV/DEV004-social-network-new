/* import { app, db } from './Firebase/firebase.js'; */
const LOCAL_ROUTES = {};
/* La función onNavigate se encarga de navegar entre las diferentes rutas de la aplicación.
Toma como parámetro pathname, que es la ruta que se quiere navegar, y updateHistory, que es un valor booleano
que indica si se debe actualizar el historial de navegación del navegador. */
export const onNavigate = (pathname, updateHistory = true) => {
  // Primero, comprueba si la ruta existe en LOCAL_ROUTES. Si no existe, redirige a la página de inicio (ruta '/').
  const path = typeof LOCAL_ROUTES[pathname] !== 'function' ? pathname : '/';

  /* Actualiza el historial de navegación con window.history.pushState() si updateHistory es verdadero.
  Esta función agrega una nueva URL, lo que permite al usuario utilizar
  los botones de retroceso y avance para navegar por la aplicación. */
  if (updateHistory) {
    window.history.pushState({}, path, window.location.origin + pathname);
  }

  /* Limpia el contenido de la sección raíz de la página (elemento HTML con ID "root")
  y agrega el componente correspondiente a la ruta especificada en LOCAL_ROUTES. */
  const rootSection = document.getElementById('root');
  rootSection.innerHTML = '';
  rootSection.append(LOCAL_ROUTES[pathname]());
};

// Initialize the router with the routes
export const initRouter = (routes) => {
  // Add routes to LOCAL_ROUTES
  Object.keys(routes).reduce((currentRoutes, pathname) => {
    currentRoutes[pathname] = routes[pathname];
    return currentRoutes;
  }, LOCAL_ROUTES);

  /* Cuando el usuario utiliza el botón de retroceso del navegador,window.addEventListener('popstate'),
  se llama a onNavigate con la ruta actual (window.location.pathname) pero sin agregar una nueva entrada al
  historial de navegación del navegador. */
  window.addEventListener('popstate', (e) => {
    onNavigate(window.location.pathname, false);
  });

  /* window.addEventListener('load'), se activa cuando la página se carga por primera vez y llama a onNavigate
  con la ruta actual, sin actualizar el historial del navegador. */
  window.addEventListener('load', () => {
    onNavigate(window.location.pathname, false);
  });
};
