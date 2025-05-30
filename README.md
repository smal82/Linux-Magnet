# Linux Magnet

**Linux Magnet** è un moderno RSS reader desktop cross-platform per seguire e scaricare rapidamente distro Linux tramite magnet link, scritto in React + Electron.

![screenshot](Immagine%202025-05-30%20143354.png) <!-- Puoi aggiungere uno screenshot della tua app qui! -->

## Caratteristiche

- Interfaccia moderna e minimale (light mode)
- Visualizza feed RSS di distribuzioni Linux con magnet link
- Scarica direttamente i torrent tramite client predefinito
- Funziona su **Windows, Linux e Mac**
- Nessuna dipendenza da librerie esterne per il parsing RSS lato frontend

## Installazione

### Prerequisiti

- [Node.js 18+](https://nodejs.org/)
- [Git](https://git-scm.com/)
- [npm](https://www.npmjs.com/) (di solito incluso con Node.js)

### Clona il repository

```sh
git clone https://github.com/smal82/Linux-Magnet.git
cd Linux-Magnet
```

### Installa le dipendenze

```sh
npm install
```

### Avvia l’app in modalità sviluppo

```sh
npm run dev
```
- Si aprirà una finestra Electron con l’app Linux Magnet.

## Come funziona

L’app scarica e mostra il feed RSS delle principali distro Linux, estrae i magnet link e ti permette di avviare il download direttamente dal tuo client torrent preferito con un click.

## Licenza

[MIT](LICENSE)

---

**Autore:** [smal82](https://github.com/smal82)
