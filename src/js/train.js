var view = {};

view.dataRef = new Firebase("https://shining-inferno-9786.firebaseio.com");

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

view.logout = function() {
    if (view.currUser.email === null || view.currUser.email === '' || view.currUser.email === undefined) {
        $('.loginContain').show();
        $('.row').hide();
    } else {
        view.dataRef.unauth(function(error) {
            if (error) {
                alert('error trying to log out. You are still logged in')
            } else {
                $('.loginContain').show();
                $('.row').hide();
                $('.userEmail').val('your@email.com');
                $('.userPassword').val('password');
                document.getElementById('userEmail').style.backgroundColor = 'hsla(1, 0%, 95%, 0.8)';
                document.getElementById('userPassword').style.backgroundColor = 'hsla(1, 0%, 95%, 0.8)';
                alert('Log out successful.')
                $('.logout').text('Login');
            }
        });
    }
};

$(document).ready(function() {
    

view.currUser = {};
//document.getElementById('userEmail').value = 'breising1@mac.com';
//document.getElementById('userPassword').value = '1234';

    $('.submit').click(function() {

        view.currUser.email = $('#userEmail').val();
        view.currUser.password = $('#userPassword').val();
        console.log(view.currUser.email + ' ' + view.currUser.password);

        //var ref = new Firebase("https://shining-inferno-9786.firebaseio.com");
        view.dataRef.authWithPassword({
            email: view.currUser.email,
            password: view.currUser.password
        }, function(error, authData) {
            if (error) {

                $('.userEmail').val('your@email.com');
                $('.userPassword').val('password');
                document.getElementById('userEmail').style.backgroundColor = 'hsla(1, 0%, 95%, 0.8)';
                 document.getElementById('userPassword').style.backgroundColor = 'hsla(1, 0%, 95%, 0.8)';

                $('.login-fail').text('Login attempt failed. Please try again.');
                //userEmail.value = userEmail.defaultValue;
                //userPassword.value = userPassword.defaultValue;
                view.currUserEmail = null;
                view.currUserPassword = null;
                view.currUserId = null;

                
                setTimeout(function() { // create a pause then erase success message
                    alert('Login attempt failed. Sorry.');
                }, 100);

            } else {
                $('.loginContain').hide();
                $('.row').show();
                 $('.logout').text('Logout');

                $('.userEmail').val('');
                $('.userPassword').val('');

                view.currUserId = (authData.uid);
                console.log(view.currUserId);
            }
        })
    });

$('.logout').click(function() {
    view.logout();
})

    var slides = [{
        head: 'Overview Part 1',
        image1: 'images/appliance1.png',
        slideNumber: 2,
        width: 200,
        margin: 10,
        text2: null,
        displayFlex: null,
        height: null,
        marginTop: 40,
        voiceText: "Orthodontic patients have suffered for too long with  braces that are ugly, uncomfortable, and inefficient. Now, Ortho cure offers a treatment system that is not only invisible but is also so comfortable that your patients will forget they're wearing braces. In addition, ortho cure actually improves the quality and speed of treatment. Thats right, it is now possible to offer patients comprehensive orthodontic treatment that has absolutely zero impact on their lifestyle. They can look normal, feel normal, speak normally, and eat normally. And the digital powers that make this possible also make ortho cure work better than any other solution.",
        audio: '<source src="audio/overview1.mp3" type="audio/wav">',
        textImage: ''
    }, {
        head: 'Overview Part 2',
        image1: 'images/appliance1.png',
        slideNumber: 2,
        width: 200,
        margin: 10,
        text2: null,
        displayFlex: null,
        height: null,
        marginTop: 40,
        voiceText: "Ortho cure also provides doctors with many advantages as well. Doctors are working too hard and spending too much of their time doing arduous and mundane technical tasks like positioning brackets and wire bending. These tasks could be done far better and far more efficiently if they were automated. Ortho cure leverages digital technologies to accomplish these technically demanding tasks with ease and precision. In fact, as you will see, most of the doctors overall technical work can be automated so that technical task are performed with predictable and effortless precision. You will enjoy the confidence in knowing that what you see in the setup, is exactly what you will get as the result. As such, you will find that the ortho cure system is even easier and more fun to operate than regular braces.",
        audio: '<source src="audio/overview2.mp3" type="audio/wav">',
        textImage: ''
    },{
        head: 'Invisible Alternatives Part 1',
        image1: 'images/clear-aligner.png',
        slideNumber: 3,
        width: 200,
        margin: 15,
        text2: null,
        displayFlex: null,
        height: null,
        marginTop: 0,
        voiceText: 'Clear aligners are a nice addition to our arsenal, but, they tend to be unpredictable, they move teeth quite slowly and inefficiently, and their applications are quite limited. For instance, they do not tend to be a good choice for comprehensive cases of any significant difficulty. Other disadvantages are: 1. that they require plastic covering the biting surfaces, 2, that they are removable so that compliance issues can be problematic, and 3, that they are a hassle to remove every time a patient wants to eat or snack, and 4, they tend to lack good mechanical leverage required, for instance, to make detailed vertical movements.',
        audio: '<source src="audio/transcript (3).mp3" type="audio/wav">',
        textImage: ''
    }, {
        head: 'Invisible Alternatives Part 2',
        image1: 'images/lingual-bracket.png',
        slideNumber: 4,
        width: 100,
        margin: 35,
        text2: null,
        displayFlex: null,
        height: null,
        marginTop: 40,
        voiceText: 'Traditional lingual braces, while having the benefit of being hidden from view, are very very uncomfortable for patients and can be quite difficult for doctors to work with. For these reasons, lingual appliances have not gained much popularity.',
        audio: '<source src="audio/transcript (4).mp3" type="audio/wav">'
    }, {
        head: 'Inspiration',
        image1: 'images/upper-ret.png',
        slideNumber: 5,
        width: 200,
        margin: 50,
        text2: null,
        displayFlex: null,
        height: 100,
        marginTop: 30,
        voiceText: 'Upper fixed retainers have been done for many years by many doctors, but with varying degrees of success. But it has been discovered that, when installed correctly, upper fixed retainers are very very durable and very very comfortable. In fact, their primary appeal is that they allow patients to live a completely normal life without esthetic compromises and without functional compromises and without having to remember to wear their retainers and without the hassles of breakage. And, they can eat normally and speak normally. So, the question is, could it be possible to create an "active" appliance that is identical in size, shape, and smoothness to a fixed retainer ? ',
        audio: '<source src="audio/upperfixed.mp3" type="audio/wav">'
    }, {
        head: 'Tubes',
        image1: 'images/appliance1.png',
        slideNumber: 6,
        width: 220,
        margin: 50,
        text2: null,
        displayFlex: null,
        height: null,
        marginTop: 40,
        voiceText: 'The solution is found by eliminating some structural features of the traditional bracket and reducing it to nothing more than a simple, low profile, square tube. So, we eliminate the bracket tie wings and the bracket base. The extremely small size of the new bracket that results from this shrinkage, is key to makeing it comfortable. But, since there is no base to offer a large surface area with retentive mesh, the tube must be attached differently. So, the tube is attached to the tooth, by fully encapsulating it in a mound of composite adhesive. Thereby, the composite serves two functions. It bonds the tube to the tooth, and it also serves as the structural body of the bracket. The outer, tongue side surface of the bracket body is thus composed of a smooth, polishable, convex composite surface. You will see later, that the entire shape of this composite interface, is fully customizable. As such, during delivery of the appliance, both a customized base structure, and a customized outer surface, are created with very little effort. And, the result is a compact, robust, durable structure that is resistant to leverage from biting forces, since it has no extended features. And, because it is so small, comfortable and durable, the same attachment that aligns the teeth can remain indefinitely as a fixed retainer. No additional impressions needed. No additional appointments needed.',
        audio: '<source src="audio/tubes2.mp3" type="audio/wav">'
    }, {
        head: '0.020"x 0.020"',
        image1: 'images/bracket2.png',
        slideNumber: 7,
        width: 200,
        margin: 50,
        text2: null,
        displayFlex: null,
        height: null,
        marginTop: 50,
        voiceText: 'You can see here, a 3D image of the metal bracket tube. Its interior dimensions are zero point zero two inches square. Its outer surfaces are micro etched to maximize adhesion within the composite.',
        audio: '<source src="audio/transcript (7).mp3" type="audio/wav">'
    }, {
        head: 'No Ligation',
        image1: 'images/appliance1.png',
        slideNumber: 8,
        width: 220,
        margin: 50,
        text2: null,
        displayFlex: null,
        height: null,
        marginTop: 40,
        voiceText: 'With traditional braces, the wire is inserted into the open face, of the bracket slot, and then the wire is ligated to hold it inside the slot. This presents an opportunity for error, when a ligature loosens, and allows for the relapse of a rotation. Or, when a ligature is not fully secured, as often happens, a rotation will not be fully corrected. Consider also, that ligatures add a tremendous amount of friction to the system, which we all know slows tooth movement dramatically. Consider also, that additional steps must be completed, to secure the wire of the traditional system, meaning that you must take the time to tie each bracket to the wire. In contrast, with a series of tubes, the wire is threaded through the tubes rather than inserted into the open face of the slot, and it does not require the additional steps of ligation. This is much faster than using open face slots. And, because there are no ties, this creates a super low friction system where teeth move with superior efficiency. And, since there are no ties, the system is not prone to all the errors that inevitably will result from the arduous, repetitive, manual task of tying brackets.',
        audio: '<source src="audio/ligature.mp3" type="audio/wav">'
    }, {
        head: 'Threaded Wire',
        image1: 'images/wire1.png',
        slideNumber: 9,
        width: 250,
        margin: 50,
        displayFlex: null,
        height: 185,
        marginTop: 40,
        voiceText: 'This image demonstrates how a wire is threaded into the slots. Note the looping technique. This is useful where teeth are severely mal-aligned to the extent that it is difficult to thread directly from one tooth to the adjacent tooth. Instead, you can create a loop first and then gently pull the loop out. We will address the topic of wire insertion technique in more detail later.',
        audio: '<source src="audio/transcript (9).mp3" type="audio/wav">'
    }, {
        head: 'Threaded Wire',
        image1: 'images/wire2.png',
        slideNumber: 10,
        width: 250,
        margin: 50,
        displayFlex: null,
        height: 185,
        marginTop: 40,
        voiceText: 'In this image the loop is almost compeletly pulled out.',
        audio: '<source src="audio/transcript (10).mp3" type="audio/wav">'
    }, {
        head: 'Threaded Wire',
        image1: 'images/wire3.png',
        slideNumber: 11,
        width: 250,
        margin: 50,
        displayFlex: null,
        height: 185,
        marginTop: 40,
        voiceText: 'And now, in this image, you can see that the loop is completely pulled out. Sometimes the wire will kink, when you try to do this. Later, we will discuss how to prevent kinking, also called non-elastic deformation, and how to work around this problem when it happens.',
        audio: '<source src="audio/transcript (11).mp3" type="audio/wav">'
    }, {
        head: 'Implications of Tubes',
        image1: 'images/appliance1.png',
        slideNumber: 12,
        width: 220,
        margin: 50,
        text2: null,
        displayFlex: null,
        height: null,
        marginTop: 40,
        voiceText: 'With a system of tubes, the bracket positioning must be absolutely perfect to get great results. So, how do we achieve this ? It is a combination of accurate bracket slot orientation, precise delivery, and appliance customization. Accurate slot orientation is accomplished by creating a digital 3 D setup to simulate the exact final positions of the teeth. Then, an indirect bonding tray is 3 D printed, and used to deliver the tubes precisely in the orientation set by the computer. Finally, customization is realized automatically as part of this process. We will cover this in more detail later. The important thing to understand here is that the combination of accuracy, precision, and customization is capable of producing a level of quality that we have never before experienced. You quickly discover that it is quite easy to produce astounding results much, much faster, without the need for wire bending, and therefore, with much less effort.',
        audio: '<source src="audio/tubes1.mp3" type="audio/wav">'//************************
    }, {
        head: 'Coming Soon: Comp Treatment',
        image1: 'images/comp.png',
        slideNumber: 12.1,
        width: 220,
        margin: 50,
        text2: null,
        displayFlex: null,
        height: null,
        marginTop: 40,
        voiceText: 'With a system of tubes, there is another issue we must address. Consider the fact that step bends cannot be pulled through a series of tubes. And, the more bends added, the more difficult it gets. So, how do we make adjustments ?? The answer is two fold. First, bends simply are not needed when the tubes are so precisely positioned. Second, in reality, you can place bends in small diameter nickel titanium wires and pull them through the tubes. But, you really will not need to do this. We want to just avoid bending wires altogether. But this presents a problem when it comes to inserting a full arch wire during comprehensive treatment. With regular lingual appliances, the step between the canine and adjacent premolar requires a step bend in the wire. With regular labial braces, threading would have to start on the distal of the first or second molar and this would be unreasonably difficult. So, how can comprehensive treatment be done when we cannot thread a wire through the whole arch,? Ortho cure takes a new approach to comprehensive treatment mechanics. Rather than using one continuous wire through the whole arch, the ortho cure system breaks it up into three wire segments. First is the anterior segment canine to canine. Then, there are two posterior segments that include the canine back to the most posterior tooth. So, yes you heard correct, the canines have 2 tubes. And each tube accepts a different wire. This creates an overlap point. This overlap point allows 2 segments to influence the tooth so that it mimics the mechanical effect of a single continuous wire but with all the advantages of having multiple wire segments. Such a system is only possible when using the extraordinarily high precision and accuracy of slot positioning that ortho cure employs. In addition, we have found that it is much easier for doctors to work on the facial side and that there is no esthetic liability for patients who wear a posterior segment on the facial side. Therefore, we recommend placing anterior segments on the lingual to keep them hidden. And place the posterior segments on the facial to keep them accessible. As such, each canine tooth has a tube placed on both the lingual and facial surfaces. The tube on the facial of the canine can be offset to the far distal end of the tooth where it is well hidden from view. In addition, flowable composite is used to further blend the anatomy of these facial bracket mounds into the tooth surface to camoflage them.',
        audio: '<source src="audio/moreimp.mp3" type="audio/wav">'
    }, {
        head: 'Coming Soon: Comp Tx',
        image1: 'images/comp.png',
        slideNumber: 12.1,
        width: 220,
        margin: 50,
        text2: null,
        displayFlex: null,
        height: null,
        marginTop: 40,
        voiceText: 'Now you can see how comprehensive treatment is done with ortho cure - although there are many more details yet to be disclosed. However, currently we are focused on teaching doctors how to use ortho cure for limited treatment cases only. Again, we will begin accepting comprehensive treatment cases in the very near future, but for now, we are only accepting limited treatment cases. If you wish to start a comprehensive treatment case, please first contact the ortho cure support team to discuss this.',
        audio: '<source src="audio/comp2.mp3" type="audio/wav">'
    }, {
        head: 'Anatomy',
        image1: 'images/toothmnd4.png',
        slideNumber: 13,
        width: 200,
        margin: 50,
        text2: null,
        displayFlex: null,
        height: null,
        marginTop: 40,
        voiceText: 'So now, lets take a closer look at the anatomy of the ortho cure bracket. This illustration shows a tube in green approximated to the lingual surface of an incisor. Unlike a regular bracket, there is not a large base component to the tube that could provide a surface area for bonding it to the tooth. Instead, we can attach this tube to the tooth by encapsulating it in a mound of composite.',
        audio: '<source src="audio/greentube.mp3" type="audio/wav">'
    }, {
        head: 'Anatomy',
        image1: 'images/mound.png',
        slideNumber: 14,
        width: 200,
        margin: 50,
        text2: null,
        displayFlex: null,
        height: null,
        marginTop: 40,
        voiceText: 'This image shows the green tube encapsulated by the fully cured blue composite mound. When cured, the composite serves to adhere the tube to the tooth and, also serves as the structural body of the bracket. It is important to understand that, when the composite first comes into contact with the tooth, it is uncured and, therefore it flows and forms itself into the shape of the tooth surface on one side, and it takes the shape of the tray on the opposite side. As such, during the process of delivering the appliances, you are actually creating fully customized brackets. All aspects of the bracket are customized. The tissue adjacent composite surfaces are smooth, convex, and gently blend into the tooth anatomy to maximize comfort. And, all 6 degrees of freedom of orientation of the slot are accounted for.',
        audio: '<source src="audio/bluemound.mp3" type="audio/wav">'
    }, {
        head: 'Anatomy',
        image1: 'images/toothmnd6.png',
        slideNumber: 15,
        width: 200,
        margin: 50,
        text2: null,
        displayFlex: null,
        height: null,
        marginTop: 40,
        voiceText: 'This image shows the tray mounted on top of the bracket and tooth. Note that you can see the concave outline of the mound feature in the tray which forms the convex surface of the composite mound. Here, the mound outline seen in the tray is actually slightly larger than the composite mound. This is because the mound should be polished after curing the composite to improve smoothness for better comfort. The polishing technique will always remove some of the mound, and therefore, you want it slightly enlarged at first so as not to reduce it excessively.',
        audio: '<source src="audio/transcript (15).mp3" type="audio/wav">'
    }, {
        head: 'Anatomy',
        image1: 'images/toothmnd7.png',
        slideNumber: 16,
        width: 200,
        margin: 50,
        text2: null,
        displayFlex: null,
        height: null,
        marginTop: 40,
        voiceText: 'This image shows the clip added to the tray. As you will see later, the clip serves to secure the tube to the tray. It is shown in red here, but, it will be very difficult to see it in real-life since it is made of the same translucent material as the tray.',
        audio: '<source src="audio/transcript (16).mp3" type="audio/wav">'
    }, {
        head: 'Single Tray',
        image1: 'images/trayclip2.png',
        slideNumber: 17,
        width: 200,
        margin: 50,
        text2: null,
        displayFlex: null,
        height: null,
        marginTop: 40,
        voiceText: 'This image shows a profile view of a single tooth tray in yellow. Each tooth that receives a bracket will have its own single tooth tray. These single trays are connected in the virtual environment to create the completed indirect bonding tray. Notice that the clip component in red, serves to hold the tube and allows it to be mounted to the tray. Each tooth is mated to a single tray component and then, the single tray units are connected to create the connected version of the tray. Finally, the physical tray is created via 3-d printing.',
        audio: '<source src="audio/transcript (17).mp3" type="audio/wav">'
    }, {
        head: 'Single Tray',
        image1: 'images/tray1.png',
        slideNumber: 18,
        width: 200,
        margin: 50,
        text2: null,
        displayFlex: null,
        height: null,
        marginTop: 40,
        voiceText: 'This image shows the same tray without the red clip component.',
        audio: '<source src="audio/transcript (18).mp3" type="audio/wav">'
    }, {
        head: 'Single Tray',
        image1: 'images/tray2.png',
        slideNumber: 19,
        width: 200,
        margin: 50,
        text2: null,
        displayFlex: null,
        height: null,
        marginTop: 40,
        voiceText: 'This image shows a single tooth tray from the underside. You can see the concave void where the uncured composite will be added and cured to form the outer surface of the finished bracket.',
        audio: '<source src="audio/tray3.mp3" type="audio/wav">'
    }, {
        head: 'Single Tray',
        image1: 'images/trayclip3.png',
        slideNumber: 20,
        width: 200,
        margin: 50,
        text2: null,
        displayFlex: null,
        height: null,
        marginTop: 40,
        voiceText: 'This is an image of the same view of the same tray but with the clip mounted to the tray. The clip serves to hold the tube and suspend it in space above the void so that the composite can flow around it and encapsulate it.',
        audio: '<source src="audio/tray4.mp3" type="audio/wav">'
    }, {
        head: 'Single Tray',
        image1: 'images/trayclipbkt1.png',
        slideNumber: 21,
        width: 200,
        margin: 50,
        text2: null,
        displayFlex: null,
        height: null,
        marginTop: 40,
        voiceText: 'This is an image of the same view of the same tray and clip but with the tube now being secured by the clip. Notice that the tube is being suspended in space above the void formed in the tray.',
        audio: '<source src="audio/tray5.mp3" type="audio/wav">'
    }, {
        head: 'Single Tray',
        image1: 'images/trayclip4.png',
        slideNumber: 22,
        width: 200,
        margin: 50,
        text2: null,
        displayFlex: null,
        height: null,
        marginTop: 40,
        voiceText: 'Here now is the same tray again shown from the front, or the lingual side. Notice how the red clip wraps around the tray so that it is secured to the tray. Again, keep in mind that all single tooth trays are eventually connected to create the usable physical version of the tray via 3d printing. You will see the single tooth tray represented here only for demonstration purpose. You will never see single tooth trays elsewhere.',
        audio: '<source src="audio/tray6.mp3" type="audio/wav">'
    }, {
        head: 'Clip',
        image1: 'images/clip1.png',
        slideNumber: 23,
        width: 200,
        margin: 50,
        text2: null,
        displayFlex: null,
        height: null,
        marginTop: 40,
        voiceText: 'This image shows the clip alone. Notice the two square pyramidal protrusions pointing toward each other. The tube is mounted to these protrusions. Their square shape allows them to specify the tork orientation of the tube.',
        audio: '<source src="audio/tray7.mp3" type="audio/wav">'
    }, {
        head: 'Clip w/ Tube',
        image1: 'images/clip2.png',
        slideNumber: 24,
        width: 200,
        margin: 50,
        text2: null,
        displayFlex: null,
        height: null,
        marginTop: 40,
        voiceText: 'This is the same image with the clip now holding the tube in place.',
        audio: '<source src="audio/tray8.mp3" type="audio/wav">'
    }, {
        head: 'Lower Arch Tray 22-27',
        image1: 'images/tray30.png',
        slideNumber: 25,
        width: 200,
        margin: 51,
        text2: null,
        displayFlex: null,
        height: null,
        marginTop: 35,
        voiceText: 'Here now is an image of a lower arch tray for teeth 22 through 27. First, notice that the clip components are not shown here but they will always be required on a real case. Notice also how each single tray unit is connected to adjacent single tooth trays to form the finished indirect bonding tray.',
        audio: '<source src="audio/tray9.mp3" type="audio/wav">'
    }, {
        head: 'Tray Top View',
        image1: 'images/trayOnTeeth.png',
        slideNumber: 26,
        width: 200,
        margin: 50,
        text2: null,
        displayFlex: null,
        height: null,
        marginTop: 30,
        voiceText: 'This image shows the same tray from a top view and mounted to the model teeth',
        audio: '<source src="audio/tray10.mp3" type="audio/wav">'
    }, {
        head: 'Tray Top View',
        image1: 'images/tray55.png',
        slideNumber: 27,
        width: 250,
        margin: 40,
        text2: null,
        displayFlex: null,
        height: null,
        marginTop: 35,
        voiceText: 'The next image shows the top view of the same tray without the model teeth.',
        audio: '<source src="audio/tray11.mp3" type="audio/wav">'
    }, {
        head: 'Tray Bottom View',
        image1: 'images/tray56.png',
        slideNumber: 28,
        width: 200,
        margin: 50,
        text2: null,
        displayFlex: null,
        height: null,
        marginTop: 40,
        voiceText: 'The next image shows the bottom view of the same tray',
        audio: '<source src="audio/tray12.mp3" type="audio/wav">'
    }, {
        head: 'Tray Close Up',
        image1: 'images/tray32.png',
        slideNumber: 29,
        width: 180,
        margin: 50,
        text2: null,
        displayFlex: null,
        height: null,
        marginTop: 38,
        voiceText: 'And now here is a close up view of the tray mounted on the model teeth. You will have noticed that the tray has many interesting structural features. These will be discussed in more detail in a later section.',
        audio: '<source src="audio/tray13.mp3" type="audio/wav">'
    }, {
        head: 'Submit a Case',
        image1: 'images/scan.svg',
        slideNumber: 30,
        width: 100,
        margin: 50,
        text2: null,
        displayFlex: null,
        height: null,
        marginTop: 40,
        voiceText: 'To submit a case to orthocure, you must first obtain your patients scan files in the, s, t, l, format. Again, thats the, dot, s, t, l, file extension format. If you need help with this, please contact orthocure support and they will be glad to assist you. After uploading your file, orthocure will create a setup of the teeth based on your instructions. If you do not approve of the initial setup, send us some new instructions and we will make corrections. After you approve our setup, we will fabricate the indirect bonding tray with the brackets pre-installed. All you need to do is apply the composite chair-side.',
        audio: '<source src="audio/submit.mp3" type="audio/wav">'
    }, {
        head: 'www.orthocure.biz',
        image1: 'images/oc1.png',
        slideNumber: 31,
        width: 200,
        margin: 50,
        text2: null,
        displayFlex: null,
        height: null,
        marginTop: 40,
        voiceText: 'The orthocure website handles all of your case submission tasks. Thats at w-w-w dot o-r-t-h-o-c-u-r-e dot b-i-z. To get started, you need to create a doctors account.',
        audio: '<source src="audio/website.mp3" type="audio/wav">'
    }, {
        head: 'New Doctor Account',
        image1: 'images/oc2.png',
        slideNumber: 32,
        width: 200,
        margin: 50,
        text2: null,
        displayFlex: null,
        height: null,
        marginTop: 40,
        voiceText: 'First, click on the doctor tab and fill out the form to create a doctors account.',
        audio: '<source src="audio/docaccount.mp3" type="audio/wav">'
    }, {
        head: 'Login',
        image1: 'images/oc91.png',
        slideNumber: 33,
        width: 150,
        margin: 50,
        text2: null,
        displayFlex: null,
        height: null,
        marginTop: 40,
        voiceText: 'Then, log in using your new username and password.',
        audio: '<source src="audio/login.mp3" type="audio/wav">'
    }, {
        head: 'Patient List',
        image1: 'images/oc3.png',
        slideNumber: 34,
        width: 200,
        margin: 50,
        text2: null,
        displayFlex: null,
        height: null,
        marginTop: 40,
        voiceText: 'Once logged in, you will see your email username in the upper left corner of the display to indicate who is currently logged in. To view your list of patients or to add a new patient, click on the Patient tab at the top middle of the screen. Patients are listed in the order submitted chronologically with the newest patient at the top of the list.',
        audio: '<source src="audio/patlist.mp3" type="audio/wav">'
    }, {
        head: 'Add New Patient',
        image1: 'images/oc92.png',
        slideNumber: 35,
        width: 200,
        margin: 50,
        text2: null,
        displayFlex: null,
        height: null,
        marginTop: 40,
        voiceText: 'To add a new patient, click the add patient button and Please fill in the patient name and date of birth.',
        audio: '<source src="audio/addpat.mp3" type="audio/wav">'
    }, {
        head: 'Patient Chart',
        image1: 'images/oc4.png',
        slideNumber: 36,
        width: 200,
        margin: 50,
        text2: null,
        displayFlex: null,
        height: null,
        marginTop: 40,
        voiceText: 'Once you have at least one patient added, then you can click on a patient in the patient list to view that patients chart. After selecting a patient from the list, you will see the patients name listed in red in the upper left of the screen just below the currect user email. The chart contains two buttons, one for uploading files, and one for adding prescription notes. Below the buttons, you will see a list of events listed in chronological order starting with the initial event called the, add new patient event. Every action is recorded as an event, and every event triggers an email to both you, the doctor, and to the orthocure support team. Each event in the list contains a date stamp in black followed by the event name in green. Some events will require a subsequent action to be performed. For instance, after a setup is uploaded, then it requires approval by the doctor. As such, if there is a pending action, an alert will display red text to the right of the event name. Pending actions are listed in red, so you can quickly scan your patient chart to see what actions are required. When you upload a scan file, it will show up in the list as an event with a name like upper, scan, 1. To view the image file or the 3D s-t-l file, click on the corresponding event in the list. Please ignore all text colored light gray. This is for administrative use only.',
        audio: '<source src="audio/patchart.mp3" type="audio/wav">'
    }, {
        head: 'Upload File',
        image1: 'images/oc5.png',
        slideNumber: 37,
        width: 200,
        margin: 50,
        text2: null,
        displayFlex: null,
        height: null,
        marginTop: 40,
        voiceText: 'To up-load a file, click on the up-load file button on the patient chart. You will then see an option to select a name for the file. It is required that you select a name for the file, and, be careful to select the proper file name. If you select the wrong name, you cannot go back and change it. To make a correction, you must up load the file again, and select the proper name. If needed, add a note to the chart to explain the error you made.',
        audio: '<source src="audio/upload.mp3" type="audio/wav">'
    }, {
        head: 'View Interactive 3D file',
        image1: 'images/oc8.png',
        slideNumber: 38,
        width: 200,
        margin: 50,
        text2: null,
        displayFlex: null,
        height: null,
        marginTop: 40,
        voiceText: 'To interact with the 3-d image on your touch device, simply touch and drag on the image to rotate or three-touch and drag to pan the image. Or, on your desktop, left click on the image and drag to rotate the image or right-click and drag to pan the image. To zoom in and out, drag the slider above the image.',
        audio: '<source src="audio/viewfile.mp3" type="audio/wav">'
    }, {
        head: 'Add Prescription Notes',
        image1: 'images/oc7.png',
        slideNumber: 39,
        width: 200,
        margin: 50,
        text2: null,
        displayFlex: null,
        height: null,
        marginTop: 40,
        voiceText: 'To add your instructions for the case, click on the add r-x note button on the patient chart. Type your instruction in the field and click save note. Be aware that you cannot edit your notes after they are saved. If you need to add more information or make corrections, please add an additional new note.',
        audio: '<source src="audio/addrx.mp3" type="audio/wav">'
    }, {
        head: "Edit Doctor's Account",
        image1: 'images/oc9.png',
        slideNumber: 40,
        width: 200,
        margin: 50,
        text2: null,
        displayFlex: null,
        height: null,
        marginTop: 40,
        voiceText: 'To change your address or email or any other contact information. First, login with your username and password. Then, click the doctor tab to access the doctor information form. Edit the information as needed. Then, click on the up-date button.',
        audio: '<source src="audio/editdoc.mp3" type="audio/wav">'
    }, {
        head: 'Add Flowable',
        image1: 'images/flowable.png',
        slideNumber: 41,
        width: 170,
        margin: 50,
        text2: null,
        displayFlex: null,
        height: 229,
        marginTop: 40,
        voiceText: 'Your indirect bonding trays will arrive with the tubes and clips installed and ready to bond. The bonding procedure is the same as any light cured bonding procedure except for the following. It is critically important to use two types of composite. First, flowable composite is added to the tubes and voids. Any good quality flowable composite should work fine. This step is important because the composite must be able to flow around the tubes completely, and it must be able to completely wet the micro etched tube surfaces, and it must flow into any crevices, and it must flow easily to prevent bubbles forming on the surface. Only a small amount of flowable composite is needed. It is best to add only enough to barely coat the tubes. Since flowable composite has less strength than the filled paste composite, we want to minimize the amount of flowable and maximize the amount of paste.',
        audio: '<source src="audio/addflow.mp3" type="audio/wav">'

    }, {
        head: 'Add Flowable',
        image1: 'images/tray-comp1.png',
        slideNumber: 42,
        width: 200,
        margin: 50,
        text2: null,
        displayFlex: null,
        height: 132,
        marginTop: 30,
        voiceText: 'This image shows flowable composite added to a real life tray. Note how difficult it is to see contrast between the composite and the tray due to the translucency of the tray material. You can see the tubes quite easily because they are metal. But, it is very difficult to see the clips.',
        audio: '<source src="audio/addflow2.mp3" type="audio/wav">'
    }, {
        head: '5gr, light-cure, meduim viscosity, dispensor',
        image1: 'images/composite.png',
        slideNumber: 43,
        width: 180,
        margin: 50, // keep this zero so that it resets from #12 slide
        text2: null,
        displayFlex: null,
        height: null,
        marginTop: 40,
        voiceText: 'Next add the paste composite to the void and tubes. We highly recommend purchasing the Reliance 5 gram capsules of medium viscosity, light cured paste with the dispensor shown. This is very, very important because we have thoroughly tested the dosing with this particular composite. Dosing the exact right amount of paste is very important.',
        audio: '<source src="audio/addpaste1.mp3" type="audio/wav">'

    }, {
        head: 'Add Paste Composite',
        image1: 'images/paster.png',
        slideNumber: 44,
        width: 180,
        margin: 50,
        text2: null,
        displayFlex: null,
        height: 229,
        marginTop: 45,
        voiceText: 'So, when you add the reliance medium paste, to get the exactly correct amount, you add two stripes a paste covering the length of the void and bracket. The 2 stripes combined with the flowable, will be just enough to completely fill the void, but not too much so that you will not create a clean up problem. If you put just right amount, you find there is almost no need to remove x s material prior to curing.',
        audio: '<source src="audio/addpaste2.mp3" type="audio/wav">'
    }, {
        head: 'Shape Composite',
        image1: 'images/CompPat.png',
        slideNumber: 45,
        width: 200,
        margin: 50,
        text2: null,
        displayFlex: null,
        height: 229,
        marginTop: 41,
        voiceText: 'After you add the two stripes of medium paste, then gently work the material with an explorer, or scaler, or micro brush, to mold it into the confines of the mound and give it a mound like shape.',
        audio: '<source src="audio/shapecomp.mp3" type="audio/wav">'
    }, {
        head: 'Add Paste Composite',
        image1: 'images/tray-comp2.png',
        slideNumber: 46,
        width: 220,
        margin: 50,
        text2: null,
        displayFlex: null,
        height: 145,
        marginTop: 40,
        voiceText: 'This image shows a real life tray with the medium paste added and ready to seat inside the mouth.',
        audio: '<source src="audio/addpaste3.mp3" type="audio/wav">'
    }, {
        head: 'Remove XS Composite',
        image1: 'images/pre-clean.png',
        slideNumber: 47,
        width: 160,
        margin: 50,
        displayFlex: null,
        height: null,
        marginTop: 40,
        voiceText: 'When the tray is seated on the teeth, you must apply gently pressure all around and make sure that the tray is fully seated, and expell the x s adhesive. Then, prior to curing the adhesive, it is very, very important to remove x s composite that oozes from around the tray borders.  But, it can be very difficult to see, since the tray material is translucent. The only spot that is critical to keep clean is the area around the clip, to the mesial and distal of where the metal tube will be located. Leaving x-s composite here can make it difficult to remove the clip and can make it difficult to insert a wire. Use an explorer, a scaler, or a micro brush to quickly swipe this area clean - just a quick once over will do. If you carefully follow the recommended procedure for dosing the proper amount of composite, the amount of x-s will be very minimal.',
        audio: '<source src="audio/removexs.mp3" type="audio/wav">'
    }, {
        head: 'Light-Cure',
        image1: 'images/light-cure.png',
        slideNumber: 48,
        width: 200,
        margin: 50,
        displayFlex: null,
        height: null,
        marginTop: 33,
        voiceText: 'Once the x-s composite is removed, begin the light cure process. Curing of the composite is aided by the high translucency of the delivery tray. Light penetrates directly through the tray to the mound below, and thus, allows for fast, and thorough curing. Curing time depends on many, many factors, such as, the quality of your curing light, the type of light source, the amount of charge in the battery, the lack of scratches or abrasions on the light tip, to name a few. So, it pays to be extra carefull with your curing process. It is always better, to cure more than you think is needed, just to be sure. Orthocure recommends the following, one, use a corded curing light rather than a battery powered unit because a battery can begin to loose power at any moment, without notice, 2, keep the tips clean and un abraided,  3, the minimum power of your cure unit should be 1000, 4, keep the tip against the tray when curing, do not allow the tip to move away from the tray, 5, cure from at least two different directions so that no areas remain in a shadow for the full cure time.',
        audio: '<source src="audio/cure.mp3" type="audio/wav">'
    }, {
        head: 'The Break-away',
        image1: 'images/breakaway1.jpg',
        slideNumber: 49,
        width: 220,
        margin: 50,
        text2: null,
        displayFlex: null,
        height: 168,
        marginTop: 33,
        voiceText: 'After all the brackets are completely cured, you can begin removing the tray. To do so, insert a scaler tip into the central groove of one of the single tray units, then twist it to break the tray into two parts. Do this for each tooth and gradually break away all pieces of the tray. To make this break away procedure easier, the trays are already, pre cut down the middle and there are only several small rivets where the trays right and left sides are actually connected. There are other areas of the tray also that are pre cut to make them disintegrate with ease.',
        audio: '<source src="audio/break1.mp3" type="audio/wav">'
    }, {
        head: 'The Break-away',
        image1: 'images/tray-midline.png',
        slideNumber: 51,
        width: 150,
        margin: 50,
        text2: null,
        displayFlex: null,
        height: 303,
        marginTop: 40,
        voiceText: 'To remove the tray from the patients mouth, starting at either end of the tray, insert a scaler into the central vertical groove of the first tray unit and twist to break it into pieces. Move to the adjacent tooth and repeat.',
        audio: '<source src="audio/break3.mp3" type="audio/wav">'
    }, {
        head: 'Allow Clips to Break-away With the Tray',
        image1: 'images/break1.png',
        slideNumber: 50,
        width: 130,
        margin: 50,
        text2: null,
        displayFlex: null,
        height: 303,
        marginTop: 40,
        voiceText: 'It is important that you do NOT try to remove the clips before breaking the tray apart. As the tray is broken apart, the clips will also break and expand and disengage from the brackets. Removing clips prior to breaking the tray, as a separate process, would be quite difficult and would prove to be a wasted effort.',
        audio: '<source src="audio/break2.mp3" type="audio/wav">'
    }, {
        head: 'One Step Clean Up',
        image1: 'images/polish.png',
        slideNumber: 44,
        width: 180,
        margin: 50,
        text2: null,
        displayFlex: null,
        height: 134,
        marginTop: 52,
        voiceText: 'For clean up and polishing, it is important that you purchase and use a Brassler Universal White Polisher 0535.21 W H T Universal Cup. Otherwise, clean up will be unnecssarily arduous and less effective. That said, if you dont have the proper cup available, it is recommended that you can also use a carbide finishing bur to smooth out the mounds. Please note that, smoothing and polishing is absolutely required, otherwise, the composite surfaces against the tongue will remain intolerably rough, and your patient will certainly complain.',
        audio: '<source src="audio/transcript (44).mp3" type="audio/wav">'
    }, {
        head: 'Reduce Mounds',
        image1: 'images/larson-mounds.png',
        slideNumber: 53,
        width: 200,
        margin: 50,
        displayFlex: null,
        height: 200,
        marginTop: 33,
        voiceText: 'It is critical to smooth and polish the mounds, and it is also important to reduce the overall thickness of the mounds in the process. The mound thickness is made intentionally more thick than is needed, so that there is plenty of room for polishing, but also, because sometimes, you might want to leave a thick mound, if you anticipate that the extra strength is needed to prevent breaking a bracket during wire insertion.',
        audio: '<source src="audio/transcript (45).mp3" type="audio/wav">'
    }, {
        head: 'Arch-form',
        image1: 'images/wire-form.svg',
        slideNumber: 54,
        width: 160,
        margin: 50,
        displayFlex: null,
        height: null,
        marginTop: 40,
        voiceText: 'Now that polishing is finished, you are ready to install the wire. As you know, there are many possible choices of wire alloy, cross section, size, and arch form. The guidelines presented here should be followed closely. First, we recommend using regular nickel titanium alloy wires due to their superior ability to resisting non elastic deformation, or kinking. Avoid use of thermal activated wires due to their tendency for permanent deformation, or kinking. Second, we recommend starting with a wire no larger than, zero point zero one two round, and, no smaller than, zero point zero one zero. Third, please choose your arch form well in advance since you might choose to special order your wires to get the arch form you desire. For instance, some doctors prefer to use their stock arch forms even though they tend to be a little too large. They will constrict them by placing bends where needed if they are too large. Other doctors prefer to order, pre formed lingual arch wires, designed for traditional lingual braces, because these arch forms are smaller. ',
        audio: '<source src="audio/transcript (46).mp3" type="audio/wav">'
    }, {
        head: 'Arch-form',
        image1: 'images/wire-form-right.svg',
        slideNumber: 55,
        width: 160,
        margin: 50,
        displayFlex: null,
        height: null,
        marginTop: 40,
        voiceText: 'Use a regular pre formed arch wire simply cut it to size.',
        audio: '<source src="audio/transcript (47).mp3" type="audio/wav">'
    }, {
        head: 'Arch-form',
        image1: 'images/wire-form-fin.svg',
        slideNumber: 56,
        width: 160,
        margin: 50,
        displayFlex: null,
        height: null,
        marginTop: 40,
        voiceText: '',
        audio: '<source src="audio/transcript (48).mp3" type="audio/wav">'
    }, {
        head: 'Wire Material',
        image1: null,
        slideNumber: 57,
        width: 300,
        margin: 62,
        displayFlex: null,
        height: null,
        marginTop: 27,
        voiceText: 'Ortho cure recommends using regular nickel titanium alloy wires due to their resilience and their superior ability to resist permanent deformation. Thermal niti wires have some interesting properties but, our experience has demonstrated that they tend produce significantly less overall tooth movement.',
        textImage: '<div class="text1"> Recommended:</div><div class="text3">"Regular" Nickel Titanium</div><div class="text1"> Avoid:</div><div class="text3">"Thermal" Alloys</div>',
        audio: '<source src="audio/material.mp3" type="audio/wav">'
    }, {
        head: 'First Wire',
        image1: null,
        slideNumber: 58,
        width: 300,
        margin: 60,
        displayFlex: null,
        height: null,
        marginTop: 27,
        voiceText: 'The first wire should never, never be larger or stiffer than a twelve round regular nickel titanium.',
        textImage: '<div class="text1"> Recommended:</div><div class="text3">0.010" or 0.012" round Nickel Titanium</div><div class="text1"> Never:</div><div class="text3">Larger than 0.012"</div>',
        audio: '<source src="audio/first.mp3" type="audio/wav">'
    }, {
        head: 'Second Wire',
        image1: null,
        slideNumber: 59,
        width: 300,
        margin: 60,
        displayFlex: null,
        height: null,
        marginTop: 27,
        voiceText: 'If your first wire was a twelve, then your second wire, after about 6 weeks of treatment, should be a fourteen nickel titaniun. If the first was a ten, then the second should be a twelve.',
        textImage: '<div class="text1"> Recommended:</div><div class="text3">0.012" or 0.014" round Nickel Titanium</div><div class="text1"></div><div class="text3"></div>',
        audio: '<source src="audio/transcript (51).mp3" type="audio/wav">'
    }, {
        head: 'Third Wire',
        image1: null,
        slideNumber: 60,
        width: 300,
        margin: 61,
        displayFlex: null,
        height: null,
        marginTop: 15,
        voiceText: 'Most limited treatment cases will finish beautifully in a fourteen nickel titanium wire. However, there are sure to be some exceptions too. If you find a small rotation is not fully corrected, you can take 2 different approaches to correcting this. We highly recommend doing a repositioning. Just make a new scan of the teeth that require correction and submit the scan for creating a new delivery tray for just one or two teeth. You should NOT remove the existing wire, and, you should NOT remove any brackets prior to the scan. Yes, that is correct, you can scan the teeth with the brackets still on the teeth. We have the original anatomy stored in the first scan you submitted. And, you only need to scan the teeth where the discrepancy exists, there is no need to rescan the whole arch. This makes it extremely easy. When the patient returns for the repositioning, then you will remove the wire, remove one or two brackets, and rebond them using your new tray. This option is preferred over the second option for two reasons. First, it is more predictable and second, because it allows for keeping a straight wire for use as the retainer appliance. The second option for correcting the rotation is to place compensating bends into a twelve wire. Do Not try to insert a bent wire larger than twelve. While bending the wire certainly can work, it also increases the chance of breaking a bracket, and , it is not as reliable or predictable as doing a repositioning. We like to think of what is best for the patient long term. That usually means keeping a straight wire so they can use their appliances as their retainer too.',
        textImage: '<div class="text1">Optional:</div><div class="text3">0.012" round "bent" or 0.016"x0.016" Nickel Titanium</div><div class="text1"></div><div class="text3"></div><div class="text1">Never:</div><div class="text3">try to insert a bent wire larger than 0.012"</div>',
        audio: '<source src="audio/transcript (52).mp3" type="audio/wav">'
    }, {
        head: 'Fourth Wire',
        image1: null,
        slideNumber: 61,
        width: 300,
        margin: 60,
        displayFlex: null,
        height: null,
        marginTop: 29,
        voiceText: 'It is certainly reasonable to progress to a square wire to express tork. And, the ortho cure system has been designed to allow for torking teeth using the main arch wire. However, our experience has been that torking teeth using the main arch wire just is not very effective, regardless of the type of braces used. Rather, we recommend using a tork auxilliary. It works much much faster, and much more predictably. ',
        textImage: '<div class="text1"> Optional:</div><div class="text3">0.018"x0.018" Nickel Titanium</div><div class="text1"></div><div class="text3"></div>',
        audio: '<source src="audio/transcript (53).mp3" type="audio/wav">'
    }, {
        head: 'Torque Auxilliary',
        image1: 'images/torque-aux2.png',
        slideNumber: 62,
        width: 300,
        margin: 60,
        displayFlex: null,
        height: null,
        marginTop: 29,
        voiceText: 'The tork auxilliary is hand fabricated using a 0 point 0 one ',
        textImage: null,
        audio: '<source src="audio/transcript (54).mp3" type="audio/wav">'
    }, {
        head: 'Insert Wire',
        image1: 'images/starter-kit.png',
        slideNumber: 63,
        width: 120,
        margin: 50,
        displayFlex: null,
        height: 169,
        marginTop: 40,
        voiceText: 'To insert a wire absolutely requires the use of the special ortho cure pliers. These pliers have two key features. First, the head and tips are specially tapered and especially narrow to facilitate working in the short inter bracket spans that exist on the lingual. Second, the head is angled in a special way to allow gripping a wire on the lingual and holding it parallel with the bracket slots. There is a right handed version and a left handed version. We will ship to you, One of each plier, plus a cinching instrument, along with your first case and you will be charged an additional one hundred and forty nine dollars for this starter kit. Additional pliers can be ordered at any time.',
        audio: '<source src="audio/transcript (55).mp3" type="audio/wav">'
    }, {
        head: 'Insert Wire',
        image1: 'images/kink1.png',
        slideNumber: 64,
        width: 220,
        margin: 49.5,
        displayFlex: null,
        height: 200,
        marginTop: 30,
        voiceText: 'To insert a wire, it is usually best to start with the bracket that is most difficult to access. Thread the wire through this bracket first as shown in the image. It often helps to place a small bend in the tip of the wire to help the tip navigate turns.',
        audio: '<source src="audio/insert1.mp3" type="audio/wav">'
    }, {
        head: 'Insert Wire',
        image1: 'images/kink2.png',
        slideNumber: 65,
        width: 220,
        margin: 49.5,
        displayFlex: null,
        height: 200,
        marginTop: 30,
        voiceText: '',
        audio: '<source src="audio/transcript (57).mp3" type="audio/wav">'
    }, {
        head: 'Insert Wire',
        image1: 'images/kink3.png',
        slideNumber: 66,
        width: 220,
        margin: 49.5,
        displayFlex: null,
        height: 200,
        marginTop: 30,
        voiceText: '',
        audio: '<source src="audio/transcript (58).mp3" type="audio/wav">'
    }, {
        head: 'Insert Wire',
        image1: 'images/kink5.png',
        slideNumber: 67,
        width: 220,
        margin: 49.5,
        displayFlex: null,
        height: 200,
        marginTop: 30,
        voiceText: 'Now, loop the wire through the adjacent bracket. Notice that we dont attempt to go directly around the corner and into the adjacent bracket, rather, we loop the wire. Then we pull the loop out carefully. Often, the loop will tend to kink. To prevent this, use a scaler to help twist the loop out. With practice, you will learn how to thread the wire directly through each tube. It is ok to use whatever technique that you prefer. Keep in mind that brackets are most vulnerable to forces applied in the lingual direction. And when you are pulling on the wire while threading it, you are creating large lingual forces that will tend to pull brackets off the teeth. It pays to be extra careful. One trick is to apply pressure to the vulnerable bracket with your finger while pulling the wire through. With some practice, threading wires will become second nature.',
        audio: '<source src="audio/insert2.mp3" type="audio/wav">'
    }, {
        head: 'Insert Wire',
        image1: 'images/kink6.png',
        slideNumber: 60,
        width: 220,
        margin: 49.5,
        displayFlex: null,
        height: 200,
        marginTop: 30,
        voiceText: '',
        audio: '<source src="audio/transcript (60).mp3" type="audio/wav">'
    }, {
        head: 'Insert Wire',
        image1: 'images/unkink.png',
        slideNumber: 61,
        width: 220,
        margin: 49.5,
        displayFlex: null,
        height: 200,
        marginTop: 30,
        voiceText: 'Often, the loop will tend to kink. To prevent this, use a scaler to help twist the loop out. If you do this, be careful not to break a bracket.',
        audio: '<source src="audio/transcript (61).mp3" type="audio/wav">'
    }, {
        head: 'Insert Wire',
        image1: 'images/kink7.png',
        slideNumber: 62,
        width: 220,
        margin: 49.5,
        displayFlex: null,
        height: 200,
        marginTop: 30,
        voiceText: 'In some cases it might be very difficult to thread the wire through more than just 2 two teeth. And, that is just fine. If you start where the mal alignment is most severe, then you can just leave this small segment of wire for one appointment interval, allow the teeth to align, and then, it will be easier to thread the wire when the teeth are better aligned and somewhat mobile.',
        audio: '<source src="audio/transcript (62).mp3" type="audio/wav">'
    }, {
        head: 'Cinch 45-90 deg.',
        image1: 'images/cinch.png',
        slideNumber: 63,
        width: 150,
        margin: 45,
        displayFlex: null,
        height: 200,
        marginTop: 30,
        voiceText: 'Once you have inserted your wire, then you must do something with the free ends on the mesial and distal to prevent the wire from sliding out and to prevent the wire from poking the patient. Placing a 45 to 90 degree cinch bend in both ends is very important. We highly recommend using the cinch instrument provided in the starter package.',
        audio: '<source src="audio/transcript (63).mp3" type="audio/wav">'
    }, {
        head: 'Cinch Technique',
        image1: 'images/finger2.png',
        slideNumber: 64,
        width: 150,
        margin: 45,
        displayFlex: null,
        height: 200,
        marginTop: 30,
        voiceText: 'As the tip of your finder applies pressure to the adjacent bracket, use the cinch instrument to bend the wire against the same finger tip. It is important to apply pressure to the bracket with your finger because this assures that you do not pop off the bracket.',
        audio: '<source src="audio/transcript (64).mp3" type="audio/wav">'
    }, {
        head: 'Alternate pattern',
        image1: 'images/larson3.png',
        slideNumber: 65,
        width: 220,
        margin: 49.5,
        displayFlex: null,
        height: 200,
        marginTop: 30,
        voiceText: '',
        audio: '<source src="audio/transcript (65).mp3" type="audio/wav">'
    }, {
        head: 'Insert Wire',
        image1: 'images/wire1.png',
        slideNumber: 66,
        width: 250,
        margin: 50,
        displayFlex: null,
        height: 185,
        marginTop: 40,
        voiceText: '',
        audio: '<source src="audio/transcript (66).mp3" type="audio/wav">'
    }, {
        head: 'Insert Wire',
        image1: 'images/wire2.png',
        slideNumber: 67,
        width: 250,
        margin: 50,
        displayFlex: null,
        height: 185,
        marginTop: 40,
        voiceText: '',
        audio: '<source src="audio/transcript (67).mp3" type="audio/wav">'
    }, {
        head: 'Insert Wire',
        image1: 'images/wire4.png',
        slideNumber: 68,
        width: 250,
        margin: 50,
        displayFlex: null,
        height: 185,
        marginTop: 40,
        voiceText: '',
        audio: '<source src="audio/transcript (68).mp3" type="audio/wav">'
    }, {
        head: 'Insert Wire',
        image1: 'images/wire5.png',
        slideNumber: 69,
        width: 250,
        margin: 50,
        displayFlex: null,
        height: 200,
        marginTop: 40,
        voiceText: '',
        audio: '<source src="audio/transcript (69).mp3" type="audio/wav">'
    }, {
        head: 'Insert Wire',
        image1: 'images/wire6.png',
        slideNumber: 70,
        width: 250,
        margin: 50,
        displayFlex: null,
        height: 200,
        marginTop: 40,
        voiceText: '',
        audio: '<source src="audio/transcript (70).mp3" type="audio/wav">'
    }, {
        head: 'Replace Broken Bracket',
        image1: 'images/broken1.svg',
        slideNumber: 70,
        width: 250,
        margin: 50,
        displayFlex: null,
        height: 200,
        marginTop: 40,
        voiceText: 'Ortho cure will send you 2 sets of trays at the beginning of treatment just in case you experience a broken bracket. That way, you do not have to wait on shipping a new tray and you can get the bracket replaced without rescheduling. Even though the brackets are extremely tough and durable, breaking a bracket is always a possibility. Replacing a broken bracket with ortho cure is very simple. First, remove the wire and remove all composite from the tooth. Then, fit check the tray. Then, load the composite and bond the new bracket. ',
        audio: '<source src="audio/broken.mp3" type="audio/wav">'
    }, {
        head: 'Reposition Appt.1',
        image1: 'images/Repo1.svg',
        slideNumber: 70,
        width: 250,
        margin: 50,
        displayFlex: null,
        height: 200,
        marginTop: 40,
        voiceText: 'Repositioning a bracket with ortho cure could not be easier. All you need to do is scan 3 teeth on each side of the repo tooth - 3 teeth to the mesial and 3 teeth to the distal. Then submit the repo scan and we will send you a repo tray. Yes, this does require rescheduling your patient for delivering the new bracket. Note that you do NOT need to remove anything. Thats right. You dont need to remove the bracket. In fact, its best that you do NOT even remove or change the wire at this appointment because you do not want any tooth movement after doing the scan. Leaving the bracket and wire in place will ensure that no movement occurs. The anatomy under the existing bracket is stored in the original scan file. We will use that original scan data to reconstruct the missing anatomy.',
        audio: '<source src="audio/repo1.mp3" type="audio/wav">'
    }, {
        head: 'Reposition Appt.2',
        image1: 'images/Repo2.svg',
        slideNumber: 70,
        width: 250,
        margin: 50,
        displayFlex: null,
        height: 200,
        marginTop: 40,
        voiceText: 'When your patient arrives for delivery of the repositioned bracket, first, remove the wire and the bracket. Then, clean the tooth of all composite. Then, fit check the new tray inside the patients mouth. Then, add composite to the tray and bond the new bracket.',
        audio: '<source src="audio/repo2.mp3" type="audio/wav">'
    }, {
        head: 'Starter Kit',
        image1: 'images/starter-kit.png',
        slideNumber: 71,
        width: 95,
        margin: 30,
        displayFlex: true,
        height: null,
        text2: '<div class="item">1x Righty Plier</div><div class="item">1x Lefty Plier</div><div style="margin-top: 40px" class="item">1x Cinch Pro</div><div style="color: hsl(180,90%,40%); font-size: 1.3em; margin-top: 30px" class="item">$149.00</div>',
        marginTop: 30,
        voiceText: '',
        audio: '<source src="audio/transcript (71).mp3" type="audio/wav">'
    }, {
        head: 'Summary',
        image1: 'images/appliane1.svg',
        slideNumber: 70,
        width: 250,
        margin: 50,
        displayFlex: null,
        height: 200,
        marginTop: 40,
        voiceText: 'In summary, the ortho cure system offers patients the opportunity for orthodontic care with zero impact on their lifestyle. It inivisible, comfortable, efficient and high effective.',
        audio: '<source src="audio/.mp3" type="audio/wav">'
    }, {
        head: 'Summary',
        image1: 'images/.svg',
        slideNumber: 70,
        width: 250,
        margin: 50,
        displayFlex: null,
        height: 200,
        marginTop: 40,
        voiceText: 'Ortho cure allows doctors to delegate more, to work less, to improve the quality of their results, and to increase patient satisfaction.',
        audio: '<source src="audio/.mp3" type="audio/wav">'
    }, {
        head: 'Summary',
        image1: 'images/.svg',
        slideNumber: 70,
        width: 250,
        margin: 50,
        displayFlex: null,
        height: 200,
        marginTop: 40,
        voiceText: 'The ortho cure system combines all the best features of every other system into one super-system. Full customization, straight-wire, low friction, invisible, comfortable.',
        audio: '<source src="audio/.mp3" type="audio/wav">'
    }, {
        head: 'Summary',
        image1: 'images/.svg',
        slideNumber: 70,
        width: 250,
        margin: 50,
        displayFlex: null,
        height: 200,
        marginTop: 40,
        voiceText: 'When you first start using the orthocure system, please remember to do all of the following and not deviate from these recommendations until you gain more experience. 1, always use the recommended polisher: brassler, white cup, universal polisher.  2, always use the recommended composite from Reliance. 3, always use the recommend pliers to inserting and removing wires. 4, always use the recommended wire types and sizes. 5, never start with a wire larger than 0.012 nickel titanium. 6, light cure excessively. More is always better. 7, never try to remove the clip assemblies before removing the tray. Just break the tray away and the clips will follow.',
        audio: '<source src="audio/.mp3" type="audio/wav">'
    }];

    //number the slides in the listed order
    for (var i = 0; i < slides.length; i++) {
        slides[i].slideNumber = i + 1;
    }

    var Slide = function(data) {
        var self = this;

        self.head = ko.observable(data.head);
        self.slideNumber = ko.observable(data.slideNumber);
        self.image = ko.observable(data.image1);
        //self.width = ko.observable(data.width);
        //self.margin = ko.observable(data.margin);
        self.text2 = ko.observable(data.text2);
        //self.height = ko.observable(data.height);
        //self.marginTop = ko.observable(data.marginTop);
        self.voiceText = ko.observable(data.voiceText);
        self.audio = ko.observable(data.audio);
        self.textImage = ko.observable(data.textImage);

        self.displayFlex = ko.observable(false);
        if (data.displayFlex) {
            if (data.displayFlex === true) {
                self.displayFlex = ko.observable(true);
            }
        }
    };

    var ViewModel = function() {
        var self = this;

        self.currentSlide = ko.observable(new Slide(slides[0]));
        self.obsText2 = ko.observable();
        self.textImage = ko.observable(self.currentSlide().textImage());
        self.speakFile = ko.observable(self.currentSlide().audio());

        self.header = ko.observable(self.currentSlide().head());
        self.image = ko.observable(self.currentSlide().image());
        self.slideNumber = ko.observable(self.currentSlide().slideNumber());
        self.slideQuant = ko.observable(slides.length);
        self.voiceText = ko.observable(self.currentSlide().voiceText());
        self.speakFile = ko.observable(self.currentSlide().audio());

        $('.forward').click(function() {
            var myAudio = $('.audio');
            myAudio[0].pause();

            if (self.currentSlide().slideNumber() <= self.slideQuant() && self.currentSlide() !== null && self.currentSlide() !== undefined && self.currentSlide() !== '') {

                if (self.currentSlide().slideNumber() === self.slideQuant()) {
                    self.currentSlide(new Slide(slides[0]));
                } else {
                    console.log(slides[self.currentSlide().slideNumber()]);
                    self.currentSlide(new Slide(slides[self.currentSlide().slideNumber()]));
                }

                //self.currentSlide(new Slide(slides[self.currentSlide().slideNumber()]));
                self.header(self.currentSlide().head());
                self.image(self.currentSlide().image());
                self.slideNumber(self.currentSlide().slideNumber());
                self.voiceText(self.currentSlide().voiceText());
                $('.voiceText').text(self.voiceText());
                self.textImage(self.currentSlide().textImage());
                self.speakFile(self.currentSlide().audio());
                //self.currentSlide().voiceText();

                if (self.currentSlide().displayFlex() === true) {
                    $('.content').addClass("displayFlex");
                    $('.image').addClass("image4");
                } else {
                    $('.content').removeClass("displayFlex");
                    $('.image').removeClass("image4");
                }

                if (self.currentSlide().text2() !== null || self.currentSlide().text2() !== undefined || self.currentSlide().text2() !== '') {
                    $('.text2').show();
                    self.obsText2(self.currentSlide().text2());
                } else {
                    $('.text2').hide();
                }

                myAudio.src = self.speakFile();
                myAudio.load();

            } else {
                return null;
            };
        });

        $('.backward').click(function() {

            var myAudio = $('.audio');
            myAudio[0].pause();

            if (self.currentSlide().slideNumber() >= 1 && self.currentSlide() !== null && self.currentSlide() !== undefined && self.currentSlide() !== '') {
                console.log('testing backwards');

                if (self.currentSlide().slideNumber() <= 1) {
                    self.currentSlide(new Slide(slides[slides.length - 1]));
                } else {
                    self.currentSlide(new Slide(slides[self.currentSlide().slideNumber() - 2]));
                }

                self.header(self.currentSlide().head());
                self.image(self.currentSlide().image());
                self.slideNumber(self.currentSlide().slideNumber());
                self.voiceText(self.currentSlide().voiceText());
                self.textImage(self.currentSlide().textImage());
                self.speakFile(self.currentSlide().audio());

                if (self.currentSlide().displayFlex() === true) {
                    $('.content').addClass("displayFlex");
                    $('.image').addClass("image4");
                } else {
                    $('.content').removeClass("displayFlex");
                    $('.image').removeClass("image4");
                }

                if (self.currentSlide().text2() !== null || self.currentSlide().text2() !== undefined || self.currentSlide().text2() !== '') {
                    $('.text2').show();
                    self.obsText2(self.currentSlide().text2());
                } else {
                    $('.text2').hide();
                }

                myAudio.src = self.speakFile();
                myAudio.load();

            } else {
                return null;
            }
        });
    };

    ko.applyBindings(new ViewModel());

});