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
const notifications = document.getElementById("notification")

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
	closeModalBudget();
})

function closeModalBudget() {
	budgetForm.classList.add("hidden")
}

addSpentBtn.addEventListener("click", () => {
	spentForm.classList.remove("hidden")
})

closeModalSpentBtn.addEventListener("click", () => {
	spentForm.classList.add("hidden")
})


function getFormValue(formData) {
	let result = new Object();

	for (const data of formData.entries()) {
		const [key, value] = data;

		Object.assign(result, {
			[key]: value
		})
	}
	return result;
}

function getExistingData() {
	return JSON.parse(localStorage.getItem("budgets")) ?? [];
}

function saveDataBudget(newData) {
	const existingData = getExistingData();
	existingData.push(newData)
	localStorage.setItem("budgets", JSON.stringify(existingData))
}

//submit form budget
document.querySelector("#budget_form form").addEventListener("submit", (e) => {
	e.preventDefault()

	const data = getFormValue(new FormData(e.target))

	saveDataBudget(data)
	closeModalBudget()
	resetInput()
	showNotification(`✅ Budget ${data.nama_budget} Berhasil Disimpan`)

})

function resetInput() {
	document.querySelectorAll("form input").forEach((input) => {
		input.value = ""
	})
}

function showNotification(message) {
	const newNotification = document.createElement("div");
	newNotification.innerText = message
	newNotification.classList.add("notification")

	notifications.appendChild(newNotification)

	setTimeout(() => {
		newNotification.classList.add("out")

		setTimeout(() => {
			notifications.removeChild(newNotification)
		}, 500)
	}, 4000);
}
