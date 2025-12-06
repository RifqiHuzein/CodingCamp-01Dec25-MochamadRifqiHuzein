document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Navbar Toggle untuk Mobile ---
    const mobileMenu = document.getElementById('mobile-menu');
    const navbar = document.querySelector('.navbar');

    if (mobileMenu && navbar) {
        mobileMenu.addEventListener('click', () => {
            navbar.classList.toggle('active');
            mobileMenu.classList.toggle('open');
        });
    }

    // --- 2. Welcoming Speech Dinamis (Menggunakan Session Storage) ---
    const welcomeMessage = document.getElementById('welcome-message');
    
    if (welcomeMessage) {
        // Ambil nama dari Session Storage (hanya bertahan selama sesi browser dibuka)
        let userName = sessionStorage.getItem('userName'); 
        
        // Tampilkan prompt jika belum ada nama di sesi ini
        if (!userName) {
            userName = prompt("Welcome! What's your name?", "Guest");
            if (userName) {
                // Bersihkan input dan simpan
                userName = userName.trim() || "Guest";
                sessionStorage.setItem('userName', userName);
            } else {
                userName = "Guest"; // Default jika user membatalkan
            }
        }
        
        // Tampilkan ucapan selamat datang dengan transisi
        setTimeout(() => {
            welcomeMessage.textContent = `Hi ${userName}, Welcome To My Portfolio`;
            welcomeMessage.style.opacity = '1'; 
        }, 100); 
    }

    // --- 3. Validasi Form & Tampilkan Value dengan Transisi Halus ---
    const messageForm = document.getElementById('message-form');
    const resultBox = document.getElementById('result-box');

    if (messageForm && resultBox) {
        messageForm.addEventListener('submit', function(event) {
            event.preventDefault();

            // Dapatkan nilai input
            const name = document.getElementById('name').value.trim();
            const birthdate = document.getElementById('birthdate').value;
            const message = document.getElementById('message').value.trim();
            const genderElement = document.querySelector('input[name="gender"]:checked');
            
            // Validasi dasar
            if (!name || !birthdate || !message || !genderElement) {
                alert("Mohon lengkapi semua data pada formulir!");
                return;
            }

            const gender = genderElement.value;
            
            // Isi data ke Result Box
            document.getElementById('res-name').textContent = name;
            document.getElementById('res-birthdate').textContent = birthdate;
            document.getElementById('res-gender').textContent = gender;
            document.getElementById('res-message').textContent = message;
            
            // Waktu Submit
            const now = new Date();
            const timeOptions = { 
                hour: '2-digit', 
                minute: '2-digit', 
                second: '2-digit', 
                day: 'numeric', 
                month: 'short', 
                year: 'numeric'
            };
            document.getElementById('submit-time').textContent = now.toLocaleString('id-ID', timeOptions);

            // Tampilkan result box menggunakan kelas CSS (transisi halus)
            resultBox.classList.add('show');
            
            // Scroll ke result box setelah transisi sedikit
            setTimeout(() => {
                resultBox.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);

            // Opsional: Reset form dan sembunyikan box setelah 7 detik
            setTimeout(() => {
                messageForm.reset();
                // Sembunyikan result box kembali dengan transisi
                resultBox.classList.remove('show');
            }, 7000);
        });
    }

    // --- 4. Smooth Scrolling (Menerapkan JSS smooth transition) ---
    document.querySelectorAll('a[href*="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            const targetId = href.startsWith('#') ? href.substring(1) : href.split('#')[1];
            const targetElement = document.getElementById(targetId);

            // Cek apakah link adalah link internal di halaman yang sama (atau hanya #)
            if (targetElement && (this.pathname === window.location.pathname || !this.pathname)) {
                 e.preventDefault();
                 targetElement.scrollIntoView({
                    behavior: 'smooth' // JSS smooth transition
                 });
                 
                 // Tutup navbar mobile setelah klik
                 if (navbar && navbar.classList.contains('active')) {
                     navbar.classList.remove('active');
                     mobileMenu.classList.remove('open');
                 }
            }
        });
    });
});