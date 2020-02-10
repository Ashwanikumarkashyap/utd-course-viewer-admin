// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());
var user;

var uiConfig = {
    callbacks: {
      signInSuccessWithAuthResult: function(authResult, redirectUrl) {
        console.log(authResult)
        // User successfully signed in.
        // Return type determines whether we continue the redirect automatically
        // or whether we leave that to developer to handle.
        return false;
      },
      uiShown: function() {
        // The widget is rendered.
        // Hide the loader.
      }
    },
    
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: 'popup',
    // signInSuccessUrl: '<url-to-redirect-to-on-success>',
    signInOptions: [
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],

    // Terms of service url.
    // tosUrl: '<your-tos-url>',
    // Privacy policy url.
    // privacyPolicyUrl: '<your-privacy-policy-url>'
};

firebase.auth().onAuthStateChanged(function(user_) {
    if (user_) {
        user = user_
        // User is signed in.
        document.getElementById("logout_btn").style.display = "block";
        document.getElementById("course_grid").style.display = "flex";
        document.getElementById("search_block").style.display = "flex";
        document.getElementById("title_block").style.justifyContent = "space-between";
        document.getElementById("title").innerHTML = "Courses Offered";
        document.getElementById("login_block").style.display = "none";
        document.getElementById("header_image").style.display = "block";
        
    } else {
        // No user is signed in.
        document.getElementById("logout_btn").style.display = "none";
        document.getElementById("search_block").style.display = "none";
        document.getElementById("login_block").style.display = "block";
        document.getElementById("title_block").style.justifyContent = "center";
        document.getElementById("title").innerHTML = "Welcome to UT Dallas Course Viewer";
        document.getElementById("header_image").style.display = "none";
        $("#courses_form").remove();
        var courseGrid = document.getElementById("course_grid");
        if (courseGrid) {
            courseGrid.style.display = "none";
        }
        ui.start('#firebaseui-auth-container', uiConfig);
        document.getElementById("firebaseui-auth-container").style.boxShadow = "1px 1px 12px 0px #000000";
        
    }
});

function logout() {

    firebase.auth().signOut().then(function() {
        // Sign-out successful.
    }).catch(function(error) {
        // An error happened.
    });
}