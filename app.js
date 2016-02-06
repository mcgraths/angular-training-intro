'use strict';

/*
*   Angular App 
*/
var ref = new Firebase("https://torrid-fire-6609.firebaseio.com/todos");
var todoApp = angular.module('todoApp', []);

todoApp.controller('todoController', function($scope, todoApi){
	$scope.todoText = '';
	$scope.todos = [];
	$scope.dataLoaded = false;


	$scope.addTodo = function(){
		console.log($scope.todoText);

		var todo = {
			text: $scope.todoText,
			timestamp: Date.now(),
			done: false
		};

		$scope.todoText = '';
		$scope.todos.push(todo);
		
		console.log($scope.todos);

		$scope.dataLoaded = true;
		todoApi.newTodo(todo);
	};

	ref.on("child_added", function(snapshot) {
	    console.log(snapshot.val());  
	    
	    if(!$scope.dataLoaded)
		    $scope.$apply(function () {
	            $scope.todos.push(snapshot.val());
	        });    
	});

}); 	

todoApp.directive('todo', function() {
  return {
    restrict: 'E', //directive is for element only <todo></todo>
    scope: {
      todo: '=item' //bind scope to the 'info' attribute of the element
    },
    controller: ['$scope', 'todoApi', function($scope, todoApi) {
    	$scope.completeTodo = function(todo) {
			todo.done = true;
		};
    }],
    templateUrl: 'templates/todo.html' //html template file
  };
});

todoApp.filter('fromNow', function() {
    return function(input) {
      /* jshint ignore:start */
      return moment(input).fromNow();
      /* jshint ignore:end */
    };
});

todoApp.factory('todoApi', ['$http', function($http) {

		return {
			newTodo: function(todo) {
				ref.push().set(todo);
			}
		};

	}]);