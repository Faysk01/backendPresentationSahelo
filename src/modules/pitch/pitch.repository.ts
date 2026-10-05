import { prisma } from '../services/prisma.service';

export class PitchRepository {
  async get() {
    return await prisma.pitchContent.findFirst();
  }

  async createDefault() {
    return await prisma.pitchContent.create({
      data: {
        title: "FinTech Connect",
        tagline: "Réinventer le transfert d'argent de la Diaspora Italienne vers l'Afrique.",
        // On ajoute les textes obligatoires pour la création initiale
        content1: "Nous ne nous précipitons pas. Une FinTech repose sur la confiance et la sécurité. Pendant que l'administration italienne traite l'immatriculation de notre S.r.l.s, notre équipe technique consolide la forteresse numérique (backend, JWT, OWASP) qui accueillera l'API de notre partenaire bancaire.",
        content2: "Avec un Float de démarrage prévu de 2 000 €, nous pourrons tester le marché dès le 3ème mois sur un public restreint de la diaspora avant le déploiement massif."
      }
    });
  }

  async update(id: string, data: any) {
    return await prisma.pitchContent.update({
      where: { id },
      data
    });
  }
}

export const pitchRepository = new PitchRepository();