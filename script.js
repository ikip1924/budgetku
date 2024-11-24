const backHomeBtn = document.querySelector("#budget_details button.back__home");
const budgetsPage = document.getElementById("budgets");
renderBudgets()
const budgetDetailPage = document.getElementById("budget_details");
const budgetForm = document.getElementById("budget_form")
const closeModalBudgetBtn = document.querySelector("#budget_form i")
const addSpentBtn = document.querySelector(".add__spent__btn")
const spentForm = document.getElementById("spent_form")
const closeModalSpentBtn = document.querySelector("#spent_form i")
const notifications = document.getElementById("notifications")

function selectBudgetCardsAndButton() {
	const budgetCards = document.querySelectorAll("#budgets .budget__card");
	const addBudgetBtn = document.querySelector("#budgets button");

	// event listener klik budget card
	budgetCards.forEach((card) => {
		card.addEventListener("click", () => {
			const budgetId = card.getAttribute("data-budgetid")

			renderBudgetingDetail(budgetId)
			budgetsPage.classList.add("hidden");
			budgetDetailPage.classList.remove("hidden");
		})
	})

	// event listener klik tambah budget 
	addBudgetBtn.addEventListener("click", () => {
		budgetForm.classList.remove("hidden")
	})
}

// me render data budgeting 
function renderBudgets() {
	const budgetData = getExistingData()


	const budgetList = budgetData.map((budget) => {
		return `<div class="budget__card" data-budgetId="${budget.id}">
			<h2 class="budget__name">${budget.nama_budget}</h2>
			<p class="budget__amount">Rp ${budget.total}</p>
			<p class="budget__total ">${budget.total}</p>
		</div>`
	})
		.concat([`<button class="add__budget__btn">+</button>`])
		.join("");

	budgetsPage.innerHTML = budgetList
	selectBudgetCardsAndButton()
}

function renderBudgetingDetail(budgetId) {

	const currentBudget = getBudgetById(budgetId)

	document
		.querySelector("#budget_details .budget__card")
		.setAttribute("data-budgetid", budgetId)

	document.querySelector("#budget_details .budget__card h2").innerText = currentBudget.nama_budget
	document.querySelector("#budget_details .budget__card .budget__amount").innerText = "Rp " + currentBudget.total;
	document.querySelector("#budget_details .budget__card .budget__total").innerText = "Rp " + currentBudget.total;

}

// Klik Halaman Utama
backHomeBtn.addEventListener("click", () => {
	budgetDetailPage.classList.add("hidden");
	budgetsPage.classList.remove("hidden");
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
	closeModalPengeluaran();
})


function closeModalPengeluaran() {
	spentForm.classList.add("hidden")
}

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

function getBudgetById(id) {
	const budgets = getExistingData();
	return budgets.filter((budget) => budget.id == id)[0];
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

	const dataWithId = {
		id: generateId(),
		...data,
	}
	saveDataBudget(dataWithId)
	closeModalBudget()
	resetInput()
	showNotification(`✅ Budget ${data.nama_budget} Berhasil Disimpan`)
	renderBudgets()
})

// Submit Pengeluran
document.querySelector("#spent_form form").addEventListener("submit", (e) => {
	e.preventDefault()

	const data = getFormValue(new FormData(e.target))

	addPengeluaran(data)
	closeModalPengeluaran()
	resetInput()
	showNotification(`✅ Pengeluaran ${data.nama_pengeluaran} Berhasil Tambahkan`)
})

function addPengeluaran(data) {
	const budgetId = document.querySelector("#budget_details .budget__card").getAttribute("data-budgetid")

	const currentBudget = getBudgetById(budgetId)

	currentSpent = currentBudget.pengeluaran ?? []

	const budgetWithSpent = {
		...currentBudget,
		pengeluaran: [...currentSpent, data]
	}

	const allBudgets = getExistingData();
	const updatedBudget = allBudgets.map((budget) => {
		if (budget.id == budgetId) {
			return budgetWithSpent
		} else {
			return budget
		}
	})
	localStorage.setItem("budgets", JSON.stringify(updatedBudget))
}

function generateId() {
	return new Date().getTime();
}

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
