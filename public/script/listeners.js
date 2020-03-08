const ref = firebase.database().ref();
let programRef = null;
let user;

firebase.auth().onAuthStateChanged(function(user_) {
    if (user_) {
        // user is successfully signed in
        user = user_

        // turn off existing listeners (if any)
        if (programRef) {
            programRef.child("registrationCount").off();
            programRef.child("courses").off();
        }

        // get ref of the program
        programRef = ref.child('program_01');

        // set listener to registration count
        programRef.child('registrationCount').on('value', function() {
            programRef.once("value", progSnap => {
                if (program != null) {
                    program = progSnap.val();
                    sortedCourses = sortCourses(program);
                    createCourseGrid(sortedCourses);
                }
            });
        });

        // set listener to course deletion (only to update UI)
        programRef.child('courses').on('child_removed', function(childSnapshot) {
            $(document.getElementById(childSnapshot.key)).remove();
        });

        // fetch the course data once and update UI
        programRef.once("value", snap => {
            program = snap.val();
            sortedCourses = sortCourses(program)
            createCourseGrid(sortedCourses);
        });

        // set listener to new course addition
        programRef.child('courses').on('child_added', function(childSnap) {
            if (program != null && program.courses[childSnap.key] === undefined) {
                program.courses[childSnap.key] = childSnap.val();
                var insertIndex = findCoursesInArr(sortedCourses, 'code', childSnap.val().code, true);
                insertIndex = -1*(insertIndex);
                var obj = JSON.parse(JSON.stringify(childSnap.val()));
                obj.id = childSnap.key;
                sortedCourses.splice(insertIndex, 0, obj);        
                // update the UI
                createCourseGrid(sortedCourses);
            }        
        });
        
        // update UI
        document.getElementById("logout_btn").style.display = "block";
        document.getElementById("course_grid").style.display = "flex";
        document.getElementById("search_block").style.display = "flex";
        document.getElementById("title").innerHTML = "Courses Offered";
        document.getElementById("login_block_wrapper").style.display = "none";
        
    } else {
        // no user is signed in

        // turn off existing listeners (if any)
        if (programRef) {
            programRef.child("registrationCount").off();
            programRef.child("courses").off();
            programRef = null;
        }

        // update the UI
        document.getElementById("logout_btn").style.display = "none";
        document.getElementById("about_block").style.display = "none";
        document.getElementById("search_block").style.display = "none";
        $("#courses_form").remove();
        var courseGrid = document.getElementById("course_grid");
        if (courseGrid) {
            courseGrid.style.display = "none";
        }
        ui.start('#firebaseui-auth-container', uiConfig);
    }
});