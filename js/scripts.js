//TODOS add close button to the 3D canvas, prettify submit patient,

var GcurrEvents = {};

$(document).ready(function() {
    //$('#loginEmail').val('email');
    //$('#loginPassword').val('password');

    $('.canvas-text').hide(); // hide the text label on the 3D canvas
    $('.canvas-text2').hide();

    $('canvas').on('mousedown', function() {
        console.log('start onload');
        view.render();
    })
    $('canvas').on('mouseup', function() {
        view.stopAnimate();
        $('.d-contain').append('<div style="z-index: 2; color: white; padding-left: 40px" class="canvas-text">Canvas Text</div>');
        $('.d-contain').append('<div style="z-index: 2; padding-left: 40px" class="canvas-text2">Mousedown and drag to view</div>');
    })

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


    view.render();

    setTimeout(function() {
        $(window).scrollTop($(".main-contain").offset().top - 90);
        console.log('stopped by onload');
        view.stopAnimate();
    }, 800);

    $('.toggle-status').click(function() {
        view.toggleStatus();
    });

    $('.approve-but').click(function() {
        view.approve();
    });
    $('.tx-notes-but').click(function() {
        view.addEventNote();
    })


    $(function() { //When the document loads
        $(".icon4Contain").bind("click", function() {
            $(window).scrollTop($(".pat-list-contain").offset().top - 80); //scroll to div with container as ID.
            return false; //Prevent Default and event bubbling.
        });
    });
    $(function() { //When the document loads
        $(".icon3Contain").bind("click", function() {
            $(window).scrollTop($(".nuFormContain").offset().top - 80); //scroll to div with container as ID.
            return false; //Prevent Default and event bubbling.
        });
    });
    $(function() { //When the document loads
        $(".icon2Contain").bind("click", function() {
            $(window).scrollTop($(".files-contain").offset().top - 80); //scroll to div with container as ID.
            return false; //Prevent Default and event bubbling.
        });
    });
    $(function() { //When the document loads
        $(".icon1Contain").bind("click", function() {
            $(window).scrollTop($(".logInFormContain").offset().top - 80); //scroll to div with container as ID.
            return false; //Prevent Default and event bubbling.
        });
    });
    $(function() { //When the document loads
        $(".link-login").bind("click", function() {
            $(window).scrollTop($(".logInFormContain").offset().top - 80); //scroll to div with container as ID.
            return false; //Prevent Default and event bubbling.
        });
    });
    $(function() { //When the document loads
        $(".link-upload").bind("click", function() {
            $(window).scrollTop($(".upload-head").offset().top - 80); //scroll to div with container as ID.
            return false; //Prevent Default and event bubbling.
        });
    });
    $(function() { //When the document loads
        $(".nuButton").bind("click", function() {
            $(window).scrollTop($(".upload-head").offset().top - 80); //scroll to div with container as ID.
            return false; //Prevent Default and event bubbling.
        });
    });
    $(function() { //When the document loads
        $(".icon5Contain").bind("click", function() {
            $(window).scrollTop($(".upload-head").offset().top - 80); //scroll to div with container as ID.
            return false; //Prevent Default and event bubbling.
        });
    });
    $(function() { //When the document loads
        $(".loggedInAs").bind("click", function() {
            $(window).scrollTop($(".logInFormContain").offset().top - 80); //scroll to div with container as ID.
            return false; //Prevent Default and event bubbling.
        });
    });

})


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


var data = {}

data.cwidth = 200;
data.cheight = 200;
data.canvasWidth = data.cwidth;;
data.canvasHeight = data.cheight;
data.canvasRatio = (data.cwidth / data.cheight);
data.viewSize = 50;



var view = {};
view.startstop = true;
view.renderr = 0;
view.renderr2 = 0;
view.diff = 0;
view.diff2 = 0;
view.killAnim = '';
view.killAnim2 = '';
view.dataRef = new Firebase('https://shining-inferno-9786.firebaseio.com');
view.uid = ko.observable('');







view.init = function() {

    $('canvas').remove();


    view.renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true
    });
    view.renderer.gammaInput = true;
    view.renderer.gammaOutput = true;
    view.renderer.setSize(data.cwidth, data.cheight);
    view.renderer.setClearColor(0x000000, 0);


    if (view.currPatId !== null) {
        view.viewSize = 100; // it was originally set at 40
        $('#d-contain').append(view.renderer.domElement);
    } else {
        view.viewSize = 36; // it was originally set at 40
        $('#image-contain').append(view.renderer.domElement);
    }

    //view.viewSize = 36; // it was originally set at 40
    view.camera = new THREE.OrthographicCamera((-data.canvasRatio * view.viewSize / 2), (data.canvasRatio * view.viewSize / 2), view.viewSize / 2, -view.viewSize / 2, 1, 1000);
    view.camera.position.set(0, 0, 100);

    view.cameraControls = new THREE.OrbitControls(view.camera, view.renderer.domElement);
    view.cameraControls.target.set(0, 0, 0);

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
    oStlLoader.load('models/Teeth 2.stl', function(geometry) {
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

        data.cwidth = 300;
        data.cheight = 300;
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

    view.renderer.setSize(data.cwidth, data.cheight);
    view.renderer.setClearColor(0x000000, 0);

    if (view.currPatId !== null) {
        var container = document.getElementById('#d-contain');
        var child = document.getElementsByTagName('CANVAS');
        $('#d-contain').remove('canvas');
        $('#d-contain').append(view.renderer.domElement);
    } else {
        var container = document.getElementById('container');
        var child = document.getElementsByTagName('CANVAS');
        $('#container').remove('canvas'); //container.removeChild(child[0]);
        $('#container').append(view.renderer.domElement);
    }


    var delta = view.clock.getDelta();
    view.cameraControls.update(delta);
    view.cameraControls.noZoom = false;
    view.renderer.render(view.scene, view.camera);
    view.diff = view.diff + delta;


    view.renderer.render(view.scene, view.camera);
    view.renderr = view.renderr + 1;
    console.log('render' + view.renderr);

    view.killAnim = window.requestAnimationFrame(view.render);

}

view.stopAnimate = function() {
    console.log('stop');
    cancelAnimationFrame(view.killAnim);
}

view.startAnimation = function() {
    console.log('start');
    view.render();
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

var ViewModel = function() {
    var self = this;

    view.logInUser = ko.observable({
        email: '',
        password: ''
    });

    view.nuPat = ko.observable({
        patFirstName: '',
        patLastName: '',
        patDob: '',
        patId: '',
        patNote: ''
    });
    view.patData = ko.observable();
    view.uploadedFile = ko.observable();
    view.patId2 = ko.observableArray();

    view.patListID = ko.observableArray([]);
    view.patList = ko.observableArray();
    view.fileName = '';


    view.patId = null;
    view.currUserId = null;

};

var Patient = function(data) {
    this.firstName = ko.observable(data.firstName);
    this.lastName = ko.observable(data.lastName);
    this.Dob = ko.observable(data.patDob);
    this.Rx = ko.observable(data.patRx);
}

var User = function() {
    //Below adds data properly DO NOT DELETE ********************
    this.lastName = ko.observable('vv');
    this.firsName = ko.observable('bbb');
    this.email = ko.observable();
    this.suffix = ko.observable();
    this.userType = ko.observable();
    this.address = ko.observable();
    this.city = ko.observable();
    this.state = ko.observable();
    this.zip = ko.observable();
    this.phoneOffice = ko.observable();
    this.phoneMobile = ko.observable();
    this.email = ko.observable();
    this.staffContact = ko.observable();
    this.patList = ko.observable();
}

//this.currUser = ko.observable(new User());
//this.currUser(new User());
//console.log(this.currUser());


view.patId = null;
view.currUserId = null;
view.currPatId = null;
view.currPatName = null;
view.fileName = null;
view.currFileUrl = null;
view.currUserEmail = null;


view.test = function() {
    //document.getElementById('fileType').selectedIndex = "-1";
    //var x = document.getElementById('fileType').selectedIndex; //returns the selected index value
    var fileType = $('#fileType').val(2);
    console.log(fileType);
    ///alert("Index: " + y[x].index + " is " + y[x].text);
}

view.evalUpload = function() {
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
    if (fileName === null) {
        document.getElementById('no-pat-sel').innerHTML = 'You must select a patient first before uploading a file';
    } else {

        view.fileName = fileName;
        view.addEventFile(fileName);
    }
}

view.addEventFile = function(fileName) {
    var uid = view.currUserId;
    var patid = view.currPatId;
    var date = view.getTime();
    var url = view.uploadedFile(); // this is a ko.observable !!
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
            alert("Data could not be saved." + error);
        } else {
            view.sendEmail(view.currUserEmail, email2, subject, content);
            alert("Data saved successfully.");
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

    view.currPatName = first + ' ' + last;

    if (view.currUserId === null || view.currUserId === '') {
        view.clearField();
        return alert("You must first create an account and login before adding a patient.");
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
            alert("Data could not be saved." + error);
        } else {
            //view.currPatId = patPush.key(); // this doesn't work bc out of scope....not sure why
            alert("Data saved successfully.");
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
            alert("Data could not be saved." + error);
        } else {
            //view.currPatId = patPush.key(); // this doesn't work bc out of scope....not sure why
            alert("Data saved successfully.");
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
            alert("Data could not be saved." + error);
        } else {
            alert("Data saved successfully.");
            view.clearField(); // clear and reset the form
        }
    })

    // create email response for the new patient event
    var subject = 'New OrthoCure patient submitted';
    var content = 'Thank you! At ' + date + ' a new patient (' + view.currPatId + ') was submitted to your OrthoCure account: ' + view.currUserEmail + '. We look forward to working with you.';
    var email2 = 'info@orthocure.biz';
    view.sendEmail(view.currUserEmail, email2, subject, content);


    $('.patient').empty(); // delete everything on the patient list page so you don't add doubles.. start fresh
    $('.selectedPat').empty(); // delete the currpatient displayed on the header
    $('.selectedPat').text('Pat: ' + view.currPatName);

    view.userMainFx();
}

view.currUserPass = null;
// create a new user by requesting their email and a password.
view.newUserFx = function() {

    view.currUserEmail = document.getElementById("nuemail").value;
    view.currUserPass = document.getElementById("nupassword").value;
    var userEmail = view.currUserEmail;
    var email2 = 'info@orthocure.biz';

    view.dataRef.createUser({
        email: document.getElementById("nuemail").value,
        password: document.getElementById("nupassword").value
    }, function(error, userData) {
        if (error) {
            alert('Error creating user:', error);
            console.log(error);
            view.currUserEmail = null;
            view.currUserPass = null;
            view.currUserId = null;
        } else {
            console.log('Successfully created user account with uid:', userData.uid);
            console.log(userData);
            // create email response for the new patient event
            var subject = 'Welcome to OrthoCure!';
            var content = 'Thank you for registering as an OrthoCure provider. We look forward to working with you. Your accoutn information: username = ' + view.currUserEmail + ' Password = ' + view.currUserPass;
            view.sendEmail(userEmail, email2, subject, content);

            //view.currUserId = userData.uid;
            //view.currUserEmail = document.getElementById("nuemail").value;

            view.addInitialData(userData.uid);
        }
    })
}

view.addInitialData = function(uid) {

    console.log(uid);
    view.currUserId = uid;

    var ref = view.dataRef.child('users').child(uid);

    //Below adds data properly DO NOT DELETE ********************
    ref.set({
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        address: document.getElementById("address").value,
        city: document.getElementById("city").value,
        state: document.getElementById("state").value,
        zip: document.getElementById("zip").value,
        officePhone: document.getElementById("officePhone").value,
        mobilePhone: document.getElementById("mobilePhone").value,
        email: document.getElementById("nuemail").value,
        password: document.getElementById("nupassword").value,
        patList: {
            Message: {
                message: 'Doctor / User has zero patients'
            }
        }
    }, function(error) {
        if (error) {
            alert("Data could not be saved." + error);
            console.log(error);
            view.currUserEmail = null;
            view.currUserPass = null;
            view.currUserId = null;
        } else {
            alert("Data saved successfully.");
        }
    })

}

view.authData = '';

view.logInUserFx = function(uid) {
    view.currUserId = null;
    view.currUserEmail = null;
    view.currUserPass = null;


    //TODO  clear all inputs, hide button prn, reset pulldowns, reset header selectedPat and loggedInAs
    view.currUserPass = document.getElementById("loginPassword").value;
    view.currUserEmail = document.getElementById("loginEmail").value;

    $('.patient').empty();
    $('.patient').append('<p class="patListItem"><a class="patListText0"> Your patients will appear here</a></p>');

    var ref = new Firebase("https://shining-inferno-9786.firebaseio.com");
    ref.authWithPassword({
        email: view.currUserEmail,
        password: view.currUserPass
    }, function(error, authData) {
        if (error) {
            console.log("Login Failed!", error);
            view.currUserEmail = null;
            view.currUserPass = null;
            view.currUserId = null;
        } else {
            //console.log("Authenticated successfully with payload:", authData);

            $('.loggedInAs').text('Doctor: ' + view.currUserEmail + ' ');

            view.currUserId = authData.uid; //use this to have global access to the logged in user's id.
            view.authData = authData; // use this global to access email property for the $prepend "You are logged in as"
            view.userMainFx(authData);
            if (view.currUserId === '8dd3ae31-ba59-4423-a0e4-4e593df89482') {
                view.doctorList(view.currUserId);
            }
        }
    });

    $(window).scrollTop($(".pat-list-contain").offset().top - 90);
    $('.fp__btn').hide();
    view.clearField();

}

view.idArray = [];

view.userMainFx = function(Data) {
    // Create the list of patients
    // read the Doctor's patient list and render to DOM
    $('.pat-list-item-box').empty(); // delete pre-existing data
    $('.pat-list-welcome').empty();
    var uid = view.currUserId; // use this bc "." does not work inside the .child( ) method
    var ref = view.dataRef.child('users').child(uid).child('patList');
    var temp = '';
    ref.once("value", function(snapshot) {
            var patData = snapshot.val();
            var counter = 0;
            for (var w in patData) {
                console.log(w);
                counter = counter + 1;

                var ref = view.dataRef.child('users').child(uid).child('patList').child(w);
                var temp = patData[w];
                if (w === 'Message') {
                    $('.pat-list-item-box').prepend('<li class="pat-list-item"><a class="pat-list-text">You have no patients</a></li>');
                } else {
                    $('.pat-list-item-box').prepend('<li class="pat-list-item"><a id="' + temp.patId + '" class="pat-list-text" onClick="view.selectFileNameFirst(this.id)">' + temp.patFirstName + ' ' + temp.patLastName + '  ' + temp.patId + '</a></li>');
                }
            }
            $('.pat-list-welcome').prepend('<p class="patUser">Welcome back ' + view.authData.password.email + '</p>');
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
    $('.chart').show();
    $(window).scrollTop($(".files-contain").offset().top - 90);
    $('.model-row').empty();
    $('#d-contain').empty();
    $('.canvas-text2').hide();
    $('.canvas-text').hide(); // hide 3D canvas text
    $('.approve-but').hide(); // hides these buttons when the canvas is not visible.
    $('.toggle-status').hide();
    view.currEvents = {};

    view.currPatId = id; // id really is the patient id
    var temp = id;
    var temp2 = '';
    var ref = view.dataRef.child('patients').child(id);
    var ref2 = view.dataRef.child('patients').child(id).child('events');

    ref.once('value', function(snapshot) {
            temp2 = snapshot.val();
            view.currPatName = temp2.patFirstName + ' ' + temp2.patLastName;
            $('.selectedPat').empty();
            $('.selectedPat').text('Pat: ' + view.currPatName);

            $('.pat-info-name').empty();
            $('.pat-info-name').append('<div>Patient name: ' + temp2.patFirstName + ' ' + temp2.patLastName + '</div>');
            $('.patNameUpload').text('');
            $('.patNameUpload').text('Patient name:_' + view.currPatName);
            $('.pat-dob').empty();
            $('.pat-dob').append('<div>DOB: ' + temp2.patDob + '</div>');
            $('.pat-events').empty();

            ref2.once('value', function(snapshot) { // iterate through events and display each event
                    var eventIDs = snapshot.val();

                    for (w in eventIDs) {

                        view.currEvents[w] = eventIDs[w]; // create an object called view.currEvents containing all the patient's events accessed via using the eventID(w) as the key.

                        $('.pat-events').append('<div id="' + w + '" class="event-box" onclick="view.evalEvent(this.id)"></div>');

                        var dateFormatted = String(eventIDs[w].date).slice(0, 10);

                        $('#' + w).append('<div class="pat-event-date">' + dateFormatted + '</div>');

                        $('#' + w).append('<div style="color: hsl(185, 100%, 69%)" class="pat-event-name">' + eventIDs[w].name + '</div>');

                        if (eventIDs[w].status === 'Waiting for setup') {
                            $('#' + w).append('<div style="color: hsl(55,100%, 50%)" class="pat-event-status">' + eventIDs[w].status + '</div>'); // style only the element with the correct event id as the id
                        } else if (eventIDs[w].status === 'Needs your approval') {
                            $('#' + w).append('<div style="color: hsl(1,100%,60%)" class="pat-event-status">' + eventIDs[w].status + '</div>');
                        } else if (eventIDs[w].status === 'Setup approved') {
                            $('#' + w).append('<div style="color: hsl(130,100%,50%)" class="pat-event-status">' + eventIDs[w].status + '</div>');
                        }

                        /*if (eventIDs[w].status === '' || eventIDs[w].status === null || eventIDs[w].status === undefined) {
                            $('#' + w).append('<div style="padding-left: 0px; color: white" class="pat-event-name">' + eventIDs[w].name + '</div>');
                        } else {
                            $('#' + w).append('<div class="pat-event-name">' + eventIDs[w].name + '</div>');
                        }

                        if (eventIDs[w].name === 'note' || eventIDs[w].name === 'setup' || eventIDs[w].name === 'approved' || eventIDs[w].name === 'email') {
                            $('#' + w).append('<div class="pat-event-data">' + eventIDs[w].data + '</div>');
                        }
                        */

                        $('#' + w).append('<div style="color: hsl(200,0%,70%)" class="pat-event-data">' + eventIDs[w].data + '</div>');
                    }
                    view.escScope(view.currEvents);
                },
                function(errorObject) {
                    console.log("The read failed: " + errorObject.code);
                }
            )


            //view.downloadPatFileName(temp); // prior to creating patient chart
        },
        function(errorObject) {
            console.log("The read failed: " + errorObject.code);
        }
    )

    //view.downLoadEvents(); // new version
    $('#d-contain').empty(); // empty this again to be sure
    $('.model-row').empty();
}

view.escScope = function(escapee1, escapee2, escapee3) {
    view.currEvents = escapee1;
    //onsole.log(view.currEvents);
}
/*
    view.openPatFile = function() {
        var temp = '';
        //$('.pat-dob').append('<div class="pat-dob">DOB: ' + view.temp.patDob);
        var ref = view.dataRef.child('patients').child(id).child('files');
      },
      function(errorObject) {
        console.log("The read failed: " + errorObject.code);
      }

    //$('.pat-info-name').append('<div class="must-select"> Select a file name from to list below</div>');

    */

view.currEventId = '';


view.evalEvent = function(eventId, name) {

    // First, check the name of the event - if its a file then open the file and check the status

    view.currEvents = {};
    $('#d-contain').empty();
    $('.canvas-text').hide();
    $('.canvas-text2').hide();
    $('.toggle-status').hide();
    $('.approve-but').hide();

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
                $(window).scrollTop($("#d-contain").offset().top - 250);
                view.renderFile(name, id);
                $('.canvas-text').text(name + '...' + status);
                $('.canvas-text').show();
                $('.canvas-text2').show();
                $('.toggle-status').show(); // for the admin

            }
            if (status === 'Needs your approval') {
                $('.approve-but').show();
            }

        },
        function(errorObject) {
            console.log("The read failed: " + errorObject.code);
        }
    )


}



view.renderFile = function(fileName, eventId) {

    //$(window).scrollTop($(".d-contain").offset().top - 100);

    console.log('renderFile');
    view.init();

    var patId = view.currPatId; // confirmed that this is the string patId

    // Start new

    var refNew = view.dataRef.child('patients').child(patId).child('events').child(eventId);
    refNew.once('value', function(snapshot) {
        var eventObject = snapshot.val();
        var url = eventObject.data;

        view.downloadStl(patId, url);

        console.log(url);
    }, function(errorObject) {
        console.log("The read failed: " + errorObject.code);
    })
}

view.downloadStl = function(patId, url) {
    //var url = view.currFileUrl;
    //console.log(url);
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
        //mesh.rotate.x = 90 * Math.PI / 180;
        view.stl = new THREE.Object3D();
        view.stl.add(mesh);
        view.stl.rotation.x = -90 * Math.PI / 180;
        view.scene.add(view.stl);
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
            //alert("Data saved successfully.");
        }
    })

    $('#tx-notes').val('');

    setTimeout(function() { // create a pause to allow the database time to update or the fx will run before it is updated.
        view.selectFileNameFirst(view.currPatId);
    }, 500);

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

    $('canvas').on('mousedown', function() {
        console.log('start downlow');
        view.render();
    })
    $('canvas').on('mouseup', function() {
        console.log('stop');
        view.stopAnimate();
        $('.d-contain').append('<div style="z-index: 2; color: white; padding-left: 40px" class="canvas-text">Canvas Text</div>');
        $('.d-contain').append('<div style="z-index: 2; padding-left: 40px" class="canvas-text">Mousedown and drag to view</div>');
    })

    setTimeout(function() {
        view.stopAnimate();
    }, 3000);
}

view.showNote = function() {
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
            $('#select-file-name').val('none');
            $('.warn-select-file').show();
        }, 5000);
    })
}


view.alertTypeRx = function() {

}

view.logout = function() {
    var ref = new Firebase("https://shining-inferno-9786.firebaseio.com");
    ref.unauth();

    $(window).scrollTop($(".main-contain").offset().top - 90);

    firstName.value = '';
    lastName.value = '';
    address.value = '';
    city.value = '';
    state.value = '';
    zip.value = '';
    officePhone.value = '';
    mobilePhone.value = '';
    nuemail.value = '';
    nupassword.value = '';
    loginEmail.value = '';
    loginPassword.value = '';
    patFirstName.value = '';
    patLastName.value = '';
    patDob.value = '';
    view.currPatId = null;
    view.currUser = null;
    view.currFileUrl = null;

    //reset everything
    $('.pat-info-name').empty();
    $('.pat-dob').empty();
    $('.pat-note').empty();
    $('.pat-event').empty();
    $('#d-contain').empty();
    $('.setup-dr-notes').value = '';
    $('.pat-list-welcome').empty();
    $('.pat-list-item-box').empty();
    $('#select-file-name').value = 'none';
    $('.loggedInAs').text('');
    $('.selectedPat').text('');
    $('.patNameUpload').text('Please login and select a patient');
    $('.pat-events').empty();
    $('.fp__btn').hide();
    $('.canvas-text').hide();
    $('.canvas-text2').hide();
    $('.note-contain').hide();
    $('.chart').hide();
    $('.upload-here').hide();
    $('.note-contain').hide();
    view.stopAnimate();
}

view.yourApiKey = 'AhTgLagciQByzXpFGRI0Az';
filepicker.setKey(view.yourApiKey);


view.listOfStlUrls = {};

view.testurl = 'https://cdn.filestackcontent.com/J2mXNq2sQFCTYNlLiUig'; //'https://cdn.filestackcontent.com/F6XOaqXTR6miOAkF2hdf';

view.reader = new FileReader();

var octopus = {};

octopus.start = function() {
    view.init();
    view.loadStlTeeth();
    view.loadStlMounds();
};

/*window.onresize = function() {
  //view.render();
}*/
octopus.start();

ko.applyBindings(new ViewModel());

view.clearField = function() {
    nuemail.value = '';
    nupassword.value = '';
    loginEmail.value = '';
    loginPassword.value = '';
    patFirstName.value = '';
    patLastName.value = '';
    patDob.value = '';
};