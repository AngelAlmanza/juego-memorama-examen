const Modal = (difficulty, win) => {
  const container = document.createElement('div');
  const titleModal = document.createElement('p');
  const messageModal = document.createElement('p');
  const btn = document.createElement('button');

  if (win) {
    titleModal.innerText = 'FELICIDADES HAS GANADO';
    messageModal.innerText = `Felicidades has completado el memorama en la dificultad ${difficulty.toUpperCase()}\n Haz click en aceptar para continuar`;
  } else {
    titleModal.innerText = 'Has perdido:c';
    messageModal.innerText = `No has podido completar el memorama en la dificultad ${difficulty.toUpperCase()}\n Haz click en aceptar para continuar`;
  }
  btn.innerText = 'Continuar';

  btn.addEventListener('click', (e) => {
    e.preventDefault();
    location.reload();
  });

  container.classList.add('modal-container');
  titleModal.classList.add('modal-title');
  messageModal.classList.add('modal-text');
  btn.classList.add('modal-button');

  container.appendChild(titleModal);
  container.appendChild(messageModal);
  container.appendChild(btn);

  return container;
}

export { Modal };