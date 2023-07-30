import { toastNotification } from "./utils.js";

document.addEventListener("DOMContentLoaded", function () {
  const fileInputs = document.querySelectorAll("input[type=file]");
  const preview = document.querySelector(".preview");

  if (fileInputs.length === 0 || !preview) {
    return;
  }

  if (preview.querySelector("img").getAttribute("src") !== "") {
    preview.classList.add("active");
  }

  fileInputs.forEach((fileInput) => {
    fileInput.addEventListener("change", (ev) => {
      const files = ev.target.files;

      if (files.length === 0) {
        return;
      }

      // Check file type
      let file = ev.target.files[0]; // get the uploaded file
      let accept = ev.target.accept.split("/")[0]; // get accepted types

      if (file.type.split("/")[0] !== accept) {
        toastNotification("Invalid file type", "danger");
        ev.target.value = ""; // reset the input
        preview.innerHTML = ""; // reset the preview
        return;
      }

      // TODO: add file name to label

      const reader = new FileReader();
      reader.onload = () => {
        const img = document.createElement("img");
        img.src = reader.result;

        // Check if img src is not empty then add 'active' class
        if (img.src !== "") {
          preview.classList.add("active");
        }

        preview.innerHTML = "";

        // Create and append img element
        preview.appendChild(img);

        // Create and append input element
        const input = document.createElement("input");
        input.type = "text";
        input.className = "mg-t-sm";
        input.name = `${preview.parentNode.querySelector("input").name}-alt`;
        input.placeholder = "Image description...";
        input.setAttribute("novalidate", "true");
        preview.appendChild(input);
      };

      reader.readAsDataURL(files[0]);
    });
  });
});
