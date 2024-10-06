$(document).ready(function () {
    var envelope = $("#envelope");
    var btn_toggle = $("#toggle");
    var btn_message = $("#message");
    var messageForm = $("#messageForm");
    var backgroundMusic = $("#backgroundMusic")[0]; // Mendapatkan elemen audio

    // Atur volume awal menjadi 0
    backgroundMusic.volume = 0;

    // Toggle Open/Close envelope
    btn_toggle.click(function () {
        if (envelope.hasClass("close")) {
            openEnvelope();
        } else {
            closeEnvelope();
        }
    });

    // Show/hide message form when "Message" button is clicked
    btn_message.click(function () {
        messageForm.toggle();
    });

    // Open envelope function
    function openEnvelope() {
        envelope.addClass("open").removeClass("close");
        btn_toggle.text("Close"); // Change button text to "Close"
        backgroundMusic.play(); // Play background music
        fadeInMusic(); // Fade in music
    }

    // Close envelope function
    function closeEnvelope() {
        envelope.addClass("close").removeClass("open");
        btn_toggle.text("Open"); // Change button text to "Open"
        backgroundMusic.pause(); // Pause music when envelope is closed
    }

    // Handle message form submission
    $("#send").click(function (event) {
        event.preventDefault(); // Prevent form from submitting
        var userMessage = $("#userMessage").val();
        if (userMessage) {
            sendMessageToWhatsApp(userMessage); // Send to WhatsApp
        } else {
            alert("Please write a message before sending.");
        }
    });

    // Function to send message to WhatsApp
    function sendMessageToWhatsApp(message) {
        var phoneNumber = "6283169507377"; // Replace with your WhatsApp number
        var whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        
        console.log(whatsappUrl); // Debugging line to check URL
        window.open(whatsappUrl, "_blank"); // Open WhatsApp in a new tab
    }

    // Fade in music function
    function fadeInMusic() {
        var fadeDuration = 3000; // Durasi fade in dalam milidetik
        var fadeSteps = 100; // Jumlah langkah fade
        var volumeStep = 1 / fadeSteps; // Jumlah peningkatan volume per langkah

        var currentVolume = 0;
        backgroundMusic.volume = currentVolume; // Set volume awal

        var fadeInterval = setInterval(function () {
            if (currentVolume < 1) {
                currentVolume += volumeStep; // Tambahkan volume
                backgroundMusic.volume = Math.min(currentVolume, 1); // Pastikan volume tidak melebihi 1
            } else {
                clearInterval(fadeInterval); // Hentikan interval jika volume sudah maksimal
            }
        }, fadeDuration / fadeSteps); // Interval berdasarkan durasi
    }
});