let tasks = [
  {
    id: "0",
    nameTask: "proyectos de LUZ",
    descriptionTask:
      "proyectos de LUZ proyectos de LUZ proyectos de LUZ proyectos de LUZ proyectos de LUZ proyectos de LUZ proyectos de LUZ proyectos de LUZ",
    date: "2024-06-04",
  },
  {
    id: "1",
    nameTask: "proyectos de programacion",
    descriptionTask:
      "proyectos de programacion proyectos de programacion proyectos de programacion proyectos de programacion proyectos de programacion proyectos de programacion proyectos de programacion proyectos de programacion",
    date: "2024-06-04",
  },
  {
    id: "2",
    nameTask: "proyectos de leyes",
    descriptionTask:
      "proyectos de leyes proyectos de leyes proyectos de leyes proyectos de leyes proyectos de leyes proyectos de leyes proyectos de leyes proyectos de leyes",
    date: "2024-06-04",
  },
  {
    id: "3",
    nameTask: "proyectos de CSS",
    descriptionTask:
      "proyectos de CSS proyectos de CSS proyectos de CSS proyectos de CSS proyectos de CSS proyectos de CSS proyectos de CSS proyectos de CSS",
    date: "2024-06-04",
  },
];
let modalBackground = document.getElementById(`modal-background`);
let modal = document.getElementById(`modal`);

document.addEventListener("DOMContentLoaded", (e) => {});

document.addEventListener("click", (e) => {
 
  if (e.target.matches(".btn-image")) {
    console.log("dsds");
  }

  if (e.target.matches(".btn-save")) {
    let position = e.target.dataset.save;
    let inputNameTask = document.getElementById(`input-name-task-${position}`).value;
    let inputDescriptionTask = document.getElementById(`input-description-task-${position}`).value;
    let inputDateTask = document.getElementById(`input-date-task-${position}`);
    let taskContent = document.getElementById(`tasks-content`);
    
    let modalBackground = document.getElementById(`modal-background`);
    let modal = document.getElementById(`modal`);
    let tiempo = moment(inputDateTask.value).format("YYYY-MM-DD hh:mm")

    modalBackground.classList.toggle("none")
    modal.classList.toggle("none")
    console.log(tiempo)
    let task = {
      id: position + 1,
      nameTask: inputNameTask,
      descriptionTask: inputDescriptionTask,
      date: tiempo,
    };

    taskContent.innerHTML += `
    <article class="task">

    <div class="header-task">
      <span class="name-task-${position}">${inputNameTask}</span>
      <button data-edit="${position}" class="btn-edit">
        <svg xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
          <path
            d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z" />
        </svg>
      </button>

    </div>

    <div class="date-task">
      <span id="date-${position}">${tiempo}</span>
      <span id="countdown-${position}">Faltan 00 segundos</span>
    </div>

    <div>
      <div id="task-description-content-${position}">
        <div class="task-description-content ">
          <span class="task-description">
          ${inputDescriptionTask}
          </span>
        </div>
      </div>
    </div>

    <div class="footer-task">
      <button data-more="${position}" class="btn-description">
        <svg xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
          <path
            d="M448 64c0-17.7-14.3-32-32-32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32zm0 256c0-17.7-14.3-32-32-32H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H416c17.7 0 32-14.3 32-32zM0 192c0 17.7 14.3 32 32 32H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H32c-17.7 0-32 14.3-32 32zM448 448c0-17.7-14.3-32-32-32H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H416c17.7 0 32-14.3 32-32z" />
        </svg>
        </svg>
      </button>
      <button data-more="${position}" class="btn-delete">
        <svg xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
          <path
            d="M163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3C140.6 6.8 151.7 0 163.8 0zM32 128H416L394.8 467c-1.6 25.3-22.6 45-47.9 45H101.1c-25.3 0-46.3-19.7-47.9-45L32 128zm192 64c-6.4 0-12.5 2.5-17 7l-80 80c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V408c0 13.3 10.7 24 24 24s24-10.7 24-24V273.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-4.5-4.5-10.6-7-17-7z" />
        </svg>
        </svg>
      </button>
    </div>


    <div class="date-content">


    </div>

    <div class="btn-task">


    </div>
  </article>

    `
   
    tasks.push(task)
    console.log(tasks,task)
  }
  if (e.target.matches(".input-task")) {
   
    modalBackground.classList.toggle("none")
    modal.classList.toggle("none")
    console.log(modalBackground,modal)




  }












});
