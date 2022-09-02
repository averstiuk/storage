import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import ASN1 from '@lapo/asn1js';
import Base64 from '@lapo/asn1js/base64';

import { Certificate } from '../../types/Certificate';
import './Dropzone.css';

type Props = {
  addCertificate: (certificate: Certificate) => void;
}

export const Dropzone: React.FC<Props>  = ({ addCertificate }) => {
  const onDrop = useCallback((acceptedFiles) => {
    const parseData = (base64String: string) => {
      const decoded = Base64.unarmor(base64String);
      const root = ASN1.decode(decoded, 0);
    
      return addCertificate({
        commonName: root.sub[0].sub[5].sub[1].sub[0].sub[1].content(),
        issuer: root.sub[0].sub[3].sub[2].sub[0].sub[1].content(),
        validFrom: (root.sub[0].sub[4].sub[0].content()).split(' ')[0],
        validTill: (root.sub[0].sub[4].sub[1].content()).split(' ')[0],
        id: Math.random().toString(16).substring(2,9),
      });
    };

    acceptedFiles.forEach((file) => {
      const reader = new FileReader()

      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = () => {
        const binaryStr = reader.result.toString().split(",")[1];
        console.log(parseData(binaryStr));
      }
      reader.readAsDataURL(file)
    })
  }, [addCertificate])
  
  const {getRootProps, getInputProps} = useDropzone({
    onDrop,
    multiple: undefined,
    onDragEnter: undefined,
    onDragOver: undefined,
    onDragLeave: undefined,
    noClick: true
  })

  return (
    <div {...getRootProps()} className="dropzone">
      <input {...getInputProps()} type="file" />
      <p className="dropzone__content">Перетягніть файл сертифіката у поле</p>
    </div>
  )
}