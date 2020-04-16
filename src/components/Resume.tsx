import React, { useRef, useState, useLayoutEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

// https://github.com/wojtekmaj/react-pdf/issues/332#issuecomment-458121654
function removeTextLayerOffset() {
  const textLayers = document.querySelectorAll('.react-pdf__Page__textContent');
  textLayers.forEach(layer => {
    if (layer instanceof HTMLElement) {
      const { style } = layer;
      style.top = '0';
      style.left = '0';
      style.transform = '';
    }
  });
}

interface ResumeProps {
  path: string;
}

const Resume: React.FC<ResumeProps> = ({ path }) => {
  const [width, setWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const resetDimensions = () => {
    setWidth(containerRef.current?.clientWidth ?? 0);
  };

  useLayoutEffect(() => {
    resetDimensions();
    window.addEventListener('resize', resetDimensions);
    return () => {
      window.removeEventListener('resize', resetDimensions);
    };
  }, []);

  return (
    <div ref={containerRef} style={{ maxWidth: '100%' }}>
      <Document file={path} renderMode="svg">
        <Page pageNumber={1} width={width} renderMode="svg" onLoadSuccess={removeTextLayerOffset} />
      </Document>
    </div>
  );
};

export default Resume;
