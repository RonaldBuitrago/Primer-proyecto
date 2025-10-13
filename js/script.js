const imagenes = [
  { id: 1, title: "La joven de la perla", author: "Johannes Vermeer", category: "Barroco", src: "assets/img/foto1.jpg", description: "La joven de la perla o Muchacha con turbante" },
  { id: 2, title: "Retrato de Adele Bloch-Bauer I", author: "Gustav Klimt", category: "Modernismo", src: "assets/img/foto2.jpg", description: "También conocida como La dama dorada o La dama de oro" },
  { id: 3, title: "Las dos Fridas", author: "Frida Kahlo", category: "Arte Moderno", src: "assets/img/foto3.jpg", description: "Las dos Fridas es un cuadro al óleo de Frida Kahlo" },
  { id: 4, title: "El beso", author: "Gustav Klimt", category: "Simbolismo", src: "assets/img/foto4.jpg", description: "El beso (Gustav Klimt)" }
];

const galleryGrid = document.getElementById("gallery-grid");
const categoryButtons = document.getElementById("category-buttons-gal");
const searchInput = document.getElementById("searchInput");

if (galleryGrid) {
  function mostrarImagenes(lista) {
    galleryGrid.innerHTML = "";
    lista.forEach((img) => {
      const card = document.createElement("div");
      card.classList.add("col-md-3");

      card.innerHTML = `
        <div class="card h-100 shadow-sm">
          <img src="${img.src}" class="card-img-top" alt="${img.title}" style="cursor: pointer;">
          <div class="card-body">
            <h5 class="card-title">${img.title}</h5>
            <p class="card-text">${img.author}</p>
            <p class="text-muted small">${img.category}</p>
          </div>
        </div>
      `;

      card.querySelector("img").addEventListener("click", () => mostrarDetalle(img));
      galleryGrid.appendChild(card);
    });
  }

  function mostrarDetalle(img) {
    const modalHTML = `
      <div class="modal fade" id="detalleModal" tabindex="-1">
        <div class="modal-dialog modal-lg modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Detalles De La Obra</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body text-center">
              <img src="${img.src}" alt="${img.title}" class="img-fluid rounded">
              <p class="mt-3"><strong>Autor:</strong> ${img.author}</p>
              <p class="mt-3"><strong>Obra:</strong> ${img.title}</p>
              <p class="text-muted">${img.category}</p>
              <p>${img.description}</p>
            </div>
          </div>
        </div>
      </div>`;
    document.body.insertAdjacentHTML("beforeend", modalHTML);
    const modal = new bootstrap.Modal(document.getElementById("detalleModal"));
    modal.show();
    document.getElementById("detalleModal").addEventListener("hidden.bs.modal", () => {
      document.getElementById("detalleModal").remove();
    });
  }

  function mostrarBotonesCategorias() {
    const categorias = ["Todas", ...new Set(imagenes.map(i => i.category))];
    categorias.forEach(cat => {
      const btn = document.createElement("button");
      btn.textContent = cat;
      btn.classList.add("btn", "btn-outline-success", "btn-sm");
      btn.addEventListener("click", () => {
        mostrarImagenes(cat === "Todas" ? imagenes : imagenes.filter(i => i.category === cat));
      });
      categoryButtons.appendChild(btn);
    });
  }

  searchInput?.addEventListener("input", (e) => {
    const texto = e.target.value.toLowerCase();
    const filtradas = imagenes.filter(i =>
      i.title.toLowerCase().includes(texto) || i.author.toLowerCase().includes(texto)
    );
    mostrarImagenes(filtradas);
  });

  mostrarImagenes(imagenes);
  mostrarBotonesCategorias();
}


if (document.getElementById("detalle-obra")) {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get("id"));
  const obra = obras.find(o => o.id === id);
  const detalle = document.getElementById("detalle-obra");

  if (obra) {
    detalles.innerHTML = `
      <div class="row justify-content-center align-items-center">
        <div class="col-md-6 text-center">
          <img src="${obra.src}" class="img-fluid rounded shadow-lg mb-4" alt="${obra.title}">
        </div>
        <div class="col-md-6">
          <h2 class="fw-bold">${obra.title}</h2>
          <p class="text-muted mb-1"><strong>Autor:</strong> ${obra.author}</p>
          <p class="mb-1"><strong>Categoría:</strong> ${obra.category}</p>
          <hr>
          <p class="lead">${obra.description}</p>
          <a href="galeria.html" class="btn btn-outline-success mt-3">Volver a la galería</a>
        </div>
      </div>
    `;
  } else {
    detalles.innerHTML = `
      <div class="text-center py-5">
        <h3 class="text-danger"> Obra no encontrada</h3>
        <a href="galeria.html" class="btn btn-secondary mt-3">Volver a la galería</a>
      </div>
    `;
  }
}

const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();
    const feedback = document.getElementById("contactFeedback");

    if (!name || !email || !message) {
      feedback.textContent = "Por favor completa todos los campos.";
      feedback.className = "text-danger";
      return;
    }

    if (!email.includes("@")) {
      feedback.textContent = "Por favor ingresa un correo válido.";
      feedback.className = "text-danger";
      return;
    }

    feedback.textContent = " ¡Mensaje enviado con éxito!";
    feedback.className = "text-success";
    contactForm.reset();
  });
}