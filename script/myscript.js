function searchCourse() {
    let input = document.getElementById("myInput").value.toUpperCase().trim();
    filterCourseGrid(input);
}

function createCourseGrid(courses) {

    var courseGrid = document.getElementById("course_grid");

    if (!courseGrid) {
        courseGrid = createElemUtil("container", "course_grid", "course_grid", "div");
    }

    for (let i = 0; i < courses.length; i++) {
        var courseContainer = document.getElementById(courses[i].id);

        if (!courseContainer) {
            courseContainer = createElemUtil(courseGrid.id, courses[i].id, "filter_div", "div", false, i);

            var main_info = createElemUtil(courseContainer.id, "main_info:" + courses[i].id, "main_info", "div");

            var course_info_block = createElemUtil(main_info.id, "course_info_block:" + courses[i].id, "course_info_block", "div");
            
            var courseInfo = createElemUtil(course_info_block.id, "course_info:" + courses[i].id, "course_info", "div");
            courseInfo.innerHTML = courses[i].code;
            
            var editBtn = createElemUtil(course_info_block.id, "course_info_edit_btn:" + courses[i].id, "fa", "i");
            editBtn.classList.add("fa-edit");
            editBtn.setAttribute("onClick", "switchToCourseEditCard(this.id)");

            var crossBtn = createElemUtil(course_info_block.id, "course_info_cross_btn:" + courses[i].id, "fa", "i");
            crossBtn.classList.add("fa-times");
            crossBtn.classList.add("fa-course-back");
            crossBtn.setAttribute("onClick", "switchToCourseInfoCard(this.id)");

            var checkBtn = createElemUtil(course_info_block.id, "course_info_tick_btn:" + courses[i].id, "fa", "i");
            checkBtn.classList.add("fa-check");
            checkBtn.setAttribute("onClick", "switchToCourseInfoCard(this.id)");

            var delBtn = createElemUtil(course_info_block.id, "course_info_del_btn:" + courses[i].id, "fa", "i");
            delBtn.classList.add("fa-trash");
            delBtn.setAttribute("onClick", "removeCourse(this.id)");

            var seats_edit = createElemUtil(main_info.id, "seats_edit:" + courses[i].id, "seats_edit", "div");
            
            var curr_seats_edit_input = createElemUtil(seats_edit.id, "curr_seats_edit_input:" + courses[i].id, "curr_seats_edit_input", "input");
            curr_seats_edit_input.setAttribute("maxLength", "3");
            curr_seats_edit_input.setAttribute("type", "number");
            curr_seats_edit_input.setAttribute("oninput", "javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);");

            var seats_edit_sep = createElemUtil(seats_edit.id, "seats_edit_sep:" + courses[i].id, "seats_edit_sep", "p");
            seats_edit_sep.innerHTML = "/";

            var total_seats_edit_input = createElemUtil(seats_edit.id, "total_seats_edit_input:" + courses[i].id, "total_seats_edit_input", "input");
            total_seats_edit_input.setAttribute("maxLength", "3");
            total_seats_edit_input.setAttribute("type", "number");
            total_seats_edit_input.setAttribute("oninput", "javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);");

            var seats = createElemUtil(main_info.id, "seats:" + courses[i].id, "seats", "div");
            var currSeats = createElemUtil(seats.id, "curr_seats:" + courses[i].id, "curr_seats", "p");
            currSeats.innerHTML = courses[i].currSeats;

            var total_seats = createElemUtil(seats.id, "total_seats:" + courses[i].id, "total_seats", "p");
            total_seats.innerHTML = "/" + courses[i].totalSeats;

            var courseBtn = createElemUtil(main_info.id, "course_btn:" + courses[i].id, "course_btn", "div");

            var decBtn = createElemUtil(courseBtn.id, "dec_btn:" + courses[i].id, "dec_btn", "button");
            decBtn.setAttribute("onClick", "updateCourseSeatsHandler(this.id)");
            var decBtnIcon = createElemUtil(decBtn.id, "dec_btn_icon:" + courses[i].id, "fa", "i");
            decBtnIcon.classList.add("fa-angle-down");

            var incBtn = createElemUtil(courseBtn.id, "inc_btn:" + courses[i].id, "inc_btn", "button");
            incBtn.setAttribute("onClick", "updateCourseSeatsHandler(this.id)");
            var incBtnIcon = createElemUtil(incBtn.id, "inc_btn_icon:" + courses[i].id, "fa", "i");
            incBtnIcon.classList.add("fa-angle-up");
            
        } else {
            document.getElementById("curr_seats:"+ courses[i].id).innerHTML = courses[i].currSeats;
            document.getElementById("total_seats:" + courses[i].id).innerHTML = "/" + courses[i].totalSeats;
        }
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

function removeCourse(id) {

    var idArr = id.split(":");
    var courseCode = idArr[idArr.length-1];

    var approved = confirm("Are you sure you want to delete the course \n" + program.courses[courseCode].code);
    
    if (approved) {

        deleteCourse(courseCode, (courseCode) => {
         
            // update the database
             delete program.courses[courseCode];
             var index = findCoursesInArr(sortedCourses, 'id', courseCode, false);
             if (index>=0) {
                 sortedCourses.splice(index,1);
             }
             // update the UI
             $("#"+courseCode).remove();
        });
    }

}

function updateCourseSeatsHandler(id) {
    var idArr = id.split(":");
    var courseCode = idArr[idArr.length-1];

    var currSeatCount = program.courses[courseCode].currSeats;
    var totalSeatCount = program.courses[courseCode].totalSeats;

    if ((currSeatCount==totalSeatCount && idArr[0].indexOf("inc")>=0) || (idArr[0].indexOf("dec")>=0 && currSeatCount == 0) ) {
        return;
    }
    
    var approved = confirm("Are you sure you want to update the seats for the following course \n" + program.courses[courseCode].code);
    if (approved) {
        if (currSeatCount!=0 && idArr[0].indexOf("dec")>=0) {
            updateSeats(courseCode, -1, 0, updateLocalSeats_UI_callback, true);
            updateRegCount(1, updateLocalRegCount_callback);
        } else if (currSeatCount<totalSeatCount && idArr[0].indexOf("inc")>=0) {
            updateSeats(courseCode, 1, 0, updateLocalSeats_UI_callback, true);
            updateRegCount(-1, updateLocalRegCount_callback);
        } 

        function updateLocalSeats_UI_callback(courseCode, course) {
            var index = findCoursesInArr(sortedCourses, 'id', courseCode, false);
            if (index>=0) {
                sortedCourses[index].currSeats = course.currSeats;
                sortedCourses[index].totalSeats = course.totalSeats;
            }
            program.courses[courseCode].currSeats = course.currSeats;
            program.courses[courseCode].totalSeats = course.totalSeats;

            // update the UI
            document.getElementById("curr_seats:"+ courseCode).innerHTML = course.currSeats;
            document.getElementById("total_seats:" + courseCode).innerHTML = "/" + course.totalSeats;

        }

        function updateLocalRegCount_callback(regCount) {
            program.registrationCount = regCount;
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

    var totalSeatCount = parseInt(totalSeatELem.innerHTML.substring(1, totalSeatELem.innerHTML.length));

    var currInputFeild = document.getElementById("curr_seats_edit_input:" + courseCode);
    var totalInputFeild = document.getElementById("total_seats_edit_input:" + courseCode);
    currInputFeild.value = currSeatCount;
    totalInputFeild.value = totalSeatCount;
}

function switchToCourseInfoCard(id) {
    var idArr = id.split(":");
    var courseCode = idArr[idArr.length-1];

    var currSeats = parseInt(document.getElementById("curr_seats_edit_input:" + courseCode).value);
    var totalSeats = parseInt(document.getElementById("total_seats_edit_input:" + courseCode).value);

    var prevCurrCount = program.courses[courseCode].currSeats;
    var prevTotalCount = program.courses[courseCode].totalSeats;

    if (id.indexOf("tick") >1 && (prevCurrCount != currSeats || prevTotalCount != totalSeats)) {
        
        if (currSeats>totalSeats) {
            alert("Current available seat cannot be greater than total available seats.");
            return;
        }

        var approved = confirm("Are you sure you want to update the seats for the course \n" + program.courses[courseCode].code);

        if (approved) {
            if (prevCurrCount <= currSeats) {
                if (prevTotalCount <= totalSeats) {
                    updateSeats(courseCode, currSeats-prevCurrCount, totalSeats-prevTotalCount, updateLocalSeats_UI_callback, false)
                } else if (prevTotalCount > totalSeats) {
                    updateSeats(courseCode, currSeats-prevCurrCount, -(prevTotalCount-totalSeats), updateLocalSeats_UI_callback,false)
                }
                updateRegCount(-(currSeats-prevCurrCount), (regCount) => {
                    program.registrationCount = regCount;
                });
            } else if (prevCurrCount > currSeats) {
                if (prevTotalCount <= totalSeats) {
                    updateSeats(courseCode, -(prevCurrCount-currSeats), totalSeats-prevTotalCount, updateLocalSeats_UI_callback, false)
                } else if (prevTotalCount > totalSeats) {
                    updateSeats(courseCode, -(prevCurrCount-currSeats), -(prevTotalCount-totalSeats), updateLocalSeats_UI_callback, false)
                }
                updateRegCount(prevCurrCount-currSeats, (regCount) => {
                    program.registrationCount = regCount;
                });
            }

            function updateLocalSeats_UI_callback(courseCode, course) {
                var index = findCoursesInArr(sortedCourses, 'id', courseCode, false);
                if (index>=0) {
                    sortedCourses[index].currSeats = course.currSeats;
                    sortedCourses[index].totalSeats = course.totalSeats;
                }
                program.courses[courseCode].currSeats = course.currSeats;
                program.courses[courseCode].totalSeats = course.totalSeats;
    
                // update the UI
                document.getElementById("curr_seats:"+ courseCode).innerHTML = course.currSeats;
                document.getElementById("total_seats:" + courseCode).innerHTML = "/" + course.totalSeats;
                showCourseInfoCard(courseCode);
    
            }
        }
    } else {
        showCourseInfoCard(courseCode);
    }
}

function showCourseInfoCard(courseCode) {
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