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