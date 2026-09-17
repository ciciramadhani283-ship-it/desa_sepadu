const API_URL = "https://script.google.com/macros/s/AKfycbwfNbTBmotksGISINYbLzSJ5I1PTSsXj1z1EDwdxUyJfGp7GZ8f606rJl0-YmlFv4mL/exec";

const formPengaduan = document.getElementById("formPengaduan");

if (formPengaduan) {

    formPengaduan.addEventListener("submit", async function(e) {

        e.preventDefault();

        const hasil = document.getElementById("hasilPengaduan");

        hasil.innerHTML = "⏳ Mengirim pengaduan...";

        const data = {
            action: "tambah",
            nama: document.getElementById("nama").value,
            kategori: document.getElementById("kategori").value,
            isi_pengaduan: document.getElementById("isi_pengaduan").value
        };

        try {

            const response = await fetch(API_URL, {
                method: "POST",
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (result.success) {

                hasil.innerHTML =
                    "✅ Pengaduan berhasil dikirim!";

                formPengaduan.reset();

            } else {

                hasil.innerHTML =
                    "❌ Pengaduan gagal dikirim.";

            }

        } catch (error) {

            console.error(error);

            hasil.innerHTML =
                "❌ Gagal terhubung ke Google Spreadsheet.";

        }

    });

}

document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("complaintForm");
    const message = document.getElementById("complaintMessage");

    if (form) {

        form.addEventListener("submit", function (e) {

            e.preventDefault();

            const nama =
                document.getElementById("nama").value.trim();

            const kategori =
                document.getElementById("kategori").value;

            const pengaduan =
                document.getElementById("pengaduanText").value.trim();


            if (
                nama === "" ||
                kategori === "" ||
                pengaduan === ""
            ) {

                message.textContent =
                    "⚠️ Silakan lengkapi semua data.";

                return;
            }


            const data = {

                id: Date.now(),

                nama: nama,

                kategori: kategori,

                pengaduan: pengaduan,

                tanggal: new Date().toLocaleString("id-ID"),

                status: "Baru"

            };


            let pengaduanList =
                JSON.parse(
                    localStorage.getItem("pengaduanDesa")
                ) || [];


            pengaduanList.push(data);


            localStorage.setItem(
                "pengaduanDesa",
                JSON.stringify(pengaduanList)
            );


            message.textContent =
                "✅ Pengaduan berhasil dikirim.";

            form.reset();

        });

    }

});

document.getElementById("formPengaduan")?.addEventListener("submit", async function(e) {

    e.preventDefault();

    const hasil = document.getElementById("hasil");

    hasil.innerText = "Mengirim pengaduan...";

    const data = {
        action: "tambah",
        nama: document.getElementById("nama").value,
        nik: document.getElementById("nik").value,
        no_hp: document.getElementById("no_hp").value,
        isi_pengaduan: document.getElementById("isi_pengaduan").value
    };

    try {

        const response = await fetch(API_URL, {
            method: "POST",
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (result.success) {

            hasil.innerText =
                "✅ Pengaduan berhasil dikirim!";

            document
                .getElementById("formPengaduan")
                .reset();

        } else {

            hasil.innerText =
                "❌ Pengaduan gagal dikirim.";

        }

    } catch (error) {

        console.error(error);

        hasil.innerText =
            "❌ Gagal terhubung ke database.";

    }

});