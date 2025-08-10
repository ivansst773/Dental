const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Servir archivos estáticos desde 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Datos simulados
let agenda = [
  { id: 1, paciente: 'Juan Pérez', trabajo: 'Prótesis', fecha: '2025-08-09', aseguradora: 'Sanitas', estado: 'confirmada' },
  { id: 2, paciente: 'María Gómez', trabajo: 'Coronas', fecha: '2025-08-10', aseguradora: 'Sura', estado: 'pendiente' }
];

// Ruta raíz que devuelve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Obtener agenda
app.get('/agenda', (req, res) => {
  res.json(agenda);
});

// Agregar nueva cita
app.post('/agenda', (req, res) => {
  const nuevo = req.body;
  nuevo.id = agenda.length + 1;
  agenda.push(nuevo);
  res.status(201).json(nuevo);
});

// Iniciar servidor
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
