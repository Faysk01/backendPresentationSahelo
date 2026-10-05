import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';

// 🚀 IMPORTATION DE NOS MODULES
import dashboardRoutes from './modules/dashboard/dashboard.routes';
import tasksRoutes from './modules/tasks/tasks.routes';
import budgetRoutes from './modules/budget/budget.routes';
import pitchRoutes from './modules/pitch/pitch.routes';
import timelineRoutes from './modules/timeline/timeline.routes'; // 👈 NOUVEL IMPORT

dotenv.config();

const app: Application = express();

// ==========================================
// 🛡️ MIDDLEWARES GLOBAUX
// ==========================================
app.use(helmet());

// CONFIGURATION CORS DYNAMIQUE POUR NGROK ET VERCEL
app.use(cors({
  origin: "*", // En phase de développement avec Ngrok, on autorise toutes les origines
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true 
}));

app.use(morgan('dev'));
app.use(express.json());

// ==========================================
// 🚦 ROUTAGE DES MODULES DE L'API
// ==========================================
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/tasks', tasksRoutes);
app.use('/api/budget', budgetRoutes);
app.use('/api/pitch', pitchRoutes);
app.use('/api/timeline', timelineRoutes); // 👈 NOUVELLE ROUTE CONNECTÉE

// ==========================================
// 🩺 ROUTES DE TEST & HEALTH CHECK
// ==========================================
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: "Bienvenue sur l'API SaheloPay Tracker" });
});

app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ 
    status: 'online', 
    message: '🚀 API de suivi de projet opérationnelle.' 
  });
});

// ==========================================
// ❌ GESTION DES ERREURS 404
// ==========================================
app.use((req: Request, res: Response) => {
  res.status(404).json({ success: false, message: "Ressource introuvable." });
});

export default app;