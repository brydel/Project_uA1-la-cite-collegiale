# Projet : Plateforme de Gestion des Produits

## Introduction

Ce projet, réalisé dans le cadre du programme de technologie du génie informatique à La Cité Collégiale, est une application web permettant de gérer des produits via une interface intuitive. Elle permet la création, la mise à jour, la suppression et la consultation des produits tout en exploitant les fonctionnalités avancées de Spring Boot et de React.js.

L'objectif principal est de mettre en pratique les compétences acquises dans les domaines suivants :

- Backend : Java Spring Boot
- Frontend : React.js
- API REST
- Gestion des bases de données avec MongoDB
- Bonnes pratiques de développement

## Fonctionnalités Principales

- **CRUD des produits** :

  - Ajouter de nouveaux produits
  - Modifier des produits existants
  - Supprimer des produits
  - Consulter la liste des produits

- **Validation des champs** :

  - Validation des formulaires via Zod et React Hook Form
  - Gestion des erreurs d'entrée utilisateur sur le frontend

- **Pagination et Recherche** :

  - Pagination pour une navigation fluide entre les différentes pages
  - Fonctionnalité de recherche avancée par nom, description ou catégorie

- **Architecture RESTful** :

  - API conformes à la structure RESTful pour une communication claire entre le frontend et le backend

## Technologies Utilisées

### Backend

- **Java Spring Boot** : Framework pour le développement d'applications backend.
- **MongoDB** : Base de données NoSQL pour stocker les produits.

### Frontend

- **React.js** : Bibliothèque JavaScript pour construire des interfaces utilisateur modernes.
- **React Hook Form** : Gestion des formulaires.
- **Zod** : Validation des schémas sur le frontend.
- **TailwindCSS** : Framework CSS pour des designs modernes et responsifs.

### Outils Supplémentaires

- **Postman** : Tests des API REST.
- **Visual Studio Code** : IDE pour le développement.
- **GitHub** : Gestion du versionnement et collaboration sur le projet.

## Prérequis

- **Node.js** (version 14+)
- **Java** (JDK 17+)
- **MongoDB** (instance locale ou cloud)
- **Maven** (gestionnaire de dépendances pour Java)

## Installation

### 1. Cloner le dépôt

```bash
git clone https://github.com/utilisateur/projet-gestion-produits.git
cd projet-gestion-produits
```

### 2. Configuration Backend

1. Accédez au dossier backend :
   ```bash
   cd backend
   ```
2. Configurez les paramètres MongoDB dans le fichier `application.properties` :
   ```properties
   spring.data.mongodb.uri=mongodb://localhost:27017/produitsdb
   ```
3. Lancez le serveur backend :
   ```bash
   mvn spring-boot:run
   ```

### 3. Configuration Frontend

1. Accédez au dossier frontend :
   ```bash
   cd frontend
   ```
2. Installez les dépendances :
   ```bash
   npm install
   ```
3. Lancez le serveur frontend :
   ```bash
   npm run dev
   ```

### 4. Accéder à l'Application

- Frontend : `http://localhost:3000`
- Backend : `http://localhost:5000`

## API REST

### Endpoints

#### Produits

- `GET /api/products` : Récupérer tous les produits
- `POST /api/products` : Ajouter un nouveau produit
- `PUT /api/products/{id}` : Mettre à jour un produit existant
- `DELETE /api/products/{id}` : Supprimer un produit

#### Exemple de Payload JSON (Création/Mise à jour)

```json
{
  "name": "Ordinateur Portable",
  "description": "Un ordinateur performant pour les professionnels",
  "price": 1200,
  "stock": 25,
  "category": "Informatique"
}
```

## Structure des Dossiers

### Backend

```
backend/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   ├── com.ua1brydel.backend/
│   │   │   │   ├── controller/
│   │   │   │   ├── model/
│   │   │   │   ├── repository/
│   │   │   │   ├── service/
│   │   │   │   ├── Application.java
│   │   ├── resources/
│   │   │   ├── application.properties
```

### Frontend

```
frontend/
├── src/
│   ├── components/
│   ├── pages/
│   ├── lib/
│   ├── types/
│   ├── App.jsx
│   ├── index.css
```

## Points d'Amélioration

- **Ajout d'authentification** : Implémenter un système d'authentification utilisateur.
- **Ajout de tests unitaires** : Tests backend avec JUnit, tests frontend avec Jest.
- **Amélioration du design** : Ajouter des animations et améliorer l'UI avec TailwindCSS.

## Auteur

Ce projet a été réalisé par Brydel, étudiant en technologie du génie informatique à La Cité Collégiale.

## Licence

Ce projet est sous licence [MIT](LICENSE).

