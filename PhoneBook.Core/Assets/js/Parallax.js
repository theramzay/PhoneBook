$(document).ready(function () {
    $('[data-type="background"]').each(function () {
        var $bgobj = $(this); // создаем объект
        $(window).scroll(function () {
            var yPos = -($(window).scrollTop() / $bgobj.data('speed')); // вычисляем коэффициент
            // Присваиваем значение background-position
            var coords = 'center ' + yPos + 'px';
            // Создаем эффект Parallax Scrolling
            $bgobj.css({ backgroundPosition: coords });
        });
    });
});

$('a[href^="#"]').click(function () {
    //Сохраняем значение атрибута href в переменной:
    var target = $(this).attr('href');
    $('html, body').animate({ scrollTop: $(target).offset().top }, 1500);
    return false;
});