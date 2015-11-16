/// <reference path="../angular.js" />  
/// <reference path="../angular.min.js" />   
/// <reference path="../angular-animate.js" />   
/// <reference path="../angular-animate.min.js" />   


var app;


(function () {
    app = angular.module("RESTClientModule", ['ngAnimate']);
})();


app.controller("AngularJs_ImageController", function ($scope, $timeout, $rootScope, $window, $http) {

    //Global Variables
    $scope.date = new Date();
    $scope.MyName = "Shanu";
    $scope.usrName = "Peter";
    $scope.Images;
    $scope.txtAnswer = "";


    //Game variable declared
    $scope.questionCount = 1;
    $scope.totalPoints = 0
    $scope.wordCount = 0;
    $scope.rowCount = 0;


    //Game Detail Display Variables

    $scope.Image1 = "";
    $scope.Image2 = "";
    $scope.Image3 = "";
    $scope.Image4 = "";
    $scope.ImageAnswer = "won.png";
    $scope.Answers = "";
    $scope.Resuts = "";

    //  --

    //Game Hidden Table row display 
    $scope.showGameStart = true;
    $scope.showGame = false;
    $scope.showresult = false;
    //Search


    $scope.startGame = function () {

        if ($scope.usrName == '') {
            alert("Enter Your Name to start the game !");
            $scope.showGameStart = true;
            $scope.showGame = false;
            $scope.showresult = false;
        }
        else {
            $scope.questionCount = 1;
            $scope.totalPoints = 0;
            $scope.wordCount = 0;
            $scope.rowCount = 0;

            selectGameDetails();
            $scope.showGameStart = false;
            $scope.showGame = true;
            $scope.showresult = false;
        }
    }

    //get all image Details
    function selectGameDetails() {
        $http.get('/api/students/wordDetail/').success(function (data) {
            $scope.Images = data;
            if ($scope.Images.length > 0) {
                $scope.Image1 = $scope.Images[$scope.rowCount].image1;
                $scope.Image2 = $scope.Images[$scope.rowCount].image2;
                $scope.Image3 = $scope.Images[$scope.rowCount].image3;
                $scope.Image4 = $scope.Images[$scope.rowCount].image4;

                $scope.Answers = $scope.Images[$scope.rowCount].Answer;

                $scope.wordCount = $scope.Answers.length;

            }
        })
        .error(function () {
            $scope.error = "An Error has occured while loading posts!";

        });
    }


    // to find the Answer
    $scope.findAnswer = function () {


        if ($scope.txtAnswer == "") {
            alert("Enter the Answer");
            return;
        }


        if ($scope.txtAnswer.toLowerCase() == $scope.Answers.toLowerCase()) {
            alert("Wow :) You have enter the correct answer and you have got 20 Points for this Answer")

            $scope.totalPoints = $scope.totalPoints + 20;

        }

        else {

            alert("Sorry :( You have enter the wrong answer and you have got -10 points")
            $scope.totalPoints = $scope.totalPoints - 10;
        }

        $scope.txtAnswer = "";

        if ($scope.questionCount == 5) {
            if ($scope.totalPoints >= 100) {
                $scope.Resuts = "Wow :) You have won the Game.Good Job " + $scope.usrName;
                alert($scope.Resuts)
                $scope.ImageAnswer = "won.png";
            }
            else {
                $scope.Resuts = "Sorry " + $scope.usrName + " You lose the game :( .Your Total points are " + $scope.totalPoints + " out of 100 points"

                alert($scope.Resuts);
                $scope.ImageAnswer = "lose.png";
            }


            $scope.showGameStart = false;
            $scope.showGame = false;
            $scope.showresult = true;
            return;
        }
        else {

            $scope.questionCount = $scope.questionCount + 1;

            $scope.wordCount = 0;
            $scope.rowCount = $scope.rowCount + 1;


            $scope.Image1 = $scope.Images[$scope.rowCount].image1;
            $scope.Image2 = $scope.Images[$scope.rowCount].image2;
            $scope.Image3 = $scope.Images[$scope.rowCount].image3;
            $scope.Image4 = $scope.Images[$scope.rowCount].image4;


            $scope.Answers = $scope.Images[$scope.rowCount].Answer;



            $scope.wordCount = $scope.Answers.length;
        }

    }

    // to Start from New Game

    $scope.NewQuestion = function () {
        $scope.usrName = "";
        $scope.questionCount = 1;
        $scope.totalPoints = 0;
        $scope.wordCount = 0;
        $scope.rowCount = 0;

        $scope.showGameStart = true;
        $scope.showGame = false;
        $scope.showresult = false;
    }
});