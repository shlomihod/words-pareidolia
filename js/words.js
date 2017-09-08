$(function() {
    var words;

    $.getJSON("./json/words-de-en.json", function(data) {
        words = data;
        generateWords();

        if ('speechSynthesis' in window) {
            $("#play").show();

            $("#play").click(function() {
                var text = new SpeechSynthesisUtterance(getGermanWord());
                console.log(getGermanWord());
                text.lang = "de-DE";
                window.speechSynthesis.speak(text);
            });
        }
    });

    function randomWord() {
        return words[Math.floor(Math.random() * words.length)];
    }

    function generateWords() {
        var word1 = randomWord();
        var word2 = randomWord();

        var germanWord2 = word2.de.toLowerCase();
        germanWord2 = "<u>" + germanWord2[0] + "</u>" + germanWord2.slice(1);

        $("#german-word-1").html(word1.de);
        $("#english-word-1").html(word1.en);
        $("#german-word-2").html(germanWord2);
        $("#english-word-2").html(word2.en);
    }

    function getGermanWord() {
        return $("#german-word-1").text() + $("#german-word-2").text();
    }

    $("#words").click(function() {
        generateWords();
        clip.setValue(getGermanWord());
    });


});