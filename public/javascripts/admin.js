app = angular.module('admin', ['ui.tinymce']);

app.controller('Admin', ['$scope', '$http', '$timeout', function($scope, $http, $timeout) {

	$scope.tinymce_options = {
		theme: "modern",
        plugins: [
            "advlist autolink lists link image charmap print preview hr anchor pagebreak",
            "searchreplace wordcount visualblocks visualchars code fullscreen",
            "insertdatetime media nonbreaking save table contextmenu directionality",
            "emoticons template paste textcolor"
        ],
        toolbar1: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent",
        toolbar2: "print preview media | forecolor backcolor emoticons | link image",
        image_advtab: true,
		height : '500px',
		style_formats : [
			{ title : 'Описание картинки', selector : 'p', classes : 'img_description'},
			{ title : 'Заголовок раздела', block : 'h2'}
		]
	};

	$scope.help = {};
	// $scope.tab = 'info';
	$scope.tab = 'shedule';

	$scope.setDefaults = function() {
		$scope.readyForRemove = {};
		$scope.eventType = null;
		$scope.success = null;
		$scope.advertise = {};
		$scope.course = {};
		$scope.lection = {};
		$scope.blogs = {};
		$scope.lector = {};
		$scope.event = null;
	}

	$scope.changeTab = function(type) {
		$scope.eventType='create'; 
		$scope.tab = type;
		$scope.resizeView(type);
	}

	$scope.resizeView = function(type) {
		$timeout(function() {
			var ch = $('.' + type).outerHeight() + 400;
			console.log(ch)
			$('.adminView').height(ch);
		});
		
	}



	$scope.init = function() {
		$scope.setDefaults();
		$scope.getData();
	}

	$scope.getData = function() {
		$http.get('/advertise/get')
			.success(function(data) {
				$scope.advertises = data;
				console.log(data);
			})
			.error(function(data) {
				console.log(data);
			});
		$http.get('/course/get')
			.success(function(data) {
				console.log(data);
				$scope.courses = data;
			})
			.error(function(data) {
				console.log(data);
			});

		$http.get('/event/get')
			.success(function(data) {
				console.log('events', data);
				$scope.events = data;
			})
			.error(function(data) {
				console.log(data);
			});

		$http.get('/blog/get')
			.success(function(data) {
				console.log('blogs', data);
				$scope.blogs = data;
			})
			.error(function(data) {
				console.log(data);
			});

		$http.get('/lector/get')
			.success(function(data) {
				console.log(data);
				$scope.lectors = data;
			})
			.error(function(data) {
				console.log(data);
			});
	}

	$scope.create = function(type, data) {
		$http.post('admin/' + type + '/', data)	
			.success(function(data) {
				console.log('saved', data);
				$scope.setDefaults();
				$scope.getData();
				$scope.makeEvent('create');
			})
			.error(function(data) {
				console.log('errored', data);
			});
	}

	$scope.changeLoad = function(data, type) {
		$scope.tab = type;
		$scope.eventType = 'change';
		$scope[type] = data;
		if (type == 'course') {
			$scope[type].lector = $scope[type].lector._id;
		}
		$scope.resizeView(type);
	}

	$scope.removeProceed = function() {
		$http.delete('admin/' + $scope.readyForRemove.type + '/' + $scope.readyForRemove.id)
			.success(function(data) {
				$scope.makeEvent('remove');
				$scope.getData();
				$scope.closeMenu();
			})
			.error(function(data) {
				console.log(data);
			});
	}

	$scope.remove = function(id, type) {
		$scope.readyForRemove = {
			type : type, 
			id : id
		};
		var menu = $('<div class="fix menu"></div>');
		var text = $('<h3>Подтвердите удаление</h3>').css({
			'text-align' : 'center',
			'font-weight': 700,
			'background' : '#222',
			'color' : 'white',
			'height' : '40px',
			'line-height' : '40px'
		});
		var bw = $('<span class="button-wrapper"></span>')
		var b1 = $('<button id="proceedRemove">Удалить</button>');
		$(b1).on('click', function() {
			$scope.removeProceed();
		})
		var b2 = $('<button id="rejectRemove">Отмена</button>');
		$(b2).on('click', function() {
			$scope.closeMenu();
		})
		var fader = $('<div class="fix fader"></div>');
		$(menu).append(text);
		$(menu).append(bw);
		$(bw).append(b1);
		$(bw).append(b2);
		$('body').append(menu);
		$('body').append(fader);
	}

	$scope.closeMenu = function() {
		console.log('отмена удаления');
		$('.menu').remove();
		$('.fader').remove();
		$scope.readyForRemove = {};
	}


	$scope.change = function(type, data) {

		$http.post('admin/' + type + '/' + data._id, data)
			.success(function(data) {
				$scope.makeEvent('change');
				$scope.setDefaults();
				$scope.getData();	
			})
			.error(function(data) {
				console.log(data);
			});
	}

	$scope.makeEvent = function(evt) {
		$scope.success = evt;
		$scope.tab = 'info';
		setTimeout(function() {
			$scope.success = null;
			$scope.$apply();
		}, 1000);
	}

	$scope.addEvent = function(event) {
		event.course = event._id;
		delete event._id;
		$http.post('admin/event/', event)
			.success(function(data) {
				console.log(data);
				$scope.makeEvent('create');
				$scope.setDefaults();
				$scope.getData();	
			})
			.error(function(data) {
				console.log(data);
			});
	}

	// $scope.help.selectCourse = function(lection, course_id) {
	// 	lection.course = course_id;
	// }

	$scope.help.selectLector = function(course, lector_id) {
		course.lector = lector_id;
	}

	$scope.help.addToEventForm = function(course) {
		console.log(course)
		$scope.event = course;
		$('.shedule').addClass('three');
	}
	$scope.help.cancelEvent = function() {
		$scope.event = null;
		$('.shedule').removeClass('three');
	}

	$scope.help.makeDate = function(date) {
		a = moment(date).locale('ru').format('ll');
		return a;
	}
}]);