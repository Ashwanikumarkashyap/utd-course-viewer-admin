let program = {
    "id": 1,
    "courses": [{
            "code": "CS6363.001",
            "name": "Database Design",
            "prof": "Nurjan",
            "days": ["Monday", "Wednesday"],
            "StartTime": ["16", "16"],
            "StartTime": ["18", "18"],
            "totalSeats": 40,
            "currSeats": 30
        },
        {
            "code": "CS1234.002",
            "name": "Machine Learning",
            "prof": "Anurag Nagar",
            "days": ["Monday", "Wednesday"],
            "StartTime": ["16", "16"],
            "StartTime": ["18", "18"],
            "totalSeats": 40,
            "currSeats": 30

        },
        {
            "code": "CS5678.003",
            "name": "Data Structures",
            "prof": "Greg Ozbirn",
            "days": ["Monday", "Wednesday"],
            "StartTime": ["16", "16"],
            "StartTime": ["18", "18"],
            "totalSeats": 40,
            "currSeats": 30
        }, {
            "code": "CS6163.001",
            "name": "Database Design",
            "prof": "Nurjan",
            "days": ["Monday", "Wednesday"],
            "StartTime": ["16", "16"],
            "StartTime": ["18", "18"],
            "totalSeats": 40,
            "currSeats": 30
        },
        {
            "code": "CS1267.001",
            "name": "Database Design",
            "prof": "Nurjan",
            "days": ["Monday", "Wednesday"],
            "StartTime": ["16", "16"],
            "StartTime": ["18", "18"],
            "totalSeats": 40,
            "currSeats": 30
        },
        {
            "code": "CS1233.001",
            "name": "Database Design",
            "prof": "Nurjan",
            "days": ["Monday", "Wednesday"],
            "StartTime": ["16", "16"],
            "StartTime": ["18", "18"],
            "totalSeats": 40,
            "currSeats": 30
        },
        {
            "code": "CS6313.001",
            "name": "Database Design",
            "prof": "Nurjan",
            "days": ["Monday", "Wednesday"],
            "StartTime": ["16", "16"],
            "StartTime": ["18", "18"],
            "totalSeats": 40,
            "currSeats": 30
        },
        {
            "code": "CS6453.001",
            "name": "Database Design",
            "prof": "Nurjan",
            "days": ["Monday", "Wednesday"],
            "StartTime": ["16", "16"],
            "StartTime": ["18", "18"],
            "totalSeats": 40,
            "currSeats": 30
        },
        {
            "code": "CS6789.001",
            "name": "Database Design",
            "prof": "Nurjan",
            "days": ["Monday", "Wednesday"],
            "StartTime": ["16", "16"],
            "StartTime": ["18", "18"],
            "totalSeats": 40,
            "currSeats": 30
        },
        {
            "code": "CS0773.001",
            "name": "Database Design",
            "prof": "Nurjan",
            "days": ["Monday", "Wednesday"],
            "StartTime": ["16", "16"],
            "StartTime": ["18", "18"],
            "totalSeats": 40,
            "currSeats": 30
        },
        {
            "code": "CS1111.001",
            "name": "Database Design",
            "prof": "Nurjan",
            "days": ["Monday", "Wednesday"],
            "StartTime": ["16", "16"],
            "StartTime": ["18", "18"],
            "totalSeats": 40,
            "currSeats": 30
        },
        {
            "code": "CS1234.001",
            "name": "Database Design",
            "prof": "Nurjan",
            "days": ["Monday", "Wednesday"],
            "StartTime": ["16", "16"],
            "StartTime": ["18", "18"],
            "totalSeats": 40,
            "currSeats": 30
        },
        {
            "code": "CS5678.001",
            "name": "Database Design",
            "prof": "Nurjan",
            "days": ["Monday", "Wednesday"],
            "StartTime": ["16", "16"],
            "StartTime": ["18", "18"],
            "totalSeats": 40,
            "currSeats": 30
        },
        {
            "code": "CS6779.001",
            "name": "Database Design",
            "prof": "Nurjan",
            "days": ["Monday", "Wednesday"],
            "StartTime": ["16", "16"],
            "StartTime": ["18", "18"],
            "totalSeats": 40,
            "currSeats": 30
        },
    ],
    "year": 2020,
    "term": "Spring"
};

function myFunction() {
    let input = document.getElementById("myInput").value.toUpperCase().trim();
    filterGrid(input);
}

function displayCourses(program) {

    let courses = program.courses;
    let container = $("#container");

    for (let i = 0; i < courses.length; i++) {

        var courseContainer = createDiv("container", courses[i].code, "filter_div", "div");

        var main_info = createDiv(courseContainer.id, "main_info_" + courses[i].code, "main_info", "div");

        var course_info_block = createDiv(main_info.id, "course_info_block_" + courses[i].code, "course_info_block", "div");
        
        var courseInfo = createDiv(course_info_block.id, "course_info_" + courses[i].code, "course_info", "div");
        courseInfo.innerHTML = courses[i].code;
        
        var editBtn = createDiv(course_info_block.id, "course_info_edit_btn_" + courses[i].code, "fa", "i");
        editBtn.classList.add("fa-edit");
        editBtn.setAttribute("onClick", "editCourseSeats(this.id)");

        var crossBtn = createDiv(course_info_block.id, "course_info_cross_btn_" + courses[i].code, "fa", "i");
        crossBtn.classList.add("fa-times");
        crossBtn.setAttribute("onClick", "returnToCourseInfo(this.id)");

        var checkBtn = createDiv(course_info_block.id, "course_info_tick_btn_" + courses[i].code, "fa", "i");
        checkBtn.classList.add("fa-check");
        checkBtn.setAttribute("onClick", "returnToCourseInfo(this.id)");



        var seats_edit = createDiv(main_info.id, "seats_edit_" + courses[i].code, "seats_edit", "div");
        
        var curr_seats_edit_input = createDiv(seats_edit.id, "curr_seats_edit_input_" + courses[i].code, "curr_seats_edit_input", "input");
        curr_seats_edit_input.setAttribute("maxLength", "3");
        curr_seats_edit_input.setAttribute("type", "number");
        curr_seats_edit_input.setAttribute("oninput", "javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);");

        var seats_edit_sep = createDiv(seats_edit.id, "seats_edit_sep_" + courses[i].code, "seats_edit_sep", "p");
        seats_edit_sep.innerHTML = "/";

        var total_seats_edit_input = createDiv(seats_edit.id, "total_seats_edit_input_" + courses[i].code, "total_seats_edit_input", "input");
        total_seats_edit_input.setAttribute("maxLength", "3");
        total_seats_edit_input.setAttribute("type", "number");
        total_seats_edit_input.setAttribute("oninput", "javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);");

        var seats = createDiv(main_info.id, "seats_" + courses[i].code, "seats", "div");
        var currSeats = createDiv(seats.id, "curr_seats_" + courses[i].code, "curr_seats", "p");
        currSeats.innerHTML = courses[i].currSeats;

        var total_seats = createDiv(seats.id, "total_seats_" + courses[i].code, "total_seats", "p");
        total_seats.innerHTML = "/" + courses[i].totalSeats;

        var courseBtn = createDiv(main_info.id, "course_btn_" + courses[i].code, "course_btn", "div");

        var decBtn = createDiv(courseBtn.id, "dec_btn_" + courses[i].code, "dec_btn", "button");
        var decBtnIcon = createDiv(decBtn.id, "dec_btn_icon_" + courses[i].code, "fa", "i");
        decBtnIcon.classList.add("fa-angle-down");


        var incBtn = createDiv(courseBtn.id, "inc_btn_" + courses[i].code, "inc_btn", "button");
        var incBtnIcon = createDiv(incBtn.id, "inc_btn_icon_" + courses[i].code, "fa", "i");
        incBtnIcon.classList.add("fa-angle-up");
    }

    $("button").on('click', function() {
        var idArr = this.id.split("_");
        var courseCode = idArr[idArr.length-1];

        var approved = confirm("Are you sure you want to update the seats for the following course \n" + courseCode);
        
        if (approved) {
            var currSeatElem = document.getElementById("curr_seats_" + courseCode);
            var totalSeatELem = document.getElementById("total_seats_" + courseCode);

            var currSeatCount = parseInt(currSeatElem.innerHTML);

            var totalSeatCount = parseInt(totalSeatELem.innerHTML.substring(1, totalSeatELem.innerHTML.length));
            if (currSeatCount!=0 && idArr[0]== "dec") {
                currSeatElem.innerHTML = --currSeatCount;
            } else if (currSeatCount<totalSeatCount && idArr[0]== "inc") {
                currSeatElem.innerHTML = ++currSeatCount;
            }
            
            document.getElementById("curr_seats_" + courseCode).innerHTML
        }
    });
}

function filterGrid(key) {
    let elements = document.getElementsByClassName("filter_div");
    for (let i = 0; i < elements.length; i++) {
        var id = elements[i].id;
        if (key.length != 0 && (elements[i].id.toString()).indexOf(key) == -1) {
            elements[i].style.display = "none";
            // $(elements[i]).fadeOut(); 
        } else {
            // $(elements[i]).fadeIn();
            elements[i].style.display = "flex";
        }
    }
}

function createDiv(parent, id_, class_, type) {
    let parent_elem = document.getElementById(parent);
    let elem;

    switch (type) {
        case "div":
            elem = document.createElement("div");
            break;
        case "p":
            elem = document.createElement("p");
            break;
        case "button":
            elem = document.createElement("button");
            break;
        case "i":
            elem = document.createElement("i");
            break;
        case "input":
            elem = document.createElement("input");
            break;
        default:
            elem = document.createElement("div");
    }

    if (parent_elem != undefined) {
        parent_elem.append(elem);
    }

    elem.setAttribute("id", id_);
    elem.classList.add(class_);
    return elem;
}

function editCourseSeats (id){
    var idArr = id.split("_");
    var courseCode = idArr[idArr.length-1];

    var currSeatElem = document.getElementById("seats_" + courseCode);
    currSeatElem.style.display = "none";
    var totalSeatELem = document.getElementById("course_btn_" + courseCode);
    totalSeatELem.style.display = "none";

    var totalSeatELem = document.getElementById("seats_edit_" + courseCode);
    totalSeatELem.style.display = "flex";


    document.getElementById("course_info_edit_btn_" + courseCode).style.display = "none";

    document.getElementById("course_info_cross_btn_" + courseCode).style.display = "inline-flex";
    document.getElementById("course_info_tick_btn_" + courseCode).style.display = "inline-flex";

    var currSeatElem = document.getElementById("curr_seats_" + courseCode);
    var totalSeatELem = document.getElementById("total_seats_" + courseCode);

    var currSeatCount = parseInt(currSeatElem.innerHTML);
    console.log(totalSeatELem.innerHTML);
    var totalSeatCount = parseInt(totalSeatELem.innerHTML.substring(1, totalSeatELem.innerHTML.length));

    var currInputFeild = document.getElementById("curr_seats_edit_input_" + courseCode);
    var totalInputFeild = document.getElementById("total_seats_edit_input_" + courseCode);
    currInputFeild.value = currSeatCount;
    totalInputFeild.value = totalSeatCount;
}

function returnToCourseInfo(id) {
    var idArr = id.split("_");
    var courseCode = idArr[idArr.length-1];

    if (id.indexOf("tick")>1) {
        var currSeats = parseInt(document.getElementById("curr_seats_edit_input_" + courseCode).value);
        var totalSeats = parseInt(document.getElementById("total_seats_edit_input_" + courseCode).value);
        if (currSeats>totalSeats) {
            return;
        }
    }

    var currSeatElem = document.getElementById("seats_" + courseCode);
    currSeatElem.style.display = "flex";
    var totalSeatELem = document.getElementById("course_btn_" + courseCode);
    totalSeatELem.style.display = "flex";

    var totalSeatELem = document.getElementById("seats_edit_" + courseCode);
    totalSeatELem.style.display = "none";


    document.getElementById("course_info_edit_btn_" + courseCode).style.display = "inline-flex";

    document.getElementById("course_info_cross_btn_" + courseCode).style.display = "none";
    document.getElementById("course_info_tick_btn_" + courseCode).style.display = "none";

    if (id.indexOf("tick")>1) {
        var currSeats = document.getElementById("curr_seats_edit_input_" + courseCode).value;
        var totalSeats = document.getElementById("total_seats_edit_input_" + courseCode).value;
        var currSeatElem = document.getElementById("curr_seats_" + courseCode).innerHTML = currSeats;
        var totalSeatELem = document.getElementById("total_seats_" + courseCode).innerHTML = "/"+totalSeats;
    }
}

displayCourses(program);