import {
  post,
  //getPost,
  //deletePosta,
  //editPost,
} from "../Firebase/authentication";
import { onNavigate } from "../router.js";

export const wall = () => {
  const buttonSend = document.createElement("btn");
  const inputShowModal = document.createElement("textarea");
  const div = document.createElement("div");
  const dialog = document.createElement("dialog");
  const buttonxIcon = document.createElement("img", "btn");
  const buttonxIcon2 = document.createElement("img", "btn");
  const dialogAjustes = document.createElement("dialog");
  const taskContainer = document.createElement("div");
  const imgUser = document.createElement("img");
  const logo2 = document.createElement("img");
  const fondo = document.createElement("img");
  const likeEmptyIcon = document.createElement("img", "input");
  const likeFullIcon = document.createElement("img", "input");
  const commentIcon = document.createElement("img", "input");
  const buttonSingOff = document.createElement("btn");
  let buttonsShowModal = document.createElement("img", "btn");
  let inputPost = document.createElement("input");

  inputShowModal.placeholder = "¿ Qué estás pensando ... ?";
  inputPost.placeholder = "¿ Qué estás pensando ... ?";
  inputPost.type = "texto";
  imgUser.type = "img";
  buttonsShowModal.type = "btn";
  buttonxIcon.type = "btn";
  buttonxIcon2.type = "btn";
  fondo.id = "fondo";
  div.id = "section";
  logo2.id = "logo2";
  dialog.id = "dialog";
  inputShowModal.id = "ShowModal";
  inputPost.id = "post";
  imgUser.id = "imgUser";
  taskContainer.id = "taskContainer";
  buttonSend.textContent = "SEND";

  buttonSingOff.textContent = "Cerrar Sesión";
  buttonSend.className = "send";
  buttonxIcon.className = "buttonX";
  buttonxIcon2.className = "buttonX2";
  buttonsShowModal.className = "ButtonsShowModal";
  likeEmptyIcon.className = "likeEmptyIcon";
  likeFullIcon.className = "likeFullIcon";
  commentIcon.className = "iconComment";
  buttonSingOff.className = "buttonSingOff";
  buttonsShowModal.className = "ButtonsShowModal";
  dialogAjustes.className = "dialogAjustes";

  imgUser.src = "./imagenes/user.png";
  imgUser.alt = "imgUser";
  logo2.src = "./imagenes/logo.png";
  logo2.alt = "Logo";
  fondo.src = "./imagenes/fondo-cel.png";
  fondo.alt = "Fondo";
  likeEmptyIcon.src = "./imagenes/likeVacio.png";
  likeEmptyIcon.alt = "Like1";
  likeFullIcon.src = "./imagenes/likeLleno.png";
  likeFullIcon.alt = "Like2";
  likeFullIcon.style.display = "none";
  commentIcon.src = "./imagenes/comentario.png";
  commentIcon.alt = "comentario";
  buttonxIcon.src = "./imagenes/x.png";
  buttonxIcon.alt = "equis";
  buttonxIcon2.src = "./imagenes/x.png";
  buttonxIcon2.alt = "equis";

  getPost((querySnapshot) => {
    const listPost = document.createElement("article");
    listPost.innerHTML = "";
    taskContainer.innerHTML = "";

    querySnapshot.forEach((doc) => {
      console.log(doc.data());

      const inputEdit = document.createElement("textarea");
      inputEdit.id = "comments";
      inputEdit.textContent = doc.data().contenido;
      console.log(inputEdit);


      const buttonDeleteIcon = document.createElement("img");
      const buttonEditIcon = document.createElement("img");

      buttonDeleteIcon.setAttribute("data-id", doc.id);
      buttonEditIcon.setAttribute("data-id", doc.id);
      //pruebaPost.id = "comment";
      buttonEditIcon.className = "edit";
      buttonEditIcon.id = "edit" + doc.id;
      buttonDeleteIcon.src = "./imagenes/buttonDeleteIcon.png";
      buttonDeleteIcon.alt = "Delete";
      buttonDeleteIcon.className = "delete";
      buttonEditIcon.src = "./imagenes/buttonEditIcon.png";
      buttonEditIcon.alt = "Edit";
  

      
      const likeEmptyIconClone = likeEmptyIcon.cloneNode(true);
      const likeFullIconClone = likeFullIcon.cloneNode(true);

      

      
      const liked = false;
      likeEmptyIconClone.addEventListener("click", () => {
        if (!liked) {
          likeFullIconClone.src = "./imagenes/likeLleno.png";
          likeFullIconClone.style.display = "block";
          likeEmptyIconClone.style.display = "none";
          liked = true;
          console.log("liked");
        } else {
        }
      });

      likeFullIconClone.addEventListener("click", () => {
        if (liked) {
          likeEmptyIconClone.src = "./imagenes/likeVacio.png";
          likeEmptyIconClone.style.display = "block";
          likeFullIconClone.style.display = "none";
          liked = false;
          console.log("no liked");
        } else {
        }
      });

      listPost.append(
        inputEdit,
        likeEmptyIconClone,
        likeFullIconClone,
        buttonDeleteIcon,
        buttonEditIcon
      );
      taskContainer.append(listPost);
    });


      const btnEdit = listPost.querySelectorAll(".edit");
      btnEdit.forEach((btn) => {
        btn.addEventListener("click", ({ target: { dataset } }) => {
          
          const commentContainer = document.querySelector(`[data-id="${dataset.id}"]`);
          const textoEditado = inputEdit.value; 
          //const textoEditado = commentContainer.querySelector(".comments").value;
          console.log('Guardando...', textoEditado);
          editPost(dataset.id, textoEditado)
        }) 
      })

      const btnDelete = listPost.querySelectorAll(".delete");
      btnDelete.forEach((btn) => {
        btn.addEventListener("click", ({ target: { dataset } }) => {
          deletePosta(dataset.id);
        });
      });

    
  });

  buttonSend.addEventListener("click", () => {
    post(inputShowModal.value).then((response) => {
      return response;
    });
    dialog.close();
    const task = document.createElement("p");
    task.textContent = inputShowModal.value;
    const taskContainer = document.querySelector("#taskContainer"); // Obtener el elemento que contenerá las tareas
    if (taskContainer) {
      taskContainer.appendChild(task);
      console.log(taskContainer);
    } else {
      console.error("No se encontró el elemento que contiene las tareas");
    }
    inputShowModal.value = "";
  });

  inputPost.addEventListener("click", function () {
    dialog.showModal();
  });

  buttonxIcon.addEventListener("click", function () {
    dialog.close();
  });
  buttonxIcon2.addEventListener("click", function () {
    dialogAjustes.close();
  });
  buttonSingOff.addEventListener("click", () => {
    onNavigate("/");
  });

  dialog.appendChild(inputShowModal);
  dialog.appendChild(buttonSend);
  dialog.appendChild(buttonxIcon);
  dialogAjustes.appendChild(buttonsShowModal);

  dialogAjustes.appendChild(buttonxIcon2);
  div.append(
    dialog,
    dialogAjustes,
    logo2,
    fondo,
    inputPost,
    taskContainer,
    imgUser,
    buttonSingOff
  );
  return div;
};
