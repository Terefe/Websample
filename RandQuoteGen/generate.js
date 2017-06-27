$(document).ready(function () {

    var quotes = getQuotes(); //gets quotes 
    var len = quotes.length;
    var ranGen = Math.floor(Math.random() * len - 1);

    //rand color code
    var backgroundColor = getRandColor();
    var textColor = getRandColor();
    var buttonColor = getRandColor();

    //function calls
    startUpPage();
    buttonHover();

    $("#quotes").html(quotes[ranGen].quote).css("color", textColor).hide().fadeIn(2000);
    $("#names").html(quotes[ranGen].name).css("color", textColor).hide().fadeIn(2000);

    clickQuoteBtn();

    //call back button for newQuote
    function clickQuoteBtn() {
        $("#newQuote").on("click", function () {

            backgroundColor = getRandColor();
            textColor = getRandColor();
            buttonColor = getRandColor();

            newQuote();

            $(".btn").css({
                "color": textColor,
                "border": "1px solid " + buttonColor
            });

            $("body").css({
                "background": backgroundColor
            }).hide().fadeIn(1000);

        });
    }


    //runs when window starts
    function startUpPage()
    {
        //sets background color
        $("body").css({
            "background": backgroundColor
        }).hide().fadeIn(1000);

        //sets buttons color
        $(".btn").css({
            "color": textColor,
            "border": "1px solid " + buttonColor
        });


    }

    //animate the buttons when mouse hovers
    function buttonHover()
    {
        //call back
        $(".btn").hover(function () {
            $(this).animate({
                "background-color": buttonColor,
                "color": "white"

            }, "slow")
        }, function () {

            $(this).animate({
                "background-color": "rgba(245, 245, 245, 0)",
                "color": textColor,
                " border": "1px solid " + buttonColor
            }, "slow");


        });

    }

    //gets random quote
    function newQuote() {

        //loads new quotes
        ranGen = Math.floor(Math.random() * len - 1);
        $(".well").fadeIn(500);
        $("#quotes").html(quotes[ranGen].quote).css("color", textColor).hide().fadeIn(2000);
        $("#names").html(quotes[ranGen].name).css("color", textColor).hide().fadeIn(2000);

    }

    //get json files of quotes
    function getQuotes()
    {
        var cQuote = (function () {
            var json = null;
            $.ajax({
                async: false,
                global: false,
                url: "https://gist.githubusercontent.com/dmakk767/9375ff01aff76f1788aead1df9a66338/raw/491f8c2e91b7d3b8f1c8230e32d9c9bc1a1adfa6/Quotes.json%2520",
                dataType: "json",
                success: function (data) {
                    json = data;
                }

            });
            return json;

        })();

        return cQuote;

    }


    //generates random Color Code;
    function getRandColor()
    {
        var letters = "0123456789ABCDEF";
        var colCode = "#";

        for (var i = 0; i < 6; i++)
        {
            colCode += letters[Math.floor(Math.random() * 15)];
        }

        return colCode;
    }



});