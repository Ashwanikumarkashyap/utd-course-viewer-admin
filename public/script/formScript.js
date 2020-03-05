var formIndex = 0;

function addCoursesForm() {

    console.log("Adding course form")

    formWrapper = document.getElementById("form_wrapper");
    
    if (formWrapper == undefined) {
        formIndex = 0;
        coursesForm = createElemUtil("container", "courses_form", "courses_form", "form", true);
        formWrapper = createElemUtil(coursesForm.id, "form_wrapper", "form_wrapper", "div");
        coursesForm.setAttribute("action", "#");
        coursesForm.setAttribute("onsubmit", "submitCourseForm();return false");
    }

    addCourseField(formWrapper);

    courseSubmitBtn = document.getElementById("course_submit_btn");
    
    if (courseSubmitBtn == undefined) {
        var formSubmitBtn = createElemUtil(coursesForm.id, "course_submit_btn", "course_submit", "input");
        formSubmitBtn.type="submit";
    }
}

function addCourseField(formWrapper) {
    courseInput = createElemUtil(formWrapper.id, "course_input:" + formIndex, "course_input", "div");
    var crossBtn = createElemUtil(courseInput.id, "course_info_cross_btn:" + formIndex, "fa", "i");
    crossBtn.classList.add("fa-times");
    crossBtn.classList.add("removeFFBtn");
    crossBtn.setAttribute("onClick", "removeFormField(this.id)");
    ccFormInputBlock = createElemUtil(courseInput.id, "ccode_input_block:" + formIndex, "form_input_block", "div");
    ccodeLabel = createElemUtil(ccFormInputBlock.id, "ccode_label:" + formIndex, "form_input_label", "label");
    ccodeLabel.innerHTML = "Course Code";
    ccodeInput = createElemUtil(ccFormInputBlock.id, "ccode_input:" + formIndex, "form_input", "input");
    ccodeInput.type = "text";
    ccodeInput.setAttribute("maxLength", "20");
    ccodeInput.required = true;
    ccodeInput.placeholder = "Course code";

    tseatsFormInputBlock = createElemUtil(courseInput.id, "tseats_input_block:"+ formIndex, "form_input_block", "div");
    tseatsLabel = createElemUtil(tseatsFormInputBlock.id, "tseats_label:" + formIndex, "form_input_label", "label");
    tseatsLabel.innerHTML = "Total Seats";
    tseatsInput = createElemUtil(tseatsFormInputBlock.id, "tseats_input:" + formIndex, "form_input", "input");
    tseatsInput.classList.add("form_input_number");
    tseatsInput.setAttribute("maxLength", "3");
    tseatsInput.setAttribute("type", "number");
    tseatsInput.setAttribute("oninput", "javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);");
    tseatsInput.required = true;
    tseatsInput.placeholder = "Total seats";

    colBtn = createElemUtil(courseInput.id, "col_btn:" + formIndex, "collapsible", "button");
    colBtn.setAttribute("onClick", "toggleMoreDetails(this.id)");
    colBtn.type = "button";
    colBtn.innerHTML = "Add More Details";
    
    colBtnCntnt = createElemUtil(courseInput.id, "col_btn_cntnt:" + formIndex, "content", "div");

    cnameFormInputBlock = createElemUtil(colBtnCntnt.id, "cname_input_block:"+ formIndex, "form_input_block", "div");
    cnameLabel = createElemUtil(cnameFormInputBlock.id, "cname_label:" + formIndex, "form_input_label", "label");
    cnameLabel.innerHTML = "Course Name";
    cnameInput = createElemUtil(cnameFormInputBlock.id, "cname_input:" + formIndex, "form_input", "input");
    cnameInput.type = "text";
    cnameInput.placeholder = "Course name";
    cnameInput.maxlength = "50";

    inameFormInputBlock = createElemUtil(colBtnCntnt.id, "iname_input_block:"+ formIndex, "form_input_block", "div");
    inameLabel = createElemUtil(inameFormInputBlock.id, "iname_label:" + formIndex, "form_input_label", "label");
    inameLabel.innerHTML = "Instructer Name";
    inameInput = createElemUtil(inameFormInputBlock.id, "iname_input:" + formIndex, "form_input", "input");
    inameInput.type = "text";
    inameInput.placeholder = "Instructer";
    inameInput.maxlength = "50";

    locationFormInputBlock = createElemUtil(colBtnCntnt.id, "location_input_block:"+ formIndex, "form_input_block", "div");
    locationLabel = createElemUtil(locationFormInputBlock.id, "location_label:" + formIndex, "form_input_label", "label");
    locationLabel.innerHTML = "Location";
    locationInput = createElemUtil(locationFormInputBlock.id, "location_input:" + formIndex, "form_input", "input");
    locationInput.type = "text";
    locationInput.placeholder = "Location";
    locationInput.maxlength = "50";
    
    scheduleForm = createElemUtil(colBtnCntnt.id, "schedule_form:"+ formIndex, "schedule_form", "div");

    let days = ["M", "T", "W", "TH", "F", "S"];
    for (var i =0 ;i <days.length ; i++) {
        scheduleInputBlock = createElemUtil(scheduleForm.id, "schedule_input_block_"+ days[i] + ":" + formIndex, "schedule_input_block", "div");
        dayInputBlock = createElemUtil(scheduleInputBlock.id, "day_input_block_"+ days[i] + ":" + formIndex, "day_input_block", "div");
        createElemUtil(dayInputBlock.id, "day_input_txt"+ days[i] + ":" + formIndex, "day_input_txt", "p").innerHTML = days[i];
        createElemUtil(dayInputBlock.id, "day_input"+ days[i] + ":" + formIndex, "day_input", "input").type = "checkbox";
        dayTimeInput = createElemUtil(scheduleInputBlock.id, "day_time_input_"+ days[i] + ":" + formIndex, "day_time_input", "input");
        dayTimeInput.type = "text";
        dayTimeInput.setAttribute("placeholder", "HHMM-HHMM");
        dayTimeInput.setAttribute("maxlength", "9");
    }

    formIndex++;
}

function removeFormField(id) {
    var idArr = id.split(":");
    var fieldIdx = idArr[idArr.length-1];
    var currSeatElem = document.getElementById("course_input:"+fieldIdx);
    $(currSeatElem).remove();

    let coursesInputs = document.getElementsByClassName("course_input");

    if (!coursesInputs || coursesInputs.length==0) {
        document.getElementById("courses_form").remove();
    }
}

function submitCourseForm() {
    var courses = fetchFormInfo();

    for (var i=0; i <courses.length;i++) {
        addCourse(courses[i], i, (index) => {
            removeFormField("course_input:" + index);
        });
    }
}

function fetchFormInfo() {
    let coursesInputs = document.getElementsByClassName("course_input");

    let courses = [];

    for (let i=0;i<coursesInputs.length;i++) {

        var course = {};

        var courseCode = document.getElementById("ccode_input:" + i).value.toUpperCase();
        var totalSeats = parseInt(document.getElementById("tseats_input:" + i).value);
        var currSeats = totalSeats;
        

        course.code = courseCode;
        course.totalSeats = totalSeats;
        course.currSeats = currSeats;

        var cname = document.getElementById("cname_input:" + i).value;
        var iname = document.getElementById("iname_input:" + i).value;
        var location = document.getElementById("location_input:" + i).value;

        if (location.length>0) {
            course.location = location;
        } else {
            course.location = "NA";
        }

        if (cname.length>0) {
            course.name = cname;
        } else {
            course.name = "NA";
        }

        if (iname.length>0) {
            course.iname = iname;
        } else {
            course.iname = "NA";
        }

        var days = {};

        var MInput = document.getElementById("day_time_input_M:" + i).value;
        if (MInput.length>0) {
            days.m = MInput;
        }
        var TInput = document.getElementById("day_time_input_T:" + i).value;
        if (TInput) {
            days.t = TInput;
        }
        var WInput = document.getElementById("day_time_input_W:" + i).value;
        if (WInput) {
            days.w = WInput;
        }
        var ThInput = document.getElementById("day_time_input_TH:" + i).value;
        if (ThInput) {
            days.th = ThInput;
        }
        var FInput = document.getElementById("day_time_input_F:" + i).value;
        if (FInput) {
            days.f = FInput;
        }
        var SInput = document.getElementById("day_time_input_S:" + i).value;
        if (SInput) {
            days.s = SInput;
        }
        course.days = days;

        courses.push(course);
    }

    return courses;
}

function toggleMoreDetails (id) {
    elem = document.getElementById(id);
    elem.classList.toggle("active");
    let content = elem.nextElementSibling;
    if (content.style.display === "flex") {
        content.style.display = "none";
    } else {
        content.style.display = "flex";
    }
}