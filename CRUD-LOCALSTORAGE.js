
moment.locale("es");





let tasksStorage = "Tasks";
let modalBackground = document.getElementById(`modal-background`);
let modal = document.getElementById(`modal-create`);
let PositionChange = 0;
let positionEliminar = 0;



function cambiarTiempo() {
  const alarma = document.getElementById("alarma");
  let tasksDriver = localStorage.getItem(tasksStorage);
  const now = moment();
  let tasks = [];
  if (tasksDriver) {
    console.log(now.format("YYYY-MM-DDTHH:mm"));
    tasks = JSON.parse(tasksDriver);
    for (let index = 0; index < tasks.length; index++) {
      const tarea = tasks[index];
      let cuentaRegresiva = document.getElementById(`countdown-${tarea.id}`);
      let faltan = moment(tarea.dataInput).fromNow();
      cuentaRegresiva.innerText = faltan;
      if (
        tarea.dataInput <= now.format("YYYY-MM-DDTHH:mm") &&
        tarea.yaSono === false
      ) {
        let modal = document.getElementById("modal-alarma");
        let modalBackground = document.getElementById("modal-background");
        let titleAlarma = document.getElementById("title-alarma");
        titleAlarma.innerText = `Se cumplio el tiempo de la tarea ${tarea.nameTask}`;
        modal.classList.toggle("none");
        modalBackground.classList.toggle("none");
        alarma.play();
        tarea.yaSono = true;
        window.scrollTo({ behavior: "smooth", top: 0 });
        
        if(Notification.permission === `granted`) {
         const notificacion = new Notification(`Se acabo el tiempo`, {
            icon: `./assets/never-give-up-small.png`,
            body: `Se cumplio el tiempo de la tarea ${tarea.nameTask}`
          });
          notificacion.onclick = function() {
            window.open(`https://nestormelendez.github.io/alarma_de_tareas/`)
          }
        }
        localStorage.setItem(tasksStorage, JSON.stringify(tasks));

      }
    }
  }
}

setInterval(() => {
  cambiarTiempo();
}, 1000);

document.addEventListener("DOMContentLoaded", (e) => {

  Notification.requestPermission().then(resultado => {
    console.log(`respuesta: `, resultado);
  })
  reloadTasks();
});

document.addEventListener("click", (e) => {
  if (e.target.matches(".btn-save")) {
    let inputNameTask = document.getElementById(`input-name-task`).value;
    let inputDescriptionTask = document.getElementById(
      `input-description-task`
    ).value;
    let inputDateTask = document.getElementById(`input-date-task`);
    console.log(inputDateTask.value);
    let taskContent = document.getElementById(`tasks-content`);
    let modalBackground = document.getElementById(`modal-background`);
    let modal = document.getElementById(`modal-create`);
    let finalMoment = moment(inputDateTask.value);
    console.log(finalMoment);
    let now = moment();
    console.log(now);
    let faltan = moment(finalMoment).fromNow();
    /*  let duration = finalMoment.diff(now);
    let interval = moment.duration(duration);
    let year = interval.years();
    let month = interval.months();
    let dayOfMonth = interval.days();
    let hour = interval.hours();
    let minute = interval.minutes();
    let second = interval.seconds();
    let faltan = "";
    if (year > 0) {
      faltan = `Faltan ${year} años`;
    } else if (month > 0) {
      faltan = `Faltan ${month} meses`;
    } else if (dayOfMonth > 0) {
      faltan = `Faltan ${dayOfMonth} dias`;
    } else if (hour > 0) {
      faltan = `Faltan ${hour} horas`;
    } else if (minute > 0) {
      faltan = `Faltan ${minute} minutos`;
    } else if (second > 0) {
      faltan = `Faltan ${second} segundos`;
    } */
    modalBackground.classList.toggle("none");
    modal.classList.toggle("none");
    let tasksDriver = localStorage.getItem(tasksStorage);
    let tasks = [];
    if (tasksDriver) {
      tasks = JSON.parse(tasksDriver);
    }
    let newTask = {
      id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
      nameTask: inputNameTask,
      descriptionTask: inputDescriptionTask,
      dateFinal: finalMoment.format("DD-MM-YYYY / HH:mm"),
      dataInput: inputDateTask.value,
      dateLimit: faltan,
      yaSono: false,
    };
    tasks.push(newTask);
    const saveTasks = JSON.stringify(tasks);
    localStorage.setItem(tasksStorage, saveTasks);
    let tasksCreate = "";
    for (let index = 0; index < tasks.length; index++) {
      const element = tasks[index];
      tasksCreate += `
        <article class="task">
    <div class="header-task">
      <span class="name-task-${element.yaSono} name-task-${element.id}">${element.nameTask}</span>
      <button data-edit="${element.id}" class="btn-edit edit"">
        <svg class="edit" data-more="${element.id}" xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
          <path class="edit" data-more="${element.id}"
            d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z" />
        </svg>
      </button>
    </div>
    <div class="date-task">
      <span id="date-${element.id}">${element.dateFinal}</span>
      <span id="countdown-${element.id}">${element.dateLimit}</span>
    </div>
    <div>
      <div id="task-description-content-${element.id}">
        <div class="task-description-content ">
          <span class="task-description">
          ${element.descriptionTask}
          </span>
        </div>
      </div>
    </div>
    <div class="footer-task">
      <button data-more="${element.id}" class="btn-description description">
        <svg class="description" data-more="${element.id}" xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
          <path class="description" data-more="${element.id}"
            d="M448 64c0-17.7-14.3-32-32-32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32zm0 256c0-17.7-14.3-32-32-32H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H416c17.7 0 32-14.3 32-32zM0 192c0 17.7 14.3 32 32 32H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H32c-17.7 0-32 14.3-32 32zM448 448c0-17.7-14.3-32-32-32H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H416c17.7 0 32-14.3 32-32z" />
        </svg>
      </button>
      <button data-delete="${element.id}" class="btn-delete delete">
        <svg data-delete="${element.id}" class="delete" xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
          <path data-delete="${element.id}" class="delete"
            d="M163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3C140.6 6.8 151.7 0 163.8 0zM32 128H416L394.8 467c-1.6 25.3-22.6 45-47.9 45H101.1c-25.3 0-46.3-19.7-47.9-45L32 128zm192 64c-6.4 0-12.5 2.5-17 7l-80 80c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V408c0 13.3 10.7 24 24 24s24-10.7 24-24V273.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-4.5-4.5-10.6-7-17-7z" />
        </svg>
      </button>
    </div>
    <div class="date-content">
    </div>
    <div class="btn-task">
    </div>
  </article>
        `;
    }
    taskContent.innerHTML = tasksCreate;
  }
  if (e.target.matches(".input-task")) {
    modalBackground.classList.toggle("none");
    modal.classList.toggle("none");
    window.scrollTo({ behavior: "smooth", top: 0 });
  }
  if (e.target.matches(".delete")) {
    let modalEliminar = document.getElementById("modal-delete");
    let modalBackground = document.getElementById("modal-background");
    let titleEliminar = document.getElementById("title-eliminar");
    let taskDelete = "";
    let lugar = 0;
    let position = e.target.dataset.delete;
    let tasksDriver = localStorage.getItem(tasksStorage);
    let tasks = [];
    if (tasksDriver) {
      tasks = JSON.parse(tasksDriver);
    }
    for (let index = 0; index < tasks.length; index++) {
      const element = tasks[index];
      if (element.id == position) {
        taskDelete = element.nameTask;
        positionEliminar = index;
      }
    }
    modalEliminar.classList.toggle("none");
    modalBackground.classList.toggle("none");
    titleEliminar.innerText = `¿Esta seguro de eliminar la tarea ${taskDelete}?`;
  }
  if (e.target.matches(".btn-eliminar")) {
    let tasksDriver = localStorage.getItem(tasksStorage);
    let tasks = [];
    if (tasksDriver) {
      tasks = JSON.parse(tasksDriver);
    }
    let borrado = tasks.splice(positionEliminar, 1);
    console.log(borrado);

    location.reload();
    const saveTasks = JSON.stringify(tasks);
    localStorage.setItem(tasksStorage, saveTasks);
    positionEliminar = 0;
  }

  if (e.target.matches(".description")) {
    let modalBackground = document.getElementById(`modal-background`);
    let modalDescription = document.getElementById(`modal-description`);
    modalBackground.classList.toggle("none");
    modalDescription.classList.toggle("none");
    let nameTask = "";
    let descriptionTask = "";
    let dateTask = "";
    let lugar = 0;
    PositionChange = e.target.dataset.more;
    let tasksDriver = localStorage.getItem(tasksStorage);
    let tasks = [];
    if (tasksDriver) {
      tasks = JSON.parse(tasksDriver);
    }
    for (let index = 0; index < tasks.length; index++) {
      const element = tasks[index];
      if (element.id == PositionChange) {
        nameTask = element.nameTask;
        descriptionTask = element.descriptionTask;
        dateTask = element.dataInput;
        lugar = index;
      }
    }
    document.getElementById(`input-name-task-edit`).value = nameTask;
    document.getElementById(`input-description-task-edit`).value =
      descriptionTask;
    document.getElementById(`input-date-task-edit`).value = dateTask;
  }
  if (e.target.matches(".btn-edit-change")) {
    let inputNameChange = document.getElementById(`input-name-task-edit`);
    let inputDescriptionChange = document.getElementById(
      `input-description-task-edit`
    );
    let inputDateChange = document.getElementById(`input-date-task-edit`);
    let btnSaveChange = document.getElementById(`btn-save-change`);
    let tituloDescription = document.getElementById(`title-description`);
    tituloDescription.innerText = `Editar tarea`;
    inputNameChange.disabled = false;
    inputDescriptionChange.disabled = false;
    inputDateChange.disabled = false;
    btnSaveChange.classList.toggle("none");
    e.target.classList.toggle("none");
  }
  if (e.target.matches(".btn-save-change")) {
    let inputNameChange = document.getElementById(`input-name-task-edit`).value;
    let inputDescriptionChange = document.getElementById(
      `input-description-task-edit`
    ).value;
    let inputDateChange = document.getElementById(`input-date-task-edit`).value;
    let tasksDriver = localStorage.getItem(tasksStorage);
    let btnSaveChange = document.getElementById(`btn-save-change`);
    let btnEditChange = document.getElementById(`btn-edit-change`);
    let finalMoment = moment(inputDateChange);
    console.log(finalMoment);
    /*     let now = moment(); */
    let faltan = moment(finalMoment).fromNow();
    /* let duration = finalMoment.diff(now);
    let interval = moment.duration(duration);
    let year = interval.years();
    let month = interval.months();
    let dayOfMonth = interval.days();
    let hour = interval.hours();
    let minute = interval.minutes();
    let second = interval.seconds();
    let faltan = "";
    if (year > 0) {
      faltan = `Faltan ${year} años`;
    } else if (month > 0) {
      faltan = `Faltan ${month} meses`;
    } else if (dayOfMonth > 0) {
      faltan = `Faltan ${dayOfMonth} dias`;
    } else if (hour > 0) {
      faltan = `Faltan ${hour} horas`;
    } else if (minute > 0) {
      faltan = `Faltan ${minute} minutos`;
    } else if (second > 0) {
      faltan = `Faltan ${second} segundos`;
    } */
    let tasks = [];
    if (tasksDriver) {
      tasks = JSON.parse(tasksDriver);
    }
    for (let index = 0; index < tasks.length; index++) {
      const element = tasks[index];
      if (element.id == PositionChange) {
        element.nameTask = inputNameChange;
        element.descriptionTask = inputDescriptionChange;
        element.dataInput = inputDateChange;
        element.dateFinal = finalMoment.format("DD-MM-YYYY / HH:mm");
        element.dateLimit = faltan;
        element.yaSono = false;
      }
    }
    const saveTasks = JSON.stringify(tasks);
    localStorage.setItem(tasksStorage, saveTasks);
    PositionChange = 0;
    btnSaveChange.classList.toggle("none");
    btnEditChange.classList.toggle("none");
    location.reload();
  }
  if (e.target.matches(".btn-cancel")) {
    let target = e.target.dataset.modal;
    let modalBackground = document.getElementById(`modal-background`);
    let modalDescription = document.getElementById(`modal-${target}`);
    console.log(modalDescription, target);
    modalBackground.classList.toggle("none");
    modalDescription.classList.toggle("none");
  }
  if (e.target.matches(".edit")) {
    let modalBackground = document.getElementById(`modal-background`);
    let modalDescription = document.getElementById(`modal-description`);
    let inputNameChange = document.getElementById(`input-name-task-edit`);
    let inputDescriptionChange = document.getElementById(
      `input-description-task-edit`
    );
    let inputDateChange = document.getElementById(`input-date-task-edit`);
    let btnSaveChange = document.getElementById(`btn-save-change`);
    let btnEditChange = document.getElementById(`btn-edit-change`);
    let tituloDescription = document.getElementById(`title-description`);
    modalBackground.classList.toggle("none");
    modalDescription.classList.toggle("none");
    let nameTask = "";
    let descriptionTask = "";
    let dateTask = "";
    let lugar = 0;
    PositionChange = e.target.dataset.more;
    let tasksDriver = localStorage.getItem(tasksStorage);
    let tasks = [];
    if (tasksDriver) {
      tasks = JSON.parse(tasksDriver);
    }
    for (let index = 0; index < tasks.length; index++) {
      const element = tasks[index];
      if (element.id == PositionChange) {
        nameTask = element.nameTask;
        descriptionTask = element.descriptionTask;
        dateTask = element.dataInput;
        lugar = index;
        yaSono = false;
      }
    }
    tituloDescription.innerText = `Editar tarea`;
    inputNameChange.disabled = false;
    inputDescriptionChange.disabled = false;
    inputDateChange.disabled = false;
    btnSaveChange.classList.toggle("none");
    btnEditChange.classList.toggle("none");
    document.getElementById(`input-name-task-edit`).value = nameTask;
    document.getElementById(`input-description-task-edit`).value =
      descriptionTask;
    document.getElementById(`input-date-task-edit`).value = dateTask;
    window.scrollTo({ behavior: "smooth", top: 0 });
  }
  if (e.target.matches(".btn-alarma")) {
    const alarma = document.getElementById("alarma");
    let modal = document.getElementById("modal-alarma");
    alarma.pause();
    modal.classList.toggle("none");
    location.reload();
  }
});

function reloadTasks() {
  let taskContent = document.getElementById(`tasks-content`);
  let tasksDriver = localStorage.getItem(tasksStorage);
  let tasks = [];
  if (tasksDriver) {
    tasks = JSON.parse(tasksDriver);
  }
  let tasksCreate = "";
  for (let index = 0; index < tasks.length; index++) {
    const element = tasks[index];
    tasksCreate += `
        <article class="task">
    <div class="header-task">
      <span class="name-task-${element.yaSono} name-task-${element.id}">${element.nameTask}</span>
      <button data-edit="${element.id}" class="btn-edit edit">
        <svg class="edit" data-more="${element.id}" xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
          <path class="edit" data-more="${element.id}" 
            d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z" />
        </svg>
      </button>
    </div>
    <div class="date-task">
      <span id="date-${element.id}">${element.dateFinal}</span>
      <span id="countdown-${element.id}">${element.dateLimit}</span>
    </div>
    <div>
      <div id="task-description-content-${element.id}">
        <div class="task-description-content ">
          <span class="task-description">
          ${element.descriptionTask}
          </span>
        </div>
      </div>
    </div>
    <div class="footer-task">
      <button data-more="${element.id}" class="btn-description">
        <svg class="description" data-more="${element.id}" xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
          <path class="description" data-more="${element.id}"
            d="M448 64c0-17.7-14.3-32-32-32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32zm0 256c0-17.7-14.3-32-32-32H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H416c17.7 0 32-14.3 32-32zM0 192c0 17.7 14.3 32 32 32H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H32c-17.7 0-32 14.3-32 32zM448 448c0-17.7-14.3-32-32-32H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H416c17.7 0 32-14.3 32-32z" />
        </svg>
      </button>
      <button data-delete="${element.id}" class="btn-delete delete">
        <svg class="delete" data-delete="${element.id}" xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
          <path data-delete="${element.id}" class="delete"
            d="M163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3C140.6 6.8 151.7 0 163.8 0zM32 128H416L394.8 467c-1.6 25.3-22.6 45-47.9 45H101.1c-25.3 0-46.3-19.7-47.9-45L32 128zm192 64c-6.4 0-12.5 2.5-17 7l-80 80c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V408c0 13.3 10.7 24 24 24s24-10.7 24-24V273.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-4.5-4.5-10.6-7-17-7z" />
        </svg>
      </button>
    </div>
    <div class="date-content">
    </div>
    <div class="btn-task">
    </div>
  </article>
        `;
  }
  taskContent.innerHTML = tasksCreate;
}
