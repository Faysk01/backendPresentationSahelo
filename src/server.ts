import app from './app';

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log('==================================================');
  console.log(`🚀 SERVER LISTENING ON PORT ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV}`);
  console.log('==================================================');
});