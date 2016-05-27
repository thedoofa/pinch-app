/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', app.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        
        window.plugins.PushbotsPlugin.initialize("57481fdd4a9efaf3418b4567", {"android":{"sender_id":"GOOGLE_PROJECT_NUMBER"}});
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
        
    }
    window.plugins.PushbotsPlugin.on("notification:received", function(data){
	console.log("received:" + JSON.stringify(data));
});
window.plugins.PushbotsPlugin.on("registered", function(token){
	console.log(token);
});

window.plugins.PushbotsPlugin.getRegistrationId(function(token){
    console.log("Registration Id:" + token);
});
var push = PushNotification.init({
            "android": {
                "senderID": "1234567890"
            },
            "ios": { "alert": "true", "badge": "true", "sound": "true" },
            "windows": {}
        });

        push.on('registration', function (data) {
            console.log("registration event");
            //document.getElementById("regId").innerHTML = data.registrationId;
            alert(data.registrationId)
            console.log(JSON.stringify(data));
        });

        push.on('notification', function (data) {
            console.log("notification event");
            console.log(JSON.stringify(data));
            var cards = document.getElementById("cards");
            var card = '<div class="row">' +
                  '<div class="col s12 m6">' +
                  '  <div class="card darken-1">' +
                  '    <div class="card-content black-text">' +
                  '      <span class="card-title black-text">' + data.title + '</span>' +
                  '      <p>' + data.message + '</p>' +
                  '    </div>' +
                  '  </div>' +
                  ' </div>' +
                  '</div>';
            cards.innerHTML += card;

            push.finish(function () {
                console.log('finish successfully called');
            });
        });

        push.on('error', function (e) {
            console.log("push error");
        });


        //  var pushNotification = window.plugins.PushNotification;
        push.registerDevice({ alert: true, badge: true, sound: true }, function (status) {
            app.myLog.value += JSON.stringify(['registerDevice status: ', status]) + "\n";
            app.storeToken(status.deviceToken);
            alert(status.deviceToken)
        });
};