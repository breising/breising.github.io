var initialStop = 0;
window.onload = function() {
    $('canvas').on('mousedown', function() {
      view.render();
    })
    $('canvas').on('mouseup', function() {
      view.stopAnimate();
    })

    view.render();
    setTimeout(function() {
      view.stopAnimate();
    }, 200);

    //octopus.start();
    $(function() { //When the document loads
      $("#logInButton").bind("click", function() {
        $(window).scrollTop($(".myPatients").offset().top - 50); //scroll to div with container as ID.
        return false; //Prevent Default and event bubbling.
      });
    });
    $(function() { //When the document loads
      $(".icon4Contain").bind("click", function() {
        $(window).scrollTop($(".pat-list-contain").offset().top - 50); //scroll to div with container as ID.
        return false; //Prevent Default and event bubbling.
      });
    });
    $(function() { //When the document loads
      $(".icon3Contain").bind("click", function() {
        $(window).scrollTop($(".nuFormContain").offset().top - 50); //scroll to div with container as ID.
        return false; //Prevent Default and event bubbling.
      });
    });
    $(function() { //When the document loads
      $(".icon2Contain").bind("click", function() {
        $(window).scrollTop($(".files-contain").offset().top - 50); //scroll to div with container as ID.
        return false; //Prevent Default and event bubbling.
      });
    });
    $(function() { //When the document loads
      $(".icon1Contain").bind("click", function() {
        $(window).scrollTop($(".logInFormContain").offset().top - 50); //scroll to div with container as ID.
        return false; //Prevent Default and event bubbling.
      });
    });
    $(function() { //When the document loads
      $(".link-login").bind("click", function() {
        $(window).scrollTop($(".logInFormContain").offset().top - 50); //scroll to div with container as ID.
        return false; //Prevent Default and event bubbling.
      });
    });
    $(function() { //When the document loads
      $(".link-upload").bind("click", function() {
        $(window).scrollTop($(".upload-head").offset().top - 50); //scroll to div with container as ID.
        return false; //Prevent Default and event bubbling.
      });
    });
    $(function() { //When the document loads
      $(".nuButton").bind("click", function() {
        $(window).scrollTop($(".upload-head").offset().top - 50); //scroll to div with container as ID.
        return false; //Prevent Default and event bubbling.
      });
    });
    $(function() { //When the document loads
      $(".icon5Contain").bind("click", function() {
        $(window).scrollTop($(".upload-head").offset().top - 50); //scroll to div with container as ID.
        return false; //Prevent Default and event bubbling.
      });
    });
  }
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
view.diff = 0;
view.killAnim = '';
view.dataRef = new Firebase('https://shining-inferno-9786.firebaseio.com');
view.uid = ko.observable('');




view.init = function() {
  view.renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true
  });
  view.renderer.gammaInput = true;
  view.renderer.gammaOutput = true;
  view.renderer.setSize(data.cwidth, data.cheight);
  view.renderer.setClearColor(0x000000, 0);

  //var h5 = document.getElementById('h5');
  //var container = document.getElementById('container');
  //container.insertBefore(view.renderer.domElement, h5);
  $('#container').append(view.renderer.domElement);

  view.viewSize = 40;
  view.camera = new THREE.OrthographicCamera((-data.canvasRatio * view.viewSize / 2), (data.canvasRatio * view.viewSize / 2), view.viewSize / 2, -view.viewSize / 2, 1, 1000);
  view.camera.position.set(0, 0, 100);

  view.cameraControls = new THREE.OrbitControls(view.camera, view.renderer.domElement);
  view.cameraControls.target.set(0, 0, 0);

  view.scene = new THREE.Scene();
  view.ambientLight = new THREE.AmbientLight(0xb3b3b3);

  //view.light = new THREE.DirectionalLight(0xFFFFFF, .5);
  //view.light.position.set(100, 100, 100);

  //view.light3 = new THREE.DirectionalLight(0xFFFFFF, .7);
  //view.light.position.set(100, -100, 100);

  //view.light2 = new THREE.DirectionalLight(0xFFFFFF, .5);
  //view.light2.position.set(-10, 10, 1);

  view.light4 = new THREE.DirectionalLight(0xFFFFFF, .7);
  view.light4.position.set(100, 100, 100);

  view.light5 = new THREE.DirectionalLight(0xFFFFFF, .7);
  view.light5.position.set(-100, -100, -100);

  view.scene.add(view.ambientLight);
  //view.scene.add(view.light);
  //view.scene.add(view.light2);
  //view.scene.add(view.light3);
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
view.startstop = '';
view.render = function() {
  if (document.documentElement.clientWidth < 450) {
    data.cwidth = 250;
    data.cheight = 250;
  }
  if (document.documentElement.clientWidth > 450) {
    data.cwidth = 250;
    data.cheight = 250;
  }
  if (document.documentElement.clientWidth > 550) {
    data.cwidth = 265;
    data.cheight = 265;
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

  var container = document.getElementById('container');
  var h5 = document.getElementById('h5');
  var child = document.getElementsByTagName('CANVAS');
  container.removeChild(child[0]);
  $('#container').append(view.renderer.domElement);

  var delta = view.clock.getDelta();
  view.cameraControls.update(delta);
  view.cameraControls.noZoom = true;
  view.renderer.render(view.scene, view.camera);
  view.diff = view.diff + delta;


  view.renderer.render(view.scene, view.camera);
  view.renderr = view.renderr + 1;
  console.log('render' + view.renderr);
  if(view.startstop == false) {
    view.stopAnimate();
  }
  view.killAnim = window.requestAnimationFrame(view.render);

}

view.stopAnimate = function() {
  console.log('stop');
  cancelAnimationFrame(view.killAnim);
}



view.startAnimation = function() {
    console.log('start');
    view.startstop = true;
    view.render();
  }
  //***********************Important******************************
  // The formula for running animation only on mousedown is as follows:
  //  inside view.render() you need 1. document.getElementsByTagName('CANVAS')[0].addEventListener('mousedown', view.stopAnimate());
  //                             and 2. view.killAnim = requestAnimationFrame(view.render);
  //
  //Then you have start and stop functions:
  /*view.startAnimation = function() {
    view.render();
    console.log('start');
}
*/
  /*view.stopAnimate = function() {
      cancelAnimationFrame(view.killAnim);
      console.log('stop');
    }
    */



var ViewModel = function() {
  var self = this;
  /*
    this.newUser = function() {
      var userEmail = String(this.email); //'this' references the currUser
      var userPassword = String(this.password);
      view.dataRef.createUser({
        email: userEmail,
        password: userPassword,
      }, function(error, userData) {
        if (error) {
          console.log('Error creating user:', error);
        } else {
          console.log('Successfully created user account with uid:', userData.uid);
          view.userId = userData.uid;
          var id = userData.uid;
          //TODO: verify that keys of new Patient and userData match
          //self.currUser(new User(currUser()));
          //view.addInitialData(view.userId);
          //view.addInitialData(view.userId);

          var ref = view.dataRef.child('users').child(id);

          ref.set(),
            function(error) {
              if (error) {
                alert("Data could not be saved." + error);
              } else {
                alert("Data saved successfully.");
              }
            }
        }
      })
    }


    this.changeCurrPat = function(clicked) { //when you click on a patient in the list this is triggered
      self.currPat(clicked)
    }
    this.loadPat = function() {
      var uid = view.userId;
      self.currPat(this);
      var ref = view.dataRef.child('patients');
    }

    this.patList = ko.observableArray([]);

    this.loadPatList = function() {
      var uid = view.userId; // convert to 'uid' this bc "." does not work inside the .child( ) method
      var ref = view.dataRef.child('users').child(uid).child('patList');
      var temp = '';
      ref.on("value", function(snapshot) {
          var patData = snapshot.val(); // all (a list of) the patientIds are captured here
          for (var w in patData) { // w = the key...which is the patientId
            var ref = view.dataRef.child('users').child(uid).child('patList').child(w);
            var temp = patData[w]; // must use bracket notation here to use a var to refer to the key
            // save to 'temp' bc '.child()' does not like brackets[] or periods'.'
            self.patList.push(new Patient(patData[w]));
            //$('.patient').prepend('<p class="patListItem"><a class="patListText">' + temp.firstName + ' ' + temp.lastName + '</a></p>');
          }
          //$('.patient').prepend('<p class="patUser">Welcome back ' + view.authData.password.email + '</p><br>');

        },
        function(errorObject) {
          console.log("The read failed: " + errorObject.code);
        }
      )
    }


    /*suffix: '',
      userType: '',
      address: 'q',
      city: '',
      state: '',
      zip: '',
      phoneOffice: '',
      phoneMobile: '',
      email: '',
      staffContact: {
        firsName: '',
        lastName: ''
      },
      patList: {
        id: {
          lastName: '',
          firstName: ''
        }
      }
    })
  */

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

  view.userId = null;
  view.patId = null;
  view.currUser = null;
  view.currPat = null;
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

view.userId = null;
view.patId = null;
view.currUser = null;
view.currPat = null;
view.currPatName = null;
view.fileName = null;
view.currFileUrl = null;

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
    view.addUrlToFirebase();
  }
}

view.addUrlToFirebase = function() {
  fileName = view.fileName;
  var uid = view.userId; ///TODO change this to view.currUser
  var patid = view.currPat;
  console.log(patid);
  var ref = view.dataRef.child('patients').child(patid).child('files').child(fileName);
  //Below adds data properly DO NOT DELETE ********************
  var fileId = ref.push({
    url: view.uploadedFile()
  }, function(error) {
    if (error) {
      alert("Data could not be saved." + error);
    } else {
      $('.upload-success').text('The file ' + fileName + ' was successfully uploaded for ' + view.currPatName);
      alert("Data saved successfully.");
    }
  })
}

view.savePatientInfo = function() {
  if (view.userId === null || view.userId === '') {
    return alert("You must first create an account and login before adding a patient.");
  }
  //TODO:  add doctor's name/id to the patient
  var ref = view.dataRef.child('patients');

  var patPush = ref.push({
    // 'ref.push' automatically creates an id that I store in patPush and is used to access the patient name
    // this also saves the patId to Firebase/patients
    patFirstName: view.nuPat().patFirstName,
    patLastName: view.nuPat().patLastName,
    patId: view.nuPat().patId,
    patDob: view.nuPat().patDob,
    patNote: view.nuPat().patNotes
  }, function(error) {
    if (error) {
      alert("Data could not be saved." + error);
    } else {
      view.currPatName = toString(patFirstName + ' ' + patLastName);
      alert("Data saved successfully.");
    }
  })
  var uid = view.userId;
  var patId = patPush.key();

  view.patId = patId;

  var ref = view.dataRef.child('users').child(uid).child('patList').child(patId);
  ref.set({
    firstName: view.nuPat().patFirstName,
    lastName: view.nuPat().patLastName
  }, function(error) {
    //save the patId to Firebase/users/uid/patList
    if (error) {
      alert("Data could not be saved." + error);
    } else {
      alert("Data saved successfully.");
      view.clearField();
    }
  })
  $('.patient').empty(); // delete everything and start fresh
  view.userMainFx();
}


// create a new user by requesting their email and a password.
view.newUserFx = function() {

  view.dataRef.createUser({
    email: document.getElementById("nuemail").value,
    password: document.getElementById("nupassword").value
  }, function(error, userData) {
    if (error) {
      console.log('Error creating user:', error);
    } else {
      console.log('Successfully created user account with uid:', userData.uid);
      view.userId = userData.uid;
      //view.addInitialData(view.userId);
      view.addInitialData(userData.uid);
    }
  })
}

view.addInitialData = function(uid) {
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
        id: {
          lastName: '',
          firstName: ''
        }
      }
    }, function(error) {
      if (error) {
        alert("Data could not be saved." + error);
      } else {
        alert("Data saved successfully.");
      }
    })
  }
  /*
  view.addInitialData = function(uid) {
    var ref = view.dataRef.child('users').child(uid); //this creates the child uid as well as referencing it.
    var data = '{' + uid + '{firstName: ''} }';
    ref.set(data, function(error) {
      if (error) {
        alert("Data could not be saved." + error);
      } else {
        alert("Data saved successfully.");
        view.postUserData(view.userId);
      }
    });
  }
  */
view.authData = '';

view.logInUserFx = function() {
  $('.patient').empty();
  $('.patient').append('<p class="patListItem"><a class="patListText0"> Your patients will appear here</a></p>');
  console.log('logInUserfx');
  var ref = new Firebase("https://shining-inferno-9786.firebaseio.com");
  ref.authWithPassword({
    email: document.getElementById("loginEmail").value,
    password: document.getElementById("loginPassword").value
  }, function(error, authData) {
    if (error) {
      console.log("Login Failed!", error);
    } else {
      console.log("Authenticated successfully with payload:", authData);


      view.userId = authData.uid; //use this to have global access to the logged in user's id.
      view.authData = authData; // use this global to access email property for the $prepend "You are logged in as"
      view.userMainFx(authData);
    }
  });
  $('.fp__btn').hide();
  //view.clearField();
}

view.idArray = [];

view.userMainFx = function(Data) {
  $('.pat-list-item-box').empty();
  var uid = view.userId; // use this bc "." does not work inside the .child( ) method
  var ref = view.dataRef.child('users').child(uid).child('patList');
  var temp = '';
  ref.on("value", function(snapshot) {
      var patData = snapshot.val();
      var counter = 0;
      for (var w in patData) {
        console.log(w);
        counter = counter + 1;
        view.idArray.push(w);
        var ref = view.dataRef.child('users').child(uid).child('patList').child(w);
        var temp = patData[w];
        if (w === 'id' && counter === 1) {
          $('.pat-list-item-box').prepend('<li class="pat-list-item"><a class="pat-list-text">You have no patients</a></li>');
        } else {
          $('.pat-list-item-box').prepend('<li class="pat-list-item"><a id="' + w + '" class="pat-list-text" onClick="view.selectFileNameFirst(this.id); view.downloadPatFileName()">' + temp.firstName + ' ' + temp.lastName + '  ' + w + '</a></li>');
        }
      }
      $('.pat-list-welcome').prepend('<p class="patUser">Welcome back ' + view.authData.password.email + '</p>');
    },
    function(errorObject) {
      console.log("The read failed: " + errorObject.code);
    }
  )
};

view.selectFileNameFirst = function(id) { //before uploading the pick button is hidden...it is turned on when the user selects a file name from the pulldown
    view.currPat = id; // id really is the patient id
    var temp = id;
    var temp2 = '';
    var ref = view.dataRef.child('patients').child(id);
    console.log(temp); // this is truly the pid
    ref.on('value', function(snapshot) {
        temp2 = snapshot.val();
        view.currPatName = temp2.patFirstName + ' ' + temp2.patLastName;
        $('.pat-info-name').append('<div class="pat-name">Patient name: ' + temp2.patFirstName + ' ' + temp2.patLastName + '</div>');
        $('.pat-dob').append('<div class="pat-DOB">DOB: ' + temp2.dob + '</div>');
        $('#select-file-name').change(function(id) {
          //console.log(id);
          var fileIndex = document.getElementById('select-file-name').selectedIndex;
          if (fileIndex > 0) {
            view.currPat = id;
            $('.fp__btn').show();
            //console.log(temp);
            view.downloadPatFileName();
          } else {
            $('.fp__btn').hide();
            view.selectFileNameFirst(temp);
          }
        })
      },
      function(errorObject) {
        console.log("The read failed: " + errorObject.code);
      }
    )
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

view.fileList = [];

view.downloadPatFileName = function() {
  var patId = view.currPat;
  console.log(patId);
  var temp = '';
  var ref = view.dataRef.child('patients').child(patId).child('files');
  ref.on('value', function(snapshot) {
      temp = snapshot.val();
      console.log(temp); // temp contains an object of the file names (not file ids)
      for (w in temp) { // 'w' is a fileName
        $('.pat-files').append('<div class="file-item" id="' + w + '" onClick="view.renderFile(w)">' + w + '</div>');
        view.fileList.push(w);
      }
    },
    function(errorObject) {
      console.log("The read failed: " + errorObject.code);
    }
  )
}



view.renderFile = function(fileName) {
  view.scene.remove(view.object1);
  view.scene.remove(view.object3);
  //view.scene.remove(object3);

  var ref2 = '';
  var temp = '';
  var fileId = '';
  var patId = view.currPat; // confirmed that this is the string patId
  var ref = view.dataRef.child('patients').child(patId).child('files').child(fileName);
  ref.on('value', function(snapshot) {
      fileId = snapshot.val(); //there will be only ONE  id for each file name
      console.log(fileId); // fileId = an object containing the key id which contains another object with the key url:'the-url-here'
      for (w in fileId) { // there is only ONE url for each patId
        fileId = w; // 'w' is the string file id
        ref2 = view.dataRef.child('patients').child(patId).child('files').child(fileName).child(fileId);
        ref2.on('value', function(snapshot) {
          console.log(snapshot.val()); // object containing {url: http}
        }, function(errorObject) {
          console.log("The read failed: " + errorObject.code);
        })
      }
    },
    function(errorObject) {
      console.log("The read failed: " + errorObject.code);
    })

  var ref3 = '';
  var temp = '';
  var ref3 = view.dataRef.child('patients').child(patId).child('files').child(fileName).child(fileId);
  ref3.on('value', function(snapshot) {
    temp = snapshot.val(); // temp = the file id
    view.currFileUrl = temp.url;
    console.log(view.currFileUrl); // this is the string url

  }, function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  });
  view.downloadStl();
}

view.downloadStl = function() {
  var url = view.currFileUrl;
  console.log(url);
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
}


view.yourApiKey = 'AhTgLagciQByzXpFGRI0Az';
filepicker.setKey(view.yourApiKey);


view.listOfStlUrls = {}

view.testurl = 'https://cdn.filestackcontent.com/J2mXNq2sQFCTYNlLiUig'; //'https://cdn.filestackcontent.com/F6XOaqXTR6miOAkF2hdf';

view.reader = new FileReader();
/*
view.downLoadStl = function() {
  var oStlLoader = new THREE.STLLoader();
  oStlLoader.load('https://cdn.filestackcontent.com/F6XOaqXTR6miOAkF2hdf', function(geometry) {
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
    view.scene.add(mesh);
  });
}
*/
var octopus = {};

octopus.start = function() {
  view.init();
  view.loadStlTeeth();
  //  view.loadStlBrackets();
  view.loadStlMounds();
  //view.animate();
  //view.downLoadStl();
  //view.startAnimation();

  //view.stopAnimate();
}

/*window.onresize = function() {
  //view.render();
}*/
octopus.start();

ko.applyBindings(new ViewModel());

//view.stopAnimate();

view.clearField = function() {

  nuemail.value = '';
  nupassword.value = '';
  loginEmail.value = '';
  loginPassword.value = '';
  patFirstName.value = '';
  patLastName.value = '';
}

/*
view.initialData = {
  users: null
}


    userId: {
      firstName: null,
      lastName: null,
      firstName: null,
      suffix: null,
      userType: null,
      address: null,
      city: null,
      state: null,
      zip: null,
      phoneOffice: null,
      phoneMobile: null,
      email: null,
      staffContact: {
        firsName: null,
        lastName: null
      },
      patList: {
        secretId: {
          lastName: null,
          firstName: null,
        }
      }
    }
  }
  patients: {
    secretId: {
      firsnName: null,
      lastName: null
      files: {
        scans: {
          uIni: null,
          lIni: null
        }
        models: {
          uPre: null,
          lPre: null,
          uSet: null,
          lSet: null
        }
        trays: {
          u1: null,
          l1: null
        }
        cad: {
          tray2m: null,
          tray3m: null,
          clipTree: null
        }
      }
    }
  }
}
*/




/*
  //this is where we apply opacity to the arrow

  $(window).scroll( function(){

    //get scroll position
    var topWindow = $(window).scrollTop();
    //multipl by 1.5 so the arrow will become transparent half-way up the page
    var topWindow = topWindow * 1.5;

    //get height of window
    var windowHeight = $(window).height();

    //set position as percentage of how far the user has scrolled
    var position = topWindow / windowHeight;
    //invert the percentage
    position = 1 - position;

    //define arrow opacity as based on how far up the page the user has scrolled
    //no scrolling = 1, half-way up the page = 0
    $('.arrow-wrap').css('opacity', position);

  });

  */



//Code stolen from css-tricks for smooth scrolling:
/*
$(function() {
  $('a[href*=#]').click(function() { //means that all elements with href attribute conatining '#', except those whose href attribute equals to #
    console.log('Hey');
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      console.log('target');
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
});
*/