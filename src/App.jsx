import { useEffect, useState } from 'react';
import './App.css';
import { firebase } from './firebase';

function App() {
  const [lista, setLista] = useState([]);
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [id, setId] = useState('');
  const [error, setError] = useState(null);
  const [modoEdicion, setModoEdicion] = useState(false);

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const db = firebase.firestore();
        const data = await db.collection('Usuarios').get();
        const arrayData = data.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setLista(arrayData);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerDatos();
  }, []);

  const guardarDatos = async (e) => {
    e.preventDefault();
    if (!nombre.trim()) return alert("Falta el nombre");
    if (!apellido.trim()) return alert("Falta el apellido");
    try {
      const db = firebase.firestore();
      const nuevoUsuario = { nombre, apellido };
      const dato = await db.collection('Usuarios').add(nuevoUsuario);
      setLista([
        ...lista,
        { id: dato.id, ...nuevoUsuario }
      ]);
      setNombre('');
      setApellido('');
    } catch (error) {
      console.log(error);
    }
  };

  const eliminarDatos = async (id) => {
    try {
      const db = firebase.firestore();
      await db.collection('Usuarios').doc(id).delete();
      const listaFiltrada = lista.filter((item) => item.id !== id);
      setLista(listaFiltrada);
    } catch (error) {
      console.log(error);
    }
  };

  const editar = (user) => {
    setModoEdicion(true);
    setNombre(user.nombre);
    setApellido(user.apellido);
    setId(user.id);
  };

  const editarDatos = async (e) => {
    e.preventDefault();
    if (!nombre.trim()) return alert("Falta el nombre");
    if (!apellido.trim()) return alert("Falta el apellido");
    try {
      const db = firebase.firestore();
      await db.collection('Usuarios').doc(id).update({ nombre, apellido });
      const listaEditada = lista.map(user => user.id === id ? { id, nombre, apellido } : user);
      setLista(listaEditada);
      setModoEdicion(false);
      setNombre('');
      setApellido('');
      setId('');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='container'>
      <div className="row">
        <div className="col-12">
          <h1 className='text-center'>{modoEdicion ? 'Editando Usuario' : 'Registro Usuario'}</h1>
          <form onSubmit={modoEdicion ? editarDatos : guardarDatos}>
            <input type="text" placeholder='Ingrese su nombre'
              className='form-control mb-2'
              onChange={(e) => setNombre(e.target.value)}
              value={nombre}
            />
            <input type="text" placeholder='Ingrese su apellido'
              className='form-control mb-2'
              onChange={(e) => setApellido(e.target.value)}
              value={apellido}
            />
            <div className='d-grid gap-2'>
              {modoEdicion ? 
                <button type='submit' className='btn btn-success'>Editar</button> :
                <button type='submit' className='btn btn-primary'>Registrar</button>
              }
            </div>
          </form>
        </div>
        <div className="col-12">
          <h1 className='text-center'>Usuarios registrados</h1>
          <ul className='list-group'>
            {
              lista.map(user => (
                <li className='list-group-item' key={user.id}>
                  {user.nombre} {user.apellido}
                  <button onClick={() => eliminarDatos(user.id)} className='btn btn-outline-danger float-end'>Eliminar</button>
                  <button onClick={() => editar(user)} className='btn btn-outline-warning float-end'>Editar</button>
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
