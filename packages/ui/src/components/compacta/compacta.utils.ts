import { domAnimation } from 'framer-motion';

export default domAnimation;

export const generateID = () => {
  const url = URL.createObjectURL(new Blob());
  const [id] = url.toString().split('/').reverse();
  URL.revokeObjectURL(url);
  return id.replace('blob:nodedata:', '');
};
