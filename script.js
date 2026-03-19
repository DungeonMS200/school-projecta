let grades = JSON.parse(localStorage.getItem("grades")) || [];

function render() {
    let list = document.getElementById("list");
    let avgText = document.getElementById("average");

    list.innerHTML = "";

    let sum = 0;

    grades.forEach((item, index) => {
        let li = document.createElement("li");
        li.textContent = item.name + " получил(а): " + item.grade;

        sum += Number(item.grade);

        let btn = document.createElement("button");
        btn.textContent = "❌";
        btn.onclick = () => removeGrade(index);

        li.appendChild(btn);
        list.appendChild(li);
    });

    let avg = grades.length ? (sum / grades.length).toFixed(2) : 0;
    avgText.textContent = "Средний балл: " + avg;
}

function addGrade() {
    let name = document.getElementById("name").value;
    let grade = document.getElementById("grade").value;

    if (name === "" || grade === "") {
        alert("Заполни все поля!");
        return;
    }

    grades.push({ name, grade });
    localStorage.setItem("grades", JSON.stringify(grades));

    render();
}

function removeGrade(index) {
    grades.splice(index, 1);
    localStorage.setItem("grades", JSON.stringify(grades));
    render();
}

function clearAll() {
    if (confirm("Удалить все оценки?")) {
        grades = [];
        localStorage.removeItem("grades");
        render();
    }
}

render();