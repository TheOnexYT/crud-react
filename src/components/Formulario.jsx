import React, { useState } from 'react';

export const Formulario = () => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [lista, setLista] = useState([]);
  const [editIndex, setEditIndex] = useState(null); // Nuevo estado para el índice de edición

  const guardar = (e) => {
    e.preventDefault();
    if (!nombre) return alert('Falta el nombre');
    if (!apellido) return alert('Falta el apellido');

    if (editIndex !== null) {
      // Editar el elemento en la lista
      const nuevaLista = [...lista];
      nuevaLista[editIndex] = { nombre, apellido };
      setLista(nuevaLista);
      setEditIndex(null); // Limpiar el índice de edición
    } else {
      // Agregar un nuevo elemento
      setLista([...lista, { nombre, apellido }]);
    }

    e.target.reset();
    setNombre('');
    setApellido('');
  };

  const eliminar = (index) => {
    // Filtrar la lista excluyendo el elemento en el índice especificado
    setLista(lista.filter((_, i) => i !== index));
  };

  const editar = (index) => {
    // Cargar los valores de nombre y apellido en los campos de entrada para editar
    setNombre(lista[index].nombre);
    setApellido(lista[index].apellido);
    setEditIndex(index); // Establecer el índice de edición
  };

  const vaciarLista = () => {
    setLista([]);
  };

  return (
    <div>
      <h2>Formulario</h2>
      <form onSubmit={guardar}>
        <input
          type="text"
          placeholder="Ingrese su Nombre"
          className="form-control mb-3"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />

        <input
          type="text"
          placeholder="Ingrese su Apellido"
          className="form-control mb-3"
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
        />

        <div className="d-grid gap-2 mb-3">
          <button className="btn btn-primary" type="submit">
            {editIndex !== null ? 'Actualizar' : 'Registrar'}
          </button>
          <button className="btn btn-danger mb-3" type="button" onClick={vaciarLista}>
            Vaciar Lista
          </button>
        </div>
      </form>

      <ul>
        {lista.map((user, index) => (
          <li key={index}>
            {user.nombre} {user.apellido}
            <button className="btn btn-warning ms-2 mb-1" onClick={() => editar(index)}>
              Editar
            </button>
            <button className="btn btn-danger ms-2 mb-1" onClick={() => eliminar(index)}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
