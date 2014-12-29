$(function() {

	var title = '.slider-title',
		width = $('.img-front').width();


	var left = {
		imgFront	: -width,
		h3			: -width,
		p			: -width,
		a			: -width
	};
	var current = {
		imgFront	: 0,
		h3			: 675,
		p			: 675,
		a			: 700
	};
	var right = {
		imgFront	: 990,
		h3			: 990,
		p			: 990,
		a			: 990
	};
	
	var isScrolling = false;

	$('#carousel').carouFredSel({
		scroll	: {
			duration		: 0,
			timeoutDuration	: 3000
		},
		auto	: true,
		prev	: {
			button		: '#prev',
			conditions	: function() {
				return (!isScrolling);
			},
			onBefore	: function( data ) {
				isScrolling = true;

				$(this).delay(900);

				data.items.old.find('.img-front')
					.delay(400)
					.animate({
						left: right.imgFront
					});

				data.items.old.find(title)
					.delay(200)
					.animate({
						left: right.h3
					});

				data.items.old.find('p')
					.delay(100)
					.animate({
						left: right.p
					});

				data.items.old.find('a')
					.animate({
						left: right.a
					});
			},
			onAfter: function( data ) {
				data.items.old.find('.img-front')
					.css({
						left: current.imgFront
					});

				data.items.old.find(title)
					.css({
						left: current.h3
					});

				data.items.old.find('p')
					.css({
						left: current.p
					});

				data.items.old.find('a')
					.css({
						left: current.a
					});

				data.items.visible.find('.img-front')
					.css({
						left: left.imgFront
					}).delay(400)
					.animate({
						left: current.imgFront
					}, function() {
						isScrolling = false;
					});

				data.items.visible.find(title)
					.css({
						left: left.h3
					}).delay(200)
					.animate({
						left: current.h3
					});

				data.items.visible.find('p')
					.css({
						left: left.p
					}).delay(100)
					.animate({
						left: current.p
					});

				data.items.visible.find('a')
					.css({
						left: left.a
					})
					.animate({
						left: current.a
					});
			}
		},
		next	: {
			button		: '#next',
			conditions	: function() {
				return (!isScrolling);
			},
			onBefore	: function( data ) {
				isScrolling = true;

				$(this).delay(900);	//	delay the onafter

				data.items.old.find('.img-front')
					.animate({
						left: left.imgFront
					});

				data.items.old.find(title)
					.delay(200)
					.animate({
						left: left.h3
					});

				data.items.old.find('p')
					.delay(300)
					.animate({
						left: left.p
					});

				data.items.old.find('a')
					.delay(400)
					.animate({
						left: left.a
					});
			},
			onAfter: function( data ) {
				data.items.old.find('.img-front')
					.css({
						left: current.imgFront
					});

				data.items.old.find(title)
					.css({
						left: current.h3,
						opacity : 0
					});

				data.items.old.find('p')
					.css({
						left: current.p
					});

				data.items.old.find('a')
					.css({
						left: current.a
					});

				data.items.visible.find('.img-front')
					.css({
						left: right.imgFront
					})
					.animate({
						left: current.imgFront
					});

				data.items.visible.find(title)
					.css({
						left: right.h3
					}).delay(200)
					.animate({
						left: current.h3,
						opacity : 1
					});

				data.items.visible.find('p')
					.css({
						left: right.p
					}).delay(300)
					.animate({
						left: current.p
					});

				data.items.visible.find('a')
					.css({
						left: right.a
					}).delay(400)
					.animate({
						left: current.a
					}, function() {
						isScrolling = false;
					});
			}
		}
	});
});