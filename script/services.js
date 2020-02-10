const ref = firebase.database().ref();

let program;
let sortedCourses = []

ref.child('program_01').once("value", snap => {
    program = snap.val();
    sortedCourses = sortCourses(program)
    createCourseGrid(sortedCourses);
});

function addCourse(course, index, callback) {
    var newPostKey = ref.child('program_01').child('courses').push().key;
    var updates = {};

    updates['/program_01/courses/' + newPostKey] = course;

    ref.update(updates).then(()=> {
        callback(newPostKey, index);
    }).catch(error => {
        console.log(error);
        if (error.code == "PERMISSION_DENIED") {
            alert("Current user is not allowed to modify the data.");
        }
    });
}

function updateSeats(courseCode, currSeatsInc, totalSeatsInc, callback, isRegistration) {
    let courseRef = ref.child('program_01').child('courses/' + courseCode);
    courseRef.transaction(course =>  {
        if (course) {
            if (course.currSeats==0 && currSeatsInc<0) {
                return;
            }
            course.totalSeats+= totalSeatsInc;
            course.currSeats+= currSeatsInc;
        }
        return course;
    }, function(error, committed, snapshot) {
        if (callback && snapshot) {
            callback(snapshot.key, snapshot.val());
        }
        if (error) {
            console.log('Transaction failed abnormally!', error);
            if (error.message == "permission_denied") {
                alert("Current user is not allowed to modify the data.");
            } else {
                alert("Seats update failed and aborted.");
            }
        } else if (!committed && isRegistration) {
            alert("Reservation aborted, all seats went full and the current reservation could not be made.");
        } else {
            if (isRegistration && currSeatsInc<0) {
                alert("One seat is successfully 'reserved' for the course " +  snapshot.val().code + ".");
            } else if (isRegistration && currSeatsInc>0) {
                alert("One seat is successfully 'vacated' for the course " +  snapshot.val().code + ".");
            } else {
                alert("Seats successfully updated.");
            }
        }
    });
}

function deleteCourse(courseCode, callback) {
    ref.child('program_01').child('courses/' + courseCode).remove().then(() => {
        callback(courseCode);
    }).catch(error => {
        console.log(error);
        if (error.code == "PERMISSION_DENIED") {
            alert("Current user is not allowed to modify the data.");
        }
    });
}

function updateRegCount(regCountIncrement, callback) {
    let registrationCountRef = ref.child('program_01').child('registrationCount');
    registrationCountRef.transaction(regCount =>  {
        if (regCount!=null) {
            if (regCount==0 && regCountIncrement<0) {
                return;
            }
            regCount+=regCountIncrement;                
        }
        return regCount;
    }, function(error, committed, snapshot) {
        if (callback  && snapshot) {
            callback(snapshot.key, snapshot.val());
        }
        if (error) {
            console.log('Transaction failed abnormally!', error);
        } else if (!committed) {
            console.log('Transaction aborted');
        } else {
            // successfully updated
        }
    });
}