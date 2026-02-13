// ===============================
// CONFIGURACIÓN GENERAL
// ===============================
const MAP_CENTER = [-32.889, -68.845];
const MAP_ZOOM = 14;
const BUFFER_METROS = 200;
const RADIO_BUSQUEDA_USOS = 50;

// Zonificación
const ZONIFICACION_URL =
  "https://webgis.ciudaddemendoza.gob.ar/server/rest/services/Zonificación_de_suelo_Ind_urbanos/FeatureServer/0/query";

// Comercios
const COMERCIOS_URL =
  "https://webgis.ciudaddemendoza.gob.ar/server/rest/services/Industria_y_Comercio_público/FeatureServer/37/query";

// Tabla intermedia
const TABLA_INTERMEDIA_URL =
  "https://webgis.ciudaddemendoza.gob.ar/server/rest/services/Tabla_intermedia_Usos_Suelo_Comercio/FeatureServer/0/query";

// ===============================
// CAPAS DE INTERÉS PÚBLICO
// ===============================
const CAPAS_PUBLICAS = [
  { nombre: "Correo", url: "https://webgis.ciudaddemendoza.gob.ar/server/rest/services/Sociedad_público/FeatureServer/43", icono: "📬", color: "#3b82f6" },
  { nombre: "Alojamiento", url: "https://webgis.ciudaddemendoza.gob.ar/server/rest/services/Sociedad_público/FeatureServer/39", icono: "🏨", color: "#8b5cf6" },
  { nombre: "Cuartel de Bomberos", url: "https://webgis.ciudaddemendoza.gob.ar/server/rest/services/Sociedad_público/FeatureServer/26", icono: "🚒", color: "#ef4444" },
  { nombre: "Canchas Deportivas", url: "https://webgis.ciudaddemendoza.gob.ar/server/rest/services/Sociedad_público/FeatureServer/22", icono: "⚽", color: "#10b981" },
  { nombre: "Gimnasios Privados", url: "https://webgis.ciudaddemendoza.gob.ar/server/rest/services/Sociedad_público/FeatureServer/21", icono: "💪", color: "#f59e0b" },
  { nombre: "Centros de natación", url: "https://webgis.ciudaddemendoza.gob.ar/server/rest/services/Sociedad_público/FeatureServer/20", icono: "🏊", color: "#06b6d4" },
  { nombre: "Hospitales", url: "https://webgis.ciudaddemendoza.gob.ar/server/rest/services/Sociedad_público/FeatureServer/4", icono: "🏥", color: "#ef4444" },
  { nombre: "Institutos de Formación Superior", url: "https://webgis.ciudaddemendoza.gob.ar/server/rest/services/Sociedad_público/FeatureServer/15", icono: "🎓", color: "#8b5cf6" },
  { nombre: "Establecimientos educativos", url: "https://webgis.ciudaddemendoza.gob.ar/server/rest/services/Sociedad_público/FeatureServer/14", icono: "📚", color: "#3b82f6" },
  { nombre: "Universidades", url: "https://webgis.ciudaddemendoza.gob.ar/server/rest/services/Sociedad_público/FeatureServer/16", icono: "🏛️", color: "#6366f1" },
  { nombre: "Red de Ciclovías", url: "https://webgis.ciudaddemendoza.gob.ar/server/rest/services/Uso_público_Movilidad_Urbana_y_Transporte/FeatureServer/4", icono: "🚲", color: "#10b981", tipo: "linea" },
  { nombre: "Aeropuertos", url: "https://webgis.ciudaddemendoza.gob.ar/server/rest/services/Uso_público_Movilidad_Urbana_y_Transporte/FeatureServer/15", icono: "✈️", color: "#64748b" },
  { nombre: "Parada de Taxis", url: "https://webgis.ciudaddemendoza.gob.ar/server/rest/services/Uso_público_Movilidad_Urbana_y_Transporte/FeatureServer/19", icono: "🚕", color: "#f59e0b" },
  { nombre: "Playas de Estacionamiento", url: "https://webgis.ciudaddemendoza.gob.ar/server/rest/services/Uso_público_Movilidad_Urbana_y_Transporte/FeatureServer/25", icono: "🅿️", color: "#3b82f6" },
  { nombre: "Estacionamiento Medido", url: "https://webgis.ciudaddemendoza.gob.ar/server/rest/services/Uso_público_Movilidad_Urbana_y_Transporte/FeatureServer/26", icono: "⏱️", color: "#8b5cf6" }
];

// ===============================
// MAPA BASE PLANO
// ===============================
const map = L.map("map", {
  zoomControl: false,
  attributionControl: false,
  fadeAnimation: false,
  zoomAnimation: false,
  markerZoomAnimation: false
}).setView(MAP_CENTER, MAP_ZOOM);

L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
  attribution: '',
  subdomains: 'abcd',
  minZoom: 12,
  maxZoom: 19,
  noWrap: true
}).addTo(map);

L.control.zoom({
  position: 'bottomright'
}).addTo(map);

// ===============================
// CAPAS
// ===============================
let parcelaLayer = null;
let bufferLayer = null;
let puntoMarker = null;
let comerciosLayer = L.layerGroup().addTo(map);
let markersComercios = [];
let usosParcelaLayer = L.layerGroup().addTo(map);
let capasPublicas = {};
let capasPublicasActivas = new Set();

// ===============================
// ESTADO
// ===============================
let comerciosBuffer = [];
let usosSeleccionados = new Set();
let tablaIntermedia = {};
let usosDisponibles = new Set();
let parcelaActual = null;
let usosPermitidosParcela = new Set();
let usosCategorizados = {};

// ===============================
// UI
// ===============================
const panelResultados = document.getElementById("panelResultados");
const contenedorSeleccionados = document.getElementById("filtrosSeleccionados");
const btnBuscar = document.getElementById("btnBuscar");
const inputDireccion = document.getElementById("inputDireccion");

// ===============================
// MAPEO MANUAL DE USOS - PRIORITARIO
// ===============================
const MAPEO_MANUAL_USOS = {
  // HOSPEDAJE
  'Albergue transitorio': { categoria: 'HOSPEDAJE', subcategoria: 'HOTELES' },
  'Apart Hotel 1 a 4 estrellas': { categoria: 'HOSPEDAJE', subcategoria: 'HOTELES' },
  'Bed and Breakfast': { categoria: 'HOSPEDAJE', subcategoria: 'HOTELES' },
  'Cabaña o Bungalow 1 a 4 estrellas': { categoria: 'HOSPEDAJE', subcategoria: 'CAMPING' },
  'Campamento y/o Camping': { categoria: 'HOSPEDAJE', subcategoria: 'CAMPING' },
  'Colonia de vacaciones': { categoria: 'HOSPEDAJE', subcategoria: 'CAMPING' },
  'Hospedaje rural': { categoria: 'HOSPEDAJE', subcategoria: 'HOTELES' },
  'Hostel': { categoria: 'HOSPEDAJE', subcategoria: 'HOTELES' },
  'Hostería o Posada': { categoria: 'HOSPEDAJE', subcategoria: 'HOTELES' },
  'Hotel': { categoria: 'HOSPEDAJE', subcategoria: 'HOTELES' },
  'Motel': { categoria: 'HOSPEDAJE', subcategoria: 'HOTELES' },
  'Petit Hotel': { categoria: 'HOSPEDAJE', subcategoria: 'HOTELES' },
  'Propiedad de alquiler temporario': { categoria: 'HOSPEDAJE', subcategoria: 'TEMPORARIO' },
  'Refugio': { categoria: 'HOSPEDAJE', subcategoria: 'CAMPING' },

  // EDUCACION Y CULTURA
  'Escuela': { categoria: 'EDUCACION_Y_CULTURA', subcategoria: 'EDUCACION' },
  'Colegio': { categoria: 'EDUCACION_Y_CULTURA', subcategoria: 'EDUCACION' },
  'Jardín maternal': { categoria: 'EDUCACION_Y_CULTURA', subcategoria: 'EDUCACION' },
  'Jardín de infantes': { categoria: 'EDUCACION_Y_CULTURA', subcategoria: 'EDUCACION' },
  'Instituto': { categoria: 'EDUCACION_Y_CULTURA', subcategoria: 'EDUCACION' },
  'Universidad': { categoria: 'EDUCACION_Y_CULTURA', subcategoria: 'EDUCACION' },
  'Establecimiento de educación superior': { categoria: 'EDUCACION_Y_CULTURA', subcategoria: 'EDUCACION' },
  'Centro cultural': { categoria: 'EDUCACION_Y_CULTURA', subcategoria: 'CULTURA' },
  'Museo': { categoria: 'EDUCACION_Y_CULTURA', subcategoria: 'CULTURA' },
  'Galería de arte': { categoria: 'EDUCACION_Y_CULTURA', subcategoria: 'CULTURA' },
  'Teatro': { categoria: 'EDUCACION_Y_CULTURA', subcategoria: 'CULTURA' },
  'Auditorio': { categoria: 'EDUCACION_Y_CULTURA', subcategoria: 'CULTURA' },
  'Biblioteca': { categoria: 'EDUCACION_Y_CULTURA', subcategoria: 'CULTURA' },
  'Librería': { categoria: 'EDUCACION_Y_CULTURA', subcategoria: 'LIBRERIAS' },
  'Templo religioso': { categoria: 'EDUCACION_Y_CULTURA', subcategoria: 'CULTURA' },

  // TALLERES E INDUSTRIA
  'Taller de reparación': { categoria: 'INDUSTRIA_Y_TALLERES', subcategoria: 'TALLERES' },
  'Taller de bicicletas': { categoria: 'INDUSTRIA_Y_TALLERES', subcategoria: 'TALLERES' },
  'Taller de artes gráficas': { categoria: 'INDUSTRIA_Y_TALLERES', subcategoria: 'GRAFICA' },
  'Taller de cerrajería': { categoria: 'INDUSTRIA_Y_TALLERES', subcategoria: 'TALLERES' },
  'Taller de costura': { categoria: 'INDUSTRIA_Y_TALLERES', subcategoria: 'ARTESANAL' },
  'Taller de confección': { categoria: 'INDUSTRIA_Y_TALLERES', subcategoria: 'ARTESANAL' },
  'Taller de hojalatería': { categoria: 'INDUSTRIA_Y_TALLERES', subcategoria: 'TALLERES' },
  'Taller de zinguería': { categoria: 'INDUSTRIA_Y_TALLERES', subcategoria: 'TALLERES' },
  'Taller de marcos y cuadros': { categoria: 'INDUSTRIA_Y_TALLERES', subcategoria: 'ARTESANAL' },
  'Taller de relojería': { categoria: 'INDUSTRIA_Y_TALLERES', subcategoria: 'ARTESANAL' },
  'Taller de joyería': { categoria: 'INDUSTRIA_Y_TALLERES', subcategoria: 'ARTESANAL' },
  'Taller de reparación de calzado': { categoria: 'INDUSTRIA_Y_TALLERES', subcategoria: 'TALLERES' },
  'Taller de soldadura': { categoria: 'INDUSTRIA_Y_TALLERES', subcategoria: 'TALLERES' },
  'Taller de tapicería': { categoria: 'INDUSTRIA_Y_TALLERES', subcategoria: 'TALLERES' },
  'Taller de carpintería': { categoria: 'INDUSTRIA_Y_TALLERES', subcategoria: 'TALLERES' },
  'Imprenta': { categoria: 'INDUSTRIA_Y_TALLERES', subcategoria: 'GRAFICA' },
  'Serigrafía': { categoria: 'INDUSTRIA_Y_TALLERES', subcategoria: 'GRAFICA' },
  'Encuadernación': { categoria: 'INDUSTRIA_Y_TALLERES', subcategoria: 'GRAFICA' },
  'Tornería': { categoria: 'INDUSTRIA_Y_TALLERES', subcategoria: 'TALLERES' },

  // AUTOMOTOR
  'Accesorios y repuestos para automotores': { categoria: 'AUTOMOTOR', subcategoria: 'REPUESTOS' },
  'Neumáticos': { categoria: 'AUTOMOTOR', subcategoria: 'REPUESTOS' },
  'Lubricantes': { categoria: 'AUTOMOTOR', subcategoria: 'REPUESTOS' },
  'Automotores': { categoria: 'AUTOMOTOR', subcategoria: 'VENTA' },
  'Automóviles': { categoria: 'AUTOMOTOR', subcategoria: 'VENTA' },
  'Motocicletas': { categoria: 'AUTOMOTOR', subcategoria: 'VENTA' },
  'Mecánica integral': { categoria: 'AUTOMOTOR', subcategoria: 'SERVICIOS' },
  'Gomería': { categoria: 'AUTOMOTOR', subcategoria: 'SERVICIOS' },
  'Lavado automático': { categoria: 'AUTOMOTOR', subcategoria: 'SERVICIOS' },
  'Estación de servicio': { categoria: 'AUTOMOTOR', subcategoria: 'SERVICIOS' },
  'Alquiler de autos': { categoria: 'AUTOMOTOR', subcategoria: 'SERVICIOS' },
  'Cochera': { categoria: 'AUTOMOTOR', subcategoria: 'SERVICIOS' },
  'Playa de estacionamiento': { categoria: 'AUTOMOTOR', subcategoria: 'SERVICIOS' },
  'Servicio especializado del automotor': { categoria: 'AUTOMOTOR', subcategoria: 'SERVICIOS' },

  // DEPORTE Y RECREACION
  'Canchas Deportivas': { categoria: 'DEPORTE_Y_RECREACION', subcategoria: 'DEPORTES' },
  'Gimnasio': { categoria: 'DEPORTE_Y_RECREACION', subcategoria: 'GIMNASIOS' },
  'Centro de natación': { categoria: 'DEPORTE_Y_RECREACION', subcategoria: 'DEPORTES' },
  'Centro deportivo': { categoria: 'DEPORTE_Y_RECREACION', subcategoria: 'DEPORTES' },
  'Club con instalación deportiva': { categoria: 'DEPORTE_Y_RECREACION', subcategoria: 'DEPORTES' },
  'Artículos e indumentaria para deporte': { categoria: 'DEPORTE_Y_RECREACION', subcategoria: 'DEPORTES' },
  'Camping': { categoria: 'DEPORTE_Y_RECREACION', subcategoria: 'DEPORTES' },
  'Caza y pesca': { categoria: 'DEPORTE_Y_RECREACION', subcategoria: 'DEPORTES' },
  'Bicicletas': { categoria: 'DEPORTE_Y_RECREACION', subcategoria: 'DEPORTES' },
  'Juguetes': { categoria: 'DEPORTE_Y_RECREACION', subcategoria: 'RECREACION' },
  'Cotillón': { categoria: 'DEPORTE_Y_RECREACION', subcategoria: 'RECREACION' },
  'Peloteros': { categoria: 'DEPORTE_Y_RECREACION', subcategoria: 'RECREACION' },
  'Juegos electrónicos': { categoria: 'DEPORTE_Y_RECREACION', subcategoria: 'RECREACION' },

  // HOGAR Y DECORACION
  'Muebles': { categoria: 'HOGAR_Y_DECORACION', subcategoria: 'MUEBLES' },
  'Colchones': { categoria: 'HOGAR_Y_DECORACION', subcategoria: 'MUEBLES' },
  'Sommiers': { categoria: 'HOGAR_Y_DECORACION', subcategoria: 'MUEBLES' },
  'Bazar': { categoria: 'HOGAR_Y_DECORACION', subcategoria: 'DECORACION' },
  'Iluminación': { categoria: 'HOGAR_Y_DECORACION', subcategoria: 'DECORACION' },
  'Decoración': { categoria: 'HOGAR_Y_DECORACION', subcategoria: 'DECORACION' },
  'Cuadros': { categoria: 'HOGAR_Y_DECORACION', subcategoria: 'DECORACION' },
  'Marcos': { categoria: 'HOGAR_Y_DECORACION', subcategoria: 'DECORACION' },
  'Cortinas': { categoria: 'HOGAR_Y_DECORACION', subcategoria: 'DECORACION' },
  'Tapicería': { categoria: 'HOGAR_Y_DECORACION', subcategoria: 'DECORACION' },
  'Viviendas prefabricadas': { categoria: 'HOGAR_Y_DECORACION', subcategoria: 'CONSTRUCCION' },
  'Matafuegos': { categoria: 'HOGAR_Y_DECORACION', subcategoria: 'CONSTRUCCION' },
  'Ferretería': { categoria: 'HOGAR_Y_DECORACION', subcategoria: 'CONSTRUCCION' },
  'Materiales de construcción': { categoria: 'HOGAR_Y_DECORACION', subcategoria: 'CONSTRUCCION' },
  'Pinturería': { categoria: 'HOGAR_Y_DECORACION', subcategoria: 'CONSTRUCCION' },
  'Instalaciones eléctricas': { categoria: 'HOGAR_Y_DECORACION', subcategoria: 'CONSTRUCCION' },
  'Instalaciones sanitarias': { categoria: 'HOGAR_Y_DECORACION', subcategoria: 'CONSTRUCCION' },
  'Instalaciones de gas': { categoria: 'HOGAR_Y_DECORACION', subcategoria: 'CONSTRUCCION' },

  // ALIMENTOS Y BEBIDAS
  'Carnes': { categoria: 'ALIMENTOS_Y_BEBIDAS', subcategoria: 'COMERCIO_ALIMENTOS' },
  'Carnicería': { categoria: 'ALIMENTOS_Y_BEBIDAS', subcategoria: 'COMERCIO_ALIMENTOS' },
  'Pollería': { categoria: 'ALIMENTOS_Y_BEBIDAS', subcategoria: 'COMERCIO_ALIMENTOS' },
  'Pescadería': { categoria: 'ALIMENTOS_Y_BEBIDAS', subcategoria: 'COMERCIO_ALIMENTOS' },
  'Frutería': { categoria: 'ALIMENTOS_Y_BEBIDAS', subcategoria: 'COMERCIO_ALIMENTOS' },
  'Verdulería': { categoria: 'ALIMENTOS_Y_BEBIDAS', subcategoria: 'COMERCIO_ALIMENTOS' },
  'Fiambrería': { categoria: 'ALIMENTOS_Y_BEBIDAS', subcategoria: 'COMERCIO_ALIMENTOS' },
  'Pastas frescas': { categoria: 'ALIMENTOS_Y_BEBIDAS', subcategoria: 'COMERCIO_ALIMENTOS' },
  'Panadería': { categoria: 'ALIMENTOS_Y_BEBIDAS', subcategoria: 'COMERCIO_ALIMENTOS' },
  'Confitería': { categoria: 'ALIMENTOS_Y_BEBIDAS', subcategoria: 'GASTRONOMIA' },
  'Bombonería': { categoria: 'ALIMENTOS_Y_BEBIDAS', subcategoria: 'GASTRONOMIA' },
  'Repostería': { categoria: 'ALIMENTOS_Y_BEBIDAS', subcategoria: 'GASTRONOMIA' },
  'Dietética': { categoria: 'ALIMENTOS_Y_BEBIDAS', subcategoria: 'COMERCIO_ALIMENTOS' },
  'Herboristería': { categoria: 'ALIMENTOS_Y_BEBIDAS', subcategoria: 'COMERCIO_ALIMENTOS' },
  'Kiosco': { categoria: 'ALIMENTOS_Y_BEBIDAS', subcategoria: 'ALMACEN' },
  'Minimercado': { categoria: 'ALIMENTOS_Y_BEBIDAS', subcategoria: 'ALMACEN' },
  'Supermercado': { categoria: 'ALIMENTOS_Y_BEBIDAS', subcategoria: 'ALMACEN' },
  'Hipermercado': { categoria: 'ALIMENTOS_Y_BEBIDAS', subcategoria: 'ALMACEN' },
  'Bar': { categoria: 'ALIMENTOS_Y_BEBIDAS', subcategoria: 'GASTRONOMIA' },
  'Cervecería': { categoria: 'ALIMENTOS_Y_BEBIDAS', subcategoria: 'GASTRONOMIA' },
  'Cafetería': { categoria: 'ALIMENTOS_Y_BEBIDAS', subcategoria: 'GASTRONOMIA' },
  'Casa de Té': { categoria: 'ALIMENTOS_Y_BEBIDAS', subcategoria: 'GASTRONOMIA' },
  'Heladería': { categoria: 'ALIMENTOS_Y_BEBIDAS', subcategoria: 'GASTRONOMIA' },
  'Gastronómico con consumo en el lugar': { categoria: 'ALIMENTOS_Y_BEBIDAS', subcategoria: 'GASTRONOMIA' },
  'Gastronómico sin consumo en el lugar': { categoria: 'ALIMENTOS_Y_BEBIDAS', subcategoria: 'COMERCIO_ALIMENTOS' },
  'Catering': { categoria: 'ALIMENTOS_Y_BEBIDAS', subcategoria: 'COMERCIO_ALIMENTOS' },
  'Bebidas con y sin alcohol': { categoria: 'ALIMENTOS_Y_BEBIDAS', subcategoria: 'COMERCIO_ALIMENTOS' },

  // SALUD Y ESTETICA
  'Farmacia': { categoria: 'SALUD_Y_ESTETICA', subcategoria: 'SALUD' },
  'Droguería': { categoria: 'SALUD_Y_ESTETICA', subcategoria: 'SALUD' },
  'Veterinaria': { categoria: 'SALUD_Y_ESTETICA', subcategoria: 'VETERINARIA' },
  'Consultorio': { categoria: 'SALUD_Y_ESTETICA', subcategoria: 'SALUD' },
  'Clínica': { categoria: 'SALUD_Y_ESTETICA', subcategoria: 'SALUD' },
  'Hospital': { categoria: 'SALUD_Y_ESTETICA', subcategoria: 'SALUD' },
  'Geriátrico': { categoria: 'SALUD_Y_ESTETICA', subcategoria: 'SALUD' },
  'Hogar para ancianos': { categoria: 'SALUD_Y_ESTETICA', subcategoria: 'SALUD' },
  'Ortopedia': { categoria: 'SALUD_Y_ESTETICA', subcategoria: 'SALUD' },
  'Instrumental e insumos médicos': { categoria: 'SALUD_Y_ESTETICA', subcategoria: 'SALUD' },
  'Estética corporal': { categoria: 'SALUD_Y_ESTETICA', subcategoria: 'ESTETICA' },
  'Peluquería': { categoria: 'SALUD_Y_ESTETICA', subcategoria: 'ESTETICA' },
  'Manicuría': { categoria: 'SALUD_Y_ESTETICA', subcategoria: 'ESTETICA' },
  'Salón de belleza': { categoria: 'SALUD_Y_ESTETICA', subcategoria: 'ESTETICA' },
  'Tatuajes': { categoria: 'SALUD_Y_ESTETICA', subcategoria: 'ESTETICA' },
  'Perfumería': { categoria: 'SALUD_Y_ESTETICA', subcategoria: 'ESTETICA' },
  'Cosméticos': { categoria: 'SALUD_Y_ESTETICA', subcategoria: 'ESTETICA' },
  'Sex shop': { categoria: 'SALUD_Y_ESTETICA', subcategoria: 'ESTETICA' },
  'Inyectables': { categoria: 'SALUD_Y_ESTETICA', subcategoria: 'SALUD' },
  'Vacunatorio': { categoria: 'SALUD_Y_ESTETICA', subcategoria: 'SALUD' },

  // INDUMENTARIA Y ACCESORIOS
  'Indumentaria': { categoria: 'INDUMENTARIA_Y_ACCESORIOS', subcategoria: 'ROPA' },
  'Calzados': { categoria: 'INDUMENTARIA_Y_ACCESORIOS', subcategoria: 'ROPA' },
  'Ropa': { categoria: 'INDUMENTARIA_Y_ACCESORIOS', subcategoria: 'ROPA' },
  'Textiles': { categoria: 'INDUMENTARIA_Y_ACCESORIOS', subcategoria: 'TEXTIL' },
  'Telas': { categoria: 'INDUMENTARIA_Y_ACCESORIOS', subcategoria: 'TEXTIL' },
  'Mercería': { categoria: 'INDUMENTARIA_Y_ACCESORIOS', subcategoria: 'TEXTIL' },
  'Confección': { categoria: 'INDUMENTARIA_Y_ACCESORIOS', subcategoria: 'TEXTIL' },
  'Cueros': { categoria: 'INDUMENTARIA_Y_ACCESORIOS', subcategoria: 'TEXTIL' },
  'Joyería': { categoria: 'INDUMENTARIA_Y_ACCESORIOS', subcategoria: 'JOYAS' },
  'Relojería': { categoria: 'INDUMENTARIA_Y_ACCESORIOS', subcategoria: 'JOYAS' },
  'Bijouterie': { categoria: 'INDUMENTARIA_Y_ACCESORIOS', subcategoria: 'JOYAS' },
  'Pañalería': { categoria: 'INDUMENTARIA_Y_ACCESORIOS', subcategoria: 'ROPA' },

  // TECNOLOGIA Y ELECTRONICA
  'Electrónica': { categoria: 'TECNOLOGIA_Y_ELECTRONICA', subcategoria: 'ELECTRONICA' },
  'Computación': { categoria: 'TECNOLOGIA_Y_ELECTRONICA', subcategoria: 'ELECTRONICA' },
  'Telefonía': { categoria: 'TECNOLOGIA_Y_ELECTRONICA', subcategoria: 'ELECTRONICA' },
  'Electrodomésticos': { categoria: 'TECNOLOGIA_Y_ELECTRONICA', subcategoria: 'ELECTRONICA' },
  'Instrumentos musicales': { categoria: 'TECNOLOGIA_Y_ELECTRONICA', subcategoria: 'MUSICA' },
  'Sonido': { categoria: 'TECNOLOGIA_Y_ELECTRONICA', subcategoria: 'MUSICA' },
  'Audio': { categoria: 'TECNOLOGIA_Y_ELECTRONICA', subcategoria: 'MUSICA' },
  'Video': { categoria: 'TECNOLOGIA_Y_ELECTRONICA', subcategoria: 'ELECTRONICA' },
  'Fotografía': { categoria: 'TECNOLOGIA_Y_ELECTRONICA', subcategoria: 'ELECTRONICA' },
  'Audiovisual': { categoria: 'TECNOLOGIA_Y_ELECTRONICA', subcategoria: 'ELECTRONICA' },
  'Fotocopiadora': { categoria: 'TECNOLOGIA_Y_ELECTRONICA', subcategoria: 'ELECTRONICA' },

  // OFICINAS Y SERVICIOS
  'Oficina': { categoria: 'OFICINAS_Y_SERVICIOS', subcategoria: 'OFICINAS' },
  'Estudio': { categoria: 'OFICINAS_Y_SERVICIOS', subcategoria: 'OFICINAS' },
  'Profesional': { categoria: 'OFICINAS_Y_SERVICIOS', subcategoria: 'OFICINAS' },
  'Coworking': { categoria: 'OFICINAS_Y_SERVICIOS', subcategoria: 'OFICINAS' },
  'Agencia': { categoria: 'OFICINAS_Y_SERVICIOS', subcategoria: 'SERVICIOS' },
  'Banco': { categoria: 'OFICINAS_Y_SERVICIOS', subcategoria: 'FINANZAS' },
  'Financiera': { categoria: 'OFICINAS_Y_SERVICIOS', subcategoria: 'FINANZAS' },
  'Seguro': { categoria: 'OFICINAS_Y_SERVICIOS', subcategoria: 'FINANZAS' },
  'Cambio de monedas': { categoria: 'OFICINAS_Y_SERVICIOS', subcategoria: 'FINANZAS' },
  'Mensajería': { categoria: 'OFICINAS_Y_SERVICIOS', subcategoria: 'SERVICIOS' },
  'Paquetería': { categoria: 'OFICINAS_Y_SERVICIOS', subcategoria: 'SERVICIOS' },
  'Cobranzas': { categoria: 'OFICINAS_Y_SERVICIOS', subcategoria: 'SERVICIOS' },
  'Locutorio': { categoria: 'OFICINAS_Y_SERVICIOS', subcategoria: 'SERVICIOS' },
  'Internet': { categoria: 'OFICINAS_Y_SERVICIOS', subcategoria: 'SERVICIOS' },
  'Radiollamada': { categoria: 'OFICINAS_Y_SERVICIOS', subcategoria: 'SERVICIOS' },

  // ESPECTACULOS Y EVENTOS
  'Cine': { categoria: 'ESPECTACULOS_Y_EVENTOS', subcategoria: 'ESPECTACULOS' },
  'Teatro': { categoria: 'ESPECTACULOS_Y_EVENTOS', subcategoria: 'ESPECTACULOS' },
  'Espectáculos': { categoria: 'ESPECTACULOS_Y_EVENTOS', subcategoria: 'ESPECTACULOS' },
  'Bailable': { categoria: 'ESPECTACULOS_Y_EVENTOS', subcategoria: 'NOCTURNO' },
  'Cabaret': { categoria: 'ESPECTACULOS_Y_EVENTOS', subcategoria: 'NOCTURNO' },
  'Boliche': { categoria: 'ESPECTACULOS_Y_EVENTOS', subcategoria: 'NOCTURNO' },
  'Casino': { categoria: 'ESPECTACULOS_Y_EVENTOS', subcategoria: 'EVENTOS' },
  'Bingo': { categoria: 'ESPECTACULOS_Y_EVENTOS', subcategoria: 'EVENTOS' },
  'Local con espectáculos en vivo': { categoria: 'ESPECTACULOS_Y_EVENTOS', subcategoria: 'ESPECTACULOS' },
  'Cocherías': { categoria: 'ESPECTACULOS_Y_EVENTOS', subcategoria: 'EVENTOS' },
  'Velatorios': { categoria: 'ESPECTACULOS_Y_EVENTOS', subcategoria: 'EVENTOS' }
};

// ===============================
// CATEGORÍAS DE USOS
// ===============================
const CATEGORIAS_USOS = {
  'ALIMENTOS_Y_BEBIDAS': {
    nombre: '🍔 Alimentos y Bebidas',
    keywords: ['carne', 'carnicería', 'pollería', 'pescadería', 'fruta', 'verdura', 'fiambre', 'pasta', 'pan', 'confite', 'bombón', 'repostería', 'dietética', 'herboristería', 'kiosco', 'minimercado', 'supermercado', 'hipermercado', 'bar', 'cervecería', 'cafetería', 'heladería', 'gastronómico', 'catering', 'bebida'],
    subcategorias: {
      'COMERCIO_ALIMENTOS': '🛒 Venta de alimentos',
      'GASTRONOMIA': '🍽️ Restaurantes y bares',
      'ALMACEN': '🏪 Almacenes y mercados'
    }
  },
  'SALUD_Y_ESTETICA': {
    nombre: '🏥 Salud y Estética',
    keywords: ['farmacia', 'droguería', 'veterinaria', 'consultorio', 'clínica', 'hospital', 'geriátrico', 'hogar para ancianos', 'ortopedia', 'instrumental médico', 'estética', 'peluquería', 'manicuría', 'salón de belleza', 'tatuaje', 'perfumería', 'cosmético', 'sex shop', 'inyectable', 'vacunatorio'],
    subcategorias: {
      'SALUD': '🏥 Salud y bienestar',
      'ESTETICA': '💅 Estética y cuidado personal',
      'VETERINARIA': '🐾 Veterinarias'
    }
  },
  'INDUMENTARIA_Y_ACCESORIOS': {
    nombre: '👕 Indumentaria y Accesorios',
    keywords: ['indumentaria', 'calzado', 'ropa', 'textil', 'tela', 'mercería', 'confección', 'cuero', 'joyería', 'relojería', 'bijouterie', 'pañalería'],
    subcategorias: {
      'ROPA': '👗 Ropa y calzado',
      'JOYAS': '💎 Joyería y relojería',
      'TEXTIL': '🧵 Textiles y confección'
    }
  },
  'HOGAR_Y_DECORACION': {
    nombre: '🏠 Hogar y Decoración',
    keywords: ['mueble', 'colchón', 'sommier', 'bazar', 'iluminación', 'decoración', 'cuadro', 'marco', 'cortina', 'tapicería', 'vivienda prefabricada', 'matafuego', 'ferretería', 'material de construcción', 'pinturería', 'instalación eléctrica', 'instalación sanitaria', 'instalación de gas'],
    subcategorias: {
      'MUEBLES': '🪑 Muebles y colchones',
      'DECORACION': '🎨 Decoración y hogar',
      'CONSTRUCCION': '🔨 Materiales y ferretería'
    }
  },
  'DEPORTE_Y_RECREACION': {
    nombre: '⚽ Deporte y Recreación',
    keywords: ['cancha deportiva', 'gimnasio', 'centro de natación', 'centro deportivo', 'club', 'artículo deportivo', 'camping', 'caza', 'pesca', 'bicicleta', 'juguete', 'cotillón', 'pelotero', 'juego electrónico'],
    subcategorias: {
      'DEPORTES': '⚽ Artículos deportivos',
      'GIMNASIOS': '💪 Gimnasios',
      'RECREACION': '🎮 Juegos y recreación'
    }
  },
  'AUTOMOTOR': {
    nombre: '🚗 Automotor',
    keywords: ['accesorio', 'repuesto', 'neumático', 'lubricante', 'automotor', 'automóvil', 'motocicleta', 'mecánica', 'gomería', 'lavado', 'estación de servicio', 'alquiler de auto', 'cochera', 'playa de estacionamiento'],
    subcategorias: {
      'VENTA': '🚘 Venta de vehículos',
      'REPUESTOS': '🔧 Repuestos y accesorios',
      'SERVICIOS': '🛠️ Talleres y servicios'
    }
  },
  'TECNOLOGIA_Y_ELECTRONICA': {
    nombre: '💻 Tecnología y Electrónica',
    keywords: ['electrónica', 'computación', 'telefonía', 'electrodoméstico', 'instrumento musical', 'sonido', 'audio', 'video', 'fotografía', 'audiovisual', 'fotocopiadora'],
    subcategorias: {
      'ELECTRONICA': '📱 Electrónica y computación',
      'REPARACIONES': '🔧 Talleres de reparación',
      'MUSICA': '🎵 Instrumentos musicales'
    }
  },
  'OFICINAS_Y_SERVICIOS': {
    nombre: '📋 Oficinas y Servicios',
    keywords: ['oficina', 'estudio', 'profesional', 'coworking', 'agencia', 'banco', 'financiera', 'seguro', 'cambio de moneda', 'mensajería', 'paquetería', 'cobranza', 'locutorio', 'internet', 'radiollamada'],
    subcategorias: {
      'OFICINAS': '🏢 Oficinas y estudios',
      'FINANZAS': '💰 Servicios financieros',
      'SERVICIOS': '📞 Servicios profesionales'
    }
  },
  'EDUCACION_Y_CULTURA': {
    nombre: '📚 Educación y Cultura',
    keywords: ['escuela', 'colegio', 'jardín maternal', 'jardín de infantes', 'instituto', 'universidad', 'establecimiento de educación superior', 'centro cultural', 'museo', 'galería de arte', 'teatro', 'auditorio', 'biblioteca', 'librería', 'templo religioso'],
    subcategorias: {
      'EDUCACION': '🎓 Instituciones educativas',
      'CULTURA': '🎨 Cultura y arte',
      'LIBRERIAS': '📖 Librerías'
    }
  },
  'HOSPEDAJE': {
    nombre: '🏨 Hospedaje',
    keywords: ['hotel', 'hostel', 'apart', 'bed and breakfast', 'cabaña', 'bungalow', 'hostería', 'posada', 'petit hotel', 'motel', 'colonia de vacaciones', 'campamento', 'camping', 'refugio', 'alquiler temporario', 'albergue transitorio', 'hospedaje rural'],
    subcategorias: {
      'HOTELES': '🏨 Hoteles y hosterías',
      'TEMPORARIO': '🏡 Alquiler temporario',
      'CAMPING': '⛺ Camping y cabañas'
    }
  },
  'INDUSTRIA_Y_TALLERES': {
    nombre: '🔨 Talleres e Industria',
    keywords: ['taller', 'reparación', 'carpintería', 'cerrajería', 'soldadura', 'hojalatería', 'zinguería', 'artes gráficas', 'imprenta', 'encuadernación', 'serigrafía', 'tornería', 'bicicleta', 'costura', 'confección', 'marco', 'cuadro', 'relojería', 'joyería', 'calzado'],
    subcategorias: {
      'TALLERES': '🔧 Talleres de reparación',
      'ARTESANAL': '🎨 Talleres artesanales',
      'GRAFICA': '🖨️ Artes gráficas'
    }
  },
  'ESPECTACULOS_Y_EVENTOS': {
    nombre: '🎭 Espectáculos y Eventos',
    keywords: ['cine', 'teatro', 'espectáculo', 'bailable', 'cabaret', 'boliche', 'casino', 'bingo', 'local con espectáculos', 'cochería', 'velatorio'],
    subcategorias: {
      'ESPECTACULOS': '🎬 Cine y teatro',
      'EVENTOS': '🎉 Locales de eventos',
      'NOCTURNO': '🌙 Vida nocturna'
    }
  },
  'OTROS': {
    nombre: '📦 Otros',
    keywords: [],
    subcategorias: {
      'OTROS': '📌 Sin categoría específica'
    }
  }
};

// ===============================
// FUNCIONES DE NORMALIZACIÓN Y ABREVIACIÓN
// ===============================
function normalizarTextoParaCategoria(texto) {
  if (!texto) return '';
  return texto
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function abreviarTexto(uso, maxLength = 50) {
  if (!uso) return uso;
  if (uso.length <= maxLength) return uso;
  
  const redundantes = [
    /\([^)]*\)/g,
    /\*\*/g,
    /\s*\(\s*\*\s*\)/g,
    /\s*y\/o\s*/g,
    /\s*\(con o sin fraccionamiento\)/g,
    /\s*\(nuevos y usados\)/g,
    /\s*\(s\/serv\. de transp\. de pasajeros en zonas residenciales\)/g,
    /\s*\(en construcciones existentes\)/g,
    /\s*\(sup\. máxima: [^)]+\)/g,
    /\s*\(s\/elaboración\)/g,
    /\s*\(automóviles, motocicletas\)/g,
    /\s*\|\s*/g,
  ];
  
  let abreviado = uso;
  redundantes.forEach(patron => {
    abreviado = abreviado.replace(patron, '');
  });
  
  abreviado = abreviado.replace(/\s+/g, ' ').trim();
  
  if (abreviado.length > maxLength) {
    abreviado = abreviado.substring(0, maxLength - 3) + '...';
  }
  
  return abreviado;
}

// ===============================
// FUNCIÓN DE CATEGORIZACIÓN MEJORADA
// ===============================
function categorizarUso(uso) {
  if (!uso || uso === 'Sin clasificar' || uso.includes('NO EXISTE')) {
    return {
      categoria: 'OTROS',
      subcategoria: 'OTROS',
      nombreOriginal: uso,
      nombreAbreviado: abreviarTexto(uso),
      categoriaNombre: '📦 Otros',
      subcategoriaNombre: '📌 Sin clasificar'
    };
  }

  // 1. PRIMERO: Buscar en el mapeo manual (más preciso)
  for (const [key, value] of Object.entries(MAPEO_MANUAL_USOS)) {
    if (uso.includes(key)) {
      return {
        categoria: value.categoria,
        subcategoria: value.subcategoria,
        nombreOriginal: uso,
        nombreAbreviado: abreviarTexto(uso),
        categoriaNombre: CATEGORIAS_USOS[value.categoria]?.nombre || '📦 Otros',
        subcategoriaNombre: CATEGORIAS_USOS[value.categoria]?.subcategorias[value.subcategoria] || '📌 Otros'
      };
    }
  }

  // 2. SEGUNDO: Buscar por palabras clave
  const usoNormalizado = normalizarTextoParaCategoria(uso);
  
  for (const [categoriaKey, categoria] of Object.entries(CATEGORIAS_USOS)) {
    if (categoriaKey === 'OTROS') continue;
    
    for (const keyword of categoria.keywords) {
      if (usoNormalizado.includes(normalizarTextoParaCategoria(keyword))) {
        // Determinar subcategoría
        let subcategoriaKey = 'OTROS';
        let subcategoriaNombre = categoria.subcategorias['OTROS'] || '📌 Otros';
        
        if (usoNormalizado.includes('taller') || usoNormalizado.includes('reparacion')) {
          subcategoriaKey = 'TALLERES';
          subcategoriaNombre = categoria.subcategorias['TALLERES'] || '🔧 Talleres';
        } else if (usoNormalizado.includes('venta')) {
          subcategoriaKey = 'VENTA';
          subcategoriaNombre = categoria.subcategorias['VENTA'] || '🚘 Venta';
        } else if (usoNormalizado.includes('servicio')) {
          subcategoriaKey = 'SERVICIOS';
          subcategoriaNombre = categoria.subcategorias['SERVICIOS'] || '🛠️ Servicios';
        }
        
        return {
          categoria: categoriaKey,
          subcategoria: subcategoriaKey,
          nombreOriginal: uso,
          nombreAbreviado: abreviarTexto(uso),
          categoriaNombre: categoria.nombre,
          subcategoriaNombre: subcategoriaNombre
        };
      }
    }
  }

  // 3. TERCERO: Si no se encontró, va a OTROS
  return {
    categoria: 'OTROS',
    subcategoria: 'OTROS',
    nombreOriginal: uso,
    nombreAbreviado: abreviarTexto(uso),
    categoriaNombre: '📦 Otros',
    subcategoriaNombre: '📌 Sin categoría específica'
  };
}

// ===============================
// CONSTRUIR ÍNDICE DE CATEGORÍAS
// ===============================
function construirIndiceCategorias() {
  usosCategorizados = {};
  
  for (const [catKey, cat] of Object.entries(CATEGORIAS_USOS)) {
    usosCategorizados[catKey] = {
      nombre: cat.nombre,
      subcategorias: {}
    };
    
    for (const [subKey, subNombre] of Object.entries(cat.subcategorias)) {
      usosCategorizados[catKey].subcategorias[subKey] = {
        nombre: subNombre,
        usos: new Set()
      };
    }
  }
  
  usosDisponibles.forEach(uso => {
    if (uso && !uso.includes('NO EXISTE')) {
      const categorizado = categorizarUso(uso);
      
      if (!usosCategorizados[categorizado.categoria]) {
        usosCategorizados[categorizado.categoria] = {
          nombre: categorizado.categoriaNombre,
          subcategorias: {}
        };
      }
      
      if (!usosCategorizados[categorizado.categoria].subcategorias[categorizado.subcategoria]) {
        usosCategorizados[categorizado.categoria].subcategorias[categorizado.subcategoria] = {
          nombre: categorizado.subcategoriaNombre,
          usos: new Set()
        };
      }
      
      usosCategorizados[categorizado.categoria].subcategorias[categorizado.subcategoria].usos.add(uso);
    }
  });
  
  console.log('=== ESTADÍSTICAS DE CATEGORIZACIÓN ===');
  Object.entries(usosCategorizados).forEach(([catKey, cat]) => {
    let total = 0;
    Object.values(cat.subcategorias).forEach(sub => {
      total += sub.usos.size;
    });
    console.log(`${cat.nombre}: ${total} usos`);
  });
}

// ===============================
// NUEVO: FUNCIONES PARA KPIs - VERSIÓN MEJORADA
// ===============================
function calcularKPIs() {
  const kpis = {
    totalComercios: comerciosBuffer.length,
    porCategoria: {},
    usosUnicos: new Set(),
    comerciosEnParcela: 0,
    usosCoincidenParcela: new Set(),
    diversidadUsos: 0
  };
  
  // Inicializar contadores por categoría
  Object.keys(CATEGORIAS_USOS).forEach(catKey => {
    kpis.porCategoria[catKey] = {
      nombre: CATEGORIAS_USOS[catKey].nombre,
      cantidad: 0,
      porcentaje: 0,
      subcategorias: {}
    };
    
    Object.keys(CATEGORIAS_USOS[catKey].subcategorias).forEach(subKey => {
      kpis.porCategoria[catKey].subcategorias[subKey] = {
        nombre: CATEGORIAS_USOS[catKey].subcategorias[subKey],
        cantidad: 0
      };
    });
  });
  
  // Contar comercios por categoría y subcategoría
  comerciosBuffer.forEach(comercio => {
    // Verificar si está en la parcela
    const tieneUsoEnParcela = comercio.usos.some(u => usosPermitidosParcela.has(u));
    if (tieneUsoEnParcela) {
      kpis.comerciosEnParcela++;
    }
    
    // Contar usos únicos y usos que coinciden con parcela
    comercio.usos.forEach(u => {
      kpis.usosUnicos.add(u);
      
      if (usosPermitidosParcela.has(u)) {
        kpis.usosCoincidenParcela.add(u);
      }
      
      const categorizado = categorizarUso(u);
      
      if (kpis.porCategoria[categorizado.categoria]) {
        kpis.porCategoria[categorizado.categoria].cantidad++;
        
        if (kpis.porCategoria[categorizado.categoria].subcategorias[categorizado.subcategoria]) {
          kpis.porCategoria[categorizado.categoria].subcategorias[categorizado.subcategoria].cantidad++;
        }
      }
    });
  });
  
  // Calcular porcentajes y diversidad
  kpis.diversidadUsos = kpis.usosUnicos.size;
  kpis.cantidadUsosCoinciden = kpis.usosCoincidenParcela.size;
  
  if (kpis.totalComercios > 0) {
    Object.keys(kpis.porCategoria).forEach(catKey => {
      kpis.porCategoria[catKey].porcentaje = 
        Math.round((kpis.porCategoria[catKey].cantidad / kpis.totalComercios) * 100);
    });
  }
  
  return kpis;
}
function renderizarKPIs() {
  const kpis = calcularKPIs();
  
  // Buscar o crear contenedor de KPIs
  let kpisContainer = document.getElementById('kpisContainer');
  const usosSection = document.getElementById('usosPermitidosSection');
  
  if (!kpisContainer) {
    kpisContainer = document.createElement('div');
    kpisContainer.id = 'kpisContainer';
    kpisContainer.className = 'filtros-section';
    
    if (usosSection) {
      usosSection.parentNode.insertBefore(kpisContainer, usosSection.nextSibling);
    } else {
      const filtrosSection = document.querySelector('.filtros-section:last-child');
      if (filtrosSection) {
        filtrosSection.parentNode.insertBefore(kpisContainer, filtrosSection);
      }
    }
  }
  
  // Generar HTML de KPIs
  let html = `
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <div class="filtros-header">
        <h4 style="display: flex; align-items: center; gap: 8px; margin: 0;">
          <span style="font-size: 18px;">📊</span> KPIs - Análisis de Comercios
        </h4>
      </div>
      
      <!-- Métricas principales -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 8px;">
        <div style="
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
          border-radius: 16px;
          padding: 16px;
          color: white;
        ">
          <div style="font-size: 28px; font-weight: 700; margin-bottom: 4px;">
            ${kpis.totalComercios}
          </div>
          <div style="font-size: 13px; opacity: 0.9;">
            🏪 Comercios totales
          </div>
        </div>
        
        <div style="
          background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
          border-radius: 16px;
          padding: 16px;
          color: white;
        ">
          <div style="font-size: 28px; font-weight: 700; margin-bottom: 4px;">
            ${kpis.diversidadUsos}
          </div>
          <div style="font-size: 13px; opacity: 0.9;">
            🎯 Usos diferentes encontrados
          </div>
        </div>
        
        <div style="
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          border-radius: 16px;
          padding: 16px;
          color: white;
        ">
          <div style="font-size: 28px; font-weight: 700; margin-bottom: 4px;">
            ${kpis.cantidadUsosCoinciden}
          </div>
          <div style="font-size: 13px; opacity: 0.9;">
            ✅ Usos que coinciden con parcela
          </div>
        </div>
        


        </div>
      </div>
      
      <!-- Top categorías con nombres completos -->
      <div style="margin-top: 8px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
          <span style="font-size: 14px; font-weight: 600; color: #0f172a;">
            📈 Distribución por categoría
          </span>
          <span style="font-size: 12px; color: #64748b;">
            ${kpis.totalComercios} comercios
          </span>
        </div>
        
        <div style="display: flex; flex-direction: column; gap: 12px;">
          ${Object.entries(kpis.porCategoria)
            .filter(([_, cat]) => cat.cantidad > 0)
            .sort((a, b) => b[1].cantidad - a[1].cantidad)
            .map(([catKey, cat]) => {
              const porcentaje = cat.porcentaje;
              return `
                <div style="display: flex; flex-direction: column; gap: 4px;">
                  <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div style="display: flex; align-items: center; gap: 8px;">
                      <span style="
                        width: 12px;
                        height: 12px;
                        border-radius: 4px;
                        background: ${obtenerColorCategoria(catKey)};
                      "></span>
                      <span style="font-size: 13px; font-weight: 500; color: #0f172a;">
                        ${cat.nombre}
                      </span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 8px;">
                      <span style="font-size: 13px; font-weight: 600; color: #0f172a;">
                        ${cat.cantidad}
                      </span>
                      <span style="font-size: 11px; color: #64748b; min-width: 40px;">
                        ${porcentaje}%
                      </span>
                    </div>
                  </div>
                  <div style="flex: 1; height: 8px; background: #f1f5f9; border-radius: 4px; overflow: hidden;">
                    <div style="
                      width: ${porcentaje}%;
                      height: 100%;
                      background: ${obtenerColorCategoria(catKey)};
                      border-radius: 4px;
                      transition: width 0.3s ease;
                    "></div>
                  </div>
                </div>
              `;
            }).join('')}
        </div>
      </div>
      
      <!-- Resumen de subcategorías principales -->
      <div style="margin-top: 8px; border-top: 1px solid #f1f5f9; padding-top: 16px;">
        <span style="font-size: 14px; font-weight: 600; color: #0f172a; display: block; margin-bottom: 12px;">
          🏷️ Subcategorías destacadas
        </span>
        
        <div style="display: flex; flex-direction: column; gap: 10px;">
          ${Object.entries(kpis.porCategoria)
            .flatMap(([catKey, cat]) => 
              Object.entries(cat.subcategorias)
                .filter(([_, sub]) => sub.cantidad > 0)
                .map(([subKey, sub]) => ({
                  ...sub,
                  categoria: cat.nombre,
                  categoriaKey: catKey,
                  color: obtenerColorCategoria(catKey)
                }))
            )
            .sort((a, b) => b.cantidad - a.cantidad)
            .slice(0, 3)
            .map(sub => `
              <div style="display: flex; align-items: center; gap: 8px;">
                <span style="
                  width: 10px;
                  height: 10px;
                  border-radius: 4px;
                  background: ${sub.color};
                "></span>
                <div style="display: flex; flex-direction: column; flex: 1;">
                  <span style="font-size: 12px; font-weight: 500; color: #0f172a;">
                    ${sub.nombre}
                  </span>
                  <span style="font-size: 11px; color: #64748b;">
                    ${sub.categoria}
                  </span>
                </div>
                <span style="font-size: 13px; font-weight: 600; color: #0f172a;">
                  ${sub.cantidad}
                </span>
              </div>
            `).join('')}
        </div>
      </div>
      
      ${usosSeleccionados.size > 0 ? `
        <div style="
          margin-top: 8px;
          background: #eff6ff;
          border-radius: 12px;
          padding: 12px;
          border-left: 4px solid #3b82f6;
        ">
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
            <span style="font-size: 16px;">🔍</span>
            <span style="font-size: 13px; font-weight: 600; color: #1e40af;">
              Filtro activo
            </span>
          </div>
          <span style="font-size: 12px; color: #2563eb;">
            ${usosSeleccionados.size} uso(s) seleccionado(s) • 
            ${comerciosBuffer.length} comercio(s) coinciden
          </span>
        </div>
      ` : ''}
    </div>
  `;
  
  kpisContainer.innerHTML = html;
  kpisContainer.style.display = 'block';
}

function obtenerColorCategoria(categoriaKey) {
  const colores = {
    'ALIMENTOS_Y_BEBIDAS': '#3b82f6',
    'SALUD_Y_ESTETICA': '#ef4444',
    'INDUMENTARIA_Y_ACCESORIOS': '#8b5cf6',
    'HOGAR_Y_DECORACION': '#f59e0b',
    'DEPORTE_Y_RECREACION': '#10b981',
    'AUTOMOTOR': '#64748b',
    'TECNOLOGIA_Y_ELECTRONICA': '#6366f1',
    'OFICINAS_Y_SERVICIOS': '#6b7280',
    'EDUCACION_Y_CULTURA': '#ec4899',
    'HOSPEDAJE': '#14b8a6',
    'INDUSTRIA_Y_TALLERES': '#f97316',
    'ESPECTACULOS_Y_EVENTOS': '#a855f7',
    'OTROS': '#94a3b8'
  };
  return colores[categoriaKey] || '#94a3b8';
}
// ===============================
// INIT
// ===============================
init();

async function init() {
  prepararUI();
  await cargarTablaIntermedia();
  construirIndiceCategorias();
  crearModalFiltros();
  inicializarCapasPublicas();
}

// ===============================
// UTIL
// ===============================
function normalizar(txt) {
  return txt
    ?.toString()
    .toUpperCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

// ===============================
// INICIALIZAR CAPAS PÚBLICAS
// ===============================
function inicializarCapasPublicas() {
  CAPAS_PUBLICAS.forEach(capa => {
    capasPublicas[capa.nombre] = {
      layer: L.layerGroup().addTo(map),
      activa: false,
      data: capa,
      cache: null
    };
  });
  renderizarPanelCapasPublicas();
}

// ===============================
// RENDERIZAR PANEL DE CAPAS PÚBLICAS
// ===============================
function renderizarPanelCapasPublicas() {
  const sidebar = document.getElementById('sidebar');
  
  const capasHTML = `
    <div class="capas-publicas-section">
      <div class="capas-header" onclick="window.toggleCapasPublicas()">
        <h4 style="display: flex; align-items: center; gap: 8px; margin: 0;">
          <span style="font-size: 18px;">🏛️</span> Puntos de Interés
        </h4>
        <span id="capasToggleIcon" style="font-size: 14px; color: #64748b;">▼</span>
      </div>
      
      <div id="capasPublicasContent" style="display: none; margin-top: 12px;">
        <div style="margin-bottom: 12px; display: flex; gap: 8px;">
          <button id="btnActivarTodasCapas" class="btn-capas" style="
            padding: 6px 12px;
            background: #f1f5f9;
            border: 1px solid #e2e8f0;
            border-radius: 20px;
            font-size: 12px;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 4px;
          ">
            ✓ Activar todas
          </button>
          <button id="btnDesactivarTodasCapas" class="btn-capas" style="
            padding: 6px 12px;
            background: #f1f5f9;
            border: 1px solid #e2e8f0;
            border-radius: 20px;
            font-size: 12px;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 4px;
          ">
            ✕ Desactivar todas
          </button>
        </div>
        
        <div id="capasPublicasLista" style="display: flex; flex-direction: column; gap: 8px; max-height: 300px; overflow-y: auto;">
          ${CAPAS_PUBLICAS.map(capa => `
            <div class="capa-item">
              <input 
                type="checkbox" 
                id="capa_${capa.nombre.replace(/\s+/g, '_')}" 
                data-nombre="${capa.nombre}"
                style="width: 16px; height: 16px; cursor: pointer; accent-color: ${capa.color};"
              >
              <label 
                for="capa_${capa.nombre.replace(/\s+/g, '_')}" 
                style="display: flex; align-items: center; gap: 6px; flex: 1; cursor: pointer;"
              >
                <span style="font-size: 16px;">${capa.icono}</span>
                <span style="font-size: 13px; font-weight: 500; color: #0f172a;">${capa.nombre}</span>
                <span style="
                  margin-left: auto;
                  width: 12px;
                  height: 12px;
                  border-radius: 4px;
                  background: ${capa.color};
                  opacity: 0.6;
                "></span>
              </label>
            </div>
          `).join('')}
        </div>
        
        <div id="capasLoading" style="display: none; text-align: center; padding: 20px;">
          <span style="color: #64748b; font-size: 13px;">Cargando capas...</span>
        </div>
      </div>
    </div>
  `;
  
  const filtrosSection = document.querySelector('.filtros-section');
  if (filtrosSection) {
    const capasDiv = document.createElement('div');
    capasDiv.innerHTML = capasHTML;
    filtrosSection.parentNode.insertBefore(capasDiv.firstElementChild, filtrosSection);
  }
  
  CAPAS_PUBLICAS.forEach(capa => {
    const checkbox = document.getElementById(`capa_${capa.nombre.replace(/\s+/g, '_')}`);
    if (checkbox) {
      checkbox.addEventListener('change', (e) => toggleCapaPublica(capa.nombre, e.target.checked));
    }
  });
  
  document.getElementById('btnActivarTodasCapas')?.addEventListener('click', activarTodasCapas);
  document.getElementById('btnDesactivarTodasCapas')?.addEventListener('click', desactivarTodasCapas);
}

window.toggleCapasPublicas = function() {
  const content = document.getElementById('capasPublicasContent');
  const icon = document.getElementById('capasToggleIcon');
  if (content.style.display === 'none') {
    content.style.display = 'block';
    icon.textContent = '▲';
  } else {
    content.style.display = 'none';
    icon.textContent = '▼';
  }
};

async function toggleCapaPublica(nombreCapa, activar) {
  const capa = capasPublicas[nombreCapa];
  if (!capa) return;
  
  capa.activa = activar;
  
  if (activar) {
    capasPublicasActivas.add(nombreCapa);
    await cargarCapaPublica(nombreCapa);
  } else {
    capasPublicasActivas.delete(nombreCapa);
    capa.layer.clearLayers();
  }
}

async function cargarCapaPublica(nombreCapa) {
  const capa = capasPublicas[nombreCapa];
  if (!capa) return;
  
  document.getElementById('capasLoading').style.display = 'block';
  
  try {
    if (capa.cache) {
      renderizarCapaPublica(nombreCapa, capa.cache);
      document.getElementById('capasLoading').style.display = 'none';
      return;
    }
    
    const params = new URLSearchParams({
      where: "1=1",
      outFields: "*",
      returnGeometry: true,
      f: "geojson",
      outSR: 4326
    });
    
    const res = await fetch(`${capa.data.url}/query?${params}`);
    const geojson = await res.json();
    
    capa.cache = geojson;
    renderizarCapaPublica(nombreCapa, geojson);
    
  } catch (error) {
    console.error(`Error cargando capa ${nombreCapa}:`, error);
  } finally {
    document.getElementById('capasLoading').style.display = 'none';
  }
}

function renderizarCapaPublica(nombreCapa, geojson) {
  const capa = capasPublicas[nombreCapa];
  if (!capa || !capa.activa) return;
  
  capa.layer.clearLayers();
  if (!geojson.features?.length) return;
  
  const esLinea = capa.data.tipo === 'linea';
  
  L.geoJSON(geojson, {
    style: esLinea ? {
      color: capa.data.color,
      weight: 4,
      opacity: 0.8
    } : null,
    
    pointToLayer: esLinea ? null : (feature, latlng) => {
      return L.circleMarker(latlng, {
        radius: 8,
        fillColor: capa.data.color,
        color: '#ffffff',
        weight: 2,
        fillOpacity: 0.8
      });
    },
    
    onEachFeature: (feature, layer) => {
      let popupContent = `<strong>${capa.data.icono} ${nombreCapa}</strong><br>`;
      if (feature.properties) {
        const props = feature.properties;
        if (props.nombre || props.NOMBRE || props.name || props.NAME) {
          popupContent += `<b>${props.nombre || props.NOMBRE || props.name || props.NAME}</b><br>`;
        }
        if (props.direccion || props.DIRECCION || props.calle || props.CALLE) {
          popupContent += `📍 ${props.direccion || props.DIRECCION || props.calle || props.CALLE} ${props.numero || props.NUMERO || ''}<br>`;
        }
      }
      layer.bindPopup(popupContent);
    }
  }).addTo(capa.layer);
}

function activarTodasCapas() {
  CAPAS_PUBLICAS.forEach(capa => {
    const checkbox = document.getElementById(`capa_${capa.nombre.replace(/\s+/g, '_')}`);
    if (checkbox && !checkbox.checked) {
      checkbox.checked = true;
      toggleCapaPublica(capa.nombre, true);
    }
  });
}

function desactivarTodasCapas() {
  CAPAS_PUBLICAS.forEach(capa => {
    const checkbox = document.getElementById(`capa_${capa.nombre.replace(/\s+/g, '_')}`);
    if (checkbox && checkbox.checked) {
      checkbox.checked = false;
      toggleCapaPublica(capa.nombre, false);
    }
  });
}

// ===============================
// UI GENERAL
// ===============================
function prepararUI() {
  panelResultados.className = 'panel-resultados-flotante';
  panelResultados.style.width = '340px';
  panelResultados.style.maxWidth = '340px';
  panelResultados.style.borderRight = 'none';
  panelResultados.style.padding = '0';
  panelResultados.style.overflow = 'hidden';
  
  panelResultados.innerHTML = `
    <div class="panel-header">
      <h3>📋 Comercios cercanos</h3>
      <span class="resultados-count" id="resultadosCount">0</span>
    </div>
    <div id="listaResultados">
      <div class="status-message">
        <span style="font-size: 24px; display: block; margin-bottom: 8px;">📍</span>
        Hacé clic en el mapa para ver los comercios en un radio de ${BUFFER_METROS}m
      </div>
    </div>
  `;
  
  const sidebar = document.getElementById('sidebar');
  sidebar.innerHTML = `
    <div style="display: flex; flex-direction: column; gap: 20px;">
      <div class="buscador-section">
        <h3>
          <span>📍 Buscar ubicación</span>
        </h3>
        <div class="input-group">
          <input
            type="text"
            id="inputDireccion"
            placeholder="Ej: San Martín 123, Mendoza"
          />
          <button id="btnBuscar">
            <span style="font-size: 16px;">🔍</span>
          </button>
        </div>
        <div id="estado" class="status" style="margin-top: 12px; color: #64748b; font-size: 13px;">
          Hacé clic en el mapa o buscá una dirección
        </div>
      </div>
      
      <div id="parcelaInfoSection" class="filtros-section" style="display: none;">
        <div class="filtros-header">
          <h4>🏢 Zonificación</h4>
        </div>
        <div id="parcelaInfoContent">
        </div>
      </div>
      
      <div id="usosPermitidosSection" class="filtros-section" style="display: none;">
        <div class="filtros-header">
          <h4>✅ Usos permitidos en esta parcela</h4>
        </div>
        <div id="usosPermitidosContent" class="filtros-activos" style="margin-top: 8px;">
        </div>
      </div>
      
      <!-- Los KPIs se insertan aquí dinámicamente -->
      
      <div class="filtros-section">
        <div class="filtros-header">
          <h4>🎯 Filtrar comercios</h4>
          <button id="btnAbrirFiltros">Aplicar filtros</button>
        </div>
        <div id="filtrosSeleccionados" class="filtros-activos">
          <em style="color: #94a3b8; font-size: 13px;">Sin filtros aplicados</em>
        </div>
      </div>
    </div>
  `;
  
  document.getElementById('btnAbrirFiltros').addEventListener('click', abrirModalFiltros);
  document.getElementById('btnBuscar').addEventListener('click', buscarDireccion);
  document.getElementById('inputDireccion').addEventListener('keypress', e => {
    if (e.key === 'Enter') buscarDireccion();
  });
}

// ===============================
// TABLA INTERMEDIA
// ===============================
async function cargarTablaIntermedia() {
  const params = new URLSearchParams({
    where: "subrubro IS NOT NULL",
    outFields: "subrubro,usos__subrubro__ordenanza_4114_",
    returnGeometry: false,
    f: "json"
  });

  const res = await fetch(`${TABLA_INTERMEDIA_URL}?${params}`);
  const data = await res.json();

  data.features.forEach(f => {
    const a = f.attributes;
    tablaIntermedia[normalizar(a.subrubro)] = a;

    if (a.usos__subrubro__ordenanza_4114_) {
      const usosMultiples = a.usos__subrubro__ordenanza_4114_.split('|').map(u => u.trim());
      usosMultiples.forEach(uso => {
        if (uso && uso !== 'NO EXISTE EL USO' && uso !== 'NO EXISTE USO') {
          usosDisponibles.add(uso);
        }
      });
    }
  });

  usosDisponibles.add("Sin clasificar");
}

// ===============================
// MODAL FILTROS CON CATEGORÍAS
// ===============================
function crearModalFiltros() {
  const modalExistente = document.getElementById("modalFiltros");
  if (modalExistente) {
    modalExistente.remove();
  }

  const modal = document.createElement("div");
  modal.id = "modalFiltros";
  modal.style.cssText = `
    position:fixed; inset:0;
    background:rgba(0,0,0,.4);
    display:none;
    justify-content:center;
    align-items:center;
    z-index:9999;
  `;

  modal.innerHTML = `
    <div class="modal-content" style="width: 600px; max-width: 90vw;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
        <div>
          <h3 style="margin: 0 0 4px 0;">🎯 Filtrar por uso permitido</h3>
          <span style="color: #64748b; font-size: 13px;">Organizado por categorías</span>
        </div>
        
        <div style="display: flex; gap: 8px;">
          <button id="btnSeleccionarTodos" class="btn-seleccion" style="
            background: #3b82f6;
            color: white;
            border: none;
            border-radius: 20px;
            padding: 6px 14px;
            font-size: 12px;
            font-weight: 500;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 4px;
          ">
            <span>✓</span> Todos
          </button>
          <button id="btnDeseleccionarTodos" class="btn-seleccion" style="
            background: #f1f5f9;
            color: #475569;
            border: none;
            border-radius: 20px;
            padding: 6px 14px;
            font-size: 12px;
            font-weight: 500;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 4px;
          ">
            <span>✕</span> Ninguno
          </button>
        </div>
      </div>
      
      <div style="margin-bottom: 16px;">
        <input
          type="text"
          id="buscarUsosModal"
          placeholder="🔍 Buscar uso específico..."
          style="
            width: 100%;
            padding: 10px 14px;
            border: 1px solid #e2e8f0;
            border-radius: 12px;
            font-size: 14px;
            box-sizing: border-box;
          "
        />
      </div>
      
      <div style="display: flex; gap: 8px; margin-bottom: 16px; flex-wrap: wrap;" id="categoriaTabs">
        ${Object.entries(usosCategorizados).map(([catKey, cat], index) => `
          <button 
            class="categoria-tab ${index === 0 ? 'activo' : ''}" 
            data-categoria="${catKey}"
            style="
              padding: 8px 16px;
              background: ${index === 0 ? '#3b82f6' : '#f1f5f9'};
              color: ${index === 0 ? 'white' : '#334155'};
              border: none;
              border-radius: 30px;
              font-size: 13px;
              font-weight: 500;
              cursor: pointer;
              transition: all 0.2s;
            "
          >
            ${cat.nombre} (${Object.values(cat.subcategorias).reduce((sum, sub) => sum + sub.usos.size, 0)})
          </button>
        `).join('')}
      </div>
      
      <div id="contenedorSubcategoriasModal" style="max-height: 400px; overflow-y: auto; padding: 4px;">
        ${renderizarSubcategorias(Object.keys(usosCategorizados)[0])}
      </div>

      <div class="modal-actions">
        <button class="btn-cancelar" id="btnCancelarFiltros">Cancelar</button>
        <button class="btn-aplicar" id="btnAplicarFiltros">Aplicar filtros</button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  document.getElementById('btnCancelarFiltros').addEventListener('click', cerrarModalFiltros);
  document.getElementById('btnAplicarFiltros').addEventListener('click', aplicarFiltrosModal);
  document.getElementById('btnSeleccionarTodos').addEventListener('click', seleccionarTodosLosFiltros);
  document.getElementById('btnDeseleccionarTodos').addEventListener('click', deseleccionarTodosLosFiltros);
  
  document.querySelectorAll('.categoria-tab').forEach(tab => {
    tab.addEventListener('click', function() {
      document.querySelectorAll('.categoria-tab').forEach(t => {
        t.style.background = '#f1f5f9';
        t.style.color = '#334155';
      });
      this.style.background = '#3b82f6';
      this.style.color = 'white';
      
      const categoria = this.dataset.categoria;
      document.getElementById('contenedorSubcategoriasModal').innerHTML = renderizarSubcategorias(categoria);
      asignarEventosCheckboxes();
    });
  });
  
  document.getElementById('buscarUsosModal').addEventListener('input', function(e) {
    const busqueda = e.target.value.toLowerCase();
    filtrarUsosPorBusqueda(busqueda);
  });
  
  asignarEventosCheckboxes();
}

function renderizarSubcategorias(categoriaKey) {
  if (!categoriaKey || !usosCategorizados[categoriaKey]) {
    return '<div class="status-message">No hay usos en esta categoría</div>';
  }
  
  const categoria = usosCategorizados[categoriaKey];
  let html = '';
  
  for (const [subKey, subcategoria] of Object.entries(categoria.subcategorias)) {
    if (subcategoria.usos.size === 0) continue;
    
    html += `
      <div style="margin-bottom: 20px; background: white; border-radius: 16px; padding: 16px; border: 1px solid #f1f5f9;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
          <h4 style="margin: 0; font-size: 14px; font-weight: 600; color: #0f172a;">
            ${subcategoria.nombre}
            <span style="margin-left: 8px; background: #f1f5f9; color: #475569; padding: 2px 10px; border-radius: 20px; font-size: 11px;">
              ${subcategoria.usos.size}
            </span>
          </h4>
          <div>
            <button class="btn-seleccionar-subcategoria" data-categoria="${categoriaKey}" data-subcategoria="${subKey}" style="
              background: transparent;
              border: 1px solid #e2e8f0;
              border-radius: 16px;
              padding: 4px 12px;
              font-size: 11px;
              color: #64748b;
              cursor: pointer;
            ">✓ Subcategoría</button>
          </div>
        </div>
        
        <div style="display: flex; flex-wrap: wrap; gap: 8px;" class="usos-subcategoria-${categoriaKey}-${subKey}">
          ${[...subcategoria.usos].sort().map(uso => {
            const categorizado = categorizarUso(uso);
            const isSelected = usosSeleccionados.has(uso);
            return `
              <div style="position: relative; display: inline-flex; align-items: center; margin-bottom: 4px;">
                <input 
                  type="checkbox" 
                  id="uso_${uso.replace(/[^a-zA-Z0-9]/g, '_')}" 
                  value="${uso}"
                  data-uso-original="${uso}"
                  ${isSelected ? 'checked' : ''}
                  style="position: absolute; opacity: 0; width: 0; height: 0;"
                >
                <label 
                  for="uso_${uso.replace(/[^a-zA-Z0-9]/g, '_')}" 
                  class="uso-label"
                  style="
                    padding: 6px 14px;
                    background: ${isSelected ? '#3b82f6' : 'white'};
                    color: ${isSelected ? 'white' : '#334155'};
                    border: 1px solid ${isSelected ? '#3b82f6' : '#e2e8f0'};
                    border-radius: 30px;
                    font-size: 12px;
                    cursor: pointer;
                    transition: all 0.2s;
                    display: inline-block;
                    white-space: nowrap;
                    max-width: 250px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                  "
                  title="${uso}"
                >
                  ${categorizado.nombreAbreviado}
                </label>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }
  
  return html;
}

function filtrarUsosPorBusqueda(busqueda) {
  const categoriaActiva = document.querySelector('.categoria-tab.activo')?.dataset.categoria || Object.keys(usosCategorizados)[0];
  
  if (!busqueda) {
    document.getElementById('contenedorSubcategoriasModal').innerHTML = renderizarSubcategorias(categoriaActiva);
    asignarEventosCheckboxes();
    return;
  }
  
  const busquedaNormalizada = normalizarTextoParaCategoria(busqueda);
  const categoria = usosCategorizados[categoriaActiva];
  let html = '';
  
  for (const [subKey, subcategoria] of Object.entries(categoria.subcategorias)) {
    const usosFiltrados = [...subcategoria.usos].filter(uso => 
      normalizarTextoParaCategoria(uso).includes(busquedaNormalizada) ||
      normalizarTextoParaCategoria(abreviarTexto(uso)).includes(busquedaNormalizada)
    );
    
    if (usosFiltrados.length === 0) continue;
    
    html += `
      <div style="margin-bottom: 20px; background: white; border-radius: 16px; padding: 16px; border: 1px solid #f1f5f9;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
          <h4 style="margin: 0; font-size: 14px; font-weight: 600; color: #0f172a;">
            ${subcategoria.nombre}
            <span style="margin-left: 8px; background: #f1f5f9; color: #475569; padding: 2px 10px; border-radius: 20px; font-size: 11px;">
              ${usosFiltrados.length}
            </span>
          </h4>
        </div>
        
        <div style="display: flex; flex-wrap: wrap; gap: 8px;">
          ${usosFiltrados.sort().map(uso => {
            const categorizado = categorizarUso(uso);
            const isSelected = usosSeleccionados.has(uso);
            return `
              <div style="position: relative; display: inline-flex; align-items: center;">
                <input 
                  type="checkbox" 
                  id="bus_${uso.replace(/[^a-zA-Z0-9]/g, '_')}" 
                  value="${uso}"
                  data-uso-original="${uso}"
                  ${isSelected ? 'checked' : ''}
                  style="position: absolute; opacity: 0; width: 0; height: 0;"
                >
                <label 
                  for="bus_${uso.replace(/[^a-zA-Z0-9]/g, '_')}" 
                  class="uso-label"
                  style="
                    padding: 6px 14px;
                    background: ${isSelected ? '#3b82f6' : 'white'};
                    color: ${isSelected ? 'white' : '#334155'};
                    border: 1px solid ${isSelected ? '#3b82f6' : '#e2e8f0'};
                    border-radius: 30px;
                    font-size: 12px;
                    cursor: pointer;
                    transition: all 0.2s;
                  "
                  title="${uso}"
                >
                  ${categorizado.nombreAbreviado}
                </label>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }
  
  if (html === '') {
    html = '<div class="status-message" style="padding: 40px;">🔍 No se encontraron usos que coincidan con la búsqueda</div>';
  }
  
  document.getElementById('contenedorSubcategoriasModal').innerHTML = html;
  asignarEventosCheckboxes();
}

function asignarEventosCheckboxes() {
  document.querySelectorAll('#modalFiltros input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', function(e) {
      const label = this.nextElementSibling;
      if (this.checked) {
        label.style.background = '#3b82f6';
        label.style.color = 'white';
        label.style.borderColor = '#3b82f6';
      } else {
        label.style.background = 'white';
        label.style.color = '#334155';
        label.style.borderColor = '#e2e8f0';
      }
    });
  });
  
  document.querySelectorAll('.btn-seleccionar-subcategoria').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const categoria = this.dataset.categoria;
      const subcategoria = this.dataset.subcategoria;
      
      const checkboxes = document.querySelectorAll(`.usos-subcategoria-${categoria}-${subcategoria} input[type="checkbox"]`);
      const todasSeleccionadas = [...checkboxes].every(cb => cb.checked);
      
      checkboxes.forEach(cb => {
        cb.checked = !todasSeleccionadas;
        const event = new Event('change', { bubbles: true });
        cb.dispatchEvent(event);
      });
      
      this.innerHTML = todasSeleccionadas ? '✓ Subcategoría' : '✕ Deseleccionar';
    });
  });
}

// ===============================
// FUNCIONES DE FILTROS
// ===============================
function seleccionarTodosLosFiltros() {
  document.querySelectorAll('#modalFiltros input[type="checkbox"]').forEach(checkbox => {
    checkbox.checked = true;
    const event = new Event('change', { bubbles: true });
    checkbox.dispatchEvent(event);
  });
}

function deseleccionarTodosLosFiltros() {
  document.querySelectorAll('#modalFiltros input[type="checkbox"]').forEach(checkbox => {
    checkbox.checked = false;
    const event = new Event('change', { bubbles: true });
    checkbox.dispatchEvent(event);
  });
}

function abrirModalFiltros() {
  const modal = document.getElementById("modalFiltros");
  if (modal) {
    modal.style.display = "flex";
  }
}

function cerrarModalFiltros() {
  const modal = document.getElementById("modalFiltros");
  if (modal) {
    modal.style.display = "none";
  }
}

function aplicarFiltrosModal() {
  usosSeleccionados.clear();
  
  document.querySelectorAll('#modalFiltros input[type="checkbox"]:checked').forEach(checkbox => {
    const uso = checkbox.dataset.usoOriginal || checkbox.value;
    if (uso) usosSeleccionados.add(uso);
  });

  actualizarFiltrosSidebar();
  cerrarModalFiltros();
  refrescarBusqueda();
  
  const btnFiltros = document.getElementById('btnAbrirFiltros');
  if (usosSeleccionados.size > 0) {
    btnFiltros.innerHTML = `Filtros (${usosSeleccionados.size})`;
  } else {
    btnFiltros.innerHTML = 'Aplicar filtros';
  }
}

function actualizarFiltrosSidebar() {
  const contenedorSeleccionados = document.getElementById("filtrosSeleccionados");
  if (!contenedorSeleccionados) return;
  
  if (usosSeleccionados.size === 0) {
    contenedorSeleccionados.innerHTML = "<em style='color: #94a3b8; font-size: 13px;'>Sin filtros aplicados</em>";
    const btnFiltros = document.getElementById('btnAbrirFiltros');
    if (btnFiltros) btnFiltros.innerHTML = 'Aplicar filtros';
    return;
  }

  const tags = [...usosSeleccionados].map(u => {
    const categorizado = categorizarUso(u);
    return `
      <span class="tag-filtro">
        ${categorizado.nombreAbreviado}
        <span onclick="window.eliminarFiltro('${u.replace(/'/g, "\\'")}')" style="cursor: pointer; font-size: 14px; margin-left: 4px; opacity: 0.7;">✕</span>
      </span>
    `;
  }).join("");

  contenedorSeleccionados.innerHTML = tags;
  
  const btnFiltros = document.getElementById('btnAbrirFiltros');
  if (btnFiltros) {
    btnFiltros.innerHTML = `Filtros (${usosSeleccionados.size})`;
  }
}

window.eliminarFiltro = function(uso) {
  usosSeleccionados.delete(uso);
  actualizarFiltrosSidebar();
  refrescarBusqueda();
  
  document.querySelectorAll(`#modalFiltros input[type="checkbox"][value="${uso.replace(/"/g, '\\"')}"]`).forEach(cb => {
    cb.checked = false;
    const event = new Event('change', { bubbles: true });
    cb.dispatchEvent(event);
  });
};

// ===============================
// BUSCAR USOS PERMITIDOS EN PARCELA
// ===============================
async function buscarUsosPermitidosEnParcela(geometriaParcela) {
  if (!geometriaParcela) return new Set();
  
  usosPermitidosParcela.clear();
  if (usosParcelaLayer) usosParcelaLayer.clearLayers();
  
  try {
    let puntoBusqueda;
    
    if (geometriaParcela.type === 'Polygon' || geometriaParcela.type === 'MultiPolygon') {
      const coords = geometriaParcela.type === 'Polygon' 
        ? geometriaParcela.coordinates[0] 
        : geometriaParcela.coordinates[0][0];
      
      const sumLat = coords.reduce((sum, coord) => sum + coord[1], 0);
      const sumLng = coords.reduce((sum, coord) => sum + coord[0], 0);
      puntoBusqueda = [sumLng / coords.length, sumLat / coords.length];
    } else {
      puntoBusqueda = [geometriaParcela.coordinates[0], geometriaParcela.coordinates[1]];
    }
    
    const params = new URLSearchParams({
      geometry: `${puntoBusqueda[0]},${puntoBusqueda[1]}`,
      geometryType: "esriGeometryPoint",
      inSR: 4326,
      spatialRel: "esriSpatialRelIntersects",
      distance: RADIO_BUSQUEDA_USOS,
      units: "esriSRUnit_Meter",
      outFields: "nombre_fantasia,calle,numero,desc_full",
      returnGeometry: true,
      f: "geojson"
    });
    
    const res = await fetch(`${COMERCIOS_URL}?${params}`);
    if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);
    
    const geojson = await res.json();
    const usosEncontrados = new Set();
    
    if (geojson.features && geojson.features.length > 0) {
      geojson.features.forEach(f => {
        const c = f.properties;
        const inter = tablaIntermedia[normalizar(c.desc_full)];
        const uso = inter?.usos__subrubro__ordenanza_4114_ || "Sin clasificar";
        usosEncontrados.add(uso);
        
        L.circleMarker([f.geometry.coordinates[1], f.geometry.coordinates[0]], {
          radius: 8,
          color: "#8b5cf6",
          weight: 3,
          fillColor: "#a78bfa",
          fillOpacity: 0.9,
          dashArray: "3"
        })
        .bindTooltip(`🏪 Define uso: ${uso}`, { permanent: false, direction: 'top' })
        .addTo(usosParcelaLayer);
      });
    }
    
    usosPermitidosParcela = usosEncontrados;
    mostrarUsosPermitidos();
    return usosEncontrados;
    
  } catch (error) {
    console.error("Error buscando usos permitidos:", error);
    return new Set();
  }
}

function mostrarUsosPermitidos() {
  const usosSection = document.getElementById("usosPermitidosSection");
  const usosContent = document.getElementById("usosPermitidosContent");
  
  if (usosPermitidosParcela.size === 0) {
    usosSection.style.display = "none";
    return;
  }
  
  const tags = [...usosPermitidosParcela].sort().map(u => {
    const categorizado = categorizarUso(u);
    return `
      <span class="tag-filtro tag-permitido" style="
        background: linear-gradient(135deg, #86efac 0%, #4ade80 100%);
        color: #14532d;
        border: 1px solid #22c55e;
      ">
        ✓ ${categorizado.nombreAbreviado}
      </span>
    `;
  }).join("");
  
  usosContent.innerHTML = `
    <div style="margin-bottom: 12px; font-size: 13px; color: #166534;">
      <strong>📌 Comercios en esta parcela:</strong> ${usosPermitidosParcela.size} uso(s) detectado(s)
    </div>
    <div style="display: flex; flex-wrap: wrap; gap: 8px;">
      ${tags}
    </div>
    <button id="btnFiltrarPorParcela" style="
      width: 100%;
      padding: 10px;
      background: #86efac;
      border: none;
      border-radius: 12px;
      color: #14532d;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      margin-top: 16px;
      transition: all 0.2s;
    ">
      🔍 Filtrar solo usos permitidos en esta parcela
    </button>
  `;
  
  usosSection.style.display = "block";
  
  document.getElementById('btnFiltrarPorParcela')?.addEventListener('click', () => {
    usosSeleccionados.clear();
    usosPermitidosParcela.forEach(u => usosSeleccionados.add(u));
    actualizarFiltrosSidebar();
    refrescarBusqueda();
    
    const btn = document.getElementById('btnFiltrarPorParcela');
    btn.innerHTML = '✓ Filtros aplicados';
    btn.style.background = '#4ade80';
    setTimeout(() => {
      btn.innerHTML = '🔍 Filtrar solo usos permitidos en esta parcela';
      btn.style.background = '#86efac';
    }, 2000);
  });
}

// ===============================
// INFORMACIÓN DE PARCELA
// ===============================
function mostrarInfoParcela(parcelaData) {
  const parcelaSection = document.getElementById("parcelaInfoSection");
  const parcelaContent = document.getElementById("parcelaInfoContent");
  
  if (!parcelaData) {
    parcelaSection.style.display = "none";
    return;
  }
  
  const atributos = parcelaData.properties || {};
  const camposZonificacion = [
    { campo: 'ZONIFICACION', etiqueta: 'Zonificación' },
    { campo: 'ZONA', etiqueta: 'Zona' },
    { campo: 'USO', etiqueta: 'Uso principal' },
    { campo: 'DISTRITO', etiqueta: 'Distrito' },
    { campo: 'SUBZONA', etiqueta: 'Subzona' },
    { campo: 'ORDENANZA', etiqueta: 'Ordenanza' },
    { campo: 'SUP', etiqueta: 'Superficie' },
    { campo: 'MANZANA', etiqueta: 'Manzana' },
    { campo: 'PARCELA', etiqueta: 'Parcela' }
  ];
  
  const infoDisponible = camposZonificacion
    .filter(({ campo }) => atributos[campo])
    .map(({ campo, etiqueta }) => ({ etiqueta, valor: atributos[campo] }));
  
  let html = '';
  
  if (infoDisponible.length > 0) {
    html += '<div style="margin-bottom: 12px;">';
    infoDisponible.forEach(({ etiqueta, valor }) => {
      html += `
        <div style="display: flex; margin-bottom: 8px; font-size: 13px;">
          <span style="color: #64748b; width: 100px;">${etiqueta}:</span>
          <span style="color: #0f172a; font-weight: 500;">${valor}</span>
        </div>
      `;
    });
    html += '</div>';
  } else {
    html = '<p style="color: #64748b; font-size: 13px; margin-bottom: 12px;">No hay información de zonificación disponible</p>';
  }
  
  if (usosPermitidosParcela.size > 0) {
    html += `
      <div style="
        background: #f0fdf4;
        border-left: 4px solid #22c55e;
        padding: 12px;
        border-radius: 8px;
        margin-top: 12px;
      ">
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
          <span style="font-size: 18px;">✅</span>
          <span style="font-weight: 600; color: #166534;">Usos detectados en esta parcela:</span>
        </div>
        <div style="display: flex; flex-wrap: wrap; gap: 6px;">
          ${[...usosPermitidosParcela].map(u => {
            const categorizado = categorizarUso(u);
            return `<span style="
              background: #dcfce7;
              color: #166534;
              padding: 4px 10px;
              border-radius: 20px;
              font-size: 11px;
              font-weight: 500;
            ">${categorizado.nombreAbreviado}</span>`;
          }).join('')}
        </div>
      </div>
    `;
  }
  
  parcelaContent.innerHTML = html;
  parcelaSection.style.display = "block";
}

// ===============================
// CLICK MAPA Y BÚSQUEDAS
// ===============================
map.on("click", async function(e) {
  try {
    limpiarCapas();
    const latlng = e.latlng;
    
    puntoMarker = L.marker(latlng, {
      icon: L.divIcon({
        className: 'custom-marker',
        html: '<span style="font-size: 24px;">📍</span>',
        iconSize: [24, 24],
        iconAnchor: [12, 24]
      })
    }).addTo(map);
    
    bufferLayer = L.circle(latlng, {
      radius: BUFFER_METROS,
      color: "#3b82f6",
      weight: 2,
      fillColor: "#3b82f6",
      fillOpacity: 0.1
    }).addTo(map);

    await buscarParcelaMasCercana(latlng);
    await buscarComercios(latlng);
    
  } catch (error) {
    console.error("Error al hacer clic en el mapa:", error);
  }
});

async function flujoClickMapa(latlng) {
  try {
    limpiarCapas();
    
    puntoMarker = L.marker(latlng, {
      icon: L.divIcon({
        className: 'custom-marker',
        html: '<span style="font-size: 24px;">📍</span>',
        iconSize: [24, 24],
        iconAnchor: [12, 24]
      })
    }).addTo(map);
    
    bufferLayer = L.circle(latlng, {
      radius: BUFFER_METROS,
      color: "#3b82f6",
      weight: 2,
      fillColor: "#3b82f6",
      fillOpacity: 0.1
    }).addTo(map);

    await buscarParcelaMasCercana(latlng);
    await buscarComercios(latlng);
  } catch (error) {
    console.error("Error en flujoClickMapa:", error);
  }
}

async function buscarParcelaMasCercana(latlng) {
  if (!latlng) {
    console.error("Coordenadas inválidas para buscar parcela");
    return;
  }
  
  const params = new URLSearchParams({
    geometry: `${latlng.lng},${latlng.lat}`,
    geometryType: "esriGeometryPoint",
    inSR: 4326,
    spatialRel: "esriSpatialRelIntersects",
    distance: 5,
    units: "esriSRUnit_Meter",
    outFields: "*",
    returnGeometry: true,
    f: "geojson"
  });

  try {
    const res = await fetch(`${ZONIFICACION_URL}?${params}`);
    if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);
    
    const geojson = await res.json();
    
    if (!geojson.features || geojson.features.length === 0) {
      parcelaActual = null;
      mostrarInfoParcela(null);
      document.getElementById("usosPermitidosSection").style.display = "none";
      return;
    }
    
    parcelaActual = geojson.features[0];
    
    if (parcelaLayer) map.removeLayer(parcelaLayer);
    
    parcelaLayer = L.geoJSON(geojson, {
      style: { color: "#ef4444", weight: 3, fillOpacity: 0.1, fillColor: "#ef4444" }
    }).addTo(map);
    
    await buscarUsosPermitidosEnParcela(parcelaActual.geometry);
    mostrarInfoParcela(parcelaActual);
    
  } catch (error) {
    console.error("Error buscando parcela:", error);
    parcelaActual = null;
    mostrarInfoParcela(null);
    document.getElementById("usosPermitidosSection").style.display = "none";
  }
}

async function buscarComercios(latlng) {
  if (!latlng) {
    console.error("Coordenadas inválidas para buscar comercios");
    return;
  }
  
  const params = new URLSearchParams({
    geometry: `${latlng.lng},${latlng.lat}`,
    geometryType: "esriGeometryPoint",
    inSR: 4326,
    spatialRel: "esriSpatialRelIntersects",
    distance: BUFFER_METROS,
    units: "esriSRUnit_Meter",
    outFields: "nombre_fantasia,calle,numero,desc_full",
    returnGeometry: true,
    f: "geojson"
  });

  try {
    const res = await fetch(`${COMERCIOS_URL}?${params}`);
    if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);
    
    const geojson = await res.json();
    const mapa = {};

    if (geojson.features && geojson.features.length > 0) {
      geojson.features.forEach(f => {
        const c = f.properties;
        const clave = normalizar(`${c.nombre_fantasia}|${c.calle}|${c.numero}`);
        const inter = tablaIntermedia[normalizar(c.desc_full)];
        const uso = inter?.usos__subrubro__ordenanza_4114_ || "Sin clasificar";

        if (!mapa[clave]) {
          mapa[clave] = {
            nombre_fantasia: c.nombre_fantasia || "Sin nombre",
            calle: c.calle || "",
            numero: c.numero || "",
            latlng: [f.geometry.coordinates[1], f.geometry.coordinates[0]],
            usos: new Set()
          };
        }
        mapa[clave].usos.add(uso);
      });
    }

    comerciosBuffer = Object.values(mapa)
      .map(c => ({ ...c, usos: [...c.usos] }))
      .filter(c => usosSeleccionados.size === 0 ? true : c.usos.some(u => usosSeleccionados.has(u)));

    renderizarComercios();
    renderizarKPIs(); // NUEVO: Renderizar KPIs después de buscar comercios
    // Dentro de buscarComercios(), después de renderizarComercios();
renderizarKPIs(); // ← AGREGAR ESTA LÍNEA
  } catch (error) {
    console.error("Error buscando comercios:", error);
    comerciosBuffer = [];
    renderizarComercios();
    renderizarKPIs(); // NUEVO: Renderizar KPIs incluso si no hay comercios
  }
}

function renderizarComercios() {
  comerciosLayer.clearLayers();
  markersComercios = [];

  const lista = document.getElementById("listaResultados");
  const countSpan = document.getElementById("resultadosCount");
  
  if (comerciosBuffer.length === 0) {
    lista.innerHTML = `
      <div class="status-message">
        <span style="font-size: 24px; display: block; margin-bottom: 8px;">🏪</span>
        No se encontraron comercios<br>en este radio
      </div>
    `;
    if (countSpan) countSpan.textContent = '0';
    return;
  }

  if (countSpan) countSpan.textContent = comerciosBuffer.length;
  lista.innerHTML = "";

  comerciosBuffer.forEach(c => {
    const estaEnParcela = c.usos.some(u => usosPermitidosParcela.has(u));
    
    const marker = L.circleMarker(c.latlng, {
      radius: estaEnParcela ? 8 : 7,
      color: estaEnParcela ? "#8b5cf6" : "#3b82f6",
      weight: estaEnParcela ? 3 : 2,
      fillColor: estaEnParcela ? "#a78bfa" : "#3b82f6",
      fillOpacity: 0.9,
      dashArray: estaEnParcela ? "3" : null
    }).addTo(comerciosLayer);

    if (estaEnParcela) {
      marker.bindTooltip(`📍 En la parcela seleccionada`, { permanent: false, direction: 'top' });
    }

    markersComercios.push(marker);

    const card = document.createElement("div");
    card.className = "comercio-card";
    
    if (estaEnParcela) {
      card.style.borderLeft = "4px solid #8b5cf6";
      card.style.background = "#faf5ff";
    }

    card.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: start;">
        <div class="comercio-nombre">${c.nombre_fantasia || "Sin nombre"}</div>
        ${estaEnParcela ? '<span style="background: #8b5cf6; color: white; padding: 2px 8px; border-radius: 12px; font-size: 10px;">En la parcela</span>' : ''}
      </div>
      <div class="comercio-direccion">
        <span style="font-size: 14px;">📍</span>
        ${c.calle || ""} ${c.numero || ""}
      </div>
      <ul class="comercio-usos">
        ${c.usos.map(u => {
          const categorizado = categorizarUso(u);
          return `<li ${usosPermitidosParcela.has(u) ? 'style="background: #8b5cf6; color: white;"' : ''}>${categorizado.nombreAbreviado}</li>`;
        }).join("")}
      </ul>
    `;

    card.onclick = () => {
      map.setView(c.latlng, 18);
      markersComercios.forEach(m => m.setStyle({ radius: 7, color: "#3b82f6", fillColor: "#3b82f6", fillOpacity: 0.7 }));
      marker.setStyle({ radius: 10, color: "#ef4444", fillColor: "#ef4444", fillOpacity: 0.9 });
      card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    };

    lista.appendChild(card);
  });
}

function limpiarCapas() {
  try {
    if (parcelaLayer) { map.removeLayer(parcelaLayer); parcelaLayer = null; }
    if (bufferLayer) { map.removeLayer(bufferLayer); bufferLayer = null; }
    if (puntoMarker) { map.removeLayer(puntoMarker); puntoMarker = null; }
    if (comerciosLayer) comerciosLayer.clearLayers();
    if (usosParcelaLayer) usosParcelaLayer.clearLayers();
    
    parcelaActual = null;
    usosPermitidosParcela.clear();
    
    const parcelaSection = document.getElementById("parcelaInfoSection");
    if (parcelaSection) parcelaSection.style.display = "none";
    const usosSection = document.getElementById("usosPermitidosSection");
    if (usosSection) usosSection.style.display = "none";
    
    // Ocultar KPIs también al limpiar
    const kpisContainer = document.getElementById('kpisContainer');
    if (kpisContainer) kpisContainer.style.display = 'none';
    
  } catch (error) {
    console.error("Error al limpiar capas:", error);
  }
  // Al final de limpiarCapas(), antes del catch
const kpisContainer = document.getElementById('kpisContainer');
if (kpisContainer) kpisContainer.style.display = 'none';
}

function refrescarBusqueda() {
  if (puntoMarker) {
    buscarComercios(puntoMarker.getLatLng());
  }
}

// ===============================
// BUSCAR DIRECCIÓN
// ===============================
async function buscarDireccion() {
  const inputDireccion = document.getElementById("inputDireccion");
  const texto = inputDireccion.value.trim();
  if (!texto) return;

  const estado = document.getElementById('estado');
  if (estado) estado.innerHTML = '🔍 Buscando dirección...';

  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
    texto + ", Mendoza, Argentina"
  )}&limit=1`;

  try {
    const res = await fetch(url, {
      headers: { 'Accept': 'application/json', 'User-Agent': 'MapaZonificacion/1.0' }
    });
    
    if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);
    
    const data = await res.json();
    
    if (!data || data.length === 0) {
      if (estado) {
        estado.innerHTML = '❌ No se encontró la dirección';
        setTimeout(() => estado.innerHTML = 'Hacé clic en el mapa o buscá una dirección', 3000);
      }
      return;
    }

    const latlng = L.latLng(parseFloat(data[0].lat), parseFloat(data[0].lon));
    limpiarCapas();
    
    puntoMarker = L.marker(latlng, {
      icon: L.divIcon({
        className: 'custom-marker',
        html: '<span style="font-size: 24px;">📍</span>',
        iconSize: [24, 24],
        iconAnchor: [12, 24]
      })
    }).addTo(map);
    
    bufferLayer = L.circle(latlng, {
      radius: BUFFER_METROS,
      color: "#3b82f6",
      weight: 2,
      fillColor: "#3b82f6",
      fillOpacity: 0.1
    }).addTo(map);
    
    map.setView(latlng, MAP_ZOOM);
    
    await buscarParcelaMasCercana(latlng);
    await buscarComercios(latlng);
    
    if (estado) {
      estado.innerHTML = '✅ Dirección encontrada';
      setTimeout(() => estado.innerHTML = 'Hacé clic en el mapa o buscá una dirección', 2000);
    }
    
  } catch (error) {
    console.error("Error en búsqueda de dirección:", error);
    if (estado) {
      estado.innerHTML = '❌ Error al buscar la dirección';
      setTimeout(() => estado.innerHTML = 'Hacé clic en el mapa o buscá una dirección', 3000);
    }
  }
}