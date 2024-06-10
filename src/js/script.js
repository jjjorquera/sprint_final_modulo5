let jsonData = [];

function obtenerDatosConRetraso() {
  setTimeout(async () => {
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts");

      if (res.status === 200) {
        const data = await res.json();
        jsonData = data; 
        renderizarDatos(data);
        
      } else if (res.status === 401) {
        console.log("falta clave");
      } else if (res.status === 404) {
        console.log("No se encontró lo que buscas");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  }, 1000); // Retraso de 1 segundo
}

// Función para renderizar los datos en HTML
function renderizarDatos(datos) {
  const dataList = document.getElementById('data-list');
  dataList.innerHTML = ''; // Limpiar cualquier contenido previo

  datos.forEach(dato => {
    const cardHtml = generateCardBootstrap(dato.userId, dato.id, dato.title, dato.body);
    const cardElement = document.createElement('div');
    cardElement.className = 'col-md-4'; // Usar clases de Bootstrap para diseño responsivo
    cardElement.innerHTML = cardHtml;
    dataList.appendChild(cardElement);
  });
}

const handleSearch = (event) => {
    event.preventDefault();
    const searchTerm = document.getElementById('search-input').value.trim().toLowerCase();
  
    // Verificar si la cadena de búsqueda contiene solo letras y espacios
    const regex = /^[a-zA-Z\s]+$/;
    if (!regex.test(searchTerm)) {
      alert('Por favor, ingrese solo letras y espacios en la búsqueda.');
      return;
    }
  
    const filteredData = jsonData.filter(item =>
      item.title.toLowerCase().includes(searchTerm) ||
      item.body.toLowerCase().includes(searchTerm)
    );
    renderizarDatos(filteredData);
  };

const generateCardBootstrap = (userId, id, title, body) => {
  return `
  <div class="card mx-auto mt-3">
    <div class="card-body text-center">
      <h5 class="card-title fw-bold">${title}</h5>
      <p class="card-text">User ID: ${userId}</p>
      <p class="card-text">Post ID: ${id}</p>
      <p class="card-text">${body}</p>
    </div>
  </div>
  `;
};

document.getElementById('search-form').addEventListener('submit', handleSearch);

// Función para ordenar los datos
function ordenarDatos(datos, criterio, callback) {
  const datosOrdenados = datos.slice(); // Copiar el arreglo para no mutar el original

  if (criterio === 'id') {
    datosOrdenados.sort((a, b) => a.id - b.id);
  } else if (criterio === 'title') {
    datosOrdenados.sort((a, b) => a.title.localeCompare(b.title));
  }

  callback(datosOrdenados);
}

// Llamar a la función para obtener datos con retraso al cargar la página
obtenerDatosConRetraso();
