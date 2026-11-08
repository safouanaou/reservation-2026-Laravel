# Plateforme de collecte de meubles à domicile

## Objectif du projet

Développer une application web pour une entreprise proposant un service payant de collecte de meubles à domicile. Elle aide les particuliers qui manquent de transport, de temps ou d’aide pour enlever leurs meubles, tout en permettant à l’entreprise d’évaluer chaque intervention avant la réservation.

## Fonctionnement

1. Le client dépose gratuitement une demande en indiquant le nom, le type, l’état, les dimensions et la quantité des meubles, avec des photos. Il précise également l’adresse, les conditions d’accès (étage, ascenseur) et le besoin éventuel de démontage.
2. L’entreprise examine la demande, vérifie la faisabilité dans sa zone d’intervention, puis accepte ou refuse. En cas d’acceptation, elle confirme le prix et les éventuels suppléments. En cas de refus, elle communique le motif.
3. Après acceptation, le client choisit un créneau disponible et paie en ligne. La capacité est bloquée temporairement pendant le paiement ; la réservation est confirmée uniquement après validation du paiement. L’acceptation seule ne réserve aucun créneau.
4. L’entreprise affecte la collecte à des employés, qui consultent leurs missions et enregistrent le résultat de l’intervention. Le client peut suivre l’avancement et demander une modification ou une annulation selon les conditions du service.

## Modèle économique

Le client paie l’entreprise pour le service de collecte, avec portage et démontage optionnel. L’entreprise ne rachète pas les meubles : l’acceptation dépend de la faisabilité et des conditions du service, plutôt que de leur valeur de revente. Selon leur état, les meubles sont orientés vers le réemploi, le don, le recyclage ou une filière de traitement adaptée.

## Fonctionnalités principales

- **Espace client :** gestion du compte, ajout de photos, suivi des demandes, consultation du prix confirmé, réservation et paiement sécurisé.
- **Back-office administrateur :** gestion sécurisée des demandes, tarifs, créneaux, employés et affectations.
- **Espace employé :** consultation des collectes attribuées et mise à jour de leur statut.
- **Traçabilité :** journal d’activité et rapport d’audit des opérations importantes.
- **Langues :** interface client en français et en néerlandais, avec traduction manuelle du contenu statique.

## Périmètre technique

Les technologies prévues sont Laravel, React et MySQL. L’application doit intégrer sa propre API RESTful, une authentification sécurisée, des droits d’accès selon les rôles, un système de paiement sécurisé, des tests unitaires et d’intégration, ainsi qu’un versioning régulier avec Git. Les règles métier doivent notamment empêcher la réservation ou le paiement d’une demande refusée et éviter la surréservation des créneaux.

## Livrables académiques

En complément de l’application, préparer les documents d’analyse et de conception, un planning prévisionnel, un business plan comprenant un budget prévisionnel, ainsi que les manuels d’installation et d’utilisation pour l’Épreuve intégrée de l’ICC.
