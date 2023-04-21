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
                if (!$slider.hasClass('slick-initialized')) {
                    start()

                }
            } else if ($slider.hasClass('slick-initialized')) {
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
                $link.text('Hide')
            } else {
                $link.text('See More')
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

            $email = $form.find('input[name="email"]'),
            $text = $form.find('input[name="name"]'),
            $file = $form.find('input[type="file"]'),
            $checkbox = $form.find('input[type="checkbox"]')


        function filesLabel() {
            var
                $file = $form.find('.resume__file'),
                $button = $file.find('.resume__fields-btn'),
                $fileInput = $file.find('.file__input'),
                $buttonsText = $button.find('span'),
                file = $fileInput[0].files[0],
                $newText = file ? file.name : 'Прикрепить резюме';


            $buttonsText.text($newText)


        }


        function validation() {

            if ($email.val().length === 0) {
                $submitButton.addClass('btn--disabled');
                return false;
            }

            if ($text.val().length === 0) {
                $submitButton.addClass('btn--disabled');
                return false;
            }

            if (!$checkbox.prop('checked')) {
                $submitButton.addClass('btn--disabled');
                return false;
            }

            if ($file[0].files.length === 0) {
                $submitButton.addClass('btn--disabled');
                return false;
            }

            $submitButton.removeClass('btn--disabled');
        }

        $email.on('input', function () {
            validation();
        })

        $text.on('input', function () {
            validation();
        })

        $file.on('change', function () {
            filesLabel();
            validation();
        })

        $checkbox.on('change', function () {
            validation();
        })

        $form.submit(function (event) {
            event.preventDefault();
            const appApi = document.getElementById("appApi").href;

            const inputs = $form.find(':input');
            let formData = new FormData();
            inputs.each(function () {
                const name = $(this).attr('name');
                let value;
                if (name === 'file') value = $(this)[0].files[0];
                else value = $(this).val();
                if (value) formData.append(name, value);
            });

            axios
                .post(appApi, formData)
                .then(response => {
                    if (response.status === 200) {
                        $("#resumeForm").hide();
                        $("#resumeSuccess").show();
                        $form.trigger('reset');
                        filesLabel();
                        $submitButton.addClass('btn--disabled');
                    } else {
                        $("#resumeForm").hide();
                        $("#resumeError").show();
                        $form.trigger('reset');
                        filesLabel();
                        $submitButton.addClass('btn--disabled');
                    }
                })
                .catch(error => {
                    $("#resumeForm").hide();
                    $("#resumeError").show();
                    $form.trigger('reset');
                    filesLabel();
                    $submitButton.addClass('btn--disabled');
                    console.error(error);
                });
        });
    }

    $('#resendResume').on('click', function (e) {
        e.preventDefault();
        $("#resumeSuccess").hide();
        $("#resumeError").hide();
        $("#resumeForm").show();
    });

    $('#closeResumeSuccess').on('click', function (e) {
        e.preventDefault();
        window.location.href = window.location.href;
    });

    $('#closeResumeError').on('click', function (e) {
        e.preventDefault();
        window.location.href = window.location.href;
    });

    $('#seniorUxBtn').on('click', function (e) {
        e.preventDefault();
        $('#seniorAndroid').hide();
        $('#seniorUx').toggle();
        showFormHerder2();
    });

    $('#seniorAndroidBtn').on('click', function (e) {
        e.preventDefault();
        $('#seniorUx').hide();
        $('#seniorAndroid').toggle();
        showFormHerder2();
    });

    $('#seniorUxBackBtn').on('click', function (e) {
        e.preventDefault();
        $('#seniorUx').hide();

        showFormHerder1();
    });

    $('#seniorAndroidBackBtn').on('click', function (e) {
        e.preventDefault();
        $('#seniorAndroid').hide();

        showFormHerder1();
    });

    function showFormHerder1() {
        $('#formHeader1').show();
        $('#formHeader2').hide();
    }

    function showFormHerder2() {
        $('#formHeader1').hide();
        $('#formHeader2').show();
    }


    function vacancyTabs() {
        var $vacancyCardsSection = $('.vacancy'),
            $vacancyContentsSection = $('.vacancy-list'),
            $vacancyCard = $vacancyCardsSection.find('.card'),
            $vacancyContent = $vacancyContentsSection.find('.vacancy-info')
        $vacancyCard.each(function () {
            $(this).on('click', function (e) {
                e.preventDefault()
                $vacancyContent.hide()
                var $index = $(this).index()
                    $vacancyContent.eq($index).fadeIn()
            })
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
    vacancyTabs()


})

