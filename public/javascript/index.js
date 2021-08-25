$(".toggler").on("click", function () {
    $(".link-container").slideToggle();
});

let hamburger = $(".main-container img");

// window.addEventListener('scroll', function () {
//     let value = this.window.scrollY;
//     hamburger.css('right', value * -0.4 )
// })