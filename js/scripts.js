
/*          Access Token                                    Title
//    api key: eb93cc823eaff91a6af731e1d4c2a1e0    Orthocure Buy Button */
var view = {};
var data = {};
$('body').hide();

$(document).ready(function() {

$('body').show();
    $('.main-contain').show();
    $('.appliance').show();


var shopClient = ShopifyBuy.buildClient({
  apiKey: 'eb93cc823eaff91a6af731e1d4c2a1e0',
  myShopifyDomain: 'orthocure.myshopify.com',
  appId: '6'
});

view.spinner = {};
view.spinTarget = '';
view.spinTarget = document.getElementById('mySpinner');

data.cwidth = 200;
data.cheight = 200;
data.canvasWidth = data.cwidth;;
data.canvasHeight = data.cheight;
data.canvasRatio = (data.cwidth / data.cheight);
data.viewSize = 50;


view.panLR = 0;
view.panUD = 0;
view.zoom = 1;
view.startstop = true;
view.renderr = 0;
view.renderr2 = 0;
view.diff = 0;
view.diff2 = 0;
view.killAnim = '';
view.killAnim2 = '';
view.dataRef = new Firebase('https://shining-inferno-9786.firebaseio.com');
view.object1 = '';
view.focusY = 0;
view.focusX = 0;
view.focusZ = 100;
view.stl = '';
view.isAdmin = null;
view.currEventId = null;
view.currEvent = {};

view.isExample = false;
view.currUser = {};
view.currPat = {};
view.tempObject = {};

view.onfocus = function(element) {
    if(element.value === element.defaultValue) {
        element.value = '';
    } 
}

view.onblur = function(element) {
    if (element.value === '' || element.value === element.defaultValue) {
        element.value = element.defaultValue;
        element.style.backgroundColor = 'hsla(1, 0%, 95%, 0.8)';
    } else if(element.value !== element.defaultValue) {
        element.style.backgroundColor = 'hsla(200,100%,90%,0.9)';
    }
}

view.init = function() {
    view.renderer = '';
    view.renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true
    });
    view.renderer.gammaInput = true;
    view.renderer.gammaOutput = true;
    view.renderer.setSize(data.cwidth, data.cheight);
    view.renderer.setClearColor(0x000000, 0);
    view.viewSize = 30;

    /* if (view.currPat.patId !== null || view.currPat.patId !== undefined || view.currPat.patId !== '') {
        view.viewSize = 45; // it was originally set at 40
        $('#d-contain').append(view.renderer.domElement);
    } else {
        view.viewSize = 35; // it was originally set at 40
        $('#image-contain').append(view.renderer.domElement);
    }
*/
    //view.viewSize = 36; // it was originally set at 40
    view.camera = new THREE.OrthographicCamera((-data.canvasRatio * view.viewSize / 2), (data.canvasRatio * view.viewSize / 2), view.viewSize / 2, -view.viewSize / 2, 1, 1000);
    //view.camera = new THREE.PerspectiveCamera(50, 0.7, 1, 1000);
    view.camera.position.set(view.focusX, view.focusY, view.focusZ); //originally set at z=100

    view.cameraControls = new THREE.OrbitControls(view.camera, view.renderer.domElement);
    //view.cameraControls.target.set(100, 1000, 0); //this does nothing.

    //view.camera.translateX(100); //sets the initial orientation of the model i.e. slightly rotated
    //view.camera.translateY(-100);

    view.scene = new THREE.Scene();
    view.ambientLight = new THREE.AmbientLight(0xb3b3b3);

    view.light4 = new THREE.DirectionalLight(0xFFFFFF, .7);
    view.light4.position.set(100, 100, 100);

    view.light5 = new THREE.DirectionalLight(0xFFFFFF, .7);
    view.light5.position.set(-100, -100, -100);

    view.scene.add(view.ambientLight);
    view.scene.add(view.light4);
    view.scene.add(view.light5);

    view.clock = new THREE.Clock();
    view.renderer.render(view.scene, view.camera);

}

view.loadStlTeeth = function() {
    var oStlLoader = new THREE.STLLoader();
    oStlLoader.load('models/Teeth2.stl', function(geometry) {
        var material = new THREE.MeshPhongMaterial({
            transparent: true,
            opacity: 1,
            color: 0xFFFFFF,
            specular: 0x6E23BB,
            shininess: 20
        });
        var mesh = new THREE.Mesh(geometry, material);
        mesh.position.y = 50;
        //mesh.rotate.x = 90 * Math.PI / 180;
        view.object1 = new THREE.Object3D();
        view.object1.add(mesh);
        view.object1.rotation.x = -90 * Math.PI / 180;
        view.scene.add(view.object1);
    });
}

view.loadStlMounds = function() {
    var oStlLoader = new THREE.STLLoader();
    oStlLoader.load('models/Mounds.stl', function(geometry) {
        var material = new THREE.MeshPhongMaterial({
            transparent: true,
            opacity: 1,
            color: 0x99ebff,
            specular: 0xFFFFFF,
            shininess: 10,
        });
        var mesh = new THREE.Mesh(geometry, material);
        mesh.position.y = 50;

        view.object3 = new THREE.Object3D();
        view.object3.add(mesh);
        view.object3.rotation.x = -90 * Math.PI / 180;
        view.scene.add(view.object3);
    });
}

view.render = function() {

    if (document.documentElement.clientWidth < 450) {

        data.cwidth = 275;
        data.cheight = 275;
    }
    if (document.documentElement.clientWidth > 450) {
        data.cwidth = 300;
        data.cheight = 300;
    }
    if (document.documentElement.clientWidth > 550) {
        data.cwidth = 300;
        data.cheight = 300;
    }
    if (document.documentElement.clientWidth > 650) {
        data.cwidth = 300;
        data.cheight = 300;
    }
    if (document.documentElement.clientWidth > 768) {
        data.cwidth = 500;
        data.cheight = 500;
    }

    //view.cameraControls.target.set(0, 0, 0); //this changes the axis of rotation!!

    //view.camera.translateX(0.1, 0, 0);
    //view.camera.translateY(view.focusX, view.focusY, 0);
    view.camera.zoom = view.zoom / 2;
    view.camera.updateProjectionMatrix();
    view.renderer.setSize(data.cwidth, data.cheight);
    view.renderer.setClearColor(0x000000, 0);

    if (view.currPat.patId !== null) {
        var container = document.getElementById('#d-contain');
        var child = document.getElementsByTagName('CANVAS');
        $('#d-contain').remove('canvas');
        $('#d-contain').append(view.renderer.domElement);
    } else {
        var container = document.getElementById('#image-contain');
        var child = document.getElementsByTagName('canvas');
        $('#image-contain').remove('canvas');
        $('#image-contain').append(view.renderer.domElement);
    }


    var delta = view.clock.getDelta();
    view.cameraControls.update(delta);
    //view.cameraControls.noZoom = false;
    view.renderer.render(view.scene, view.camera);
    view.diff = view.diff + delta;


    view.renderer.render(view.scene, view.camera);
    view.renderr = view.renderr + 1;
    //console.log('render' + view.renderr);


    view.killAnim = window.requestAnimationFrame(view.render);
    //$('#image-contain').show();
    //$('canvas').show();
}

view.stopAnimate = function() {
    console.log('stop');
    cancelAnimationFrame(view.killAnim);
}

view.startAnimation = function() {
    console.log('start');
    view.render();
}

view.setFocalPoint = function(e) {
    $('canvas').click(function(e) { //Default mouse Position
        alert(e.pageX + ' , ' + e.pageY);
    });

    $('#B').click(function(e) { //Offset mouse Position
        var posX = $(this).offset().left,
            posY = $(this).offset().top;
        alert((e.pageX - posX) + ' , ' + (e.pageY - posY));
    });

    $('#C').click(function(e) { //Relative ( to its parent) mouse position
        var posX = $(this).position().left,
            posY = $(this).position().top;
        alert((e.pageX - posX) + ' , ' + (e.pageY - posY));
    });
}

view.fileName = '';
view.patId = null;
view.currUser.uid = null;
view.patId = null;
view.currUser.uid = null;
view.currPat.patId = null;
view.currPatName = null;
view.fileName = null;
view.currFileUrl = null;
view.currUser.email = null;

view.hideAll = function() {
    $('.main-contain').hide();
    $('#image-contain').hide();
    $('.nuFormContain').hide();
    $('.logInFormContain').hide();
    $('#resetPassword').hide();
    $('#changePass').hide();
    $('#changeEmail').hide();
    $('.np-head').hide();
    $('.chart').hide();
    $('.frame').hide();
    $('.admin-contain').hide();
    $('.user-account-contain').hide();
    $('.pat-chart-subtitle').hide();
    $('.editAccount').hide();
    $('.docDash').hide();
    $('.upload-here').hide();
    $('.note-contain').hide();
    $('.xray').hide();
    $('.appliance').hide();
    $('.product').hide();
    $('.toggle-status').hide();
    $('#d-contain').empty();
};

view.test = function() {
    //document.getElementById('fileType').selectedIndex = "-1";
    //var x = document.getElementById('fileType').selectedIndex; //returns the selected index value
    var fileType = $('#fileType').val(2);
    console.log(fileType);
    ///alert("Index: " + y[x].index + " is " + y[x].text);
}

view.evalUpload = function(url) {
    console.log(url);
    var fileUrl = url;
    var fileName = '';
    var fileIndex = document.getElementById('select-file-name').selectedIndex;
    switch (fileIndex) {
        case 0:
            fileName = null;
            break;
        case 1:
            fileName = 'Upper-scan-1';
            break;
        case 2:
            fileName = 'Upper-scan-2';
            break;
        case 3:
            fileName = 'Lower-scan-1';
            break;
        case 4:
            fileName = 'Lower-scan-2';
            break;
        case 5:
            fileName = 'Panoramic-1';
            break;
        case 6:
            fileName = 'Panoramic-2';
            break;
        case 7:
            fileName = 'Ceph-1';
            break;
        case 8:
            fileName = 'Ceph-2';
            break;
        case 9:
            fileName = 'Setup-1-upper';
            break;
        case 10:
            fileName = 'Setup-1-lower';
            break;
        case 1:
            fileName = 'Setup-2';
            break;
        case 12:
            fileName = 'Setup-3';
            break;
        case 13:
            fileName = 'Setup-4';
            break;
    }
    if (fileName === '' || fileName === null || fileName === undefined) {
        console.log(fileName);
        return $('#no-pat-sel').text('You must select a name before uploading a file');
    } else {
        console.log(fileUrl);
        view.fileName = fileName;
        view.addEventFile(fileName, fileUrl);
    }
}


view.addEventFile = function(fileName, fileUrl) {
    var uid = view.currUser.uid;
    var patid = view.currPat.patId;
    var date = view.getTime();
    var url = fileUrl; // this is a ko.observable !!
    // next create an event called 'Date Submitted" for the patient


    var ref = view.dataRef.child('patients').child(patid).child('events');
    var subject = 'OrthoCure: file uploaded successfully';
    var email2 = 'info@orthocure.biz';
    var content = 'A new file named "' + view.fileName + '"" was upload to your account ' + view.currUser.email + ' for patient: ' + view.currPat.patId + '\nwww.orthocure.biz';
    var eventID = ref.push({
        // 'ref.push' automatically creates an id that I store in pushId and is used to access the created date
        // this also saves the patId to Firebase/patients
        date: date,
        name: fileName,
        data: url,
        status: 'Waiting for setup'
    }, function(error) {
        if (error) {
            alert("File could not be saved." + error);
            $('.upload-here').hide();
            //
        } else {
            view.sendEmail(view.currUser.email, email2, subject, content);
            alert("File uploaded successfully.");
            $('.upload-here').hide();
            //
        }
    })

    view.selectFileNameFirst(view.currPat.patId);
}

view.getTime = function() {
    var d = new Date();
    return d.toJSON();
}

view.savePatientInfov2 = function() {
    view.currPat = {}; // delete the current patient
    view.currPat.patId = null;

    var first = document.getElementById("patFirstName").value;
    var last = document.getElementById("patLastName").value;
    var dob = document.getElementById("patDob").value;
    var date = view.getTime();

    console.log(first + last + dob);
    view.currPat.lastName = last;
    view.currPat.firstName = first;
    view.currPat.fullName = first + ' ' + last;

    if (view.currUser.uid === null || view.currUser.uid === '') {
        view.clearField();
        return alert("You must first create an account and login before adding a patient.");
    }

    if (first === '' || first === null || first === undefined || first === 'firstName') {
        view.resetAllForms();
        return alert('You must enter a first name');
    }
    if (last === '' || last === null || last === undefined || last === 'lastName') {
        view.resetAllForms();
        return alert('You must enter a last name');
    }
    if (dob === '' || dob === null || dob === undefined || dob === 'DOB') {
        view.resetAllForms();
        return alert('You must enter a DOB');
    }

    view.spinner = new Spinner().spin(view.spinTarget);

    //TODO:  add doctor's name/id to the patient
    var ref = view.dataRef.child('patients');

    var patID = ref.push({
        // 'ref.push' automatically creates an id that I store in patPush and is used to access the patient name
        // this also saves the patId to Firebase/patients
        patFirstName: first,
        patLastName: last,
        patDob: dob,
        events: ''
    }, function(error) {
        if (error) {
            $('#empty').empty();
            alert("Data could not be saved." + error);
            //
        } else {
            //view.currPat.patId = patPush.key(); // this doesn't work bc out of scope....not sure why
            //
            $('#mySpinner').empty();
            alert("New Patient created successfully. Please see your patient list.");
            
        }
    });
   //
    var pid = patID.key();

    // next create an event called 'Date Submitted" for the patient
    var ref = view.dataRef.child('patients').child(pid).child('events');

    view.spinner = new Spinner().spin(view.spinTarget);

    var eventID = ref.push({
        // 'ref.push' automatically creates an id that I store in pushId and is used to access the created date
        // this also saves the patId to Firebase/patients
        date: date,
        name: 'NewPatient',
        data: '',
        status: ''
    }, function(error) {
        if (error) {
            $('#mySpinner').empty();
            alert("Data could not be saved." + error);
            //
        } else {
            $('#mySpinner').empty();
            //view.currPat.patId = patPush.key(); // this doesn't work bc out of scope....not sure why
            //alert("Data saved successfully.");
            //
        }
    })
    view.currPat.patId = patID.key(); // do not move this inside the success function bc out of scope..

    // Now we must save the patient's info in the Doctor's database as well
    var uid = view.currUser.uid; // use this for the 'var ref = ' bc it doesn't like the '.'
    var patId = view.currPat.patId; // use this for the 'var ref = ' bc it doesn't like the '.'

    view.spinner = new Spinner().spin(view.spinTarget);

    var ref = view.dataRef.child('users').child(uid).child('patList');
    var patPushUser = ref.push({
        patFirstName: first,
        patLastName: last,
        patId: patId
    }, function(error) {
        //save the patId to Firebase/users/uid/patList
        if (error) {
            $('#mySpinner').empty();
            //alert("Data could not be saved." + error);
            $('.np-success').append('<div style="color: red; font-size: 1em">Data could not be saved. Please try again.</div>');
            //
            setTimeout(function() {
                $('.np-success').empty();
            }, 3000);
            view.resetAllForms();

        } else {
            $('#mySpinner').empty();
            //console.log('testing success');
            //alert("Data saved successfully.");
            $('.np-success').text('New patient created successfully: ' + first + ' ' + last + ' ' + 'DOB: ' + dob);
            $('.np-success').append('<div class="np-success2>Click on Patients to view your updated patient list</div>');
            //
            setTimeout(function() {
                $('.np-success').empty();
                $('.np-success').text('');
            }, 3000);
            view.hideAll();
            $('.pat-list-contain').show();
            $('.docDash').show();
            view.resetAllForms();
        }
    })

    // create email response for the new patient event
    var subject = 'New OrthoCure patient submitted';
    var content = 'Thank you!\nDate/Time: ' + date + '\nNew patient ' + view.currPat.patId + ' was submitted to your OrthoCure account (' + view.currUser.email + '). \nWe look forward to working with you.\nwww.orthocure.biz';
    var email2 = 'info@orthocure.biz';
    view.sendEmail(view.currUser.email, email2, subject, content);


    $('.patient').empty(); // delete everything on the patient list page so you don't add doubles.. start fresh
    $('.selectedPat').empty(); // delete the currpatient displayed on the header
    $('.selectedPat').text(view.currPatName);

    //view.userMainFx();
    view.updateDisplay();
    view.updateUser(view.currUser.uid, view.currUser.password);
    //
}

view.currUser.password = null;
// create a new user by requesting their email and a password.
view.newUserFx = function() {

    var first = document.getElementById("firstName").value;
    if (first === '' || first === null || first === undefined || first === 'first name') {
        return alert('You must enter a first name.');
    }
    var last = document.getElementById("lastName").value;
    if (last === '' || last === null || last === undefined || last === 'last name') {
        return alert('You must enter a last name.');
    }
    var add = document.getElementById("billAddress").value;
    if (add === '' || add === null || add === undefined || add === 'billing address') {
        return alert('You must enter an office address.');
    }
    var city = document.getElementById("billCity").value;
    if (city === '' || city === null || city === undefined || city === 'bill City') {
        return alert('You must enter a city.');
    }
    var st = document.getElementById("billState").value;
    if (st === '' || st === null || st === undefined || st === 'billState') {
        return alert('You must enter a state.');
    }
    var zip = document.getElementById("billZip").value;
    if (zip === '' || zip === null || zip === undefined || zip === 'billZip') {
        return alert('You must enter a zip code.');
    }
    var op = document.getElementById("phone").value;
    if (op === '' || op === null || op === undefined || op === 'office phone') {
        return alert('You must enter a office phone number.');
    }
    var mp = document.getElementById("phone2").value;
    if (mp === '' || mp === null || mp === undefined || mp === 'mobile phone') {
        return alert('You must enter a mobile phone number.');
    }
    var email = document.getElementById("nuemail").value;
    if (email === '' || email === null || email === undefined || email === 'email') {
        return alert('You must enter a email.');
    }
    var pass = document.getElementById("nupassword").value;
    if (pass === '' || pass === null || pass === undefined || pass === 'password') {
        return alert('You must enter a password.');
    }


    var add2 = document.getElementById("shipAddress").value;
    if (add2 === '' || add === null || add === undefined || add === 'ship address') {
        return alert('You must enter an office bill address.');
    }
    var city2 = document.getElementById("shipCity").value;
    if (city2 === '' || city === null || city === undefined || city === 'ship City') {
        return alert('You must enter a ship city.');
    }
    var st2 = document.getElementById("shipState").value;
    if (st2 === '' || st === null || st === undefined || st === 'shipState') {
        return alert('You must enter a ship state.');
    }
    var zip2 = document.getElementById("shipZip").value;
    if (zip2 === '' || zip === null || zip === undefined || zip === 'shipZip') {
        return alert('You must enter a ship zip code.');
    }


    view.currUser.email = document.getElementById("nuemail").value;
    view.currUser.password = document.getElementById("nupassword").value;
    //var userEmail = view.currUser.email;
    //var email2 = 'info@orthocure.biz';
    view.spinner = new Spinner().spin(view.spinTarget);

    view.dataRef.createUser({
        email: view.currUser.email,
        password: view.currUser.password
    }, function(error, userData) {
        if (error) {
            //
            console.log('failed to create user');
            $('.new-user-fail').empty();
            $('.new-user-fail').append('<div class="nuFail" style="color: red">Error creating new user. Please try a different email address.</div>');
            setTimeout(function() { // create a pause then erase success message
                $('.new-user-fail').empty();
            }, 7000);
            view.currUser.email = null;
            view.currUser.password = null;
            view.currUser.uid = null;

        } else {
            // create email response for the new patient event
            //
            $('#mySpinner').empty();
            var email2 = 'support@orthocure.biz';
            var subject = 'Welcome to OrthoCure!';
            var content = 'Thank you for registering as an OrthoCure provider.\nWe look forward to working with you.\nusername = ' + view.currUser.email + '\nPassword = ' + view.currUser.password + '\nwww.orthocure.biz';
            view.sendEmail(view.currUser.email, email2, subject, content);
            view.currUser.uid = userData.uid;
            view.addInitialData();
            
            view.hideAll();
            //$('.logInFormContain').show();
        }
    });
    $('#mySpinner').empty();
}

view.resetAllForms = function() {
    firstName.value = firstName.defaultValue;
    //document.getElementById("firstName").backgroundColor = 'hsl(200,0%,95%)';
    lastName.value = lastName.defaultValue;
    billAddress.value = billAddress.defaultValue;
    billCity.value = billCity.defaultValue;
    billState.value = billState.defaultValue;
    billZip.value = billZip.defaultValue;
    shipAddress.value = shipAddress.defaultValue;
    shipCity.value = shipCity.defaultValue;
    shipState.value = shipState.defaultValue;
    shipZip.value = shipZip.defaultValue;
    phone.value = phone.defaultValue;
    phone2.value = phone2.defaultValue;
    nuemail.value = nuemail.defaultValue;
    nupassword.value = nupassword.defaultValue;

    patFirstName.value = patFirstName.defaultValue;
    patLastName.value = patLastName.defaultValue;
    patDob.value = patDob.defaultValue;

    changeEmailPassword.value = changeEmailPassword.defaultValue;
    changeEmailEmailNew.value = changeEmailEmailNew.defaultValue;
    changeEmailEmailOld.value = changeEmailEmailOld.defaultValue;
    changePassEmail.value = changePassEmail.defaultValue;
    changePassNewPass.value = changePassNewPass.defaultValue;
    changePassOldPass.value = changePassOldPass.defaultValue;
    resetPasswordEmail.value = resetPasswordEmail.defaultValue;

    loginEmail.value = loginEmail.defaultValue;
    loginPassword.value = loginPassword.defaultValue;

}

view.addInitialData = function() {
    var uid = view.currUser.uid;
    var ref = view.dataRef.child('users').child(uid);

    view.spinner = new Spinner().spin(view.spinTarget);

    // record all the users info to the database
    //Below adds data properly DO NOT DELETE ********************
    ref.set({
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        billAddress: document.getElementById("billAddress").value,
        billCity: document.getElementById("billCity").value,
        billState: document.getElementById("billState").value,
        billZip: document.getElementById("billZip").value,
        shipAddress: document.getElementById("shipAddress").value,
        shipCity: document.getElementById("shipCity").value,
        shipState: document.getElementById("shipState").value,
        shipZip: document.getElementById("shipZip").value,
        officePhone: document.getElementById("phone").value,
        mobilePhone: document.getElementById("phone2").value,
        email: document.getElementById("nuemail").value,
        password: document.getElementById("nupassword").value,
        uid: view.currUser.uid
    }, function(error) {
        if (error) {
            $('#mySpinner').empty();

            var ref = view.dataRef;

            ref.removeUser({
                email: view.currUser.email,
                password: view.currUser.password
            }, function(error) {
                if (error === null) {

                    $('#mySpinner').empty();
                    $('.new-user-fail').append('<div class="nuFail" style="color: red">User removed successfully. User account was not created. Please try again.</div>');
                    setTimeout(function() { // create a pause then erase success message
                    $('.new-user-fail').empty();
                    }, 7000);
                } else {
                    $('#mySpinner').empty();
                    Alert("User account was not created and there was an error removing user from the database.", error);
                }
            });


            alert('Sorry...failed to create new user. Please try again or contact support via support@orthocure.biz');
            $('.new-user-fail').append('<div class="nuFail" style="color: red">Error creating new user. Please try again.</div>');
            setTimeout(function() { // create a pause then erase success message
                $('.new-user-fail').empty();
            }, 5000);
            view.currUser.email = null;
            view.currUser.password = null;
            view.currUser.uid = null;
        } else {

            $('#mySpinner').empty();

            alert('Success creating new user!');
            $('.new-user-fail').append('<div class="nuSuccess" style="color: green">Success. Confirmation email sent.</div>');
            // create email response for the new patient event
            setTimeout(function() { // create a pause then erase success message
                $('.new-user-fail').empty();
            }, 5000);
            view.resetAllForms();
            view.hideAll();
            view.updateUser();
        }
    })

}

view.content = 'Please confirm the accuracy of your updated contact information:  ';

view.updateContact = function(item) {
    if (item === true) {
        alert('Please check your email to verify the accuracy of your contact information. Or, logout and then log back in to verify the information is updated correctly.');
        setTimeout(function() { // create a pause then erase success message
            var userEmail = view.currUser.email;
            var email2 = 'info@orthocure.biz';
            var subject = 'OrthoCure: updated contact information';
            console.log(view.content);
            var stuff = view.content + '\nwww.orthocure.biz';
            console.log(stuff);
            view.sendEmail(userEmail, email2, subject, stuff);
            view.content = 'Please confirm the accuracy of your updated contact information:  ';
        }, 1000);
    } else {
        view.content += item;
        console.log(view.content);
    }
}

view.addupdatedData = function() {

    if (view.currUser === null || view.currUser === '' || view.currUser === undefined) {
        return alert('You must login before updating your account information.');
    } else {
        var uid = view.currUser.uid;
    }

    var ref = view.dataRef.child('users').child(uid);

    var ebillAdd = document.getElementById("ebillAddress").value;
    var deFault = document.getElementById("ebillAddress").defaultValue;

    if (ebillAdd !== '' || ebillAdd !== null || ebillAdd !== undefined || ebillAdd !== deFault) {
        ref.update({
            billAddress: ebillAdd
        }, function(error) {
            if (error) {
                var item = '\nbilling address: update FAILED';
                view.updateContact(item);

                $('.update-user-fail').append('<div class="update-fail" style="color: red">Error creating new user. Please try again.</div>');
                setTimeout(function() { // create a pause then erase success message
                    $('.update-user-fail').empty();
                }, 3000);
            } else {
                var item = '\nbilling address: ' + ebillAdd;
                view.updateContact(item);
                //$('.update-user-fail').append('<div class="update-success" style="color: green">Success. Billing address updated.</div>');
                // create email response for the new patient event
                setTimeout(function() { // create a pause then erase success message
                    $('.update-user-fail').empty();
                }, 3000);

            }
        })
    }

    var ebillCity = document.getElementById("ebillCity").value;
    var deFault = document.getElementById("ebillCity").defaultValue;

    if (ebillCity !== '' || ebillCity !== null || ebillCity !== undefined || ebillCity === deFault) {
        ref.update({
            billCity: ebillCity
        }, function(error) {
            if (error) {
                var item = '\nbilling city: update FAILED';
                view.updateContact(item);

                $('.update-user-fail').append('<div class="update-fail" style="color: red">Error creating new user. Please try again.</div>');
                setTimeout(function() { // create a pause then erase success message
                    $('.update-user-fail').empty();
                }, 3000);
            } else {
                var item = '\nbilling city: ' + ebillCity;
                view.updateContact(item);
                //$('.update-user-fail').append('<div class="update-success" style="color: green">Success. Confirmation email sent.</div>');
                // create email response for the new patient event
                setTimeout(function() { // create a pause then erase success message
                    $('.update-user-fail').empty();
                }, 3000);

            }
        })
    }

    var ebillState = document.getElementById("ebillState").value;
    var deFault = document.getElementById("ebillState").defaultValue;

    if (ebillState !== '' || ebillState !== null || ebillState !== undefined || ebillState === deFault) {
        ref.update({
            billState: ebillState
        }, function(error) {
            if (error) {
                var item = '\nbilling state: update FAILED';
                view.updateContact(item);

                $('.update-user-fail').append('<div class="update-fail" style="color: red">Error creating new user. Please try again.</div>');
                setTimeout(function() { // create a pause then erase success message
                    $('.update-user-fail').empty();
                }, 3000);
            } else {
                var item = '\nbilling state: ' + ebillState;
                view.updateContact(item);

                //$('.update-user-fail').append('<div class="update-success" style="color: green">Success. Confirmation email sent.</div>');
                // create email response for the new patient event
                setTimeout(function() { // create a pause then erase success message
                    $('.update-user-fail').empty();
                }, 3000);

            }
        })
    }

    var ebillZip = document.getElementById("ebillZip").value;
    var deFault = document.getElementById("ebillZip").defaultValue;

    if (ebillZip !== '' || ebillZip !== null || ebillZip !== undefined || ebillZip === deFault) {
        ref.update({
            billZip: ebillZip
        }, function(error) {
            if (error) {
                var item = '\nbilling zip: update FAILED';
                view.updateContact(item);

                $('.update-user-fail').append('<div class="update-fail" style="color: red">Error creating new user. Please try again.</div>');
                setTimeout(function() { // create a pause then erase success message
                    $('.update-user-fail').empty();
                }, 3000);
            } else {
                var item = '\nbilling zip: ' + ebillZip;
                view.updateContact(item);

                //$('.update-user-fail').append('<div class="update-success" style="color: green">Success. Confirmation email sent.</div>');
                // create email response for the new patient event
                setTimeout(function() { // create a pause then erase success message
                    $('.update-user-fail').empty();
                }, 3000);

            }
        })
    }

    var eshipAdd = document.getElementById("eshipAddress").value;
    var deFault = document.getElementById("ebillAddress").defaultValue;

    if (eshipAdd !== '' || eshipAdd !== null || eshipAdd !== undefined || eshipAdd !== deFault) {
        ref.update({
            shipAddress: eshipAdd
        }, function(error) {
            if (error) {
                var item = '\nshipping address: update FAILED';
                view.updateContact(item);

                $('.update-user-fail').append('<div class="update-fail" style="color: red">Error creating new user. Please try again.</div>');
                setTimeout(function() { // create a pause then erase success message
                    $('.update-user-fail').empty();
                }, 3000);
            } else {
                var item = '\nshipping address: ' + eshipAdd;
                view.updateContact(item);

                //$('.update-user-fail').append('<div class="update-success" style="color: green">Success. Confirmation email sent.</div>');
                // create email response for the new patient event
                setTimeout(function() { // create a pause then erase success message
                    $('.update-user-fail').empty();
                }, 3000);

            }
        })
    }

    var eshipCity = document.getElementById("eshipCity").value;
    var deFault = document.getElementById("eshipCity").defaultValue;

    if (eshipCity !== '' || eshipCity !== null || eshipCity !== undefined || eshipCity === deFault) {
        ref.update({
            shipCity: eshipCity
        }, function(error) {
            if (error) {
                var item = '\nshipping city: update FAILED';
                view.updateContact(item);
                $('.update-user-fail').append('<div class="update-fail" style="color: red">Error creating new user. Please try again.</div>');
                setTimeout(function() { // create a pause then erase success message
                    $('.update-user-fail').empty();
                }, 3000);
            } else {
                var item = '\nshipping city: ' + eshipCity;
                view.updateContact(item);

                //$('.update-user-fail').append('<div class="update-success" style="color: green">Success. Confirmation email sent.</div>');
                // create email response for the new patient event
                setTimeout(function() { // create a pause then erase success message
                    $('.update-user-fail').empty();
                }, 3000);

            }
        })
    }

    var eshipState = document.getElementById("eshipState").value;
    var deFault = document.getElementById("eshipState").defaultValue;

    if (eshipState !== '' || eshipState !== null || eshipState !== undefined || eshipState === deFault) {
        ref.update({
            shipState: eshipState
        }, function(error) {
            if (error) {
                var item = '\nshipping state: update FAILED';
                view.updateContact(item);

                $('.update-user-fail').append('<div class="update-fail" style="color: red">Error creating new user. Please try again.</div>');
                setTimeout(function() { // create a pause then erase success message
                    $('.update-user-fail').empty();
                }, 3000);
            } else {
                var item = '\nshipping state: ' + eshipState;
                view.updateContact(item);

                //$('.update-user-fail').append('<div class="update-success" style="color: green">Success. Confirmation email sent.</div>');
                // create email response for the new patient event
                setTimeout(function() { // create a pause then erase success message
                    $('.update-user-fail').empty();
                }, 3000);

            }
        })
    }

    var eshipZip = document.getElementById("eshipZip").value;
    var deFault = document.getElementById("eshipZip").defaultValue;

    if (eshipZip !== '' || eshipZip !== null || eshipZip !== undefined || eshipZip === deFault) {
        ref.update({
            shipZip: eshipZip
        }, function(error) {
            if (error) {
                var item = '\nshipping zip: update FAILED';
                view.updateContact(item);
                $('.update-user-fail').append('<div class="update-fail" style="color: red">Error creating new user. Please try again.</div>');
                setTimeout(function() { // create a pause then erase success message
                    $('.update-user-fail').empty();
                }, 3000);
            } else {
                var item = '\nshipping zip: ' + eshipZip;
                view.updateContact(item);

                //$('.update-user-fail').append('<div class="update-success" style="color: green">Success. Confirmation email sent.</div>');
                // create email response for the new patient event
                setTimeout(function() { // create a pause then erase success message
                    $('.update-user-fail').empty();
                }, 3000);

            }
        })
    }

    var ephone = document.getElementById("ephone").value;
    var deFault = document.getElementById("ephone").defaultValue;

    if (ephone !== '' || ephone !== null || ephone !== undefined || ephone !== deFault) {
        ref.update({
            officePhone: ephone
        }, function(error) {
            if (error) {
                var item = '\noffice phone: update FAILED';
                view.updateContact(item);
                $('.update-user-fail').append('<div class="update-fail" style="color: red">Error creating new user. Please try again.</div>');
                setTimeout(function() { // create a pause then erase success message
                    $('.update-user-fail').empty();
                }, 3000);
            } else {
                var item = '\noffice phone: ' + ephone;
                view.updateContact(item);

                //$('.update-user-fail').append('<div class="update-success" style="color: green">Success. Confirmation email sent.</div>');
                // create email response for the new patient event
                setTimeout(function() { // create a pause then erase success message
                    $('.update-user-fail').empty();
                }, 3000);

            }
        })
    }

    var ephone2 = document.getElementById("ephone2").value;
    var deFault = document.getElementById("ephone2").defaultValue;

    if (ephone2 !== '' || ephone2 !== null || ephone2 !== undefined || ephone2 !== deFault) {


        ref.update({
            mobilePhone: ephone2
        }, function(error) {
            if (error) {
                //
                var item = '\nmobile phone: update FAILED';
                view.updateContact(item);

                $('.update-user-fail').append('<div class="update-fail" style="color: red">Error creating new user. Please try again.</div>');
                setTimeout(function() { // create a pause then erase success message
                    $('.update-user-fail').empty();
                }, 3000);
            } else {
                //
                var item = '\nmobile phone: ' + ephone2;
                view.updateContact(item);

                //$('.update-user-fail').append('<div class="update-success" style="color: green">Success. Confirmation email sent.</div>');
                // create email response for the new patient event
                setTimeout(function() { // create a pause then erase success message
                    $('.update-user-fail').empty();
                }, 3000);

            }
        })
        var finished = true;
        view.updateContact(finished);
    }
}

view.authData = '';

view.setCurrUser = function(id) {
    view.currUser.uid = id;
}

view.isUserAdmin = function(id) {
    if (id === '926f0819-2d69-4bef-a5b2-25a7c136abda') {
        view.isAdmin = true;
    } else {
        view.isAdmin = false;
    }
}

view.createAdminInterface = function() {
    console.log('createAdminInterface');
    view.doctorList(); // create a doctor list so that can click on a doctor to see his patients and do all the same stuff.
    // add function to upload the setup files and tray files --> autosend the first email
    //view.sendEmailUpdate(); // show a list of all setups waiting for approval ---> send email to all

}

view.currDocName = '';

view.doctorList = function(uid) {


    var ref = view.dataRef.child('users');
    var read = ref.once("value", function(snapshot) {
        var docIds = snapshot.val();
        $('.admin-contain').show();
        $('.doctor-list').empty();
        

        for (w in docIds) {


            //create the doctor list
            $('.doctor-list').append('<div id="' + w + '" class="doc-list-item">Dr. ' + docIds[w].firstName + ' ' + docIds[w].lastName + ' ' + docIds[w].email + ' ' + 'mobile: ' + docIds[w].mobilePhone + ' ' + 'office: ' + docIds[w].officePhone + ' ' + docIds[w].address + ' ' + docIds[w].city + ' ' + docIds[w].state + ' ' + docIds[w].zip + '</div>');
            for (v in docIds[w].patList) {
                $('#' + w).append('<div id="' + docIds[w].patList[v].patId + '" class="doc-pat-list-item" style="padding-left: 20px">' + docIds[w].patList[v].patFirstName + ' ' + docIds[w].patList[v].patLastName + ' ' + docIds[w].patList[v].patId + '</div>');
            }
        }

        $('.doc-pat-list-item').click(function() {
            $(window).scrollTop($('.chart').offset().top - 0);
            var id = this.id;
            view.selectFileNameFirst(id);

            //view.resetCurrUser(this.id);
        })
        $('.doc-list-item').click(function() {
            var id = this.id;
            var ref = view.dataRef.child('users');
            var read = ref.once("value", function(snapshot) {
                var docIds = snapshot.val();

                for (var w in docIds) {
                    if (w === id) {

                        view.resetCurrUser(w, docIds[w].email, docIds[w].firstName, docIds[w].lastName);
                    }
                }
            });
        })
    }, function(errorObject) {
        //
            alert("The read failed: Please contact support@orthocure.biz" + errorObject.code);
    })
}

view.resetCurrUser = function(id, email, first, last) {
    view.currUser = {};
    view.currUser.uid = id;
    view.currUser.email = email;
    view.currDocName = first + ' ' + last + ': at ' + view.currUser.email;
    view.tempObject.uid = id;//keep this for view.updateUser()
    view.updateUser(view.currUser.uid);
    //view.userMainFx();
}

view.currEvents = '';

view.escScope = function(escapee1, escapee2, escapee3) {
    view.currEvents = escapee1;
    //onsole.log(view.currEvents);
}

view.evalEvent = function(eventId, name) {

    var patId = view.currPat.patId;
    var eid = eventId;
    var name = '';
    var status = '';
    view.currEventId = eventId;
    view.currEvent.id = eventId;

     view.spinner = new Spinner().spin(view.spinTarget);

    var ref2 = view.dataRef.child('patients').child(patId).child('events').child(eid);
    ref2.once('value', function(snapshot) {
            var myEvent = snapshot.val();
            //
            name = myEvent.name;
            status = myEvent.status;
            var url = myEvent.data;

            if (name === 'Upper-scan-1' || name === 'Upper-scan-2' || name === 'Lower-scan-1' || name === 'Lower-scan-2' || name === 'Setup-1-upper' || name === 'Setup-1-lower' || name === 'Setup-2-upper' || name === 'Setup-2-lower' || name === 'Setup-3-upper' || name === 'Setup-3-lower' || name === 'Setup-4-upper' || name === 'Setup-4-lower') {
                view.renderFile(name, eid);
            } else if (name === 'Panoramic-1' || name === 'Panoramic-2' || name === 'Panoramic-3' || name === 'Panoramic-4' || name === 'Ceph-1' || name === 'Ceph-2' || name === 'Ceph-3' || name === 'Ceph-4') {
                view.showXray(name, url);
            } else {
                return null;
            }

            if (status === 'Needs your approval') {
                $('.approve-but').show();
            }
            view.spinner.stop();
        },
        function(errorObject) {
            view.spinner.stop();
            alert("The read failed: Please contact support@orthocure.biz" + errorObject.code);
        }
    )
    /*setTimeout(function() { // create a pause then erase success message
        $(window).scrollTop($(".frame").offset().top - 100);
    }, 300);
*/
}


view.showXray = function(name, url) {
    console.log(url);
    $('.xray').empty();
    $('.xray').html('<div class="xrayImage"><img src="' + url + '"></div>');
    view.hideAll();
    $('.xray').show();
}



 

view.renderFile = function(fileName, eventId) {
    var name = fileName;
    $('#d-contain').empty();
    $('.chart').hide();
    $('.canvas-text').text(name);
    if (view.isAdmin === true) {
        $('.toggle-status').show(); // for the admin
    }
    $('.frame').show();
    $(window).scrollTop($('.frame').offset().top - 100);
    view.init();

    var patId = view.currPat.patId; // confirmed that this is the string patId

    // Start new

    
    view.spinner = new Spinner().spin(view.spinTarget);
    

    var refNew = view.dataRef.child('patients').child(patId).child('events').child(eventId);
    refNew.once('value', function(snapshot) {
        var eventObject = snapshot.val();
        var url = eventObject.data;
        //
        view.downloadStl(patId, url, name);
        

    }, function(errorObject) {
        //
        $('#mySpinner').empty();
        alert("The read failed: Please contact support@orthocure.biz" + errorObject.code);
    })

}

view.downloadStl = function(patId, url, fileName) {
    //var url = view.currFileUrl;
    //console.log(url);


    view.stl = new THREE.Object3D();
    var oStlLoader = new THREE.STLLoader();
    oStlLoader.load(url, function(geometry) {
        
        var material = new THREE.MeshPhongMaterial({
            transparent: true,
            opacity: 1,
            color: 0xFFFFFF,
            specular: 0x6E23BB,
            shininess: 20
        });
        var mesh = new THREE.Mesh(geometry, material);
        // setup model orientation is different than the regular emodles, so fix that here or it will not display well on site.
        if (fileName === 'Setup-1-upper' || fileName === 'Setup-1-lower' || fileName === 'Setup-2-upper' || fileName === 'Setup-2-lower' || fileName === 'Setup-3-upper' || fileName === 'Setup-3-lower' || fileName === 'Setup-4-upper' || fileName === 'Setup-4-lower') {
            mesh.position.y = 65;
            mesh.position.x = 0;

        } else {
            mesh.position.y = 25;
        }

        //view.stl = new THREE.Object3D();
        view.stl.add(mesh);
        view.stl.rotation.x = -90 * Math.PI / 180;
        view.scene.add(view.stl);
        $('#mySpinner').empty();//Do not remove this. It stops the spinner at the right time.
        
    });

    //document.getElementById('#select-file-name').value(null); // clear the name choice and reset to blank
    $('.fp__btn').hide(); // hide the button again until user selects a name.

    //view.downloadPatFileName(patId);
    //view.scrollToUpload();
    view.startNewAnimate();
    
}

view.eventFlag = 'hidden'

view.showHidden = function(patId) {
    if (view.eventFlag === 'hidden') {
        $('.pat-list-contain').hide(); // do not delete bc view.hideAll takes too long to work.
        view.hideAll();
        $('.chart').show();
        $('#d-contain').empty();
        $('#image-contain').empty();

        view.currPat.patId = patId; // id really is the patient id
        var temp = patId;
        var temp2 = '';
        var ref = view.dataRef.child('patients').child(patId);
        var ref2 = view.dataRef.child('patients').child(patId).child('events');


        ref.once('value', function(snapshot) {
                temp2 = snapshot.val();
                view.currPatName = temp2.patFirstName + ' ' + temp2.patLastName;
                $('.selectedPat').remove();

                $('.pat-events').empty();
                //

                ref2.once('value', function(snapshot) { // iterate through events and display each event
                        var eventIDs = snapshot.val();

                        for (w in eventIDs) {

                            view.currEvents[w] = eventIDs[w]; // create an object called view.currEvents containing all the patient's events accessed via using the eventID(w) as the key.

                            $('.pat-events').append('<div id="' + w + '" class="event-box" onclick="view.evalEvent(this.id)"></div>');

                            var dateFormatted = String(eventIDs[w].date).slice(0, 10);

                            $('#' + w).append('<div class="pat-event-date">' + dateFormatted + '</div>');

                            $('#' + w).append('<div class="pat-event-name">' + eventIDs[w].name + '</div>');

                            if (eventIDs[w].status === 'Waiting for setup') {
                                $('#' + w).append('<div style="color: hsl(230, 100%, 30%)" class="pat-event-status">' + eventIDs[w].status + '</div>'); // style only the element with the correct event id as the id
                            } else if (eventIDs[w].status === 'Needs your approval') {
                                $('#' + w).append('<div style="color: hsl(1,100%,40%)" class="pat-event-status">' + eventIDs[w].status + '</div>');
                            } else if (eventIDs[w].status === 'Setup approved') {
                                $('#' + w).append('<div style="color: hsl(130,90%,40%)" class="pat-event-status">' + eventIDs[w].status + '</div>');
                            }
                            $('#' + w).append('<div class="pat-event-data">' + eventIDs[w].data + '</div>');
                        }
                        //
                        view.escScope(view.currEvents);
                    },
                    function(errorObject) {
                        //
                        alert("The read failed: Please contact support@orthocure.biz" + errorObject.code);
                    }
                )
            },
            function(errorObject) {
                //
                alert("The read failed: please contact support@orthocure.biz" + errorObject.code);
            }
        )
        view.eventFlag = 'visible'
    } else {
        view.selectFileNameFirst(view.currPat.patId);
        view.eventFlag = 'hidden';
    }
}

view.toggleStatus = function() {
    var patId = view.currPat.patId;
    var eventId = view.currEventId;
    var status = '';


    var ref1 = view.dataRef.child('patients').child(patId).child('events').child(eventId);
    ref1.once('value', function(snapshot) {
        var eventObject = snapshot.val();
        status = eventObject.status;

        if (status === 'Waiting for setup') {
            var ref2 = view.dataRef.child('patients').child(patId).child('events').child(eventId);
            ref2.update({
                status: 'Needs your approval'
            }, function(error) {
                if (error) {
                    alert("Data synch failed" + error);
                } else {
                    //alert("Data saved successfully.");
                }
            })
        } else if (status === 'Needs your approval') {

            var ref3 = view.dataRef.child('patients').child(patId).child('events').child(eventId);
            ref3.update({
                status: 'Setup approved'
            }, function(error) {
                if (error) {
                    alert("Data synch failed" + error);
                } else {
                    //alert("Data saved successfully.");
                }
            })
        } else if (status === 'Setup approved') {

            var ref4 = view.dataRef.child('patients').child(patId).child('events').child(eventId);
            ref4.update({
                status: 'hidden',
            }, function(error) {
                if (error) {
                    alert("Data synch failed" + error);
                } else {
                    //alert("Data saved successfully.");
                }
            })
        } else if (status === 'hidden') {

            var ref4 = view.dataRef.child('patients').child(patId).child('events').child(eventId);
            ref4.update({
                status: 'Waiting for setup',
            }, function(error) {
                if (error) {
                    alert("Data synch failed" + error);
                } else {
                    //alert("Data saved successfully.");
                }
            })
        } else {
            var ref5 = view.dataRef.child('patients').child(patId).child('events').child(eventId);
            ref5.update({
                status: 'Waiting for setup',
            }, function(error) {
                if (error) {
                    alert("Data synch failed" + error);
                } else {
                    //alert("Data saved successfully.");
                }
            })
        }
        //
    }, function(errorObject) {
        //
        alert("The read failed: please contact support@orthocure.biz" + errorObject.code);
    })
    setTimeout(function() { // create a pause to allow the database time to update or the fx will run before it is updated.
        view.selectFileNameFirst(view.currPat.patId);
        view.stopAnimate();

    }, 500);
}

view.approve = function() {
    if (view.isExample === true) {
        alert('Thanks for taking a test spin! This button is disabled for test spin users.');
        return null;
    }
    if (confirm('Are you sure you want to approve this setup?') === true) {

        var patId = view.currPat.patId;
        var eventId = view.currEventId;
        $('.canvas-text').hide(); // hide the text label on the 3D canvas
        $('.canvas-text2').hide();
        $('.approve-but').hide();
        $('.toggle-status').hide(); // for the admin


         view.spinner = new Spinner().spin(view.spinTarget);

        var ref = view.dataRef.child('patients').child(patId).child('events').child(eventId);
        ref.update({
            status: 'Setup approved'
        }, function(error) {
            if (error) {
                view.spinner.stop();
                alert("Data could not be saved." + error);
            } else {
                //alert("Data saved successfully.");
                view.spinner.stop();
            }
        });

        setTimeout(function() { // create a pause to allow the database time to update or the fx will run before it is updated.
            $('#d-contain').empty();
        }, 500);

        view.addEventApprove(eventId); // this fx adds a new event to the patient's database called 'approve event'...
        // below changes the existing status of the 'file event'
    } else {
        return null;
    }
}


view.addEventApprove = function(currEventId) {
    //var uid = view.currUser.uid;
    var eventId = currEventId;
    //var currEventName = view.currEvents[eventId].name;
    var patid = view.currPat.patId;
    var date = view.getTime();
    var currUserEmail = view.currUser.email;
    var note = '';

     view.spinner = new Spinner().spin(view.spinTarget);

    var ref2 = view.dataRef.child('patients').child(patid).child('events').child(eventId);
    ref2.once('value', function(snapshot) {
        var eventObject = snapshot.val();
        view.name = eventObject.name;
        cEvent(view.name);
        view.spinner.stop();
    })
    // created this function only because I am having trouble passing info between these ref. functions the only way it works is by passing function parameters
    var cEvent = function(name) {
        var patid = view.currPat.patId;
        var date = view.getTime();
        var currUserEmail = view.currUser.email;
        var note = '';
        var ref = view.dataRef.child('patients').child(patid).child('events');

         view.spinner = new Spinner().spin(view.spinTarget);

        var newEventId = ref.push({
            // 'ref.push' automatically creates an id that I store in pushId and is used to access the created date
            // this also saves the patId to Firebase/patients
            date: date,
            name: 'Setup_approval',
            data: 'Setup for ' + name + ' approved by ' + currUserEmail,
            status: ''
        }, function(error) {
            if (error) {
                view.spinner.stop();
                alert("Data could not be saved." + error);
            } else {
                //alert("Data saved successfully.");
                view.spinner.stop();
                var email2 = 'info@orthocure.biz';
                var subject = 'OrthoCure: setup approval notice';
                var content = 'Confirmation: ' + date + ' received your setup approval for patient (' + view.currPat.patId + ') file: ' + view.name + '\nwww.orthocure.biz';
                view.sendEmail(view.currUser.email, email2, subject, content);
            }
        })
        setTimeout(function() { // create a pause to allow the database time to update or the fx will run before it is updated.
            view.selectFileNameFirst(view.currPat.patId);
        }, 500);
    }
}

view.addEventNote = function() {
    //var uid = view.currUser.uid;
    if (view.isExample === true) {
        alert('Thanks for taking a test spin! This button is disabled for test spin users.');
        return null;
    }

    view.showNote();

    var patid = view.currPat.patId;
    var date = view.getTime();
    var currUserEmail = view.currUser.email;
    var note = $('#tx-notes').val();

     view.spinner = new Spinner().spin(view.spinTarget);

    var ref = view.dataRef.child('patients').child(patid).child('events');
    ref.push({
        // 'ref.push' automatically creates an id that I store in pushId and is used to access the created date
        // this also saves the patId to Firebase/patients
        date: date,
        name: 'Prescription / Note',
        data: 'Author: ' + currUserEmail + '______' + '"' + note + '"',
        status: ''
    }, function(error) {
        view.spinner.stop();
        if (error) {
            alert("Data could not be saved." + error);
        } else {
            view.spinner.stop();
            alert("Data saved successfully.");
        }
    })

    $('#tx-notes').val('');

    setTimeout(function() { // create a pause to allow the database time to update or the fx will run before it is updated.
        view.selectFileNameFirst(view.currPat.patId);
    }, 500);

}

view.addEventEmailToDoc = function() {
    //var uid = view.currUser.uid;
    view.showNote();

    var patid = view.currPat.patId;
    var date = view.getTime();
    var currUserEmail = view.currUser.email;
    var note = $('#tx-notes').val();

    var ref = view.dataRef.child('patients').child(patid).child('events');
    ref.push({
        // 'ref.push' automatically creates an id that I store in pushId and is used to access the created date
        // this also saves the patId to Firebase/patients
        date: date,
        name: "OC's note to Doctor",
        data: 'Author: support@orthocure.biz: ___' + note,
        status: ''
    }, function(error) {
        if (error) {
            alert("Data could not be saved." + error);
        } else {
            alert("Data saved successfully.");
        }
    })

    $('#tx-notes').val('');

    var email2 = 'info@orthocure.biz';
    var subject = 'OrthoCure: note';
    var content = 'Email/Note sent to: ' + view.currDocName + '.\nDate: ' + date + '\nPatient: ' + view.currPat.patId + '. \nContents: ' + note + '\nwww.orthocure.biz';
    view.sendEmail(view.currUser.email, email2, subject, content);


    setTimeout(function() { // create a pause to allow the database time to update or the fx will run before it is updated.
        view.selectFileNameFirst(view.currPat.patId);
    }, 500);

}
view.resetPassword = function(email) {
    var ref = new Firebase("https://shining-inferno-9786.firebaseio.com");
    ref.resetPassword({
        email: email
    }, function(error) {
        if (error) {
            switch (error.code) {
                case "INVALID_USER":
                    alert("The specified user account does not exist.");
                    break;
                default:
                    alert("Error resetting password:", error);
            }
        } else {
            alert("Password reset email sent successfully!");
            view.resetAllForms();
        }
    });
}

view.changeEmail = function(emailOld, password, emailNew) {
    console.log(emailOld, password, emailNew);
    var ref = new Firebase("https://shining-inferno-9786.firebaseio.com");
    ref.changeEmail({
        oldEmail: emailOld,
        newEmail: emailNew,
        password: password
    }, function(error) {
        if (error) {
            switch (error.code) {
                case "INVALID_PASSWORD":
                    alert("The specified user account password is incorrect.");
                    break;
                case "INVALID_USER":
                    alert("The specified user account does not exist.");
                    break;
                default:
                    alert("Error creating user:", error);
            }
        } else {
            alert("User email changed successfully!");
            view.resetAllForms();
        }
    });
}

view.changePassword = function(email, oldP, newP) {

    var ref = new Firebase("https://shining-inferno-9786.firebaseio.com");
    ref.changePassword({
        email: email,
        oldPassword: oldP,
        newPassword: newP
    }, function(error) {
        if (error) {
            switch (error.code) {
                case "INVALID_PASSWORD":
                    alert("The specified user account password is incorrect.");
                    break;
                case "INVALID_USER":
                    alert("The specified user account does not exist.");
                    break;
                default:
                    alert("Error changing password:", error);
            }
        } else {
            alert("User password changed successfully!");
            view.resetAllForms();
        }
    });
}


view.sendEmail = function(email, email2, subject, content) {

    // create admin user: emails from support@orthocure.biz
    // send emails: Treatment order form: patname, tx type, invoice amount, charge to cc
    // send emails: setup ready, repeat everyday til approved(setup in admin)
    // send emails: setup approved
    console.log(email + ' ' + subject + ' ' + content);

    $.ajax({
        type: 'POST',
        url: 'https://mandrillapp.com/api/1.0/messages/send.json',
        dataType: 'jsonp',
        data: {
            'key': 'iutocdYlRPdoTVDbF9rpLg',
            'message': {
                'from_email': 'support@orthocure.biz', // this must be an email address
                'to': [{ // ***this must be an array
                    'email': email, // this must be an email address
                    'name': '',
                    'type': 'to'
                }, {
                    'email': email2, // this must be an email address
                    'name': '',
                    'type': 'to'
                }], // doesn't work when you add a second sender for reason ??
                'autotext': 'true',
                'subject': subject,
                'text': content // seems to work better when it's html
            }
        },
    }).done(function(response) {
        console.log(response); // if you're into that sorta thing
        console.log('Mail Sent');
    });
}





view.startNewAnimate = function() {
   
    view.render();
}

view.showNote = function() {
    if (view.isExample === true) {
        alert('Thanks for taking a test spin! This button is disabled for test spin users.');
        return null;
    }
    if (view.currPat.patId === null || view.currPat.patId === undefined || view.currPat.patId === '') {
        return null;
    }
    if (view.isAdmin === true) {
        $('.emailDocBut').show();
        $('.tx-notes-but').hide();
    } else {
        $('.emailDocBut').hide();
        $('.tx-notes-but').show();
    }
    if ($('.upload-here:visible').length > 0) {
        $('.upload-here').hide();
    }
    if ($('.note-contain:visible').length > 0) {
        $('.note-contain').hide();
    } else {
        $('.note-contain').show();
    }
}

view.showUpload = function() {
    console.log('showUpload');
    if (view.isExample === true) {
        alert('Thanks for taking a test spin! This button is disabled for test spin users.');
        return null;
    }
    if (view.currPat.patId === null || view.currPat.patId === undefined || view.currPat.patId === '') {
        console.log('view.currPat.uid is Null');
        return null;
    }
    if ($('.note-contain:visible').length > 0) {
        $('.note-contain').hide();
    }
    if ($('.product:visible').length > 0) {
        $('.product').hide();
    } 
    if ($('.upload-here:visible').length > 0) {
        $('.upload-here').hide();
    } else {
        $('.upload-here').show();
    }



    $('#select-file-name').change(function(id) {
        var fileIndex = document.getElementById('select-file-name').selectedIndex;
        if (fileIndex > 0) {
            //console.log(temp);
            $('.fp__btn').show();
            $('.warn-select-file').hide();
        } else {
            $('.fp__btn').hide();
        }
        setTimeout(function() {
            $('.fp__btn').hide();
            //$('#select-file-name').val('none');
            $('.warn-select-file').show();
        }, 5000);
    })
}


view.listenBill = function() {

    $('#billAddress').blur(function() {
        if ($('#shipAddressCheck').is(':checked')) {
            $('#shipAddress').val($('#billAddress').val());
        }
    })
    $('#billCity').blur(function() {
        if ($('#shipAddressCheck').is(':checked')) {
            $('#shipCity').val($('#billCity').val());
        }
    })
    $('#billState').blur(function() {
        if ($('#shipAddressCheck').is(':checked')) {
            $('#shipState').val($('#billState').val());
        }
    })
    $('#billZip').blur(function() {
        if ($('#shipAddressCheck').is(':checked')) {
            $('#shipZip').val($('#billZip').val());
        }
    })

    $('#shipAddressCheck').change(function() {
        console.log('check or uncheck');
        if ($('#shipAddressCheck').is(':checked')) {
            $('#shipAddress').val($('#billAddress').val());
            $('#shipCity').val($('#billCity').val());
            $('#shipState').val($('#billState').val());
            $('#shipZip').val($('#billZip').val());
        }
        if (!($('#shipAddressCheck').is(':checked'))) {
            shipAddress.value = shipAddress.defaultValue;
            shipCity.value = shipCity.defaultValue;
            shipState.value = shipState.defaultValue;
            shipZip.value = shipZip.defaultValue;
        }
    })
}

view.editListenBill = function() {
    var uid = view.currUser.uid;

    var ref = view.dataRef.child('users').child(uid);

    ref.once('value', function(snapshot) {
        var eventObject = snapshot.val();

        ebillAddress.value = eventObject.billAddress;
        ebillCity.value = eventObject.billCity;
        ebillState.value = eventObject.billState;
        ebillZip.value = eventObject.billZip;
        eshipAddress.value = eventObject.shipAddress;
        eshipCity.value = eventObject.shipCity;
        eshipState.value = eventObject.shipState;
        eshipZip.value = eventObject.shipZip;
        ephone2.value = eventObject.mobilePhone;
        ephone.value = eventObject.officePhone;
    }, function(error) {
        console.log('error reading users contact info for editing, function=editListenBill');
    })

    $('#ebillAddress').blur(function() {
        if ($('#eshipAddressCheck').is(':checked')) {
            $('#eshipAddress').val($('#ebillAddress').val());
        }
    })
    $('#ebillCity').blur(function() {
        if ($('#eshipAddressCheck').is(':checked')) {
            $('#eshipCity').val($('#ebillCity').val());
        }
    })
    $('#ebillState').blur(function() {
        if ($('#eshipAddressCheck').is(':checked')) {
            $('#eshipState').val($('#ebillState').val());
        }
    })
    $('#ebillZip').blur(function() {
        if ($('#eshipAddressCheck').is(':checked')) {
            $('#eshipZip').val($('#ebillZip').val());
        }
    })

    $('#eshipAddressCheck').change(function() {
        if ($('#eshipAddressCheck').is(':checked')) {
            $('#eshipAddress').val($('#ebillAddress').val());
            $('#eshipCity').val($('#ebillCity').val());
            $('#eshipState').val($('#ebillState').val());
            $('#eshipZip').val($('#ebillZip').val());
        }
        if (!($('#eshipAddressCheck').is(':checked'))) {
            eshipAddress.value = eshipAddress.defaultValue;
            eshipCity.value = eshipCity.defaultValue;
            eshipState.value = eshipState.defaultValue;
            eshipZip.value = eshipZip.defaultValue;
        }
    })
}



view.logout = function() {

    view.currPat.patId = null;
    console.log(view.currUser.uid);
    if (view.currUser.uid === null || view.currUser.uid === '' || view.currUser.uid === undefined) {
        view.hideAll();
        view.resetAllForms();
        $('.i2').text('Login');
        $('.logInFormContain').show();
    } else {
        view.dataRef.unauth(function(error) {
            if (error) {
                alert('error trying to log out. You are still logged in')
            } else {


                var temp = view.currUser.uid;
                var tempemail = view.currUser.email;

                view.currUser = {};
                view.currPat = {};
                view.currFileUrl = null;

                firstName.value = firstName.defaultValue;
                lastName.value = lastName.defaultValue;
                billAddress.value = billAddress.defaultValue;
                billCity.value = billCity.defaultValue;
                billState.value = billState.defaultValue;
                billZip.value = billZip.defaultValue;
                shipAddress.value = shipAddress.defaultValue;
                shipCity.value = shipCity.defaultValue;
                shipState.value = shipState.defaultValue;
                shipZip.value = shipZip.defaultValue;
                phone.value = phone.defaultValue;
                phone2.value = phone2.defaultValue;
                nuemail.value = nuemail.defaultValue;
                nupassword.value = nupassword.defaultValue;
                loginEmail.value = loginEmail.defaultValue;
                loginPassword.value = loginPassword.defaultValue;
                patFirstName.value = patFirstName.defaultValue;
                patLastName.value = patLastName.defaultValue;
                patDob.value = patDob.defaultValue;


                //reset everything
                $('.pat-info-name').empty();
                $('.pat-dob').empty();
                $('.pat-note').empty();
                $('.pat-event').empty();
                $('#d-contain').empty();
                $('.setup-dr-notes').value = '';
                $('.pat-list-welcome').empty();
                $('.pat-list-item-box').empty();
                $('.pat-list-item-box').append('<li class="pat-list-item">Please login to see your patient list</div>');
                //$('#select-file-name').value = 'none';
                $('.loggedInAs').text('');
                $('.selectedPat').text('');
                $('.pat-events').empty();
                $('.fp__btn').hide();
                $('.canvas-text').hide();
                $('.canvas-text2').hide();
                $('.note-contain').hide();
                $('.chart').hide();
                $('.frame').hide();
                $('.pat-chart-subtitle').show();
                $('.upload-here').hide();
                $('.note-contain').hide();
                console.log('logout');
                $('#resetPassword').hide();
                $('#changePass').hide();
                $('#changeEmail').hide();
                $('.logout').empty();
                $('.i2').text('Login');
                //$('.logInFormContain').show();
                $(".admin-contain").hide();
                $(".displayUser2").text('');
                $(".displayPat").text('');
                $(".logoContain").show();

                view.resetAllForms();
                view.isAdmin = false;
                view.isExample = false;
                view.stopAnimate();

                view.currUser = {}; //delete all the current user information..this effectively logs out the user.
                alert('user ' + tempemail + ' has been logged out.');
            }
        })
    }
};

view.setFocalPoint();
view.currPat.patId = null;
view.init();
view.startNewAnimate();
view.loadStlTeeth();
view.loadStlMounds();

view.yourApiKey = 'AhTgLagciQByzXpFGRI0Az';
filepicker.setKey(view.yourApiKey);

view.testurl = 'https:/ / cdn.filestackcontent.com / J2mXNq2sQFCTYNlLiUig '; //'
https: //cdn.filestackcontent.com/F6XOaqXTR6miOAkF2hdf';

view.reader = new FileReader();

view.clearField = function() {
    patFirstName.value = '';
    patLastName.value = '';
    patDob.value = '';
};




view.User = function(data) { //Constructor for Users
    var self = this;

    self.patList = data.patList;

    self.billAddress = data.billAddress;
    self.billCity = data.billCity;
    self.billState = data.billState;

    self.shipAddress = data.shipAddress;
    self.shipCity = data.shipCity;
    self.shipState = data.shipState;

    self.billZip = data.billZip;
    self.email = data.email;
    self.firstName = data.firstName;
    self.lastName = data.lastName;
    self.mobilePhone = data.mobilePhone;
    self.officePhone = data.officePhone;
    self.password = data.password;
    self.uid = data.uid;
    self.password = data.password;
};

view.Patient = function(data) { //Constructor for Patients
    var self = this;
};

$('.loginTab').click(function() {
    view.stopAnimate();

    //if you are logged OUT
    if (view.currUser.uid === null || view.currUser.uid === '' || view.currUser.uid === undefined) {
        view.hideAll();
        $('.logInFormContain').show();

    } else { // you are currently logged IN
        if (confirm('Are sure you want to logout?')) {
            view.logout();
            view.hideAll();
            view.resetAllForms();
            $('.main-contain').show();
        } else {
            return null;
        }
    };
});
$('.dashBoardButton').click(function() {
    view.stopAnimate();
    view.hideAll();
    if (view.currUser.uid === null || view.currUser.uid === '' || view.currUser.uid === undefined) {
        $('.nuFormContain').show();
        view.listenBill();
    } else {
        $('.docDash').show();
        $('.pat-list-contain').show();
        if(view.isAdmin === true) {
            $('.admin-contain').show();
        }
    }
});
$('.patientButton').click(function() {
    view.stopAnimate();
    if (view.currUser.uid === null || view.currUser.uid === '' || view.currUser.uid === undefined) {
        alert("Please login and select a patient first.");
        return null;
    } else if (view.currPat.patId === null || view.currPat.patId === '' || view.currPat.patId === undefined) {
        alert("Please select a patient first.");
        return null;
    } else {
        view.hideAll();
        $('.chart').show();
        //$('.pat-list-contain').show();
    }
});

$('.logInBut').click(function() {
    console.log("Log IN Button");
    view.logInUserFx();
})

$('.logo').click(function() {
    location.reload(true)
});

$('.orthocure').click(function() {
    location.reload(true)
});

$('.main-butt').click(function() {
    view.myEmail = $('.main-email').val();
    if(view.myEmail === 'Enter your email address'){
    
    } else {
        $('#nuemail').val(view.myEmail);
    }

    view.hideAll();
    $('.nuFormContain').show();

    view.listenBill();
});

$('.icon1Contain').click(function() {

        if (view.currUser.uid === null || view.currUser.uid === '' || view.currUser.uid === undefined) {
            view.logout();
            view.hideAll();
            view.stopAnimate();
            $('.nuFormContain').show();
            view.listenBill();
        } else {
            view.stopAnimate();
            view.hideAll();
            $('.docDash').show();
        }
    });

    $('.icon3Contain').click(function() {
        view.hideAll();
        view.stopAnimate();
        console.log('chart');
        $('.chart').show();
    });

    $('.logout').click(function() {
        view.hideAll();
        view.stopAnimate();
        view.logout(); //show-hide logic is in the function
    })

    $('#resetPasswordLink').click(function() {
        view.hideAll();
        view.stopAnimate();
        $('#resetPassword').show();
        //$(window).scrollTop($('#resetPassword').offset().top - 130);
    });

    $('#resetPassBut').click(function() {
        var email = $('#resetPasswordEmail').val();
        view.resetPassword(email);
        $('#resetPassword').hide();
        $('#changePass').show();
        $(window).scrollTop($('#changePass').offset().top - 130);
    });
    $('#changePassLink').click(function() {
        view.hideAll();
        view.stopAnimate();
        $('#changePass').show();
        $(window).scrollTop($('#changePass').offset().top - 130);
    });
    $('#changePassBut').click(function() {
        var email = $('#changePassEmail').val();
        var oldPass = $('#changePassOldPass').val();
        var newPass = $('#changePassNewPass').val();
        view.changePassword(email, oldPass, newPass);
    });
    $('#changeEmailLink').click(function() {
        view.hideAll();
        $('#changeEmail').show();
        $(window).scrollTop($('#changeEmail').offset().top - 130);
    });
    $('#changeEmailBut').click(function() {
        var emailOld = $('#changeEmailEmailOld').val();
        var password = $('#changeEmailPassword').val();
        var emailNew = $('#changeEmailEmailNew').val();
        view.changeEmail(emailOld, password, emailNew);
    });

    $('.nuButton').click(function() {
        $('.nuButton').css('background-color', 'hsl(200,90%,80%)');
        view.newUserFx();
        setTimeout(function() {
            $('.nuButton').css('background-color', 'hsl(200,100%,40%)');
        }, 50);
    });

    $('.updateAccount').click(function() {
        if (view.isExample === true) {
            alert('Thanks for taking a test spin! This button is disabled for test spin users.');
            return null;
        }
        $('.updateAccount').css('background-color', 'hsl(200,90%,80%)');
        view.addupdatedData();
        setTimeout(function() {
            $('.updateAccount').css('background-color', 'hsl(200,100%,40%)');
        }, 50);
    });



    //handle input from all text inputs:
/*
    $('input').on('focus', function() {
        tempText = $(this).val();
        $(this).val('');
    });

    $('input').on('blur', function() {
        if ($(this).val() === '') {
            $(this).val(tempText);
            tempText = '';
        }
    });
*/


    $('.add-pat').click(function() {
        if (view.isExample === true) {
            alert('Thanks for taking a test spin! This button is disabled for test spin users.');
            return null;
        }
        if (view.currUser.uid === null || view.currUser.uid === '' || view.currUser.uid === undefined) {
            return null;
        } else {
            view.hideAll();
            $('.np-head').show();
            //$(window).scrollTop($('.np-head').offset().top - 80);
        }
    });

view.startNewPat = function() {
    view.hideAll();
    $('.np-head').show();
}
    $('#logNewAccount').click(function() {
        view.hideAll();
        $('.nuFormContain').show();
    });

    $('.toggle-status').click(function() {
        view.toggleStatus();
    });

    $('.approve-but').click(function() {
        view.approve();
    });

    $('.tx-notes-but').click(function() {
        view.addEventNote();
    });

    $('.emailDocBut').click(function() {
        view.addEventEmailToDoc();
    });
    $('.showHidden').click(function() {
        view.showHidden(view.currPat.patId);
    });

    $('.exampleBut').click(function() {
        view.isExample = true;
        $('.exampleBut').css('background-color', 'hsl(200,90%,90%)');
        view.logInUserFx();
        setTimeout(function() { // create a pause then erase success message
            $('.exampleBut').css('background-color', 'hsl(220,50%,60%)');
        }, 100);
    })

    $('.showEditAccount').click(function() {
        if (view.isExample === false) {
            view.hideAll();
            $('.editAccount').show();
            view.editListenBill();
        }
    });

    $('.showLearn').click(function() {
        if (view.isExample === false) {
            window.open('/train.html');
        }
    });

view.showBuy = function() {
    if (view.isExample === true) {
        alert('Thanks for taking a test spin! This button is disabled for test spin users.');
        return null;
    }
    if (view.currPat.patId === null || view.currPat.patId === undefined || view.currPat.patId === '') {
        return null;
    }
    if ($('.note-contain:visible').length > 0) {
        $('.note-contain').hide();
    }
    if ($('.upload-here:visible').length > 0) {
        $('.upload-here').hide();
    }
    if ($('.product:visible').length > 0) {
        $('.product').hide();
        return null;
    } else {
        $('.product').show();
        return null;
    }
}

    $('.buy').click(function() {
        confirm('Welcome to the OrthoCure Store! Please setup an additional account in the OrthoCure Store (if you have not done so already) using the SAME email and password. Thanks!');
        window.open('https://orthocure.myshopify.com/collections/all');
        /*
        view.showBuy();
        // where 7921798023 is the product number from the ADMIN page
        shopClient.fetchProduct(7988330695)
        .then(function (product) {
            console.log('success');
              var html =
                "<img class='product__image' src='" + product.selectedVariantImage.src + "' >" +
                "<h2 class='product__title'>" + product.title + "</h2>" +
                "<a class='product__buy' href='" +
                product.selectedVariant.checkoutUrl(1) +
                "'>Buy Now!</a>";

                $('.product').html(html);
        })
        .catch(function () {
            console.log('Request failed');
        });
        */
    })

view.tempObject = {};
view.submitted = {};

view.logInUserFx = function() {
    
    $('.showHidden').hide();

    view.submitted.password = document.getElementById("loginPassword").value;
    view.submitted.email = document.getElementById("loginEmail").value;
    
    view.submitted.password = '1234';
    view.submitted.email ='jd@oc.com';

    $('.patient').empty();
    $('.patient').append('<p class="patListItem"><a class="patListText0"> Your patients will appear here</a></p>');

    if (view.isExample === true) {
        view.submitted.password = '1234';
        view.submitted.email = 'jd@oc.com';
    }

    //view.currUser.email = 'breising1@mac.com';
    //view.currUser.password = '1234';
    view.spinner = new Spinner().spin(view.spinTarget);

    var ref = new Firebase("https://shining-inferno-9786.firebaseio.com");
    ref.authWithPassword({
        email: view.submitted.email,
        password: view.submitted.password
    }, function(error, authData) {
        if (error) {
            $('.login-fail').text('Login attempt failed.Please try again.');
            loginEmail.value = loginEmail.defaultValue;
            loginPassword.value = loginPassword.defaultValue;
            
            view.spinner.stop();

            setTimeout(function() { // create a pause then erase success message
                $('.login-fail').text('');
            }, 7000);
        } else {
            //console.log("Authenticated successfully with payload:", authData);
            view.spinner.stop();
            view.hideAll();
            $('.i2').text('Logout');

            view.isUserAdmin(authData.uid);//if user is the admin, set view.isAdmin = true

            view.currUser.uid = authData.uid;//don't delete this...used upstream in this fx and in view.updateUser()
            view.currUser.email = view.submitted.email;
            view.currUser.password = view.submitted.password;

            setTimeout(function() {
                //create a pause then erase success message
                //console.log(view.isUserAdmin(view.currUserId));
                if (view.isAdmin === true) {
                    view.doctorList(view.currUser.uid);
                }
            }, 100);
            view.updateUser();
            //
        }
    })
};

//called within view.updateUser
//updates the display with the current user and current patient
view.updateDisplay = function() {

    $('.logoContain').hide();

    if (view.currUser.email === null || view.currUser.email === '' || view.currUser.email === undefined) {
        $('.displayUser2').text('');
    } else {
        $('.displayUser2').text(view.currUser.email);
    }

    $('.displayPat').empty();
    if (view.currPat.firstName === null || view.currPat.firstName === '' || view.currPat.firstName === undefined) {
        $('.displayPat').html('');
    } else {
        $('.displayPat').text(view.currPat.firstName + ' ' + view.currPat.lastName);
    }
};

// updates the currUser object with data from database
// updates display of the patient list.
// requires passing in the uid parameter
// called from view.logInUser
view.updateUser = function() {
    //var ref2 = view.dataRef.child('users').child(uid).child('patList'); //read the users patient list
    // Create the list of patients
    // read the Doctor's patient list and render to DOM
    $('.pat-list-item-box').empty(); // delete pre-existing data
    
    var userID = view.currUser.uid;

    view.spinner = new Spinner().spin(view.spinTarget);

    var ref3 = view.dataRef.child('users').child(userID); //Now get all the users info
    ref3.once("value", function(snapshot) {
            var userData = snapshot.val();

            //copy all the database entries to view.currUser
            for(var w in userData) {
                view.currUser[w] = userData[w];
            }

            //view.currUser.uid = view.tempObject.uid;//bc some users (awbrey, larson) don't have a uid field in the database
    

            //check to veryify that the authorized password matches the password stored in the user database. When user changes password, it is only updated on the authorization side, not the user database side. So if there is mis match we must correct here.
            if(view.submitted.uid !== null && view.submitted.uid !== undefined && view.submitted.uid === ''){

            if (view.submitted.password !== userData.password || view.currUser.uid !== userData.uid) {
                var ref = view.dataRef.child('users').child(userID);
                ref.update({
                    password: view.submitted.password,
                    uid: view.currUser.uid
                }, function(error) {
                    if (error) {
                        alert("Password could not be saved to the user account. The password saved in the user account is not the same as the authorization password." + error);
                    } else {
                        alert("Password and uid updated successfully.");
                    }
                });
            } else { 
                // else password need not change
            }
            }
            //clear out data
            view.submitted = {};

            view.spinner.stop();

            view.updateDisplay();

            //Create the list of patients for docDash
            var counter = 0;
            for (var w in view.currUser.patList) {
                //console.log(view.currUser.patList[w]);
                //list all of the patients in patList on the Dashboard
                $('.pat-list-item-box').prepend('<li class="pat-list-item" onClick="view.selectFileNameFirst(this.id)" id="' + view.currUser.patList[w].patId + '">' + view.currUser.patList[w].patFirstName + ' ' + view.currUser.patList[w].patLastName + '</li>');
                $('#' + view.currUser.patList[w].patId).append('<div class="pat-list-id">' + view.currUser.patList[w].patId + '</div>');

                counter += 1;
            }
            if (counter < 1) {
                $('.pat-list-item-box').append('<li class="pat-list-item" onclick="view.startNewPat()">Click here to add patient</li>');
            }

        },
        function(errorObject) {
            view.spinner.stop();
            alert("The read failed: could not get the patient list from the database. Please contact support@orthocure.biz" + errorObject.code);
        }
    );
    $('.docDash').show();
};

//End new stuff

var i = document.getElementById('slider-1'),
    o = document.getElementById('zoomOutput');
i.addEventListener('input', function() {
    view.zoom = i.value; // sets the zoom based on the slider value
}, false);


$(function() {
    $("#sliderLR").slider({
        orientation: "horizontal",
        range: "min",
        min: -40,
        max: 40,
        value: 0,
        slide: function(event, ui) {
            $("#amount2").val(ui.value);
            view.focusX = ui.value;
        }
    });
});

var tempText = '';

 







view.selectFileNameFirst = function(id) { //before uploading the pick button is hidden...it is turned on when the user selects a file name from the pulldown
    // this function gets patient info from the database for the Patient Chart view.
    // it also updates the seletedPatient field in the header
    //housekeeping


    if (view.isAdmin === true) {
        $('.showHidden').show();
    } else {
        $('.showHidden').hide();
    }
    $('.pat-list-contain').hide(); // do not delete bc view.hideAll takes too long to work.
    view.hideAll();
    $('.chart').show();
    $('#d-contain').empty();
    $('#image-contain').empty();

    var temp = id;
    var temp2 = '';
    var ref = view.dataRef.child('patients').child(id);

    view.spinner = new Spinner().spin(view.spinTarget);

    ref.once('value', function(snapshot) {
            temp2 = snapshot.val();

            view.currPat = temp2;

            //the patient's id is a property of the 'patients' Object, it is NOT a property of the ID of the patient.
            view.currPat.patId = id;
            //console.log(view.currPat.patFirstName + ' ' + view.currPat.patLastName);

            $('.displayPat').empty();
            $('.displayPat').text(view.currPat.patFirstName + ' ' + view.currPat.patLastName);
            $('.pat-events').empty();

            for (var w in view.currPat.events) {
                console.log(view.currPat.events[w]);

                view.currEvents[w] = view.currPat.events[w]; // create an object called view.currEvents containing all the patient's events accessed via using the eventID(w) as the key.

                if (view.currPat.events[w].status === 'hidden') {
                    $('.pat-events').append('<div id="' + w + '" class="event-box" style="display: none" onclick="view.evalEvent(this.id)"></div>');
                } else {
                    $('.pat-events').append('<div id="' + w + '" class="event-box" onclick="view.evalEvent(this.id)"></div>');
                }

                var dateFormatted = String(view.currPat.events[w].date).slice(0, 10);

                $('#' + w).append('<div class="pat-event-date">' + dateFormatted + '</div>');

                $('#' + w).append('<div class="pat-event-name">' + view.currPat.events[w].name + '</div>');

                console.log(view.currPat.events[w].status);

                if (view.currPat.events[w].status === 'Waiting for setup' && view.currPat.events[w].name !== 'Panoramic-1' && view.currPat.events[w].name !== 'Panoramic-2' && view.currPat.events[w].name !== 'Panoramic-3' && view.currPat.events[w].name !== 'Panoramic-4' && view.currPat.events[w].name !== 'Ceph-1' && view.currPat.events[w].name !== 'Ceph-2' && view.currPat.events[w].name !== 'Ceph-3' && view.currPat.events[w].name !== 'Ceph-4') {
                    $('#' + w).append('<div style="color: hsl(230, 100%, 30%)" class="pat-event-status">' + view.currPat.events[w].status + '</div>'); // style only the element with the correct event id as the id
                } else if (view.currPat.events[w].status === 'Needs your approval') {
                    $('#' + w).append('<div style="color: hsl(1,100%,40%)" class="pat-event-status">' + view.currPat.events[w].status + '</div>');
                } else if (view.currPat.events[w].status === 'Setup approved') {
                    $('#' + w).append('<div style="color: hsl(130,90%,40%)" class="pat-event-status">' + view.currPat.events[w].status + '</div>');
                } else if (view.currPat.events[w].status === undefined || view.currPat.events[w].status === '' || view.currPat.events[w].status === null) {
                    $('#' + w).append('<div style="color: hsl(130,90%,40%); display: none" class="pat-event-status"></div>');
                }
                $('#' + w).append('<div class="pat-event-data">' + view.currPat.events[w].data + '</div>');

                view.spinner.stop();
            };
            view.escScope(view.currPat.events);
        },
        function(errorObject) {
            view.spinner.stop();
            console.log("The read failed: " + errorObject.code);
        }
    )
    view.eventFlag = 'hidden';
};


});