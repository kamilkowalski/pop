

$(document).ready(function() {

    $('#myPop3').on('click', 'li.submenu1',function() {
        $(".pop-configuration").removeClass('active');
        $(".pop-calendar").addClass('active');
        $(".pop-myevents").removeClass('active');
        $("li.submenu2").removeClass('active');
        $("li.submenu3").removeClass('active');
        $(this).addClass("active");
    });

    $('#myPop3').on('click', 'li.submenu2',function() {
        $(".pop-configuration").removeClass('active');
        $(".pop-calendar").removeClass('active');
        $(".pop-myevents").addClass('active');
        $("li.submenu1").removeClass('active');
        $("li.submenu3").removeClass('active');
        $(this).addClass("active");
    });

    $('#myPop3').on('click', 'li.submenu3',function() {
        $(".pop-configuration").addClass('active');
        $(".pop-calendar").removeClass('active');
        $(".pop-myevents").removeClass('active');
        $("li.submenu1").removeClass('active');
        $("li.submenu2").removeClass('active');
        $(this).addClass("active");
    });

    $('#myPop3').on('click', 'li.choosetab1',function() {
        $("td.pop-main-tree1").addClass('current');
        $("td.pop-main-tree2").removeClass('current');
        $("li.choosetab2").removeClass('active');
        $(this).addClass("active");
    });

    $('#myPop3').on('click', 'li.choosetab2',function() {
        $("td.pop-main-tree2").addClass('current');
        $("td.pop-main-tree1").removeClass('current');
        $("li.choosetab1").removeClass('active');
        $(this).addClass("active");
    });

        $('#myPop3').on('click', 'a.btn-pop-more',function() {
        $(this).closest('tr').next().addClass('active');
        $(this).parents('tr').addClass('openedbox');
        $(this).addClass("active");
    });


        $('#myPop3').on('click', 'a.btn-pop-more.active',function() {
        $(this).closest('tr').next().removeClass('active');
        $(this).parents('tr').removeClass('openedbox');
        $(this).removeClass("active");
    });


     $('#myPop3').on('click', 'div.dTreeNode.nonchosen, div.dTreeNode',function() {
        $(this).children('input[type=checkbox]').attr('checked', true);
        $(this).addClass("chosen");
        $(this).removeClass("nonchosen");
    });

     $('#myPop3').on('click', 'div.dTreeNode.chosen',function() {
        $(this).children('input[type=checkbox]').removeAttr('checked');
        $(this).removeClass("chosen");
        $(this).addClass("nonchosen");
    });

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

