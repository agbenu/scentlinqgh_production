$(document).ready(function(){

   //Prevent clicking on .active & disabled links
   'use strict'; $('.active, .noLink > a').click(function(e) {
      e.preventDefault();
   });

   //Off-canvas menu
   var $pages = $('#page, #secondHeader'),
       $header = $('#header'),
       $secondHeader = $('#secondHeader .menu-button');

   $secondHeader.on('touchstart click', function(e) {
      e.preventDefault();
      $pages.toggleClass("pageOpen");
      $header.toggleClass("headerOpen");
      $(this).toggleClass("menu-button-active");
   });

   $('#page').on('touchstart click', function() {
      $pages.removeClass("pageOpen");
      $header.removeClass('headerOpen');
      $secondHeader.removeClass("menu-button-active");
   });

   //Responsive side-by-side elements
   $(window).on("load resize", function() {
   if ($(window).width() < 770) {
       $(".side-by-side.right div").each(function() {
       $(this).insertAfter($(this).parent().find('img'));
   });}else{
         $(".side-by-side.right div").each(function() {
         $(this).insertBefore($(this).parent().find('img'));
      });
   }});

   //Fade elements on load
   $(window).load(function() {
      $('.topSection .content').animate({"opacity": 1},1500);
   })

   //Fade elements on scroll
   var divs = $('.topSection .content');
   $(window).on('scroll', function() {
      var st = $(this).scrollTop();
      divs.css({ 'opacity' : (1 - st/200) });
   });

   //Grid system
   var gridElement = $(".gridElement", "#grid3");
   GalleryGrid(); $(window).resize(GalleryGrid);
   function GalleryGrid() {
      var grid3 = $('#grid3');
      var width = $(window).width();
      if (width < 1024 && width > 770) {
         var grid1 = $('#grid1');
         var grid2 = $('#grid2');

         for (var i = 0; i < gridElement.length; i++) {
            if (i < gridElement.length / 2) {
               grid1.append(gridElement[i]);
            } else {
               grid2.append(gridElement[i]);
            }
         }
      } else {
         grid3.append(gridElement);
      }
   }
   

	$("#removeStyle").click(function () {    
		$(this).hide();                       
	    jQuery('#mobileSheet').remove();
	    });



});