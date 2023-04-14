$(window).on("load", function () {
    $('#preloader').fadeOut(100)
    $('body').css("opacity", 1)

});


$(document).ready(function () {

    function teamSlider() {
        var $slider = $('.team__slick-slider')

        function start() {
            $slider.slick({
                arrows: false,
                dots: true,
                infinite: true,
                adaptiveHeight: true,
                slidesToShow: 1,
                lazyLoad: 'ondemand',
                cssEase: 'linear',
            })
        }

        function stop() {
            $slider.slick('unslick')
        }


        $(window).resize(function () {
            if ($(window).width() < 1366) {
                start()
            } else {
                stop()
            }
        });


        if ($(window).width() < 1366) {
            start()
        }



    }


    $('.js--more-link').on('click', function (e) {
        e.preventDefault()

        var $link = $(this),
            $attr = $link.data('more'),
            $content = $('.js--more-content[data-more=' + $attr + ']')


        function linkReveision() {
            $link.toggleClass('open')

            if ($link.hasClass('open')) {
                $link.text('Свернуть')
            } else {
                $link.text('Узнать больше')
            }

        }


        linkReveision()
        $content.slideToggle()
    })


    function nav() {
        var $nav = $('.nav')

        $('.burger').on('click', function () {
            $nav.addClass('open')
        })
        $('.nav__close-btn').on('click', function () {
            $nav.removeClass('open')
        })
    }

    function teamCards() {
        var $cards = $('.team__card')


        function closeCards() {
            $cards.removeClass('card--hide')
            $cards.removeClass('card--current')
        }

        $cards.each(function () {
            var
                $card = $(this),
                $buttonOpen = $card.find('.card__more'),
                $buttonClose = $card.find('.card__close'),
                $index = $(this).index()


            $buttonOpen.on('click', function (e) {
                e.preventDefault()
                closeCards()

                $card.addClass('card--current')

                if ($index == 2) {
                    $cards.eq(0).addClass('card--hide')
                } else {
                    $cards.eq(2).addClass('card--hide')
                }

            })


            $buttonClose.on('click', function (e) {
                e.preventDefault()
                closeCards()
            })


        })


    }

    function resumeForm() {
        var $form = $('.js--resume__form'),
            $submitButton = $form.find('.resume__submit-btn'),

            $text = $form.find('input[type="text"]'),
            $file = $form.find('input[type="file"]'),
            $checkbox = $form.find('input[type="checkbox"]')


        function filesLabel() {
            var
                $file = $form.find('.resume__file'),
                $button = $file.find('.resume__fields-btn'),
                $fileInput = $file.find('.file__input'),
                $buttonsText = $button.find('span'),
                $newText = $fileInput[0].files[0].name


            $buttonsText.text($newText)


        }


        function validation() {
            $text.each(function () {
                if ($(this).val().length == 0) {
                    return false
                }
            })

            if (!$checkbox.prop('checked')) {
                return false
            }

            if ($file[0].files.length == 0) {
                return false
            }


            $submitButton.removeClass('btn--disabled')

        }


        $text.on('focusout', function () {
            validation()
        })

        $file.on('change', function () {
            filesLabel()
            validation()
        })

        $checkbox.on('change', function () {
            validation()
        })


    }

    function upBtn() {
        $(window).scroll(function () {
            var top = $(window).scrollTop();
            if (top >= 20) {
                $('.up-btn').fadeIn()
            } else {
                $('.up-btn').fadeOut()
            }
        });

    }

    function cardsTail() {

        var $cardList = $('.js--card-tails'),
            $cards = $cardList.find('.card'),
            $length = $cards.length,
            $remains = $length % 3

        $cards.addClass('card--with-tail')
        if ($remains == 0) {
            $cards.slice(-3).removeClass('card--with-tail')
        } else {
            $cards.slice(-$remains).removeClass('card--with-tail')
        }
    }


    nav()
    teamCards()
    resumeForm()
    upBtn()
    cardsTail()
    teamSlider()


})

