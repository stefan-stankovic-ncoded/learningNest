export const SECRET_KEY = 'secret-key';

export default () => ({
  'secret-key': process.env.SECRET_KEY,
});
