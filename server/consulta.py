from transformers import pipeline
import sys
import json

def consulta(prompt):
    conversacion = pipeline('conversational', model='microsoft/DialoGPT-medium')
    respuesta = conversacion(prompt)
    return respuesta

if __name__ == "__main__":
    prompt = sys.argv[1]
    resultado = consulta(prompt)
    print(json.dumps(resultado))
