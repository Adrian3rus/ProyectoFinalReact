import React, { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import { CartContext } from "./CartContext";
import ToastMensaje from "./ToastMensaje"; 

const API_KEY = "d3ca76507f4042a2a090f886eb08011b";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function TarjetaJuego({ juego, onAgregar }) {
  const [precio] = useState((Math.random() * 50 + 10).toFixed(2));

  const handleAgregar = () => {
    onAgregar({
      id: juego.id,
      title: juego.name,
      price: precio,
    });
  };

  return (
    <div className="card h-100 shadow-sm">
      {juego.background_image && (
        <img
          src={juego.background_image}
          className="card-img-top"
          alt={`Imagen de ${juego.name}`}
        />
      )}
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{juego.name}</h5>
        <p className="card-text">📅 {juego.released || "Sin fecha"}</p>
        <p className="card-text">
          ⭐ {juego.rating ? `${juego.rating} / 5` : "Sin calificación"}
        </p>
        <p className="card-text text-success fw-bold">${precio}</p>
        <button className="btn btn-success mt-auto" onClick={handleAgregar}>
          Agregar al carrito
        </button>
      </div>
    </div>
  );
}

export default function ListaDeJuegos() {
  const { carrito, setCarrito } = useContext(CartContext);
  const [juegos, setJuegos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState(null);
  const query = useQuery();
  const searchTerm = query.get("search") || "";

  const mostrarToast = (mensaje) => {
    setToast(mensaje);
    setTimeout(() => setToast(null), 2000);
  };

  const agregarAlCarrito = (producto) => {
    const yaEsta = carrito.find((item) => item.id === producto.id);
    if (yaEsta) {
      setCarrito((prev) =>
        prev.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        )
      );
    } else {
      setCarrito((prev) => [
        ...prev,
        { ...producto, cantidad: 1 }
      ]);
    }

    mostrarToast(`"${producto.title}" agregado al carrito`);
  };

  useEffect(() => {
    setCargando(true);
    setError(null);
    const url = `https://api.rawg.io/api/games?key=${API_KEY}&page_size=20&search=${searchTerm}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.results) {
          setJuegos(data.results);
        } else {
          setError("No se encontraron resultados válidos.");
        }
        setCargando(false);
      })
      .catch(() => {
        setError("No se pudieron cargar los juegos.");
        setCargando(false);
      });
  }, [searchTerm]);

  if (cargando) return <p>Cargando juegos...</p>;
  if (error) return <p className="text-danger">{error}</p>;
  if (!juegos.length) return <p>No se encontraron juegos.</p>;

  return (
    <>
      <div className="row g-4">
        {juegos.map((juego) => (
          <div key={juego.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
            <TarjetaJuego juego={juego} onAgregar={agregarAlCarrito} />
          </div>
        ))}
      </div>
      {toast && <ToastMensaje mensaje={toast} />}
    </>
  );
}
