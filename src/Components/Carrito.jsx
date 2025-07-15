import React, { useContext } from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import { CartContext } from './CartContext';

const Carrito = () => {
  const { carrito, eliminarDelCarrito } = useContext(CartContext);

  // Función para obtener precio, con fallback a 10 si no hay price
  const obtenerPrecio = (item) => {
    return item.price ? Number(item.price) : 10;
  };

  const total = carrito.reduce((acc, item) => acc + obtenerPrecio(item) * item.cantidad, 0);

  if (carrito.length === 0) {
    return (
      <Container className="mt-4">
        <h3>Tu carrito está vacío</h3>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h3>Carrito de compras</h3>
      <Table striped bordered hover responsive className="mt-3">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Precio unitario</th>
            <th>Cantidad</th>
            <th>Total</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {carrito.map((item) => (
            <tr key={item.id}>
              <td>{item.titulo || item.title}</td>
              <td>${obtenerPrecio(item).toFixed(2)}</td>
              <td>{item.cantidad}</td>
              <td>${(obtenerPrecio(item) * item.cantidad).toFixed(2)}</td>
              <td>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => eliminarDelCarrito(item.id)}
                >
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <h5 className="text-end">Total a pagar: ${total.toFixed(2)}</h5>
    </Container>
  );
};

export default Carrito;
