$(document).ready(function(){!function(){var t=".post-toc",i=".active-current";$(t).on("activate.bs.scrollspy",function(){var i=$(t+" .active").last();e(),i.addClass("active-current")}).on("clear.bs.scrollspy",e),$("body").scrollspy({target:t});function e(){$(t+" "+i).removeClass(i.substring(1))}}(),NexT.utils.needAffix()&&function(){var i=$(".header-inner").height(),e=parseInt($(".main").css("padding-bottom"),10),o=i+10;$(".sidebar-inner").affix({offset:{top:o,bottom:e}}),$(document).on("affixed.bs.affix",function(){t(document.body.clientHeight-100)})}(),function(){var i;$(window).on("resize",function(){i&&clearTimeout(i),i=setTimeout(function(){var i=document.body.clientHeight-100;t(i)},0)}),t(document.body.clientHeight-100);var e=NexT.utils.getScrollbarWidth();$(".post-toc").css("width","calc(100% + "+e+"px)")}();function t(t){t=t||"auto",$(".post-toc").css("max-height",t)}}),$(document).ready(function(){var t=$("html"),i=$.isFunction(t.velocity);$(".sidebar-nav li").on("click",function(){var t=$(this),e="sidebar-nav-active",o="sidebar-panel-active";if(!t.hasClass(e)){var a=$("."+o),n=$("."+t.data("target"));i?a.velocity("transition.slideUpOut",200,function(){n.velocity("stop").velocity("transition.slideDownIn",200).addClass(o)}):a.animate({opacity:0},200,function(){a.hide(),n.stop().css({opacity:0,display:"block"}).animate({opacity:1},200,function(){a.removeClass(o),n.addClass(o)})}),t.siblings().removeClass(e),t.addClass(e)}}),$(".post-toc a").on("click",function(e){e.preventDefault();var o=NexT.utils.escapeSelector(this.getAttribute("href")),a=$(o).offset().top;i?t.velocity("stop").velocity("scroll",{offset:a+"px",mobileHA:!1}):$("html, body").stop().animate({scrollTop:a},500)}),NexT.motion.middleWares.sidebar=function(){var t=$(".post-toc-content");"post"!==CONFIG.sidebar.display&&"always"!==CONFIG.sidebar.display||t.length>0&&t.html().trim().length>0&&NexT.utils.displaySidebar()}});