# Asistente para creación de servicio: GPT 3.5

- Conversación: <https://chat.openai.com/share/6cfecf21-8a1f-4188-bbd8-98ce3976f71a>

## Como arrancar el proyecto

- Tener instalado node
- Arrancar servicio con: node app.js
- Podeis testar las peticiones en Postman, por ejemplo

### cURL Anonymize

```cUrl
curl --location 'localhost:3000/anonymize' \
--header 'Content-Type: application/json' \
--data '{
    "message": "hi"
}'
```

### cURL de-anonymize

```cUrl
curl --location 'localhost:3000/deanonymize' \
--header 'Content-Type: application/json' \
--data '{
    "message": "hi"
}'
```
