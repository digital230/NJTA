
$(document).ready(function () {
    "use strict";


    $('#progressbarwizard').bootstrapWizard({
        onTabShow: function (tab, navigation, index) {
            var $total = navigation.find('li').length;
            var $current = index + 1;
            var $percent = ($current / $total) * 100;
            $('#progressbarwizard').find('.bar').css({ width: $percent + '%' });
        }
    });


    $('#rootwizard').bootstrapWizard({
        'nextSelector': '.button-next',
        'previousSelector': '.button-previous',
        'onNext': function (tab, navigation, index) {
            if (index == 1) {
                validateFirstTab()
                if (!isValid) {
                    Swal.fire({
                        type: 'error',
                        title: 'Oops...',
                        text: 'Please fill in all fields!',
                      })
                    return false;
                }
            } else if (index == 2) {
                validateSecondTab()
                if (!isValid2) {
                    Swal.fire({
                        type: 'error',
                        title: 'Oops...',
                        text: 'Please fill in all fields!',
                      })
                    return false;
                }
            } else if (index == 4){
                validateFourthTab()
                if (!isValid4) {
                    Swal.fire({
                        type: 'error',
                        title: 'Oops...',
                        text: 'Please submit both film poster & video file!',
                      })
                    return false;
                }
            } 
        },

    });




});


function validateFirstTab() {
    var tab = document.querySelector("#tab1");
    var inputFields = tab.querySelectorAll(".form-control");
    isValid = true;

    for (i = 0; i < inputFields.length; i++) {
        var currentInputValue = inputFields[i].value;
        currId = '' + inputFields[i].getAttribute("id");
        if (currentInputValue == null || currentInputValue === "") {
            console.log(inputFields[i])
            document.getElementById(currId).style.borderColor = "red";
            isValid = false;
        } else {
            document.getElementById(currId).style.borderColor = "#32CD32";
        }
    }
    return isValid;

}

function validateSecondTab() {
    var tab = document.querySelector("#tab2");
    var inputFields = tab.querySelectorAll(".form-control");
    isValid2 = true;

    for (i = 0; i < inputFields.length; i++) {
        var currentInputValue = inputFields[i].value;
        currId = '' + inputFields[i].getAttribute("id");
        if (currentInputValue === "" && currId != 'address2') {
            console.log(inputFields[i])
            document.getElementById(currId).style.borderColor = "red";
            isValid2 = false;
        } else {
            document.getElementById(currId).style.borderColor = "#32CD32";
        }
    }
    return isValid2;

}

function validateFourthTab() {
    isValid4 = true;
    var image = document.getElementById("#graphicPath");
    if (image.value == null || image.value === ""){
        isValid4 = false;
    }
    return isValid4;
}


$('#btn-submit').on('click', function (e) {
    e.preventDefault();
    var form = $(this).parents('form');
    Swal.fire({
        title: 'Are you sure you want to submit?',
        type: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, submit my film!'
    }).then((result) => {
        if (result.value) {
            Swal.fire(
                'Submitted!',
                'Your film has been submitted!',
                'success'
            )
            form.submit();

        }
    })
});