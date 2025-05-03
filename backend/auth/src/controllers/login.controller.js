 const users = [
    { username: 'bob', email: 'bob@example.com', password: 'bob123' },
    { username: 'alice', email: 'alice@example.com', password: 'alice123' }
  ];  
  
  const loginController = (req, res) => {
    const { username, password } = req.body;
  
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required.' });
    }
  
    const user = users.find(u => u.username === username && u.password === password);
  
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }
  
    res.status(200).json({ message: 'Login successful!' });
  };
  
   
  

module.exports = { loginController }