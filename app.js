const nome = document.getElementById('nome');
const inputNome = document.querySelector('#inputNome');

const recompensa = document.getElementById('recompensa');
const inputRec = document.querySelector('#inputRec');

const foto = document.getElementById('foto');
const inputFile = document.querySelector('#inputFile');

inputNome.addEventListener('keyup', innerNome);
inputRec.addEventListener('keyup', innerRec);

function innerNome() {
    let n = inputNome.value

    nome.innerHTML = n;

    if (n == ""){
        nome.innerHTML = ".";
    } else {
        nome.innerHTML = n.toUpperCase();
    }
}

function innerRec() {
    let r = inputRec.value

    if (r == ""){
        recompensa.innerHTML = ".";
    } else {
        recompensa.innerHTML = r;
    }
}

inputFile.addEventListener('change', function(evt) {
    if (!(evt.target && evt.target.files && evt.target.files.length > 0)) {
      return;
    }

    // Inicia o file-reader:
    var arquivo = new FileReader();
    // Define o que ocorre quando concluir:
    arquivo.onload = function() {
       // Define o `src` do elemento para o resultado:
       foto.src = arquivo.result;
    }
    // Lê o arquivo e cria um link (o resultado vai ser enviado para o onload.
    arquivo.readAsDataURL(evt.target.files[0]);
})

var contador = 0
const myInterval = setInterval(impressão, 500);

function impressão() {
    contador += 1
    var img = document.getElementsByTagName('canvas')
    var imgData = img[0].toDataURL("image/jpeg");
    var doc = new jsPDF()
    var width = doc.internal.pageSize.getWidth();
    var height = doc.internal.pageSize.getHeight();

    doc.addImage(imgData, 'JPEG', 0, 0, width, height)

    doc.save('wantedPoster.pdf')

    if (contador > 0){
        clearInterval(myInterval)
        screenshot = document.getElementById('screenshot').removeChild(screenshot.firstChild)
    }
}

function gerarPdf(){
    var content = document.getElementById('poster')
        , screenshot = document.getElementById('screenshot');
    
    html2canvas(content, {
        onrendered: function(canvas) {
            screenshot.appendChild(canvas);
        }
    });

    return myInterval
}