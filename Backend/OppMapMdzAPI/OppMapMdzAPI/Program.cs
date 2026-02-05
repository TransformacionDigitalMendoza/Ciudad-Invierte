using Microsoft.Extensions.Logging.Configuration;
using OppMapMdz_Application.Interfaces.Repositories;
using OppMapMdz_Application.Interfaces.Services;
using OppMapMdz_Domain.ArcGIS;
using OppMapMdz_Infrastructure.Repositories;
using OppMapMdz_Infrastructure.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy =>
        {
            policy
                .AllowAnyOrigin()   // o dominios específicos
                .AllowAnyHeader()
                .AllowAnyMethod();
        });
});

builder.Services.Configure<ArcGISConfig>(
    builder.Configuration.GetSection("ArcGISServices")
);

builder.Services.AddHttpClient("ArcGIS", httpClient =>
{
    httpClient.Timeout = TimeSpan.FromSeconds(60);
});

// Add services to the container.
builder.Services.AddScoped<IZonificacionRepository,ZonificacionRepository>();
builder.Services.AddScoped<IZonificacionSrv, ZonificacionSrv>();

builder.Services.AddScoped<IComercioRepository, ComercioRepository>();
builder.Services.AddScoped<IComercioSrv, ComercioSrv>();

builder.Services.AddScoped<IArcGISAPIRepository, ArcGISApiRepository>();
builder.Services.AddScoped<IArcGISApiSrv, ArcGISApiSrv>();

builder.Services.AddControllers()
    .AddNewtonsoftJson(options =>
    {
        options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
        options.SerializerSettings.NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore;
    });

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
//if (app.Environment.IsDevelopment())
//{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "API v1");
        c.RoutePrefix = string.Empty; // Muestra Swagger en https://tusitio.com/
    });
//}

app.UseHttpsRedirection();

// CORS SIEMPRE ANTES de Authorization
app.UseCors("AllowFrontend");

app.UseAuthorization();

app.MapControllers();

app.Run();

/*
Controladores:
API 

Zonificación
https://webgis.ciudaddemendoza.gob.ar/server/rest/services/Zonificaci%C3%B3n_de_suelo_Ind_urbanos/FeatureServer

Comercio
https://webgis.ciudaddemendoza.gob.ar/server/rest/services/Comercio_publico/FeatureServer

Parcelario Catastral
https://webgis.ciudaddemendoza.gob.ar/server/rest/services/Catastro_p%C3%BAblico/FeatureServer

Servicio Calles
https://webgis.ciudaddemendoza.gob.ar/server/rest/services/Servicio_Calles/FeatureServer    
*/