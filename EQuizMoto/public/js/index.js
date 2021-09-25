
// Example starter JavaScript for disabling form submissions if there are invalid fields


var firebaseConfig = {
    apiKey: "AIzaSyAewrJPHSPMLZ1o6grFmKiQ76JmZY67vrM",
    authDomain: "e-quizmoto.firebaseapp.com",
    databaseURL: "https://e-quizmoto-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "e-quizmoto",
    storageBucket: "e-quizmoto.appspot.com",
    messagingSenderId: "1057123919203",
    appId: "1:1057123919203:web:91a1e2e92f0909973d1f56",
    measurementId: "G-FTH6GZ5HEN"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();


firebase.auth.Auth.Persistence.LOCAL;

$("#btn-login").click(function () {
    var email = $("#email").val();
    var password = $("#password").val();

    if (email != "" && password != "") {
        var result = firebase.auth().signInWithEmailAndPassword(email, password);
        result.catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;

            console.log(errorCode);
            console.log(errorMessage);
            window.alert("Message : " + errorMessage);
        });
    }
    else {
        window.alert("Form is incomplete. Please fill out the fields.");
    }
});
$("#btn-logOut").click(function () {
    firebase.auth().signOut();
});




var studRef = firebase.database().ref('teacher');
var new_html = '';
window.onload = function () {
    initApp();
    displayStudData();

}


function initApp() {
    document.getElementById('add_stud').addEventListener('click', addNewStud, false);
}

function addNewStud() {
    var firstname = document.getElementById('firstName').value;
    var lastname = document.getElementById('lastName').value;
    var section = document.getElementById('section').value;
    var studentnumber = document.getElementById('studentNumber').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    var birthday = document.getElementById('birthDay').value;
    var password = document.getElementById('lastName').value + document.getElementById('birthDay').value;
    var timeStamp = new Date().getTime();
    var studID = 'STUDENT_' + timeStamp;


    studRef.child(studID).set({
        firstname: firstname,
        lastname: lastname,
        section: section,
        studentnumber: studentnumber,
        email: email,
        phone: phone,
        birthday: birthday,
        password: password,
        stud_id: studID
    });
    $('#firstName').val('');
    $('#lastName').val('');
    $('#section').val('');
    $('#studentNumber').val('');
    $('#email').val('');
    $('#phone').val('');
    $('#birthDay').val('');
    $('#passWord').val('');




}


function refreshPage() {
    window.location.reload();
}


function displayStudData() {
    studRef.on('child_added', function (studData) {
        console.log(studData.val())

        new_html += '<tr id= "' + studData.val().stud_id + '">';
        new_html += '<td id ="firstName_' + studData.val().stud_id + '">' + studData.val().firstname + '</td>';
        new_html += '<td id ="lastName_' + studData.val().stud_id + '">' + studData.val().lastname + '</td>';
        new_html += '<td id ="section_' + studData.val().stud_id + '">' + studData.val().section + '</td>';
        new_html += '<td id ="studentNumber_' + studData.val().stud_id + '">' + studData.val().studentnumber + '</td>';
        new_html += '<td id ="email_' + studData.val().stud_id + '">' + studData.val().email + '</td>';
        new_html += '<td id ="phone_' + studData.val().stud_id + '">' + studData.val().phone + '</td>';
        new_html += '<td><a class="edit" data-toggle="modal"><button type="button" class="btn btn-success editStud"';
        new_html += 'data-bs-toggle="modal" data-bs-target="#editStudentModal" data-stud-id="' + studData.val().stud_id + '" title="Edit">Edit</button></a>';
        new_html += '<a class="delete" data-toggle="modal"><button type="submit" class="btn btn-danger deleteStud"';
        new_html += 'data-bs-toggle="modal" data-bs-target="#deleteStudentModal" data-stud-id="' + studData.val().stud_id + '" title="Delete">Delete</button></a>   ';
        new_html += '</tr>';
        $('#stud-table').html(new_html);
    })

}
function autoReloadPage() {
    reload
}


$(document).on('click', '.editStud', function () {
    var stud_id = $(this).attr('data-stud-id');

    studRef.child(stud_id).once('value', function (stud) {
        var modal_header = '';

        modal_header += '<h5 class="modal-title">Edit Teacher' + stud.val().firstname + '</h5>';
        modal_header += ' <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>';

        var modal_body = '';
        modal_body += '<div class="form-group">';
        modal_body += '<label>Firstname</label>';
        modal_body += '<input id="edit-firstname" type="text" value="' + stud.val().firstname + '" class="form-control" required>';
        modal_body += '</div>';
        modal_body += '<div class="form-group">';
        modal_body += '<label>Lastname</label>';
        modal_body += '<input type="text" id="edit-lastname" value="' + stud.val().lastname + '" class="form-control" required>';
        modal_body += '</div>';
        modal_body += '<div class="form-group">';
        modal_body += '<label>Section</label>';
        modal_body += '<input type="text" id="edit-section" value="' + stud.val().section + '" class="form-control" required>';
        modal_body += '</div>';
        modal_body += '<div class="form-group">';
        modal_body += '<label>Student number</label>';
        modal_body += '<input id="edit-studentnumber" type="text" value="' + stud.val().studentnumber + '" class="form-control" required>';
        modal_body += '<div class="form-group">';
        modal_body += '<label>Email</label>';
        modal_body += '<input id="edit-email" type="email" value="' + stud.val().email + '" class="form-control" required>';
        modal_body += '<div class="form-group">';
        modal_body += '<label>Phone</label>';
        modal_body += '<input id="edit-phone" type="text" value="' + stud.val().phone + '" class="form-control" required>';
        modal_body += '<div class="form-group">';
        modal_body += '<label>Birthday</label>';
        modal_body += '<input id="edit-birthday" type="text" value="' + stud.val().birthday + '" class="form-control" required>';
        modal_body += '<div class="form-group">';
        modal_body += '<label>Password</label>';
        modal_body += '<input id="edit-password" type="text" value="' + stud.val().password + '" class="form-control" required>';
        modal_body += '</div>';


        var modal_footer = '';
        modal_footer += '<input type="button" class="btn btn-secondary" data-bs-dismiss="modal" value="Close">';
        modal_footer += ' <input type="submit" data-bs-dismiss="modal" class="btn btn-primary updateStudentData" data-stud-id="' + stud_id + '" value="Submit">';
        $("#editStudentModal").find('.modal-header').html(modal_header);
        $("#editStudentModal").find('.modal-body').html(modal_body);
        $("#editStudentModal").find('.modal-footer').html(modal_footer);
        $("#editStudentModal").modal();
    })
})

$(document).on('click', '.updateStudentData', function () {
    var stud_id = $(this).attr('data-stud-id');

    var firstname = document.getElementById('edit-firstname').value;
    var lastname = document.getElementById('edit-lastname').value;
    var section = document.getElementById('edit-section').value;
    var studentnumber = document.getElementById('edit-studentnumber').value;
    var email = document.getElementById('edit-email').value;
    var phone = document.getElementById('edit-phone').value;
    var birthday = document.getElementById('edit-birthday').value;
    var password = document.getElementById('edit-password').value;


    studRef.child(stud_id).update({
        firstname: firstname,
        lastname: lastname,
        section: section,
        studentnumber: studentnumber,
        email: email,
        phone: phone,
        birthday: birthday,
        password: password


    })
    $('#firstName_' + stud_id).html(firstname);
    $('#lastName_' + stud_id).html(lastname);
    $('#section_' + stud_id).html(section);
    $('#studentNumber_' + stud_id).html(studentnumber);
    $('#email_' + stud_id).html(email);
    $('#phone_' + stud_id).html(phone);
    $('#birthday_' + stud_id).html(birthday);
    $('#password_' + stud_id).html(password);
})


$(document).on('click', '.deleteStud', function () {
    var stud_id = $(this).attr('data-stud-id');
    studRef.child(stud_id).once('value', function (stud) {
        var modal_header = '';

        modal_header += '<h5 class="modal-title">Delete ' + stud.val().firstname + '</h5>';
        modal_header += ' <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>';

        var modal_body = '';

        modal_body += '<p>Are you sure you want to delete this record?</p>';
        modal_body += '<p class="text-warning"><small>This action cannot be undone.</p></small>';

        var modal_footer = '';

        modal_footer += ' <input type="button" class="btn btn-secondary" data-bs-dismiss="modal" value="Close">';
        modal_footer += '<input type="submit"  data-stud-id="' + stud_id + '" class="btn btn-danger deleteStudentData"  data-bs-dismiss="modal" value="Delete">';

        $("#deleteStudentModal").find('.modal-header').html(modal_header);
        $("#deleteStudentModal").find('.modal-body').html(modal_body);
        $("#deleteStudentModal").find('.modal-footer').html(modal_footer);
        $("#deleteStudentModal").modal();
    })
})

$(document).on('click', '.deleteStudentData', function () {
    var stud_id = $(this).attr('data-stud-id');

    studRef.child(stud_id).remove();

    $('#' + stud_id).remove();



});
