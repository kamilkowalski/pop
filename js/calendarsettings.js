$(function() {
    $('#myPop2').on('click', 'li.submenu1a',function() {
        $(".pop-1").addClass('active');
        $(".pop-2").removeClass('active');
        $("li.submenu2a").removeClass('active');
        $(this).addClass("active");
    });

    $('#myPop2').on('click', 'li.submenu2a',function() {
        $(".pop-1").removeClass('active');
        $(".pop-2").addClass('active');
        $("li.submenu1a").removeClass('active');
        $(this).addClass("active");
    });
})
