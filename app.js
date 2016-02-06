'use strict';

/*
*   Angular App 
*/
var todoApp = angular.module('todoApp', []);

todoApp.controller('todoController', function($scope){
	$scope.todoText = '';
	$scope.todos = [{
		text: 'Get the milk',
		timestamp: Date.now(),
		done: false
	},
	{
		text: 'Learn Angular',
		timestamp: Date.now(),
		done: false
	}];


	$scope.addTodo = function(){
		console.log($scope.todoText);

		var todo = {
			text: $scope.todoText,
			timestamp: Date.now(),
			done: false
		};

		$scope.todos.push(todo);
		$scope.todoText = '';

		
		console.log($scope.todos);
	};

	$scope.completeTodo = function(todo) {
		todo.done = true;
		console.log($scope.todos);
	};

}); 	 		