$filePath = "c:\Users\olivi\portfolio-projet\index.html"
$content = Get-Content -Path $filePath -Raw

# Trouver la position de la deuxième occurrence de la fiche mission 5
$startTag = "<!-- Fiche de Mission 5 (2025) -->"
$startIndex1 = $content.IndexOf($startTag)
$startIndex2 = $content.IndexOf($startTag, $startIndex1 + 1)

if ($startIndex2 -ne -1) {
    # Trouver la fin de la deuxième fiche mission 5
    $endTag = "</div>\n                </div>"
    $endIndex = $content.IndexOf($endTag, $startIndex2) + $endTag.Length
    
    # Supprimer la deuxième occurrence
    $newContent = $content.Remove($startIndex2, $endIndex - $startIndex2)
    
    # Écrire le contenu mis à jour dans le fichier
    $newContent | Set-Content -Path $filePath -NoNewline
    Write-Host "La deuxième occurrence de la fiche mission 5 a été supprimée avec succès."
} else {
    Write-Host "Une seule occurrence de la fiche mission 5 trouvée. Aucune suppression nécessaire."
}
