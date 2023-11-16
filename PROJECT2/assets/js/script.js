document.addEventListener("DOMContentLoaded", function() {
    const fileInput = document.getElementById("fileInput");
    const imageFormat = document.getElementById("imageFormat");
    const imageWidth = document.getElementById("imageWidth");
    const imageHeight = document.getElementById("imageHeight");
    const imageQuality = document.getElementById("imageQuality");
    const convertButton = document.getElementById("convertButton");
    const resetButton = document.getElementById("resetButton");
    const downloadLink = document.getElementById("downloadLink");
    const preview = document.getElementById("preview");

    fileInput.addEventListener("change", function() {
        const selectedFile = fileInput.files[0];
        if (selectedFile) {
            const reader = new FileReader();
            reader.onload = function(e) {
                preview.src = e.target.result;
                preview.style.display = "block";
            };
            reader.readAsDataURL(selectedFile);
        } else {
            preview.src = "";
            preview.style.display = "none";
        }
    });

    convertButton.addEventListener("click", function() {
        const selectedFormat = imageFormat.value;
        const newWidth = parseInt(imageWidth.value);
        const newHeight = parseInt(imageHeight.value);
        const quality = parseInt(imageQuality.value);

        if (!fileInput.files[0]) {
            alert("Pilih berkas gambar terlebih dahulu.");
            return;
        }

        if (!selectedFormat || !newWidth || !newHeight || !quality) {
            alert("Harap isi semua input yang diperlukan.");
            return;
        }

        const file = fileInput.files[0];
        const reader = new FileReader();

        reader.onload = function(e) {
            if (selectedFormat === "pdf") {
                const img = new Image();
                img.src = e.target.result;

                img.onload = function() {
                    const pdf = new jsPDF();
                    pdf.addImage(e.target.result, "JPEG", 10, 10, newWidth, newHeight);

                    const pdfDataUri = pdf.output("datauristring");
                    downloadLink.href = pdfDataUri;
                    downloadLink.style.display = "block";
                };
            } else {
                const imgDataUri = e.target.result;
                const img = new Image();
                img.src = imgDataUri;

                img.onload = function() {
                    const canvas = document.createElement("canvas");
                    canvas.width = newWidth;
                    canvas.height = newHeight;
                    const ctx = canvas.getContext("2d");
                    ctx.drawImage(img, 0, 0, newWidth, newHeight);

                    const imageDataURL = canvas.toDataURL(`image/${selectedFormat}`, quality / 100);
                    downloadLink.href = imageDataURL;
                    downloadLink.style.display = "block";
                };
            }
        };

        reader.readAsDataURL(file);
    });

    resetButton.addEventListener("click", function() {
        fileInput.value = "";
        imageFormat.value = "";
        imageWidth.value = "";
        imageHeight.value = "";
        imageQuality.value = "";
        preview.src = "";
        preview.style.display = "none";
        downloadLink.style.display = "none";
    });
});
