import React, { useState } from 'react';

function UploadDrop() {
  const [status, setStatus] = useState('Solte o Arquivo Aqui');
  const [preview, setPreview] = useState(null);
  const [percentage, setPercentage] = useState(0);

  const fazNada = event => event.preventDefault();

  const onDragEnter = event => {
    console.log(event);
    setStatus('Arquivo detectado');
    event.preventDefault();
    event.stopPropagation();
  }

  const onDragLeave = event => {
    setStatus('Solte o arquivo aqui');
    event.preventDefault();
  }

  const onDragOver = event => {
    setStatus('Solte o arquivo');
    event.preventDefault();
  }

  const onDrop = event => {
    const supportedFilesTypes = ['image/jpeg', 'image/png'];
    const { type } = event.dataTransfer.files[0];

    if (supportedFilesTypes.indexOf(type) >= 0) {
      const reader = new FileReader();
      reader.onload = e => setPreview(e.target.result);
      reader.readAsDataURL(event.dataTransfer.files[0]);

      // Envia o arquivo para o backend
      
      // 1. cria os dados para o formulário
      const payload = new FormData();
      payload.append('file', event.dataTransfer.files[0]);

      // 2. cria um XHR request
      const xhr = new XMLHttpRequest();

      // 3. configura os eventos de progresso
      xhr.upload.onprogress = (e) => {
        const done  = e.position || e.loaded
        const total = e.totalSize || e.total;
        const perc  = (Math.floor(done/total*1000)/10);

        if (perc >= 100) {
          setStatus('Enviado');
        } else {
          setStatus(`${perc}%`);
        }

        setPercentage(perc); 
      };      

      // 4. executa o request
      xhr.open('POST', 'http://localhost:5000/upload_foto');
      xhr.send(payload);
    }

    event.preventDefault();
  }  

  return (
    <div className="DropContainer" 
      onDragEnter={onDragEnter} onDragLeave={onDragLeave} onDragOver={fazNada} onDrop={fazNada}>
      <div className={`ImagePreview ${preview ? 'Show' : ''}`}>
        <div style={{ backgroundImage: `url(${preview})` }}></div>
      </div>
      <div className={`DropArea ${status === 'Drop' ? 'Over' : ''}`} onDragOver={onDragOver} onDrop={onDrop} onDragLeave={onDragEnter}>
        <div className={`ImageProgress ${preview ? 'Show' : ''}`}>
          <div className="ImageProgressImage" style={{ backgroundImage: `url(${preview})` }}></div>
          <div className="ImageProgressUploaded" 
               style={{ backgroundImage: `url(${preview})`, 
                        clipPath: `inset(${100 - Number(percentage)}% 0 0 0)` }}>
          </div>
        </div>         
        <div className="Status">{status}</div>
      </div>
    </div>
  );
}

export default UploadDrop;