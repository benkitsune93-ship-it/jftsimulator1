// global

// 1. Sinkronkan kunci objek i18n
const firebaseConfig = {
  apiKey: "AIzaSyDeZFBF0cRoa0y_UvzrUDZJscAEtTHclpU",
  authDomain: "simulasi-jft.firebaseapp.com",
  projectId: "simulasi-jft",
  storageBucket: "simulasi-jft.firebasestorage.app",
  messagingSenderId: "15760898656",
  appId: "1:15760898656:web:24286e2d38fa503aa22105",
  measurementId: "G-8DS47NKFZM"
};


// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const i18n = {
    id: {
        top: "Beranda",
        feature: "Fitur",
        price: "Biaya",
        faq: "",
        mockupBtn: "Tes Mock Up",
        welcomeTitle: "Selamat Datang di JFT-A2 Simulation Test",
        welcomeDesc: "Selamat datang di simulasi ujian JFT. Latihan hari ini adalah langkah menuju hasil terbaik di ujian nanti.",
        startBtn: "Mulai Simulasi",
        // PERBAIKAN: Hapus nesting "id: {" yang salah dan ratakan properti ini
        tokenLabel: "Masukkan Token Paket",
        tokenPlaceholder: "Contoh: JFT-PRO-XXXX",
        checkTokenBtn: "Validasi Token",
        quotaInfo: "Sisa Kuota: ",
        invalidToken: "Token tidak valid atau kuota habis!",
        formHeader: "JFT-Simulation | Aktivasi Paket",
        startTest: "Mulai Tes",
        locked: "Terkunci"
    },
    en: {
        top: "Home",
        feature: "Features",
        price: "Price",
        faq: "",
        mockupBtn: "Mock Up Test",
        welcomeTitle: "Welcome to JFT-A2 Simulation Test",
        welcomeDesc: "Welcome to the JFT exam simulation. Today's practice is a step towards achieving the best possible results on the exam.",
        startBtn: "Start Simulation", // PERBAIKAN: Tambah koma disini
        tokenLabel: "Enter Package Token",
        tokenPlaceholder: "Example: JFT-PRO-XXXX",
        checkTokenBtn: "Validate Token",
        quotaInfo: "Remaining Quota: ",
        invalidToken: "Invalid token or quota exhausted!",
        formHeader: "JFT-Simulation | Package Activation",
        startTest: "Start Test",
        locked: "Locked"
    },
    vi: {
        top: "Trang chủ",
        feature: "Tính năng",
        price: "Chi phí",
        faq: "",
        mockupBtn: "Thi thử Mock Up",
        welcomeTitle: "Chào mừng đến với JFT-Simulation",
        welcomeDesc: "Chào mừng đến với bài mô phỏng kỳ thi JFT. Bài tập hôm nay là một bước tiến hướng tới kết quả tốt nhất có thể trong kỳ thi.",
        startBtn: "Bắt đầu thi thử", // PERBAIKAN: Tambah koma disini
        tokenLabel: "Nhập mã Token",
        tokenPlaceholder: "Ví dụ: JFT-PRO-XXXX",
        checkTokenBtn: "Kiểm tra mã",
        quotaInfo: "Số lần còn lại: ",
        invalidToken: "Mã không hợp lệ hoặc đã hết lượt dùng!",
        formHeader: "JFT-Simulation | Kích hoạt gói",
        startTest: "Bắt đầu thi",
        locked: "Đã khóa"
    }
};
const updateLandingPageUI = () => {
    const lang = i18n[currentLang];
    
    // Cari elemen berdasarkan struktur HTML yang kita buat
    const titleEl = document.querySelector("#home-section h1");
    const descEl = document.querySelector("#home-section p.lead");
    const btnEl = document.querySelector("#home-section button.btn-primary");

    if (titleEl) titleEl.innerText = lang.welcomeTitle;
    if (descEl) descEl.innerText = lang.welcomeDesc;
    if (btnEl) btnEl.innerText = lang.startBtn;
};

// Pastikan fungsi ini dipanggil saat halaman pertama kali dimuat
document.addEventListener("DOMContentLoaded", () => {
    // ... kode navLinks Anda yang sudah ada ...
    updateLandingPageUI();
});

// Update juga fungsi changeLanguage agar memanggil update ini
window.changeLanguage = (lang) => {
    localStorage.setItem('lang', lang);
    currentLang = lang;
    location.reload(); // Atau panggil updateLandingPageUI() jika tidak ingin reload
};
let currentLang = localStorage.getItem('lang') || 'id';

document.addEventListener("DOMContentLoaded", () => {
    const lang = i18n[currentLang];
    const navLinks = document.querySelectorAll(".nav-link");
    
    // 2. Pastikan properti yang dipanggil sesuai dengan objek i18n
    if (navLinks.length >= 4) {
        navLinks[0].innerText = lang.top;
        navLinks[1].innerText = lang.feature; // Pakai .feature bukan .fitur
        navLinks[2].innerText = lang.price;   // Pakai .price bukan .biaya
        navLinks[3].innerText = lang.faq;     // Sekarang sudah ada di objek
    }
    
    const mockBtn = document.querySelector(".btn-primary.rounded-pill");
    if (mockBtn) mockBtn.innerText = lang.mockupBtn;
});

// 3. Gunakan satu versi fungsi changeLanguage saja
window.changeLanguage = (lang) => {
    localStorage.setItem('lang', lang);
    location.reload(); 
};
const main = document.querySelector("main");
let selectedTest;
let userAnswers = [];
let currentTest;
let currentSection;
let currentQuestion;
let countdown;
let confirmationAnswer;
let user;

function changeLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('lang', lang);
    location.reload(); // Reload untuk menerapkan perubahan pada UI yang di-generate JS
}
// Objek ini menghubungkan ID Tes di menu dengan Variabel Soal di file JS
const testDataLibrary = {
    1: SimulationJFT1Questions, // Jika ID tes 1, pakai data dari Simulation JFT-1.js
    2: SimulationJFT2Questions, // Jika ID tes 2, pakai data dari Simulation JFT-2.js
    3: SimulationJFT3Questions,  // Dan seterusnya...
};
const initApp = () => {
    // showTestList ();
    //showLoginForm();
}
const resetApp = () => {
    if (confirm("Apakah Anda yakin ingin keluar?")) {
        main.innerHTML = "";
        selectedTest = "";
        userAnswers = [];
        currentTest = "";
        currentSection = "";
        currentQuestion = "";
        countdown = "";
        initApp();
        document.getElementsByTagName('header')[0].style.display = 'block';
        window.onbeforeunload = null;
    }
}
const clearMain = () => {
    main.innerHTML = "";
}
const findQuestionBySectionAndId = (section, id) => {
    return currentTest.questions.find(question => (question.section == section) && (question.id == id));
}
const findQuestionById = (id) => {
    return currentTest.questions.find(question => (question.id == id));
}
const finduserAnswersById = (id) => {
    return userAnswers.find(question => (question.id == id));
}
const isSectionDone = () => {
    for (let i = 0; i < userAnswers.length; i++) {
        if (userAnswers[i].section == currentSection) {
            if (userAnswers[i].answer == 0) {
                return false;
            }
        }
    }
    return true;
}
const setUserAnswer = (element) => {
    // element is button , value will be use to fill user answer , 
    // and id will be use to know what question did user answer
    let questionNumber = element.id.substring(3, element.id.length);
    let sectionNumber = element.id.substring(1, 2);
    let userAnswer = userAnswers.find(item => (item.id == questionNumber) && (item.section == sectionNumber));
    userAnswer.answer = Number(element.value);
    let otherAnswer = document.querySelectorAll("#" + element.id);
    otherAnswer.forEach((answer) => {
        answer.className = "list-group-item list-group-item-action";
    });
    element.className = "list-group-item list-group-item-action bg-success bg-opacity-75";
    document.getElementById("nav-" + element.id).classList.add("bg-success", "bg-opacity-75");
}
const showQuestion = (element) => {
    let question = element.id.substring(7, element.id.length);
    currentQuestion = findQuestionById(question);
    document.getElementById("tqa").lastChild.remove();
    document.getElementById("tqa").appendChild(createTestQA(currentQuestion));

    let userAnswer = finduserAnswersById(document.getElementById("tqa").lastChild.id.substring(7, element.id.length));
    if (userAnswer.answer != 0) {
        let nodes = document.querySelectorAll("#s" + document.getElementById("tqa").lastChild.id.substring(5, 6) +
            "q" + document.getElementById("tqa").lastChild.id.substring(7, element.id.length));
        nodes[userAnswer.answer - 1].className = "list-group-item list-group-item-action bg-success bg-opacity-75";
    }

    updateHeaderCurrentQuestion();
    updateTestFooter();
}
const showQuestionByID = (questionId) => {
    currentQuestion = findQuestionById(questionId);
    document.getElementById("tqa").lastChild.remove();
    document.getElementById("tqa").appendChild(createTestQA(currentQuestion));

    let userAnswer = finduserAnswersById(questionId);
    if (userAnswer.answer != 0) {
        let nodes = document.querySelectorAll("#s" + document.getElementById("tqa").lastChild.id.substring(5, 6) +
            "q" + questionId);
        nodes[userAnswer.answer - 1].className = "list-group-item list-group-item-action bg-success bg-opacity-75";
    }

    updateHeaderCurrentQuestion();
    updateTestFooter();
}
const preventOpenedNav = () => {
    window.onclick = () => {
        if (document.getElementById("QANavigation") != null) {
            if (document.getElementById("QANavigation").className.includes("show")) {
                document.getElementById("QA-nav-toggle-button").click();
            }
        }
    }
}
const endSection = () => {

    if (isSectionDone()) {
        if (currentSection != 4) {
            if (confirm("Apakah Anda yakin ingin melanjutkan ke sesi berikutnya?, Anda dapat kembali ke sesi ini lagi")) {
                switch (currentSection) {
                    case 1:
                        currentSection = Number(currentSection) + 1;
                        if (currentTest.name == "Simulation JFT-Sample") {
                            showQuestionByID(6);
                        } else {
                            showQuestionByID(16);
                        }
                        break;
                    case 2:
                        currentSection = Number(currentSection) + 1;
                        if (currentTest.name == "Simulation JFT-Sample") {
                            showQuestionByID(11);
                        } else {
                            showQuestionByID(31);
                        }
                        break;
                    case 3:
                        currentSection = Number(currentSection) + 1;
                        if (currentTest.name == "Simulation JFT-Sample") {
                            showQuestionByID(13);
                        } else {
                            showQuestionByID(41);
                        }
                        break;
                }
                showSectionNavList(currentSection);
            }
        } else {
            if (confirm("Apakah Anda yakin ingin mengakhiri tes ini?")) {
                showResult();
            }
        }
    } else {
        alert("tidak bisa lanjut ke bagian selanjutnya, kamu harus menjawab semua pertanyaan di sesi ini terlebih dahulu");
    }
};
const showSectionNavList = (sectionId) => {
        document.getElementById("Nav-s" + sectionId).classList.add("bg-success", "bg-gradient", "ps-3");
        document.getElementById("s" + sectionId + "q").style.display = "initial";
        document.getElementById("s" + (Number(sectionId) - 1) + "q").style.display = "none";
        // "Nav-s2" nav  id 
        // "s2q" next container id 
        // "s1q" before 
    }
    // set up function for audio control
const disabledAudio = (el, id) => {
    document.getElementById("QA-nav-toggle-button").disabled = true;
    document.querySelectorAll("#nav-btn").forEach((item) => {
        item.disabled = true;
    });
    count = Number(el.id);
    let questionForAudio = findQuestionById(id);
    el.style.pointerEvents = "none";
    if (count > 1) {
        count -= 1;
        questionForAudio.play_count -= 1;
        el.id = count.toString();
        el.nextSibling.innerText = "kamu bisa menjalankan audio ini 1 kali lagi"
    } else {
        question.play_count -= 1;
        count -= 1;
        questionForAudio.play_count -= 1;
        el.id = count.toString();
        el.nextSibling.innerText = "kamu sudah tidak bisa menjalankan audio ini"
    }
}
const enabledAudio = (el) => {
        document.getElementById("QA-nav-toggle-button").disabled = false;
        document.querySelectorAll("#nav-btn").forEach((item) => {
            item.disabled = false;
        });
        count = Number(el.id);

        if (count > 0) {
            el.style.pointerEvents = "initial";
        } else {
            el.style.pointerEvents = "none";
        }
    }
    // test list
const createTestList = (tests) => {
    // create container
    const testListContainer = document.createElement("div");
    // create title
    const testListTitle = document.createElement("div");
    testListTitle.classList.add("mx-auto", "text-start", "my-3");
    testListTitle.innerHTML = `
        <p class="fw-bold text-dark">baca tata cara pengerjaan yang ada dibawah daftar tes terlebih dahulu! </p>
        <br>
        <h2 class="text-dark">Pilih untuk memulai tes mock up!</h2>
        `;
    // create list
    const testList = document.createElement("div");
    testList.classList.add("row", "px-3");
    // create list item
    let testCard;
    tests.forEach((test) => {
        testCard = document.createElement("div");
        testCard.classList.add("test-card", "rounded", "my-1", "col-12", "col-sm-6", "col-md-4", "col-lg-3", "mx-auto");
        testCard.innerHTML = `
            <a class="card text-decoration-none text-dark" >
              <div class="card-body rounded">
                <h3 class="card-title bg-success bg-opacity-50 p-2 rounded ">${test.name}</h3>
              </div>
            </a>
            `;
        // add handler
        testCard.addEventListener("click", function() { showStartConfirmation(test) });
        testList.appendChild(testCard);
    });
    // merge component
    testListContainer.appendChild(testListTitle);
    testListContainer.appendChild(testList);
    window.onbeforeunload = function() {
        return "Data kamu tidak akan disimpan, kamu yakin ingin pergi dari halaman ini?";
    }
    return testListContainer;
}
const showTestList = () => {
    const sessionData = JSON.parse(sessionStorage.getItem('token_active'));
    
    // Cek login
    if (!sessionData) {
        showLoginForm();
        return;
    }

    // --- PERBAIKAN BUG DIMULAI DISINI ---
    // 1. Bersihkan area ujian/hasil (container <main> pertama)
    clearMain(); 

    // 2. Pastikan container dashboard (#main-content) terlihat
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
        mainContent.style.display = 'block'; 
    }
    // --- PERBAIKAN SELESAI ---

    const lang = i18n[currentLang];

    // Ambil data yang tersimpan sebelumnya (jika ada)
    const savedName = localStorage.getItem('candidateName') || '';
    const savedDob = localStorage.getItem('candidateDob') || '';

    let html = `
        <div class="container animate__animated animate__fadeIn">
            <div class="alert alert-primary d-flex justify-content-between align-items-center rounded-4 shadow-sm mb-4">
                <div><i class="bi bi-box-seam me-2"></i> <strong>Paket:</strong> ${sessionData.package}</div>
                <div><i class="bi bi-lightning-fill me-1 text-warning"></i> <strong>Sisa Kuota:</strong> ${sessionData.quota}</div>
            </div>
            <div class="d-flex gap-2 mb-4">
                <button class="btn btn-warning rounded-pill fw-bold shadow-sm" onclick="showResultHistory()">
                    <i class="fas fa-history me-1"></i> Riwayat Ujian
                </button>
                <button class="btn btn-outline-danger rounded-pill fw-bold shadow-sm" onclick="logout()">
                    <i class="fas fa-sign-out-alt me-1"></i> Keluar
                </button>
            </div>
            <div class="card shadow-sm mb-4 border-0 rounded-4">
                <div class="card-header bg-warning text-dark fw-bold">
                    <i class="fas fa-user-edit me-2"></i> Lengkapi Data Peserta (Wajib)
                </div>
                <div class="card-body">
                    <div class="row g-3">
                        <div class="col-md-4">
                            <label class="form-label small">Foto Peserta</label>
                            <input type="file" id="inputPhoto" class="form-control" accept="image/*" onchange="handlePhotoUpload(this)">
                            <small class="text-muted" style="font-size:0.8em">*Maks 2MB</small>
                        </div>
                        <div class="col-md-4">
                            <label class="form-label small">Nama Lengkap</label>
                            <input type="text" id="inputName" class="form-control" placeholder="Nama sesuai KTP" value="${savedName}" oninput="saveCandidateData()">
                        </div>
                        <div class="col-md-4">
                            <label class="form-label small">Tanggal Lahir</label>
                            <input type="date" id="inputDob" class="form-control" value="${savedDob}" oninput="saveCandidateData()">
                        </div>
                    </div>
                </div>
            </div>

            <h5 class="mb-3 fw-bold"><i class="fas fa-list-alt me-2"></i>Daftar Ujian</h5>
            <div class="row g-3">
    `;

    // Looping Soal
    tests.forEach((test, index) => {
        const isLocked = !sessionData.tests_allowed.includes(index);
        html += `
            <div class="col-md-6 col-lg-4">
                <div class="card h-100 border-0 shadow-sm rounded-4 ${isLocked ? 'opacity-75 bg-light' : ''}">
                    <div class="card-body p-4 d-flex flex-column">
                        <h5 class="fw-bold mb-1">${test.name}</h5>
                        <p class="text-muted small mb-4">Simulasi JFT-Basic A2</p>
                        <button class="btn ${isLocked ? 'btn-secondary' : 'btn-primary'} mt-auto rounded-pill py-2" 
                                onclick="${isLocked ? '' : `startTest(${index})`}" ${isLocked ? 'disabled' : ''}>
                            ${isLocked ? '<i class="bi bi-lock-fill me-1"></i> Terkunci' : 'Mulai Tes'}
                        </button>
                    </div>
                </div>
            </div>
        `;
    });

    html += `</div></div>`;
    mainContent.innerHTML = html;
};

const createHowToDo = () => {
    const howtodo = document.createElement("div");
    howtodo.innerHTML = `
        <hr>
        <div class='mb-3'>
            <h3 id="tata_cara" class='border bg-danger text-white fw-bolder rounded p-2'>Tolong baca ini sebelum mulai Tes ! </h3>
            <div class='ps-2'>
                - Pastikan jaringan internet baik, coba refresh halaman ini 1-2x untuk mengecek jaringan. <br>
                - Untuk jaga-jaga, hapus cache browser sebelum login. <br>
                - Nonaktifkan fitur auto translate browser kamu.<br>
                - Jangan refresh halaman website jika tes sudah dimulai. karena akan menghapus hasil pengerjaan kamu.<br>
                - Gunakan hedset untuk mendengarkan percakapan di soal tes sesi 'choukai'.<br>
                - Rekaman suara di setiap sesi 'choukai' hanya bisa diputar 2x.<br> 
                - Pada saat rekaman diputar, kamu tidak bisa menjeda rekaman hingga rekaman selesai diputar.<br>
            </div>
        <hr>
        <h3 class='border bg-danger text-white fw-bolder rounded p-2'>Cara Penggunaan</h3>
        <div class="my-2 p-1">
            <span class="fs-5 border-bottom border-2 border-primary">Soal</span>
            <p>
            - terdapat indikator waktu pengerjaan, jika waktu habis, tes akan otomatis selesai. <br>
            - tombol 'selesaikan sesi' untuk lanjut ke sesi selanjutnya.<br>
            - icon jendela 🪟 untuk membuka daftar soal per sesinya.<br>
            - terdapat kolom soal dan jawaban.<br>
            - kolom jawaban terdiri dari empat baris, klik jawaban yang dianggap benar. jawaban yang terpilih akan berwarna hijau.
            </p>
            <img src="../assets/images/awal.png" class="img-fluid border" alt="Responsive image">
        </div>
        <div class="my-2 p-1">
            <span class="fs-5 border-bottom border-2 border-primary">Daftar soal</span>
            <p>
            - terdapat daftar soal dibagi persesinya.<br>
            - jika soal sudah dikerjakan, maka tombol nomor akan berwarna hijau.
            </p>
            <img src="../assets/images/2.png" class="img-fluid border" alt="Responsive image" style="max-width:320px;">
        </div>
        <div class="my-2 p-1">
            <span class="fs-5 border-bottom border-2 border-primary">Navigasi soal</span>
            <p>
            - icon panah kiri〈 untuk membuka soal sebelumnya.<br>
            - icon panah kanan 〉untuk membuka soal selanjutnya.
            </p>
            <img src="../assets/images/3.png" class="img-fluid border" alt="Responsive image">
        </div>
        <div class="my-2 p-1">
            <span class="fs-5 border-bottom border-2 border-primary">Tombol 'selesaikan sesi'</span>
            <p>
            - tombol 'selesaikan sesi' dapat di klik jika kamu telah mengerjakan seluruh soal di sesi tersebut.<br>
            <img src="../assets/images/4.png" class="img-fluid border" alt="Responsive image"><br>
            - akan muncul konfirmasi terahir sebelum melaju ke sesi selanjutnya.<br>
            - setelah lanjut ke sesi berikutnya, kamu tidak bisa kembali kesesi sebelumnya.<br>
            <img src="../assets/images/5.png" class="img-fluid border" alt="Responsive image" style="max-width:300px;"><br>
            - di sesi terahir, akan muncul konfirmasi untuk menyelesaikan tes.<br>
            <img src="../assets/images/6.png" class="img-fluid border" alt="Responsive image" style="max-width:300px;">
            </p>
        </div>
        <div class="my-2 p-1">
            <span class="fs-5 border-bottom border-2 border-primary">Tombol 'Hasil'</span>
            <p>
            - hasil akan muncul setelah tes berahir.<br>
            - hijau untuk lulus, dan merah untuk gagal.<br>
            - batas total kelulusan adalah 200 poin.<br>
            - untuk sementara ini, hasil tes tidak akan disimpan disistem, jadi silahkan print atau screenshot untuk menyimpannya.<br>
            - kunci jawaban bisa dilihat dengan mendownload kunci jawaban, click tombol " kunci jawaban 🔑 ".<br>
            <img src="../assets/images/lulus.png" class="img-fluid border" alt="Responsive image" style="max-width:320px;"><br>
            <img src="../assets/images/gagal.png" class="img-fluid border" alt="Responsive image" style="max-width:320px;">
            </p>
        </div>
        `;
    return howtodo;
}
const showResultHistory = async () => {
    // [PERBAIKAN PENTING]
    // Ambil Token ID dari sumber yang SAMA dengan fungsi saveTestResult
    const currentTokenId = sessionStorage.getItem('token_id');
    
    // Cek jika user belum login atau sesi habis
    if (!currentTokenId) {
        alert("Sesi berakhir atau Token tidak ditemukan. Silakan masukkan token kembali.");
        if(typeof showLoginForm === 'function') showLoginForm(); 
        return;
    }

    // Bersihkan layar & Siapkan container
    clearMain();
    const historyContainer = document.createElement('div');
    historyContainer.className = 'container mt-4 animate__animated animate__fadeIn pb-5';
    
    // Render tabel HTML (Kerangka)
    historyContainer.innerHTML = `
        <div class="d-flex justify-content-between align-items-center mb-4">
            <div>
                <h2 class="fw-bold mb-0"><i class="fas fa-history me-2 text-primary"></i>Riwayat Ujian</h2>
                <small class="text-muted">Token Aktif: <strong>${currentTokenId}</strong></small>
            </div>
            <button class="btn btn-outline-secondary rounded-pill px-4" onclick="showTestList()">
                <i class="fas fa-arrow-left me-1"></i> Kembali
            </button>
        </div>
        <div class="card border-0 shadow-sm rounded-4 overflow-hidden">
            <div class="table-responsive bg-white p-3">
                <table class="table table-hover align-middle mb-0">
                    <thead class="table-light">
                        <tr>
                            <th>Tanggal</th>
                            <th>Nama Ujian</th>
                            <th class="text-center">Skor</th>
                            <th class="text-center">Status</th>
                            <th class="text-end">Aksi</th>
                        </tr>
                    </thead>
                    <tbody id="history-table-body">
                        <tr><td colspan="5" class="text-center p-5"><div class="spinner-border text-primary"></div></td></tr>
                    </tbody>
                </table>
            </div>
        </div>`;
    
    main.appendChild(historyContainer);

    try {
        // [PERBAIKAN QUERY]
        // Sekarang kita mencari data dimana 'token_id' sama dengan 'currentTokenId'
        const snapshot = await db.collection("history_tests")
            .where("token_id", "==", currentTokenId) 
            .get();

        const tbody = document.getElementById('history-table-body');
        tbody.innerHTML = '';

        if (snapshot.empty) {
            tbody.innerHTML = '<tr><td colspan="5" class="text-center py-5 text-muted">Belum ada riwayat ujian untuk token ini.</td></tr>';
            return;
        }

        // Konversi snapshot ke Array dan Urutkan dari yang terbaru
        let docs = [];
        snapshot.forEach(doc => docs.push({id: doc.id, ...doc.data()}));
        
        // Sorting manual karena Firebase index mungkin belum dibuat
        docs.sort((a, b) => {
            const dateA = a.date ? a.date.seconds : 0;
            const dateB = b.date ? b.date.seconds : 0;
            return dateB - dateA; // Descending (Terbaru di atas)
        });

        // Render baris tabel
        docs.forEach((data) => {
            const dateStr = data.date ? new Date(data.date.seconds * 1000).toLocaleDateString('id-ID') + ' ' + new Date(data.date.seconds * 1000).toLocaleTimeString('id-ID') : '-';
            
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td class="small text-muted">${dateStr}</td>
                <td class="fw-bold">${data.test_name || 'JFT Test'}</td>
                <td class="text-center"><span class="badge bg-primary px-3">${data.total_score || 0}</span></td>
                <td class="text-center">
                    <span class="badge ${data.is_passed ? 'bg-success' : 'bg-danger'} rounded-pill">
                        ${data.is_passed ? 'LULUS' : 'GAGAL'}
                    </span>
                </td>
                <td class="text-end">
                    <button class="btn btn-dark btn-sm rounded-pill px-3" onclick="showResultDetail('${data.id}')">
                        <i class="fas fa-eye me-1"></i> Detail
                    </button>
                </td>
            `;
            tbody.appendChild(tr);
        });

    } catch (error) {
        console.error("Error History:", error);
        const tbody = document.getElementById('history-table-body');
        if(tbody) tbody.innerHTML = `<tr><td colspan="5" class="text-center text-danger py-4">Gagal memuat data. ${error.message}</td></tr>`;
    }
};

const createResultHistoryList = (results) => {
    const container = document.createElement("div");
    container.className = "container mt-4";

    if (results.length === 0) {
        container.innerHTML = `
            <div class="alert alert-info">
                Belum ada riwayat tes.
            </div>
        `;
        return container;
    }

    let html = `
        <h3 class="mb-3"><i class="fas fa-history"></i> Riwayat Hasil Tes</h3>
        <div class="list-group">
    `;

    results.forEach(result => {
        const date = new Date(result.created_at).toLocaleString();
        html += `
            <div class="list-group-item ${result.is_passed ? 'list-group-item-success' : 'list-group-item-danger'}">
                <div class="d-flex justify-content-between">
                    <h5>${result.test_name}</h5>
                    <span class="badge ${result.is_passed ? 'bg-success' : 'bg-danger'}">
                        ${result.is_passed ? 'LULUS' : 'GAGAL'}
                    </span>
                </div>
                <p class="mb-1">Skor: <strong>${result.total_score}</strong></p>
                <small class="text-muted">${date}</small>
                <button onclick="showResultDetail(${result.id})" class="btn btn-sm btn-outline-primary mt-2">
                    <i class="fas fa-info-circle"></i> Detail
                </button>
            </div>
        `;
    });

    html += `</div>`;
    container.innerHTML = html;
    return container;
};
// test list

// start confirmation
const createStartConfirmation = () => {
    // create container
    let action = 'startTest()';
    const StartConfirmation = document.createElement("div");
    if (user.name == 'coba') {
        action = 'coba()';
    }
    StartConfirmation.innerHTML = `
        <div class="position-absolute top-50 start-50 translate-middle rounded" style="width:400px;">
          <div class="border shadow rounded text-center">
            <div class="text-white bg-success  rounded-top  py-2">
             ${currentTest.name} | ${currentTest.level}
            </div>
            <button onclick="showTestList()" type="button" class="btn btn-danger my-4">Kembali</button>
            <button onclick="${action}" type="button" class="btn btn-primary my-4">Mulai tes</button>
          </div>
        </div>
        `;
    return StartConfirmation;
}
const showStartConfirmation = (test) => {
    currentTest = test;
    clearMain();
    main.appendChild(createStartConfirmation());
}
const inituserAnswers = () => {
    let temp;
    for (let i = 0; i < currentTest.questions.length; i++) {
        temp = {
            id: currentTest.questions[i].id,
            section: currentTest.questions[i].section,
            answer: 0
        }
        userAnswers.push(temp);
    }
}

const startTest = async (testIndex) => { 
    
    // 1. VALIDASI DATA KANDIDAT DULU
    const name = localStorage.getItem('candidateName');
    const dob = localStorage.getItem('candidateDob');
    // Foto opsional, tapi kalau mau wajib tambahkan: && localStorage.getItem('candidatePhoto')
    
    if (!name || !dob) {
        alert("Mohon lengkapi Nama dan Tanggal Lahir sebelum memulai tes!");
        // Scroll ke atas agar user lihat formnya
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // Highlight kolom yang kosong (opsional)
        if(!name) document.getElementById('inputName').classList.add('is-invalid');
        if(!dob) document.getElementById('inputDob').classList.add('is-invalid');
        return;
    }

    // 2. Ambil data tes
    if (typeof testIndex !== 'undefined' && tests[testIndex]) {
        currentTest = tests[testIndex];
    } else if (!currentTest) {
        alert("Terjadi kesalahan memilih soal.");
        return;
    }

    // 3. Konfirmasi & Kurangi Kuota (Kode Lama Anda)
    if (confirm("Apakah Anda siap? Kuota akan berkurang 1.")) {
        await kurangiKuota(); 
        
        const sessionData = JSON.parse(sessionStorage.getItem('token_active'));
        if(sessionData) {
            sessionData.quota = sessionData.quota - 1;
            sessionStorage.setItem('token_active', JSON.stringify(sessionData));
        }

        const mainContent = document.getElementById("main-content");
    if (mainContent) {
        mainContent.style.display = 'none'; // Menghilangkan daftar soal
    }
    userAnswers = []; 
    currentQuestionIndex = 0;
    
    
        resetExamState();
        inituserAnswers();
        updateHeaderCountdown();
        preventOpenedNav();
        showTest();
    }
}


// profile
const createVoucherPage = () => {
    const profileContainer = document.createElement("div");
    profileContainer.className = "profile-container p-4 border rounded-bottom shadow-sm";
    profileContainer.innerHTML = `
        <h2 class="text-center mb-4">Tambah Voucher tes</h2>
        <div class="mb-3">
            <p>
            <div class="p-2 fs-5 border-top border-warning"
             Voucher test : ${user.test_count} 
            <br>Jika voucher habis dan ingin tambah lagi, silahkan hubungi Admin melalui wa <a href="https://wa.me/818089156518"> jft simulation admin<a>, atau kontak email kami <a href="mailto:admin@jft-simulaiton.com">admin@jft-simulaiton.com</a>
            <br>harga voucher : 
            <br>1. 1 voucher tes Rp. 25.000 
            <br>2. 3 voucher tes Rp. 50.000 
            <br>3. 8 voucher tes Rp. 100.000 
            </div>
            </p>
        </div>
        <button onclick="showTestList()" class="btn btn-primary">Kembali ke Tes</button>
    `;
    return profileContainer;
};

const showVoucherPage = () => {
    clearMain();
    main.appendChild(createMyHeader());
    main.appendChild(createVoucherPage());
};

// profile
const createProfilePage = () => {
    const profileContainer = document.createElement("div");
    profileContainer.className = "profile-container p-4 border rounded-bottom shadow-sm";
    profileContainer.innerHTML = `
        <h2 class="text-center mb-4">Profil Pengguna</h2>
        <div class="mb-3">
            <p>
            <strong>Nama:</strong> ${user.name}<br>
            <strong>Email:</strong> ${(user.email ? user.email : '') } <br>
            <strong>Plan:</strong> ${(user.plan ? user.plan : '-') }
            </p>
        </div>
        <button onclick="showTestList()" class="btn btn-primary">Kembali ke Tes</button>
    `;
    return profileContainer;
};

const showProfilePage = () => {
    // 1. Bersihkan layar hasil
    clearMain(); 
    
    const mainContent = document.getElementById('main-content');
    
    // --- PERBAIKAN BUG DIMULAI DISINI ---
    // 2. Paksa container profile untuk muncul (Display Block)
    if (mainContent) {
        mainContent.style.display = 'block';
    }
    // --- PERBAIKAN SELESAI ---
    
    // Ambil data dari Local Storage
    const name = localStorage.getItem('candidateName') || 'Kandidat';
    const dob = localStorage.getItem('candidateDob') || '-';
    const photo = localStorage.getItem('candidatePhoto') || 'https://via.placeholder.com/150';
    const sessionData = JSON.parse(sessionStorage.getItem('token_active'));

    mainContent.innerHTML = `
        <div class="container mt-4 animate__animated animate__fadeIn">
            <div class="row justify-content-center">
                <div class="col-md-6">
                    <div class="card border-0 shadow-lg rounded-4 overflow-hidden">
                        <div class="bg-primary p-5 text-center position-relative">
                             <button class="btn btn-sm btn-light position-absolute top-0 start-0 m-3 rounded-pill" onclick="showTestList()">
                                <i class="fas fa-arrow-left"></i>
                             </button>
                             <img src="${photo}" class="rounded-circle border border-4 border-white shadow" 
                                  style="width: 120px; height: 120px; object-fit: cover; margin-bottom: -100px; background: white;">
                        </div>
                        <div class="card-body text-center mt-5 pt-4">
                            <h3 class="fw-bold mb-0">${name}</h3>
                            <p class="text-muted small">${sessionData ? sessionData.package : 'Paket Belum Aktif'}</p>
                            
                            <hr>
                            
                            <div class="text-start px-4">
                                <div class="mb-3">
                                    <label class="small text-muted d-block">Tanggal Lahir</label>
                                    <span class="fw-bold">${dob}</span>
                                </div>
                                <div class="mb-3">
                                    <label class="small text-muted d-block">ID Token</label>
                                    <span class="badge bg-light text-dark border">${sessionStorage.getItem('token_id')}</span>
                                </div>
                            </div>
                            
                            <div class="d-grid gap-2 px-4 mt-4 mb-3">
                                <button class="btn btn-danger rounded-pill" onclick="logout()">
                                    <i class="fas fa-sign-out-alt me-1"></i> Keluar / Logout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
};

// start confirmation

// test
// const createTestHeader = () => {
//     // create header
//     const testTestHeader = document.createElement("div");
//     testTestHeader.className = "row bg-dark text-white bg-gradient shadow-sm rounded mb-2 py-1";
//     // create current question
//     const testCurrentQuestion = document.createElement("div");
//     testCurrentQuestion.className = "col text-start";
//     testCurrentQuestion.innerHTML = `
//         Section <span id="header-current-section">1</span> Question <span id="header-current-question">1</span>
//         `;
//     // create countdown
//     const testCountDown = document.createElement("div");
//     testCountDown.className = "col text-center";
//     testCountDown.id = "header-countdown";

//     if (currentTest.name == "Simulation JFT-Sample") {
//         testCountDown.innerHTML = `<i class="fa-solid fa-clock mx-1"></i> 12:00`;
//     } else {
//         testCountDown.innerHTML = `<i class="fa-solid fa-clock mx-1"></i> 60:00`;
//     }
//     // create end button
//     const testEndButton = document.createElement("div");
//     testEndButton.className = "col text-center";
//     testEndButton.innerHTML = ` <button id="header-end-button" class="btn btn-success" onclick="endSection()">Selesaikan sesi</button>`;
//     // merge header
//     testTestHeader.appendChild(testCurrentQuestion);
//     testTestHeader.appendChild(testCountDown);
//     testTestHeader.appendChild(testEndButton);
//     return testTestHeader;
// }
const createTestHeader = () => {
    const testTestHeader = document.createElement("div");
    // Menggunakan kelas 'prometric-header' untuk styling khusus
    testTestHeader.className = "prometric-header d-flex justify-content-between align-items-center px-4 py-2 mb-3 shadow-sm";
    testTestHeader.style.backgroundColor = "#f8f9fa"; // Latar belakang abu-abu muda
    testTestHeader.style.borderBottom = "3px solid #0d6efd"; // Garis bawah biru

    testTestHeader.innerHTML = `
        <div class="d-flex align-items-center">
            <span class="badge bg-primary me-3" style="font-size: 1em;">
                SECTION <span id="header-current-section">1</span>
            </span>
            <h5 class="mb-0 text-dark fw-bold">
                Question <span id="header-current-question">1</span>
            </h5>
        </div>

        <div class="d-flex align-items-center">
            <div id="header-countdown" class="me-4 fw-bold text-danger d-flex align-items-center" style="font-size: 1.2em;">
                <i class="fa-solid fa-clock me-2"></i> 60:00
            </div>
            <button id="header-end-button" class="btn btn-outline-primary fw-bold" onclick="endSection()">
                Selesaikan Sesi <i class="fas fa-arrow-right ms-2"></i>
            </button>
        </div>
    `;
    return testTestHeader;
};

// <button class="btn btn-sm btn-success me-2" onclick="autoCompleteTest(true)">
//      <i class="fas fa-check-circle"></i> Auto Lulus
//  </button>
//  <button class="btn btn-sm btn-danger me-2" onclick="autoCompleteTest(false)">
//      <i class="fas fa-times-circle"></i> Auto Gagal
//  </button>
// tester 
const autoCompleteTest = (isPassed) => {
    if (confirm(`Anda yakin ingin menyelesaikan tes secara otomatis dengan status ${isPassed ? "LULUS" : "GAGAL"}?`)) {
        // Generate jawaban acak atau pola tertentu
        userAnswers = currentTest.questions.map(question => ({
            id: question.id,
            section: question.section,
            answer: isPassed ?
                question.keyid + 1 : // Jawaban benar sesuai kunci
                (question.keyid + 1) % 4 + 1 // Jawaban salah (modulo untuk memastikan salah)
        }));

        // Hitung skor
        const totalScore = isPassed ?
            Math.floor(Math.random() * 100) + 200 : // Skor lulus (200-300)
            Math.floor(Math.random() * 200); // Skor gagal (0-199)

        // Langsung tampilkan hasil
        showResult({
            test_name: currentTest.name,
            answers: userAnswers,
            total_score: totalScore,
            is_passed: isPassed
            
        });
    }
};

const updateHeaderCurrentQuestion = () => {
    document.getElementById("header-current-section").innerHTML = currentQuestion.section;
    document.getElementById("header-current-question").innerHTML = currentQuestion.id;
}
const updateHeaderCountdown = () => {
    let countDownDate;

    if (currentTest.name == "Simulation JFT-Sample") {
        countDownDate = addHours(0.2).getTime();
    } else {
        countDownDate = addHours(1).getTime();
    }
    countdown = setInterval(function() {
        let now = new Date().getTime();
        let distance = countDownDate - now;
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);
        document.getElementById("header-countdown").innerHTML = `<i class="fa-solid fa-clock mx-1"></i> ${minutes} : ${seconds}`;
        if (distance < 0) {
            alert("Times up, test will automativally end!");
            showResult();
        }
    }, 1000);
}
const addHours = (numOfHours, date = new Date()) => {
    date.setTime(date.getTime() + numOfHours * 60 * 60 * 1000);
    return date;
}
const updateHeaderEndButton = () => {
    document.getElementById("header-end-button")
}
const createTestQAContainer = () => {
    // create container
    const testQAContainer = document.createElement("div");
    testQAContainer.classList.add("row");
    testQAContainer.id = "tqa";
    testQAContainer.style.minHeight = "400px";
    testQAContainer.appendChild(createTestQANavigation(currentTest));
    testQAContainer.appendChild(createTestQA(currentQuestion));
    return testQAContainer;
}
const createTestQANavigation = () => {
    // create container
    const testQANavigationContainer = document.createElement("div");
    testQANavigationContainer.classList.add("col-sm-2", "my-2")
    testQANavigationContainer.style.zIndex = "999";

    // create toggle button
    testQANavigationContainer.innerHTML = `
        <button id="QA-nav-toggle-button" class="btn btn-success" type="button" data-bs-toggle="collapse" data-bs-target="#QANavigation" aria-expanded="false" >
          <i class="fa-solid fa-table-cells-large"></i>
        </button>
        `;

    // create test QA navigation
    const testQANavigation = document.createElement("div");
    testQANavigation.className = "collapse position-absolute row border bg-light shadow-sm border";
    testQANavigation.id = "QANavigation";
    // create section list-----------------
    const testSectionNavList = document.createElement("div");
    testSectionNavList.className = "col-2 border-end p-0";
    // create section nav
    let sectionNav;
    sections.forEach((section) => {
        sectionNav = document.createElement("div");
        sectionNav.className = "border-top py-2 ";
        if (section.id == 1) {
            sectionNav.classList.add("bg-success", "bg-gradient", "ps-3");
        }
        // done
        // ="border-top bg-success bg-gradient ps-3"
        sectionNav.innerText = "S" + section.id;
        sectionNav.id = "Nav-s" + section.id;
        testSectionNavList.appendChild(sectionNav);
    });

    // create question list-----------------
    const testQuestionList = document.createElement("div");
    testQuestionList.className = "col-10 row pb-2";
    // create question list wrapper
    let testQuestionListWrapper;
    let questionNav;
    sections.forEach((section) => {
        testQuestionListWrapper = document.createElement("div");
        testQuestionListWrapper.className = "row my-2 gy-3 gx-2";
        testQuestionListWrapper.id = `s${section.id}q`;

        currentTest.questions.forEach((question) => {
            if (section.id == question.section) {
                testQuestionListWrapper.innerHTML += `
                        <button class="btn btn-sm btn-light col-2 border rounded text-center mx-1" 
                                id="nav-s${section.id}q${question.id}"
                                onclick="showQuestion(this)">${question.id}
                        </button>
                        `;

            }
        });

        testQuestionList.appendChild(testQuestionListWrapper);
        if (section.id != 1) {
            testQuestionListWrapper.style.display = "none";
        }
    });
    // merge to container
    testQANavigation.appendChild(testSectionNavList);
    testQANavigation.appendChild(testQuestionList);
    testQANavigationContainer.appendChild(testQANavigation);
    return testQANavigationContainer;
}
const shuffle = (array) => {
    // for (let i = array.length - 1; i > 0; i--) {
    //     const j = Math.floor(Math.random() * (i + 1));
    //     const temp = array[i];
    //     // Swap
    //     array[i] = array[j];
    //     array[j] = temp;
    // }
    return array;
}
const createTestQA = (question) => {
    const testQA = document.createElement("div");
    testQA.classList.add("col-sm-10", "prometric-qa-container"); // Tambah class khusus
    testQA.id = `tqa-s${question.section}q${question.id}`;

    // --- Bagian Media (Audio & Gambar) ---
    let mediaElement = '';
    // Audio
    if (question.sound != "") {
        mediaElement += `
            <div class="prometric-audio-container text-center mb-4 p-3 bg-light rounded border">
                <audio preload="none" controls controlsList="nodownload" onplaying="disabledAudio(this,${question.id})" onended="enabledAudio(this)" id="${question.play_count}" 
                ${(question.play_count == 0) ? "style='pointer-events:none; opacity: 0.6;' disabled" : ''} class="w-75"> 
                    <source src="../assets/sounds/${question.sound}" type="audio/ogg">
                    <source src="../assets/sounds/${question.sound}" type="audio/mpeg">
                    Browser Anda tidak mendukung elemen audio.
                </audio>
                <div class="mt-2 small text-muted">
                 ${(question.play_count == 2) ? '<i class="fas fa-info-circle me-1"></i> Audio dapat diputar 2 kali.' : ''}
                 ${(question.play_count == 1) ? '<i class="fas fa-exclamation-circle me-1 text-warning"></i> Tersisa 1 kali pemutaran.' : ''}
                 ${(question.play_count == 0) ? '<i class="fas fa-times-circle me-1 text-danger"></i> Batas pemutaran habis.' : ''}
                </div>
            </div>
            `;
    }
    // Gambar
    if (question.image != "") {
        mediaElement += `
            <div class="prometric-image-container text-center mb-4">
                <img class="img-fluid border rounded shadow-sm" src="../assets/images/${question.image}" style="max-height: 350px;"/>
            </div>
            `;
    }

    // --- Merakit HTML Soal ---
    testQA.innerHTML = `
        <div class="card border-0 shadow-sm">
            <div class="card-body p-4 text-dark">
                ${mediaElement}

                <div class="prometric-question-text mb-4">
                    <h5 class="lh-base fw-normal">${question.text}</h5>
                </div>

                <hr class="my-4 opacity-25">

                <div class="prometric-options-list list-group gap-2">
                    ${question.answers.map((answer, index) => {
                        const val = index + 1;
                        return `
                        <button id="s${question.section}q${question.id}" type="button" 
                                class="list-group-item list-group-item-action p-3 border rounded-3 d-flex align-items-center" 
                                value="${val}" onclick="setUserAnswer(this)">
                            <span class="badge bg-secondary me-3 px-3 py-2 rounded-pill" style="font-size: 1em;">${val}</span>
                            <span class="fs-5">${answer.text}</span>
                        </button>
                        `;
                    }).join('')}
                </div>
            </div>
        </div>
    `;
    return testQA;
};
const createTestFooter = () => {
    // create header
    const TestFooter = document.createElement("div");
    TestFooter.className = "row bg-dark text-white bg-gradient shadow-sm rounded mb-2 py-1";
    TestFooter.innerHTML = `
        <div class="row mx-auto" id="test-footer">
            <div class="col-6 text-start">
                <button id="nav-btn" class="btn btn-success" navPrevAct buttonDisplayPrev ><i class="fa-solid fa-chevron-left"></i></button>
            </div>
            <div class="col-6 text-end">
                <button id="nav-btn"  class="btn btn-success" navNextAct buttonDisplayNext ><i class="fa-solid fa-chevron-right"></i></button>
            </div>
        </div>
        `;
    return TestFooter;
}
const updateTestFooter = () => {
    question = currentQuestion;
    let noPrev = [1, 16, 31, 41];
    let noNext = [15, 30, 40, 50];
    let navPrevAct = "";
    let navNextAct = "";
    let buttonDisplayPrev = "";
    let buttonDisplayNext = "";
    if (currentTest.name == "Simulation JFT-Sample") {
        noPrev = [1, 6, 11, 13];
        noNext = [5, 10, 12, 14];
    }
    for (let i = 0; i < 4; i++) {
        navPrevAct = `onclick="showQuestionByID(${Number(question.id)-1})"`;
        navNextAct = `onclick="showQuestionByID(${Number(question.id)+1})"`;
        if (question.id == noPrev[i]) {
            buttonDisplayPrev = `style="display:none;"`;
            navPrevAct = "";
        }
        if (question.id == noNext[i]) {
            buttonDisplayNext = `style="display:none;"`;
            navNextAct = "";
        }
    }
    document.getElementById("test-footer").innerHTML = `
        <div class="row mx-auto" id="test-footer">
            <div class="col-6 text-start">
                <button id="nav-btn" class="btn btn-success" ${navPrevAct} ${buttonDisplayPrev} ><i class="fa-solid fa-chevron-left"></i></button>
            </div>
            <div class="col-6 text-end">
                <button id="nav-btn"  class="btn btn-success" ${navNextAct} ${buttonDisplayNext} ><i class="fa-solid fa-chevron-right"></i></button>
            </div>
        </div>`;
}
const createTest = () => {
    // create container
    const testTestContainer = document.createElement("div");
    testTestContainer.classList.add("test", "mb-2")
    testTestContainer.appendChild(createTestHeader());
    testTestContainer.appendChild(document.createElement("hr"));
    testTestContainer.appendChild(createTestQAContainer());
    testTestContainer.appendChild(createTestFooter());
    return testTestContainer;
}
const showTest = () => {
        currentSection = 1;
        currentQuestion = findQuestionById(1);
        clearMain();
        main.appendChild(createTest());
        updateTestFooter();
    }
    // test

// result
const getSectionScore = (sectionId) => {
    let result = 0;
    for (let i = 0; i < userAnswers.length; i++) {
        if (userAnswers[i].section == sectionId) {
            if (currentTest.questions[i].keyid == userAnswers[i].answer - 1) {
                result++;
            }
        }
    }
    if (currentTest.name == "Simulation JFT-Sample") {
        switch (sectionId) {
            case 1:
                result = (result * 12.5);
                break;
            case 2:
                result = (result * 12.5);
                break;
            case 3:
                result = (result * 31.25);
                break;
            case 4:
                result = (result * 31.25);
                break;
        }
    } else {
        switch (sectionId) {
            case 1:
                result = (result * 4.4) - 1;
                break;
            case 2:
                result = (result * 4.4) - 1;
                break;
            case 3:
                result = (result * 6);
                break;
            case 4:
                result = (result * 6);
                break;
        }
    }
    if (result < 0) {
        result = 0;
    }
    return result;
}
const getTotalScore = () => {
    let result = 0;
    for (let i = 1; i < 5; i++) {
        result += getSectionScore(i);
    }
    return result;
}
const evaluateTest = () => {
    let isPassed = false;
    totalResult = getTotalScore();
    if (totalResult > 200) {
        isPassed = true;
    }
    return isPassed;
}

const createResult = (passedData = null) => {
    // --- BAGIAN 1: LOGIKA PERHITUNGAN ---
    let answersData = passedData ? passedData.answers : userAnswers;
    
    let sectionResults = [];
    if (passedData && passedData.section_scores) {
        sectionResults = passedData.section_scores;
    } else {
        for (let i = 1; i < 5; i++) {
            if (currentTest.name == "Simulation JFT-Sample") {
                sectionResults.push(Number(getSectionScore(i)));
            } else {
                sectionResults.push(Number(getSectionScore(i).toFixed(0)));
            }
        }
    }

    const totalScore = passedData ? passedData.total_score : (
        currentTest.name == "Simulation JFT-Sample" ? Number(getTotalScore()) : Number(getTotalScore().toFixed(0))
    );
    
    const isPassed = passedData ? passedData.is_passed : evaluateTest();

    let link_answer = '';
    const pdfLinks = {
        "Simulation JFT-Sample": 'https://jft-simulation.com/pdf/ABSJVSEPAC.pdf',
        "Simulation JFT-1": 'https://jft-simulation.com/pdf/DZWAQX1QEP.pdf',
        "Simulation JFT-2": 'https://jft-simulation.com/pdf/TZJBWSZW9N.pdf',
        "Simulation JFT-3": 'https://jft-simulation.com/pdf/ANPBMCEEJC.pdf',
        "Simulation JFT-4": 'https://jft-simulation.com/pdf/UVL97Y1LBL.pdf',
        "Simulation JFT-5": 'https://jft-simulation.com/pdf/LRBOW9P3VN.pdf',
        "Simulation JFT-6": 'https://jft-simulation.com/pdf/R01H4GVB03.pdf',
        "Simulation JFT-7": 'https://jft-simulation.com/pdf/N8EU54EQY0.pdf',
        "Simulation JFT-8": 'https://jft-simulation.com/pdf/5TUB0Y55J6.pdf',
        "Simulation JFT-9": 'https://jft-simulation.com/pdf/SZ1MUEP8WB.pdf'
    };
    if (currentTest && pdfLinks[currentTest.name]) {
        link_answer = pdfLinks[currentTest.name];
    }

    const cName = localStorage.getItem('candidateName') || 'Peserta';
    const cDob = localStorage.getItem('candidateDob') || '-';
    const cPhoto = localStorage.getItem('candidatePhoto') || '../assets/images/default-avatar.png';
    const testDate = new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' });

    const statusColor = isPassed ? "success" : "danger";
    const statusIcon = isPassed ? "fa-trophy" : "fa-times-circle";
    const statusText = isPassed ? "LULUS / PASSED" : "TIDAK LULUS / FAILED";
    const progressPercent = Math.min((totalScore / 250) * 100, 100);

    const resultContainer = document.createElement("div");
    resultContainer.className = "container mt-4 animate__animated animate__fadeIn";

    // --- RENDER HTML ---
    resultContainer.innerHTML = `
        <div class="row justify-content-center">
            <div class="col-md-8 col-lg-6">
                <div class="card shadow-lg border-0 rounded-4 overflow-hidden">
                    <div class="card-header bg-${statusColor} text-white text-center py-4">
                        <h2 class="fw-bold mb-0"><i class="fas ${statusIcon} me-2"></i> ${statusText}</h2>
                        <p class="mb-0 mt-2 opacity-75">Hasil Simulasi JFT-Basic A2</p>
                    </div>

                    <div class="card-body p-4 text-center">
                        <div class="d-flex align-items-center gap-3 border rounded p-3 bg-light mb-4 text-start shadow-sm">
                            <img src="${cPhoto}" style="width:80px; height:100px; object-fit:cover; border-radius:5px; border:1px solid #ccc; background: white;" onerror="this.src='https://via.placeholder.com/80x100?text=No+Img'"> 
                            <div>
                                <div class="small text-muted text-uppercase fw-bold" style="font-size: 0.7rem;">Candidate Information</div>
                                <div class="fw-bold fs-5 text-dark">${cName}</div>
                                <div class="text-muted small"><i class="fas fa-birthday-cake me-1"></i> ${cDob}</div>
                                <div class="text-muted small"><i class="fas fa-calendar-alt me-1"></i> ${testDate}</div>
                            </div>
                        </div>

                        <div class="py-2">
                            <h5 class="text-muted text-uppercase ls-1">Total Skor Anda</h5>
                            <h1 class="display-1 fw-bold text-${statusColor} mb-0">${totalScore}</h1>
                            <p class="text-muted">Batas Lulus: 200 Poin</p>
                        </div>

                        <div class="progress mb-4" style="height: 20px; border-radius: 10px;">
                            <div class="progress-bar bg-${statusColor} progress-bar-striped progress-bar-animated" style="width: ${progressPercent}%"></div>
                        </div>

                        <div class="row g-3 text-start mb-4">
                            <div class="col-6"><div class="p-3 border rounded-3 bg-light">
                                <small class="text-muted d-block fw-bold">Section 1</small><span class="fs-5 text-primary fw-bold">${sectionResults[0]} Poin</span>
                            </div></div>
                            <div class="col-6"><div class="p-3 border rounded-3 bg-light">
                                <small class="text-muted d-block fw-bold">Section 2</small><span class="fs-5 text-primary fw-bold">${sectionResults[1]} Poin</span>
                            </div></div>
                            <div class="col-6"><div class="p-3 border rounded-3 bg-light">
                                <small class="text-muted d-block fw-bold">Section 3</small><span class="fs-5 text-primary fw-bold">${sectionResults[2]} Poin</span>
                            </div></div>
                            <div class="col-6"><div class="p-3 border rounded-3 bg-light">
                                <small class="text-muted d-block fw-bold">Section 4</small><span class="fs-5 text-primary fw-bold">${sectionResults[3]} Poin</span>
                            </div></div>
                        </div>

                        <div class="d-grid gap-2">
                            <button class="btn btn-info text-white fw-bold rounded-pill mb-1" onclick="startReviewMode()">
                                <i class="fas fa-eye me-2"></i> Review Jawaban Anda
                            </button>

                            ${link_answer ? `<a href="${link_answer}" target="_blank" class="btn btn-warning text-dark fw-bold rounded-pill mb-1"><i class="fas fa-key me-2"></i> Kunci Jawaban (PDF)</a>` : ''}
                            
                            <button class="btn btn-outline-primary rounded-pill" onclick="showResultHistory()">
                                <i class="fas fa-history me-1"></i> Lihat Riwayat
                            </button>
                            
                            <div class="row g-2 mt-1">
                                <div class="col-6"><button class="btn btn-primary w-100 rounded-pill" onclick="showTestList()"><i class="fas fa-list me-1"></i> Daftar Tes</button></div>
                                <div class="col-6"><button class="btn btn-secondary w-100 rounded-pill" onclick="showProfilePage()"><i class="fas fa-user me-1"></i> Profil</button></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    const mainContent = document.getElementById("main-content");
    if (mainContent) {
        mainContent.style.display = 'none';
    }
    return resultContainer;
};

const saveTestResult = async (resultData) => {
    // [PERBAIKAN PENTING] 
    // Ambil ID langsung dari key 'token_id' yang diset saat validasi/login
    const tokenId = sessionStorage.getItem('token_id'); 

    // Validasi darurat: Jangan simpan jika token hilang
    if (!tokenId) {
        console.error("GAGAL MENYIMPAN: Token ID tidak ditemukan di session.");
        alert("Terjadi kesalahan sesi. Hasil tes mungkin tidak tersimpan di riwayat.");
        return;
    }

    const dataToSave = {
        token_id: tokenId, // KUNCI UTAMA: Sekarang ini berisi string token yang benar (misal: "JFT-123")
        candidate_name: localStorage.getItem('candidateName') || "Tanpa Nama",
        test_name: resultData.test_name,
        total_score: resultData.total_score,
        is_passed: resultData.is_passed,
        section_scores: resultData.section_scores,
        date: firebase.firestore.FieldValue.serverTimestamp(), // Timestamp server
        
        // Data detail jawaban
        user_answers_detail: userAnswers.map(ans => {
            const q = currentTest.questions.find(item => item.id == ans.id && item.section == ans.section);
            return {
                id: Number(ans.id),
                section: Number(ans.section),
                answer: Number(ans.answer),
                question_text: q ? q.text : "",
                correct_answer: q ? (Number(q.keyid) + 1) : 0,
                answer_options: q ? q.answers.map(a => a.text) : [],
                // Tambahkan field media jika perlu untuk review nanti
                question_image: q ? q.image : "",
                question_audio: q ? q.sound : ""
            };
        })
    };

    try {
        await db.collection("history_tests").add(dataToSave);
        console.log("Data berhasil disimpan ke Firebase dengan Token ID:", tokenId);
    } catch (error) {
        console.error("Error saving result:", error);
    }
};
window.currentHistoryData = [];

const showResultDetail = async (docId) => {
    // 1. UI Loading
    const mainContent = document.getElementById('main-content');
    
    // Pastikan navigasi lain tertutup
    if(document.getElementById('home-section')) document.getElementById('home-section').style.display = 'none';
    if(document.getElementById('feature-section')) document.getElementById('feature-section').style.display = 'none';
    
    mainContent.style.display = 'block';
    mainContent.innerHTML = `
        <div class="text-center p-5 mt-5 animate__animated animate__fadeIn">
            <div class="spinner-border text-primary" role="status"></div>
            <p class="mt-3 fw-bold text-muted">Sedang mengambil lembar ujian Anda...</p>
        </div>`;
    
    window.scrollTo({ top: 0, behavior: 'smooth' });

    try {
        // 2. Ambil data dari Firebase berdasarkan ID Dokumen
        const docRef = await db.collection("history_tests").doc(docId).get();

        if (!docRef.exists) {
            mainContent.innerHTML = `<div class="alert alert-danger m-4">Data ujian tidak ditemukan.</div>`;
            return;
        }

        const testData = docRef.data();

        // 3. Validasi: Apakah data ini memiliki detail jawaban (user_answers_detail)?
        // Data ujian versi lama mungkin tidak punya field ini.
        if (!testData.user_answers_detail || testData.user_answers_detail.length === 0) {
             mainContent.innerHTML = `
                <div class="container mt-5">
                    <div class="alert alert-warning shadow-sm border-0 rounded-4 p-4 text-center">
                        <i class="fas fa-exclamation-triangle fa-3x text-warning mb-3"></i>
                        <h4 class="alert-heading fw-bold">Data Arsip Lama</h4>
                        <p>Maaf, riwayat ujian ini diambil sebelum fitur "Simpan Detail Soal" diaktifkan.</p>
                        <p class="small text-muted">Hanya skor total yang tersedia untuk data ini.</p>
                        <hr>
                        <button class="btn btn-primary rounded-pill px-4" onclick="showResultHistory()">Kembali</button>
                    </div>
                </div>`;
             return;
        }

        // 4. Simpan ke Global Variable (Agar bisa difilter per section nanti)
        window.currentHistoryData = testData.user_answers_detail;

        // 5. Panggil Fungsi Render (Tampilan)
        renderHistoryReview(testData);

    } catch (error) {
        console.error("Error History:", error);
        mainContent.innerHTML = `
            <div class="container mt-5">
                <div class="alert alert-danger shadow-sm">
                    <strong>Gagal memuat data:</strong> ${error.message} <br>
                    Coba refresh halaman atau periksa koneksi internet.
                </div>
                <button class="btn btn-outline-secondary" onclick="showResultHistory()">Kembali</button>
            </div>`;
    }
};

const createResultDetailView = (result) => {
    const container = document.createElement("div");
    container.className = "container mt-4";
    const date = new Date(result.created_at).toLocaleString();
    
    let html = `
    <div class="card">
        <div class="card-header ${result.is_passed ? 'bg-success' : 'bg-danger'} text-white">
            <h4>${result.test_name} </h4>
        </div>
        <div class="card-body">
            <div class="row">
                <div class="col-md-6">
                    <p><strong>Status:</strong> 
                        <span class="badge ${result.is_passed ? 'bg-success' : 'bg-danger'}">
                            ${result.is_passed ? 'LULUS' : 'GAGAL'}
                        </span>
                    </p>
                </div>
                <div class="col-md-6">
                    <p><strong>Total Skor:</strong> ${result.total_score}</p>
                </div>
            </div>
            <p><strong>Tanggal Tes:</strong> ${date}</p>
            
            <h5 class="mt-4 mb-3 border-bottom pb-2">Detail Jawaban:</h5>
    `;

    // Group by section
    const sections = {};
    const historyTest = tests.find(item => item.name === result.test_name);
    result.answers.forEach((answer,index) => {
        if (!sections[answer.section]) {
            sections[answer.section] = [];
        }
        // console.log(historyTest);
        answer.answers = historyTest.questions[index].answers;
        sections[answer.section].push(answer);
    });

    // Tampilkan per section
    Object.entries(sections).forEach(([section, answers]) => {
        const sectionName = (
            result.test_details &&
            result.test_details.sections &&
            result.test_details.sections[section - 1] &&
            result.test_details.sections[section - 1].name
        ) || `Sesi ${section}`;

        html += `
        <div class="section-container mb-4">
            <h6 class="bg-light p-2 rounded">
                <i class="fas fa-layer-group me-2"></i>${sectionName}
            </h6>
            <div class="accordion" id="section-${section}-accordion">
        `;

        answers.forEach((answer, idx) => {
            const isCorrect = answer.answer == answer.correct_answer;
            const userAnswerText = answer.answer_options ? answer.answer_options[answer.answer - 1] : `Pilihan ${answer.answer}`;
            const correctAnswerText = answer.answer_options ? answer.answer_options[answer.correct_answer - 1] : `Pilihan ${answer.correct_answer}`;
            html += `
            <div class="accordion-item">
                <h2 class="accordion-header" id="heading-${section}-${idx}">
                    <button class="accordion-button ${isCorrect ? '' : 'bg-warning bg-opacity-10'}" 
                            type="button" 
                            data-bs-toggle="collapse" 
                            data-bs-target="#collapse-${section}-${idx}">
                        <span class="badge ${isCorrect ? 'bg-success' : 'bg-danger'} me-2">
                            Soal ${answer.id}
                        </span>
                        ${isCorrect ? 'Benar' : 'Salah'} 
                        (Anda: ${answer.answer}, Kunci: ${answer.correct_answer})
                    </button>
                </h2>
                <div id="collapse-${section}-${idx}" 
                     class="accordion-collapse collapse ${idx === 0 ? 'show' : ''}" 
                     data-bs-parent="#section-${section}-accordion">
                    <div class="accordion-body">
                        <div class="question-text mb-3">
                            <strong>Pertanyaan:</strong>
                            <div class="p-2 border rounded mt-1">${answer.question_text}</div>
                        </div>
                        ${answer.question_image ? `
                            <div class="question-image mb-3">
                                <strong>Gambar:</strong>
                                <img src="../assets/images/${answer.question_image}" 
                                     class="img-fluid border rounded mt-1 d-block" 
                                     style="max-height: 200px">
                            </div>
                        ` : ''}
                        ${answer.question_audio ? `
                            <div class="question-audio mb-3">
                                <strong>Audio:</strong>
                                <audio controls class="w-100 mt-1">
                                    <source src="../assets/sounds/${answer.question_audio}" type="audio/mpeg">
                                    Browser tidak mendukung audio
                                </audio>
                            </div>
                        ` : ''}
                        <div class="answer-info mb-3">
                            <strong>Pilihan Jawaban:</strong>
                            <ol class="list-group list-group-numbered mt-2">
                                ${answer.answer_options ? answer.answer_options.map((option, i) => `
                                    <li class="list-group-item 
                                        ${i+1 === answer.correct_answer ? 'list-group-item-success' : ''}
                                        ${i+1 === answer.answer && !isCorrect ? 'list-group-item-danger' : ''}">
                                        ${option}
                                        ${i+1 === answer.correct_answer ? ' <span class="badge bg-success">Kunci</span>' : ''}
                                        ${i+1 === answer.answer && !isCorrect ? ' <span class="badge bg-danger">Pilihan Anda</span>' : ''}
                                    </li>
                                `).join('') : `
                                    <li class="list-group-item ${1 === answer.correct_answer ? 'list-group-item-success' : ''}${1 === answer.answer && !isCorrect ? 'list-group-item-danger' : ''}">${answer.answers[0].text}</li>
                                    <li class="list-group-item ${2 === answer.correct_answer ? 'list-group-item-success' : ''}${2 === answer.answer && !isCorrect ? 'list-group-item-danger' : ''}">${answer.answers[1].text}</li>
                                    <li class="list-group-item ${3 === answer.correct_answer ? 'list-group-item-success' : ''}${3 === answer.answer && !isCorrect ? 'list-group-item-danger' : ''}">${answer.answers[2].text}</li>
                                    <li class="list-group-item ${4 === answer.correct_answer ? 'list-group-item-success' : ''}${4 === answer.answer && !isCorrect ? 'list-group-item-danger' : ''}">${answer.answers[3].text}</li>
                                `}
                            </ol>
                        </div>
                        <div class="answer-summary">
                            <p><strong>Jawaban Anda:</strong> ${userAnswerText} (Pilihan ${answer.answer})</p>
                            <p><strong>Jawaban Benar:</strong> ${correctAnswerText} (Pilihan ${answer.correct_answer})</p>
                        </div>
                    </div>
                </div>
            </div>
            `;
        });

        html += `
                </div>
            </div>
        `;
    });

    html += `
                <div class="text-center mt-4">
                    <button onclick="showResultHistory()" class="btn btn-primary">
                        <i class="fas fa-arrow-left me-1"></i> Kembali ke Riwayat
                    </button>
                </div>
            </div>
        </div>
    `;

    container.innerHTML = html;
    
    // Inisialisasi accordion Bootstrap
    if (typeof bootstrap !== 'undefined') {
        const accordions = container.querySelectorAll('.accordion');
        accordions.forEach(acc => new bootstrap.Collapse(acc));
    }
    
    return container;
};
const showResult = (manualResult = null) => {
    // Hentikan timer jika ada
    if (typeof countdown !== 'undefined' && countdown) clearInterval(countdown);
    
    // Bersihkan area utama (tapi jangan reset variabel global dulu)
    clearMain();

    let resultData = manualResult;
    
    // JIKA INI ADALAH HASIL BARU (Bukan dari History)
    if (!resultData) {
        let sectionScores = [];
        for (let i = 1; i < 5; i++) {
             // Logic skor (sesuaikan dengan logic Anda yang sudah ada)
             if (currentTest.name == "Simulation JFT-Sample") {
                sectionScores.push(Number(getSectionScore(i)));
            } else {
                sectionScores.push(Number(getSectionScore(i).toFixed(0)));
            }
        }

        resultData = {
            test_name: currentTest.name,
            answers: userAnswers, 
            total_score: currentTest.name == "Simulation JFT-Sample" ? Number(getTotalScore()) : Number(getTotalScore().toFixed(0)),
            section_scores: sectionScores,
            is_passed: evaluateTest(),
            timestamp: new Date().toISOString(), // Penting untuk sorting
            // --- PERBAIKAN: SIMPAN SOAL ASLI DI SINI AGAR TIDAK HILANG ---
            questions_snapshot: JSON.parse(JSON.stringify(currentTest.questions)), 
            // -------------------------------------------------------------
            candidate_snapshot: {
                name: localStorage.getItem('candidateName'),
                dob: localStorage.getItem('candidateDob')
            }
        };
        
        // Simpan ke Database Firebase
        saveTestResult(resultData);
    }

    // Simpan ke Global Variable untuk tombol Review
    window.activeResultData = resultData;

    // Tampilkan Halaman Hasil
    main.appendChild(createResult(resultData));
};
// result
// login control
const createLoginForm = () => {
    const loginContainer = document.createElement('div');
    loginContainer.innerHTML = `
    <h1>Login</h1>
    <div class="mx-auto p-md-3 p-1 m-2 shadow-sm border rounded  border my-2" >
        <div class="form-floating my-2">
            <input type="username" id="username" class="form-control" placeholder="">
            <label for="username">username</label>
          </div>
          <div class="form-floating my-2">
            <input type="password" id="password" class="form-control" placeholder="">
            <label for="password">Password</label>
          </div>
          <div class="mx-auto text-center  my-2">
            <button type="button"  
            onclick="authenthication()" 
            class="btn btn-outline-primary">Submit</button>
          </div>
    </div>
    `;
    loginContainer.innerHTML = `
    <div id="main-wrapper" class="container">
            <h1 class="fs-1 text-center">JFT Basic A2</h1>
            <hr>
        <form class="row my-2 p-2 mx-auto border " style="width:360px;">
            <h3 class="col-md-12 mx-auto col-12 fw-bold border bg-success text-white rounded p-2">Login</h3>
            <div class="col-md-6 col-12 form-group mb-2">
                <label for="username">Username</label>
                <input type="username" id="username" class="form-control">
            </div>
            <div class="col-md-6 col-12 form-group ">
                <label for="password">Password</label>
                <input type="password" id="password" class="form-control">
            </div>
            <div class="col-md-12 col-12 form-group mx-auto text-center mb-2">
                <button type="button" onclick="authenthication()" class="btn btn-success">Login</button>
            </div>
        </form>
        
        <div class="text-center mt-4 row">
        <div class="col-md-4 col-12">
        </div>
        <div class="col-md-4 col-12">
        </div>
        </div>
        </div>
    </div>

    `;

    document.getElementById("main-content").innerHTML = resultHTML;

   
            
    return loginContainer;

}
const showLoginForm = () => {
    const lang = i18n[currentLang];
    const mainContent = document.getElementById('main-content');

    mainContent.innerHTML = `
        <div class="row justify-content-center animate__animated animate__fadeIn">
            <div class="col-md-6 col-lg-5">
                <div class="text-center mb-4">
                    <h2 class="fw-bold">JFT-Simulation</h2>
                    <p class="text-muted">${lang.formHeader}</p>
                </div>
                <div class="card shadow-lg border-0 rounded-4 p-4">
                    <div class="card-body">
                        <label class="form-label d-block mb-3">${lang.tokenLabel}</label>
                        <div class="input-group mb-4">
                            <span class="input-group-text bg-light border-end-0"><i class="bi bi-key-fill text-primary"></i></span>
                            <input type="text" id="tokenInput" class="form-control form-control-lg border-start-0 ps-0" placeholder="${lang.tokenPlaceholder}">
                        </div>
                        <div class="d-grid">
                            <button class="btn btn-primary btn-lg rounded-pill fw-bold" onclick="validateToken()">
                                ${lang.checkTokenBtn}
                            </button>
                        </div>
                    </div>
                </div>
                <p class="text-center mt-4 text-muted small">
                    ${currentLang === 'vi' ? 'Chưa có mã?' : currentLang === 'en' ? 'No token yet?' : 'Belum punya token?'} 
                    <a href="https://wa.me/6281223419087" target="_blank" class="text-decoration-none fw-bold">Contact Admin</a>
                </p>
            </div>
        </div>
    `;
};
const showInActiveAccount = () => {
    clearMain();
    main.appendChild(createInActiveAccount());
}
const createInActiveAccount = () => {
    const inActiveAccount = document.createElement('div');
    inActiveAccount.innerHTML = `
    <div class="p-2">
        <h3 class="text-center fw-bolder">Akun belum aktif</h3>
        <p>Mohon maaf, akun kamu belum aktif atau kesempatan mengambil tes sudah habis, silahkan lakukan hal dibawah ini:<br>
        - Selesaikan pembayaran beli akun kamu.<br>
        - jika sudah melakukan pembayaran. tunggu balasan email dari admin.<br>
        - jika tidak kunjung juga ada balasan dalam 1 hari, silahkan kirim pesan ke email ini <a href='mailto:admin@jft-simulation.com'>admin@jft-simulation.com</a>.<br> 
        - jika terjadi eror sistem, dan membuat kamu keluar sebelum menyelesaikan tes, kirim bukti gagal melalui email untuk mendapatkan 1x kesempatan memulai tes.<br> 
        </p>
        <div class="text-center">
            <a href="../" class="btn btn-primary "><i class=" fs-2 bi bi-house-door"></i></a>
        </div>
    </div>
    `;
    return inActiveAccount;
}
const tryFree = async () => {
    const trialToken = 'testsyde'; // Token yang sudah Anda siapkan di Firebase

    try {
        const doc = await db.collection("tokens").doc(trialToken).get();
        if (doc.exists) {
            const data = doc.data();
            // Simpan ke session seperti login biasa
            sessionStorage.setItem('token_id', trialToken);
            sessionStorage.setItem('token_active', JSON.stringify(data));
            
            // Sembunyikan landing page
            document.getElementById('home-section').style.display = 'none';
            document.getElementById('main-content').style.display = 'block';
            
            // Langsung ke daftar soal
            showTestList();
        } else {
            alert("Token Trial tidak aktif. Silakan hubungi admin.");
        }
    } catch (error) {
        console.error("Error Trial:", error);
    }
}
const authenthication = () => { // Hapus kata 'async'
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Panggil login secara langsung tanpa 'await'
    user = login(username, password); 

    if (user) {
        if (user.is_active == 1) {
            // Logic pembatasan paket
            if (user.plan == 'Senpai') {
                tests.splice(0, 1);
            } else {
                tests.splice(1, 7);
                tests.splice(2, 1);
            }
            showTestList();
            document.getElementsByTagName('header')[0].style.display = 'none';
        } else {
            showInActiveAccount();
        }
    } else {
        // Logika untuk user 'coba' tetap dipertahankan
        if ((username == 'coba') && (password == 'coba')) {
            user = { name: 'coba', test_count: 0, is_active: 1 };
            tests.splice(1, 9);
            showTestList();
            document.getElementsByTagName('header')[0].style.display = 'none';
        } else {
            alert("username atau password salah");
            showLoginForm();
        }
    }
}

// global
initApp();
var referringURL = document.referrer || 'Direct Access';

window.startToMockup = () => {
    const home = document.getElementById('home-section');
    const mainContent = document.getElementById('main-content');

    // Sembunyikan Home
    if (home) home.style.display = 'none';

    // Tampilkan Main Content dan isi dengan Login
    if (mainContent) {
        mainContent.style.display = 'block';
        showLoginForm(); 
    }
};

window.goToHome = () => {
    const home = document.getElementById('home-section');
    const mainContent = document.getElementById('main-content');
    const header = document.getElementsByTagName('header')[0];

    // 1. Tampilkan Landing Page
    if (home) {
        home.style.display = 'block';
    }

    // 2. Sembunyikan Main Content (Login Form/Daftar Tes)
    if (mainContent) {
        mainContent.style.display = 'none';
        // Opsional: Kosongkan isinya agar benar-benar bersih
        mainContent.innerHTML = ''; 
    }

    // 3. Pastikan Navbar muncul
    if (header) {
        header.style.display = 'block';
    }
    
    // Scroll ke atas otomatis
    window.scrollTo(0, 0);
};

const updateLandingPage = () => {
    const lang = i18n[currentLang];
    
    const titleEl = document.querySelector("#home-section h1");
    const descEl = document.querySelector("#home-section p.lead");
    const btnEl = document.querySelector("#home-section button");

    if (titleEl) titleEl.innerText = lang.welcomeTitle;
    if (descEl) descEl.innerText = lang.welcomeDesc;
    if (btnEl) btnEl.innerText = lang.startBtn;
};


async function validateToken() {
    const tokenValue = document.getElementById('tokenInput').value.trim(); // Hapus .toUpperCase() dulu untuk tes murni
    const lang = i18n[currentLang];

    console.log("1. Mencoba validasi token:", tokenValue); // DEBUG

    if (!tokenValue) {
        alert("Token kosong!");
        return;
    }

    const btn = document.querySelector("button[onclick='validateToken()']");
    btn.innerHTML = 'Loading...';
    btn.disabled = true;

    try {
        // Cek ke Firestore
        const docRef = db.collection("tokens").doc(tokenValue);
        const docSnap = await docRef.get();

        if (docSnap.exists) {
            const tokenData = docSnap.data();
            
            // --- BAGIAN DEBUGGING PENTING ---
            console.log("2. Data Ditemukan!", tokenData);
            console.log("3. Cek Field quota:", tokenData.quota);
            console.log("4. Tipe Data quota:", typeof tokenData.quota);
            console.log("5. Apakah quota > 0?", tokenData.quota > 0);
            // --------------------------------

            // Pastikan pengecekan ini sesuai dengan nama field di Firebase Anda
            if (tokenData.quota > 0) {
                sessionStorage.setItem('token_id', tokenValue);
                sessionStorage.setItem('token_active', JSON.stringify(tokenData));
                console.log("6. Login Berhasil, masuk ke showTestList");
                showTestList();
            } else {
                console.warn("6. Login Gagal: Kuota habis atau tidak terbaca.");
                alert(`Gagal! Data terbaca: ${JSON.stringify(tokenData)}. Masalah: Kuota 0 atau salah nama field.`);
            }
        } else {
            console.error("2. Dokumen TIDAK ditemukan di Firebase.");
            alert("Token tidak terdaftar di database!");
        }
    } catch (error) {
        console.error("ERROR FATAL:", error);
        alert("Error: " + error.message);
    } finally {
        btn.innerHTML = "Validasi Token";
        btn.disabled = false;
    }
}

async function kurangiKuota() {
    const tokenId = sessionStorage.getItem('token_id');
    if (!tokenId) return;

    const docRef = db.collection("tokens").doc(tokenId);

    try {
        await docRef.update({
            // Mengurangi kuota sebanyak 1 secara atomik
            quota: firebase.firestore.FieldValue.increment(-1)
        });
        console.log("Kuota berhasil dikurangi");
    } catch (error) {
        console.error("Gagal mengurangi kuota:", error);
    }
}

async function renderUserIdentityResult(container) {

    const tokenId = localStorage.getItem("activeToken");
    if (!tokenId) return;

    const db = firebase.firestore();
    const doc = await db.collection("tokens").doc(tokenId).get();

    if (!doc.exists) return;

    const user = doc.data();

    /* FOTO */
    const photo =
        localStorage.getItem("userPhoto") || "../default-avatar.png";

    /* TEST DATE */
    const testDateRaw = localStorage.getItem("testDate");
    const testDate = testDateRaw
        ? new Date(testDateRaw).toLocaleDateString()
        : "-";

    const html = `
        <div class="candidate-info card mb-4 shadow-sm">
            <div class="card-body">

                <h6 class="text-muted border-bottom pb-2 mb-3">
                    Candidate Information
                </h6>

                <div class="d-flex align-items-center gap-4">

                    <img src="${photo}"
                        class="candidate-photo">

                    <div class="candidate-text">
                        <p><strong>Name:</strong> ${user.name || "-"}</p>
                        <p><strong>Date of Birth:</strong> ${user.birthDate || "-"}</p>
                        <p><strong>Test Date:</strong> ${testDate}</p>
                    </div>

                </div>

            </div>
        </div>
    `;

    container.insertAdjacentHTML("afterbegin", html);
}

async function fillCandidateInfo(container) {

    const tokenId = sessionStorage.getItem("token_id");
    if (!tokenId) return;

    const db = firebase.firestore();
    const doc = await db.collection("tokens").doc(tokenId).get();

    if (!doc.exists) return;

    const user = doc.data();

    const photo =
        localStorage.getItem("userPhoto") || "../default-avatar.png";

    const testDateRaw = localStorage.getItem("testDate");
    const testDate = testDateRaw
        ? new Date(testDateRaw).toLocaleDateString()
        : "-";

    container.innerHTML = `
        <div class="d-flex align-items-center gap-3 border rounded p-3 bg-light">
            <img src="${photo}" 
                 style="width:90px;height:110px;object-fit:cover;border-radius:6px;border:1px solid #ccc">

            <div class="text-start">
                <p class="mb-1"><strong>Name:</strong> ${user.name || "-"}</p>
                <p class="mb-1"><strong>Date of Birth:</strong> ${user.birthDate || "-"}</p>
                <p class="mb-0"><strong>Test Date:</strong> ${testDate}</p>
            </div>
        </div>
    `;
}

const handlePhotoUpload = (input) => {
    if (input.files && input.files[0]) {
        const file = input.files[0];
        
        // Cek ukuran file (batas 2MB agar localStorage tidak penuh)
        if (file.size > 2 * 1024 * 1024) {
            alert("Ukuran foto terlalu besar! Harap gunakan foto di bawah 2MB.");
            input.value = ""; // Reset input
            return;
        }

        const reader = new FileReader();
        reader.onload = function(e) {
            // Simpan string gambar ke Local Storage
            localStorage.setItem('candidatePhoto', e.target.result);
        }
        reader.readAsDataURL(file);
    }
};

// Fungsi menyimpan nama dan tanggal lahir otomatis saat diketik
const saveCandidateData = () => {
    const name = document.getElementById('inputName').value;
    const dob = document.getElementById('inputDob').value;
    
    localStorage.setItem('candidateName', name);
    localStorage.setItem('candidateDob', dob);
};

const logout = () => {
    if (confirm("Apakah Anda yakin ingin keluar?")) {
        sessionStorage.clear(); // Hapus token & session
        // Opsional: localStorage.clear(); // Aktifkan jika ingin hapus nama/foto juga
        location.reload(); // Refresh halaman ke posisi login
    }
};

const showFeatures = () => {
    // 1. Sembunyikan semua section
    document.getElementById('home-section').style.display = 'none';
    document.getElementById('main-content').style.display = 'none';
    
    // Jika Anda punya section lain (misal FAQ atau Pricing), sembunyikan juga di sini
    // document.getElementById('faq-section').style.display = 'none';

    // 2. Tampilkan section Fitur
    const featureSection = document.getElementById('feature-section');
    if (featureSection) {
        featureSection.style.display = 'block';
        window.scrollTo(0, 0); // Scroll ke atas
    }
};

// Update juga fungsi showHome (jika ada) atau tryFree agar Feature tertutup
const backToHome = () => {
    document.getElementById('feature-section').style.display = 'none';
    document.getElementById('main-content').style.display = 'none';
    document.getElementById('home-section').style.display = 'block';
};

const resetExamState = () => {
    // 1. Hentikan timer yang mungkin masih jalan di background
    if (countdown) {
        clearInterval(countdown);
        countdown = null;
    }

    // 2. Kosongkan jawaban user sepenuhnya
    userAnswers = [];

    // 3. Reset posisi ujian
    currentSection = 1;
    currentQuestionIndex = 0; // Jika variabel ini dipakai
    
    // 4. Pastikan header kembali ke kondisi awal
    updateHeaderCountdown(); 
}

let reviewSectionIndex = 1;

// 1. Fungsi Utama Memulai Review
const startReviewMode = () => {
    // 1. Cek apakah ada data hasil
    if (!window.activeResultData) {
        alert("Data review hilang. Silakan buka dari menu Riwayat.");
        return;
    }

    const data = window.activeResultData;
    let detailData = [];

    // 2. LOGIKA PENYIAPAN DATA
    
    // KASUS A: Data dari History Firebase (Sudah matang, punya user_answers_detail)
    if (data.user_answers_detail && data.user_answers_detail.length > 0) {
        detailData = data.user_answers_detail;
    } 
    
    // KASUS B: Data Baru Selesai (Fresh Result)
    // Kita gunakan questions_snapshot yang baru kita buat di showResult
    else if (data.answers && (data.questions_snapshot || currentTest)) {
        
        // Prioritaskan snapshot yang tersimpan di data, kalau tidak ada baru cari currentTest
        const questionsSource = data.questions_snapshot || currentTest.questions;

        detailData = data.answers.map(ans => {
            // Cari teks soal asli dari source
            const originalQ = questionsSource.find(q => q.id == ans.id && q.section == ans.section);
            
            return {
                id: ans.id,
                section: ans.section,
                answer: ans.answer, // Jawaban User
                correct_answer: originalQ ? (Number(originalQ.keyid) + 1) : 0, // Kunci
                question_text: originalQ ? originalQ.text : "Soal tidak ditemukan (Data Error)",
                question_image: originalQ ? originalQ.image : "",
                question_audio: originalQ ? originalQ.sound : "",
                answer_options: originalQ && originalQ.answers ? originalQ.answers.map(a => a.text) : []
            };
        });
    } else {
        console.error("Debug Data:", data); // Cek console jika masih error
        alert("Gagal memuat detail soal. Data soal asli tidak ditemukan.");
        return;
    }

    // 3. Persiapkan Objek untuk Render
    const fullHistoryObject = {
        test_name: data.test_name,
        total_score: data.total_score,
        is_passed: data.is_passed,
        created_at: data.timestamp || new Date(),
        user_answers_detail: detailData
    };

    // 4. Set Global Variable & Render
    window.currentHistoryData = detailData;

    // Bersihkan Layar
    const mainContent = document.getElementById('main-content');
    if(document.getElementById('home-section')) document.getElementById('home-section').style.display = 'none';
    if(document.getElementById('feature-section')) document.getElementById('feature-section').style.display = 'none';
    
    mainContent.style.display = 'block';
    mainContent.innerHTML = ""; 
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Panggil fungsi render Admin-Style
    renderHistoryReview(fullHistoryObject);
};

// 2. Fungsi Render Halaman Review
const renderReviewPage = (sectionIndex) => {
    const targetContainer = document.getElementById('main-content');
    if (!targetContainer) return;

    // Filter soal berdasarkan section (Pastikan tipe data cocok)
    // Menggunakan currentTest.questions karena struktur data Anda memakai .questions
    let sectionQuestions = currentTest.questions.filter(q => q.section == sectionIndex);
    
    // Tentukan Judul Section
    const titles = {
        1: "Script & Vocabulary",
        2: "Conversation & Expression",
        3: "Listening Comprehension",
        4: "Reading Comprehension"
    };
    let sectionTitle = titles[sectionIndex] || `Section ${sectionIndex}`;

    // --- RAKIT HTML ---
    let html = `
    <div class="container mt-4 animate__animated animate__fadeIn">
        <div class="d-flex justify-content-between align-items-center mb-4 sticky-top bg-white py-3 border-bottom" style="z-index: 90;">
            <h4 class="fw-bold text-primary m-0"><i class="fas fa-glasses me-2"></i> Review: ${sectionTitle}</h4>
            <button class="btn btn-danger btn-sm rounded-pill shadow-sm" onclick="showResult()">
                <i class="fas fa-times me-1"></i> Tutup
            </button>
        </div>
        
        <div class="row">
            <div class="col-lg-9">
    `;

    if(sectionQuestions.length === 0) {
        html += `<div class="alert alert-warning">Data soal tidak ditemukan. Coba reload halaman.</div>`;
    }

    sectionQuestions.forEach((q) => {
        // Cari jawaban user untuk soal ini
        const userAnsObj = userAnswers.find(a => a.id == q.id && a.section == q.section);
        const userVal = userAnsObj ? Number(userAnsObj.answer) : 0; // 0 = Kosong
        
        // Kunci Jawaban (Logika: keyid 0 = Opsi 1)
        const correctVal = Number(q.keyid) + 1;
        
        // Tentukan Styling Kartu
        let statusBadge, cardClass;
        if (userVal === correctVal) {
            statusBadge = '<span class="badge bg-success"><i class="fas fa-check me-1"></i>Benar</span>';
            cardClass = 'border-success';
        } else if (userVal === 0) {
            statusBadge = '<span class="badge bg-secondary"><i class="fas fa-minus me-1"></i>Kosong</span>';
            cardClass = 'border-warning';
        } else {
            statusBadge = '<span class="badge bg-danger"><i class="fas fa-times me-1"></i>Salah</span>';
            cardClass = 'border-danger';
        }

        html += `
        <div class="card shadow-sm mb-4 ${cardClass} border-2">
            <div class="card-header bg-transparent d-flex justify-content-between align-items-center">
                <span class="fw-bold text-muted">No. ${q.id}</span>
                ${statusBadge}
            </div>
            <div class="card-body">
                ${q.image ? `<div class="text-center mb-3"><img src="../assets/images/${q.image}" class="img-fluid rounded border" style="max-height: 250px;"></div>` : ''}
                
                ${q.sound ? `
                <div class="mb-3 p-2 bg-light rounded border text-center">
                    <audio controls class="w-100" controlsList="nodownload">
                        <source src="../assets/sounds/${q.sound}" type="audio/mpeg">
                        <source src="../assets/sounds/${q.sound}" type="audio/ogg">
                    </audio>
                </div>` : ''}
                
                <p class="card-text fs-5 mb-3 fw-normal">${q.text}</p>
                
                <div class="list-group list-group-flush rounded-3 border">
        `;

        // Render Pilihan Jawaban
        q.answers.forEach((ans, idx) => {
            const optVal = idx + 1;
            let itemClass = "list-group-item list-group-item-action";
            let icon = "";

            if (optVal === correctVal) {
                // INI KUNCI JAWABAN (Selalu Hijau)
                itemClass += " list-group-item-success fw-bold";
                icon = '<i class="fas fa-check-circle float-end text-success fs-5"></i>';
            } else if (optVal === userVal && userVal !== correctVal) {
                // INI JAWABAN USER YANG SALAH (Merah)
                itemClass += " list-group-item-danger text-decoration-line-through opacity-75";
                icon = '<i class="fas fa-times-circle float-end text-danger fs-5"></i>';
            } else if (optVal === userVal) {
                 // JAWABAN USER BENAR (Logic ini jarang kena karena if pertama menangkapnya, tapi untuk aman)
                 itemClass += " list-group-item-success fw-bold";
            }

            html += `
                <div class="${itemClass}" style="pointer-events: none;">
                    <span class="me-2 fw-bold text-muted">${optVal}.</span> ${ans.text} ${icon}
                </div>`;
        });

        html += `   </div> 
            </div>
        </div>`;
    });

    html += `</div>`; // Tutup Kolom Kiri

    // KOLOM KANAN: NAVIGASI & KONTROL
    html += `
        <div class="col-lg-3">
            <div class="card shadow border-0 rounded-4 sticky-top" style="top: 100px;">
                <div class="card-body">
                    <h6 class="fw-bold mb-3 text-center">Navigasi Sesi</h6>
                    <div class="d-grid gap-2 mb-3">
    `;

    // Tombol Prev/Next Section
    if (sectionIndex > 1) {
        html += `<button class="btn btn-outline-secondary" onclick="changeReviewSection(${sectionIndex - 1})">
                    <i class="fas fa-arrow-left"></i> Sebelumnya
                 </button>`;
    }
    if (sectionIndex < 4) { 
        html += `<button class="btn btn-primary" onclick="changeReviewSection(${sectionIndex + 1})">
                    Selanjutnya <i class="fas fa-arrow-right"></i>
                 </button>`;
    } else {
        html += `<button class="btn btn-success" onclick="showResult()">
                    <i class="fas fa-check"></i> Selesai Review
                 </button>`;
    }

    html += `       </div>
                    <hr>
                    <div class="row g-1 justify-content-center" style="max-height: 400px; overflow-y: auto;">`;

    // Mini Grid Navigasi
    currentTest.questions.forEach(qItem => {
         const uAns = userAnswers.find(a => a.id == qItem.id && a.section == qItem.section);
         let gridClass = 'bg-secondary'; // Default Abu
         const correctVal = Number(qItem.keyid) + 1;
         
         if (uAns && uAns.answer != 0) {
             gridClass = (Number(uAns.answer) === correctVal) ? 'bg-success' : 'bg-danger';
         }

         // Highlight current section
         let opacity = (qItem.section == sectionIndex) ? 'opacity-100 border border-dark border-2' : 'opacity-25';

         html += `
            <div class="col-3">
                <div class="p-1 text-center text-white rounded ${gridClass} ${opacity}" 
                     style="font-size: 0.7rem; cursor: default;">
                    ${qItem.id}
                </div>
            </div>`;
    });

    html += `       </div>
                </div>
            </div>
        </div> 
    </div></div>`; // Tutup Container

    targetContainer.innerHTML = html;
};

// 3. Helper Ganti Section
const changeReviewSection = (newSection) => {
    reviewSectionIndex = newSection;
    renderReviewPage(newSection);
};


const renderHistoryReview = (historyData) => {
    const container = document.getElementById('main-content');
    
    // Format Tanggal
    const dateStr = historyData.created_at ? new Date(historyData.created_at).toLocaleString('id-ID') : '-';
    
    // Status Lulus/Gagal
    const statusBadge = historyData.is_passed 
        ? '<span class="badge bg-success fs-6"><i class="fas fa-check-circle me-1"></i> LULUS</span>' 
        : '<span class="badge bg-danger fs-6"><i class="fas fa-times-circle me-1"></i> TIDAK LULUS</span>';

    // HTML Kerangka Utama
    let html = `
    <div class="container mt-4 animate__animated animate__fadeIn pb-5">
        <div class="card border-0 shadow-sm rounded-4 mb-4 bg-white overflow-hidden">
            <div class="card-header bg-primary bg-gradient text-white p-3 d-flex justify-content-between align-items-center">
                <span class="fw-bold"><i class="fas fa-file-alt me-2"></i>Lembar Hasil Ujian</span>
                
            </div>
            <div class="card-body p-4 text-center">
                <h3 class="fw-bold text-dark mb-1">${historyData.test_name}</h3>
                <p class="text-muted small mb-4"><i class="fas fa-calendar-alt me-1"></i> ${dateStr}</p>
                
                <div class="row justify-content-center g-3">
                    <div class="col-auto px-4 border-end">
                        <small class="text-muted d-block fw-bold ls-1">TOTAL SKOR</small>
                        <span class="display-6 fw-bold text-primary">${historyData.total_score}</span>
                    </div>
                    <div class="col-auto px-4">
                        <small class="text-muted d-block fw-bold ls-1">STATUS</small>
                        <div class="mt-2">${statusBadge}</div>
                    </div>
                </div>
            </div>
        </div>

        <div class="card shadow-sm border-0 rounded-4 mb-4">
            <div class="card-body p-2">
                <div class="d-flex flex-wrap justify-content-center gap-2">
                    <button class="btn btn-primary rounded-pill flex-grow-1 fw-bold" id="hist-btn-1" onclick="filterHistorySection(1)">
                        Section 1 (Vocab)
                    </button>
                    <button class="btn btn-outline-primary rounded-pill flex-grow-1 fw-bold" id="hist-btn-2" onclick="filterHistorySection(2)">
                        Section 2 (Conv)
                    </button>
                    <button class="btn btn-outline-primary rounded-pill flex-grow-1 fw-bold" id="hist-btn-3" onclick="filterHistorySection(3)">
                        Section 3 (Listen)
                    </button>
                    <button class="btn btn-outline-primary rounded-pill flex-grow-1 fw-bold" id="hist-btn-4" onclick="filterHistorySection(4)">
                        Section 4 (Read)
                    </button>
                </div>
            </div>
        </div>

        <div id="history-questions-container" class="row g-4">
            </div>
        
        <div class="d-grid gap-2 mt-5">
            <button class="btn btn-outline-secondary rounded-pill py-3" onclick="showResultHistory()">
                 <i class="fas fa-arrow-left me-2"></i> Kembali ke Daftar Riwayat
            </button>
        </div>
    </div>`;

    container.innerHTML = html;

    // Load default Section 1 saat pertama dibuka
    filterHistorySection(1);
};

// Helper untuk menampilkan soal per section
window.filterHistorySection = (sectionId) => {
    const container = document.getElementById('history-questions-container');
    if (!window.currentHistoryData) return;

    // 1. Update Tampilan Tombol Tab (Active State)
    for(let i=1; i<=4; i++){
        const btn = document.getElementById(`hist-btn-${i}`);
        if(btn){
            if(i === sectionId) {
                btn.classList.remove('btn-outline-primary');
                btn.classList.add('btn-primary');
            } else {
                btn.classList.remove('btn-primary');
                btn.classList.add('btn-outline-primary');
            }
        }
    }

    // 2. Filter Data sesuai Section
    const filteredQuestions = window.currentHistoryData.filter(item => item.section == sectionId);
    
    // Jika kosong
    if (filteredQuestions.length === 0) {
        container.innerHTML = `
        <div class="col-12 text-center py-5">
            <div class="text-muted opacity-25 mb-3"><i class="fas fa-folder-open fa-4x"></i></div>
            <h5 class="text-muted">Tidak ada soal di section ini.</h5>
        </div>`;
        return;
    }

    // 3. Render Kartu Soal (Looping)
    let html = '';
    
    filteredQuestions.forEach((q) => {
        // --- LOGIKA STATUS JAWABAN (Sama persis dengan Admin) ---
        // q.answer = jawaban user, q.correct_answer = kunci
        const isCorrect = Number(q.answer) === Number(q.correct_answer);
        const isSkipped = Number(q.answer) === 0;

        // Tentukan Warna Border & Header Card
        let cardBorderClass = isCorrect ? 'border-success' : (isSkipped ? 'border-warning' : 'border-danger');
        let headerBgClass   = isCorrect ? 'bg-success bg-opacity-10 text-success' : (isSkipped ? 'bg-warning bg-opacity-10 text-dark' : 'bg-danger bg-opacity-10 text-danger');
        
        // Badge Status
        let badgeStatus = isCorrect 
            ? '<span class="badge bg-success rounded-pill"><i class="fas fa-check me-1"></i> Benar</span>' 
            : (isSkipped ? '<span class="badge bg-warning text-dark rounded-pill">Kosong</span>' : '<span class="badge bg-danger rounded-pill"><i class="fas fa-times me-1"></i> Salah</span>');

        // --- RENDER OPSI JAWABAN (List Group) ---
        let optionsHtml = '<div class="list-group list-group-flush rounded-3 mt-3 border">';
        
        if (q.answer_options && q.answer_options.length > 0) {
            q.answer_options.forEach((optText, idx) => {
                const val = idx + 1;
                let itemClass = "list-group-item bg-transparent border-0 border-bottom";
                let icon = "";

                // Logic Highlight Pilihan:
                
                // 1. Ini KUNCI JAWABAN (Selalu tampil Hijau)
                if (val === Number(q.correct_answer)) {
                    itemClass += " list-group-item-success fw-bold";
                    icon = '<i class="fas fa-check-circle float-end fs-5 text-success"></i>';
                }
                
                // 2. Ini JAWABAN USER (Jika Salah -> Merah)
                else if (val === Number(q.answer) && !isCorrect) {
                    itemClass += " list-group-item-danger text-decoration-line-through text-muted";
                    icon = '<i class="fas fa-times-circle float-end fs-5 text-danger"></i>';
                }
                
                // 3. Pilihan Biasa
                else {
                    itemClass += " text-dark";
                }

                optionsHtml += `<div class="${itemClass} py-2 px-3">${optText} ${icon}</div>`;
            });
        } else {
            // Fallback (Jaga-jaga data lama sekali)
            optionsHtml += `
                <div class="list-group-item list-group-item-danger">Jawaban Kamu: <strong>${q.answer}</strong></div>
                <div class="list-group-item list-group-item-success">Kunci Jawaban: <strong>${q.correct_answer}</strong></div>
            `;
        }
        optionsHtml += '</div>';

        // --- RAKIT KESELURUHAN KARTU ---
        html += `
        <div class="col-lg-10 mx-auto">
            <div class="card ${cardBorderClass} shadow-sm border-2 rounded-4 h-100">
                <div class="card-header ${headerBgClass} d-flex justify-content-between align-items-center py-2 px-3 bg-transparent border-bottom">
                    <span class="fw-bold">No. ${q.id}</span>
                    ${badgeStatus}
                </div>
                
                <div class="card-body p-4">
                    ${q.question_image ? `
                    <div class="text-center mb-4">
                        <img src="../assets/images/${q.question_image}" class="img-fluid rounded border shadow-sm" style="max-height:250px; width: auto;">
                    </div>` : ''}
                    
                    ${q.question_audio ? `
                    <div class="mb-4 p-3 bg-light rounded-pill border text-center">
                        <audio controls controlsList="nodownload" src="../assets/sounds/${q.question_audio}" class="w-100"></audio>
                    </div>` : ''}
                    
                    <h5 class="card-title lh-base mb-3 fw-normal text-dark">${q.question_text}</h5>
                    
                    ${optionsHtml}
                    
                    <div class="mt-2 text-end">
                        <small class="text-muted fst-italic">Section ${q.section} - Question ${q.id}</small>
                    </div>
                </div>
            </div>
        </div>`;
    });

    container.innerHTML = html;
};

