// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());

var uiConfig = {
    signInFlow: 'popup',
    callbacks: {
      signInSuccessWithAuthResult: function(authResult, redirectUrl) {
        // User successfully signed in.
        // Return type determines whether we continue the redirect automatically
        // or whether we leave that to developer to handle.
        return false;
      },
      uiShown: function () {
        document.getElementById("login_block_wrapper").style.display = "block";
        document.getElementById("title").innerHTML = "Welcome to UT Dallas Course Viewer";
        // document.getElementById("firebaseui-auth-container").style.boxShadow = "1px 1px 12px 0px #000000";
      }
    },
    credentialHelper: firebaseui.auth.CredentialHelper.NONE,
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    // signInSuccessUrl: '<url-to-redirect-to-on-success>',
    signInOptions: [
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
    // Terms of service url.
    // tosUrl: '<your-tos-url>',
    // Privacy policy url.
    // privacyPolicyUrl: '<your-privacy-policy-url>'
};

function logout() {

    firebase.auth().signOut().then(function() {
        // Sign-out successful.
    }).catch(function(error) {
        // An error happened.
    });
}