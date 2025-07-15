import React, { useEffect, useState } from 'react';
import { Table, Button, Form, Modal, Alert, Row, Col } from 'react-bootstrap';

const API_URL = 'https://686ef62c91e85fac429f6915.mockapi.io/productos/products';

const plataformasDisponibles = ['PC', 'PlayStation', 'Xbox', 'Switch'];
const generosDisponibles = ['Acción', 'Aventura', 'Estrategia', 'Deportes', 'RPG', 'Pelea'];

const CrudProductos = () => {
  const [productos, setProductos] = useState([]);
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({ titulo: '', descripcion: '', plataforma: '', genero: '' });
  const [editId, setEditId] = useState(null);
  const [alert, setAlert] = useState({ variant: '', message: '' });
  const [busqueda, setBusqueda] = useState('');

  const getProductos = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setProductos(data);
    } catch (error) {
      setAlert({ variant: 'danger', message: 'Error al cargar productos' });
    }
  };

  const handleClose = () => {
    setShow(false);
    setForm({ titulo: '', descripcion: '', plataforma: '', genero: '' });
    setEditId(null);
  };

  const handleShow = (producto = null) => {
    setShow(true);
    if (producto) {
      setForm({
        titulo: producto.titulo || '',
        descripcion: producto.descripcion || '',
        plataforma: producto.plataforma || '',
        genero: producto.genero || ''
      });
      setEditId(producto.id);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const tituloExistente = productos.find(
      p => p.titulo?.toLowerCase() === form.titulo.toLowerCase() && p.id !== editId
    );

    if (tituloExistente) {
      setAlert({ variant: 'warning', message: 'Ya existe un juego con ese título.' });
      return;
    }

    const method = editId ? 'PUT' : 'POST';
    const url = editId ? `${API_URL}/${editId}` : API_URL;

    try {
      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      handleClose();
      setAlert({ variant: 'success', message: editId ? 'Juego actualizado' : 'Juego agregado' });
      getProductos();
    } catch (error) {
      setAlert({ variant: 'danger', message: 'Error al guardar juego' });
    }
  };

  const eliminarProducto = async (id) => {
    if (window.confirm('¿Seguro que quieres eliminar este juego?')) {
      try {
        await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        setAlert({ variant: 'success', message: 'Juego eliminado' });
        getProductos();
      } catch (error) {
        setAlert({ variant: 'danger', message: 'Error al eliminar juego' });
      }
    }
  };

  const productosFiltrados = productos.filter(prod =>
    (prod.titulo || '').toLowerCase().includes(busqueda.toLowerCase()) ||
    (prod.plataforma || '').toLowerCase().includes(busqueda.toLowerCase()) ||
    (prod.genero || '').toLowerCase().includes(busqueda.toLowerCase())
  );

  useEffect(() => {
    getProductos();
  }, []);

  return (
    <div className="container py-4">
      <h2>CRUD de Juegos</h2>

      {alert.message && (
        <Alert variant={alert.variant} onClose={() => setAlert({ message: '' })} dismissible>
          {alert.message}
        </Alert>
      )}

      <Row className="mb-3">
        <Col md={6}><Button onClick={() => handleShow()}>Agregar Juego</Button></Col>
        <Col md={6} className="text-end">
          <Form.Control
            type="text"
            placeholder="Buscar por título, plataforma o género"
            value={busqueda}
            onChange={e => setBusqueda(e.target.value)}
          />
        </Col>
      </Row>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Título</th>
            <th>Descripción</th>
            <th>Plataforma</th>
            <th>Género</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productosFiltrados.map(prod => (
            <tr key={prod.id}>
              <td>{prod.titulo}</td>
              <td>{prod.descripcion}</td>
              <td>{prod.plataforma}</td>
              <td>{prod.genero}</td>
              <td>
                <Button size="sm" onClick={() => handleShow(prod)}>Editar</Button>{' '}
                <Button size="sm" variant="danger" onClick={() => eliminarProducto(prod.id)}>Eliminar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{editId ? 'Editar' : 'Agregar'} Juego</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-2">
              <Form.Label>Título</Form.Label>
              <Form.Control
                value={form.titulo}
                onChange={e => setForm({ ...form, titulo: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                value={form.descripcion}
                onChange={e => setForm({ ...form, descripcion: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Plataforma</Form.Label>
              <Form.Select
                value={form.plataforma}
                onChange={e => setForm({ ...form, plataforma: e.target.value })}
                required
              >
                <option value="">-- Seleccionar --</option>
                {plataformasDisponibles.map(p => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Género</Form.Label>
              <Form.Select
                value={form.genero}
                onChange={e => setForm({ ...form, genero: e.target.value })}
                required
              >
                <option value="">-- Seleccionar --</option>
                {generosDisponibles.map(g => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </Form.Select>
            </Form.Group>
            <Button type="submit" className="mt-2">Guardar</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CrudProductos;
