function displayModal() {
    const modal = document.getElementById("contact_modal");
	  modal.style.display = "flex";
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}

let inputFirstName = document.getElementById("prénom");
inputFirstName.addEventListener("change", (e) => {
    let inputFirstNameValue = e.target.value;
    console.log(inputFirstNameValue)
  });

let inputLastName = document.getElementById("nom");
inputLastName.addEventListener("change", (e) => {
    let inputLastNameValue = e.target.value;
    console.log(inputLastNameValue)
  });

let inputEmail = document.getElementById("email");
inputEmail.addEventListener("change", (e) => {
    let inputEmailValue = e.target.value;
    console.log(inputEmailValue)
  });

let inputMessage = document.getElementById("message");
inputMessage.addEventListener("change", (e) => {
    let inputMessageValue = e.target.value;
    console.log(inputMessageValue)
  });