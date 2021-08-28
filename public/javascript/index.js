$(".toggler").on("click", function () {
    $(".link-container").slideToggle();
});

jQuery(".post p:nth-of-type(1) a").attr("tabindex", "-1");
jQuery(".recipe-container a").attr("tabindex", "-1");
