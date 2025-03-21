Importante: 
para ejecutarlo tengo que ir a mi git bash, ir hasta la carpeta juego-ajedrez y escribir : 
py -m venv venv
source venv/Scripts/actívate
pip install uvicorn
uvicorn main:app --reload
esto inicializa el servidor
Luego, ir a la carpeta chess_client y escribir : npm run dev
de esta manera se ejecutará y veremos el juego
