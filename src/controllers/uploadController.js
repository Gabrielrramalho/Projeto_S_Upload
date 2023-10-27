const Documento = require('../models/documento');
const fs = require('fs');
const pdf = require('pdf-parse');
const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Diretório de destino
  },
  filename: function (req, file, cb) {
    const cpf = req.body.cpf; // Supondo que o CPF seja obtido do corpo da requisição
    const extname = path.extname(file.originalname); // Obtenha a extensão do arquivo original
    const nomeArquivo = `${cpf}${extname}`; // Nome do arquivo como o CPF
    cb(null, nomeArquivo);
  },
});
const upload = multer({ storage });



function uploadView(req, res) {
  res.render('upload.html', {});
}

async function enviarArquivo(req, res) {
  if (!req.file) {
    return res.status(400).send('Nenhum arquivo foi enviado.');
  }

  const arquivo = req.file;

  try {
    // Ler o arquivo PDF e convertê-lo para binário
    const pdfBuffer = fs.readFileSync(arquivo.path);

    // Agora 'pdfBuffer' contém o arquivo PDF em formato binário

    // Converter hexadecimal para binário
    const arquivoBinario = Buffer.from(pdfBuffer);
    console.log("binarioooo" + arquivoBinario)
    await Documento.create({ arquivo: pdfBuffer });

    pdf(arquivoBinario).then(data => {
      // Se os dados forem legíveis como um PDF válido, 'data' conterá o conteúdo do PDF
      console.log('Arquivo PDF válido:', data);
    }).catch(error => {
      // Se ocorrer um erro, isso significa que os dados não são um PDF válido
      console.error('Não é um arquivo PDF válido:', error);
    });

    res.status(200).send('Arquivo salvo no banco de dados com sucesso.');
  } catch (error) {
    console.error('Erro ao salvar no banco de dados:', error);
    res.status(500).send('Erro ao salvar no banco de dados.');
  }
}

async function enviarArquivo2(req, res) {
  // Use o middleware de upload aqui
  upload.single('arquivoU')(req, res, function (err) {
    if (err) {
      return res.status(500).send('Erro ao fazer upload do arquivo: ' + err);
    }

    res.status(200).send('Arquivo enviado com sucesso!');
  });
}




function abrirArquivo(req, res) {
  const caminhoDoArquivo = path.join('uploads/1.pdf');
  fs.readFile(caminhoDoArquivo, (error, data) => {
    if (error) {
      console.error('Erro ao abrir o arquivo:', error);
      res.status(500).send('Erro ao abrir o arquivo.');
    } else {
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename="seuarquivo.pdf"');
      res.end(data);
    }
  });
}





module.exports = {
  uploadView,
  enviarArquivo,
  abrirArquivo,
  enviarArquivo2
};
