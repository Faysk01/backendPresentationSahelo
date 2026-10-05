import { pitchRepository } from './pitch.repository';

export class PitchService {
  async getPitch() {
    let pitch = await pitchRepository.get();
    
    // Si la table est vide (premier lancement), on crée la ligne par défaut
    if (!pitch) {
      pitch = await pitchRepository.createDefault();
    }
    return pitch;
  }

  async updatePitch(data: any) {
    let pitch = await pitchRepository.get();
    
    if (!pitch) {
      pitch = await pitchRepository.createDefault();
    }

    return await pitchRepository.update(pitch.id, {
      title: data.title,
      tagline: data.tagline,
      content1: data.content1,
      content2: data.content2,
    });
  }
}

export const pitchService = new PitchService();