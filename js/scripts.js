/*
  $(function() { //When the document loads
    $(".fp__button").bind("click", function() {
      view.uploadedFile(out); // save the 'link' to the 'file to upload' (called 'out') to a 'ko.observable'
      view.addPatient(); // save the patient name to both lists: Firebase/users and Firebase/patients
      view.addFileToFirebase() // save the file link to Firebase/patients
      return false; //Prevent Default and event bubbling.
    });
  });
*/

//TODO: finish edit account
//      : shipping vs. billing address
//      : payment info
//      : Show and Send Invoice

var data = {}

data.cwidth = 200;
data.cheight = 200;
data.canvasWidth = data.cwidth;;
data.canvasHeight = data.cheight;
data.canvasRatio = (data.cwidth / data.cheight);
data.viewSize = 50;



var view = {};
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

    /* if (view.currPatId !== null || view.currPatId !== undefined || view.currPatId !== '') {
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
/*
    view.loadStlBrackets = function() {
      var oStlLoader = new THREE.STLLoader();
      oStlLoader.load('models/Brackets.stl', function(geometry) {
        var material = new THREE.MeshPhongMaterial({
          transparent: true,
          opacity: 1.0,
          color: 0xFFFFFF,
          specular: 0xFFFFFF,
          shininess: 10
        });
        var mesh = new THREE.Mesh(geometry, material);
        mesh.position.y = 50;
         var object2 = new THREE.Object3D();
        object2.add(mesh);
        object2.rotation.x = -90 * Math.PI/180;
        view.scene.add(object2);
      });
    }
    */
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

    if (view.currPatId !== null) {
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


//***********************Important******************************
// The formula for running animation only on mousedown is as follows:
//  inside view.render() you need 1. document.getElementsByTagName('CANVAS')[0].addEventListener('mousedown', view.stopAnimate());
//                             and 2. view.killAnim = requestAnimationFrame(view.render);
//
//Then you have start and stop functions:
/*
view.stopAnimate = function() {
  console.log('stop');
  cancelAnimationFrame(view.killAnim);
}

view.startAnimation = function() {
    console.log('start');
    view.startstop = true;
    view.render();
  }
*/


view.fileName = '';
view.patId = null;
view.currUserId = null;
view.patId = null;
view.currUserId = null;
view.currPatId = null;
view.currPatName = null;
view.fileName = null;
view.currFileUrl = null;
view.currUserEmail = null;

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
    $('.pat-list-contain').hide();
    $('.editAccount').hide();
}

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
    var uid = view.currUserId;
    var patid = view.currPatId;
    var date = view.getTime();
    var url = fileUrl; // this is a ko.observable !!
    // next create an event called 'Date Submitted" for the patient
    var ref = view.dataRef.child('patients').child(patid).child('events');
    var subject = 'OrthoCure: file uploaded successfully';
    var email2 = 'info@orthocure.biz';
    var content = 'A new file named ' + view.fileName + ' was upload to your account ' + view.currUserEmail + ' for patient: ' + view.currPatId;
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
        } else {
            view.sendEmail(view.currUserEmail, email2, subject, content);
            alert("File uploaded successfully.");
            $('.upload-here').hide();
        }
    })

    view.selectFileNameFirst(patid);
}

view.getTime = function() {
    var d = new Date();
    return d.toJSON();
}

view.savePatientInfov2 = function() {
    view.currPatName = null; // delete the current patient
    view.currPatId = null;

    var first = document.getElementById("patFirstName").value;
    var last = document.getElementById("patLastName").value;
    var dob = document.getElementById("patDob").value;
    var date = view.getTime();

    console.log(first + last + dob);
    view.currPatName = first + ' ' + last;

    if (view.currUserId === null || view.currUserId === '') {
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
            //alert("Data could not be saved." + error);
        } else {
            //view.currPatId = patPush.key(); // this doesn't work bc out of scope....not sure why
            //alert("Data saved successfully.");
        }
    })

    var pid = patID.key();

    // next create an event called 'Date Submitted" for the patient
    var ref = view.dataRef.child('patients').child(pid).child('events');

    var eventID = ref.push({
        // 'ref.push' automatically creates an id that I store in pushId and is used to access the created date
        // this also saves the patId to Firebase/patients
        date: date,
        name: 'NewPatient',
        data: '',
        status: ''
    }, function(error) {
        if (error) {
            //alert("Data could not be saved." + error);
        } else {
            //view.currPatId = patPush.key(); // this doesn't work bc out of scope....not sure why
            //alert("Data saved successfully.");
        }
    })
    view.currPatId = patID.key(); // do not move this inside the success function bc out of scope..

    // Now we must save the patient's info in the Doctor's database as well
    var uid = view.currUserId; // use this for the 'var ref = ' bc it doesn't like the '.'
    var patId = view.currPatId; // use this for the 'var ref = ' bc it doesn't like the '.'

    var ref = view.dataRef.child('users').child(uid).child('patList');
    var patPushUser = ref.push({
        patFirstName: first,
        patLastName: last,
        patId: patId
    }, function(error) {
        //save the patId to Firebase/users/uid/patList
        if (error) {
            //alert("Data could not be saved." + error);
            $('.np-success').append('<div style="color: red; font-size: 1em">Data could not be saved. Please try again.</div>');
            setTimeout(function() {
                $('.np-success').empty();
            }, 3000);
            view.resetAllForms();
        } else {
            //console.log('testing success');
            //alert("Data saved successfully.");
            $('.np-success').text('New patient created successfully: ' + first + ' ' + last + ' ' + 'DOB: ' + dob);
            $('.np-success').append('<div class="np-success2>Click on Patients to view your updated patient list</div>');
            setTimeout(function() {
                $('.np-success').empty();
                $('.np-success').text('');
            }, 3000);
            view.hideAll();
            $('.pat-list-contain').show();
            $(window).scrollTop($('.pat-list-contain').offset().top - 100);
            view.resetAllForms();
        }
    })

    // create email response for the new patient event
    var subject = 'New OrthoCure patient submitted';
    var content = 'Thank you! At ' + date + ' a new patient (' + view.currPatId + ') was submitted to your OrthoCure account: ' + view.currUserEmail + '. We look forward to working with you.';
    var email2 = 'info@orthocure.biz';
    view.sendEmail(view.currUserEmail, email2, subject, content);


    $('.patient').empty(); // delete everything on the patient list page so you don't add doubles.. start fresh
    $('.selectedPat').empty(); // delete the currpatient displayed on the header
    $('.selectedPat').text(view.currPatName);

    view.userMainFx();
}

view.currUserPass = null;
// create a new user by requesting their email and a password.
view.newUserFx = function() {
    /* setTimeout(function() { // create a pause then erase success message
            view.hideAll();
            $('.nuButton').css('background-color', 'hsl(200,100%,30%)');
            $('.logInFormContain').show();
        }, 100);
        */
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

    view.currUserEmail = document.getElementById("nuemail").value;
    view.currUserPass = document.getElementById("nupassword").value;
    var userEmail = view.currUserEmail;
    var email2 = 'info@orthocure.biz';

    view.dataRef.createUser({
        email: document.getElementById("nuemail").value,
        password: document.getElementById("nupassword").value
    }, function(error, userData) {
        if (error) {
            $('.new-user-fail').append('<div class="nuFail" style="color: red">Error creating new user. Please try again.</div>');
            setTimeout(function() { // create a pause then erase success message
                $('.new-user-fail').empty();
            }, 5000);
            view.currUserEmail = null;
            view.currUserPass = null;
            view.currUserId = null;

        } else {
            // create email response for the new patient event
            var subject = 'Welcome to OrthoCure!';
            var content = 'Thank you for registering as an OrthoCure provider. We look forward to working with you. Your accoutn information: username = ' + view.currUserEmail + ' Password = ' + view.currUserPass;
            view.sendEmail(userEmail, email2, subject, content);
            view.addInitialData(userData.uid);
        }
    })
}

view.resetAllForms = function() {
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
}

view.addInitialData = function(uid) {

    var ref = view.dataRef.child('users').child(uid);

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
        patList: {
            Message: {
                message: 'Doctor has zero patients'
            }
        }
    }, function(error) {
        if (error) {
            var ref = view.dataRef;
            ref.removeUser({
                email: view.currUserEmail,
                password: view.currUserPass
            }, function(error) {
                if (error === null) {
                    console.log("User removed successfully");
                } else {
                    console.log("Error removing user:", error);
                }
            });
            alert('Sorry...failed to create new user. Please try again or contact support via support@orthocure.biz');
            $('.new-user-fail').append('<div class="nuFail" style="color: red">Error creating new user. Please try again.</div>');
            setTimeout(function() { // create a pause then erase success message
                $('.new-user-fail').empty();
            }, 5000);
            view.currUserEmail = null;
            view.currUserPass = null;
            view.currUserId = null;
        } else {
            alert('Success creating new user!');
            $('.new-user-fail').append('<div class="nuSuccess" style="color: green">Success. Confirmation email sent.</div>');
            // create email response for the new patient event
            setTimeout(function() { // create a pause then erase success message
                $('.new-user-fail').empty();
            }, 5000);
            view.resetAllForms();
        }
    })

}

view.content = 'Please confirm the accuracy of your updated contact information:  ';

view.updateContact = function(item) {
    if (item === true) {
        alert('Please check your email to verify the accuracy of your contact information. Or, logout and then log back in to verify the information is updated correctly.');
        setTimeout(function() { // create a pause then erase success message
            var userEmail = view.currUserEmail;
            var email2 = 'info@orthocure.biz';
            var subject = 'OrthoCure: updated contact information';
            console.log(view.content);
            var stuff = view.content;
            console.log(stuff);
            view.sendEmail(userEmail, email2, subject, stuff);
        }, 4000);
    } else {
        view.content += item;
        console.log(view.content);
    }
}

view.addupdatedData = function() {


    if (view.currUserId === null || view.currUserId === '' || view.currUserId === undefined) {
        return alert('You must login before updating your account information.');
    } else {
        var uid = view.currUserId;
    }

    var ref = view.dataRef.child('users').child(uid);

    var ebillAdd = document.getElementById("ebillAddress").value;
    var deFault = document.getElementById("ebillAddress").defaultValue;

    if (ebillAdd !== '' || ebillAdd !== null || ebillAdd !== undefined || ebillAdd !== deFault) {
        ref.update({
            billAddress: ebillAdd
        }, function(error) {
            if (error) {
                var item = '- billing address: update FAILED -';
                view.updateContact(item);

                $('.update-user-fail').append('<div class="update-fail" style="color: red">Error creating new user. Please try again.</div>');
                setTimeout(function() { // create a pause then erase success message
                    $('.update-user-fail').empty();
                }, 3000);
            } else {
                var item = ' - billing address: ' + ebillAdd;
                view.updateContact(item);
                $('.update-user-fail').append('<div class="update-success" style="color: green">Success. Billing address updated.</div>');
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

                $('.update-user-fail').append('<div class="update-fail" style="color: red">Error creating new user. Please try again.</div>');
                setTimeout(function() { // create a pause then erase success message
                    $('.update-user-fail').empty();
                }, 3000);
            } else {
                var item = ' - billing city: ' + ebillCity;
                view.updateContact(item);
                $('.update-user-fail').append('<div class="update-success" style="color: green">Success. Confirmation email sent.</div>');
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
                //content = content + '- billing state:  update FAILED';
                $('.update-user-fail').append('<div class="update-fail" style="color: red">Error creating new user. Please try again.</div>');
                setTimeout(function() { // create a pause then erase success message
                    $('.update-user-fail').empty();
                }, 3000);
            } else {
                var item = ' - billing state: ' + ebillState;
                view.updateContact(item);

                $('.update-user-fail').append('<div class="update-success" style="color: green">Success. Confirmation email sent.</div>');
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
                //content = content + '- billing zip:  update FAILED';
                $('.update-user-fail').append('<div class="update-fail" style="color: red">Error creating new user. Please try again.</div>');
                setTimeout(function() { // create a pause then erase success message
                    $('.update-user-fail').empty();
                }, 3000);
            } else {
                var item = ' - billing zip: ' + ebillZip;
                view.updateContact(item);

                $('.update-user-fail').append('<div class="update-success" style="color: green">Success. Confirmation email sent.</div>');
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
                //content = content + '- shipping address: update FAILED';
                $('.update-user-fail').append('<div class="update-fail" style="color: red">Error creating new user. Please try again.</div>');
                setTimeout(function() { // create a pause then erase success message
                    $('.update-user-fail').empty();
                }, 3000);
            } else {
                var item = ' - shipping address: ' + eshipAdd;
                view.updateContact(item);

                $('.update-user-fail').append('<div class="update-success" style="color: green">Success. Confirmation email sent.</div>');
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
                //content = content + '- shipping city: update FAILED';
                $('.update-user-fail').append('<div class="update-fail" style="color: red">Error creating new user. Please try again.</div>');
                setTimeout(function() { // create a pause then erase success message
                    $('.update-user-fail').empty();
                }, 3000);
            } else {
                var item = ' - shipping city: ' + eshipCity;
                view.updateContact(item);

                $('.update-user-fail').append('<div class="update-success" style="color: green">Success. Confirmation email sent.</div>');
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
                //content = content + '- shipping state:  update FAILED';
                $('.update-user-fail').append('<div class="update-fail" style="color: red">Error creating new user. Please try again.</div>');
                setTimeout(function() { // create a pause then erase success message
                    $('.update-user-fail').empty();
                }, 3000);
            } else {
                var item = ' - shipping state: ' + eshipState;
                view.updateContact(item);

                $('.update-user-fail').append('<div class="update-success" style="color: green">Success. Confirmation email sent.</div>');
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
                //content = content + '- shipping zip:  update FAILED';
                $('.update-user-fail').append('<div class="update-fail" style="color: red">Error creating new user. Please try again.</div>');
                setTimeout(function() { // create a pause then erase success message
                    $('.update-user-fail').empty();
                }, 3000);
            } else {
                var item = ' - shipping zip: ' + eshipZip;
                view.updateContact(item);

                $('.update-user-fail').append('<div class="update-success" style="color: green">Success. Confirmation email sent.</div>');
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
                //content = content + '- office phone:  update FAILED';
                $('.update-user-fail').append('<div class="update-fail" style="color: red">Error creating new user. Please try again.</div>');
                setTimeout(function() { // create a pause then erase success message
                    $('.update-user-fail').empty();
                }, 3000);
            } else {
                var item = ' - office phone: ' + ephone;
                view.updateContact(item);

                $('.update-user-fail').append('<div class="update-success" style="color: green">Success. Confirmation email sent.</div>');
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
                //content = content + '- mobile phone:  update FAILED';
                $('.update-user-fail').append('<div class="update-fail" style="color: red">Error creating new user. Please try again.</div>');
                setTimeout(function() { // create a pause then erase success message
                    $('.update-user-fail').empty();
                }, 3000);
            } else {
                var item = ' - mobile phone: ' + ephone2;
                view.updateContact(item);

                $('.update-user-fail').append('<div class="update-success" style="color: green">Success. Confirmation email sent.</div>');
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

view.logInUserFx = function(uid) {
    view.currUserId = null;
    view.currUserEmail = null;
    view.currUserPass = null;


    //TODO  clear all inputs, hide button prn, reset pulldowns, reset header selectedPat and loggedInAs
    view.currUserPass = document.getElementById("loginPassword").value;
    view.currUserEmail = 'breising1@mac.com'; //document.getElementById("loginEmail").value;

    $('.patient').empty();
    $('.patient').append('<p class="patListItem"><a class="patListText0"> Your patients will appear here</a></p>');

    var ref = new Firebase("https://shining-inferno-9786.firebaseio.com");
    ref.authWithPassword({
        email: 'breising1@mac.com', //view.currUserEmail,
        password: 'bcr0072' //view.currUserPass
    }, function(error, authData) {
        if (error) {
            $('.login-fail').text('Login attempt failed. Please try again.');
            loginEmail.value = loginEmail.defaultValue;
            loginPassword.value = loginPassword.defaultValue;
            console.log("Login Failed!", error);
            view.currUserEmail = null;
            view.currUserPass = null;
            view.currUserId = null;
            setTimeout(function() { // create a pause then erase success message
                $('.login-fail').text('');
            }, 4000);

        } else {
            //console.log("Authenticated successfully with payload:", authData);
            view.hideAll();
            $('.login-fail').text('');
            $('.contain-half').empty();
            $('.contain-half').css('padding-top', '0px');
            $('.contain-half').append('<div class="loggedInAs">' + view.currUserEmail + '</div>');
            $('.logout').empty();
            $('.logout').text('Logout');
            $('.pat-list-contain').show();
            $(window).scrollTop($(".pat-list-contain").offset().top - 100);
            view.currUserId = authData.uid; //use this to have global access to the logged in user's id.
            console.log(authData.uid);
            view.authData = authData; // use this global to access email property for the $prepend "You are logged in as"
            view.userMainFx(authData);
            if (view.currUserId === '8dd3ae31-ba59-4423-a0e4-4e593df89482') {
                view.doctorList(view.currUserId);
            }
        }
        console.log(view.currUserId);
    });

    //$(window).scrollTop($(".pat-list-contain").offset().top - 90);
    $('.fp__btn').hide();

}

view.idArray = [];

view.userMainFx = function(Data) {
    // Create the list of patients
    // read the Doctor's patient list and render to DOM
    $('.pat-list-item-box').empty(); // delete pre-existing data
    view.stopAnimate();
    $('.pat-list-welcome').empty();
    var uid = view.currUserId; // use this bc "." does not work inside the .child( ) method
    var ref = view.dataRef.child('users').child(uid).child('patList');
    var temp = '';
    ref.once("value", function(snapshot) {
            var patData = snapshot.val();
            console.log(patData);
            var counter = 0;
            for (var w in patData) {
                console.log(w);
                counter = counter + 1;
                console.log(counter);

                var ref = view.dataRef.child('users').child(uid).child('patList').child(w);
                var temp = patData[w];
                $('.pat-list-item-box').prepend('<li class="pat-list-item" onClick="view.selectFileNameFirst(this.id)" id="' + temp.patId + '">' + temp.patFirstName + ' ' + temp.patLastName + '</li>');
                $('#' + temp.patId).append('<div class="pat-list-id">' + temp.patId + '</div>');
            }
            if (counter === 0) {
                $('.pat-list-item-box').prepend('<li class="pat-list-item"><a class="pat-list-text">You have no patients</a></li>');
            }
            $('.pat-list-welcome').prepend('<p class="patUser">' + view.authData.password.email + '</p>');
        },
        function(errorObject) {
            console.log("The read failed: " + errorObject.code);
        }
    )
};


view.createAdminInterface = function() {
    console.log('createAdminInterface');
    view.doctorList(); // create a doctor list so that can click on a doctor to see his patients and do all the same stuff.
    // add function to upload the setup files and tray files --> autosend the first email
    //view.sendEmailUpdate(); // show a list of all setups waiting for approval ---> send email to all

}

view.doctorList = function(uid) {
    $(window).scrollTop($('.doc-list-title').offset().top - 80);
    var ref = view.dataRef.child('users');
    var read = ref.once("value", function(snapshot) {
        var docIds = snapshot.val();
        $('.doctor-list').empty();
        for (w in docIds) {
            console.log(w);
            console.log(docIds[w]);

            //create the doctor list
            $('.doctor-list').append('<div id="' + w + '" class="doc-list-item">Dr. ' + docIds[w].firstName + ' ' + docIds[w].lastName + ' ' + docIds[w].email + ' ' + 'mobile: ' + docIds[w].mobilePhone + ' ' + 'office: ' + docIds[w].officePhone + ' ' + docIds[w].address + ' ' + docIds[w].city + ' ' + docIds[w].state + ' ' + docIds[w].zip + '</div>');
            for (v in docIds[w].patList) {
                console.log(v); // v is the pushId for the patient list
                console.log(docIds[w].patList[v]);
                $('#' + w).append('<div id="' + docIds[w].patList[v].patId + '" class="doc-pat-list-item" style="padding-left: 20px">' + docIds[w].patList[v].patFirstName + ' ' + docIds[w].patList[v].patLastName + ' ' + docIds[w].patList[v].patId + '</div>');
            }
        }
        $('.doc-pat-list-item').click(function() {
            console.log(this);
            view.selectFileNameFirst(this.id);
        })
    })
}


view.currEvents = {};

view.selectFileNameFirst = function(id) { //before uploading the pick button is hidden...it is turned on when the user selects a file name from the pulldown
    // this function gets patient info from the database for the Patient Chart view.
    // it also updates the seletedPatient field in the header
    //housekeeping
    $('.pat-list-contain').hide(); // do not delete bc view.hideAll takes too long to work.
    view.hideAll();
    $('.chart').show();
    $('#d-contain').empty();
    $('#image-contain').empty();

    view.currEvents = {};

    view.currPatId = id; // id really is the patient id
    var temp = id;
    var temp2 = '';
    var ref = view.dataRef.child('patients').child(id);
    var ref2 = view.dataRef.child('patients').child(id).child('events');

    ref.once('value', function(snapshot) {
            temp2 = snapshot.val();
            view.currPatName = temp2.patFirstName + ' ' + temp2.patLastName;
            $('.selectedPat').remove();
            $('.contain-half').css('display', 'block');
            $('.contain-half').append('<div class="selectedPat">' + view.currPatName + '</div>');

            $('.pat-events').empty();

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
                    view.escScope(view.currEvents);
                },
                function(errorObject) {
                    console.log("The read failed: " + errorObject.code);
                }
            )
        },
        function(errorObject) {
            console.log("The read failed: " + errorObject.code);
        }
    )
}

view.escScope = function(escapee1, escapee2, escapee3) {
    view.currEvents = escapee1;
    //onsole.log(view.currEvents);
}
/*
    view.openPatFile = function() {
        var temp = '
        ';
        //$('.pat - dob ').append(' < div class = "pat-dob" > DOB: ' + view.temp.patDob);
        var ref = view.dataRef.child('
        patients ').child(id).child('
        files ');
      },
      function(errorObject) {
        console.log("The read failed: " + errorObject.code);
      }

    //$('.pat - info - name ').append(' < div class = "must-select" > Select a file name from to list below < /div>');

    */

view.currEventId = '';


view.evalEvent = function(eventId, name) {

    var patId = view.currPatId;
    var id = eventId;
    var name = '';
    var status = '';
    view.currEventId = eventId;

    var ref2 = view.dataRef.child('patients').child(patId).child('events').child(id);
    ref2.once('value', function(snapshot) {
            var myEvent = snapshot.val();
            name = myEvent.name;
            status = myEvent.status;

            if (name === 'Upper-scan-1' || name === 'Upper-scan-2' || name === 'Lower-scan-1' || name === 'Lower-scan-2' || name === 'Panoramic-1' || name === 'Panoramic-2' || name === 'Ceph-1' || name === 'Ceph-2') {
                view.renderFile(name, id);

            } else {
                return console.log('do nothing');
            }
            if (status === 'Needs your approval') {
                $('.approve-but').show();
            }

        },
        function(errorObject) {
            console.log("The read failed: " + errorObject.code);
        }
    )
    /*setTimeout(function() { // create a pause then erase success message
        $(window).scrollTop($(".frame").offset().top - 100);
    }, 300);
*/
}



view.renderFile = function(fileName, eventId) {
    $('#d-contain').empty();
    $('.chart').hide();
    $('.canvas-text').text(name + ': ' + status);
    $('.toggle-status').show(); // for the admin
    $('.frame').show();
    view.init();

    var patId = view.currPatId; // confirmed that this is the string patId

    // Start new

    var refNew = view.dataRef.child('patients').child(patId).child('events').child(eventId);
    refNew.once('value', function(snapshot) {
        var eventObject = snapshot.val();
        var url = eventObject.data;

        view.downloadStl(patId, url);

    }, function(errorObject) {
        console.log("The read failed: " + errorObject.code);
    })
}

view.downloadStl = function(patId, url) {
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
        mesh.position.y = 50;

        //view.stl = new THREE.Object3D();
        view.stl.add(mesh);
        view.stl.rotation.x = -60 * Math.PI / 180;
        view.scene.add(view.stl);
        console.log('downloadStl');
    });

    //document.getElementById('#select-file-name').value(null); // clear the name choice and reset to blank
    $('.fp__btn').hide(); // hide the button again until user selects a name.

    //view.downloadPatFileName(patId);
    //view.scrollToUpload();
    view.startNewAnimate();
}

view.toggleStatus = function() {
    var patId = view.currPatId;
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
    }, function(errorObject) {
        console.log("The read failed: " + errorObject.code);
    })
    setTimeout(function() { // create a pause to allow the database time to update or the fx will run before it is updated.
        view.selectFileNameFirst(view.currPatId);
        view.stopAnimate();

    }, 500);
}

view.approve = function() {

    confirm('Are you sure you want to approve this setup?');

    var patId = view.currPatId;
    var eventId = view.currEventId;
    $('.canvas-text').hide(); // hide the text label on the 3D canvas
    $('.canvas-text2').hide();
    $('.approve-but').hide();
    $('.toggle-status').hide(); // for the admin

    var ref = view.dataRef.child('patients').child(patId).child('events').child(eventId);
    ref.update({
        status: 'Setup approved'
    }, function(error) {
        if (error) {
            alert("Data could not be saved." + error);
        } else {
            //alert("Data saved successfully.");
        }
    });

    setTimeout(function() { // create a pause to allow the database time to update or the fx will run before it is updated.
        $('#d-contain').empty();
    }, 500);

    view.addEventApprove(eventId); // this fx adds a new event to the patient's database called 'approve event'...
    // below changes the existing status of the 'file event'
}


view.addEventApprove = function(currEventId) {
    //var uid = view.currUserId;
    var eventId = currEventId;
    //var currEventName = view.currEvents[eventId].name;
    var patid = view.currPatId;
    var date = view.getTime();
    var currUserEmail = view.currUserEmail;
    var note = '';

    var ref2 = view.dataRef.child('patients').child(patid).child('events').child(eventId);
    ref2.once('value', function(snapshot) {
        var eventObject = snapshot.val();
        view.name = eventObject.name;
        cEvent(view.name);
    })
    // created this function only because I am having trouble passing info between these ref. functions the only way it works is by passing function parameters
    var cEvent = function(name) {
        var patid = view.currPatId;
        var date = view.getTime();
        var currUserEmail = view.currUserEmail;
        var note = '';
        var ref = view.dataRef.child('patients').child(patid).child('events');
        var newEventId = ref.push({
            // 'ref.push' automatically creates an id that I store in pushId and is used to access the created date
            // this also saves the patId to Firebase/patients
            date: date,
            name: 'Setup_approval',
            data: 'Setup for ' + name + ' approved by ' + currUserEmail,
            status: ''
        }, function(error) {
            if (error) {
                alert("Data could not be saved." + error);
            } else {
                //alert("Data saved successfully.");
                var email2 = 'info@orthocure.biz';
                var subject = 'OrthoCure: setup approval notice';
                var content = 'Confirmation: ' + date + ' received your setup approval for patient (' + view.currPatId + ') file: ' + view.name;
                view.sendEmail(view.currUserEmail, email2, subject, content);
            }
        })
        setTimeout(function() { // create a pause to allow the database time to update or the fx will run before it is updated.
            view.selectFileNameFirst(view.currPatId);
        }, 500);
    }
}

view.addEventNote = function() {
    //var uid = view.currUserId;
    view.showNote();
    var patid = view.currPatId;
    var date = view.getTime();
    var currUserEmail = view.currUserEmail;
    var note = $('#tx-notes').val();

    var ref = view.dataRef.child('patients').child(patid).child('events');
    ref.push({
        // 'ref.push' automatically creates an id that I store in pushId and is used to access the created date
        // this also saves the patId to Firebase/patients
        date: date,
        name: 'Prescription / Note',
        data: 'Author: ' + currUserEmail + '______' + '"' + note + '"',
        status: ''
    }, function(error) {
        if (error) {
            alert("Data could not be saved." + error);
        } else {
            alert("Data saved successfully.");
        }
    })

    $('#tx-notes').val('');

    setTimeout(function() { // create a pause to allow the database time to update or the fx will run before it is updated.
        view.selectFileNameFirst(view.currPatId);
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
    console.log(email, oldP, newP);
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
    /*
    $('canvas').on('mousedown', function() {
        console.log('start downlow');
        view.render();
    })
    $('canvas').on('mouseup', function() {
        console.log('stop: downlow');
        view.stopAnimate();
        $('.d-contain').append('<div style="z-index: 2; color: white; padding-left: 40px" class="canvas-text">Canvas Text</div>');
        $('.d-contain').append('<div style="z-index: 2; padding-left: 40px" class="canvas-text">Mousedown and drag to view</div>');
    })

    setTimeout(function() {
        view.stopAnimate();
    }, 3000);
    */
}

view.showNote = function() {
    if (view.currPatId === null || view.currPatId === undefined || view.currPatId === '') {
        return null;
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
    if (view.currPatId === null || view.currPatId === undefined || view.currPatId === '') {
        return null;
    }
    if ($('.note-contain:visible').length > 0) {
        $('.note-contain').hide();
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


view.alertTypeRx = function() {

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
    var uid = view.currUserId;

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

    view.currPatId = null;

    if (view.currUserId === null || view.currUserId === '' || view.currUserId === undefined) {
        view.hideAll();
        $('.logInFormContain').show();
    } else {

        $('.contain-half').empty();
        $('.contain-half').css('display', 'flex');
        $('.contain-half').append('<img class="logo" src="/images/orthocure_symbol.svg" alt="OrthoCure Logo"><h2>ORTHO</h2><h2 class="cure">CURE</h2>');
        $('.contain-half').click(function() {
            view.stopAnimate();
            $('#d-contain').empty();
            view.hideAll();
            $('.main-contain').show();
            $('#image-contain').empty();
            $('#image-contain').show();
            view.currPatId = null;
            view.init();
            view.loadStlTeeth();
            view.loadStlMounds();
            view.render();
        })
        view.hideAll();
        view.currPatId = null;
        view.currUserId = null;
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
        $('.loggedInAs').text('Login').show();
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
        $('.logout').text('Login');

        $('.logInFormContain').show();
        $(window).scrollTop($('.logInFormContain').offset().top - 100);

        view.stopAnimate();

        var ref = new Firebase("https://shining-inferno-9786.firebaseio.com");
        ref.unauth();
    }
}
view.setFocalPoint();
view.currPatId = null;
view.init();
view.startNewAnimate();
view.loadStlTeeth();
view.loadStlMounds();

view.yourApiKey = 'AhTgLagciQByzXpFGRI0Az';
filepicker.setKey(view.yourApiKey);

view.testurl = 'https://cdn.filestackcontent.com/J2mXNq2sQFCTYNlLiUig'; //'https://cdn.filestackcontent.com/F6XOaqXTR6miOAkF2hdf';

view.reader = new FileReader();

view.clearField = function() {
    patFirstName.value = '';
    patLastName.value = '';
    patDob.value = '';
};

$(document).ready(function() {

    var i = document.getElementById('slider-1'),
        o = document.getElementById('zoomOutput');
    i.addEventListener('input', function() {
        view.zoom = i.value; // sets the zoom based on the slider value
    }, false);
});

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


$('.icon1Contain').click(function() {

    if (view.currUserId === null || view.currUserId === '' || view.currUserId === undefined) {
        view.logout();
        view.hideAll();
        view.stopAnimate();
        $('.nuFormContain').show();
        view.listenBill();
    } else {
        view.stopAnimate();
        view.hideAll();
        $('.editAccount').show();
        view.editListenBill();
    }
});

$('.icon2Contain').click(function() {
    if (view.currUserId !== null || view.currUserId !== '' || view.currUserId !== undefined) {
        view.hideAll();
        view.stopAnimate();
        $('.pat-list-contain').show();
    } else {
        view.stopAnimate();
        view.hideAll();
        $('.logInFormContain').show();
        //$(window).scrollTop($('.logInFormContain').offset().top - 100);
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

$('.logInButton').click(function() {
    $('.logInButton').css('background-color', 'hsl(200,90%,90%)');
    view.hideAll();
    view.logInUserFx();
    setTimeout(function() { // create a pause then erase success message
        $('.logInButton').css('background-color', 'hsl(200,100%,30%)');
    }, 100);
})
/*
    $("canvas").on("touchclick", function() {
        console.log("start touchclick");
        setTimeout(function() {
            view.render();
        }, 1000);
    })
*/

$('#resetPasswordLink').click(function() {
    view.hideAll();
    view.stopAnimate();
    $('#resetPassword').show();
    //$(window).scrollTop($('#resetPassword').offset().top - 130);
});
$('#resetPassBut').click(function() {
    var email = $('#resetPasswordEmail').val();
    console.log(email);
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
    $('.updateAccount').css('background-color', 'hsl(200,90%,80%)');
    view.addupdatedData();
    setTimeout(function() {
        $('.updateAccount').css('background-color', 'hsl(200,100%,40%)');
    }, 50);
});


//handle input from all text inputs:
var tempText = '';
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

$('.add-pat').click(function() {
    if (view.currUserId === null || view.currUserId === '' || view.currUserId === undefined) {
        return null;
    } else {
        view.hideAll();
        $('.np-head').show();
        //$(window).scrollTop($('.np-head').offset().top - 80);
    }
});
setTimeout(function() {
    $(window).scrollTop($(".mid-contain").offset().top - 100);
}, 200);

$('.toggle-status').click(function() {
    view.toggleStatus();
});

$('.approve-but').click(function() {
    view.approve();
});
$('.tx-notes-but').click(function() {
    console.log('add note');
    view.addEventNote();
})

//***** working animation on mousedown ****************************
/*
    $('canvas').on('mousedown', function() {
        console.log('start onload');
        view.render();
    });

    $('canvas').on('mouseup', function() {
        view.stopAnimate();
        $('.d-contain').append('<div style="z-index: 2; color: white; padding-left: 40px" class="canvas-text">Canvas Text</div>');
        $('.d-contain').append('<div style="z-index: 2; padding-left: 40px" class="canvas-text2">Mousedown and drag to view</div>');
    });
*/
//***** working animation on mousedown ****************************