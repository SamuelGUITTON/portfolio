$filePath = "c:\Users\olivi\portfolio-projet\index.html"
$content = Get-Content -Path $filePath -Raw

# Mise à jour des Savoirs
$content = $content -replace '(?s)(<h5 style=".*?">Savoirs<\/h5>\s*<p style=".*?">).*?(<\/p>)', '$1Maitrise du logiciel SolidWorks, connaissances en formage et soudage$2'

# Mise à jour des Savoir-faire
$content = $content -replace '(?s)(<h5 style=".*?">Savoir-faire<\/h5>\s*<p style=".*?">).*?(<\/p>)', '$1Utilisation des fonctions de tôlerie dans SolidWorks, Mise en œuvre de procédés de découpe jet d''eau, Utilisation d''une plieuse et d''un poste à souder$2'

# Mise à jour des Savoir-être
$content = $content -replace '(?s)(<h5 style=".*?">Savoir-être<\/h5>\s*<p style=".*?">).*?(<\/p>)', '$1Autonomie, rigueur$2'

# Suppression de la section Faits marquants
$content = $content -replace '(<h5>Faits marquants :<\/h5>\s*<p>À compléter avec les réalisations notables du projet<\/p>)', ''

# Écriture des modifications dans le fichier
$content | Set-Content -Path $filePath -NoNewline
