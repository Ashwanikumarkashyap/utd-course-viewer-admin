let program = null;
let sortedCourses = []

function addCourse(course, index, callback) {
    var newPostKey = ref.child('program_01').child('courses').push().key;
    var updates = {};

    updates['/program_01/courses/' + newPostKey] = course;

    ref.update(updates).then(()=> {
        if (callback) {
            callback(index);
        }
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
        if (error) {
            console.log('Transaction failed abnormally!', error);
            if (error.message == "permission_denied") {
                alert("Current user is not allowed to modify the data.");
            } else {
                alert("Seats update failed and aborted.");
            }
        } else if (!committed && isRegistration) {
            // reservation aborted, all seats went full and the current reservation could not be made.
        } else {
            // update the reg count with final callback
            if (callback) {
                callback(currSeatsInc);
            }
            if (isRegistration && currSeatsInc<0) {
                // one seat is successfully 'reserved' for the course.
            } else if (isRegistration && currSeatsInc>0) {
                // one seat is successfully 'vacated' for the course.
            } else {
                // seats successfully updated.
            }
        }
    });
}

function deleteCourse(courseCode, callback) {
    ref.child('program_01').child('courses/' + courseCode).remove().then(() => {
        if (callback) {
            callback(courseCode);
        }
    }).catch(error => {
        console.log(error);
        if (error.code == "PERMISSION_DENIED") {
            alert("Current user is not allowed to modify the data.");
        }
    });
}

function updateRegCount(regCountIncrement, isRegistration, callback) {
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
            callback();
        } if (error) {
            console.log('Transaction failed abnormally!', error);
        } else if (!committed) {
            if (isRegistration) {
                alert("Reservation aborted, all seats went full and the current reservation could not be made.");
            } else {
                alert("Seats update aborted, operation failed.");
            }
        } else {
            if (isRegistration && regCountIncrement>0) {
                alert("One seat is successfully 'reserved' for the course " +  snapshot.val().code + ".");
            } else if (isRegistration && regCountIncrement<0) {
                alert("One seat is successfully 'vacated' for the course " +  snapshot.val().code + ".");
            } else {
                alert("Seats successfully updated.");
            }
        }
    });
}