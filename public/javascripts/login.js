//

var loginPage = new Object();

loginPage.loginRetries = 0;
loginPage.transition = false;

function loginPopups() {
    $('.user.icon.inline').popup({
        inline: true,
        hoverable: true,
        position : 'right center',
        target: '#iuser',
        content: 'Insert Username!'
      })
    ;

    $('.lock.icon.inline').popup({
        inline: true,
        hoverable: true,
        position : 'right center',
        target: '#ipwd',
        content: 'Insert Password!'
      })
    ;

}

function loginCloseTransition(cb) {
    $('#message').transition({
        animation: 'vertical flip',
        onComplete: function(event) {
            loginPage.transition = false;
            $('#message').html('');
            if (typeof cb == 'function') {
                cb();
            }
        },
        queue: false
    });
}

function loginCreateErrorMsg(msg) {

    if (loginPage.loginRetries > 3) {
        // force msg
        msg = 'Have you rented the brain?? Try to ask a reset password to your amministrator.';
    }

    $('#message').html(
        '<div class="ui negative message login_message">' +
        '<i class="close icon"></i>' +
        '<div class="header">Error on Sign In</div>' +
        msg +
        '</div>');

    $('#login').removeClass('disabled');

    $('#message').transition({
        animation: 'vertical flip',
        queue: false,
    });
    loginPage.transition = true;

    $('.login_message .close').on('click', function() {
        loginCloseTransition();
    });
}

function loginSignIn() {

    var params = {
        username: $('#iuser').val(),
        password: $('#ipwd').val()
    };

    $.post("/login", params).done(function(data) {

        loginPage.loginRetries++;

        if ('success' in data) {

            if (data.success) {
                // Login is ok
                loginSuccessModal();
            } else if ('message' in data) {
                // Error on login
                loginCreateErrorMsg(data.message[0]);
            } else {
                loginCreateErrorMsg('Unexpected error on communicate elaborate response from server.');
            }

        } else {
            loginCreateErrorMsg('Unexpected error on communicate elaborate response from server.');
        }

    }).fail(function(data) {
        loginCreateErrorMsg('Unexpected error on communicate with server.');
    });

}

function loginSubmit() {

    $('#login').on('click', function(obj) {

        $('#login').addClass('disabled');

        if (loginPage.transition) {
            loginCloseTransition(loginSignIn);
        } else {
            loginSignIn();
        }

    });

    if (loginPage.loginRetries == 0) {
        $('#message').transition({
            animation: 'vertical flip',
            queue: false
        });
    }

}

function loginSuccessModal() {

    $('#success_login').html(
        '<div class="ui basic modal">' +
        '<div class="header login_modal">Credentials correctly verified!</div>' +
        '<div class="content">' +
        '<div class="description login_modal">' +
        'You will be redirect between ' +
        '<div class="ui circular labels">' +
        '<div class="ui red label" id="login_redirect">3</div></div> seconds...' +
        '</div>' +
        '</div>');

    $('.basic.modal')
        .modal('show')
    ;

    loginPage.intervalCounter = 3;
    loginPage.interval = setInterval(function() {
        console.log("interval counter = " + loginPage.intervalCounter);
        loginPage.intervalCounter--;
        $('#login_redirect').html("" + loginPage.intervalCounter);
        if (loginPage.intervalCounter <= 0) {
            clearInterval(loginPage.interval);
            loginPage.interval = undefined;
            window.location = '/';
        }
    }, 1000);

}

function loginMain() {
    loginPopups();
    loginSubmit();
}

$(document).ready(function(){
    loginMain()
});

// vim: ts=4 sw=4 expandtab
