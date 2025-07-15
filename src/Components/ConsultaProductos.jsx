import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { CartContext } from './CartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import 'bootstrap/dist/css/bootstrap.min.css';

const ConsultaProductos = () => {
  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const { agregarAlCarrito } = useContext(CartContext);

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const response = await axios.get('https://686ef62c91e85fac429f6915.mockapi.io/productos/products');
        setProductos(response.data);
      } catch {
        setError('Error al cargar los productos');
      } finally {
        setLoading(false);
      }
    };
    obtenerProductos();
  }, []);

  const filtrarProductos = productos.filter((producto) =>
    producto.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
    producto.plataforma.toLowerCase().includes(busqueda.toLowerCase()) ||
    producto.genero.toLowerCase().includes(busqueda.toLowerCase())
  );

  const handleAgregar = (producto) => {
    agregarAlCarrito(producto);
    setMensaje(`"${producto.titulo}" agregado al carrito`);
    setShowToast(true);
  };

  if (loading) return <div className="text-center mt-5"><h5>Cargando productos...</h5></div>;
  if (error) return <div className="text-danger text-center mt-5"><h5>{error}</h5></div>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">Listado de Productos</h2>

      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar por título, plataforma o género"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>

      <div className="row">
        {filtrarProductos.length === 0 ? (
          <div className="text-center"><p>No se encontraron productos.</p></div>
        ) : (
          filtrarProductos.map((producto) => (
            <div key={producto.id} className="col-sm-12 col-md-6 col-lg-4 mb-4">
              <div className="card h-100 shadow-sm d-flex flex-column">
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{producto.titulo}</h5>
                  <p className="card-text">{producto.descripcion}</p>
                  <div className="mt-auto text-center">
                    <div className="mb-2">
                      <span className="badge bg-primary me-2">{producto.plataforma}</span>
                      <span className="badge bg-secondary">{producto.genero}</span>
                    </div>
                    <button
                      className="btn btn-success btn-sm w-75"
                      onClick={() => handleAgregar(producto)}
                    >
                      <FontAwesomeIcon icon={faCartPlus} className="me-2" />
                      Agregar al carrito
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <ToastContainer position="top-end" className="p-3">
        <Toast 
          bg="success" 
          onClose={() => setShowToast(false)} 
          show={showToast} 
          delay={2500} 
          autohide
        >
          <Toast.Header>
            <strong className="me-auto">Carrito</strong>
          </Toast.Header>
          <Toast.Body className="text-white">{mensaje}</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
};

export default ConsultaProductos;
