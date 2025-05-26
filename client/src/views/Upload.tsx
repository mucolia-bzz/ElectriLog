import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';

export const Upload: React.FC = () => {
  const eslInputRef = useRef<HTMLInputElement>(null);
  const xmlInputRef = useRef<HTMLInputElement>(null);

  const handleEslClick = () => eslInputRef.current?.click();
  const handleXmlClick = () => xmlInputRef.current?.click();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    // Add your upload logic here (e.g., send to API)
    console.log(`Uploading ${file.name}`);
  };

  return (
    <section className="bg-white rounded-lg shadow p-6 mt-6">
      <h2 className="text-2xl font-semibold mb-6">Daten hochladen</h2>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <input
            type="file"
            accept=".esl"
            ref={eslInputRef}
            className="hidden"
            onChange={handleFileChange}
          />
          <Button className="w-full" onClick={handleEslClick}>
            ESL-Datei hochladen
          </Button>
        </div>
        <div className="flex-1">
          <input
            type="file"
            accept=".xml"
            ref={xmlInputRef}
            className="hidden"
            onChange={handleFileChange}
          />
          <Button className="w-full" onClick={handleXmlClick}>
            XML-Datei hochladen
          </Button>
        </div>
      </div>
    </section>
  );
};
