export const errorHandler = (err, req, res) => {
  console.error('Error:', err.message);
  console.error('Stack:', err.stack);
  
  if (err.name === 'ValidationError') {
    return res.status(400).json({ 
      message: err.message,
      errors: Object.values(err.errors).map(error => error.message)
    });
  }
  
  if (err.code === 11000) {
    return res.status(409).json({ 
      message: 'Email already exists'
    });
  }
  
  res.status(500).json({ 
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
};