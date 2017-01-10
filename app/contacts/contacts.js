'use strict';
angular.module('myContacts.contacts', ['ngRoute', 'firebase'])
        .config(['$routeProvider', function ($routeProvider) {
                $routeProvider.when('/contacts', {
                    templateUrl: 'contacts/contacts.html',
                    controller: 'ContactController'
                });
            }])
        .controller('ContactController', ['$scope', '$firebaseArray', function ($scope, $firebaseArray) {
                $scope.message = "hello";
                var config = {
                    apiKey: "AIzaSyA0qTAfNnN60lGYrXGE1x8GX_-03UosJ2A",
                    authDomain: "mycontacts-155103.firebaseapp.com",
                    databaseURL: "https://mycontacts-155103.firebaseio.com",
                    storageBucket: "mycontacts-155103.appspot.com",
                    messagingSenderId: "89602778858"
                };
                firebase.initializeApp(config);
                var ref = firebase.database().ref();
                $scope.contacts = $firebaseArray(ref);
                $scope.showForm = function () {
                    $scope.addFormShow = true;
                }
                $scope.showEditForm = function (contact) {
                    $scope.editFormShow = true;
                    console.log(contact);
                    $scope.id = contact.$id;
                    $scope.name = contact.name;
                    $scope.email = contact.email;
                    $scope.company = contact.company;
                    $scope.home_phone = contact.phones[0].home;
                    $scope.work_phone = contact.phones[0].work;
                    $scope.address = contact.address;
                }
                $scope.hide = function () {
                    $scope.addFormShow = false;
                    $scope.contactShow = false;
                }
                $scope.addFormSubmit = function () {
                    console.log("adding data...");

                    if ($scope.name) {
                        var name = $scope.name;
                    } else {
                        var name = null;
                    }
                    if ($scope.email) {
                        var email = $scope.email;
                    } else {
                        var email = null;
                    }
                    if ($scope.company) {
                        var company = $scope.company;
                    } else {
                        var company = null;
                    }
                    if ($scope.work_phone) {
                        var work_phone = $scope.work_phone;
                    } else {
                        var work_phone = null;
                    }
                    if ($scope.home_phone) {
                        var home_phone = $scope.home_phone;
                    } else {
                        var home_phone = null;
                    }
                    if ($scope.address) {
                        var address = $scope.address;
                    } else {
                        var address = null;
                    }
                    $scope.contacts.$add({
                        name: name,
                        email: email,
                        company: company,
                        phones: [{
                                home: home_phone,
                                work: work_phone
                            }],
                        address: address
                    }).then(function (ref) {
                        var id = ref.key;
                        console.log('Add contact with id:' + id);
                        clearFields();
                        $scope.addFormShow = false;
                        $scope.msg = "Contact added";
                    });
                }
                $scope.editFormSubmit = function () {
                    var id = $scope.id;
                    var record = $scope.contacts.$getRecord(id);
                    console.log(record);
                    record.name = $scope.name;
                    record.company = $scope.company;
                    record.phones[0].home = $scope.home_phone;
                    record.phones[0].work = $scope.work_phone;
                    $scope.contacts.$save(record).then(function (ref) {
                        console.log(ref.key);
                    });
                    clearFields();
                    $scope.editFormShow = false;
                    $scope.msg = "Contact update";
                }
                $scope.showContact = function (contact) {
                    $scope.name = contact.name;
                    $scope.email = contact.email;
                    $scope.company = contact.company;
                    $scope.home_phone = contact.phones[0].home;
                    $scope.work_phone = contact.phones[0].work;
                    $scope.address = contact.address;
                    console.log(contact);
                    $scope.contactShow = true;

                }
                $scope.removeContact=function(contact){
                    $scope.contacts.$remove(contact);
                    $scope.msg="Contact removed";
                }
                function clearFields() {
                    $scope.name = "";
                    $scope.email = "";
                    $scope.company = "";
                    $scope.work_phone = "";
                    $scope.home_phone = "";
                    $scope.address = "";
                }
            }]);