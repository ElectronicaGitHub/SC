app = angular.module('index', [])

app.controller('Index', [ '$scope', '$http', function($scope, $http) {

	monthMap = [
		'Январь','Февраль','Март',
		'Апрель','Май','Июнь',
		'Июль','Август','Сентябрь',
		'Октябрь','Ноябрь','Декабрь'
	]
	$scope.events = {};

	$scope.getMonth = function(n) {
		return monthMap[n];
	}

	$scope.events = [];
	$http.get('/event/get')
		.success(function(data) {
			console.log(data);
			data = data.map(function(el, n) {
				var month = moment(el.date_start).get('month');
				el.date_start = moment(el.date_start).locale('ru').format('ll');
				el.date_end = moment(el.date_end).locale('ru').format('ll');
				if (!$scope.events[month]) {
					$scope.events[month] = {
						n : month,
						events : []
					}
				}
				$scope.events[month].events.push(el);
				return el;
			})

			console.log($scope.events);

		})
		.error(function(data) {
			console.log(data);
		});


}])










