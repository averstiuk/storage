import { useState } from 'react';

import { CertificateInfo } from './components/CertificateInfo/CertificateInfo';
import { Dropzone } from './components/Dropzone/Dropzone';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Certificate } from './types/Certificate';
import './styles/App.css';

function App() {
  const [certificates, setCertificates] = useLocalStorage('certificate', []);
  const [showDropZone, setShowDropzone] = useState(false);
  const [currCertificate, setCurrCertificate] = useState<Certificate | undefined>(undefined);
  
  const addCertificate = (certificate: Certificate) => {
    setCertificates((prevCertificates:Certificate[]) => {
      return [...prevCertificates, certificate];
    });
    setShowDropzone(false);
  };

  const handleCgangeInfoButton = (certifacateId: string) => {
    setCurrCertificate(certificates.find(c => c.id === certifacateId));
  }

  const handleChangeAddButton = () => {
    setShowDropzone((prevState: boolean) => {
      return !prevState;
    });
    setCurrCertificate(undefined);
  }

  const handleChangeCancelButton = () => {
    setShowDropzone((prevState: boolean) => {
      return !prevState;
    });
  }

  return (
    <div className="container">
      <div className='list'>
        <ul>
          {certificates.map((certificate: Certificate) => (
            <li className='container' key={certificate.id}>
              <button 
                className="button is-fullwidth"
                onClick={() => handleCgangeInfoButton(certificate.id)}
                disabled={showDropZone}
              >
                {certificate.commonName}
              </button>
            </li>
          ))}
        </ul>
        
        {showDropZone 
          ?<button className="button is-light" onClick={handleChangeCancelButton}>Скасувати</button>
          :<button className="button is-light" onClick={handleChangeAddButton}>Додати</button>
        }
      </div>

      <div>
        {!showDropZone
          ? <CertificateInfo certificate={currCertificate} />
          : <Dropzone addCertificate={addCertificate} />
        }
      </div>
    </div>
  );
}

export default App;
