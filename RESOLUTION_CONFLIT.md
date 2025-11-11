# 🔧 Résolution du conflit Git

## Problème
Le dépôt distant contient des commits différents de votre dépôt local. Les deux branches ont divergé.

## Solutions possibles

### Option 1 : Merge (recommandé - préserve tout l'historique)

Cette option combine les deux historiques :

```bash
# Récupérer les changements distants
git pull origin main --allow-unrelated-histories

# Résoudre les conflits si nécessaire, puis :
git add .
git commit -m "Merge remote and local repositories"

# Pousser le résultat
git push -u origin main
```

### Option 2 : Rebase (met vos commits par-dessus les commits distants)

Cette option réapplique vos commits après les commits distants :

```bash
# Récupérer et rebase
git pull --rebase origin main --allow-unrelated-histories

# Si conflits, résoudre puis :
git add .
git rebase --continue

# Pousser
git push -u origin main
```

### Option 3 : Forcer le push (⚠️ DANGEREUX - perd les commits distants)

**ATTENTION** : Cette option écrase les commits du dépôt distant !

```bash
# Forcer le push (écrase le dépôt distant)
git push -u origin main --force
```

**⚠️ Ne faites cela QUE si vous êtes sûr de vouloir perdre les commits distants !**

## Recommandation

Utilisez l'**Option 1 (Merge)** pour préserver tout l'historique des deux dépôts.

