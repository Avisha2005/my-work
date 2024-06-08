$(document).on('click', '.dropdown-toggle', function () {
    $('.sub-menu').slideToggle();
});

$(document).ready(function () {
    if ($('#back-to-top').length) {
        var scrollTrigger = 200, // px
        backToTop = function () {
            var scrollTop = $(document).scrollTop();
            if (scrollTop > scrollTrigger) {
                $('#back-to-top').addClass('show');
            } else {
                $('#back-to-top').removeClass('show');
            }
        };
        backToTop();
        $(document).on('scroll', function () {
            backToTop();
        });
        $('#back-to-top').on('click', function (e) {
            e.preventDefault();
            $('html,body').animate({
                scrollTop: 0
            }, 500);
        });
    }

    $('.button-show-hide').click(function(){
        $('.category').stop().slideToggle();
    });

    var widthwindow = $(window).width();

	if(widthwindow < 900){
		$(document).click(function(e) {
			if (!$(e.target).is('.category, .category *') && !$(e.target).is('.button-show-hide')) {
				$(".category").slideUp();
			}
		});
    }

    var audio = null;

    $('.icon-play').click(function () {
        if ($(this).hasClass('fa-play-circle')) {
            if (!audio) {
                audio = new Audio($(this).data('link'));
                audio.play();
            } else {
                audio.pause();
                audio = new Audio($(this).data('link'));
                audio.play();
                $('.fa-pause-circle').removeClass('fa-pause-circle').addClass('fa-play-circle');
            }
            $(this).removeClass('fa-play-circle').addClass('fa-pause-circle');
        } else {
            $(this).removeClass('fa-pause-circle').addClass('fa-play-circle');
            if (audio) {
                audio.pause();
            }
        }
    });

    $(document).on('click', '.buy-ring', function () {
        $('#paypal-button-container').html('');
        $('#paypal-message').html('');
        var downloadUrl = $(this).data('url');
        var that = $(this);

        paypal.Buttons({
            createOrder: function(data, actions) {
                return actions.order.create({
                    purchase_units: [{
                        amount: {
                            value: '0.99',
                            currency_code: 'USD'
                        }
                    }]
                });
            },
            onCancel: function (data) {
                $('#paypal-message').html('<div class="alert alert-dark">Payment canceled.</div>');
            },
            onError: function (err) {
                $('#paypal-message').html('<div class="alert alert-danger">Payment error, please check payment information.</div>');
            },
            onApprove: function(data, actions) {
                $('#paypal-message').html('<div class="alert alert-warning">Checking payment information, please wait...</div>');
                return actions.order.capture().then(function(details) {
                    $('#paypal-button-container').html('');
                    $('#paypal-message').html('<div class="alert alert-success">Payment is successful, download link is below, thank you!</div>');
                    $('.download-box').removeClass('d-none');
                    that.remove();
                });
            }
        }).render('#paypal-button-container');
    });
});