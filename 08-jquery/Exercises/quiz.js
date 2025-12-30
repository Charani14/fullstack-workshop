$(document).ready(function () {

    // Quiz data embedded directly, no AJAX needed
    let quizData = [
        {
            id: 1,
            question: "What does HTML stand for?",
            options: [
                "Hyper Text Markup Language",
                "High Tech Modern Language",
                "Hyper Transfer Markup Language",
                "Home Tool Markup Language"
            ],
            correctAnswer: 0
        },
        {
            id: 2,
            question: "Which language is used for styling web pages?",
            options: ["HTML", "JQuery", "CSS", "XML"],
            correctAnswer: 2
        },
        {
            id: 3,
            question: "Which is not a JavaScript framework?",
            options: ["React", "Angular", "Vue", "Django"],
            correctAnswer: 3
        },
        {
            id: 4,
            question: "Which symbol is used for comments in JavaScript?",
            options: ["//", "<!-- -->", "#", "/* */"],
            correctAnswer: 0
        },
        {
            id: 5, question: "What does CSS stand for?",
            options: [
                "Cascading Style Sheets",
                "Computer Style Sheets",
                "Creative Style System",
                "Colorful Style Sheets"
            ],
            correctAnswer: 0    
        },
        {
            id: 6, question: "Which HTML tag is used to define an internal style sheet?",
            options: ["<style>", "<css>", "<script>", "<stylesheet>"],
            correctAnswer: 0
        },
        {
            id: 7, question: "Which property is used to change the background color in CSS?",
            options: ["color", "bgcolor", "background-color", "backgroundColor"],
            correctAnswer: 2
        },
        {
            id: 8, question: "Which method is used to add an event listener in jQuery?",
            options: [".on()", ".addEvent()", ".listen()", ".bind()"],
            correctAnswer: 0
        },
        {
            id: 9, question: "Which HTML attribute is used to define inline styles?",
            options: ["class", "style", "styles", "font"],
            correctAnswer: 1

        },
        {
            id: 10, question: "Which jQuery function is used to hide elements?",
            options: [".hide()", ".remove()", ".invisible()", ".none()"],
            correctAnswer: 0
        }
    ];

    let currentQuestion = 0;
    let answers = {};
    let timer;
    let timeLeft = 60;

    // Hide loading, show quiz container immediately
    $(".loading").hide();
    $(".quiz-container").first().show();

    loadQuestion();

    /* ---------------- Load Question ---------------- */
    function loadQuestion() {
        clearInterval(timer);
        timeLeft = 30;
        $("#time").text(timeLeft).removeClass("warning");

        let q = quizData[currentQuestion];

        $("#question").text(q.question);

        $("#options").empty();
        $.each(q.options, function (index, option) {
            let li = $("<li>")
                .text(option)
                .attr("data-index", index);

            if (answers[currentQuestion] === index) {
                li.addClass("selected");
            }

            $("#options").append(li);
        });

        $("#progress-text").text(
            `Question ${currentQuestion + 1} of ${quizData.length}`
        );

        $(".progress-fill").animate({
            width: ((currentQuestion + 1) / quizData.length) * 100 + "%"
        }, 400);

        $("#prev").toggle(currentQuestion > 0);
        $("#next").toggle(currentQuestion < quizData.length - 1);
        $("#submit").toggle(currentQuestion === quizData.length - 1);

        startTimer();
    }

    /* ---------------- Timer ---------------- */
    function startTimer() {
        timer = setInterval(function () {
            timeLeft--;
            $("#time").text(timeLeft);

            if (timeLeft <= 10) {
                $(".timer").addClass("warning");
            }

            if (timeLeft === 0) {
                clearInterval(timer);
                currentQuestion++;
                if (currentQuestion < quizData.length) {
                    $(".quiz-container").first().fadeOut(200, function () {
                        loadQuestion();
                        $(this).fadeIn(200);
                    });
                } else {
                    showResults();
                }
            }
        }, 1000);
    }

    /* ---------------- Option Click (Event Delegation) ---------------- */
    $("#options").on("click", "li", function () {
        $("#options li").removeClass("selected");
        $(this).addClass("selected");

        answers[currentQuestion] = $(this).data("index");
    });

    /* ---------------- Navigation ---------------- */
    $("#next").click(function () {
        currentQuestion++;
        loadQuestion();
    });

    $("#prev").click(function () {
        currentQuestion--;
        loadQuestion();
    });

    $("#submit").click(function () {
        showResults();
    });

    /* ---------------- Results ---------------- */
    function showResults() {
        clearInterval(timer);
        $(".quiz-container").hide();

        let score = 0;
        $("#review").empty();

        $.each(quizData, function (index, q) {
            let correct = q.correctAnswer === answers[index];
            if (correct) score++;

            let reviewItem = $("<div>")
                .html(`<strong>${q.question}</strong>`)
                .append("<br>");

            $.each(q.options, function (i, opt) {
                let span = $("<span>").text(opt);

                if (i === q.correctAnswer) span.addClass("correct");
                if (i === answers[index] && i !== q.correctAnswer)
                    span.addClass("incorrect");

                reviewItem.append(span).append("<br>");
            });

            $("#review").append(reviewItem).append("<hr>");
        });

        $("#score").text(
            `Score: ${score}/${quizData.length} (${Math.round(
                (score / quizData.length) * 100
            )}%)`
        );

        $(".results").fadeIn();
    }

    /* ---------------- Restart ---------------- */
    $("#restart").click(function () {
        currentQuestion = 0;
        answers = {};
        $(".results").fadeOut(() => {
            $(".quiz-container").first().fadeIn();
            loadQuestion();
        });
    });

});
