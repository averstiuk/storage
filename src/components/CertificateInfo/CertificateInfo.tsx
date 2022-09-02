import React from 'react';

import { Certificate } from "../../types/Certificate";
import './CertificateInfo.css';

type Props = {
  certificate: Certificate;
}

export const CertificateInfo: React.FC<Props> = ({ certificate }) => {
  return (
    <div className="infobox">
      {certificate
      ? (
        <>
          <p>Common Name: {certificate.commonName}</p>
          <p>Issuer CN: {certificate.issuer}</p>
          <p>Valid From: {certificate.validFrom}</p>
          <p>Valid Till: {certificate.validTill}</p>
        </>
      )
      : (
         <p className="infobox__content">Оберіть сертифікат, щоб переглянути інформацію</p>
      )
    }
  </div>
  );
}