$(document).ready(
    function () {

        /*connecting to petfinder API Client via apiKey and secret I pulled from their website*/
        var pf = new petfinder.Client({
            apiKey: "vn8eKfg1lCSbFJVutFReW5SrtU1mbL4jXfJ9dn1qgbgOrh6zMP",
            secret: "4uVnwz4QYEjkQqQwNZyXK3wQOgQMbJoRGyMatfWw"
        });
        /*creating my own array to house the objects the petfinder API gives me*/
        var animals = [];
        /*two arrays that hold string values of object properties*/
        var description = [];
        var fullDescription = [];
        /*function I took from the api documentation page that reaches out the petfinder and pulls data on animals. Initiates on click of the main page button*/
        $('.meetButton').click(function () {
            pf.animal.search(
                {
                    limit: 100
                }
            )
                .then(function (response) {
                    /*storing data in animals var*/
                    animals = response.data.animals;
                    doTheThing(animals);
                    populateGrid(animals, description);
                })
                .catch(function (error) {
                    // Handle the error
                });
            /*toggle divs to move to the next page: the meet page*/
            $('.home').toggle();
            $('.meet').toggle();
        });

        function doTheThing() {
            console.log(animals);
            /*Looping through the animals array to pull out data from each index*/
            for (var k = 0; k < animals.length - 1; k++) {

                var image = '';
                /*determine if the index has an image associated with it, and if so, store it in var image*/
                if (animals[k].photos.length > 0 && animals[k].photos[0].small != undefined) {
                    image = '<img src="' + animals[k].photos[0].small + '"/>';
                }
                /*if the index does not have an image, skip*/
                if (animals[k].photos.length <= 0) {
                    k++;
                }
                /*pushing all the values that I want to display to the user into an array of descriptions*/
                else {
                    description.push(image + '<br>' + animals[k].name + '<br>');
                    fullDescription.push('<div class="fullDescriptionText"><p><b>' + image + '<br>' + '<h3>' + animals[k].name + '</h3><br>' + animals[k].species + '<br>----<br>' + animals[k].age + ' ' + animals[k].gender + '<br><br><br>' + animals[k].tags + '' +'' + '<a href="' + animals[k].url +'"/>' + animals[k].url + '</a>' + '</b></p></div>');
                }


            }


        }

        function populateGrid(animals, description) {
            /*function that loops through the description array and inserts a row and cell for every index of the array*/
            var table = document.getElementById("myTable");
            for (var i = 0; i < description.length; i++) {
                var row = table.insertRow(0);
                var cell1 = row.insertCell(0);
                /*populate that cell with the data of the description index, plus a button that has an id associated with the description index*/
                cell1.innerHTML = description[i] + '<button id =' + i + ' class="adoptButton">Adopt</button>';

            }
            /*in the cells just created, on button click, take the associated id and print out the description index of that id #*/
            $('.adoptButton').click(function () {
                var id = (this).id;
                /*toggle divs to move pages*/
                $('.meet').toggle();
                $('.adopt').toggle();
                $('.animalName').html(fullDescription[id]);
            })

        }
        /*function that brings user to home page by clicking header*/
        $('h1, h2').click(function () {
            $('.home').show();
            $('.meet').hide();
            $('.adopt').hide();
            $('.formSubmitPage').hide();
            $('.quiz').hide();
        });

/*adding form validation to the adoption interest form*/
        $('#adoptForm').validate({
            rules: {
                firstName: {
                    required: true,
                },
                lastName: "required",
                phone: "required",
                email: "required",
                people: "required",
                work: "required",
                messages: {
                    firstName: {
                        required: "Please enter first name"
                    },
                    lastName: "Please enter Last Name",
                    phone: "Please enter valid phone number",
                    email: "Please enter valid Email",
                    people: "Required",
                    work: "Required"

                }
            }
        });
        /*on button click (submit form), grab all the information from the inputs and store them in values*/
        $('#submitFormBtn').click(function (event) {
            if ($('#adoptForm').valid()) {
                var firstName = $('#firstName').val();
                var lastName = $('#inputLastName').val();
                var phone = $('#inputPhone').val();
                var email = $('#inputEmail').val();
                var appt = $('input[name="appointmentRadio"]:checked').val();
                var numPets = $('input[name="petsRadio"]:checked').val();
                var howMany = $('#inputHowMany').val();
                var lifestyle = $('input[name="lifestyleRadio"]:checked').val();
                /*change pages*/
                $('.formSubmitPage').toggle();
                $('.meet').hide();
                $('.adopt').hide();
                /*print data from the form*/
                $('.name').html(firstName + ' ' + lastName);
                $('.phone').html(phone);
                $('.email').html(email);
                $('.appt').html(appt);
                $('.howMany').html(numPets);
                $('.work').html(howMany);
                $('.lifestyle').html(lifestyle);
            }
        });
        /*Take me to the quiz page*/
        $('.quizButton').click(function () {
            $('.quiz').toggle();
            $('.meet').hide();
            $('.adopt').hide();
            $('.home').hide();
        });
        /*function that prints results of the quiz*/
        $('.quizForm').submit(function (event) {
            event.preventDefault();
            /*creating arrays to store the number of A's, B's, and C's collected from the quiz*/
            var A = [];
            var B = [];
            var C = [];
            /*temporary array that will hold all the values for now*/
            var values = [];
            /*going through each radio button and pushing the value into the values array*/
            var value = $('input[name="snuggle"]:checked').val();
            values.push(value)
            value = $('input[name="aloof"]:checked').val();
            values.push(value);
            value = $('input[name="static"]:checked').val();
            values.push(value);
            value = $('input[name="social"]:checked').val();
            values.push(value);
            value = $('input[name="activity"]:checked').val();
            values.push(value);
            value = $('input[name="pizzaTopping"]:checked').val();
            values.push(value);
            value = $('input[name="superPower"]:checked').val();
            values.push(value);
            value = $('input[name="things"]:checked').val();
            values.push(value);

            /*looping through the values array and pushing A's into A, B's into B and C's into C (array)*/
            for (var i = 0; i < values.length; i++) {
                if (values[i] == "A") {
                    A.push(values[i])
                } else if (values[i] == "B") {
                    B.push(values[i])
                } else if (values[i] == "C") {
                    C.push(values[i])
                }
            }
            /*comparing the length of each array to determine which modal to show the user*/
            if (A.length > B.length && A.length > C.length) {
                $('.modals').toggle();
                $('.dogModal').toggle();
            } else if (B.length > A.length && B.length > C.length) {
                $('.modals').toggle();
                $('.catModal').toggle();
            } else if (C.length > A.length && C.length > B.length) {
                $('.modals').toggle();
                $('.otherModal').toggle();
            } else {
                $('.modals').toggle();
                $('.otherModal').toggle();
            }
        })

        /*hide the modal by clicking it*/
        $('.modals').click(function () {
            $('.modals').hide();
            $('.dogModal').hide();
            $('.catModal').hide();
            $('.otherModal').hide();
        });

        //other functions
    }
);