const question = [
    "Saya pergi keluar rumah",
    "Saya menggunakan transportasi umum",
    "Saya tidak memakai masker",
    "Saya berjabat tangan dengan orang lain",
    "Saya tidak membersihkan tangan dengan hand sanitizer / tissue basah sebelum memegang kendali kendaraan",
    "Saya menyentuh benda / uang yang juga disentuh orang lain",
    "Saya tidak menerapkan social distancing ketika berbelanja, bekerja, belajar, ibadah",
    "Saya makan di warung / restaurant",
    "Saya tidak minum air hangan dan mencuci tangan setelah tiba di tujuan",
    "Saya berada di wilayah kelurahan tempat pasien tertular",
    "Saya tidak pasang hand sanitizer di depan pintu masuk rumah",
    "Saya tidak mencuci tangan dengan sabun setelah tiba dirumah",
    "Saya tidak menyediakan tissue basah, masker, sabun antiseptic bagi keluarga di rumah",
    "Saya tidak segera merendam baju & celana bekas pakai di luar rumah",
    "Saya tidak segera mandi keramas setelah saya tiba dirumah",
    "Saya tidak mensosialikan checklist penilaian risiko pribadi ini kepada keluarga",
    "Saya dalam sehari tidak kena cahaya matahari minimal 15 menit",
    "Saya tidak jalan kaki / berolahraga minimal 20 menit setiap hari",
    "Saya jarang minum vitamin C & E, dan kurang tidur",
    "Usia saya diatas 60 tahun",
    "Saya mempunyai penyakit jantung/diabetes/gangguan pernafasan kronis"
];

const questionResult = {
    result: ["Rendah","Sedang","Tinggi"],
    desc: [
        "Dengan begini artinya Anda telah melakukan banyak antisipasi agar terhindar dari virus",
        "Kurangi hal-hal yang dapat mengakibatkan penularan covid19 mulai sekarang. Hubungi RS jika mendapat keluhan",
        "Cepat hubungi Rumah Sakit terdekat agar diperiksa dan diberi penanganan untuk virus COVID-19"
    ]
};

const quizStartContainer = $("#container-start");
const quizContainer = $("#container-quiz");
const quizEndContainer = $("#container-quiz-end");
const quizResult = $("#question-result");
const quizResultDesc = $("#question-result-desc");
const totalQuestion = question.length;

let indexQuestion = 0;
let score = 0;

let qIndex = $("#question-index");
let qIndexTotal = $("#question-index-total");
let qTitle = $("#question");

// Start Assessment
$("#btn-start").click(function() {
    quizStartContainer.hide();

    qIndex.html(indexQuestion + 1);
    qIndexTotal.html(totalQuestion);
    qTitle.html(question[indexQuestion]);

    quizContainer.show();
});

// Restart Assessment
$("#btn-restart").click(function() {
    quizEndContainer.hide();

    indexQuestion = 0;
    score = 0;

    quizStartContainer.show();
});

// Next Question
function nextQuestion() {
    if ((indexQuestion + 1) === totalQuestion) {
        quizContainer.hide();

        return endQuestion();
    }

    indexQuestion++;

    qIndex.html(indexQuestion + 1);
    qTitle.html(question[indexQuestion]);
}

// End Question
function endQuestion() {
    quizEndContainer.show();
    const additionalText = `<span class="fs-6 text-dark"> terkena COVID-19</span>`;

    if (score < 7) {
        quizResult.html(questionResult.result[0] + additionalText).addClass("text-success");
        quizResultDesc.html(questionResult.desc[0]);
    } else if (score < 15) {
        quizResult.html(questionResult.result[1] + additionalText).addClass("text-warning");
        quizResultDesc.html(questionResult.desc[1]);
    } else {
        quizResult.html(questionResult.result[2] + additionalText).addClass("text-danger");
        quizResultDesc.html(questionResult.desc[2]);
    }
};

// Question Answer Trigger
$("#btn-yes").click(function() {
    score++;
    nextQuestion();
});

$("#btn-no").click(function() {
    nextQuestion();
});

//  (͡o‿O͡)