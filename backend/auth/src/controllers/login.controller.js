const loginController = async (req, res) => { 
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
