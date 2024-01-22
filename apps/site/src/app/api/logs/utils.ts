import crypto from 'crypto';

export async function sha1(data: Buffer, secret: string) {
  return crypto.createHmac('sha1', secret).update(data).digest('hex');
}

function formatStr(str: string) {
  return str.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
}

export function formatLog(log: any) {
  const formattedLog: Record<string, any> = {};

  Object.entries(log).forEach(([key, value]) => {
    const formatKey = formatStr(key);
    let formatValue = value;
    if (key === 'timestamp') {
      formatValue = new Date(value as number).toISOString();
    }

    if (key === 'proxy' && typeof value === 'object') {
      Object.entries(value as Record<string, any>).forEach(([key, value]) => {
        const proxyKey = `proxy_${formatStr(key)}`;
        let proxyVal = value;

        if (key === 'timestamp') {
          proxyVal = new Date(value as number).toISOString();
        }

        if (key === 'userAgent') {
          proxyVal = value.join(',');
        }
        formattedLog[proxyKey] = proxyVal;
      });
    } else {
      formattedLog[formatKey] = formatValue;
    }
  });

  return formattedLog;
}
