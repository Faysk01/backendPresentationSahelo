import { Request, Response } from 'express';
import { pitchService } from './pitch.service';

export class PitchController {
  constructor() {
    this.get = this.get.bind(this);
    this.update = this.update.bind(this);
  }

  async get(req: Request, res: Response) {
    try {
      const pitch = await pitchService.getPitch();
      res.status(200).json(pitch);
    } catch (error: any) {
      res.status(500).json({ error: "Erreur lors de la récupération du pitch" });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const pitch = await pitchService.updatePitch(req.body);
      res.status(200).json(pitch);
    } catch (error: any) {
      res.status(400).json({ error: "Erreur lors de la mise à jour du pitch" });
    }
  }
}

export const pitchController = new PitchController();