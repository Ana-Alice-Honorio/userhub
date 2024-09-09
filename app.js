import { User } from "./user.js";

let users = [];

const userForm = document.getElementById("user-form");
const userList = document.getElementById("user-list");
const feedback = document.getElementById("feedback");

const renderUsers = () => {
  userList.innerHTML = "";

  users.forEach((user) => {
    const li = document.createElement("li");
    li.innerHTML = `
      Nome: ${user.name}, Email: ${user.email} 
      <button class="delete-btn" data-email="${user.email}">Excluir</button>
    `;
    userList.appendChild(li);
  });

  const deleteButtons = document.querySelectorAll(".delete-btn");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const userEmail = event.target.dataset.email;
      deleteUser(userEmail);
    });
  });
};

const deleteUser = (email) => {
  users = users.filter((user) => user.email !== email);
  renderUsers();
  showFeedback("Usuário excluído com sucesso!", "success");
};

const showFeedback = (message, type) => {
  feedback.textContent = message;
  feedback.className = `feedback ${type}`;
  setTimeout(() => {
    feedback.textContent = "";
    feedback.className = "feedback";
  }, 3000);
};

userForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const userExists = users.some((user) => user.email === email);

  if (userExists) {
    showFeedback("Usuário já cadastrado!", "error");
  } else {
    const newUser = new User(name, email, password);
    users.push(newUser);
    renderUsers();
    showFeedback("Usuário cadastrado com sucesso!", "success");
  }

  userForm.reset();
});
