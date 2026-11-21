// ===== Configuración =====
const URL_API = 'https://rickandmortyapi.com/api/location';
const CLAVE_STORAGE = 'tp-ubicaciones-ultima-busqueda';
const TEXTO_DESCONOCIDO = 'Desconocido';

// ===== Elementos del DOM =====
const formulario = document.querySelector('#formulario-busqueda');
const campoNombre = document.querySelector('#campo-nombre');
const campoTipo = document.querySelector('#campo-tipo');
const botonBuscar = document.querySelector('#boton-buscar');
const mensajeEstado = document.querySelector('#mensaje-estado');
const contenedorTarjetas = document.querySelector('#contenedor-tarjetas');

// ===== Utilidades =====

// Devuelve "Desconocido" si el valor viene vacío o como "unknown"
const normalizarValor = (valor) => {
  const texto = String(valor ?? '').trim();
  return texto === '' || texto.toLowerCase() === 'unknown' ? TEXTO_DESCONOCIDO : texto;
};

// Arma la URL con los parámetros de búsqueda
const construirUrl = (nombre, tipo) => {
  const url = new URL(URL_API);
  if (nombre) url.searchParams.set('name', nombre);
  if (tipo) url.searchParams.set('type', tipo);
  return url;
};

// ===== Petición a la API =====

// Pide las ubicaciones; devuelve [] si la API responde 404 (sin resultados)
const obtenerUbicaciones = async (nombre, tipo) => {
  const url = construirUrl(nombre, tipo);
  const respuesta = await fetch(url);

  if (respuesta.status === 404) return [];
  if (!respuesta.ok) throw new Error(`La API respondió con el código ${respuesta.status}`);

  const datos = await respuesta.json();
  return datos.results;
};

// ===== Interfaz =====

const mostrarMensaje = (texto, tipo = '') => {
  mensajeEstado.textContent = texto;
  mensajeEstado.className = tipo ? `mensaje mensaje--${tipo}` : 'mensaje';
};

const limpiarTarjetas = () => {
  contenedorTarjetas.replaceChildren();
};

const cambiarEstadoBoton = (buscando) => {
  botonBuscar.disabled = buscando;
  botonBuscar.textContent = buscando ? 'Buscando…' : 'Buscar';
};

// Crea una fila "etiqueta: valor" de la tarjeta
const crearFilaDato = (etiqueta, valor) => {
  const fila = document.createElement('div');
  fila.className = 'tarjeta__fila';

  const termino = document.createElement('dt');
  termino.className = 'tarjeta__etiqueta';
  termino.textContent = etiqueta;

  const descripcion = document.createElement('dd');
  descripcion.className = 'tarjeta__valor';
  descripcion.textContent = valor;

  fila.append(termino, descripcion);
  return fila;
};

// Crea la tarjeta de una ubicación
const crearTarjeta = (ubicacion) => {
  const tarjeta = document.createElement('article');
  tarjeta.className = 'tarjeta';

  const titulo = document.createElement('h3');
  titulo.className = 'tarjeta__nombre';
  titulo.textContent = normalizarValor(ubicacion.name);

  const datos = document.createElement('dl');
  datos.className = 'tarjeta__datos';
  datos.append(
    crearFilaDato('Tipo', normalizarValor(ubicacion.type)),
    crearFilaDato('Dimensión', normalizarValor(ubicacion.dimension)),
    crearFilaDato('Residentes', String(ubicacion.residents.length))
  );

  tarjeta.append(titulo, datos);
  return tarjeta;
};

const mostrarTarjetas = (ubicaciones) => {
  const tarjetas = ubicaciones.map(crearTarjeta);
  contenedorTarjetas.append(...tarjetas);
};

// ===== localStorage =====

const guardarBusqueda = (nombre, tipo) => {
  localStorage.setItem(CLAVE_STORAGE, JSON.stringify({ nombre, tipo }));
};

const leerBusquedaGuardada = () => {
  try {
    return JSON.parse(localStorage.getItem(CLAVE_STORAGE));
  } catch {
    return null;
  }
};

// ===== Flujo principal =====

const buscarUbicaciones = async (nombre, tipo) => {
  limpiarTarjetas();
  cambiarEstadoBoton(true);
  mostrarMensaje('Buscando…', 'cargando');

  try {
    const ubicaciones = await obtenerUbicaciones(nombre, tipo);

    if (ubicaciones.length === 0) {
      mostrarMensaje('Sin resultados: no hay ubicaciones que coincidan con tu búsqueda.', 'aviso');
      return;
    }

    mostrarTarjetas(ubicaciones);
    const cantidad = ubicaciones.length;
    mostrarMensaje(`Se ${cantidad === 1 ? 'muestra 1 ubicación' : `muestran ${cantidad} ubicaciones`}.`);
  } catch (error) {
    mostrarMensaje('Ocurrió un error al conectar con la API. Revisa tu conexión e inténtalo de nuevo.', 'error');
    console.warn('Error en la búsqueda:', error.message);
  } finally {
    cambiarEstadoBoton(false);
  }
};

const manejarEnvio = (evento) => {
  evento.preventDefault();

  const nombre = campoNombre.value.trim();
  const tipo = campoTipo.value.trim();

  if (!nombre && !tipo) {
    limpiarTarjetas();
    mostrarMensaje('Escribe un nombre o un tipo para buscar.', 'aviso');
    campoNombre.focus();
    return;
  }

  guardarBusqueda(nombre, tipo);
  buscarUbicaciones(nombre, tipo);
};

// Completa los campos y repite la última búsqueda al cargar la página
const restaurarUltimaBusqueda = () => {
  const busqueda = leerBusquedaGuardada();
  if (!busqueda || (!busqueda.nombre && !busqueda.tipo)) return;

  campoNombre.value = busqueda.nombre ?? '';
  campoTipo.value = busqueda.tipo ?? '';
  buscarUbicaciones(campoNombre.value, campoTipo.value);
};

// ===== Inicio =====
formulario.addEventListener('submit', manejarEnvio);
restaurarUltimaBusqueda();
