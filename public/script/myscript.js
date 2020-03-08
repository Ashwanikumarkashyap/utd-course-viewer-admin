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
            courseInfo.title = courses[i].code;

            //create buttons
            var editBtn = createElemUtil(course_info_block.id, "course_info_edit_btn:" + courses[i].id, "fa", "i");
            editBtn.classList.add("fa-edit");
            editBtn.setAttribute("onClick", "switchToCourseEditCard(this.id)");

            var moreInfoBtn = createElemUtil(course_info_block.id, "course_info_moreInfo_btn:" + courses[i].id, "fa", "i");
            moreInfoBtn.classList.add("fa-info");
            moreInfoBtn.setAttribute("onClick", "switchToCourseMoreInfoCard(this.id)");

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

            // create seat edit view
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

            if (courses[i].currSeats == 0) {
                document.getElementById(courseContainer.id).style.background = "#6e3e3e";
            } else {
                document.getElementById(courseContainer.id).style.background = "#4a4f4c";
            }

            var total_seats = createElemUtil(seats.id, "total_seats:" + courses[i].id, "total_seats", "p");
            total_seats.innerHTML = "/" + courses[i].totalSeats;

            // create seat edit view button
            var courseBtn = createElemUtil(main_info.id, "course_btn:" + courses[i].id, "course_btn", "div");

            var decBtn = createElemUtil(courseBtn.id, "dec_btn:" + courses[i].id, "dec_btn", "button");
            decBtn.setAttribute("onClick", "updateCourseSeatsHandler(this.id)");
            var decBtnIcon = createElemUtil(decBtn.id, "dec_btn_icon:" + courses[i].id, "fa", "i");
            decBtnIcon.classList.add("fa-angle-down");

            var incBtn = createElemUtil(courseBtn.id, "inc_btn:" + courses[i].id, "inc_btn", "button");
            incBtn.setAttribute("onClick", "updateCourseSeatsHandler(this.id)");
            var incBtnIcon = createElemUtil(incBtn.id, "inc_btn_icon:" + courses[i].id, "fa", "i");
            incBtnIcon.classList.add("fa-angle-up");


            // create more info view
            var more_info = createElemUtil(courseContainer.id, "more_info:" + courses[i].id, "more_info", "div");
            
            var cname = createElemUtil(more_info.id, "cname:" + courses[i].id, "cname", "div");
            if (courses[i].name=="NA") {
                cname.innerHTML = "Course name: NA";
            } else {
                cname.innerHTML = courses[i].name;
                cname.title = courses[i].name;
            }
        
            var iname = createElemUtil(more_info.id, "iname:" + courses[i].id, "iname", "div");
            if (courses[i].iname=="NA") {
                iname.innerHTML = "Instructer: NA";
            } else {
                iname.innerHTML = courses[i].iname;
                iname.title = courses[i].iname;
            }

            var time_loc = createElemUtil(more_info.id, "time_loc:" + courses[i].id, "time_loc", "div");
            var daysLocString = "";
            var isAdded = false;
            if (courses[i].days) {
                for (let [key] of Object.entries(courses[i].days)) {
                    isAdded = true;
                    daysLocString += key.toUpperCase() + "";
                }
            }
            if (isAdded) {
                daysLocString += " " + courses[i].days[Object.keys(courses[i].days)[0]] + " | "
            }
            if (courses[i].location == "NA") {
                daysLocString += "Location: NA"    
            } else {
                daysLocString += courses[i].location;
            }
            time_loc.innerHTML = daysLocString;
            time_loc.title = daysLocString;

            // create more info view button
            var crossBtn = createElemUtil(more_info.id, "course_info_cross_btn:" + courses[i].id, "fa", "i");
            crossBtn.classList.add("fa-times");
            crossBtn.classList.add("removeFFBtn");
            crossBtn.setAttribute("onClick", "showCourseInfoCard(this.id)");

        } else {
            document.getElementById("curr_seats:"+ courses[i].id).innerHTML = courses[i].currSeats;
            document.getElementById("total_seats:" + courses[i].id).innerHTML = "/" + courses[i].totalSeats;

            if (courses[i].currSeats == 0) {
                document.getElementById(courseContainer.id).style.background = "#6e3e3e";
            } else {
                document.getElementById(courseContainer.id).style.background = "#4a4f4c";
            }
            
            var currInputFeild = document.getElementById("curr_seats_edit_input:" + courses[i].id);
            var totalInputFeild = document.getElementById("total_seats_edit_input:" + courses[i].id);
            currInputFeild.value = courses[i].currSeats;
            totalInputFeild.value = courses[i].totalSeats;
        }
    }
}

function searchCourse() {
    let searchKey = document.getElementById("searchField").value.toUpperCase().trim();
    filterCourseGrid(searchKey);
}

function filterCourseGrid(searchKeys) {
    let queryType = null;
    let searchKeysArr = []

    if (searchKeys.includes("&&") && searchKeys.includes("||")) {
        return;
    } else if (searchKeys.includes("&&")) {
        searchKeysArr = searchKeys.split("&&");
        queryType = "&&";
    } else if (searchKeys.includes("||")) {
        searchKeysArr = searchKeys.split("||");
        queryType = "||";
    } else {
        if (searchKeys.trim().length==0) {
            $(".filter_div").css("display", "flex");
            return;
        }
        searchKeysArr.push(searchKeys);
    }

    filteredCourses = [];
    let index = 0;
    searchKeysArr.forEach((key)=> {
        key = key.trim();
        if (key.length>0) {
            filteredCourses = filterCourseUtil(key, filteredCourses, queryType, index)
            index++;
        }
    })

    let courses = program.courses;
    for (let [key] of Object.entries(courses)) {
        if (filteredCourses.includes(key)) {
            document.getElementById(key).style.display = "flex";
        } else {
            document.getElementById(key).style.display = "none";
        }
    }
}

function filterCourseUtil(searchKeys, filteredCourses, queryType, index) {
    let courses = program.courses;

    for (let [key, value] of Object.entries(courses)) {
        if (filterMatch(searchKeys, value)) {
            if ((queryType == "&&" && index==0) || (queryType!="&&" && !filteredCourses.includes(key))) {
                filteredCourses.push(key);
            }
        } else {
            if (index!=0 && queryType == "&&" && filteredCourses.includes(key)) {
                filteredCourses.splice(filteredCourses.indexOf(key), 1);
            }
        }
    }

    return filteredCourses;
}

function filterMatch(searchKey, courseValue) {

    if (((courseValue.code.toString().toUpperCase()).indexOf(searchKey) >= 0) ||
        ((courseValue.location.toString().toUpperCase()).indexOf(searchKey) >= 0) ||
        ((courseValue.name.toString().toUpperCase()).indexOf(searchKey) >=0) ||
        ((courseValue.iname.toString().toUpperCase()).indexOf(searchKey) >= 0) ||
        (searchKey == "OPEN" && courseValue.currSeats!=0) ||
        (searchKey == "CLOSED" && courseValue.currSeats==0)
        ) {
        return true;
    }
    return false;
}

function removeCourse(id) {

    var idArr = id.split(":");
    var courseCode = idArr[idArr.length-1];

    var approved = confirm("Are you sure you want to delete the course \n" + program.courses[courseCode].code);
    
    if (approved) {
        deleteCourse(courseCode, (courseCode_) => {
            // update ref count
            updateRegCount(-(program.courses[courseCode_].totalSeats-program.courses[courseCode_].currSeats), false);
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
            updateSeats(courseCode, -1, 0, updateRegCountCallback, true);
        } else if (currSeatCount<totalSeatCount && idArr[0].indexOf("inc")>=0) {
            updateSeats(courseCode, 1, 0, updateRegCountCallback, true);
        } 

        function updateRegCountCallback(increment) {
            updateRegCount(-1*increment, true);
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
    document.getElementById("course_info_moreInfo_btn:" + courseCode).style.display = "none";

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
                    updateSeats(courseCode, currSeats-prevCurrCount, totalSeats-prevTotalCount, updateRegCountCallback, false)
                } else if (prevTotalCount > totalSeats) {
                    updateSeats(courseCode, currSeats-prevCurrCount, -(prevTotalCount-totalSeats), updateRegCountCallback,false)
                }
            } else if (prevCurrCount > currSeats) {
                if (prevTotalCount <= totalSeats) {
                    updateSeats(courseCode, -(prevCurrCount-currSeats), totalSeats-prevTotalCount, updateRegCountCallback, false)
                } else if (prevTotalCount > totalSeats) {
                    updateSeats(courseCode, -(prevCurrCount-currSeats), -(prevTotalCount-totalSeats), updateRegCountCallback, false)
                }
            }

            function updateRegCountCallback(increment) {
                updateRegCount(-1*increment, false, function () {
                    showCourseInfoCard(id);
                });
            }
        }
    } else {
        showCourseInfoCard(id);
    }
}

function showCourseInfoCard(id) {

    var idArr = id.split(":");
    var courseCode = idArr[idArr.length-1];

    document.getElementById("seats:" + courseCode).style.display = "flex";
    document.getElementById("course_btn:" + courseCode).style.display = "flex";
    document.getElementById("seats_edit:" + courseCode).style.display = "none";

    document.getElementById("main_info:" + courseCode).style.display = "flex";
    document.getElementById("course_info_edit_btn:" + courseCode).style.display = "inline-flex";
    document.getElementById("course_info_moreInfo_btn:" + courseCode).style.display = "inline-flex";
    document.getElementById("more_info:" + courseCode).style.display = "none";
    document.getElementById("course_info_cross_btn:" + courseCode).style.display = "none";
    document.getElementById("course_info_tick_btn:" + courseCode).style.display = "none";
    document.getElementById("course_info_del_btn:" + courseCode).style.display = "none";
}

function switchToCourseMoreInfoCard(id) {
    var idArr = id.split(":");
    var courseCode = idArr[idArr.length-1];

    document.getElementById("main_info:" + courseCode).style.display = "none";
    document.getElementById("more_info:" + courseCode).style.display = "flex";
}

function toggelAboutBlock() {
    var aboutBlock = document.getElementById("about_block");
    if($(aboutBlock).css('display') == 'none') {
        aboutBlock.style.display = "flex";
        $("#black_overlay").css('display', 'block');
    } else {
        $("#black_overlay").css('display', 'none');
        aboutBlock.style.display = "none";
    }
}