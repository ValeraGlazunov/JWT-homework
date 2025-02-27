const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { getUserById, getUserByEmail, createUser } = require('../services/userService');
const { SECRET_KEY } = process.env;

const authTokenMiddleware = (req: { headers: { authorization: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { error: string; }): any; new(): any; }; }; locals: { userId: any; }; }, next: () => void) => {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
        return res.status(401).json({ error: 'Відсутній заголовок авторизації' });
    }
    
    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
        return res.status(401).json({ error: 'Формат авторизації не вірний' });
    }
    
    const token = parts[1];
    
    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        res.locals.userId = decoded.id;
        next();
    } catch (err) {
        return res.status(401).json({ error: 'Неправильний токен' });
    }
};

const getUserData = async (req: any, res: { locals: { userId: any; }; status: (arg0: number) => { (): any; new(): any; json: { (arg0: { error: string; }): any; new(): any; }; }; json: (arg0: any) => any; }) => {
    const userId = res.locals.userId;
    const user = await getUserById(userId);
    
    if (!user) {
        return res.status(404).json({ error: 'Користувача не знайдено' });
    }
    
    const { password, ...userData } = user;
    return res.json(userData);
};

const loginUser = async (req: { body: { email: any; password: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { error: string; }): any; new(): any; }; }; json: (arg0: { token: any; }) => any; }) => {
    const { email, password } = req.body;
    const user = await getUserByEmail(email);
    
    if (!user) {
        return res.status(404).json({ error: 'Користувача не знайдено' });
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ error: 'Паролі не збігаються' });
    }
    
    const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1h' });
    return res.json({ token });
};

const registerUser = async (req: { body: { email: any; password: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { error: string; }): any; new(): any; }; }; json: (arg0: { token: any; }) => any; }) => {
    const { email, password } = req.body;
    const existingUser = await getUserByEmail(email);
    
    if (existingUser) {
        return res.status(400).json({ error: 'Такий користувач вже існує' });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await createUser({ email, password: hashedPassword });
    
    const token = jwt.sign({ id: newUser.id }, SECRET_KEY, { expiresIn: '1h' });
    return res.json({ token });
};

module.exports = { authTokenMiddleware, getUserData, loginUser, registerUser };
