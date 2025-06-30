// src/views/Upload.tsx
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useReadEsl, useReadSdat } from '@/api/useRead';
import { toast } from 'sonner';
import { Toaster } from '@/components/ui/sonner';

const ACCEPT_MAP = {
  esl: { extensions: ['.xml'], mime: ['application/xml', 'text/xml'] },
  sdat: { extensions: ['.xml'], mime: ['application/xml', 'text/xml'] },
};

export const Upload: React.FC = () => {
  const [mode, setMode] = useState<string>('esl');
  const readEsl = useReadEsl();
  const readSdat = useReadSdat();

  const onDrop = useCallback(
    (files: File[]) => {
      if (mode === 'esl') {
        readEsl.mutate(files, {
          onSuccess: data => {
            toast.success(
              `${data.length} ESL-Datensätze erfolgreich verarbeitet`
            );
          },
          onError: err => {
            toast.error(`ESL-Verarbeitung fehlgeschlagen: ${err.message}`);
          },
        });
      } else {
        readSdat.mutate(files, {
          onSuccess: data => {
            toast.success(
              `${data.length} SDAT-Datensätze erfolgreich verarbeitet`
            );
          },
          onError: err => {
            toast.error(`SDAT-Verarbeitung fehlgeschlagen: ${err.message}`);
          },
        });
      }
    },
    [mode, readEsl, readSdat]
  );

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept: ACCEPT_MAP[mode as 'esl' | 'sdat'],
    multiple: true,
    noClick: true,
    noKeyboard: true,
  });

  const uploading = mode === 'esl' ? readEsl.isPending : readSdat.isPending;

  return (
    <>
      <Toaster position="top-center" />
      <section className="bg-white dark:bg-zinc-900 rounded-lg shadow-lg dark:shadow-none p-6 mt-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
          Daten hochladen
        </h2>

        <Tabs value={mode} onValueChange={setMode} className="mb-4">
          <TabsList className="w-full grid grid-cols-2">
            <TabsTrigger className="w-full text-center" value="esl">
              ESL
            </TabsTrigger>
            <TabsTrigger className="w-full text-center" value="sdat">
              SDAT
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors 
            ${
              isDragActive
                ? 'border-green-600 bg-green-50'
                : 'border-gray-300 dark:border-gray-600'
            }
          `}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p className="text-gray-700 dark:text-gray-300">
              Dateien hier ablegen …
            </p>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">
              Ziehe {mode.toUpperCase()}-Dateien hierher oder klicke unten
            </p>
          )}
        </div>
        <div className="mt-4">
          <Button
            onClick={open}
            disabled={uploading}
            className="w-full bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 dark:text-black"
          >
            {uploading
              ? `Lade ${mode.toUpperCase()} hoch…`
              : `${mode.toUpperCase()}-Dateien auswählen`}
          </Button>
        </div>
      </section>
    </>
  );
};
