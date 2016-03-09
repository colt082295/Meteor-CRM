  Template.leftSidebar.onRendered(function() {
   $('body').attr('class', 'page-md page-header-fixed page-quick-sidebar-over-content page-sidebar-closed-hide-logo');
   $(".page-sidebar-menu li").has(".active").addClass( "active open" ).find('.arrow').addClass('open');
});