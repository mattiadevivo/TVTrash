# TVTrashTomorrow

The application reminds you the garbage type that is being collected in your town, in the Treviso area (Italy).

## Run the project

Start [ollama](https://ollama.com/) using Docker:

```shell
docker compose up -d
```

Download the model you prefer from the ollama library using the command

```shell
docker exec ollama ollama run <model-name>
```

If you want to remove a model you can use the command:

```shell
docker exec ollama ollama rm <model-name>
```
