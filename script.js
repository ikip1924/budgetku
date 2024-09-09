const backHomeBtn = document.querySelector("#budget_details button.back__home");
const budgetsPage = document.getElementById("budgets");
const budgetDetailPage = document.getElementById("budget_details");
const budgetCards = document.querySelectorAll("#budgets .budget__card");
const addBudgetBtn = document.querySelector("#budgets button");
const budgetForm = document.getElementById("budget_form")
const closeModalBudgetBtn = document.querySelector("#budget_form i")
const addSpentBtn = document.querySelector(".add__spent__btn")
const spentForm = document.getElementById("spent_form")
const closeModalSpentBtn = document.querySelector("#spent_form i")

// Klik Halaman Utama
backHomeBtn.addEventListener("click", () => {
	budgetDetailPage.classList.add("hidden");
	budgetsPage.classList.remove("hidden");
})

// klik budget cards
budgetCards.forEach((budgetCard) => {
	budgetCard.addEventListener("click", () => {
		budgetsPage.classList.add("hidden");
		budgetDetailPage.classList.remove("hidden");
	})
})

// klik tambah budget
addBudgetBtn.addEventListener("click", () => {
	budgetForm.classList.remove("hidden")
})

closeModalBudgetBtn.addEventListener("click", () => {
	budgetForm.classList.add("hidden")
})

addSpentBtn.addEventListener("click", () => {
	spentForm.classList.remove("hidden")
})

closeModalSpentBtn.addEventListener("click", () => {
	spentForm.classList.add("hidden")
})