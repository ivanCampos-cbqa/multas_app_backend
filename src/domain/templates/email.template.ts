import { envs } from "../../config/envs.plugin";

export function generateFineEmailTemplate(
  plate: string,
  city: string,
  state: string,
  speed: number,
  limit: number,
  lat: number,
  lng: number,
  creationDate: Date
): string {
  const mapboxURL = generateMapboxStaticImageURL(lat, lng);
  return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Fine Details</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #1c1c1c; /* Fondo gris oscuro */
                color: #ccc; /* Texto gris claro */
                margin: 0;
                padding: 0;
            }
            .container {
                width: 100%;
                max-width: 600px;
                margin: 20px auto;
                background-color: #2a2a2a; /* Fondo del contenedor más oscuro */
                border-radius: 8px;
                box-shadow: 0 0 15px rgba(0, 0, 0, 0.5); /* Sombra más intensa */
                overflow: hidden;
            }
            .header {
                background-color: #6A0DAD; /* Color morado */
                color: #ffffff;
                padding: 20px;
                text-align: center;
            }
            .header h1 {
                margin: 0;
                font-size: 26px;
            }
            .content {
                padding: 20px;
            }
            .content p {
                margin: 10px 0;
                color: #ddd; /* Texto ligeramente más claro */
            }
            .footer {
                background-color: #1c1c1c;
                color: #888;
                padding: 10px;
                text-align: center;
                font-size: 12px;
            }
            .map-img {
                width: 100%;
                height: auto;
                border-radius: 10px;
                margin-top: 15px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Fine Details</h1>
            </div>
            <div class="content">
                <p><strong>New Fine Registered</strong></p>
                <p><strong>Plate Number:</strong> ${plate}</p>
                <p><strong>City:</strong> ${city}</p>
                <p><strong>State:</strong> ${state}</p>
                <p><strong>Registered Speed:</strong> ${speed}</p>
                <p><strong>Speed Limit:</strong> ${limit}</p>
                <p><strong>Date:</strong> ${creationDate.toDateString()}</p>
                <p><strong>Latitud:</strong> ${lat}</p>
                <p><strong>Longitud:</strong> ${lng}</p>
                <img src="${mapboxURL}" alt="Map" class="map-img"/>
            </div>
            <div class="footer">
                <p>Este es un correo generado automáticamente. Por favor, no responda a este mensaje.</p>
            </div>
        </div>
    </body>
    </html>
    `;
}

export const generateMapboxStaticImageURL = (lat: number, lng: number) => {
  const accessToken = envs.MAPBOX_ACCESS_TOKEN;
  const zoom = 10; // Nivel de zoom
  const width = 800; // Ancho de la imagen
  const height = 500; // Altura de la imagen

  return `https://api.mapbox.com/styles/v1/mapbox/light-v11/static/pin-l-embassy+f74e4e(${lng},${lat})/${lng},${lat},${zoom}/${width}x${height}?access_token=${accessToken}`;
};
