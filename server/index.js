// ... (mantener el código existente)

// Modificar la ruta de login
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  db.query('SELECT * FROM usuarios WHERE email = ?', [email], (err, results) => {
    if (err) {
      res.status(500).json({ success: false, message: 'Error en el servidor' });
      return;
    }
    if (results.length === 0 || results[0].password !== password) {
      res.status(401).json({ success: false, message: 'Credenciales inválidas' });
      return;
    }
    res.json({ success: true });
  });
});

// Agregar ruta para actualizar información del usuario
app.put('/api/user', authenticateToken, (req, res) => {
  const { email, password } = req.body;
  const userId = req.user.id;
  const query = 'UPDATE usuarios SET email = ?, password = ? WHERE id = ?';
  db.query(query, [email, password, userId], (err) => {
    if (err) {
      res.status(500).json({ success: false, message: 'Error al actualizar la información' });
      return;
    }
    res.json({ success: true, message: 'Información actualizada correctamente' });
  });
});

// ... (mantener el resto del código existente)