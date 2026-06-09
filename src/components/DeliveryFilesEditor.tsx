'use client';

import { Plus, Trash2, Upload } from 'lucide-react';
import { createEmptyDeliveryFile } from '@/lib/delivery-files';
import { DELIVERY_FILE_TYPES, type DeliveryFileForm } from '@/types/product';

interface DeliveryFilesEditorProps {
  files: DeliveryFileForm[];
  onChange: (files: DeliveryFileForm[]) => void;
}

const FILE_ACCEPT: Record<DeliveryFileForm['type'], string> = {
  pdf: '.pdf,application/pdf',
  docx: '.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  link: '',
  audio: '.mp3,.wav,audio/mpeg,audio/wav',
  zip: '.zip,application/zip',
  other: '*/*',
};

export default function DeliveryFilesEditor({ files, onChange }: DeliveryFilesEditorProps) {
  const updateFile = (index: number, patch: Partial<DeliveryFileForm>) => {
    onChange(files.map((file, i) => (i === index ? { ...file, ...patch } : file)));
  };

  const removeFile = (index: number) => {
    onChange(files.filter((_, i) => i !== index));
  };

  const addFile = () => {
    onChange([...files, createEmptyDeliveryFile()]);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-2">
        <label className="block font-semibold uppercase tracking-wide">
          Arquivos e links do material
        </label>
        <button
          type="button"
          onClick={addFile}
          className="inline-flex items-center gap-1 text-[10px] font-semibold bg-[#88B7A5]/10 hover:bg-[#88B7A5]/20 text-[#527A6B] px-3 py-1.5 rounded-full transition-all"
        >
          <Plus className="w-3 h-3" />
          Adicionar arquivo
        </button>
      </div>

      <p className="text-[10px] text-[#527A6B]/70 leading-relaxed">
        Envie PDF, Word, áudios ou ZIP direto para o Storage, ou informe um link externo.
      </p>

      {files.length === 0 ? (
        <button
          type="button"
          onClick={addFile}
          className="w-full border border-dashed border-[#C8DDD4] rounded-xl py-4 text-[#527A6B]/70 hover:bg-[#F8FAF9] transition-all"
        >
          + Adicionar primeiro arquivo (PDF, Word, link...)
        </button>
      ) : (
        <div className="space-y-3">
          {files.map((file, index) => (
            <div
              key={index}
              className="bg-[#F8FAF9] border border-[#C8DDD4]/60 rounded-xl p-3 space-y-2"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-bold text-[#527A6B]/60 uppercase">
                  Arquivo {index + 1}
                </span>
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="p-1 rounded-lg text-red-600 hover:bg-red-50"
                  title="Remover"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div>
                  <label className="block text-[10px] text-[#527A6B]/60 mb-1 uppercase">
                    Tipo
                  </label>
                  <select
                    value={file.type}
                    onChange={(e) =>
                      updateFile(index, {
                        type: e.target.value as DeliveryFileForm['type'],
                        localFile: null,
                      })
                    }
                    className="w-full bg-white border border-[#C8DDD4] rounded-lg px-3 py-2 text-[#527A6B]"
                  >
                    {DELIVERY_FILE_TYPES.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[10px] text-[#527A6B]/60 mb-1 uppercase">
                    Nome / descrição
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: E-book completo em PDF"
                    value={file.label}
                    onChange={(e) => updateFile(index, { label: e.target.value })}
                    className="w-full bg-white border border-[#C8DDD4] rounded-lg px-3 py-2 text-[#527A6B]"
                  />
                </div>
              </div>

              {file.type === 'link' ? (
                <div>
                  <label className="block text-[10px] text-[#527A6B]/60 mb-1 uppercase">
                    URL (obrigatório para links)
                  </label>
                  <input
                    type="url"
                    placeholder="https://drive.google.com/..."
                    value={file.url ?? ''}
                    onChange={(e) => updateFile(index, { url: e.target.value })}
                    className="w-full bg-white border border-[#C8DDD4] rounded-lg px-3 py-2 text-[#527A6B]"
                  />
                </div>
              ) : (
                <div className="space-y-2">
                  <label className="block text-[10px] text-[#527A6B]/60 uppercase">
                    Upload do arquivo
                  </label>
                  <label className="flex items-center gap-2 w-full bg-white border border-[#C8DDD4] rounded-lg px-3 py-2 text-[#527A6B] cursor-pointer hover:bg-[#F8FAF9]">
                    <Upload className="w-3.5 h-3.5 flex-shrink-0" />
                    <span className="truncate text-[11px]">
                      {file.localFile?.name ??
                        (file.storagePath ? 'Arquivo já enviado (substituir)' : 'Selecionar arquivo')}
                    </span>
                    <input
                      type="file"
                      accept={FILE_ACCEPT[file.type]}
                      className="hidden"
                      onChange={(e) =>
                        updateFile(index, { localFile: e.target.files?.[0] ?? null })
                      }
                    />
                  </label>
                  {file.storagePath && !file.localFile && (
                    <p className="text-[10px] text-green-700">✓ Arquivo salvo no servidor</p>
                  )}
                  <div>
                    <label className="block text-[10px] text-[#527A6B]/60 mb-1 uppercase">
                      URL externa (opcional)
                    </label>
                    <input
                      type="url"
                      placeholder="https://... (alternativa ao upload)"
                      value={file.url ?? ''}
                      onChange={(e) => updateFile(index, { url: e.target.value })}
                      className="w-full bg-white border border-[#C8DDD4] rounded-lg px-3 py-2 text-[#527A6B]"
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
