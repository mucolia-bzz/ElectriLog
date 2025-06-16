// src/components/UploadSection.tsx
import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { useReadEsl, useReadSdat } from '@/api/hooks';
import type { Esl } from '@/models/esl';
import type { Sdat } from '@/models/sdat';

export const Upload: React.FC = () => {
  const eslInputRef = useRef<HTMLInputElement>(null);
  const sdatInputRef = useRef<HTMLInputElement>(null);

  // ESL Mutation
  const {
    mutate: uploadEsl,
    data: eslData,
    error: eslError,
    status: eslStatus, // 'idle' | 'loading' | 'error' | 'success'
  } = useReadEsl();

  // SDAT Mutation
  const {
    mutate: uploadSdat,
    data: sdatData,
    error: sdatError,
    status: sdatStatus,
  } = useReadSdat();

  // derive booleans
  const eslUploading = eslStatus === 'pending';
  const eslHasError = eslStatus === 'error';
  const eslSucceeded = eslStatus === 'success';

  const sdatUploading = sdatStatus === 'pending';
  const sdatHasError = sdatStatus === 'error';
  const sdatSucceeded = sdatStatus === 'success';

  // file pickers
  const pickEsl = () => eslInputRef.current?.click();
  const pickSdat = () => sdatInputRef.current?.click();

  const onChange =
    (uploader: typeof uploadEsl | typeof uploadSdat) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files && files.length) {
        uploader(files);
      }
      e.target.value = '';
    };

  return (
    <section className="bg-white rounded-lg shadow p-6 mt-6 space-y-6">
      <h2 className="text-2xl font-semibold">Daten hochladen</h2>

      {/* ESL Upload */}
      <div className="space-y-2">
        <input
          ref={eslInputRef}
          type="file"
          accept=".xml"
          multiple
          className="hidden"
          onChange={onChange(uploadEsl)}
        />
        <Button onClick={pickEsl} disabled={eslUploading}>
          {eslUploading ? 'Lade ESL hoch…' : 'ESL-Dateien hochladen'}
        </Button>
        {eslHasError && (
          <div className="text-red-600">Error: {eslError?.message}</div>
        )}
        {eslSucceeded && eslData && (
          <pre className="bg-gray-100 p-3 rounded overflow-auto text-sm">
            {JSON.stringify(eslData as Esl[], null, 2)}
          </pre>
        )}
      </div>

      {/* SDAT Upload */}
      <div className="space-y-2">
        <input
          ref={sdatInputRef}
          type="file"
          accept=".xml"
          multiple
          className="hidden"
          onChange={onChange(uploadSdat)}
        />
        <Button onClick={pickSdat} disabled={sdatUploading}>
          {sdatUploading ? 'Lade SDAT hoch…' : 'SDAT-Dateien hochladen'}
        </Button>
        {sdatHasError && (
          <div className="text-red-600">Error: {sdatError?.message}</div>
        )}
        {sdatSucceeded && sdatData && (
          <pre className="bg-gray-100 p-3 rounded overflow-auto text-sm">
            {JSON.stringify(sdatData as Sdat[], null, 2)}
          </pre>
        )}
      </div>
    </section>
  );
};
