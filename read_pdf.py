import PyPDF2

def read_pdf(file_path):
    try:
        with open(file_path, 'rb') as file:
            reader = PyPDF2.PdfReader(file)
            num_pages = len(reader.pages)
            print(f"Nombre de pages dans le document : {num_pages}")
            
            # Afficher le contenu de chaque page
            for i in range(num_pages):
                print(f"\n--- Page {i+1} ---")
                page = reader.pages[i]
                print(page.extract_text())
                
    except Exception as e:
        print(f"Une erreur s'est produite : {str(e)}")

if __name__ == "__main__":
    import sys
    if len(sys.argv) > 1:
        read_pdf(sys.argv[1])
    else:
        print("Veuillez spécifier le chemin du fichier PDF en argument.")
