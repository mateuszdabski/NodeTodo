var nodeTodo = angular.module("nodeTodo", []);

function mainController($scope, $http) {
  $scope.formData = {};

  // when landing on the page, get all todos and show them
  $http
    .get("/api/todos")
    .success(function(data) {
      $scope.todos = data;
      var length = data.length;
      var finished = [];
      var unfinished = [];
      for (var i = 0; i<length; i++) {
        var d = data[i];
        if (d.done == true) {
          finished.push(d);
        } else {
          unfinished.push(d);
        }
      }
      $scope.finishedTodos = finished;
      $scope.unfinishedTodos = unfinished;
    })
    .error(function(data) {
      console.log("Error: " + data);
    });

  // when submitting the add form, send the text to the node API
  $scope.createTodo = function() {
    $http
      .post("/api/todos", $scope.formData)
      .success(function(data) {
        $("input").val("");
        $scope.todos = data;
        var length = data.length;
        var finished = [];
        var unfinished = [];
        for (var i = 0; i<length; i++) {
          var d = data[i];
          if (d.done == true) {
            finished.push(d);
          } else {
            unfinished.push(d);
          }
        }
        $scope.finishedTodos = finished;
        $scope.unfinishedTodos = unfinished;
      })
      .error(function(data) {
        console.log("Error: " + data);
      });
  };

  // update a todo after checking it
  $scope.updateTodo = function(id) {
    $http
      .put("/api/todos/update/" +id, this.todo)
      .success(function(data) {
        $scope.todos = data;
        var length = data.length;
        var finished = [];
        var unfinished = [];
        for (var i = 0; i<length; i++) {
          var d = data[i];
          if (d.done == true) {
            finished.push(d);
          } else {
            unfinished.push(d);
          }
        }
        $scope.finishedTodos = finished;
        $scope.unfinishedTodos = unfinished;
      })
      .error(function(data) {
        console.log("Error: " + data);
      });
  };

  // delete a todo after checking it
  $scope.deleteTodo = function(id) {
    $http
      .delete("/api/todos/" + id)
      .success(function(data) {
        $scope.todos = data;
        var length = data.length;
        var finished = [];
        var unfinished = [];
        for (var i = 0; i<length; i++) {
          var d = data[i];
          if (d.done == true) {
            finished.push(d);
          } else {
            unfinished.push(d);
          }
        }
        $scope.finishedTodos = finished;
        $scope.unfinishedTodos = unfinished;
      })
      .error(function(data) {
        console.log("Error: " + data);
      });
  };
}
