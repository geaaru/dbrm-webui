
function menuMain() {

    $('#menu_dbrm .ui.button').on('click', function(){
        $('.left.vertical.sidebar')
        .sidebar('toggle');
    });

    $('.left.vertical.sidebar')
    .sidebar('hide');
}

$(document).ready(function(){
    menuMain()
});

// vim: ts=4 sw=4 expandtab

