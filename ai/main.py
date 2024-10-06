
from dotenv import load_dotenv
from langchain_openai import ChatOpenAI

load_dotenv()
model = ChatOpenAI(model="gpt-4o", temperature=0.2)

from langchain.agents import Tool

def stars_template(pregunta):
    estrella = """
"nombre_del_planeta": "K2-22 b"
"nombre_de_la_estrella_anfitriona": "K2-22"
"indicador_predeterminado": "1"
"número_de_estrellas_en_el_sistema": "2"
"número_de_planetas_en_el_sistema": "1"
"método_de_descubrimiento": "Transit"
"año_de_descubrimiento": "2015"
"instalación_de_descubrimiento": "K2"
"tipo_de_solución": "Published Confirmed"
"indicador_de_controversia_del_planeta": "0"
"referencia_de_la_publicación_sobre_el_planeta": "<a refstr=ADAMS_ET_AL__2021 href=https://ui.adsabs.harvard.edu/abs/2021PSJ.....2..152A/abstract target=ref>Adams et al. 2021</a>"
"periodo_orbital_días": "0.38107300"
"error_superior_del_periodo_orbital_días": "0.00002400"
"error_inferior_del_periodo_orbital_días": "-0.00002400"
"límite_del_periodo_orbital": "0"
"distancia_semimayor_de_la_órbita_UA": ""
"error_superior_de_la_distancia_semimayor_UA": ""
"error_inferior_de_la_distancia_semimayor_UA": ""
"límite_de_la_distancia_semimayor": ""
"radio_del_planeta_radios_terrestres": "2.300"
"error_superior_del_radio_radios_terrestres": "0.100"
"error_inferior_del_radio_radios_terrestres": "-0.100"
"límite_del_radio_del_planeta_radios_terrestres": "0"
"radio_del_planeta_radios_jovianos": "0.205"
"error_superior_del_radio_radios_jovianos": "0.009"
"error_inferior_del_radio_radios_jovianos": "-0.009"
"límite_del_radio_del_planeta_radios_jovianos": "0"
"masa_del_planeta_masas_terrestres": ""
"error_superior_de_la_masa_del_planeta_masas_terrestres": ""
"error_inferior_de_la_masa_del_planeta_masas_terrestres": ""
"límite_de_la_masa_del_planeta_masas_terrestres": ""
"masa_del_planeta_masas_jovianas": ""
"error_superior_de_la_masa_del_planeta_masas_jovianas": ""
"error_inferior_de_la_masa_del_planeta_masas_jovianas": ""
"límite_de_la_masa_del_planeta_masas_jovianas": ""
"método_de_determinación_de_la_masa": ""
"excentricidad_orbital_del_planeta": ""
"error_superior_de_la_excentricidad_orbital": ""
"error_inferior_de_la_excentricidad_orbital": ""
"límite_de_la_excentricidad_orbital": "0"
"insolación_en_la_superficie_del_planeta": ""
"error_superior_de_la_insolación": ""
"error_inferior_de_la_insolación": ""
"límite_de_la_insolación": ""
"temperatura_de_equilibrio_del_planeta_K": ""
"error_superior_de_la_temperatura_de_equilibrio": ""
"error_inferior_de_la_temperatura_de_equilibrio": ""
"límite_de_la_temperatura_de_equilibrio": ""
"indicador_de_variación_del_tiempo_de_tránsito": "0"
"referencia_de_la_publicación_sobre_la_estrella": "<a refstr=ADAMS_ET_AL__2021 href=https://ui.adsabs.harvard.edu/abs/2021PSJ.....2..152A/abstract target=ref>Adams et al. 2021</a>"
"tipo_espectral_de_la_estrella": ""
"temperatura_efectiva_de_la_estrella_K": "3879.00"
"error_superior_de_la_temperatura_de_la_estrella_K": "90.00"
"error_inferior_de_la_temperatura_de_la_estrella_K": "-90.00"
"límite_de_la_temperatura_de_la_estrella": "0"
"radio_de_la_estrella_radios_solares": "0.58"
"error_superior_del_radio_de_la_estrella": "0.03"
"error_inferior_del_radio_de_la_estrella": "-0.03"
"límite_del_radio_de_la_estrella": "0"
"masa_de_la_estrella_masas_solares": ""
"error_superior_de_la_masa_de_la_estrella": ""
"error_inferior_de_la_masa_de_la_estrella": ""
"límite_de_la_masa_de_la_estrella": ""
"metalicidad_de_la_estrella": "0.032"
"error_superior_de_la_metalicidad": "0.120"
"error_inferior_de_la_metalicidad": "-0.120"
"límite_de_la_metalicidad": "0"
"relación_de_metalicidad_respecto_al_sol": "[Fe/H]"
"gravedad_superficial_de_la_estrella_log_g": "4.70"
"error_superior_de_la_gravedad_superficial": "0.04"
"error_inferior_de_la_gravedad_superficial": "-0.04"
"límite_de_la_gravedad_superficial": "0"
"referencia_de_la_publicación_sobre_el_sistema": "<a refstr=STASSUN_ET_AL__2019 href=https://ui.adsabs.harvard.edu/abs/2019AJ....158..138S/abstract target=ref>TICv8</a>"
"ascensión_recta_cadena": "11h17m55.85s"
"ascensión_recta_grados": "169.4827046"
"declinación_cadena": "+02d37m08.53s"
"declinación_grados": "2.6190363"
"distancia_al_sistema_parsecs": "243.8360000"
"error_superior_de_la_distancia": "2.7975000"
"error_inferior_de_la_distancia": "-2.7975000"
"magnitud_aparente_en_banda_V": "15.5650000"
"error_superior_de_la_magnitud_V": "0.0460000"
"error_inferior_de_la_magnitud_V": "-0.0460000"
"magnitud_aparente_en_banda_K": "11.9240000"
"error_superior_de_la_magnitud_K": "0.0260000"
"error_inferior_de_la_magnitud_K": "-0.0260000"
"magnitud_aparente_en_banda_gaia": "14.9537000"
"error_superior_de_la_magnitud_gaia": "0.0007770"
"error_inferior_de_la_magnitud_gaia": "-0.0007770"
"fecha_de_actualización": "2022-03-28"
"fecha_de_publicación_del_planeta": "2021-08"
"fecha_de_liberación_de_los_datos": "2022-03-28"
"""
    
    return f"""
            Información de estrella: {estrella}
            Eres un asistente experto en astronomía. Tienes conocimientos avanzados sobre las estrellas, las constelaciones y otros objetos celestes.
            Utilizando solamente la información de la estrella proporcionada, responde la pregunta de manera clara, precisa, y educativa.
            Entrega las respuestas en español, y de forma breve.

            - Si hay información que no la encuentres, di que no lo sabes.
            - Se breve con tu respuesta.
            - Responde siempre en español.
            Pregunta: {pregunta}
            """


def stars_expert(input=""):
    prompt = stars_template(input)
    response = model(prompt)
    return response

stars_tool = Tool(
    name = "experto_planetas",
    func = stars_expert,
    description = "Eres un experto de astronomía especializado en exoplanetas y estrellas"
)

from langchain.chains.conversation.memory import ConversationBufferWindowMemory

memory = ConversationBufferWindowMemory(
    memory_key = "chat_history",
    k = 3,
    return_messages=True
)


tools = [stars_tool]

from langchain.agents import initialize_agent

conversational_agent = initialize_agent(
    agent="chat-conversational-react-description",
    tools=tools,
    llm=model,
    verbose=True,
    max_iterations=5,
    early_stopping_method="generate",
    memory=memory,
    description="Eres un experto en astronomía. Utiliza los tools para obtener información sobre exoplanetas"
)

from flask import Flask, request, jsonify
from flask_cors import CORS
global ans 

ans = None
app = Flask(__name__)
CORS(app)

@app.route('/webhook', methods=['POST'])
def webhook():
    global ans
    data = request.get_json() 
    if data:
        question = data['message']
        
        planeta = 'K2-22b'
        mensaje = f"Estrella: {planeta} Pregunta: {question}"

        answer = conversational_agent(mensaje)
        ans = answer
        
    else:
        print("No se recibieron datos")

    print("="*20)
    print(f"HUMAN: {question}")
    print("="*20)
    print(f"AI: {answer['output']}")
    print("="*20)

    return jsonify({"respuesta": answer['output']})

if __name__ == '__main__':
    app.run(debug=False,port=80)


