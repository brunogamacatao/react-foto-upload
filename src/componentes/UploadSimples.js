import React from 'react';
import FileUploadProgress  from 'react-fileupload-progress';

function UploadSimples() {
  return (
    <div>
      <h3>Upload Simples</h3>
      <FileUploadProgress key='ex1' 
        url='http://localhost:5000/upload_foto'
        method='post'
        onProgress={(e, request, progress) => {console.log('progress', e, request, progress);}}
        onLoad={ (e, request) => {console.log('load', e, request);}}
        onError={ (e, request) => {console.log('error', e, request);}}
        onAbort={ (e, request) => {console.log('abort', e, request);}}
        />
    </div>
  );
}

export default UploadSimples;
