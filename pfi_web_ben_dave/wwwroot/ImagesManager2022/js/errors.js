function error(status) {
    let errorMessage = "";
    switch (status) {
        case 0:
            errorMessage = "Le service ne répond pas";
            break;
        case 422:
            errorMessage = "Requête invalide";
            break;
        case 404:
            errorMessage = "Service ou données introuvables";
            break;
        case 480:
            errorMessage = "Votre courriel n'est pas vérifié";
            break;
        case 481:
            errorMessage = "Nom d'usager introuvable";
            break;
        case 482:
            errorMessage = "Mot de passe incorrect";
            break;
        case 500:
            errorMessage = "Erreur interne du service";
            break;
        default:
            errorMessage = "Une erreur est survenue";
            break;
    }
    $("#errorMessage").text(errorMessage);
    $("#errorDlg").dialog('open');
}

