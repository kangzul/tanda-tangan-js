var wrapper = document.getElementById("signature-pad");
var canvas = wrapper.querySelector("canvas");
var signaturePad = new SignaturePad(canvas);

function resizeCanvas() {
    var ratio = Math.max(window.devicePixelRatio || 1, 1);
    canvas.width = canvas.offsetWidth * ratio;
    canvas.height = canvas.offsetHeight * ratio;
    canvas.getContext("2d").scale(ratio, ratio);
    signaturePad.clear();
}

window.onresize = resizeCanvas;
resizeCanvas();

function download(dataURL, filename) {
    var blob = dataURLToBlob(dataURL);
    var url = window.URL.createObjectURL(blob);

    var a = document.createElement("a");
    a.style = "display: none";
    a.href = url;
    a.download = filename;

    document.body.appendChild(a);
    a.click();

    window.URL.revokeObjectURL(url);
}

function upload(dataURL) {
    $.ajax({
        url: 'upload.php',
        data: {
            uri_image: dataURL
        },
        type: 'post',
        dataType: 'json',
        success: function (result) {
            if (result.status) {
                alert('Berhasil Upload');
            } else {
                alert('Gagal Upload');
            }
            window.location.reload();
        },
        error: function (xhr, text, error) {
            console.log("error");
        }
    })
}

function dataURLToBlob(dataURL) {
    // Code taken from https://github.com/ebidel/filer.js
    var parts = dataURL.split(';base64,');
    var contentType = parts[0].split(":")[1];
    var raw = window.atob(parts[1]);
    var rawLength = raw.length;
    var uInt8Array = new Uint8Array(rawLength);

    for (var i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
    }

    return new Blob([uInt8Array], { type: contentType });
}

$('#hapus').click(function () {
    signaturePad.clear();
})

$('#simpan').click(function () {
    if (signaturePad.isEmpty()) {
        alert('Tanda tangan masih kosong !!!');
    } else {
        signaturePad.removeBlanks();
        var dataURL = signaturePad.toDataURL();
        download(dataURL, "Tanda-Tangan-JS.png");
        signaturePad.clear();
    }
})

$('#upload').click(function () {
    if (signaturePad.isEmpty()) {
        alert('Tanda tangan masih kosong !!!');
    } else {
        signaturePad.removeBlanks();
        var dataURL = signaturePad.toDataURL();
        upload(dataURL);
        signaturePad.clear();
    }
})

$('#reload').click(function () {
    window.location.reload();
})