'use strict';

/*
*   Angular App 
*/
var ref = new Firebase("https://torrid-fire-6609.firebaseio.com/todos");
var todoApp = angular.module('todoApp', []);

todoApp.controller('todoController', function($scope, todoApi){
	$scope.todoText = '';
	$scope.todos = []; //Our list of todo items
	$scope.dataLoaded = false;

	//Function that adds a new todo
	$scope.addTodo = function(){
		console.log($scope.todoText);

		//Create the new todo that we'll add to the list and database
		var newTodo = {
			text: $scope.todoText,
			timestamp: Date.now(),
			done: false
		};

		//Clear the text box
		$scope.todoText = '';

		//Add the new todo to the list
		$scope.todos.push(newTodo);
		
		console.log($scope.todos);

		$scope.dataLoaded = true;

		//Send the new todo off to the database
		todoApi.newTodo(newTodo);
	};

	//This is fired when loading the page and grabs all existing
	//todos from the Firebase DB
	ref.on("child_added", function(snapshot) {
	    console.log(snapshot.val());  
	    
	    //Use dataLoaded to prevent duplicated todo items after adding a new one
	    if(!$scope.dataLoaded)
		    $scope.$apply(function () {
	            $scope.todos.push(snapshot.val());
	        });    
	});

}); 	

//Our todo directive <todo item="Object"></todo>
todoApp.directive('todo', function() {
  return {
    restrict: 'E', //directive is for element only <todo></todo>
    scope: {
      self: '=item' //bind scope to the 'item' attribute of the element
    },
    controller: ['$scope', 'todoApi', function($scope, todoApi) {
    	$scope.completeTodo = function(self) {
			self.done = true;
		};
    }],
    templateUrl: 'templates/todo.html' //html template file
  };
});

//Filter for formating the date using MomentJS
todoApp.filter('fromNow', function() {
    return function(input) {
      /* jshint ignore:start */
      return moment(input).fromNow();
      /* jshint ignore:end */
    };
});

//Factory for interacting with Firebase
todoApp.factory('todoApi', ['$http', function($http) {
	return {
		newTodo: function(todo) {
			ref.push().set(todo);
		}
	};
}]);