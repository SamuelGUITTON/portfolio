$filePath = "c:\Users\olivi\portfolio-projet\index.html"
$content = Get-Content -Path $filePath -Raw

# Mise à jour de la fiche mission 1 (1 mois)
$content = $content -replace '(FICHE DE MISSION N°1[\s\S]*?<div class="mission-meta">\s*<span class="mission-year">2025<\/span>\s*<span class="mission-duration">)[^<]*(<\/span>)', '${1}1 mois$2'

# Mise à jour de la fiche mission 2 (1 an)
$content = $content -replace '(FICHE DE MISSION N°2[\s\S]*?<div class="mission-meta">\s*<span class="mission-year">2024-2025<\/span>\s*<span class="mission-duration">)[^<]*(<\/span>)', '${1}1 an$2'

# Mise à jour de la fiche mission 3 (1 an) - déjà faite

# Mise à jour de la fiche mission 4 (150 jours)
$content = $content -replace '(FICHE DE MISSION N°4[\s\S]*?<div class="mission-meta">\s*<span class="mission-year">2025<\/span>\s*<span class="mission-duration">)[^<]*(<\/span>)', '${1}150 jours$2'

# Mise à jour de la fiche mission 5 (1 semaine)
$content = $content -replace '(FICHE DE MISSION N°5[\s\S]*?<div class="mission-meta">\s*<span class="mission-year">2025<\/span>\s*<span class="mission-duration">)[^<]*(<\/span>)', '${1}1 semaine$2'

# Écriture des modifications dans le fichier
$content | Set-Content -Path $filePath -NoNewline
