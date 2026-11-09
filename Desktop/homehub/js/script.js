
/* =========================================
   HOMEHUB - JAVASCRIPT
   Family Management Website
========================================= */

/* ---------- 1. STORAGE & DEFAULT DATA ---------- */

const STORAGE_KEY = "homehub_data";

const defaultData = {
    familyName: "Our Family",

    groceries: [
        { id: 1, name: "Milk", category: "Dairy", quantity: "2 packs", price: 400, purchased: false },
        { id: 2, name: "Bread", category: "Bakery", quantity: "1 pack", price: 150, purchased: true },
        { id: 3, name: "Eggs", category: "Dairy", quantity: "1 dozen", price: 360, purchased: false }
    ],

    expenses: [
        { id: 1, title: "Electricity Bill", amount: 4500, category: "Bills", date: new Date().toISOString().slice(0, 10) },
        { id: 2, title: "Grocery Shopping", amount: 2500, category: "Groceries", date: new Date().toISOString().slice(0, 10) }
    ],

    calendar: [
        { id: 1, title: "Family Dinner", date: new Date().toISOString().slice(0, 10), time: "08:00 PM", description: "Dinner together" }
    ],

    tasks: [
        { id: 1, title: "Clean the kitchen", assigned: "Everyone", due: new Date().toISOString().slice(0, 10), completed: false },
        { id: 2, title: "Organize the living room", assigned: "Everyone", due: new Date().toISOString().slice(0, 10), completed: true }
    ],

    reminders: [
        { id: 1, title: "Pay electricity bill", date: new Date().toISOString().slice(0, 10), time: "10:00 AM", notes: "Remember to pay before due date" }
    ],

    documents: [
        { id: 1, name: "Family ID Documents", category: "Personal", holder: "Family", reference: "Documents folder" }
    ],

    inventory: [
        { id: 1, name: "Refrigerator", category: "Appliances", quantity: "1", location: "Kitchen" },
        { id: 2, name: "Dining Chairs", category: "Furniture", quantity: "6", location: "Dining Room" }
    ],

    members: [
        { id: 1, name: "Family Member 1", relation: "Parent", phone: "Not added", birthday: "" }
    ],

    contacts: [
        { id: 1, name: "Emergency Service", phone: "1122", type: "Rescue Service", notes: "Emergency contact" }
    ]
};

function loadData() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);

        if (!saved) {
            return JSON.parse(JSON.stringify(defaultData));
        }

        const parsed = JSON.parse(saved);

        return {
            ...defaultData,
            ...parsed
        };
    } catch (error) {
        console.error("Unable to load HomeHub data:", error);
        return JSON.parse(JSON.stringify(defaultData));
    }
}

let data = loadData();

function saveData() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}


/* ---------- 2. PAGE INFORMATION ---------- */

const pageInfo = {
    dashboard: {
        title: "Dashboard",
        description: "Your family's home, all in one place."
    },

    groceries: {
        title: "Groceries",
        description: "Manage your shopping list and grocery expenses."
    },

    expenses: {
        title: "Monthly Expenses",
        description: "Keep track of your household spending."
    },

    calendar: {
        title: "Family Calendar",
        description: "Keep track of important family events and dates."
    },

    tasks: {
        title: "Tasks & Chores",
        description: "Organize household responsibilities."
    },

    reminders: {
        title: "Reminders",
        description: "Never forget important things."
    },

    documents: {
        title: "Documents",
        description: "Keep a record of your important family documents."
    },

    inventory: {
        title: "Home Inventory",
        description: "Manage and organize your household items."
    },

    members: {
        title: "Family Members",
        description: "Keep your family information organized."
    },

    contacts: {
        title: "Emergency Contacts",
        description: "Important contact information when you need it."
    },

    settings: {
        title: "Settings",
        description: "Manage your HomeHub preferences."
    }
};


/* ---------- 3. MODULE CONFIGURATION ---------- */

const modules = {

    groceries: {
        title: "Grocery List",
        button: "Add Grocery",
        icon: "🛒",
        fields: [
            { name: "name", label: "Item Name", placeholder: "Enter grocery item", required: true },
            { name: "category", label: "Category", type: "select", options: ["Vegetables", "Fruits", "Dairy", "Bakery", "Meat", "Household", "Other"] },
            { name: "quantity", label: "Quantity", placeholder: "e.g. 2 packs" },
            { name: "price", label: "Estimated Price", type: "number", placeholder: "Enter price" }
        ],
        columns: [
            ["name", "Item"],
            ["category", "Category"],
            ["quantity", "Quantity"],
            ["price", "Price"]
        ]
    },

    expenses: {
        title: "Expense Records",
        button: "Add Expense",
        icon: "💰",
        fields: [
            { name: "title", label: "Expense Name", placeholder: "e.g. Electricity Bill", required: true },
            { name: "amount", label: "Amount", type: "number", placeholder: "Enter amount", required: true },
            { name: "category", label: "Category", type: "select", options: ["Groceries", "Bills", "Transport", "Shopping", "Health", "Education", "Other"] },
            { name: "date", label: "Date", type: "date", required: true }
        ],
        columns: [
            ["title", "Expense"],
            ["category", "Category"],
            ["date", "Date"],
            ["amount", "Amount"]
        ]
    },

    calendar: {
        title: "Family Events",
        button: "Add Event",
        icon: "📅",
        fields: [
            { name: "title", label: "Event Name", placeholder: "Enter event name", required: true },
            { name: "date", label: "Event Date", type: "date", required: true },
            { name: "time", label: "Time", placeholder: "e.g. 06:00 PM" },
            { name: "description", label: "Description", type: "textarea", placeholder: "Event details" }
        ],
        columns: [
            ["title", "Event"],
            ["date", "Date"],
            ["time", "Time"],
            ["description", "Details"]
        ]
    },

    tasks: {
        title: "Household Tasks",
        button: "Add Task",
        icon: "✓",
        fields: [
            { name: "title", label: "Task Name", placeholder: "Enter task", required: true },
            { name: "assigned", label: "Assigned To", placeholder: "Family member" },
            { name: "due", label: "Due Date", type: "date" }
        ],
        columns: [
            ["title", "Task"],
            ["assigned", "Assigned To"],
            ["due", "Due Date"]
        ]
    },

    reminders: {
        title: "Family Reminders",
        button: "Add Reminder",
        icon: "⏰",
        fields: [
            { name: "title", label: "Reminder Title", placeholder: "Enter reminder", required: true },
            { name: "date", label: "Date", type: "date", required: true },
            { name: "time", label: "Time", placeholder: "e.g. 09:00 AM" },
            { name: "notes", label: "Notes", type: "textarea", placeholder: "Additional details" }
        ],
        columns: [
            ["title", "Reminder"],
            ["date", "Date"],
            ["time", "Time"],
            ["notes", "Notes"]
        ]
    },

    documents: {
        title: "Family Documents",
        button: "Add Document",
        icon: "📁",
        fields: [
            { name: "name", label: "Document Name", placeholder: "Enter document name", required: true },
            { name: "category", label: "Category", type: "select", options: ["Personal", "Education", "Property", "Medical", "Financial", "Other"] },
            { name: "holder", label: "Document Holder", placeholder: "Family member name" },
            { name: "reference", label: "File Reference", placeholder: "e.g. Documents folder" }
        ],
        columns: [
            ["name", "Document"],
            ["category", "Category"],
            ["holder", "Holder"],
            ["reference", "File Reference"]
        ]
    },

    inventory: {
        title: "Household Inventory",
        button: "Add Item",
        icon: "🏠",
        fields: [
            { name: "name", label: "Item Name", placeholder: "Enter item name", required: true },
            { name: "category", label: "Category", type: "select", options: ["Furniture", "Appliances", "Electronics", "Kitchen", "Other"] },
            { name: "quantity", label: "Quantity", placeholder: "e.g. 2" },
            { name: "location", label: "Location", placeholder: "e.g. Kitchen" }
        ],
        columns: [
            ["name", "Item"],
            ["category", "Category"],
            ["quantity", "Quantity"],
            ["location", "Location"]
        ]
    },

    members: {
        title: "Family Members",
        button: "Add Member",
        icon: "👨‍👩‍👧‍👦",
        fields: [
            { name: "name", label: "Full Name", placeholder: "Enter name", required: true },
            { name: "relation", label: "Relationship", placeholder: "e.g. Mother, Father, Sister" },
            { name: "phone", label: "Phone Number", placeholder: "Enter phone number" },
            { name: "birthday", label: "Birthday", type: "date" }
        ],
        columns: [
            ["name", "Name"],
            ["relation", "Relationship"],
            ["phone", "Phone"],
            ["birthday", "Birthday"]
        ]
    },

    contacts: {
        title: "Emergency Contacts",
        button: "Add Contact",
        icon: "☎",
        fields: [
            { name: "name", label: "Contact Name", placeholder: "Enter name", required: true },
            { name: "phone", label: "Phone Number", placeholder: "Enter phone number", required: true },
            { name: "type", label: "Contact Type", placeholder: "e.g. Hospital, Police" },
            { name: "notes", label: "Notes", type: "textarea", placeholder: "Additional information" }
        ],
        columns: [
            ["name", "Name"],
            ["phone", "Phone"],
            ["type", "Type"],
            ["notes", "Notes"]
        ]
    }
};


/* ---------- 4. GENERAL HELPERS ---------- */

const content = document.getElementById("page-content");
const heading = document.getElementById("page-heading");

function escapeHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
    })[char]);
}

function money(value) {
    return "Rs. " + Number(value || 0).toLocaleString("en-PK");
}

function showToast(message) {
    const toast = document.getElementById("toast");

    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2500);
}

function getToday() {
    return new Date().toISOString().slice(0, 10);
}

function createId() {
    return Date.now() + Math.floor(Math.random() * 1000);
}

function getMonthlyExpenses() {
    const month = getToday().slice(0, 7);

    return data.expenses
        .filter(item => String(item.date || "").startsWith(month))
        .reduce((total, item) => total + Number(item.amount || 0), 0);
}


/* ---------- 5. NAVIGATION ---------- */

let currentPage = "dashboard";

function navigateTo(page) {
    if (!pageInfo[page]) return;

    currentPage = page;

    document.querySelectorAll(".nav-link").forEach(link => {
        link.classList.toggle("active", link.dataset.page === page);
    });

    heading.textContent = pageInfo[page].title;

    renderPage(page);

    window.scrollTo({ top: 0, behavior: "smooth" });
}

document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", event => {
        event.preventDefault();
        navigateTo(link.dataset.page);
    });
});

function renderPage(page) {
    if (page === "dashboard") {
        renderDashboard();
    } else if (page === "settings") {
        renderSettings();
    } else {
        renderModule(page);
    }
}


/* ---------- 6. DASHBOARD ---------- */

function renderDashboard() {
    const pendingGroceries = data.groceries.filter(item => !item.purchased).length;
    const pendingTasks = data.tasks.filter(item => !item.completed).length;
    const monthlyExpenses = getMonthlyExpenses();
    const upcomingEvents = data.calendar.length;

    const groceryPreview = data.groceries.slice(0, 4);
    const taskPreview = data.tasks.filter(item => !item.completed).slice(0, 4);

    content.innerHTML = `
        <section class="welcome-banner">
            <h1>Welcome to HomeHub ♡</h1>
            <p>Your family's home, organized with love. Let's make everyday life easier.</p>
        </section>

        <section class="stats-grid">

            <div class="stat-card">
                <div class="stat-icon terracotta">🛒</div>
                <div class="stat-info">
                    <p>Pending Groceries</p>
                    <h3>${pendingGroceries}</h3>
                </div>
            </div>

            <div class="stat-card">
                <div class="stat-icon green">✓</div>
                <div class="stat-info">
                    <p>Pending Tasks</p>
                    <h3>${pendingTasks}</h3>
                </div>
            </div>

            <div class="stat-card">
                <div class="stat-icon beige">💰</div>
                <div class="stat-info">
                    <p>Monthly Expenses</p>
                    <h3>${money(monthlyExpenses)}</h3>
                </div>
            </div>

            <div class="stat-card">
                <div class="stat-icon pink">📅</div>
                <div class="stat-info">
                    <p>Family Events</p>
                    <h3>${upcomingEvents}</h3>
                </div>
            </div>

        </section>

        <div class="dashboard-grid">

            <section class="content-card">
                <div class="card-heading">
                    <div>
                        <h3>Grocery List</h3>
                        <p>Items you need to buy</p>
                    </div>
                    <button class="btn-link" data-go="groceries">View All →</button>
                </div>

                ${groceryPreview.length ? groceryPreview.map(item => `
                    <div class="list-item">
                        <div class="list-item-info">
                            <input type="checkbox"
                                class="custom-check"
                                data-grocery-toggle="${item.id}"
                                ${item.purchased ? "checked" : ""}>
                            <div>
                                <h4 class="${item.purchased ? "completed" : ""}">
                                    ${escapeHTML(item.name)}
                                </h4>
                                <p>${escapeHTML(item.quantity || "Quantity not added")}</p>
                            </div>
                        </div>
                        <span class="badge ${item.purchased ? "badge-green" : "badge-orange"}">
                            ${item.purchased ? "Purchased" : "Pending"}
                        </span>
                    </div>
                `).join("") : emptyState("🛒", "No groceries yet", "Add items to your shopping list.")}
            </section>

            <section class="content-card">
                <div class="card-heading">
                    <div>
                        <h3>Pending Tasks</h3>
                        <p>Things to do around the house</p>
                    </div>
                    <button class="btn-link" data-go="tasks">View All →</button>
                </div>

                ${taskPreview.length ? taskPreview.map(task => `
                    <div class="list-item">
                        <div class="list-item-info">
                            <input type="checkbox"
                                class="custom-check"
                                data-task-toggle="${task.id}">
                            <div>
                                <h4>${escapeHTML(task.title)}</h4>
                                <p>Assigned to: ${escapeHTML(task.assigned || "Not assigned")}</p>
                            </div>
                        </div>
                    </div>
                `).join("") : emptyState("✓", "All caught up!", "No pending household tasks.")}
            </section>

        </div>

        <section class="content-card">
            <div class="card-heading">
                <div>
                    <h3>Quick Actions</h3>
                    <p>Access your favourite sections</p>
                </div>
            </div>

            <div class="quick-actions">
                <button class="quick-action" data-go="groceries">
                    <span>🛒</span><p>Groceries</p>
                </button>

                <button class="quick-action" data-go="expenses">
                    <span>💰</span><p>Expenses</p>
                </button>

                <button class="quick-action" data-go="calendar">
                    <span>📅</span><p>Calendar</p>
                </button>

                <button class="quick-action" data-go="reminders">
                    <span>⏰</span><p>Reminders</p>
                </button>
            </div>
        </section>
    `;
}


/* ---------- 7. EMPTY STATE ---------- */

function emptyState(icon, title, message) {
    return `
        <div class="empty-state">
            <div class="empty-icon">${icon}</div>
            <h3>${title}</h3>
            <p>${message}</p>
        </div>
    `;
}


/* ---------- 8. MODULE PAGES ---------- */

function renderModule(page) {
    const module = modules[page];

    if (!module) return;

    const records = data[page] || [];

    let extraContent = "";

    if (page === "groceries") {
        const total = records.reduce((sum, item) => sum + Number(item.price || 0), 0);
        const purchased = records.filter(item => item.purchased).length;

        extraContent = `
            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-icon terracotta">🛒</div>
                    <div class="stat-info">
                        <p>Total Items</p>
                        <h3>${records.length}</h3>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon green">✓</div>
                    <div class="stat-info">
                        <p>Purchased</p>
                        <h3>${purchased}</h3>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon beige">💰</div>
                    <div class="stat-info">
                        <p>Estimated Total</p>
                        <h3>${money(total)}</h3>
                    </div>
                </div>
            </div>
        `;
    }

    if (page === "expenses") {
        extraContent = `
            <div class="stat-card mb-15">
                <div class="stat-icon terracotta">💰</div>
                <div class="stat-info">
                    <p>This Month's Expenses</p>
                    <h3>${money(getMonthlyExpenses())}</h3>
                </div>
            </div>
        `;
    }

    content.innerHTML = `
        <div class="page-intro">
            <h1>${module.icon} ${module.title}</h1>
            <p>${pageInfo[page].description}</p>
        </div>

        ${extraContent}

        <section class="content-card">

            <div class="module-header">
                <div>
                    <h2>${module.title}</h2>
                    <p>${records.length} record(s) available</p>
                </div>

                <button class="btn btn-primary" data-add="${page}">
                    + ${module.button}
                </button>
            </div>

            <div class="toolbar">
                <input type="search"
                    class="form-control search-input"
                    placeholder="Search ${module.title.toLowerCase()}..."
                    data-search="${page}">

                <span class="text-muted">
                    Total Records: ${records.length}
                </span>
            </div>

            <div id="records-${page}">
                ${renderRecords(page, records)}
            </div>

        </section>
    `;
}


/* ---------- 9. RENDER RECORDS ---------- */

function renderRecords(page, records) {
    const module = modules[page];

    if (!records.length) {
        return emptyState(module.icon, "No records found", "Click the button above to add your first record.");
    }

    if (page === "groceries") {
        return `
            <div class="table-wrapper">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Category</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${records.map(item => `
                            <tr>
                                <td>${escapeHTML(item.name)}</td>
                                <td>${escapeHTML(item.category)}</td>
                                <td>${escapeHTML(item.quantity)}</td>
                                <td>${money(item.price)}</td>
                                <td>
                                    <label>
                                        <input type="checkbox"
                                            class="custom-check"
                                            data-grocery-toggle="${item.id}"
                                            ${item.purchased ? "checked" : ""}>
                                        ${item.purchased ? "Purchased" : "Pending"}
                                    </label>
                                </td>
                                <td>${actionButtons(page, item.id)}</td>
                            </tr>
                        `).join("")}
                    </tbody>
                </table>
            </div>
        `;
    }

    if (page === "tasks") {
        return `
            <div class="table-wrapper">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Task</th>
                            <th>Assigned To</th>
                            <th>Due Date</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${records.map(item => `
                            <tr>
                                <td class="${item.completed ? "completed" : ""}">
                                    ${escapeHTML(item.title)}
                                </td>
                                <td>${escapeHTML(item.assigned)}</td>
                                <td>${escapeHTML(item.due)}</td>
                                <td>
                                    <label>
                                        <input type="checkbox"
                                            class="custom-check"
                                            data-task-toggle="${item.id}"
                                            ${item.completed ? "checked" : ""}>
                                        ${item.completed ? "Completed" : "Pending"}
                                    </label>
                                </td>
                                <td>${actionButtons(page, item.id)}</td>
                            </tr>
                        `).join("")}
                    </tbody>
                </table>
            </div>
        `;
    }

    return `
        <div class="table-wrapper">
            <table class="data-table">
                <thead>
                    <tr>
                        ${module.columns.map(column => `<th>${column[1]}</th>`).join("")}
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    ${records.map(item => `
                        <tr>
                            ${module.columns.map(column => `
                                <td>${formatCell(page, column[0], item[column[0]])}</td>
                            `).join("")}

                            <td>${actionButtons(page, item.id)}</td>
                        </tr>
                    `).join("")}
                </tbody>
            </table>
        </div>
    `;
}

function formatCell(page, field, value) {
    if (field === "amount" || (page === "groceries" && field === "price")) {
        return money(value);
    }

    return escapeHTML(value || "—");
}

function actionButtons(page, id) {
    return `
        <div class="action-buttons">
            <button class="btn btn-secondary btn-small"
                data-edit="${page}"
                data-id="${id}">
                Edit
            </button>

            <button class="btn btn-danger btn-small"
                data-delete="${page}"
                data-id="${id}">
                Delete
            </button>
        </div>
    `;
}


/* ---------- 10. ADD & EDIT MODAL ---------- */

function openForm(page, recordId = null) {
    const module = modules[page];

    if (!module) return;

    const record = recordId
        ? data[page].find(item => item.id === Number(recordId))
        : null;

    const fieldsHTML = module.fields.map(field => {
        const value = record ? record[field.name] ?? "" : "";

        let inputHTML = "";

        if (field.type === "select") {
            inputHTML = `
                <select class="form-control"
                    name="${field.name}">
                    ${field.options.map(option => `
                        <option value="${escapeHTML(option)}"
                            ${value === option ? "selected" : ""}>
                            ${escapeHTML(option)}
                        </option>
                    `).join("")}
                </select>
            `;
        } else if (field.type === "textarea") {
            inputHTML = `
                <textarea class="form-control"
                    name="${field.name}"
                    placeholder="${escapeHTML(field.placeholder || "")}">${escapeHTML(value)}</textarea>
            `;
        } else {
            inputHTML = `
                <input class="form-control"
                    type="${field.type || "text"}"
                    name="${field.name}"
                    value="${escapeHTML(value)}"
                    placeholder="${escapeHTML(field.placeholder || "")}"
                    ${field.required ? "required" : ""}
                    ${field.type === "number" ? 'min="0"' : ""}>
            `;
        }

        return `
            <div class="form-group">
                <label>${field.label}</label>
                ${inputHTML}
            </div>
        `;
    }).join("");

    document.getElementById("modal-container").innerHTML = `
        <div class="modal-overlay" data-close-overlay>
            <div class="modal" role="dialog" aria-modal="true">
                <div class="modal-header">
                    <h3>${record ? "Edit" : "Add"} ${module.title}</h3>
                    <button type="button" class="modal-close" data-close-modal>×</button>
                </div>

                <form id="record-form" data-form-page="${page}" data-record-id="${recordId || ""}">
                    ${fieldsHTML}

                    <div class="modal-actions">
                        <button type="button" class="btn btn-secondary" data-close-modal>
                            Cancel
                        </button>

                        <button type="submit" class="btn btn-primary">
                            ${record ? "Save Changes" : "Add Record"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    `;
}


/* ---------- 11. SAVE RECORD ---------- */

function saveRecord(form) {
    const page = form.dataset.formPage;
    const recordId = form.dataset.recordId;

    if (!modules[page]) return;

    const formData = new FormData(form);
    const record = {};

    modules[page].fields.forEach(field => {
        record[field.name] = formData.get(field.name) || "";
    });

    if (record.amount !== undefined) {
        record.amount = Number(record.amount) || 0;
    }

    if (record.price !== undefined) {
        record.price = Number(record.price) || 0;
    }

    if (recordId) {
        const index = data[page].findIndex(item => item.id === Number(recordId));

        if (index !== -1) {
            data[page][index] = {
                ...data[page][index],
                ...record
            };
        }

        showToast("Record updated successfully!");
    } else {
        record.id = createId();

        if (page === "groceries") {
            record.purchased = false;
        }

        if (page === "tasks") {
            record.completed = false;
        }

        data[page].push(record);
        showToast("Record added successfully!");
    }

    saveData();
    closeModal();
    renderPage(currentPage);
}


/* ---------- 12. DELETE RECORD ---------- */

function deleteRecord(page, id) {
    if (!modules[page]) return;

    const confirmed = confirm("Are you sure you want to delete this record?");

    if (!confirmed) return;

    data[page] = data[page].filter(item => item.id !== Number(id));

    saveData();
    renderPage(currentPage);

    showToast("Record deleted successfully!");
}


/* ---------- 13. TOGGLE GROCERY & TASK STATUS ---------- */

function toggleGrocery(id) {
    const item = data.groceries.find(item => item.id === Number(id));

    if (!item) return;

    item.purchased = !item.purchased;

    saveData();
    renderPage(currentPage);
}

function toggleTask(id) {
    const item = data.tasks.find(item => item.id === Number(id));

    if (!item) return;

    item.completed = !item.completed;

    saveData();
    renderPage(currentPage);
}


/* ---------- 14. CLOSE MODAL ---------- */

function closeModal() {
    document.getElementById("modal-container").innerHTML = "";
}


/* ---------- 15. SETTINGS PAGE ---------- */

function renderSettings() {
    content.innerHTML = `
        <div class="page-intro">
            <h1>⚙ Settings</h1>
            <p>Customize your HomeHub family space.</p>
        </div>

        <section class="content-card settings-section">
            <h3>Family Information</h3>

            <form id="family-form">
                <div class="form-group">
                    <label>Family Name</label>
                    <input class="form-control"
                        type="text"
                        name="familyName"
                        value="${escapeHTML(data.familyName)}"
                        required>
                </div>

                <button class="btn btn-primary" type="submit">
                    Save Family Name
                </button>
            </form>
        </section>

        <section class="content-card settings-section">
            <h3>Data Management</h3>

            <div class="settings-row">
                <div>
                    <h4>Export Family Data</h4>
                    <p>Download your HomeHub information as a JSON file.</p>
                </div>

                <button class="btn btn-secondary" data-export>
                    Export Data
                </button>
            </div>

            <div class="settings-row">
                <div>
                    <h4>Reset Sample Data</h4>
                    <p>Restore the original sample records.</p>
                </div>

                <button class="btn btn-danger" data-reset>
                    Reset Data
                </button>
            </div>
        </section>

        <section class="content-card">
            <h3>About HomeHub</h3>
            <p class="text-muted mt-15">
                HomeHub is a family management dashboard designed to
                help households organize their everyday activities,
                expenses, events and important information.
            </p>
            <p class="text-muted mt-15">Version 1.0 | HomeHub © 2026</p>
        </section>
    `;
}


/* ---------- 16. EXPORT DATA ---------- */

function exportData() {
    const file = new Blob(
        [JSON.stringify(data, null, 4)],
        { type: "application/json" }
    );

    const url = URL.createObjectURL(file);
    const link = document.createElement("a");

    link.href = url;
    link.download = "HomeHub-Family-Data.json";

    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(url);

    showToast("Your data export has started!");
}


/* ---------- 17. RESET DATA ---------- */

function resetData() {
    const confirmed = confirm(
        "This will replace your current HomeHub records with the original sample data. Continue?"
    );

    if (!confirmed) return;

    data = JSON.parse(JSON.stringify(defaultData));

    saveData();
    renderPage(currentPage);

    showToast("Sample data restored!");
}


/* ---------- 18. EVENT LISTENERS ---------- */

document.addEventListener("click", event => {

    const goButton = event.target.closest("[data-go]");

    if (goButton) {
        navigateTo(goButton.dataset.go);
        return;
    }

    const addButton = event.target.closest("[data-add]");

    if (addButton) {
        openForm(addButton.dataset.add);
        return;
    }

    const editButton = event.target.closest("[data-edit]");

    if (editButton) {
        openForm(editButton.dataset.edit, editButton.dataset.id);
        return;
    }

    const deleteButton = event.target.closest("[data-delete]");

    if (deleteButton) {
        deleteRecord(deleteButton.dataset.delete, deleteButton.dataset.id);
        return;
    }

    if (event.target.closest("[data-close-modal]")) {
        closeModal();
        return;
    }

    if (event.target.matches("[data-close-overlay]")) {
        closeModal();
        return;
    }

    if (event.target.closest("[data-export]")) {
        exportData();
        return;
    }

    if (event.target.closest("[data-reset]")) {
        resetData();
        return;
    }
});


/* ---------- 19. FORM SUBMISSION ---------- */

document.addEventListener("submit", event => {

    if (event.target.id === "record-form") {
        event.preventDefault();

        if (!event.target.reportValidity()) return;

        saveRecord(event.target);
        return;
    }

    if (event.target.id === "family-form") {
        event.preventDefault();

        const formData = new FormData(event.target);

        data.familyName = formData.get("familyName").trim();

        saveData();

        showToast("Family name updated!");

        return;
    }
});


/* ---------- 20. CHECKBOX EVENTS ---------- */

document.addEventListener("change", event => {

    if (event.target.matches("[data-grocery-toggle]")) {
        toggleGrocery(event.target.dataset.groceryToggle);
        return;
    }

    if (event.target.matches("[data-task-toggle]")) {
        toggleTask(event.target.dataset.taskToggle);
    }
});


/* ---------- 21. SEARCH RECORDS ---------- */

document.addEventListener("input", event => {

    const searchInput = event.target.closest("[data-search]");

    if (!searchInput) return;

    const page = searchInput.dataset.search;
    const query = searchInput.value.toLowerCase().trim();

    const records = data[page] || [];

    const filtered = records.filter(record =>
        Object.values(record).some(value =>
            String(value ?? "").toLowerCase().includes(query)
        )
    );

    const resultsContainer = document.getElementById(`records-${page}`);

    if (resultsContainer) {
        resultsContainer.innerHTML = renderRecords(page, filtered);
    }
});


/* ---------- 22. CURRENT DATE ---------- */

function updateCurrentDate() {
    const dateElement = document.getElementById("current-date");

    if (!dateElement) return;

    dateElement.textContent = new Date().toLocaleDateString("en-PK", {
        day: "numeric",
        month: "short",
        year: "numeric"
    });
}


/* ---------- 23. START HOMEHUB ---------- */

updateCurrentDate();
navigateTo("dashboard");
