// Fungsi singkat untuk memilih elemen
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

/* ===== 1. MENU HAMBURGER (HP) ===== */
$('#fitriani_burger').onclick = () => {
  $('#fitriani_menu').classList.toggle('fitriani_buka');
};

/* ===== 2. TOMBOL KEMBALI KE ATAS ===== */
const tombolAtas = $('#fitriani_top');

window.onscroll = () => {
  // Tampil hanya jika halaman sudah di-scroll lebih dari 300px
  tombolAtas.style.display = scrollY > 300 ? 'block' : 'none';
};

tombolAtas.onclick = () => {
  scrollTo({ top: 0, behavior: 'smooth' });
};

/* ===== 3. FILTER PRODUK ===== */
$$('.fitriani_fbtn').forEach((tombol) => {
  tombol.onclick = () => {
    // Pindahkan tanda tombol aktif
    $$('.fitriani_fbtn').forEach((t) => t.classList.remove('fitriani_aktif'));
    tombol.classList.add('fitriani_aktif');

    // Tampilkan produk yang kategorinya cocok, sembunyikan sisanya
    $$('.fitriani_produk').forEach((produk) => {
      const cocok =
        tombol.dataset.kat === 'semua' ||
        produk.dataset.kat === tombol.dataset.kat;
      produk.style.display = cocok ? 'block' : 'none';
    });
  };
});

/* ===== 4. LIGHTBOX GALERI ===== */
const lightbox = $('#fitriani_lightbox');
const lightboxGambar = $('#fitriani_lightbox_img');

if (lightbox) {
  $$('.fitriani_gitem').forEach((item) => {
    item.onclick = () => {
      const gambar = item.querySelector('img');   // ambil foto yang diklik
      lightboxGambar.src = gambar.src;            // tampilkan di layar besar
      lightboxGambar.alt = gambar.alt;
      lightbox.classList.add('fitriani_buka');
    };
  });

  // Klik di mana saja untuk menutup
  lightbox.onclick = () => lightbox.classList.remove('fitriani_buka');

  // Tekan tombol Esc untuk menutup
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') lightbox.classList.remove('fitriani_buka');
  });
}
/* ===== 5. ACCORDION FAQ ===== */
$$('.fitriani_faq_t').forEach((judul) => {
  judul.onclick = () => {
    judul.nextElementSibling.classList.toggle('fitriani_buka');
  };
});
/* ===== 6. VALIDASI FORM KONTAK ===== */
const form = $('#fitriani_form');

if (form) {
  form.onsubmit = (e) => {
    e.preventDefault();   // cegah halaman reload
    let valid = true;

    // Cek satu kolom: kalau salah, tampilkan pesan error di bawahnya
    const cek = (id, apakahSalah, pesanError) => {
      const kolom = $('#' + id);
      const isi = kolom.value.trim();
      const salah = apakahSalah(isi);

      kolom.nextElementSibling.textContent = salah ? pesanError : '';
      if (salah) valid = false;
    };

    cek('fitriani_nama', (v) => v.length < 3, 'Nama minimal 3 karakter.');
    cek('fitriani_email', (v) => !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), 'Format email belum benar.');
    cek('fitriani_subjek', (v) => !v, 'Subjek wajib diisi.');
    cek('fitriani_pesan', (v) => v.length < 10, 'Pesan minimal 10 karakter.');

    // Jika semua benar, tampilkan pesan sukses dan kosongkan form
    if (valid) {
      $('#fitriani_sukses').style.display = 'block';
      form.reset();
    }
  };
}