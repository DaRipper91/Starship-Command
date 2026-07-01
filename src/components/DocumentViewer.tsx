
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// We'll import these as raw strings using Vite's ?raw feature
import manualRaw from '../../MASTER_MANUAL.md?raw';
import readmeRaw from '../../README.md?raw';
import { Modal } from './ui/Modal';

interface DocumentViewerProps {
  isOpen: boolean;
  onClose: () => void;
  docType: 'manual' | 'readme';
}

export function DocumentViewer({
  isOpen,
  onClose,
  docType,
}: DocumentViewerProps) {
  const content = docType === 'manual' ? manualRaw : readmeRaw;
  const title = docType === 'manual' ? 'Master Manual' : 'Project README';

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="scrollbar-thin scrollbar-thumb-gray-700 prose prose-sm prose-invert max-h-[70vh] max-w-none overflow-y-auto pr-2">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
      </div>
    </Modal>
  );
}
