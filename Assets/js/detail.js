
// JavaScript untuk scroll pada deskripsi konten saja
document.addEventListener('DOMContentLoaded', function() {
    // Ambil semua link di sidebar
    const sidebarLinks = document.querySelectorAll('.sidebar a');
    const deskripsiKonten = document.querySelector('.deskripsi-konten');
    
    // Set tinggi maksimal untuk deskripsi-konten agar bisa scroll
    deskripsiKonten.style.height = '600px';
    deskripsiKonten.style.overflowY = 'auto';
    
    // Tambahkan event listener untuk setiap link
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Mencegah default behavior
            
            // Ambil target ID dari href
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                // Hitung posisi scroll yang dibutuhkan
                const offsetTop = targetElement.offsetTop - deskripsiKonten.offsetTop;
                
                // Scroll hanya pada deskripsi-konten dengan smooth behavior
                deskripsiKonten.scrollTo({
                    top: offsetTop - 20, // 20px padding dari atas
                    behavior: 'smooth'
                });
                
                // Tambahkan efek highlight sementara
                targetElement.style.transition = 'background-color 0.3s ease';
                targetElement.style.backgroundColor = 'rgba(218, 255, 188, 0.1)';
                
                // Hapus highlight setelah 2 detik
                setTimeout(() => {
                    targetElement.style.backgroundColor = 'transparent';
                }, 2000);
            }
        });
    });
    
    // Tambahkan active state untuk sidebar links
    const sections = document.querySelectorAll('.deskripsi-konten > div[id]');
    
    deskripsiKonten.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (deskripsiKonten.scrollTop >= sectionTop - 50) {
                current = section.getAttribute('id');
            }
        });
        
        // Update active link
        sidebarLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
});