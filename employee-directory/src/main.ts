interface Employee {
  id: number;
  name: string;
  role: string;
  department: string;
  email: string;
  muid?: string;
}

type SearchField = "name" | "role" | "department" | "email";
type EmployeeList = Employee[];

const employees: EmployeeList = [
  {
    id: 1,
    name: "Rafa Sidhik",
    role: "Web Developer",
    department: "Engineering",
    email: "rafasidhik@example.com",
  },
  {
    id: 2,
    name: "Amina Rahman",
    role: "UI/UX Designer",
    department: "Design",
    email: "amina@example.com"
  },
  {
    id: 3,
    name: "Arjun Nair",
    role: "Software Engineer",
    department: "Engineering",
    email: "arjun@example.com"
  },
  {
    id: 4,
    name: "Diya Thomas",
    role: "Data Analyst",
    department: "Analytics",
    email: "diya@example.com"
  },
  {
    id: 5,
    name: "Faris Ahmed",
    role: "Cybersecurity Intern",
    department: "Security",
    email: "faris@example.com"
  },
  {
    id: 6,
    name: "Neha Joseph",
    role: "Project Manager",
    department: "Management",
    email: "neha@example.com"
  }
];

const employeeList =
  document.querySelector<HTMLDivElement>("#employee-list");

const searchInput =
  document.querySelector<HTMLInputElement>("#search-input");

const employeeCount =
  document.querySelector<HTMLSpanElement>("#employee-count");

const searchStatus =
  document.querySelector<HTMLParagraphElement>("#search-status");

const emptyState =
  document.querySelector<HTMLParagraphElement>("#empty-state");

if (
  employeeList === null ||
  searchInput === null ||
  employeeCount === null ||
  searchStatus === null ||
  emptyState === null
) {
  throw new Error("Required page elements could not be found.");
}

// Save the checked elements as non-null constants.
const list: HTMLDivElement = employeeList;
const search: HTMLInputElement = searchInput;
const count: HTMLSpanElement = employeeCount;
const statusMessage: HTMLParagraphElement = searchStatus;
const empty: HTMLParagraphElement = emptyState;

function getInitials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .map((part: string) => part.charAt(0))
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function createEmployeeCard(employee: Employee): HTMLElement {
  const card = document.createElement("article");
  card.className = "employee-card";

  const top = document.createElement("div");
  top.className = "employee-top";

  const avatar = document.createElement("div");
  avatar.className = "avatar";
  avatar.textContent = getInitials(employee.name);
  avatar.setAttribute("aria-hidden", "true");

  const details = document.createElement("div");

  const name = document.createElement("h3");
  name.className = "employee-name";
  name.textContent = employee.name;

  const role = document.createElement("p");
  role.className = "employee-role";
  role.textContent = employee.role;

  details.append(name, role);
  top.append(avatar, details);

  const department = document.createElement("span");
  department.className = "department";
  department.textContent = employee.department;

  const email = document.createElement("a");
  email.className = "employee-email";
  email.href = `mailto:${employee.email}`;
  email.textContent = employee.email;

  card.append(top, department, email);

  return card;
}

function renderEmployees(employeeData: EmployeeList): void {
  list.replaceChildren();

  const fragment = document.createDocumentFragment();

  employeeData.forEach((employee: Employee) => {
    fragment.append(createEmployeeCard(employee));
  });

  list.append(fragment);

  count.textContent = `${employeeData.length} ${
    employeeData.length === 1 ? "employee" : "employees"
  }`;

  empty.hidden = employeeData.length !== 0;

  statusMessage.textContent =
    employeeData.length === 0
      ? ""
      : `Showing ${employeeData.length} ${
          employeeData.length === 1 ? "result" : "results"
        }`;
}

function searchEmployees(
  employeeData: EmployeeList,
  query: string,
  field?: SearchField
): EmployeeList {
  const normalizedQuery = query.trim().toLowerCase();

  if (normalizedQuery === "") {
    return employeeData;
  }

  return employeeData.filter((employee: Employee) => {
    const fields: SearchField[] = field
      ? [field]
      : ["name", "role", "department", "email"];

    return fields.some((key: SearchField) =>
      employee[key].toLowerCase().includes(normalizedQuery)
    );
  });
}

function handleSearch(): void {
  const query = search.value;
  const filteredEmployees = searchEmployees(employees, query);

  renderEmployees(filteredEmployees);
}

search.addEventListener("input", handleSearch);

renderEmployees(employees);