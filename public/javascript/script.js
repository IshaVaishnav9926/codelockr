const dropArea = document.getElementById("drop-area");
const inputfile = document.getElementById("input-file");
const imageview = document.getElementById("img-view");

inputfile.addEventListener("change",uploadImage);
function uploadImage(){
    let imgLink=URL.createObjectURL(inputfile.files[0]);
    
    console.log(imgLink);
    imageview.style.backgroundImage=`url(${imgLink})`;
    imageview.textContent="";
    imageview.backgroundSize="cover";
}
const hamburger=document.querySelector('.hamburger');
const mobile_menu= document.querySelector('.list');
const mobile_item= document.querySelectorAll('.list li a');
const header=document.querySelector('.header .navigation');
hamburger.addEventListener("click",()=>{
    hamburger.classList.toggle('active');
    mobile_menu.classList.toggle('active');
});
document.addEventListener("scroll",()=>{
   var scroll_position=window.scrollY;
   if(scroll_position>250){
    header.style.backgroundColor="#29323c";
   }else{
    header.style.backgroundColor="transparent";
   }
});
mobile_item.forEach(item => {
   item.addEventListener("click",()=>{
    hamburger.classList.toggle('active');
    mobile_menu.classList.toggle('active');
   }) 
});
function encrypt() {
    var plaintext = document.getElementById("text-encrypt").value;
    var key = document.getElementById("key").value;

    // Perform encryption (use a secure algorithm in a real-world scenario)
    var encryptedText = btoa(plaintext + key);

    document.getElementById("encrypt-result").value = encryptedText;
}

function decrypt() {
    var ciphertext = document.getElementById("text-decrypt").value;
    var key = document.getElementById("key1").value;

    // Perform decryption (use a secure algorithm in a real-world scenario)
    var decryptedText = atob(ciphertext);

    // Check if the key is valid before showing the decrypted text
    if (decryptedText.endsWith(key)) {
        decryptedText = decryptedText.slice(0, -key.length);
        document.getElementById("decrypt-result").value = decryptedText;
    } else {
        alert("Invalid key");
    }
}




async function encryptImage() {
    
    const imagePath = document.getElementById("image-path").value;
    const key = document.getElementById("keyimage").value;
   
    const response = await fetch('/encryptImage', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imagePath, key }),
    });

    const result = await response.json();

    document.getElementById('result').innerHTML = `<p>${result.message}</p>`;
}
async function decryptImage() {
    const imagePath = document.getElementById("image-path").value;
    const key = document.getElementById("keyimage").value;
    const response = await fetch('/decryptImage', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imagePath, key }),
    });

    const result = await response.json();

    document.getElementById('result').innerHTML = `<p>${result.message}</p>`;
}
function reset_encryption(){
    document.getElementById('text-encrypt').value="";
    document.getElementById('encrypt-result').value="";
    document.getElementById('key').value="";
}
function reset_decryption(){
    document.getElementById('text-decrypt').value="";
    document.getElementById('key1').value="";
    document.getElementById('decrypt-result').value="";

}

/*document.addEventListener("DOMContentLoaded", function() {
    const numBubbles = 10; // Number of bubbles initially
    const container = document.querySelector(".background-text");
    
    // Function to create a single bubble
    function createBubble() {
      const bubble = document.createElement("div");
      bubble.classList.add("bubble");
      container.appendChild(bubble);
  
      // Randomize bubble properties
      const size = Math.floor(Math.random() * 20) + 10; // Random size between 10px and 30px
      const posX = Math.random() * window.innerWidth; // Random horizontal position
      const duration = Math.random() * 6 + 4; // Random animation duration between 4s and 10s
  
      bubble.style.width = size + "px";
      bubble.style.height = size + "px";
      bubble.style.left = posX + "px";
      bubble.style.animationDuration = duration + "s";
  
      // Remove bubble after animation completes
      bubble.addEventListener("animationend", function() {
        bubble.remove();
        createBubble(); // Create a new bubble to replace the removed one
      });
    }
  
    // Function to create bubbles at regular intervals
    function generateBubbles() {
      for (let i = 0; i < numBubbles; i++) {
        createBubble();
      }
    }
  
    generateBubbles(); // Start generating bubbles
  });*/
  document.addEventListener("DOMContentLoaded", function() {
    const container = document.querySelector(".background-text");
    const numBubbles = 20; // Number of bubbles
  
    // Function to create a single bubble
    function createBubble() {
      const bubble = document.createElement("div");
      bubble.classList.add("bubble");
      container.appendChild(bubble);
  
      // Randomize bubble properties
      const size = Math.floor(Math.random() * 20) + 10; // Random size between 10px and 30px
      const posX = Math.random() * window.innerWidth; // Random horizontal position
      const duration = Math.random() * 6 + 4; // Random animation duration between 4s and 10s
  
      bubble.style.width = size + "px";
      bubble.style.height = size + "px";
      bubble.style.left = posX + "px";
      bubble.style.animationDuration = duration + "s";
  
      // Remove bubble after animation completes
      bubble.addEventListener("animationiteration", function() {
        bubble.remove();
        createBubble(); // Create a new bubble to replace the removed one
      });
    }
  
    // Function to create bubbles at regular intervals
    function generateBubbles() {
      for (let i = 0; i < numBubbles; i++) {
        createBubble();
      }
    }
  
    generateBubbles(); // Start generating bubbles
  });
  
 
