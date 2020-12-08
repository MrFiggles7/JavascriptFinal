$(document).ready(
    function () {
        //event handlers

        var pf = new petfinder.Client({
            apiKey: "vn8eKfg1lCSbFJVutFReW5SrtU1mbL4jXfJ9dn1qgbgOrh6zMP",
            secret: "4uVnwz4QYEjkQqQwNZyXK3wQOgQMbJoRGyMatfWw"
        });
        var animals = [];
        var description = [];
        var fullDescription = [];
        $('.meetButton').click(function () {
            pf.animal.search(
                {
                    limit: 100
                }
            )
                .then(function (response) {
                    animals = response.data.animals;
                    doTheThing(animals);
                    populateGrid(animals, description);
                })
                .catch(function (error) {
                    // Handle the error
                });

            $('#thing').text('hi');

            $('.home').toggle();
            $('.meet').toggle();


        });

        function doTheThing() {
            console.log(animals);
            for (var k = 0; k < animals.length - 1; k++) {

                var image = '';
                if (animals[k].photos.length > 0 && animals[k].photos[0].small != undefined) {
                    image = '<img src="' + animals[k].photos[0].small + '"/>';
                }
                if (animals[k].photos.length <= 0) {
                    k++;
                } else {
                    description.push(image + '<br>' + animals[k].name + '<br>');
                    fullDescription.push('<div class="fullDescriptionText"><p><b>' + image + '<br>' + '<h3>' + animals[k].name + '</h3><br>' + animals[k].species + '<br>----<br>' + animals[k].age + ' ' + animals[k].gender + '<br><br><br>' + animals[k].tags + '' +'' + '<a href="' + animals[k].url +'"/>' + animals[k].url + '</a>' + '</b></p></div>');
                }


            }


        }

        function populateGrid(animals, description) {
            var table = document.getElementById("myTable");
            for (var i = 0; i < description.length; i++) {
                var row = table.insertRow(0);
                var cell1 = row.insertCell(0);

                cell1.innerHTML = description[i] + '<button id =' + i + ' class="adoptButton">Adopt</button>';

            }

            $('.adoptButton').click(function () {
                var id = (this).id;
                $('.meet').toggle();
                $('.adopt').toggle();
                $('.animalName').html(fullDescription[id]);
            })

        }

        $('h1, h2').click(function () {
            $('.home').show();
            $('.meet').hide();
            $('.adopt').hide();
            $('.formSubmitPage').hide();
            $('.quiz').hide();
        });


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

                $('.formSubmitPage').toggle();
                $('.meet').hide();
                $('.adopt').hide();

                $('.name').html(firstName + ' ' + lastName);
                $('.phone').html(phone);
                $('.email').html(email);
                $('.appt').html(appt);
                $('.howMany').html(numPets);
                $('.work').html(howMany);
                $('.lifestyle').html(lifestyle);
            }
        });

        $('.quizButton').click(function () {
            $('.quiz').toggle();
            $('.meet').hide();
            $('.adopt').hide();
            $('.home').hide();
        });
        $('.quizForm').submit(function (event) {
            event.preventDefault();
            var A = [];
            var B = [];
            var C = [];
            var values = [];
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

            for (var i = 0; i < values.length; i++) {
                if (values[i] == "A") {
                    A.push(values[i])
                } else if (values[i] == "B") {
                    B.push(values[i])
                } else if (values[i] == "C") {
                    C.push(values[i])
                }
            }

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


        $('.modals').click(function () {
            $('.modals').hide();
            $('.dogModal').hide();
            $('.catModal').hide();
            $('.otherModal').hide();
        });

        //other functions
    }
);