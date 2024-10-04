const https = require('https');

exports.getWeather = (req, res) => {
  const { latitude, longitude } = req.query;

  if (!latitude || !longitude) {
    return res.status(400).send('Latitud y longitud son requeridas');
  }

  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;

  https.get(url, (apiRes) => {
    let data = '';

    apiRes.on('data', (chunk) => {
      data += chunk;
    });

    apiRes.on('end', () => {
      try {
        const weatherData = JSON.parse(data);
        const temperature = weatherData.current_weather.temperature;
        res.json({ temperature });
      } catch (error) {
        res.status(500).send('Error al procesar la respuesta de Open Meteo');
      }
    });
  }).on('error', (err) => {
    res.status(500).send('Error al hacer la solicitud a Open Meteo');
  });
};