export const getLinkText = language => {
    switch (language) {
        case 'en':
            return "Privacy Policy";
        case 'de':
            return "Datenschutz-Bestimmungen";
        case 'fn':
        default:
            return "Politique de confidentialité";
    }
};

export const getMainTitle = language => {
    switch (language) {
        case 'en':
            return  "Privacy settings"
        case 'de':
            return "Datenschutzeinstellungen"
        case 'fn':
        default:
            return "Paramètres de confidentialité";
    }
};

export const getMainDescription = language => {
    switch (language) {
        case 'en':
            return "Except for cookies and similar technologies {'Cookies'} which are strictly necessary for the operation of the website, you can accept or refuse that we use Cookies for each distinct purpose mentioned below, by moving the cursor at the end of each line. " +
            "Whenever you are given the opportunity to accept or refuse the use of Cookies, we provide you with the essential information to allow you to make your choice: the purpose of the processing, the Cookie or the category of Cookies. used {s}, the identity of the data controller, the types of personal data collected and used and the possible transfer of your personal data outside the European Economic Area. " +
            "Once you have given your consent to the use of Cookies for a purpose, you can change your choice at any time, by moving the cursor to the end of the line concerned."
        case 'de':
            return "Mit Ausnahme von Cookies und ähnlichen Technologien {'Cookies'}, die für den Betrieb der Website unbedingt erforderlich sind, können Sie die Verwendung von Cookies für jeden unten aufgeführten Zweck akzeptieren oder ablehnen, indem Sie den Cursor am Ende jeder Zeile bewegen. " +
            "Wann immer Sie die Möglichkeit haben, die Verwendung von Cookies zu akzeptieren oder abzulehnen, stellen wir Ihnen die wesentlichen Informationen zur Verfügung, damit Sie Ihre Wahl treffen können: den Zweck der Verarbeitung, das Cookie oder die Kategorie der Cookies Identität des Verantwortlichen, die Art der erhobenen und verwendeten personenbezogenen Daten und die mögliche Übermittlung Ihrer personenbezogenen Daten außerhalb des Europäischen Wirtschaftsraums. " +
            "Nachdem Sie der zweckgebundenen Verwendung von Cookies zugestimmt haben, können Sie Ihre Auswahl jederzeit ändern, indem Sie den Cursor an das Ende der betreffenden Zeile bewegen."
        case 'fn':
        default:
            return "Sauf pour les cookies et technologies similaires {'Cookies'} qui sont strictement nécessaires au fonctionnement du site internet, vous pouvez accepter ou refuser que nous utilisions des Cookies pour chaque finalité distincte ci-dessous mentionnée, en déplaçant le curseur à la fin de chaque ligne. " +
            "Chaque fois q'il vous est donné la possibilité d'accepter ou de refuser l'utilisation de Cookies, nous vous fournissons les informations essentielles afin de vous permettre de faire votre choix : "+ 
            "l'objectif du traitement, le Cookie ou la catégorie de Cookies utilisé{s}, l'identité du responsable de traitement, les types de données personnelles recueillies et utilisées et le transfert éventuel de vos données personnelles hors de l'Espace Economique Européen. " + 
            "Une fois que vous avez donné votre accord concernant l'utilisation de Cookies pour une finalité, vous pouvez revenir sur votre choix à tout moment, en déplaçant le curseur à la fin de la ligne concernée.";
    }
};

export const getMainButtonText = language => {
    switch (language) {
        case 'en':
            return "Validate"
        case 'de':
            return "Bestätigen"
        case 'fn':
        default:
            return "Valider";
    }
};

export const getActiveText = language => {
    switch (language) {
        case 'en':
            return "Active"
        case 'de':
            return "Aktiv"
        case 'fn':
        default:
            return "Actif";
    }
};

export const getInactiveText = language => {
    switch (language) {
        case 'en':
            return "Inactive"
        case 'de':
            return "Inaktiv"
        case 'fn':
        default:
            return "Inactif";
    }
};

export const getAlwaysActiveText = language => {
    switch (language) {
        case 'en':
            return "Always active"
        case 'de':
            return "Immer aktiv"
        case 'fn':
        default:
            return "Toujours actif";
    }
};

export const getFunctionalsTitle = language => {
    switch (language) {
        case 'en':
            return "Strictly necessary cookies"
        case 'de':
            return "Unbedingt notwendige cookies"
        case 'fn':
        default:
            return "Cookies strictement nécessaires";
    }
};

export const getFunctionalsDescription = language => {
    switch (language) {
        case 'en':
            return "These cookies are essential for the website to function properly and cannot be deactivated from our systems. " +
            "They are usually only activated in response to actions you take that correspond to a request for services, such as setting your privacy preferences, signing in or filling out forms. " +
            "You can configure your browser to block or be alerted to the use of these cookies. " +
            "However, if this category of cookies - which does not store any personal data - is blocked, some parts of the site will not be able to function."
        case 'de':
            return "Diese Cookies sind für die ordnungsgemäße Funktion der Website unerlässlich und können von unseren Systemen nicht deaktiviert werden. " +
            "Sie werden in der Regel nur als Reaktion auf von Ihnen ausgeführte Aktionen aktiviert, die einer Anforderung von Diensten entsprechen, wie z. B. das Festlegen Ihrer Datenschutzeinstellungen, das Anmelden oder das Ausfüllen von Formularen. " +
            "Sie können Ihren Browser so konfigurieren, dass er die Verwendung dieser Cookies blockiert oder darauf hingewiesen wird. " +
            "Wenn jedoch diese Kategorie von Cookies, die keine personenbezogenen Daten speichert, blockiert wird, können einige Teile der Website nicht funktionieren."
        case 'fn':
        default:
            return "Ces cookies sont indispensables au bon fonctionnement du site web et ne peuvent être désactivés de nos systèmes. " +
            "Ils ne sont généralement qu'activés en réponse à des actions que vous effectuez et qui correspondent à une demande de services, comme la configuration de vos préférences de confidentialité, la connexion ou le remplissage de formulaires. " + 
            "Vous pouvez configurer votre navigateur pour bloquer ou être alerté de l'utilisation de ces cookies. " + 
            "Cependant, si cette catégorie de cookies - qui ne stocke aucune donnée personnelle - est bloquée, certaines parties du site ne pourront pas fonctionner.";
    }
};

export const getAnalyticsTitle = language => {
    switch (language) {
        case 'en':
            return "Performance cookies"
        case 'de':
            return "Leistungs-cookies"
        case 'fn':
        default:
            return "Cookies de performance";
    }
};

export const getAnalyticsDescription = language => {
    switch (language) {
        case 'en':
            return "These cookies allow us to determine the number of visits and the sources of traffic to our website, in order to measure and improve its performance. " +
            "They also help us to identify the most / least visited pages and to assess how visitors navigate the site. " +
            "All the information collected by these cookies is aggregated and therefore anonymized. " +
            "If you do not accept this category of cookies, we will not be able to know when you have visited our website."
        case 'de':
            return "Diese Cookies ermöglichen es uns, die Anzahl der Besuche und die Verkehrsquellen unserer Website zu ermitteln, um deren Leistung zu messen und zu verbessern. " +
            "Sie helfen uns auch, die am häufigsten / am wenigsten besuchten Seiten zu identifizieren und zu beurteilen, wie Besucher auf der Website navigieren. " +
            "Alle von diesen Cookies gesammelten Informationen werden aggregiert und daher anonymisiert. " +
            "Wenn Sie diese Kategorie von Cookies nicht akzeptieren, können wir nicht wissen, wann Sie unsere Website besucht haben."
        case 'fn':
        default:
            return "Ces cookies nous permettent de déterminer le nombre de visites et les sources du trafic sur notre site web, afin d'en mesurer et d'en améliorer les performances. " + 
            "Ils nous aident également à identifier les pages les plus / moins visitées et à évaluer comment les visiteurs naviguent sur le site. " + 
            "Toutes les informations collectées par ces cookies, sont agrégées et donc anonymisées. " + 
            "Si vous n'acceptez pas cette catégorie de cookies, nous ne pourrons pas savoir quand vous avez réalisé votre visite sur notre site web.";
    }
};

export const getAdsTitle = language => {}
export const getAdsDescription = language => {}