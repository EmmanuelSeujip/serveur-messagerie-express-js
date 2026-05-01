import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../models/index.js';
    
const register = async (req, res) => {
    // Récupération des paramètres (utilisation de la déstructuration pour faire plus propre)
    const { email, password, username, bio } = req.body;

    // Vérifier si les champs obligatoires sont remplis
    if (!email || !password || !username) {
        return res.status(400).json({ message: 'Please fill in all required fields' });
    }
    
    try {
        // 1. Vérifier si l'utilisateur existe déjà
        const userFound = await db.User.findOne({ where: { email: email } });
        
        if (userFound) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // 2. Hasher le mot de passe (bcrypt.hash fonctionne très bien avec await)
        const hashedPassword = await bcrypt.hash(password, 10);

        // 3. Créer l'utilisateur
        const newUser = await db.User.create({
            email: email,
            password: hashedPassword,
            username: username,
            bio: bio,
            isAdmin: false
        });

        // 4. Réponse en cas de succès
        return res.status(201).json({ 
            message: 'User created successfully', 
            user: {
                id: newUser.id,
                email: newUser.email,
                username: newUser.username,
                token: jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET, { expiresIn: '24h' }) 
            } 
        });

    } catch (err) {
        // Capture toutes les erreurs (base de données, bcrypt, etc.)
        console.error('Erreur lors de l\'inscription :', err);
        return res.status(500).json({ message: 'Internal server error', error: err.message });
    }
};
const login = (req, res) => {

}

export { register, login };