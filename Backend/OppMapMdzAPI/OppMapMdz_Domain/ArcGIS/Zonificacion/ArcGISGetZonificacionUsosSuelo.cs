using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OppMapMdz_Domain.ArcGIS.Zonificacion
{
    public class ArcGISGetZonificacionUsosSuelo
    {
        [JsonProperty("attributes", NullValueHandling = NullValueHandling.Ignore)]
        public AttributesZonificacionUsosSuelo Attributes { get; set; }

        [JsonProperty("geometry", NullValueHandling = NullValueHandling.Ignore)]
        public GeometryZonificacionUsosSuelo Geometry { get; set; }
    }

    public partial class AttributesZonificacionUsosSuelo
    {
        [JsonProperty("objectid", NullValueHandling = NullValueHandling.Ignore)]
        public long? Objectid { get; set; }

        [JsonProperty("par_nomenc", NullValueHandling = NullValueHandling.Ignore)]
        public string ParNomenc { get; set; }

        [JsonProperty("par_pad_mu", NullValueHandling = NullValueHandling.Ignore)]
        public string ParPadMu { get; set; }

        [JsonProperty("nombre_zon", NullValueHandling = NullValueHandling.Ignore)]
        public string NombreZon { get; set; }

        [JsonProperty("etiqueta", NullValueHandling = NullValueHandling.Ignore)]
        public string Etiqueta { get; set; }

        [JsonProperty("zona", NullValueHandling = NullValueHandling.Ignore)]
        public string Zona { get; set; }

        [JsonProperty("minimercado_min", NullValueHandling = NullValueHandling.Ignore)]
        public string MinimercadoMin { get; set; }

        [JsonProperty("carnes_min", NullValueHandling = NullValueHandling.Ignore)]
        public string CarnesMin { get; set; }

        [JsonProperty("kiosco_min", NullValueHandling = NullValueHandling.Ignore)]
        public string KioscoMin { get; set; }

        [JsonProperty("panaderia_min", NullValueHandling = NullValueHandling.Ignore)]
        public string PanaderiaMin { get; set; }

        [JsonProperty("dietetica_herboristeria_min", NullValueHandling = NullValueHandling.Ignore)]
        public string DieteticaHerboristeriaMin { get; set; }

        [JsonProperty("fiambreria_min", NullValueHandling = NullValueHandling.Ignore)]
        public string FiambreriaMin { get; set; }

        [JsonProperty("fruteria_verduleria_min", NullValueHandling = NullValueHandling.Ignore)]
        public string FruteriaVerduleriaMin { get; set; }

        [JsonProperty("bebidas_min", NullValueHandling = NullValueHandling.Ignore)]
        public string BebidasMin { get; set; }

        [JsonProperty("pastas_min", NullValueHandling = NullValueHandling.Ignore)]
        public string PastasMin { get; set; }

        [JsonProperty("tabaco_subproductos_min", NullValueHandling = NullValueHandling.Ignore)]
        public string TabacoSubproductosMin { get; set; }

        [JsonProperty("automotores_min", NullValueHandling = NullValueHandling.Ignore)]
        public string AutomotoresMin { get; set; }

        [JsonProperty("bicicletas_monopatines_min", NullValueHandling = NullValueHandling.Ignore)]
        public string BicicletasMonopatinesMin { get; set; }

        [JsonProperty("accesorios_repuestos_automotore", NullValueHandling = NullValueHandling.Ignore)]
        public string AccesoriosRepuestosAutomotore { get; set; }

        [JsonProperty("accesorios_repuestos_bicicletas", NullValueHandling = NullValueHandling.Ignore)]
        public string AccesoriosRepuestosBicicletas { get; set; }

        [JsonProperty("articulos_mimbre_corcho_plastic", NullValueHandling = NullValueHandling.Ignore)]
        public string ArticulosMimbreCorchoPlastic { get; set; }

        [JsonProperty("articulos_instalaciones_electri", NullValueHandling = NullValueHandling.Ignore)]
        public string ArticulosInstalacionesElectri { get; set; }

        [JsonProperty("materiales_construccion_sin_mov", NullValueHandling = NullValueHandling.Ignore)]
        public string MaterialesConstruccionSinMov { get; set; }

        [JsonProperty("materiales_construccin_con_mov_", NullValueHandling = NullValueHandling.Ignore)]
        public string MaterialesConstruccinConMov { get; set; }

        [JsonProperty("pintureria_min", NullValueHandling = NullValueHandling.Ignore)]
        public string PintureriaMin { get; set; }

        [JsonProperty("ferreteria_min", NullValueHandling = NullValueHandling.Ignore)]
        public string FerreteriaMin { get; set; }

        [JsonProperty("garrafas_min", NullValueHandling = NullValueHandling.Ignore)]
        public string GarrafasMin { get; set; }

        [JsonProperty("matafuegos_min", NullValueHandling = NullValueHandling.Ignore)]
        public string MatafuegosMin { get; set; }

        [JsonProperty("productos_articulos_limpieza_mi", NullValueHandling = NullValueHandling.Ignore)]
        public string ProductosArticulosLimpiezaMi { get; set; }

        [JsonProperty("libreria_min", NullValueHandling = NullValueHandling.Ignore)]
        public string LibreriaMin { get; set; }

        [JsonProperty("viviendas_prefabricadas_min", NullValueHandling = NullValueHandling.Ignore)]
        public string ViviendasPrefabricadasMin { get; set; }

        [JsonProperty("articulos_electronica_computaci", NullValueHandling = NullValueHandling.Ignore)]
        public string ArticulosElectronicaComputaci { get; set; }

        [JsonProperty("instrumentos_sonido_audio_video", NullValueHandling = NullValueHandling.Ignore)]
        public string InstrumentosSonidoAudioVideo { get; set; }

        [JsonProperty("casa_remates_min", NullValueHandling = NullValueHandling.Ignore)]
        public string CasaRematesMin { get; set; }

        [JsonProperty("muebles_min", NullValueHandling = NullValueHandling.Ignore)]
        public string MueblesMin { get; set; }

        [JsonProperty("articulos_regionales_artesanale", NullValueHandling = NullValueHandling.Ignore)]
        public string ArticulosRegionalesArtesanale { get; set; }

        [JsonProperty("articulos_coleccion_arte_religi", NullValueHandling = NullValueHandling.Ignore)]
        public string ArticulosColeccionArteReligi { get; set; }

        [JsonProperty("colchones_sommiers_min", NullValueHandling = NullValueHandling.Ignore)]
        public string ColchonesSommiersMin { get; set; }

        [JsonProperty("bazar_iluminacion_decoracion_mi", NullValueHandling = NullValueHandling.Ignore)]
        public string BazarIluminacionDecoracionMi { get; set; }

        [JsonProperty("cotillon_juguetes_min", NullValueHandling = NullValueHandling.Ignore)]
        public string CotillonJuguetesMin { get; set; }

        [JsonProperty("cueros_min", NullValueHandling = NullValueHandling.Ignore)]
        public string CuerosMin { get; set; }

        [JsonProperty("indumentaria_min", NullValueHandling = NullValueHandling.Ignore)]
        public string IndumentariaMin { get; set; }

        [JsonProperty("joyeria_relojeria_min", NullValueHandling = NullValueHandling.Ignore)]
        public string JoyeriaRelojeriaMin { get; set; }

        [JsonProperty("productos_confeccion_min", NullValueHandling = NullValueHandling.Ignore)]
        public string ProductosConfeccionMin { get; set; }

        [JsonProperty("optica_min", NullValueHandling = NullValueHandling.Ignore)]
        public string OpticaMin { get; set; }

        [JsonProperty("panaleria_min", NullValueHandling = NullValueHandling.Ignore)]
        public string PanaleriaMin { get; set; }

        [JsonProperty("sex_shop_min", NullValueHandling = NullValueHandling.Ignore)]
        public string SexShopMin { get; set; }

        [JsonProperty("drogueria_a_min", NullValueHandling = NullValueHandling.Ignore)]
        public string DrogueriaAMin { get; set; }

        [JsonProperty("drogueria_b_min", NullValueHandling = NullValueHandling.Ignore)]
        public string DrogueriaBMin { get; set; }

        [JsonProperty("farmacia_min", NullValueHandling = NullValueHandling.Ignore)]
        public string FarmaciaMin { get; set; }

        [JsonProperty("insumos_medicos_odontologicos_o", NullValueHandling = NullValueHandling.Ignore)]
        public string InsumosMedicosOdontologicosO { get; set; }

        [JsonProperty("perfumeria_cosmeticos_min", NullValueHandling = NullValueHandling.Ignore)]
        public string PerfumeriaCosmeticosMin { get; set; }

        [JsonProperty("armas_cuchilleria_min", NullValueHandling = NullValueHandling.Ignore)]
        public string ArmasCuchilleriaMin { get; set; }

        [JsonProperty("articulos_indumentaria_deporte_", NullValueHandling = NullValueHandling.Ignore)]
        public string ArticulosIndumentariaDeporte { get; set; }

        [JsonProperty("productos_quimicos_agricolas_mi", NullValueHandling = NullValueHandling.Ignore)]
        public string ProductosQuimicosAgricolasMi { get; set; }

        [JsonProperty("productos_veterinarios_min", NullValueHandling = NullValueHandling.Ignore)]
        public string ProductosVeterinariosMin { get; set; }

        [JsonProperty("vivero_min", NullValueHandling = NullValueHandling.Ignore)]
        public string ViveroMin { get; set; }

        [JsonProperty("floreria_min", NullValueHandling = NullValueHandling.Ignore)]
        public string FloreriaMin { get; set; }

        [JsonProperty("hipermercado_min", NullValueHandling = NullValueHandling.Ignore)]
        public string HipermercadoMin { get; set; }

        [JsonProperty("supermercado_min", NullValueHandling = NullValueHandling.Ignore)]
        public string SupermercadoMin { get; set; }

        [JsonProperty("grandes_tiendas_min", NullValueHandling = NullValueHandling.Ignore)]
        public string GrandesTiendasMin { get; set; }

        [JsonProperty("galeria_comercial_min", NullValueHandling = NullValueHandling.Ignore)]
        public string GaleriaComercialMin { get; set; }

        [JsonProperty("shopping_min", NullValueHandling = NullValueHandling.Ignore)]
        public string ShoppingMin { get; set; }

        [JsonProperty("ferias_artesanos_min", NullValueHandling = NullValueHandling.Ignore)]
        public string FeriasArtesanosMin { get; set; }

        [JsonProperty("productos_no_perecederos_may", NullValueHandling = NullValueHandling.Ignore)]
        public string ProductosNoPerecederosMay { get; set; }

        [JsonProperty("productos_perecederos_may", NullValueHandling = NullValueHandling.Ignore)]
        public string ProductosPerecederosMay { get; set; }

        [JsonProperty("bebidas_may", NullValueHandling = NullValueHandling.Ignore)]
        public string BebidasMay { get; set; }

        [JsonProperty("accesorios_repuestos_automotor_", NullValueHandling = NullValueHandling.Ignore)]
        public string AccesoriosRepuestosAutomotor { get; set; }

        [JsonProperty("bicicletas_may", NullValueHandling = NullValueHandling.Ignore)]
        public string BicicletasMay { get; set; }

        [JsonProperty("articulos_mimbre_corcho_plast_1", NullValueHandling = NullValueHandling.Ignore)]
        public string ArticulosMimbreCorchoPlast1 { get; set; }

        [JsonProperty("articulos_instalaciones_elect_1", NullValueHandling = NullValueHandling.Ignore)]
        public string ArticulosInstalacionesElect1 { get; set; }

        [JsonProperty("ferreteria_may", NullValueHandling = NullValueHandling.Ignore)]
        public string FerreteriaMay { get; set; }

        [JsonProperty("materiales_construccion_sin_m_1", NullValueHandling = NullValueHandling.Ignore)]
        public string MaterialesConstruccionSinM1 { get; set; }

        [JsonProperty("materiales_construccion_con_mov", NullValueHandling = NullValueHandling.Ignore)]
        public string MaterialesConstruccionConMov { get; set; }

        [JsonProperty("materiales_productos_limpieza_m", NullValueHandling = NullValueHandling.Ignore)]
        public string MaterialesProductosLimpiezaM { get; set; }

        [JsonProperty("papel_carton_may", NullValueHandling = NullValueHandling.Ignore)]
        public string PapelCartonMay { get; set; }

        [JsonProperty("pintureria_may", NullValueHandling = NullValueHandling.Ignore)]
        public string PintureriaMay { get; set; }

        [JsonProperty("pirotecnia_may", NullValueHandling = NullValueHandling.Ignore)]
        public string PirotecniaMay { get; set; }

        [JsonProperty("garrafas_may", NullValueHandling = NullValueHandling.Ignore)]
        public string GarrafasMay { get; set; }

        [JsonProperty("matafuegos_may", NullValueHandling = NullValueHandling.Ignore)]
        public string MatafuegosMay { get; set; }

        [JsonProperty("articulos_electronica_computa_1", NullValueHandling = NullValueHandling.Ignore)]
        public string ArticulosElectronicaComputa1 { get; set; }

        [JsonProperty("instrumentos_sonido_audio_vid_1", NullValueHandling = NullValueHandling.Ignore)]
        public string InstrumentosSonidoAudioVid1 { get; set; }

        [JsonProperty("bazar_iluminacion_decoracion_ma", NullValueHandling = NullValueHandling.Ignore)]
        public string BazarIluminacionDecoracionMa { get; set; }

        [JsonProperty("colchones_sommiers_may", NullValueHandling = NullValueHandling.Ignore)]
        public string ColchonesSommiersMay { get; set; }

        [JsonProperty("muebles_may", NullValueHandling = NullValueHandling.Ignore)]
        public string MueblesMay { get; set; }

        [JsonProperty("juguetes_cotillon_may", NullValueHandling = NullValueHandling.Ignore)]
        public string JuguetesCotillonMay { get; set; }

        [JsonProperty("libros_may", NullValueHandling = NullValueHandling.Ignore)]
        public string LibrosMay { get; set; }

        [JsonProperty("cueros_may", NullValueHandling = NullValueHandling.Ignore)]
        public string CuerosMay { get; set; }

        [JsonProperty("indumentaria_may", NullValueHandling = NullValueHandling.Ignore)]
        public string IndumentariaMay { get; set; }

        [JsonProperty("optica_may", NullValueHandling = NullValueHandling.Ignore)]
        public string OpticaMay { get; set; }

        [JsonProperty("joyeria_relojeria_bijouterie_ma", NullValueHandling = NullValueHandling.Ignore)]
        public string JoyeriaRelojeriaBijouterieMa { get; set; }

        [JsonProperty("calzado_may", NullValueHandling = NullValueHandling.Ignore)]
        public string CalzadoMay { get; set; }

        [JsonProperty("panaleria_may", NullValueHandling = NullValueHandling.Ignore)]
        public string PanaleriaMay { get; set; }

        [JsonProperty("productos_textiles_may", NullValueHandling = NullValueHandling.Ignore)]
        public string ProductosTextilesMay { get; set; }

        [JsonProperty("drogueria_a_may", NullValueHandling = NullValueHandling.Ignore)]
        public string DrogueriaAMay { get; set; }

        [JsonProperty("drogueria_b_may", NullValueHandling = NullValueHandling.Ignore)]
        public string DrogueriaBMay { get; set; }

        [JsonProperty("insumos_medicos_odontologicos_1", NullValueHandling = NullValueHandling.Ignore)]
        public string InsumosMedicosOdontologicos1 { get; set; }

        [JsonProperty("perfumeria_cosmeticos_may", NullValueHandling = NullValueHandling.Ignore)]
        public string PerfumeriaCosmeticosMay { get; set; }

        [JsonProperty("articulos_indumentaria_deporte1", NullValueHandling = NullValueHandling.Ignore)]
        public string ArticulosIndumentariaDeporte1 { get; set; }

        [JsonProperty("productos_veterinarios_may", NullValueHandling = NullValueHandling.Ignore)]
        public string ProductosVeterinariosMay { get; set; }

        [JsonProperty("productos_quimicos_agricolas_ma", NullValueHandling = NullValueHandling.Ignore)]
        public string ProductosQuimicosAgricolasMa { get; set; }

        [JsonProperty("vivero_may", NullValueHandling = NullValueHandling.Ignore)]
        public string ViveroMay { get; set; }

        [JsonProperty("floreria_may", NullValueHandling = NullValueHandling.Ignore)]
        public string FloreriaMay { get; set; }

        [JsonProperty("bar_cerveceria_serv", NullValueHandling = NullValueHandling.Ignore)]
        public string BarCerveceriaServ { get; set; }

        [JsonProperty("cafeteria_casadete_heladeria_se", NullValueHandling = NullValueHandling.Ignore)]
        public string CafeteriaCasadeteHeladeriaSe { get; set; }

        [JsonProperty("gastronomico_consumo_serv", NullValueHandling = NullValueHandling.Ignore)]
        public string GastronomicoConsumoServ { get; set; }

        [JsonProperty("gastronomico_sin_consumo_serv", NullValueHandling = NullValueHandling.Ignore)]
        public string GastronomicoSinConsumoServ { get; set; }

        [JsonProperty("maquina_expendedora_bebidas_ser", NullValueHandling = NullValueHandling.Ignore)]
        public string MaquinaExpendedoraBebidasSer { get; set; }

        [JsonProperty("catering_serv", NullValueHandling = NullValueHandling.Ignore)]
        public string CateringServ { get; set; }

        [JsonProperty("loteria_quiniela_serv", NullValueHandling = NullValueHandling.Ignore)]
        public string LoteriaQuinielaServ { get; set; }

        [JsonProperty("viajes_turismo_serv", NullValueHandling = NullValueHandling.Ignore)]
        public string ViajesTurismoServ { get; set; }

        [JsonProperty("alquiler_equipos_fotografia_ser", NullValueHandling = NullValueHandling.Ignore)]
        public string AlquilerEquiposFotografiaSer { get; set; }

        [JsonProperty("estudio_fotografia_serv", NullValueHandling = NullValueHandling.Ignore)]
        public string EstudioFotografiaServ { get; set; }

        [JsonProperty("estudio_grabacion_musica_serv", NullValueHandling = NullValueHandling.Ignore)]
        public string EstudioGrabacionMusicaServ { get; set; }

        [JsonProperty("video_dvd_club_serv", NullValueHandling = NullValueHandling.Ignore)]
        public string VideoDvdClubServ { get; set; }

        [JsonProperty("fotocopiadora_serv", NullValueHandling = NullValueHandling.Ignore)]
        public string FotocopiadoraServ { get; set; }

        [JsonProperty("taller_artes_graficas_serv", NullValueHandling = NullValueHandling.Ignore)]
        public string TallerArtesGraficasServ { get; set; }

        [JsonProperty("estetica_corporal_serv", NullValueHandling = NullValueHandling.Ignore)]
        public string EsteticaCorporalServ { get; set; }

        [JsonProperty("taller_marcos_cuadros_serv", NullValueHandling = NullValueHandling.Ignore)]
        public string TallerMarcosCuadrosServ { get; set; }

        [JsonProperty("taller_muebles_serv", NullValueHandling = NullValueHandling.Ignore)]
        public string TallerMueblesServ { get; set; }

        [JsonProperty("taller_tapiceria_cortinas_serv", NullValueHandling = NullValueHandling.Ignore)]
        public string TallerTapiceriaCortinasServ { get; set; }

        [JsonProperty("taller_relojeria_joyeria_serv", NullValueHandling = NullValueHandling.Ignore)]
        public string TallerRelojeriaJoyeriaServ { get; set; }

        [JsonProperty("taller_cerrajeria_serv", NullValueHandling = NullValueHandling.Ignore)]
        public string TallerCerrajeriaServ { get; set; }

        [JsonProperty("taller_reparacion_colchones_ser", NullValueHandling = NullValueHandling.Ignore)]
        public string TallerReparacionColchonesSer { get; set; }

        [JsonProperty("taller_soldadura_serv", NullValueHandling = NullValueHandling.Ignore)]
        public string TallerSoldaduraServ { get; set; }

        [JsonProperty("taller_toldos_carpas_serv", NullValueHandling = NullValueHandling.Ignore)]
        public string TallerToldosCarpasServ { get; set; }

        [JsonProperty("taller_hojalateria_zingueria_se", NullValueHandling = NullValueHandling.Ignore)]
        public string TallerHojalateriaZingueriaSe { get; set; }

        [JsonProperty("afilados_serv", NullValueHandling = NullValueHandling.Ignore)]
        public string AfiladosServ { get; set; }

        [JsonProperty("taller_carpinteria_metalica_mad", NullValueHandling = NullValueHandling.Ignore)]
        public string TallerCarpinteriaMetalicaMad { get; set; }

        [JsonProperty("cromados_niquelados_galvanizado", NullValueHandling = NullValueHandling.Ignore)]
        public string CromadosNiqueladosGalvanizado { get; set; }

        [JsonProperty("recarga_matafuegos_envases_gas_", NullValueHandling = NullValueHandling.Ignore)]
        public string RecargaMatafuegosEnvasesGas { get; set; }

        [JsonProperty("torneria_serv", NullValueHandling = NullValueHandling.Ignore)]
        public string TorneriaServ { get; set; }

        [JsonProperty("ceramica_vitrofusion_artesanias", NullValueHandling = NullValueHandling.Ignore)]
        public string CeramicaVitrofusionArtesanias { get; set; }

        [JsonProperty("alquiler_indumentaria_serv", NullValueHandling = NullValueHandling.Ignore)]
        public string AlquilerIndumentariaServ { get; set; }

        [JsonProperty("taller_costura_confeccion_ropa_", NullValueHandling = NullValueHandling.Ignore)]
        public string TallerCosturaConfeccionRopa { get; set; }

        [JsonProperty("tintoreria_serv", NullValueHandling = NullValueHandling.Ignore)]
        public string TintoreriaServ { get; set; }

        [JsonProperty("taller_reparacion_calzado_marro", NullValueHandling = NullValueHandling.Ignore)]
        public string TallerReparacionCalzadoMarro { get; set; }

        [JsonProperty("propiedad_alquiler_temporario_s", NullValueHandling = NullValueHandling.Ignore)]
        public string PropiedadAlquilerTemporarioS { get; set; }

        [JsonProperty("apart_hotel_1_4_estrellas_serv", NullValueHandling = NullValueHandling.Ignore)]
        public string ApartHotel1_4_EstrellasServ { get; set; }

        [JsonProperty("bed_and_breakfast_serv", NullValueHandling = NullValueHandling.Ignore)]
        public string BedAndBreakfastServ { get; set; }

        [JsonProperty("cabana_bungalow_serv", NullValueHandling = NullValueHandling.Ignore)]
        public string CabanaBungalowServ { get; set; }

        [JsonProperty("camping_1_2_estrellas_serv", NullValueHandling = NullValueHandling.Ignore)]
        public string Camping1_2_EstrellasServ { get; set; }

        [JsonProperty("colonia_vacaciones_con_desayuno", NullValueHandling = NullValueHandling.Ignore)]
        public string ColoniaVacacionesConDesayuno { get; set; }

        [JsonProperty("hospedaje_rural_serv", NullValueHandling = NullValueHandling.Ignore)]
        public string HospedajeRuralServ { get; set; }

        [JsonProperty("hostel_serv", NullValueHandling = NullValueHandling.Ignore)]
        public string HostelServ { get; set; }

        [JsonProperty("hosteria_posada_1_3_estrellas_s", NullValueHandling = NullValueHandling.Ignore)]
        public string HosteriaPosada1_3_EstrellasS { get; set; }

        [JsonProperty("hotel_1_5_estrellas_serv", NullValueHandling = NullValueHandling.Ignore)]
        public string Hotel1_5_EstrellasServ { get; set; }

        [JsonProperty("petit_hotel_3_4_estrellas_serv", NullValueHandling = NullValueHandling.Ignore)]
        public string PetitHotel3_4_EstrellasServ { get; set; }

        [JsonProperty("motel_1_3_estrellas_serv", NullValueHandling = NullValueHandling.Ignore)]
        public string Motel1_3_EstrellasServ { get; set; }

        [JsonProperty("refugio_1_2_estrellas_serv", NullValueHandling = NullValueHandling.Ignore)]
        public string Refugio1_2_EstrellasServ { get; set; }

        [JsonProperty("albergue_transitorio_serv", NullValueHandling = NullValueHandling.Ignore)]
        public string AlbergueTransitorioServ { get; set; }

        [JsonProperty("taller_computacion_audiovisuale", NullValueHandling = NullValueHandling.Ignore)]
        public string TallerComputacionAudiovisuale { get; set; }

        [JsonProperty("taller_reparacion_electricos_se", NullValueHandling = NullValueHandling.Ignore)]
        public string TallerReparacionElectricosSe { get; set; }

        [JsonProperty("distribucion_diarios_revistas_s", NullValueHandling = NullValueHandling.Ignore)]
        public string DistribucionDiariosRevistasS { get; set; }

        [JsonProperty("empresa_telefonia_tv_radio_serv", NullValueHandling = NullValueHandling.Ignore)]
        public string EmpresaTelefoniaTvRadioServ { get; set; }

        [JsonProperty("servicio_mensajeria_paqueteria_", NullValueHandling = NullValueHandling.Ignore)]
        public string ServicioMensajeriaPaqueteria { get; set; }

        [JsonProperty("servicios_comunicacion_conexion", NullValueHandling = NullValueHandling.Ignore)]
        public string ServiciosComunicacionConexion { get; set; }

        [JsonProperty("centro_exposicion_serv", NullValueHandling = NullValueHandling.Ignore)]
        public string CentroExposicionServ { get; set; }

        [JsonProperty("centro_cultural_serv", NullValueHandling = NullValueHandling.Ignore)]
        public string CentroCulturalServ { get; set; }

        [JsonProperty("jardin_maternal_serv", NullValueHandling = NullValueHandling.Ignore)]
        public string JardinMaternalServ { get; set; }

        [JsonProperty("escuela_colegio_serv", NullValueHandling = NullValueHandling.Ignore)]
        public string EscuelaColegioServ { get; set; }

        [JsonProperty("establecimiento_educacion_super", NullValueHandling = NullValueHandling.Ignore)]
        public string EstablecimientoEducacionSuper { get; set; }

        [JsonProperty("instituto_cultural_ense_serv", NullValueHandling = NullValueHandling.Ignore)]
        public string InstitutoCulturalEnseServ { get; set; }

        [JsonProperty("ensenanza_personalizada_compart", NullValueHandling = NullValueHandling.Ignore)]
        public string EnsenanzaPersonalizadaCompart { get; set; }

        [JsonProperty("biblioteca_serv", NullValueHandling = NullValueHandling.Ignore)]
        public string BibliotecaServ { get; set; }

        [JsonProperty("consultorio_sin_internacion_ser", NullValueHandling = NullValueHandling.Ignore)]
        public string ConsultorioSinInternacionSer { get; set; }

        [JsonProperty("centro_sin_internacion_serv", NullValueHandling = NullValueHandling.Ignore)]
        public string CentroSinInternacionServ { get; set; }

        [JsonProperty("urgencia_medico_permanente_sin_", NullValueHandling = NullValueHandling.Ignore)]
        public string UrgenciaMedicoPermanenteSin { get; set; }

        [JsonProperty("instituto_sin_internacion_serv", NullValueHandling = NullValueHandling.Ignore)]
        public string InstitutoSinInternacionServ { get; set; }

        [JsonProperty("clinica_con_internacion_serv", NullValueHandling = NullValueHandling.Ignore)]
        public string ClinicaConInternacionServ { get; set; }

        [JsonProperty("sanatorio_policlinico_con_inter", NullValueHandling = NullValueHandling.Ignore)]
        public string SanatorioPoliclinicoConInter { get; set; }

        [JsonProperty("hospital_con_internacion_serv", NullValueHandling = NullValueHandling.Ignore)]
        public string HospitalConInternacionServ { get; set; }

        [JsonProperty("hospital_de_dia_con_internacion", NullValueHandling = NullValueHandling.Ignore)]
        public string HospitalDeDiaConInternacion { get; set; }

        [JsonProperty("establecimientos_estetica_corpo", NullValueHandling = NullValueHandling.Ignore)]
        public string EstablecimientosEsteticaCorpo { get; set; }

        [JsonProperty("asistencia_rehabilitacion_serv", NullValueHandling = NullValueHandling.Ignore)]
        public string AsistenciaRehabilitacionServ { get; set; }

        [JsonProperty("consultorio_analisis_bioquimico", NullValueHandling = NullValueHandling.Ignore)]
        public string ConsultorioAnalisisBioquimico { get; set; }

        [JsonProperty("inyectables_servicios_enfermeri", NullValueHandling = NullValueHandling.Ignore)]
        public string InyectablesServiciosEnfermeri { get; set; }

        [JsonProperty("servicio_medico_emergencia_domi", NullValueHandling = NullValueHandling.Ignore)]
        public string ServicioMedicoEmergenciaDomi { get; set; }

        [JsonProperty("establecimientos_termales_serv", NullValueHandling = NullValueHandling.Ignore)]
        public string EstablecimientosTermalesServ { get; set; }

        [JsonProperty("maternidad_con_interancion_serv", NullValueHandling = NullValueHandling.Ignore)]
        public string MaternidadConInterancionServ { get; set; }

        [JsonProperty("establecimientos_pediatricos_co", NullValueHandling = NullValueHandling.Ignore)]
        public string EstablecimientosPediatricosCo { get; set; }

        [JsonProperty("establecimientos_psiquiatricos_", NullValueHandling = NullValueHandling.Ignore)]
        public string EstablecimientosPsiquiatricos { get; set; }

        [JsonProperty("geriatricos_albergues_serv", NullValueHandling = NullValueHandling.Ignore)]
        public string GeriatricosAlberguesServ { get; set; }

        [JsonProperty("centro_asistencial_serv", NullValueHandling = NullValueHandling.Ignore)]
        public string CentroAsistencialServ { get; set; }

        [JsonProperty("veterinaria_sin_guar_serv", NullValueHandling = NullValueHandling.Ignore)]
        public string VeterinariaSinGuarServ { get; set; }

        [JsonProperty("asociacion_mutual_profesionales", NullValueHandling = NullValueHandling.Ignore)]
        public string AsociacionMutualProfesionales { get; set; }

        [JsonProperty("fundacion_ong_serv", NullValueHandling = NullValueHandling.Ignore)]
        public string FundacionOngServ { get; set; }

        [JsonProperty("sede_partidos_politicos_sindica", NullValueHandling = NullValueHandling.Ignore)]
        public string SedePartidosPoliticosSindica { get; set; }

        [JsonProperty("templo_religioso_serv", NullValueHandling = NullValueHandling.Ignore)]
        public string TemploReligiosoServ { get; set; }

        [JsonProperty("centro_club_deportivo_serv", NullValueHandling = NullValueHandling.Ignore)]
        public string CentroClubDeportivoServ { get; set; }

        [JsonProperty("centro_social_sin_instalacion_d", NullValueHandling = NullValueHandling.Ignore)]
        public string CentroSocialSinInstalacionD { get; set; }

        [JsonProperty("estadio_serv", NullValueHandling = NullValueHandling.Ignore)]
        public string EstadioServ { get; set; }

        [JsonProperty("gimnasio_con_musica_serv", NullValueHandling = NullValueHandling.Ignore)]
        public string GimnasioConMusicaServ { get; set; }

        [JsonProperty("gimnasio_sin_musica_serv", NullValueHandling = NullValueHandling.Ignore)]
        public string GimnasioSinMusicaServ { get; set; }

        [JsonProperty("cocherias_velatorios_serv", NullValueHandling = NullValueHandling.Ignore)]
        public string CocheriasVelatoriosServ { get; set; }

        [JsonProperty("autocine_serv", NullValueHandling = NullValueHandling.Ignore)]
        public string AutocineServ { get; set; }

        [JsonProperty("casino_bingo_serv", NullValueHandling = NullValueHandling.Ignore)]
        public string CasinoBingoServ { get; set; }

        [JsonProperty("cine_espectaculos_serv", NullValueHandling = NullValueHandling.Ignore)]
        public string CineEspectaculosServ { get; set; }

        [JsonProperty("juegos_electronicos_serv", NullValueHandling = NullValueHandling.Ignore)]
        public string JuegosElectronicosServ { get; set; }

        [JsonProperty("local_bailable_serv", NullValueHandling = NullValueHandling.Ignore)]
        public string LocalBailableServ { get; set; }

        [JsonProperty("salones_fiesta_serv", NullValueHandling = NullValueHandling.Ignore)]
        public string SalonesFiestaServ { get; set; }

        [JsonProperty("peloteros_locales_fiestas_pread", NullValueHandling = NullValueHandling.Ignore)]
        public string PeloterosLocalesFiestasPread { get; set; }

        [JsonProperty("poligono_tiro_serv", NullValueHandling = NullValueHandling.Ignore)]
        public string PoligonoTiroServ { get; set; }

        [JsonProperty("parque_diversiones_serv", NullValueHandling = NullValueHandling.Ignore)]
        public string ParqueDiversionesServ { get; set; }

        [JsonProperty("gastronomico_bailable_serv", NullValueHandling = NullValueHandling.Ignore)]
        public string GastronomicoBailableServ { get; set; }

        [JsonProperty("local_espectaculos_en_vivo_serv", NullValueHandling = NullValueHandling.Ignore)]
        public string LocalEspectaculosEnVivoServ { get; set; }

        [JsonProperty("empresa_banquetes_serv", NullValueHandling = NullValueHandling.Ignore)]
        public string EmpresaBanquetesServ { get; set; }

        [JsonProperty("consulado_serv", NullValueHandling = NullValueHandling.Ignore)]
        public string ConsuladoServ { get; set; }

        [JsonProperty("oficina_sin_atencion_publico_se", NullValueHandling = NullValueHandling.Ignore)]
        public string OficinaSinAtencionPublicoSe { get; set; }

        [JsonProperty("estudio_oficina_profesional_ind", NullValueHandling = NullValueHandling.Ignore)]
        public string EstudioOficinaProfesionalInd { get; set; }

        [JsonProperty("estudio_oficina_trabajo_colabor", NullValueHandling = NullValueHandling.Ignore)]
        public string EstudioOficinaTrabajoColabor { get; set; }

        [JsonProperty("oficina_con_atencion_publico_se", NullValueHandling = NullValueHandling.Ignore)]
        public string OficinaConAtencionPublicoSe { get; set; }

        [JsonProperty("oficina_con_deposito_serv", NullValueHandling = NullValueHandling.Ignore)]
        public string OficinaConDepositoServ { get; set; }

        [JsonProperty("agencia_financiera_seguro_serv", NullValueHandling = NullValueHandling.Ignore)]
        public string AgenciaFinancieraSeguroServ { get; set; }

        [JsonProperty("art_serv", NullValueHandling = NullValueHandling.Ignore)]
        public string ArtServ { get; set; }

        [JsonProperty("despachantes_aduanas_serv", NullValueHandling = NullValueHandling.Ignore)]
        public string DespachantesAduanasServ { get; set; }

        [JsonProperty("agencia_cambio_monedas_extranje", NullValueHandling = NullValueHandling.Ignore)]
        public string AgenciaCambioMonedasExtranje { get; set; }

        [JsonProperty("banco_serv", NullValueHandling = NullValueHandling.Ignore)]
        public string BancoServ { get; set; }

        [JsonProperty("cajeros_automaticos_serv", NullValueHandling = NullValueHandling.Ignore)]
        public string CajerosAutomaticosServ { get; set; }

        [JsonProperty("servicio_cobranzas_serv", NullValueHandling = NullValueHandling.Ignore)]
        public string ServicioCobranzasServ { get; set; }

        [JsonProperty("servicio_especializado_automoto", NullValueHandling = NullValueHandling.Ignore)]
        public string ServicioEspecializadoAutomoto { get; set; }

        [JsonProperty("estacion_servicio_serv", NullValueHandling = NullValueHandling.Ignore)]
        public string EstacionServicioServ { get; set; }

        [JsonProperty("gomeria_serv", NullValueHandling = NullValueHandling.Ignore)]
        public string GomeriaServ { get; set; }

        [JsonProperty("lavado_automatico_serv", NullValueHandling = NullValueHandling.Ignore)]
        public string LavadoAutomaticoServ { get; set; }

        [JsonProperty("mantenimiento_reparacion_motoci", NullValueHandling = NullValueHandling.Ignore)]
        public string MantenimientoReparacionMotoci { get; set; }

        [JsonProperty("mecanica_integral_automotores_l", NullValueHandling = NullValueHandling.Ignore)]
        public string MecanicaIntegralAutomotoresL { get; set; }

        [JsonProperty("taller_bicicletas_serv", NullValueHandling = NullValueHandling.Ignore)]
        public string TallerBicicletasServ { get; set; }

        [JsonProperty("alquiler_autos_sin_chofer_serv", NullValueHandling = NullValueHandling.Ignore)]
        public string AlquilerAutosSinChoferServ { get; set; }

        [JsonProperty("alquiler_bicicletas_serv", NullValueHandling = NullValueHandling.Ignore)]
        public string AlquilerBicicletasServ { get; set; }

        [JsonProperty("empresa_transporte_serv", NullValueHandling = NullValueHandling.Ignore)]
        public string EmpresaTransporteServ { get; set; }

        [JsonProperty("transporte_escolar_serv", NullValueHandling = NullValueHandling.Ignore)]
        public string TransporteEscolarServ { get; set; }

        [JsonProperty("playa_estacionamiento_publica_s", NullValueHandling = NullValueHandling.Ignore)]
        public string PlayaEstacionamientoPublicaS { get; set; }

        [JsonProperty("cochera_playa_privada_serv", NullValueHandling = NullValueHandling.Ignore)]
        public string CocheraPlayaPrivadaServ { get; set; }

        [JsonProperty("edificio_estacionamientos_serv", NullValueHandling = NullValueHandling.Ignore)]
        public string EdificioEstacionamientosServ { get; set; }

        [JsonProperty("taxis_remises_taxiflet_serv", NullValueHandling = NullValueHandling.Ignore)]
        public string TaxisRemisesTaxifletServ { get; set; }

        [JsonProperty("terminal_tansporte_publico_serv", NullValueHandling = NullValueHandling.Ignore)]
        public string TerminalTansportePublicoServ { get; set; }

        [JsonProperty("agencia_seguridad_privada_vigil", NullValueHandling = NullValueHandling.Ignore)]
        public string AgenciaSeguridadPrivadaVigil { get; set; }

        [JsonProperty("bomberos_serv", NullValueHandling = NullValueHandling.Ignore)]
        public string BomberosServ { get; set; }

        [JsonProperty("instituciones_confinamiento_ser", NullValueHandling = NullValueHandling.Ignore)]
        public string InstitucionesConfinamientoSer { get; set; }

        [JsonProperty("seccional_policia_serv", NullValueHandling = NullValueHandling.Ignore)]
        public string SeccionalPoliciaServ { get; set; }

        [JsonProperty("vivienda_individual_serv", NullValueHandling = NullValueHandling.Ignore)]
        public string ViviendaIndividualServ { get; set; }

        [JsonProperty("vivienda_multifamiliar_serv", NullValueHandling = NullValueHandling.Ignore)]
        public string ViviendaMultifamiliarServ { get; set; }

        [JsonProperty("loteos_cerrados_serv", NullValueHandling = NullValueHandling.Ignore)]
        public string LoteosCerradosServ { get; set; }

        [JsonProperty("residencia_estudiantil_serv", NullValueHandling = NullValueHandling.Ignore)]
        public string ResidenciaEstudiantilServ { get; set; }

        [JsonProperty("hogar_ancianos_serv", NullValueHandling = NullValueHandling.Ignore)]
        public string HogarAncianosServ { get; set; }

        [JsonProperty("espacios_cuidado_mascotas_serv", NullValueHandling = NullValueHandling.Ignore)]
        public string EspaciosCuidadoMascotasServ { get; set; }

        [JsonProperty("elaboracion_fraccionamiento_ind", NullValueHandling = NullValueHandling.Ignore)]
        public string ElaboracionFraccionamientoInd { get; set; }

        [JsonProperty("elaboracion_artesanal_venta_min", NullValueHandling = NullValueHandling.Ignore)]
        public string ElaboracionArtesanalVentaMin { get; set; }

        [JsonProperty("actividades_agricultura_ind", NullValueHandling = NullValueHandling.Ignore)]
        public string ActividadesAgriculturaInd { get; set; }

        [JsonProperty("actividades_pecuarias_ind", NullValueHandling = NullValueHandling.Ignore)]
        public string ActividadesPecuariasInd { get; set; }

        [JsonProperty("fabricacion_fraccionamiento_ind", NullValueHandling = NullValueHandling.Ignore)]
        public string FabricacionFraccionamientoInd { get; set; }

        [JsonProperty("fabricacion_artesanal_venta_min", NullValueHandling = NullValueHandling.Ignore)]
        public string FabricacionArtesanalVentaMin { get; set; }

        [JsonProperty("fabricacion_fraccionamiento_i_1", NullValueHandling = NullValueHandling.Ignore)]
        public string FabricacionFraccionamientoI1 { get; set; }

        [JsonProperty("fabricacion_artesanal_venta_m_1", NullValueHandling = NullValueHandling.Ignore)]
        public string FabricacionArtesanalVentaM1 { get; set; }

        [JsonProperty("deposito_exclusivo_ind", NullValueHandling = NullValueHandling.Ignore)]
        public string DepositoExclusivoInd { get; set; }

        [JsonProperty("deposito_anexo_contiguo_activid", NullValueHandling = NullValueHandling.Ignore)]
        public string DepositoAnexoContiguoActivid { get; set; }

        [JsonProperty("uso_especial_bajo_impacto_pied", NullValueHandling = NullValueHandling.Ignore)]
        public string UsoEspecialBajoImpactoPied { get; set; }

        [JsonProperty("uso_especial_impacto_medio_pied", NullValueHandling = NullValueHandling.Ignore)]
        public string UsoEspecialImpactoMedioPied { get; set; }

        [JsonProperty("uso_especial_alto_impacto_pied", NullValueHandling = NullValueHandling.Ignore)]
        public string UsoEspecialAltoImpactoPied { get; set; }

        [JsonProperty("mineria_tipo_2_3_pied", NullValueHandling = NullValueHandling.Ignore)]
        public string MineriaTipo2_3_Pied { get; set; }

        [JsonProperty("normativa", NullValueHandling = NullValueHandling.Ignore)]
        public string Normativa { get; set; }

        [JsonProperty("Shape__Area", NullValueHandling = NullValueHandling.Ignore)]
        public double? ShapeArea { get; set; }

        [JsonProperty("Shape__Length", NullValueHandling = NullValueHandling.Ignore)]
        public double? ShapeLength { get; set; }

        [JsonProperty("libreria_libros_mino", NullValueHandling = NullValueHandling.Ignore)]
        public string LibreriaLibrosMino { get; set; }

        [JsonProperty("calzados_mino", NullValueHandling = NullValueHandling.Ignore)]
        public string CalzadosMino { get; set; }

        [JsonProperty("superficie", NullValueHandling = NullValueHandling.Ignore)]
        public long? Superficie { get; set; }
    }

    public partial class GeometryZonificacionUsosSuelo
    {
        [JsonProperty("rings", NullValueHandling = NullValueHandling.Ignore)]
        public List<List<List<double>>> Rings { get; set; }
    }
}
