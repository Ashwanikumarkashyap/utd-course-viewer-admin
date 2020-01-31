const ref = firebase.database().ref();

const programRef = ref.child('program_01');
let program;

programRef.once("value", snap => {
    program = snap.val();
    createCourseGrid(snap.val());

    programRef.child('courses').on('child_added', function(childSnap) {
        
        var childProgram = {
            "courses" : {}
        };

        program.courses[childSnap.key] = childSnap.val();

        childProgram.courses[childSnap.key] = childSnap.val();
        createCourseGrid(childProgram);
    });
});

programRef.child('courses').on('child_changed', function(childSnapshot) {
    document.getElementById("curr_seats:"+ childSnapshot.key).innerHTML = childSnapshot.val().currSeats;
    document.getElementById("total_seats:" + childSnapshot.key).innerHTML = "/" + childSnapshot.val().totalSeats;

});

programRef.child('courses').on('child_removed', function(childSnapshot) {
    $(document.getElementById(childSnapshot.key)).remove();
});

function searchCourse() {
    let input = document.getElementById("myInput").value.toUpperCase().trim();
    filterCourseGrid(input);
}

function createCourseGrid(program) {

    let courses = program.courses;
    var courseGrid = document.getElementById("course_grid");

    if (!courseGrid) {
        courseGrid = createElemUtil("container", "course_grid", "course_grid", "div");
    }

    for (let [key, value] of Object.entries(courses)) {
        var courseContainer = document.getElementById(key);

        if (!courseContainer) {
            courseContainer = createElemUtil(courseGrid.id, key, "filter_div", "div");

            var main_info = createElemUtil(courseContainer.id, "main_info:" + key, "main_info", "div");

            var course_info_block = createElemUtil(main_info.id, "course_info_block:" + key, "course_info_block", "div");
            
            var courseInfo = createElemUtil(course_info_block.id, "course_info:" + key, "course_info", "div");
            courseInfo.innerHTML = value.code;
            
            var editBtn = createElemUtil(course_info_block.id, "course_info_edit_btn:" + key, "fa", "i");
            editBtn.classList.add("fa-edit");
            editBtn.setAttribute("onClick", "switchToCourseEditCard(this.id)");

            var crossBtn = createElemUtil(course_info_block.id, "course_info_cross_btn:" + key, "fa", "i");
            crossBtn.classList.add("fa-times");
            crossBtn.classList.add("fa-course-back");
            crossBtn.setAttribute("onClick", "returnToCourseInfoCard(this.id)");

            var checkBtn = createElemUtil(course_info_block.id, "course_info_tick_btn:" + key, "fa", "i");
            checkBtn.classList.add("fa-check");
            checkBtn.setAttribute("onClick", "returnToCourseInfoCard(this.id)");

            var delBtn = createElemUtil(course_info_block.id, "course_info_del_btn:" + key, "fa", "i");
            delBtn.classList.add("fa-trash");
            delBtn.setAttribute("onClick", "removeCourse(this.id)");

            var seats_edit = createElemUtil(main_info.id, "seats_edit:" + key, "seats_edit", "div");
            
            var curr_seats_edit_input = createElemUtil(seats_edit.id, "curr_seats_edit_input:" + key, "curr_seats_edit_input", "input");
            curr_seats_edit_input.setAttribute("maxLength", "3");
            curr_seats_edit_input.setAttribute("type", "number");
            curr_seats_edit_input.setAttribute("oninput", "javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);");

            var seats_edit_sep = createElemUtil(seats_edit.id, "seats_edit_sep:" + key, "seats_edit_sep", "p");
            seats_edit_sep.innerHTML = "/";

            var total_seats_edit_input = createElemUtil(seats_edit.id, "total_seats_edit_input:" + key, "total_seats_edit_input", "input");
            total_seats_edit_input.setAttribute("maxLength", "3");
            total_seats_edit_input.setAttribute("type", "number");
            total_seats_edit_input.setAttribute("oninput", "javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);");

            var seats = createElemUtil(main_info.id, "seats:" + key, "seats", "div");
            var currSeats = createElemUtil(seats.id, "curr_seats:" + key, "curr_seats", "p");
            currSeats.innerHTML = value.currSeats;

            var total_seats = createElemUtil(seats.id, "total_seats:" + key, "total_seats", "p");
            total_seats.innerHTML = "/" + value.totalSeats;

            var courseBtn = createElemUtil(main_info.id, "course_btn:" + key, "course_btn", "div");

            var decBtn = createElemUtil(courseBtn.id, "dec_btn:" + key, "dec_btn", "button");
            decBtn.setAttribute("onClick", "updateCourseSeats(this.id)");
            var decBtnIcon = createElemUtil(decBtn.id, "dec_btn_icon:" + key, "fa", "i");
            decBtnIcon.classList.add("fa-angle-down");

            var incBtn = createElemUtil(courseBtn.id, "inc_btn:" + key, "inc_btn", "button");
            incBtn.setAttribute("onClick", "updateCourseSeats(this.id)");
            var incBtnIcon = createElemUtil(incBtn.id, "inc_btn_icon:" + key, "fa", "i");
            incBtnIcon.classList.add("fa-angle-up");
            
        } else {
            document.getElementById("curr_seats:"+ key).innerHTML = value.currSeats;
            document.getElementById("total_seats:" + key).innerHTML = "/" + value.totalSeats;
        }
    }
}

function removeCourse(id) {

    var idArr = id.split(":");
    var courseCode = idArr[idArr.length-1];    
    
    ref.child('program_01').child('courses/' + courseCode).remove().then(() => {
        // successfully deleted
    });
    
}

function updateCourseSeats(id) {
    var idArr = id.split(":");
    var courseCode = idArr[idArr.length-1];
    var approved = confirm("Are you sure you want to update the seats for the following course \n" + courseCode);

    if (approved) {
        var currSeatElem = document.getElementById("curr_seats:" + courseCode);
        var totalSeatELem = document.getElementById("total_seats:" + courseCode);

        var currSeatCount = parseInt(currSeatElem.innerHTML);

        var totalSeatCount = parseInt(totalSeatELem.innerHTML.substring(1, totalSeatELem.innerHTML.length));

        if (currSeatCount!=0 && idArr[0].indexOf("dec")>=0) {
            --currSeatCount;
        } else if (currSeatCount<totalSeatCount && idArr[0].indexOf("inc")>=0) {
            ++currSeatCount;
        } else {
            return;
        }

        var updates = {};
        updates['/program_01/courses/' + courseCode + "/currSeats"] = currSeatCount;
        ref.update(updates).then(()=> {
                // successfully updated
        });
    }
}

function filterCourseGrid(SearchKey) {
    
    let courses = program.courses;

    for (let [key, value] of Object.entries(courses)) {
        if (key.length != 0 && (value.code.toString()).indexOf(SearchKey) == -1) {
            document.getElementById(key).style.display = "none";
        } else {
            document.getElementById(key).style.display = "flex";
        }
    }
}

function switchToCourseEditCard (id){
    var idArr = id.split(":");
    var courseCode = idArr[idArr.length-1];

    var currSeatElem = document.getElementById("seats:" + courseCode);
    currSeatElem.style.display = "none";
    var totalSeatELem = document.getElementById("course_btn:" + courseCode);
    totalSeatELem.style.display = "none";

    var totalSeatELem = document.getElementById("seats_edit:" + courseCode);
    totalSeatELem.style.display = "flex";


    document.getElementById("course_info_edit_btn:" + courseCode).style.display = "none";

    document.getElementById("course_info_cross_btn:" + courseCode).style.display = "inline-flex";
    document.getElementById("course_info_tick_btn:" + courseCode).style.display = "inline-flex";
    document.getElementById("course_info_del_btn:" + courseCode).style.display = "inline-flex";

    var currSeatElem = document.getElementById("curr_seats:" + courseCode);
    var totalSeatELem = document.getElementById("total_seats:" + courseCode);

    var currSeatCount = parseInt(currSeatElem.innerHTML);
    console.log(totalSeatELem.innerHTML);
    var totalSeatCount = parseInt(totalSeatELem.innerHTML.substring(1, totalSeatELem.innerHTML.length));

    var currInputFeild = document.getElementById("curr_seats_edit_input:" + courseCode);
    var totalInputFeild = document.getElementById("total_seats_edit_input:" + courseCode);
    currInputFeild.value = currSeatCount;
    totalInputFeild.value = totalSeatCount;
}

function returnToCourseInfoCard(id) {
    var idArr = id.split(":");
    var courseCode = idArr[idArr.length-1];

    if (id.indexOf("tick")>1) {
        var currSeats = parseInt(document.getElementById("curr_seats_edit_input:" + courseCode).value);
        var totalSeats = parseInt(document.getElementById("total_seats_edit_input:" + courseCode).value);
        if (currSeats>totalSeats) {
            return;
        }

        var updates = {};
        updates['/program_01/courses/' + courseCode + "/currSeats"] = parseInt(currSeats);
        updates['/program_01/courses/' + courseCode + "/totalSeats"] = parseInt(totalSeats);
        
        ref.update(updates).then(()=> {
            var currSeatElem = document.getElementById("seats:" + courseCode);
            currSeatElem.style.display = "flex";
            var totalSeatELem = document.getElementById("course_btn:" + courseCode);
            totalSeatELem.style.display = "flex";

            var totalSeatELem = document.getElementById("seats_edit:" + courseCode);
            totalSeatELem.style.display = "none";

            document.getElementById("course_info_edit_btn:" + courseCode).style.display = "inline-flex";
            document.getElementById("course_info_cross_btn:" + courseCode).style.display = "none";
            document.getElementById("course_info_tick_btn:" + courseCode).style.display = "none";
            document.getElementById("course_info_del_btn:" + courseCode).style.display = "none";

        });
    } else {
        var currSeatElem = document.getElementById("seats:" + courseCode);
        currSeatElem.style.display = "flex";
        var totalSeatELem = document.getElementById("course_btn:" + courseCode);
        totalSeatELem.style.display = "flex";

        var totalSeatELem = document.getElementById("seats_edit:" + courseCode);
        totalSeatELem.style.display = "none";

        document.getElementById("course_info_edit_btn:" + courseCode).style.display = "inline-flex";
        document.getElementById("course_info_cross_btn:" + courseCode).style.display = "none";
        document.getElementById("course_info_tick_btn:" + courseCode).style.display = "none";
        document.getElementById("course_info_del_btn:" + courseCode).style.display = "none";
    }
}