'use client';

import { Button } from '@westpac/ui/button';
import { useEffect, useRef, useState } from 'react';

import { getLogs } from './logs.utils';

export const DownloadButton = () => {
  const ref = useRef<HTMLAnchorElement>(null);
  const [downloadUrl, setDownloadUrl] = useState('');

  const handleClick = async () => {
    const logs = await getLogs();
    const blob = new Blob([JSON.stringify(logs)], { type: 'application/json' });
    const fileDownloadUrl = URL.createObjectURL(blob);
    setDownloadUrl(fileDownloadUrl);
  };

  useEffect(() => {
    if (downloadUrl) {
      ref.current?.click();
      URL.revokeObjectURL(downloadUrl);
      setDownloadUrl('');
    }
  }, [downloadUrl]);

  return (
    <div>
      <Button onClick={handleClick}>Download logs</Button>
      <a className="hidden" ref={ref} download="logs.json" href={downloadUrl}>
        Download Logs
      </a>
    </div>
  );
};
