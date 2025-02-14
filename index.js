  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
  
  import { 
    getDatabase,
    ref,
    child,
    get,
    push,
    set,
    onValue,
    serverTimestamp

   } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-database.js";



  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyDoCz3ath3D2bTZlvoeVpY1NI2Q42U8Gu0",
    authDomain: "humber-demo-peiyu.firebaseapp.com",
    projectId: "humber-demo-peiyu",
    databaseURL: "https://humber-demo-peiyu-default-rtdb.firebaseio.com/",
    storageBucket: "humber-demo-peiyu.firebasestorage.app",
    messagingSenderId: "848703710355",
    appId: "1:848703710355:web:268d74efd7b0a22c855966",
    measurementId: "G-36M47E3E6S"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Initialize the Realtime Database
  const database = getDatabase();

  // Fetch the messages collection
  const messages = ref(database, "/messages")

  // When the messages collection changes
  onValue(
    messages,
    (snapshot) => {

        // Create a reference to the list
        const ul = document.getElementById("messages")

        ul.replaceChildren();

        // loop through our messages collection
        snapshot.forEach((childSnapshot) => {

            // Get record data
            const childKey = childSnapshot.key;
            const childData = childSnapshot.val();

            console.log(childKey);
            console.log(childData);

            const text = document.createTextNode(
                childData.message + " ~ " + childData.name
            )
            const li = document.createElement("li");
            li.appendChild(text);
            ul.appendChild(li);
            
        })
    },
    {
        onlyOnce: false,
    }

  );

  const add = document.getElementById("add");
  add.addEventListener("click", function(e){

    const name = document.getElementById("name");
    const message = document.getElementById("message");

    const newMessage = push(messages);
    set(newMessage, {
        name: name.value,
        message: message.value,
        createdAt: serverTimestamp(),
    });

    e.preventDefault();
    
  });
