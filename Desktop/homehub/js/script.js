
// =================================
// HOMEHUB - JAVASCRIPT
// =================================


// 1. Display Current Date

const dateElement = document.getElementById("current-date");

const today = new Date();

dateElement.textContent = today.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
});


// 2. Sidebar Navigation

const navLinks = document.querySelectorAll("[data-page]");
const dashboardPage = document.getElementById("dashboard-page");
const otherPage = document.getElementById("other-page");
const pageHeading = document.getElementById("page-heading");
const placeholderTitle = document.getElementById("placeholder-title");

navLinks.forEach(link => {
    link.addEventListener("click", function(event) {
        event.preventDefault();

        const pageName = this.dataset.page;

        navLinks.forEach(item => {
            item.classList.remove("active");
        });

        this.classList.add("active");

        if (pageName === "dashboard") {
            dashboardPage.classList.add("active");
            otherPage.classList.remove("active");
            pageHeading.textContent = "Dashboard";
        } else {
            dashboardPage.classList.remove("active");
            otherPage.classList.add("active");

            const title = this.textContent.trim();

            pageHeading.textContent = title;
            placeholderTitle.textContent = title;
        }
    });
});


// 3. Back to Dashboard

document.getElementById("back-dashboard")
    .addEventListener("click", function() {

        dashboardPage.classList.add("active");
        otherPage.classList.remove("active");

        pageHeading.textContent = "Dashboard";

        navLinks.forEach(link => {
            link.classList.remove("active");

            if (link.dataset.page === "dashboard") {
                link.classList.add("active");
            }
        });
    });


// 4. Grocery List - Add Items

const groceryForm = document.getElementById("grocery-form");
const groceryInput = document.getElementById("grocery-input");
const groceryList = document.getElementById("grocery-list");

function updateGroceryCount() {
    const count = groceryList.querySelectorAll("li").length;

    document.getElementById("grocery-count").textContent = count;
}

groceryForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const itemName = groceryInput.value.trim();

    if (itemName === "") {
        return;
    }

    const listItem = document.createElement("li");

    const label = document.createElement("label");
    const checkbox = document.createElement("input");
    const text = document.createElement("span");

    checkbox.type = "checkbox";
    text.textContent = itemName;

    label.appendChild(checkbox);
    label.appendChild(text);

    listItem.appendChild(label);
    groceryList.appendChild(listItem);

    groceryInput.value = "";

    updateGroceryCount();
});


// 5. Grocery Item Completion

groceryList.addEventListener("change", function(event) {
    if (event.target.type === "checkbox") {
        event.target.closest("label").classList.toggle(
            "completed",
            event.target.checked
        );
    }
});


// 6. Task Counter

const taskList = document.getElementById("task-list");
const pendingCount = document.getElementById("pending-count");

function updateTaskCount() {

    const checkboxes = taskList.querySelectorAll(
        'input[type="checkbox"]'
    );

    const pending = Array.from(checkboxes).filter(
        checkbox => !checkbox.checked
    ).length;

    pendingCount.textContent = pending;
}

taskList.addEventListener("change", function(event) {

    if (event.target.type === "checkbox") {
        event.target.closest(".task-item").classList.toggle(
            "completed",
            event.target.checked
        );

        updateTaskCount();
    }
});


// 7. Quick Add Button

document.getElementById("quick-add")
    .addEventListener("click", function() {

        groceryInput.focus();

        document.getElementById("grocery-form")
            .scrollIntoView({
                behavior: "smooth",
                block: "center"
            });
    });


// 8. Initial Counts

updateGroceryCount();
updateTaskCount();

console.log("HomeHub Dashboard Loaded Successfully!");
