function changeCamera(name, url) {
    const video = document.getElementById("videoStream");
    const staticEffect = document.getElementById("staticEffect");
    const label = document.getElementById("camLabel");
    const sound = document.getElementById("camSound"); // On récupère l'élément audio

    // 1. Jouer le son de transition
    if (sound) {
        sound.currentTime = 0; // Remet le son au début
        sound.play().catch(e => console.log("L'autostart audio nécessite une interaction utilisateur."));
    }

    // 2. Afficher l'effet de parasites
    staticEffect.style.display = "block";
    label.innerText = name;

    // 3. Changer la source de la vidéo
    if (window.Hls && Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(url);
        hls.attachMedia(video);
    } else {
        video.src = url;
    }

    // 4. Retirer les parasites après 300ms
    setTimeout(() => {
        staticEffect.style.display = "none";
    }, 300);
}