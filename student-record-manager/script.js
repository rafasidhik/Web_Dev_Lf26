// Student data
const students = [
    {
        name: "Ananya",
        course: "CSE",
        marks: 94
    },
    {
        name: "Arjun",
        course: "ECE",
        marks: 86
    },
    {
        name: "Meera",
        course: "CSE",
        marks: 91
    },
    {
        name: "Rahul",
        course: "ME",
        marks: 74
    },
    {
        name: "Diya",
        course: "EEE",
        marks: 88
    },
    {
        name: "Nikhil",
        course: "CSE",
        marks: 79
    },
    {
        name: "Fathima",
        course: "ECE",
        marks: 83
    },
    {
        name: "Adithya",
        course: "ME",
        marks: 68
    },
    {
        name: "Riya",
        course: "EEE",
        marks: 93
    },
    {
        name: "Rafa",
        course: "CSE",
        marks: 96
    }
];


// Get HTML elements
const searchInput = document.getElementById("searchInput");
const courseFilter = document.getElementById("courseFilter");
const marksFilter = document.getElementById("marksFilter");
const sortSelect = document.getElementById("sortSelect");

const studentTableBody = document.getElementById("studentTableBody");
const totalStudents = document.getElementById("totalStudents");
const averageMarks = document.getElementById("averageMarks");
const topper = document.getElementById("topper");
const resultCount = document.getElementById("resultCount");
const emptyState = document.getElementById("emptyState");


// Convert course code to readable name
function getCourseName(course) {
    const courses = {
        CSE: "Computer Science",
        ECE: "Electronics",
        EEE: "Electrical",
        ME: "Mechanical"
    };

    return courses[course] || course;
}


// Get performance based on marks
function getPerformance(marks) {
    if (marks >= 90) {
        return {
            text: "Excellent",
            className: "excellent"
        };
    }

    if (marks >= 80) {
        return {
            text: "Good",
            className: "good"
        };
    }

    if (marks >= 70) {
        return {
            text: "Average",
            className: "average"
        };
    }

    return {
        text: "Needs Improvement",
        className: "needs-improvement"
    };
}


// Display students on the page
function renderStudents(studentList) {
    studentTableBody.innerHTML = "";

    studentList.forEach((student, index) => {
        const performance = getPerformance(student.marks);

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${student.name}</td>
            <td>${getCourseName(student.course)}</td>
            <td>${student.marks}</td>
            <td>
                <span class="performance ${performance.className}">
                    ${performance.text}
                </span>
            </td>
        `;

        studentTableBody.appendChild(row);
    });

    if (studentList.length === 0) {
        emptyState.hidden = false;
    } else {
        emptyState.hidden = true;
    }
}


// Filter students
function getFilteredStudents() {
    const searchText = searchInput.value.toLowerCase().trim();
    const selectedCourse = courseFilter.value;
    const minimumMarks = marksFilter.value;

    return students.filter(student => {

        const matchesName =
            student.name.toLowerCase().includes(searchText);

        const matchesCourse =
            selectedCourse === "all" ||
            student.course === selectedCourse;

        const matchesMarks =
            minimumMarks === "all" ||
            student.marks >= Number(minimumMarks);

        return matchesName && matchesCourse && matchesMarks;
    });
}


// Sort students
function sortStudents(studentList) {
    const sortedList = [...studentList];

    switch (sortSelect.value) {

        case "name-asc":
            sortedList.sort((a, b) =>
                a.name.localeCompare(b.name)
            );
            break;

        case "name-desc":
            sortedList.sort((a, b) =>
                b.name.localeCompare(a.name)
            );
            break;

        case "marks-desc":
            sortedList.sort((a, b) =>
                b.marks - a.marks
            );
            break;

        case "marks-asc":
            sortedList.sort((a, b) =>
                a.marks - b.marks
            );
            break;
    }

    return sortedList;
}


// Update statistics
function updateStats(studentList) {

    const count = studentList.length;

    totalStudents.textContent = count;
    resultCount.textContent =
        `${count} student${count !== 1 ? "s" : ""}`;

    if (count === 0) {
        averageMarks.textContent = "0";
        topper.textContent = "—";
        return;
    }

    // Calculate total marks using reduce()
    const totalMarks = studentList.reduce(
        (total, student) => total + student.marks,
        0
    );

    // Calculate average
    const average = totalMarks / count;

    averageMarks.textContent = average.toFixed(1);

    // Find topper using reduce()
    const topStudent = studentList.reduce(
        (top, student) =>
            student.marks > top.marks ? student : top
    );

    topper.textContent = topStudent.name;
}


// Update the complete interface
function updateUI() {

    // Step 1: Filter
    const filteredStudents = getFilteredStudents();

    // Step 2: Sort
    const sortedStudents = sortStudents(filteredStudents);

    // Step 3: Display students
    renderStudents(sortedStudents);

    // Step 4: Update statistics
    updateStats(sortedStudents);
}


// Event listeners
searchInput.addEventListener("input", updateUI);
courseFilter.addEventListener("change", updateUI);
marksFilter.addEventListener("change", updateUI);
sortSelect.addEventListener("change", updateUI);


// Initial display
updateUI();