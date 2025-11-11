# 🚀 Guide : Connecter Maison Noir à GitHub

## Étapes pour ajouter votre projet à GitHub

### 1. Créer un nouveau dépôt sur GitHub

1. Allez sur [GitHub.com](https://github.com) et connectez-vous
2. Cliquez sur le bouton **"+"** en haut à droite → **"New repository"**
3. Remplissez les informations :
   - **Repository name** : `maison-noir` (ou le nom de votre choix)
   - **Description** : "A mysterious, elegant, and secure communication platform"
   - **Visibility** : Public ou Private (selon votre préférence)
   - ⚠️ **NE COCHEZ PAS** "Initialize with README" (on a déjà un README)
4. Cliquez sur **"Create repository"**

### 2. Initialiser Git dans votre projet (si pas déjà fait)

```bash
# Vérifier si Git est déjà initialisé
git status

# Si erreur, initialiser Git
git init
```

### 3. Ajouter tous les fichiers

```bash
# Ajouter tous les fichiers au staging
git add .

# Vérifier ce qui sera commité
git status
```

### 4. Créer le premier commit

```bash
git commit -m "Initial commit: Maison Noir - Full-stack communication platform"
```

### 5. Connecter au dépôt GitHub

Remplacez `VOTRE_USERNAME` par votre nom d'utilisateur GitHub :

```bash
# Ajouter le remote GitHub
git remote add origin https://github.com/VOTRE_USERNAME/maison-noir.git

# Vérifier que c'est bien connecté
git remote -v
```

### 6. Pousser le code vers GitHub

```bash
# Renommer la branche principale en 'main' (si nécessaire)
git branch -M main

# Pousser vers GitHub
git push -u origin main
```

## Commandes complètes (copier-coller)

```bash
# 1. Initialiser Git
git init

# 2. Ajouter tous les fichiers
git add .

# 3. Premier commit
git commit -m "Initial commit: Maison Noir - Full-stack communication platform"

# 4. Ajouter le remote (remplacer VOTRE_USERNAME)
git remote add origin https://github.com/VOTRE_USERNAME/maison-noir.git

# 5. Renommer la branche
git branch -M main

# 6. Pousser vers GitHub
git push -u origin main
```

## Si vous avez déjà un dépôt Git

Si Git est déjà initialisé ailleurs, vous pouvez :

```bash
# Supprimer l'ancien remote (si existe)
git remote remove origin

# Ajouter le nouveau remote GitHub
git remote add origin https://github.com/VOTRE_USERNAME/maison-noir.git

# Pousser vers GitHub
git push -u origin main
```

## Authentification GitHub

Si GitHub vous demande de vous authentifier :

1. **Option 1 - Personal Access Token** (recommandé) :
   - Allez dans GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
   - Créez un nouveau token avec les permissions `repo`
   - Utilisez le token comme mot de passe lors du `git push`

2. **Option 2 - GitHub CLI** :
   ```bash
   # Installer GitHub CLI
   # Puis :
   gh auth login
   ```

## Vérification

Après le push, allez sur votre dépôt GitHub. Vous devriez voir tous vos fichiers !

## Commandes utiles pour la suite

```bash
# Voir l'état des fichiers
git status

# Ajouter des fichiers modifiés
git add .

# Créer un commit
git commit -m "Description de vos changements"

# Pousser vers GitHub
git push

# Voir l'historique des commits
git log
```

## ⚠️ Important : Fichiers à ne pas commiter

Assurez-vous que votre `.gitignore` contient bien :
- `node_modules/`
- `.env` et `.env.local`
- Fichiers de build
- Fichiers temporaires

Votre `.gitignore` est déjà configuré correctement ! ✅

