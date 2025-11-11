# 🚀 Configuration Vercel pour Maison Noir

## Problème résolu

L'erreur de build sur Vercel était due à une mauvaise configuration du monorepo.

## Fichiers créés/modifiés

### 1. `vercel.json`
Configuration Vercel pour pointer vers le dossier `frontend` du monorepo.

### 2. `frontend/next.config.js`
- Désactivation des rewrites en production (ils pointaient vers localhost)
- Ajout de la configuration `output: 'standalone'` pour Vercel
- Configuration des images pour accepter les domaines distants

### 3. `.vercelignore`
Ignore les dossiers inutiles lors du déploiement.

## Configuration Vercel

### Dans le dashboard Vercel :

1. **Root Directory** : Définissez `frontend` comme répertoire racine
   - Settings → General → Root Directory → `frontend`

2. **Build Command** : `npm run build`
   - (Vercel détectera automatiquement Next.js)

3. **Install Command** : `npm install`
   - (Sera exécuté dans le dossier `frontend`)

4. **Output Directory** : `.next`
   - (Par défaut pour Next.js)

### Variables d'environnement (si nécessaire)

Si vous avez besoin de variables d'environnement :

1. Allez dans Settings → Environment Variables
2. Ajoutez :
   - `NEXT_PUBLIC_API_URL` = URL de votre backend (si déployé séparément)
   - Autres variables nécessaires

## Déploiement

1. **Connectez votre dépôt GitHub** à Vercel
2. **Configurez le Root Directory** : `frontend`
3. **Déployez** !

## Note importante

Le backend (Express) doit être déployé séparément sur :
- Railway
- Render
- Heroku
- Ou tout autre service Node.js

Le frontend sur Vercel communiquera avec le backend via l'URL de production du backend.

## Mise à jour de l'API URL

Dans `frontend/components/` et autres fichiers, remplacez les URLs localhost par une variable d'environnement :

```typescript
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
```

Puis utilisez `API_URL` au lieu de `http://localhost:5000`.

