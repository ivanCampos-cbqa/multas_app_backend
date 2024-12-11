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
                background-color: #1c1c1c;
                color: #ccc;
                margin: 0;
                padding: 0;
            }
            .container {
                width: 90%;
                max-width: 800px;
                margin: 20px auto;
                background-color: #2a2a2a;
                border: 2px solid #6b4b3f; /* Borde color café */
                border-radius: 8px;
                box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
                overflow: hidden;
            }
            .header {
                background-color: #6b4b3f; /* Color café */
                color: #ffffff;
                padding: 20px;
                text-align: center;
            }
            .header h1 {
                margin: 0;
                font-size: 26px;
            }
            .content {
                display: flex;
                flex-wrap: wrap;
                padding: 20px;
            }
            .info {
                flex: 1;
                min-width: 300px;
                padding-right: 10px;
            }
            .info p {
                margin: 10px 0;
                color: #ddd;
            }
            .map {
                flex: 1;
                min-width: 300px;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .map img {
                max-width: 100%;
                height: auto;
                border-radius: 10px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
            }
            .footer {
                background-color: #1c1c1c;
                color: #888;
                padding: 10px;
                text-align: center;
                font-size: 12px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Fine Details</h1>
            </div>
            <div class="content">
                <div class="info">
                    <p><strong>New Fine Registered</strong></p>
                    <p><strong>Plate Number:</strong> ${plate}</p>
                    <p><strong>City:</strong> ${city}</p>
                    <p><strong>State:</strong> ${state}</p>
                    <p><strong>Registered Speed:</strong> ${speed} km/h</p>
                    <p><strong>Speed Limit:</strong> ${limit} km/h</p>
                    <p><strong>Date:</strong> ${creationDate.toDateString()}</p>
                    <p><strong>Latitude:</strong> ${lat}</p>
                    <p><strong>Longitude:</strong> ${lng}</p>
                </div>
                <div class="map">
                    <img src="${mapboxURL}" alt="Map">
                </div>
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
  const zoom = 14; // Mayor nivel de zoom
  const width = 800; // Ancho de la imagen
  const height = 500; // Altura de la imagen

  return `https://api.mapbox.com/styles/v1/mapbox/light-v11/static/pin-l-embassy+f74e4e(${lng},${lat})/${lng},${lat},${zoom}/${width}x${height}?access_token=${accessToken}`;
};
