const $ = (selector) => document.querySelector(selector);

const menuBtn = $("#menuBtn");
const navLinks = $("#navLinks");
const themeBtn = $("#themeBtn");
const loginModal = $("#loginModal");
const loginBtn = $("#loginBtn");
const footerLoginBtn = $("#footerLoginBtn");
const closeLogin = $("#closeLogin");
const modalBackdrop = $("#modalBackdrop");
const resultForm = $("#resultForm");
const resultCard = $("#resultCard");
const formMessage = $("#formMessage");
const loginForm = $("#loginForm");
const loginMessage = $("#loginMessage");
const togglePassword = $("#togglePassword");

function closeMenu() {
  navLinks.classList.remove("active");
  menuBtn.textContent = "☰";
  menuBtn.setAttribute("aria-expanded", "false");
}

menuBtn.addEventListener("click", () => {
  const active = navLinks.classList.toggle("active");
  menuBtn.textContent = active ? "✕" : "☰";
  menuBtn.setAttribute("aria-expanded", String(active));
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", closeMenu);
});

function setTheme(dark) {
  document.body.classList.toggle("dark", dark);
  themeBtn.textContent = dark ? "☽" : "☀";
  localStorage.setItem("ibnubaaz-theme", dark ? "dark" : "light");
}

const savedTheme = localStorage.getItem("ibnubaaz-theme");
setTheme(savedTheme === "dark");

themeBtn.addEventListener("click", () => {
  setTheme(!document.body.classList.contains("dark"));
});


function openLogin() {
  loginModal.classList.remove("hidden");
  loginModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  setTimeout(() => $("#loginEmail").focus(), 50);
}

function closeLoginModal() {
  loginModal.classList.add("hidden");
  loginModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  loginMessage.textContent = "";
  loginMessage.className = "form-message";
}

loginBtn.addEventListener("click", openLogin);
footerLoginBtn.addEventListener("click", openLogin);
closeLogin.addEventListener("click", closeLoginModal);
modalBackdrop.addEventListener("click", closeLoginModal);

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !loginModal.classList.contains("hidden")) closeLoginModal();
});

togglePassword.addEventListener("click", () => {
  const input = $("#loginPassword");
  const visible = input.type === "text";
  input.type = visible ? "password" : "text";
  togglePassword.textContent = visible ? "Show" : "Hide";
});

resultForm.addEventListener("submit", (e) => {
  e.preventDefault();
  formMessage.textContent = "";
  formMessage.className = "form-message";

  const className = $("#class").value;
  const first = $("#firstName").value.trim();
  const middle = $("#middleName").value.trim();
  const last = $("#lastName").value.trim();
  const id = $("#studentId").value.trim();

  if (!className || !first || !last || !id) {
    formMessage.textContent = "Fadlan buuxi Fasalka, First name, Last name iyo Student ID.";
    return;
  }

  const fullName = [first, middle, last].filter(Boolean).join(" ");
  $("#studentName").textContent = fullName;
  $("#resultClass").textContent = className;
  $("#resultId").textContent = id;
  $("#resultStatus").textContent = "Verified";

  resultCard.classList.remove("hidden");
  formMessage.textContent = "Xogta waa la xaqiijiyey (demo).";
  formMessage.className = "form-message success";
  resultCard.scrollIntoView({ behavior: "smooth", block: "center" });
});

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const username = $("#loginEmail").value.trim();
  const password = $("#loginPassword").value;

  if (!username || !password) {
    loginMessage.textContent = "Please enter email-address and password!";
    return;
  }

  loginMessage.textContent = "Login UI-ga wuu shaqaynayaa, lakin backend/auth wali laguma xidhin.";
  loginMessage.className = "form-message";
});

$("#year").textContent = new Date().getFullYear();


lucide.createIcons();
